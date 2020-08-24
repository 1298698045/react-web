import React, { useState, } from 'react';
import { connect } from 'dva';
import {
	Form,
	Button,
	Tabs,
	Card,
} from 'antd';
import ChangeTelModal from './ChangeTelModal';
import OtherCostModal from './OtherCostModal';
import DropOutModal from './DropOutModal';
import AddStudentFinishModal from './AddStudentFinishModal';

import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import { useEffectOnce, useGetSet, useToggle } from 'react-use';
import PaymentFeeModal from './PaymentFeeModal';
import StudentInfoModal from '@/components/StudentInfoModal';
import { getDictValue, queryDictionary } from '@/utils/dictionaryUtil';
import SignUpMemoModal from '@/pages/Student/SignUp/SignUpMemoModal';
import Privilege from '@/components/Privilege';
import AddFeeModal from '@/pages/Finance/Expenditure/AddFeeModal';

const { TabPane } = Tabs;

const tableName1 = 'studentStudyingDependList';
const tableName2 = 'studentFinishDependList';
const tableName3 = 'studentGraduationDependList';
const tableName4 = 'studentGraduationDependAwaitList';

const Depend = props => {
	const { form, dictionary, dispatch, loading, memoLoading, quickEntryParams} = props;
	const [ paymentFeeModalVisible, setPaymentFeeModalVisible ] = useState( false );
	const [ dropOutModalVisible, setDropOutModalVisible ] = useState( false );
	const [ changeTelModalVisible, setChangeTelModalVisible ] = useState( false );
	const [ selectedRows, setSelectedRows ] = useState( [] );
	const [ tabKey, setTabKey ] = useState( '-1' );
	const [ needUpdate, setNeedUpdate ] = useToggle( false );
	const [ needUpdate2, setNeedUpdate2 ] = useToggle( false );
	const [ needUpdate3, setNeedUpdate3 ] = useToggle( false );
	const [ needUpdate1, setNeedUpdate1 ] = useToggle( false );
	const [ studentInfo, setStudentInfo ] = useState( { finance: {} } );
	const [ studentInfoModalVisible, setStudentInfoModalVisible ] = useState( false );
	const [ studentInfoId, setStudentInfoId ] = useState( undefined );
	const [ currentRecord, setCurrentRecord ] = useState( {} );
	const [ signUpMemoModalVisible, toggleSignUpMemoModalVisible ] = useToggle( false );
	const [ tableSearchParams, setTableSearchParams ] = useState( {} );

	const [ otherCostModalModalVisible, setOtherCostModalVisible ] = useState( false );
	const addOtherCostLoading = loading.effects[ 'student/addOtherCost' ] || false;
	
	const [ addStudentFinishModalVisible, toggleAddStudentFinishModalVisible ] = useToggle( false );
	
	const [ addFeePopVisible, toggleAddFeePopVisible ] = useToggle( false );
	const confirmLoading = loading.effects[ `finance/saveExpenditure` ];

	useEffectOnce( () => {
		queryDictionary( dispatch, 'class_id' );
		if (quickEntryParams) {
			setTableSearchParams(quickEntryParams)
		}
		setTabKey(quickEntryParams.tabKey || '0')
		dispatch( {
			type: 'quickEntryParams/clearParams',
		} );
	}, [ dispatch ] );
	const originColumns0 = [
		{
			title: '序号',
			key: 'key',
		},
		{
			...FIELDS.STUDENT.NAME,
			customRender: ( text, record, ) => {
				return (
					<Privilege privs={[ 'student_detail_anchored' ]} noMatch={text}><a onClick={e => {
						e.stopPropagation();
						
						setStudentInfoId( record.studentId );
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
				const { baseInfo: { gender } } = record;
				return getDictValue( dictionary, FIELDS.STUDENT.GENDER.dictionary, String( gender ) )
			}
		},
		FIELDS.STUDENT.MOBILE,
		FIELDS.STUDENT.KM1_STATUS,
		FIELDS.STUDENT.KM2_STATUS,
		FIELDS.STUDENT.KM3_STATUS,
		FIELDS.STUDENT.KM4_STATUS,
		FIELDS.STUDENT.DEPART_ID_SCHOOL,
		{
			...FIELDS.STUDENT.COOPERATION_UNIT,
			customRender: ( text, record, ) => {
				return getDictValue( dictionary, FIELDS.STUDENT.COOPERATION_UNIT.dictionary, String( record.apply[ FIELDS.STUDENT.COOPERATION_UNIT.key ] ) )
			}
		},
		FIELDS.STUDENT.LICENSE_TYPE,
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record, ) => {
				return <Privilege privs={[ 'memo_anchored' ]} noMatch={text}>
				<a
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
					<Privilege privs={[ 'student_detail_leaving_anchored' ]} noMatch={text}><a onClick={e => {
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
				const { baseInfo: { gender } } = record;
				return getDictValue( dictionary, FIELDS.STUDENT.GENDER.dictionary, String( gender ) )
			}
		},
		FIELDS.STUDENT.MOBILE,
		FIELDS.STUDENT.KM1_STATUS,
		FIELDS.STUDENT.KM2_STATUS,
		FIELDS.STUDENT.KM3_STATUS,
		FIELDS.STUDENT.KM4_STATUS,
		FIELDS.STUDENT.DEPART_ID_SCHOOL,
		{
			...FIELDS.STUDENT.COOPERATION_UNIT,
			customRender: ( text, record, ) => {
				return getDictValue( dictionary, FIELDS.STUDENT.COOPERATION_UNIT.dictionary, String( record.apply[ FIELDS.STUDENT.COOPERATION_UNIT.key ] ) )
			}
		},
		FIELDS.STUDENT.LICENSE_TYPE,
		{
			...FIELDS.FINANCE.REFUND_TYPE,
			title: '退学类型',
			customRender: ( text, record, ) => {
				const { refund: { refundType } } = record;
				return getDictValue( dictionary, FIELDS.FINANCE.REFUND_TYPE.dictionary, refundType );
			}
		},
		FIELDS.STUDENT.STUDENT_STATUS,
		{
			title: '退学日期',
			key: 'refundTime',
		},
		{
			title: '退档日期',
			key: 'docRefundTime',
		},
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record, ) => {
				return <Privilege privs={[ 'memo_leaving_anchored' ]} noMatch={text}>
					<a
					key="memo"
					onClick={() => {
						setCurrentRecord( record );
						toggleSignUpMemoModalVisible( true );
					}}
				>备注</a></Privilege> 
			}
		},
	];
	const originColumns3 = [
		{
			title: '序号',
			key: 'key',
		},
		{
			...FIELDS.STUDENT.NAME,
			customRender: ( text, record, ) => {
				return (
					<Privilege privs={[ 'student_detail_leaved_anchored' ]} noMatch={text}><a onClick={e => {
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
				const { baseInfo: { gender } } = record;
				return getDictValue( dictionary, FIELDS.STUDENT.GENDER.dictionary, String( gender ) )
			}
		},
		FIELDS.STUDENT.MOBILE,
		FIELDS.STUDENT.KM1_STATUS,
		FIELDS.STUDENT.KM2_STATUS,
		FIELDS.STUDENT.KM3_STATUS,
		FIELDS.STUDENT.KM4_STATUS,
		FIELDS.STUDENT.DEPART_ID_SCHOOL,
		{
			...FIELDS.STUDENT.COOPERATION_UNIT,
			customRender: ( text, record, ) => {
				return getDictValue( dictionary, FIELDS.STUDENT.COOPERATION_UNIT.dictionary, String( record.apply[ FIELDS.STUDENT.COOPERATION_UNIT.key ] ) )
			}
		},
		FIELDS.STUDENT.LICENSE_TYPE,
		{
			...FIELDS.FINANCE.REFUND_TYPE,
			title: '退学类型',
			customRender: ( text, record, ) => {
				const { refund: { refundType } } = record;
				return getDictValue( dictionary, FIELDS.FINANCE.REFUND_TYPE.dictionary, refundType );
			}
		},
		FIELDS.STUDENT.STUDENT_STATUS,
		{
			title: '退学日期',
			key: 'refundTime',
		},
		{
			title: '退档日期',
			key: 'docRefundTime',
		},
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record, ) => {
				return <Privilege privs={[ 'memo_leaved_anchored' ]} noMatch={text}>
					<a
					key="memo"
					onClick={() => {
						setCurrentRecord( record );
						toggleSignUpMemoModalVisible( true );
					}}
				>备注</a></Privilege> 
			}
		},
	];
	const originColumns2 = [
		{
			title: '序号',
			key: 'key',
		},
		{
			...FIELDS.STUDENT.NAME,
			customRender: ( text, record, ) => {
				return (
					<Privilege privs={[ 'student_detail_leaved_anchored' ]} noMatch={text}> <a onClick={e => {
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
				const { baseInfo: { gender } } = record;
				return getDictValue( dictionary, FIELDS.STUDENT.GENDER.dictionary, String( gender ) )
			}
		},
		FIELDS.STUDENT.MOBILE,
		FIELDS.STUDENT.DEPART_ID_SCHOOL,
		{
			...FIELDS.STUDENT.COOPERATION_UNIT,
			customRender: ( text, record, ) => {
				return getDictValue( dictionary, FIELDS.STUDENT.COOPERATION_UNIT.dictionary, String( record.apply[ FIELDS.STUDENT.COOPERATION_UNIT.key ] ) )
			}
		},
		FIELDS.STUDENT.LICENSE_TYPE,
		FIELDS.STUDENT.STUDENT_STATUS,
		{
			title: '毕业日期',
			key: 'graduationTime',
		},
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record, ) => {
				return <Privilege privs={[ 'memo_leaved_anchored' ]} noMatch={text}> <a
					key="memo"
					onClick={() => {
						setCurrentRecord( record );
						toggleSignUpMemoModalVisible( true );
					}}
				>备注</a></Privilege> 
			}
		},
	];
	
	const getStudentInfo = studentId => cb => {
		dispatch( {
			type: 'student/getStudentInfo',
			payload: studentId,
		} ).then( data => {
			setStudentInfo( data );
			cb();
		} );
	};
	
	const tableActions = [
		<Privilege privs={['after_pay_exam_anchored']} key="after_pay_exam_anchored">
		<Button disabled={selectedRows.length === 0}
		        key="make-up-tuition-button"
		        icon="form"
		        htmlType="button"
		        type="primary"
		        onClick={() => {
			        getStudentInfo( selectedRows[ 0 ].id )( () => setPaymentFeeModalVisible( true ) );
		        }}>收补考费</Button></Privilege>,
		<Privilege privs={['student_refund']} key="student_refund">
			<Button disabled={selectedRows.length === 0} key="drop-out-button" icon="stop" htmlType="button" type="primary"
		        onClick={() => {
			        setDropOutModalVisible( true );
				}}>学员退学</Button></Privilege>,
		<Privilege privs={['change_mobile_anchored']} key="change_mobile_anchored">
			<Button disabled={selectedRows.length === 0} key="tel-button" icon="mobile" htmlType="button" type="primary"
		        onClick={() => {
			        setChangeTelModalVisible( true );
				}}>修改手机号</Button></Privilege>,
		<Privilege privs={['other_bus_fee_studing_anchored']} key="otherCost">
			<Button disabled={selectedRows.length === 0} key="otherCost-btn" htmlType="button" type="primary"
		        onClick={() => {
			        setOtherCostModalVisible( true );
				}}>其它业务收入</Button></Privilege>,
		<Privilege privs={['student_pay_anchored']} key="student_pay_anchored">
			<Button disabled={selectedRows.length === 0} key="otherCost-btn" htmlType="button" type="primary"
		        onClick={() => {
			        toggleAddFeePopVisible( true );
		        }}>学员支出</Button></Privilege>,
	];
	const endTableActions = [
		<Privilege privs={[' add_student_graduated_anchored']} key=" add_student_graduated_anchored">
			<Button key="end"
				icon="form"
				htmlType="button"
				type="primary"
				onClick={() => toggleAddStudentFinishModalVisible( true )}>新增毕业学员</Button>
		</Privilege>
	];
	const paymentFeeLoading = loading.effects[ 'student/afterPayExam' ] || false;
	const dropOutLoading = loading.effects[ 'student/leaveSchool' ] || false;
	const changeTelLoading = loading.effects[ 'student/changeMobile' ] || false;
	
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
	let kmStatus = {
		key: 'kmStatus',
		title: '科目状态',
		type: 'select',
		mode: 'cascader',
		values: [
			{
				dKey: 'km1',
				dValue: '科目一',
				children: [
					{
						dKey: '1',
						dValue: '进行中'
					},
					{
						dKey: '9',
						dValue: '已完成'
					},
				]
			},
			{
				dKey: 'km2',
				dValue: '科目二',
				children: [
					{
						dKey: '0',
						dValue: '待激活'
					},
					{
						dKey: '1',
						dValue: '进行中'
					},
					{
						dKey: '2',
						dValue: '集训中'
					},
					{
						dKey: '6',
						dValue: '委培进行中'
					},
					{
						dKey: '9',
						dValue: '已完成'
					},
				]
			},
			{
				dKey: 'km3',
				dValue: '科目三',
				children: [
					{
						dKey: '0',
						dValue: '待激活'
					},
					{
						dKey: '1',
						dValue: '进行中'
					},
					{
						dKey: '2',
						dValue: '集训中'
					},
					{
						dKey: '6',
						dValue: '委培进行中'
					},
					{
						dKey: '9',
						dValue: '已完成'
					},
				]
			},
			{
				dKey: 'km4',
				dValue: '科目四',
				children: [
					{
						dKey: '0',
						dValue: '待激活'
					},
					{
						dKey: '1',
						dValue: '进行中'
					},
					{
						dKey: '9',
						dValue: '已完成'
					},
				]
			},
		]
	}
	return (
		<Card bodyStyle={
			{ paddingLeft: 0, paddingRight: 0, }
		}>
			<Tabs tabPosition="left" defaultActiveKey="0" activeKey={tabKey} onChange={e => {
				setTabKey( e );
				form.resetFields();
			}}>
				<TabPane tab="学习中" key="0" style={{ paddingRight: 24, }}>
					{
						tabKey === '0' && (
							<WithTableName
								{...props}
								bodyStyle={{ padding: 0, }}
								tableName={tableName1}
								selectedRows={selectedRows}
								tableActions={tableActions}
								setSelectedRows={setSelectedRows}
								needUpdate={needUpdate}
								setNeedUpdate={setNeedUpdate}
								multipleSelection={false}
								originColumns={originColumns0}
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
									/>,
									<WrapperComplexFormItem
										config={FIELDS.STUDENT.LICENSE_TYPE_ACTIVE}
										initialValue={tableSearchParams.licenseType || undefined}
										form={form}
									/>,
									<WrapperComplexFormItem
										config={kmStatus}
										form={form}
										values={kmStatus.values}
										mode={kmStatus.mode}
										initialValue={kmStatus.initialValue}
										status={kmStatus.disabled ? 'disabled' : 'edit'}
									/>
								]}
							/>
						)
					}
				</TabPane>
				<TabPane tab="退学中" key="3" style={{ paddingRight: 24, }}>
					{
						tabKey === '3' && (
							<WithTableName
								{...props}
								bodyStyle={{ padding: 0, }}
								tableName={tableName4}
								originColumns={originColumns1}
								scroll={{ x: 'max-content' }}
								needUpdate={needUpdate3}
								setNeedUpdate={setNeedUpdate3}
								formFields={[
									<WrapperComplexFormItem
										config={FIELDS.STUDENT.QUICK_SEARCH}
										form={form}
									/>,
									<WrapperComplexFormItem
										config={FIELDS.STUDENT.DEPART_ID_SCHOOL}
										form={form}
									/>,
									<WrapperComplexFormItem
										config={FIELDS.STUDENT.LICENSE_TYPE_ACTIVE}
										form={form}
									/>,
									<WrapperComplexFormItem
										config={{
											...FIELDS.FINANCE.REFUND_TYPE,
											title: '退学类型',
											type: 'select',
										}}
										form={form}
									/>,
									<WrapperComplexFormItem
										config={FIELDS.STUDENT.STUDENT_STATUS}
										form={form}
									/>,
									<WrapperComplexFormItem
										config={kmStatus}
										form={form}
										values={kmStatus.values}
										mode={kmStatus.mode}
										initialValue={kmStatus.initialValue}
										status={kmStatus.disabled ? 'disabled' : 'edit'}
									/>
								]}
							/>
						)
					}
				</TabPane>
				<TabPane tab="已退学" key="1" style={{ paddingRight: 24, }}>
					{
						tabKey === '1' && (
							<WithTableName
								{...props}
								bodyStyle={{ padding: 0, }}
								tableName={tableName2}
								originColumns={originColumns3}
								scroll={{ x: 'max-content' }}
								needUpdate={needUpdate1}
								setNeedUpdate={setNeedUpdate1}
								handleFormReset={() => {
									setTableSearchParams({})
									setNeedUpdate1(true)
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
									/>,
									<WrapperComplexFormItem
										config={FIELDS.STUDENT.LICENSE_TYPE_ACTIVE}
										initialValue={tableSearchParams.licenseType || undefined}
										form={form}
									/>,
									<WrapperComplexFormItem
										config={{
											...FIELDS.FINANCE.REFUND_TYPE,
											title: '退学类型',
										}}
										form={form}
									/>,
									<WrapperComplexFormItem
										config={kmStatus}
										form={form}
										values={kmStatus.values}
										mode={kmStatus.mode}
										initialValue={kmStatus.initialValue}
										status={kmStatus.disabled ? 'disabled' : 'edit'}
									/>
								]}
							/>
						)
					}
				</TabPane>
				<TabPane tab="已毕业" key="2" style={{ paddingRight: 24, }}>
					{
						tabKey === '2' && (
							<WithTableName
								{...props}
								bodyStyle={{ padding: 0, }}
								tableName={tableName3}
								originColumns={originColumns2}
								scroll={{ x: 'max-content' }}
								needUpdate={needUpdate2}
								setNeedUpdate={setNeedUpdate2}
								handleFormReset={() => {
									setTableSearchParams({})
									setNeedUpdate2(true)
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
									/>,
									<WrapperComplexFormItem
										config={FIELDS.STUDENT.LICENSE_TYPE_ACTIVE}
										initialValue={tableSearchParams.licenseType || undefined}
										form={form}
									/>,
								]}
								tableActions={endTableActions}
							/>
						)
					}
				</TabPane>
			</Tabs>
			<PaymentFeeModal
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true );
				}}
				dispatch={dispatch}
				form={form}
				handleSubmit={fieldsValue => {
					dispatch( {
						type: 'student/afterPayExam',
						payload: fieldsValue,
					} ).then( data => {
						if ( data !== false ) {
							setPaymentFeeModalVisible( false );
						}
					} )
				}}
				visible={paymentFeeModalVisible}
				setVisible={setPaymentFeeModalVisible}
				selectedRows={selectedRows}
				loading={paymentFeeLoading}
				// studentId={selectedRows.length === 1 && selectedRows[ 0 ].id}
			/>
			<DropOutModal
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true );
				}}
				form={form}
				handleSubmit={fieldsValue => {
					dispatch( {
						type: 'student/leaveSchool',
						payload: fieldsValue,
					} ).then( data => {
						if ( data !== false ) {
							setDropOutModalVisible( false );
						}
					} );
				}}
				visible={dropOutModalVisible}
				setVisible={setDropOutModalVisible}
				selectedRows={selectedRows}
				dictionary={dictionary}
				loading={dropOutLoading}
				// studentId={selectedRows.length === 1 && selectedRows[ 0 ].id}
			/>
			<ChangeTelModal
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true );
				}}
				form={form}
				// id={selectedRows.length === 1 && selectedRows[ 0 ].id}
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
			<AddStudentFinishModal
				dispatch={dispatch}
				studentType={4}
				handleSubmit={() => {
					// toggleAddStudentFinishModalVisible(false)
					setNeedUpdate2(true)
				}}
				visible={addStudentFinishModalVisible}
				setVisible={toggleAddStudentFinishModalVisible}
				handleModalVisible={() => toggleAddStudentFinishModalVisible(false)}
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
		[ tableName3 ]: data3,
		[ tableName4 ]: data4,
		loading,
		global,
		dictionary,
		quickEntryParams
	}
) => (
	{
		[ tableName1 ]: data1,
		[ tableName2 ]: data2,
		[ tableName3 ]: data3,
		[ tableName4 ]: data4,
		memoLoading: loading.effects[ 'student/saveMemo' ] || false,
		loading,
		global,
		dictionary,
		quickEntryParams
	}
) )( Form.create()( Depend ) );
