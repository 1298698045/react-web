import React, { useState, useEffect, useCallback, } from 'react';
import { connect } from 'dva';
import {
	Form,
	Button,
	Tag,
	Tabs,
	Card,
} from 'antd';
import ChangeCoachModal from './ChangeCoachModal';
import ChangeStatusModal from './ChangeStatusModal';
import ChangeClassModal from './ChangeClassModal';
import PurchaseClassModal from './PurchaseClassModal';
import ChangeTelModal from './ChangeTelModal';
import FinishProxyModal from './FinishProxyModal';
import OtherCostModal from './OtherCostModal';

import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import { useEffectOnce, useGetSet, useToggle } from 'react-use';
import { getDictItem, getDictValue, queryDictionary, refreshDictionary } from '@/utils/dictionaryUtil';
import Privilege from '@/components/Privilege';
import { hasPriv } from '@/utils/privilege';

import style from './index.less';
import AddKmModal from '@/pages/Student/StudentList/AddKmModal';
import StudentInfoModal from '@/components/StudentInfoModal';
import SignUpMemoModal from '@/pages/Student/SignUp/SignUpMemoModal';
import AddFeeModal from '@/pages/Finance/Expenditure/AddFeeModal';

const { TabPane } = Tabs;

const originRowMenuItems1 = [
	{
		priv: 'change_class_proxying',
		key: 'changeClass',
		title: '班型变更',
	},
	{
		priv: 'buy_lessons_proxying',
		key: 'purchaseClass',
		title: '购买课时',
	},
	{
		priv: 'add_km_proxying',
		key: 'addKm',
		title: '添加科目',
	},
	{
		priv: 'change_mobile_proxying',
		key: 'modifyPhoneNumber',
		title: '修改手机号',
	},
	{
		priv: 'end_proxying',
		key: 'finishProxy',
		title: '培训结束',
	},
	{
		priv: 'other_bus_fee_proxying',
		key: 'otherCost',
		title: '其它业务收入',
	},
	{
		priv: 'student_pay_proxying',
		key: 'expenditure',
		title: '学员支出',
	}
];
const originRowMenuItems = originRowMenuItems1.filter( r => hasPriv( [ r.priv ] ) );

const tableName1 = 'studentStudyingProxyList';
const tableName2 = 'studentFinishProxyList';

const Proxy = props => {
	const { form, dispatch, dictionary, loading, memoLoading, quickEntryParams } = props;
	const [ changeCoachModalVisible, setChangeCoachModalVisible ] = useState( false );
	const [ changeStatusModalVisible, setChangeStatusModalVisible ] = useState( false );
	const [ changeClassModalVisible, setChangeClassModalVisible ] = useState( false );
	const [ finishProxyModalVisible, setFinishProxyModalVisible ] = useState( false );
	const [ purchaseClassModalVisible, setPurchaseClassModalVisible ] = useState( false );
	const [ addKmModalVisible, setAddKmModalVisible ] = useState( false );
	const [ changeTelModalVisible, setChangeTelModalVisible ] = useState( false );
	const [ selectedRows, setSelectedRows ] = useState( [] );
	const [ tabKey, setTabKey ] = useState( '-1' );
	const [ needUpdate, setNeedUpdate ] = useToggle( false );
	const [ studentInfo, setStudentInfo ] = useState( { finance: {} } );
	const [ studentInfoModalVisible, setStudentInfoModalVisible ] = useState( false );
	const [ studentInfoId, setStudentInfoId ] = useState( undefined );
	const [ rowMenuItems, setRowMenuItems ] = useState( [ ...originRowMenuItems ] );
	const [ getClassValues, setClassValues ] = useGetSet( [] );
	const [ getClassDisabled, setClassDisabled ] = useGetSet( true );
	// const [ getLicenseType, setLicenseType ] = useGetSet( [] );
	// const [ getLicenseTypeDisabled, setLicenseTypeDisabled ] = useGetSet( true );
	const [ getChangeCoachDisabled, setChangeCoachDisabled ] = useGetSet( true );
	const [ currentRecord, setCurrentRecord ] = useState( {} );
	const [ signUpMemoModalVisible, toggleSignUpMemoModalVisible ] = useToggle( false );
	const [ tableSearchParams, setTableSearchParams ] = useState( {} );
	
	const [ otherCostModalModalVisible, setOtherCostModalVisible ] = useState( false );
	const [ intensiveCourseSwitch, setIntensiveCourseSwitch ] = useState( false );

	const addOtherCostLoading = loading.effects[ 'student/addOtherCost' ] || false;

	const [ addFeePopVisible, toggleAddFeePopVisible ] = useToggle( false );
	const confirmLoading = loading.effects[ `finance/saveExpenditure` ];

	const originColumns = [
		{
			title: '序号',
			key: 'key',
		},
		{
			...FIELDS.STUDENT.NAME,
			customRender: ( text, record, ) => {
				return (
					<Privilege privs={[ 'student_detail_proxying' ]} noMatch={text}>
					<a onClick={e => {
						e.stopPropagation();
						setStudentInfoId( record.id );
						setStudentInfoModalVisible( true );
					}}>
						{text}
					</a></Privilege>
				)
			}
		},
		{
			...FIELDS.STUDENT.GENDER,
			customRender: ( text, record, ) => {
				return getDictValue( dictionary, FIELDS.STUDENT.GENDER.dictionary, record.baseInfo[ FIELDS.STUDENT.GENDER.key ] );
			}
		},
		FIELDS.STUDENT.MOBILE,
		{
			title: '代培科目',
			key: 'dpkm',
			customRender: ( text, record, ) => {
				const dic = dictionary[ FIELDS.STUDENT.KM2_STATUS.dictionary ];
				const renderArr = [];
				const { insteadKm2, insteadKm3 } = record.apply;
				
				if ( dic ) {
					if ( String( insteadKm2 ) === '1' ) {
						const item = dic.find( ( { dKey } ) => dKey === String( record[ FIELDS.STUDENT.KM2_STATUS.key ] ) );
						renderArr.push( <Tag className={style.tag}
						                     key={FIELDS.STUDENT.KM2_STATUS.key}>{`科目二：${item.dValue}`}</Tag> )
					}
					if ( String( insteadKm3 ) === '1' ) {
						const item = dic.find( ( { dKey } ) => dKey === String( record[ FIELDS.STUDENT.KM3_STATUS.key ] ) );
						renderArr.push( <Tag className={style.tag}
						                     key={FIELDS.STUDENT.KM3_STATUS.key}>{`科目三：${item.dValue}`}</Tag> )
					}
					
					
					return renderArr;
				}
				return '';
			}
		},
		{
			...FIELDS.STUDENT.COACH_ID,
			title: '当前教练',
			customRender: ( text, record ) => {
				const { km2CoachId, km3CoachId } = record;
				return <>
					{km2CoachId !== 0 &&
					<Tag
						className={style.tag}>{`科目二：${getDictValue( dictionary, FIELDS.ASSET.EMPLOYEE_ID.dictionary, String( km2CoachId ) )}`}</Tag>}
					{km3CoachId !== 0 &&
					<Tag
						className={style.tag}>{`科目三：${getDictValue( dictionary, FIELDS.ASSET.EMPLOYEE_ID.dictionary, String( km3CoachId ) )}`}</Tag>}
					{km2CoachId === 0 && km3CoachId === 0 && '暂无'}
				</>
			}
		},
		FIELDS.STUDENT.DEPART_ID_SCHOOL,
		{
			...FIELDS.STUDENT.COOPERATION_UNIT,
			customRender: ( text, record, ) => {
				return getDictValue( dictionary, FIELDS.STUDENT.COOPERATION_UNIT.dictionary, String( record.apply[ FIELDS.STUDENT.COOPERATION_UNIT.key ] ) )
			}
		},
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record, ) => {
				return <Privilege privs={[ 'memo_proxying' ]} noMatch={text}> <a
					key="memo"
					onClick={() => {
						setCurrentRecord( record );
						toggleSignUpMemoModalVisible( true );
					}}
				>备注</a></Privilege>
			}
		},
	];
	const originColumns1 = [
		{
			title: '序号',
			key: 'key',
		},
		{
			...FIELDS.STUDENT.NAME,
			customRender: ( text, record, ) => {
				return (
					<Privilege privs={[ 'student_detail_proxyed' ]} noMatch={text}>
					<a onClick={e => {
						e.stopPropagation();
						setStudentInfoId( record.id );
						setStudentInfoModalVisible( true );
					}}>
						{text}
					</a></Privilege>
				)
			}
		},
		{
			...FIELDS.STUDENT.GENDER,
			customRender: ( text, record, ) => {
				return getDictValue( dictionary, FIELDS.STUDENT.GENDER.dictionary, record.baseInfo[ FIELDS.STUDENT.GENDER.key ] );
			}
		},
		FIELDS.STUDENT.MOBILE,
		{
			title: '代培科目',
			key: 'dpkm',
			customRender: ( text, record, ) => {
				const dic = dictionary[ FIELDS.STUDENT.KM2_STATUS.dictionary ];
				const renderArr = [];
				const { insteadKm2, insteadKm3 } = record.apply;
				
				if ( dic ) {
					if ( String( insteadKm2 ) === '1' ) {
						const item = dic.find( ( { dKey } ) => dKey === String( record[ FIELDS.STUDENT.KM2_STATUS.key ] ) );
						renderArr.push( <Tag className={style.tag}
						                     key={FIELDS.STUDENT.KM2_STATUS.key}>{`科目二：${item.dValue}`}</Tag> )
					}
					if ( String( insteadKm3 ) === '1' ) {
						const item = dic.find( ( { dKey } ) => dKey === String( record[ FIELDS.STUDENT.KM3_STATUS.key ] ) );
						renderArr.push( <Tag className={style.tag}
						                     key={FIELDS.STUDENT.KM3_STATUS.key}>{`科目三：${item.dValue}`}</Tag> )
					}
					
					
					return renderArr;
				}
				return '';
			}
		},
		{
			...FIELDS.STUDENT.COACH_ID,
			title: '当前教练',
			customRender: ( text, record ) => {
				const { km2CoachId, km3CoachId } = record;
				return <>
					{km2CoachId !== 0 &&
					<Tag
						className={style.tag}>{`科目二：${getDictValue( dictionary, FIELDS.ASSET.EMPLOYEE_ID.dictionary, String( km2CoachId ) )}`}</Tag>}
					{km3CoachId !== 0 &&
					<Tag
						className={style.tag}>{`科目三：${getDictValue( dictionary, FIELDS.ASSET.EMPLOYEE_ID.dictionary, String( km3CoachId ) )}`}</Tag>}
					{km2CoachId === 0 && km3CoachId === 0 && '暂无'}
				</>
			}
		},
		FIELDS.STUDENT.DEPART_ID_SCHOOL,
		{
			...FIELDS.STUDENT.COOPERATION_UNIT,
			customRender: ( text, record, ) => {
				return getDictValue( dictionary, FIELDS.STUDENT.COOPERATION_UNIT.dictionary, String( record.apply[ FIELDS.STUDENT.COOPERATION_UNIT.key ] ) )
			}
		},
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record, ) => {
				return <Privilege privs={[ 'memo_proxyed' ]} noMatch={text}> <a
					key="memo"
					onClick={() => {
						setCurrentRecord( record );
						toggleSignUpMemoModalVisible( true );
					}}
				>备注</a></Privilege>
			}
		},
	];
	

	useEffect( () => {
		dispatch( {
			type: `systemConfig/intensiveCourseSwitch`,
		} ).then(res => {
			setIntensiveCourseSwitch(res === 'on' ? true : false)
		});
		refreshDictionary( dispatch, 'employee_id' );
		queryDictionary( dispatch, 'class_id' );
	}, [] );
	useEffectOnce( () => {
		if (quickEntryParams) {
			setTableSearchParams(quickEntryParams)
		}
		setTabKey(quickEntryParams.tabKey || '0')
		dispatch( {
			type: 'quickEntryParams/clearParams',
		} );
	}, [ dispatch ] );
	const getStudentInfo = studentId => cb => {
		dispatch( {
			type: 'student/getStudentInfo',
			payload: studentId,
		} ).then( data => {
			setStudentInfo( data );
			cb();
		} );
	};
	
	const handleMenuClick = useCallback( ( { key } ) => {
		switch ( key ) {
			case 'changeClass':
				getStudentInfo( selectedRows[ 0 ].id )( () => setChangeClassModalVisible( true ) );
				break;
			case 'purchaseClass':
				setPurchaseClassModalVisible( true );
				break;
			case 'addKm':
				setAddKmModalVisible( true );
				break;
			case 'modifyPhoneNumber':
				setChangeTelModalVisible( true );
				break;
			case 'finishProxy':
				setFinishProxyModalVisible( true );
				break;
			case 'otherCost':
				setOtherCostModalVisible( true );
				break;
			case 'expenditure':
					toggleAddFeePopVisible( true );
					break;
			default:
				return false;
		}
	}, [ selectedRows ] );
	
	const tableActions = [
		<Privilege privs={['change_coach_proxying']} key="change_coach_proxying">
		<Button disabled={getChangeCoachDisabled()}
		        key="coach-button"
		        icon="form"
		        htmlType="button"
		        type="primary"
		        onClick={() => setChangeCoachModalVisible( true )}>更换教练</Button></Privilege>,
		<Privilege privs={['change_process']} key="change_process">
		<Button disabled={selectedRows.length !== 1} key="status-button" icon="edit" htmlType="button" type="primary"
		        onClick={() => {
			        setChangeStatusModalVisible( true );
		        }}>进度变更</Button></Privilege>,
	];
	
	useEffect( () => {
		if ( selectedRows.length > 1 ) {
			setRowMenuItems( [] );
			const license = selectedRows[ 0 ].licenseType;
			const { bookNum } = dictionary[ FIELDS.STUDENT.CLASS_ID.dictionary ].find( ( { dKey } ) => {
				return dKey === String( selectedRows[ 0 ][ FIELDS.STUDENT.CLASS_ID.key ] );
			} );
			const filter = selectedRows.filter( s => {
				// 这里需要判断多个学员的申领类型和人车上限相同，才可以更换教练。
				const sameLic = s.licenseType === license;
				const b = dictionary[ FIELDS.STUDENT.CLASS_ID.dictionary ].find( ( { dKey } ) => {
					return dKey === String( s[ FIELDS.STUDENT.CLASS_ID.key ] );
				} );
				const sameBook = b.bookNum === bookNum;
				return sameLic && sameBook;
			} );
			if ( filter.length === selectedRows.length ) {
				setChangeCoachDisabled( false );
			} else {
				setChangeCoachDisabled( true );
			}
		} else {
			let oList = [ ...originRowMenuItems ];
			if ( selectedRows.length === 1 ) {
				setChangeCoachDisabled( false );
				const { classId } = selectedRows[ 0 ];
				const currentClass = getDictItem( dictionary, FIELDS.STUDENT.CLASS_ID.dictionary, classId );
				// 2019.08.27 zhouyan修改  放开班型仅为课时得情况下购买课时，所有班型下都可以购买课时
				// if ( currentClass ) {
				// 	const { payType } = currentClass;
				// 	if ( payType !== 'lesson' ) {
				// 		const spliceIndex = oList.findIndex( ( { key } ) => key === 'purchaseClass' );
				// 		if ( spliceIndex !== -1 ) {
				// 			oList.splice( spliceIndex, 1 );
				// 		}
				// 	}
				// }
			} else {
				setChangeCoachDisabled( true );
			}
			
			setRowMenuItems( oList );
		}
	}, [ selectedRows ] );
	
	const onChange = ( key, value ) => {
		if ( key === FIELDS.STUDENT.DEPART_ID_SCHOOL.key && dictionary[ 'class_id' ] ) {
			let values = dictionary[ 'class_id' ].filter( v => v.dictSwitch == 1 ).filter( ( { departId } ) => {
				const d = String( departId ).split( ',' );
				
				return d.includes( value );
			} );
			
			if ( values.length > 0 ) {
				if ( !form.getFieldValue( FIELDS.STUDENT.LICENSE_TYPE.key ) ) {
					setClassValues( values );
					setClassDisabled( values.length === 0 );
				} else {
					let r = values.filter( ( { licenseType } ) => licenseType === form.getFieldValue( FIELDS.STUDENT.LICENSE_TYPE.key ) );
					
					setClassValues( r );
					setClassDisabled( r.length === 0 );
				}
			} else {
				setClassValues( [] );
				setClassDisabled( true );
			}
			
			form.setFieldsValue( {
				[ FIELDS.STUDENT.CLASS_ID.key ]: undefined,
			} );
		}
		
		if ( key === FIELDS.STUDENT.LICENSE_TYPE.key && dictionary[ FIELDS.STUDENT.LICENSE_TYPE.dictionary ] && dictionary[ 'class_id' ] ) {
			let values = dictionary[ 'class_id' ].filter( v => v.dictSwitch == 1 ).filter( ( { licenseType } ) => licenseType === value );
			
			if ( values.length > 0 ) {
				console.log( values, value, );
				if ( !form.getFieldValue( FIELDS.STUDENT.DEPART_ID_SCHOOL.key ) ) {
					setClassValues( values );
					setClassDisabled( values.length === 0 );
				} else {
					let r = values.filter( ( { departId } ) => {
						const d = String( departId ).split( ',' );
						
						return d.includes( form.getFieldValue( FIELDS.STUDENT.DEPART_ID_SCHOOL.key ) );
					} );
					
					setClassValues( r );
					setClassDisabled( r.length === 0 );
				}
			} else {
				setClassValues( [] );
				setClassDisabled( true );
			}
			
			form.setFieldsValue( {
				[ FIELDS.STUDENT.CLASS_ID.key ]: undefined,
			} );
		}
	};
	
	const changeStatusLoading = loading.effects[ 'student/saveStudentStatus' ] || false;
	const changeClassLoading = loading.effects[ 'student/changeStudentClass' ] || false;
	const changeTelLoading = loading.effects[ 'student/changeMobile' ] || false;
	const purchaseClassLoading = loading.effects[ 'student/buyLessons' ] || false;
	const addKmLoading = loading.effects[ 'student/addProxyKm' ] || false;
	const finishProxyLoading = loading.effects[ 'student/finishProxy' ] || false;
	
	// 保存备注
	const saveMemo = ( { studentId, memo, } ) => {
		dispatch( {
			type: 'student/saveMemo',
			payload: {
				params: {
					studentId,
					memo,
				}
			},
		} ).then( data => {
			if ( data !== false ) {
				toggleSignUpMemoModalVisible( false );
			}
		} );
	};
	
	return (
		<Card bodyStyle={
			{ paddingLeft: 0, paddingRight: 0, }
		}>
			<Tabs tabPosition="left" defaultActiveKey="0" activeKey={tabKey} onChange={e => {
				setTabKey( e );
				form.resetFields();
				setClassValues( [] );
				setClassDisabled( true );
				// setLicenseTypeDisabled( true );
			}
			}>
				<TabPane tab="培训中" key="0" style={{ paddingRight: 24, }}>
					{
						tabKey === '0' && (
							<WithTableName
								{...props}
								bodyStyle={{ padding: 0, }}
								tableName={tableName1}
								selectedRows={selectedRows}
								tableActions={tableActions}
								rowMenuItems={rowMenuItems}
								needUpdate={needUpdate}
								setNeedUpdate={setNeedUpdate}
								setSelectedRows={setSelectedRows}
								originColumns={originColumns}
								handleMenuClick={handleMenuClick}
								scroll={{ x: 'max-content' }}
								handleFormReset={() => {
									setTableSearchParams({})
									setNeedUpdate(true)
								}}
								formFields={[
									<WrapperComplexFormItem
										config={FIELDS.STUDENT.QUICK_SEARCH}
										form={form}
									/>,
									<WrapperComplexFormItem
										config={FIELDS.STUDENT.DEPART_ID_SCHOOL}
										initialValue={tableSearchParams.departId || undefined}
										form={form}
										onChange={onChange}
									/>,
									<WrapperComplexFormItem
										config={FIELDS.STUDENT.LICENSE_TYPE_ACTIVE}
										initialValue={tableSearchParams.licenseType || undefined}
										onChange={onChange}
										form={form}
										// values={getLicenseType()}
										// status={getLicenseTypeDisabled() ? 'disabled' : 'edit'}
									/>,
									<WrapperComplexFormItem
										config={FIELDS.STUDENT.CLASS_ID}
										form={form}
										initialValue={tableSearchParams.classId || undefined}
										values={getClassValues()}
										status={getClassDisabled() ? 'disabled' : 'edit'}
									/>,
									<WrapperComplexFormItem
										config={{...FIELDS.STUDENT.EXAM_COACH_ID, title:'当前教练', type: 'select',}}
										form={form}
									/>,
									<WrapperComplexFormItem
										config={FIELDS.STUDENT.KM}
										form={form}
									/>,
								]}
							/>
						)
					}
				</TabPane>
				<TabPane tab="培训结束" key="1" style={{ paddingRight: 24, }}>
					{
						tabKey === '1' && (
							<WithTableName
								{...props}
								bodyStyle={{ padding: 0, }}
								tableName={tableName2}
								setSelectedRows={setSelectedRows}
								originColumns={originColumns1}
								scroll={{ x: 'max-content' }}
								formFields={[
							
									<WrapperComplexFormItem
										config={FIELDS.STUDENT.DEPART_ID_SCHOOL}
										form={form}
									/>,
									<WrapperComplexFormItem
										config={FIELDS.STUDENT.COOPERATION_UNIT}
										form={form}
									/>,
									<WrapperComplexFormItem
										config={{
											...FIELDS.STUDENT.CLASS_ID,
											title: '报名班型',
										}}
										form={form}
									/>,
									<WrapperComplexFormItem
										config={{
											...FIELDS.STUDENT.PROXY_KM,
											dictionary: 'course_km',
										}}
										form={form}
									/>,
									<WrapperComplexFormItem
										config={FIELDS.STUDENT.QUICK_SEARCH}
										form={form}
									/>,
								]}
							/>
						)
					}
				</TabPane>
			</Tabs>
			<ChangeCoachModal
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true );
				}}
				visible={changeCoachModalVisible}
				setVisible={setChangeCoachModalVisible}
				data={selectedRows}
			/>
			<ChangeStatusModal
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true );
				}}
				type="proxy"
				intensiveCourseSwitch={intensiveCourseSwitch}
				data={selectedRows}
				form={form}
				handleSubmit={fieldsValue => {
					dispatch( {
						type: 'student/saveStudentStatus',
						payload: {
							params: {
								...fieldsValue
							},
						},
					} ).then( data => {
						if ( data !== false ) {
							setChangeStatusModalVisible( false );
						}
					} );
				}}
				dictionary={dictionary}
				visible={changeStatusModalVisible}
				setVisible={setChangeStatusModalVisible}
				selectedRows={selectedRows}
				loading={changeStatusLoading}
			/>
			<ChangeClassModal
				handleSubmit={fieldsValue => {
					dispatch( {
						type: 'student/changeStudentClass',
						payload: fieldsValue,
					} ).then( data => {
						if ( data !== false ) {
							setChangeClassModalVisible( false );
						}
					} );
				}}
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true );
				}}
				visible={changeClassModalVisible}
				setVisible={setChangeClassModalVisible}
				data={studentInfo}
				dictionary={dictionary}
				loading={changeClassLoading}
			/>
			<PurchaseClassModal
				dispatch={dispatch}
				dictionary={dictionary}
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true );
				}}
				form={form}
				handleSubmit={fieldsValue => {
					dispatch( {
						type: 'student/buyLessons',
						payload: fieldsValue,
					} ).then( data => {
						if ( data !== false ) {
							setPurchaseClassModalVisible( false );
						}
					} );
				}}
				visible={purchaseClassModalVisible}
				setVisible={setPurchaseClassModalVisible}
				selectedRows={selectedRows}
				loading={purchaseClassLoading}
			/>
			<AddKmModal
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true );
				}}
				form={form}
				handleSubmit={fieldsValue => {
					dispatch( {
						type: 'student/addProxyKm',
						payload: fieldsValue,
					} ).then( data => {
						if ( data !== false ) {
							setAddKmModalVisible( false );
						}
					} );
				}}
				visible={addKmModalVisible}
				setVisible={setAddKmModalVisible}
				selectedRows={selectedRows}
				loading={addKmLoading}
			/>
			<ChangeTelModal
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true );
				}}
				form={form}
				handleSubmit={fieldsValue => {
					dispatch( {
						type: 'student/changeMobile',
						payload: fieldsValue,
					} ).then( data => {
						if ( data !== false ) {
							setChangeTelModalVisible( false );
						}
					} );
				}}
				visible={changeTelModalVisible}
				setVisible={setChangeTelModalVisible}
				selectedRows={selectedRows}
				loading={changeTelLoading}
			/>
			<StudentInfoModal
				studentId={studentInfoId}
				visible={studentInfoModalVisible}
				setVisible={setStudentInfoModalVisible}
				dictionary={dictionary}
				dispatch={dispatch}
			/>
			<FinishProxyModal
				visible={finishProxyModalVisible}
				setVisible={setFinishProxyModalVisible}
				handleSubmit={data => {
					dispatch( {
						type: 'student/finishProxy',
						payload: {
							params: data,
						},
					} ).then( data => {
						if ( data !== false ) {
							setFinishProxyModalVisible( false );
						}
					} );
				}}
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true );
				}}
				selectedRows={selectedRows}
				loading={finishProxyLoading}
			/>
			<SignUpMemoModal
				data={currentRecord}
				handleSubmit={saveMemo}
				loading={memoLoading}
				visible={signUpMemoModalVisible}
				setVisible={toggleSignUpMemoModalVisible}
				setNeedUpdate={setNeedUpdate}
			/>
			<OtherCostModal
				handleSubmit={fieldsValue => {
					dispatch( {
						type: 'student/addOtherCost',
						payload: fieldsValue,
					} ).then( data => {
						if ( data !== false ) {
							setOtherCostModalVisible( false );
						}
					} );
				}}
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true );
				}}
				visible={otherCostModalModalVisible}
				setVisible={setOtherCostModalVisible}
				data={selectedRows[0]}
				dictionary={dictionary}
				loading={addOtherCostLoading}
			/>
			<AddFeeModal
				afterClose={() => setNeedUpdate( true )}
				handleSubmit={fieldsValue => {
					dispatch( {
						type: `finance/saveExpenditure`,
						payload: {
							...fieldsValue,
						},
					} ).then( data => {
						if ( data !== false ) {
							toggleAddFeePopVisible( false );
							setNeedUpdate( true );
						}
					} );
				}}
				type="outlay_type_other"
				visible={addFeePopVisible}
				dictionary={dictionary}
				loading={confirmLoading}
				setVisible={toggleAddFeePopVisible}
				btnType={'student'}
				studentInfo={selectedRows[0]}
			/>
		</Card>
	);
};

export default connect( (
	{
		[ tableName1 ]: data1,
		[ tableName2 ]: data2,
		loading,
		global,
		dictionary,
		quickEntryParams
	}
) => (
	{
		[ tableName1 ]: data1,
		[ tableName2 ]: data2,
		loading,
		global,
		memoLoading: loading.effects[ 'student/saveMemo' ] || false,
		dictionary,
		quickEntryParams
	}
) )( Form.create()( Proxy ) );
