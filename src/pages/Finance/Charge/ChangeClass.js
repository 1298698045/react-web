import React, { useMemo, useState, } from 'react';
import { useToggle, } from 'react-use';
import { connect } from 'dva';
import {
	Form,
	Card,
	Popconfirm, Menu, Dropdown, Icon, Divider, Spin, Tooltip,message
} from 'antd';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import numeral from 'numeral';
import ConfirmWithFormModal from './ConfirmWithFormModal';
import StudentInfoModal from '@/components/StudentInfoModal';
import printJS from 'print-js';
import { getDictItem, getDictValue } from '@/utils/dictionaryUtil';
import Privilege from '@/components/Privilege';

const tableName = 'financeChargeChangeClassList';

const ChangeClass = props => {
	const { form, dispatch, loading, dictionary, } = props;
	const [ confirmModalVisible, toggleConfirmModalVisible ] = useToggle( false );
	const [ payMode, setPayMode ] = useState( undefined );
	const [ info, setInfo ] = useState( {} );
	const [ studentInfoModalVisible, setStudentInfoModalVisible ] = useState( false );
	const [ studentInfoId, setStudentInfoId ] = useState( undefined );
	
	const confirmLoading = loading.effects[ `${tableName}/insure` ] || false;
	const rejectLoading = loading.effects[ `${tableName}/reject` ] || false;
	const getStudentInfoLoading = loading.effects[ 'student/getInfo' ] || false;
	const [ isSubmit, setIsSubmit ] = useState( false );

	const getStudentInfo = record => {
		const { studentId } = record;
		dispatch( {
			type: 'student/getStudentInfo',
			payload: studentId,
		} ).then( student => {
			const { id, } = record;
			
			const value0 = record[ FIELDS.STUDENT.NAME.key ];
			const value1 = student.baseInfo[ FIELDS.STUDENT.MAJOR_CARD_CODE.key ];
			const value2 = student[ FIELDS.FINANCE.KM2_LESSONS.key ];
			const value3 = student[ FIELDS.FINANCE.KM2_SURPLUS.key ];
			const value4 = student[ FIELDS.FINANCE.KM3_LESSONS.key ];
			const value5 = student[ FIELDS.FINANCE.KM3_SURPLUS.key ];
			
			setInfo( {
				infoType: 'changeClass',
				[ FIELDS.STUDENT.NAME.key ]: value0,
				[ FIELDS.STUDENT.MAJOR_CARD_CODE.key ]: value1,
				[ FIELDS.FINANCE.KM2_LESSONS.key ]: value2,
				[ FIELDS.FINANCE.KM2_SURPLUS.key ]: value3,
				[ FIELDS.FINANCE.KM3_LESSONS.key ]: value4,
				[ FIELDS.FINANCE.KM3_SURPLUS.key ]: value5,
				id,
			} );
			toggleConfirmModalVisible( true );
		} )
	};
	
	const confirm = data => {
		const submitData = { ...data };
		delete submitData.print;
		setIsSubmit(true)
		if (isSubmit) {
			message.error('您已确认，不允许重复操作!')
			return false
		}
		dispatch( {
			type: `${tableName}/insure`,
			payload: {
				...submitData,
			},
		} ).then( journalId => {
			setIsSubmit(false)
			toggleConfirmModalVisible( false );
			if ( data.print ) {
				dispatch( {
					type: `${tableName}/print`,
					payload: {
						studentId: info.id,
						journalId,
						action: 'CHANGE_CLASS',
					}
				} ).then( data => {
					if ( data !== false ) {
						printJS( 'data:image/jpg;base64,' + data, 'image' );
					}
				} );
			}
		} )
	};
	
	const originColumns = useMemo( () => {
		const menu = record => (
			<Menu
				onClick={( { key } ) => {
					setPayMode( key );
					if ( getStudentInfoLoading ) return false;
					getStudentInfo( record );
				}}
			>
				{
					dictionary[ FIELDS.FINANCE.PAY_MODE.dictionary ] && dictionary[ FIELDS.FINANCE.PAY_MODE.dictionary ].map( ( { dKey, dValue } ) => (
						<Menu.Item key={dKey}>{dValue}</Menu.Item>
					) )
				}
			</Menu>
		);
		
		return [
			{
				title: '序号',
				key: 'key',
			},
			{
				...FIELDS.STUDENT.NAME,
				customRender: ( text, record, ) => {
					return (
						<Privilege privs={[ 'pay_change_classpattern_detail' ]}  noMatch={text}>
						<a onClick={e => {
							e.stopPropagation();
							setStudentInfoId( record.studentId );
							setStudentInfoModalVisible( true );
						}}>
							{text}
						</a>
						</Privilege>
					)
				}
			},
			FIELDS.FINANCE.MOBILE,
			FIELDS.STUDENT.MAJOR_CARD_CODE,
			FIELDS.STUDENT.LICENSE_TYPE,
			{
				...FIELDS.FINANCE.ORIGINAL_VALUE,
				customRender: ( text, record, ) => {
					console.log( record );
					const c = getDictItem( dictionary, FIELDS.FINANCE.ORIGINAL_VALUE.dictionary, record[ FIELDS.FINANCE.ORIGINAL_VALUE.key ] );
					const type = getDictValue( dictionary, FIELDS.FINANCE.FEE_TYPE.dictionary, c[ FIELDS.FINANCE.FEE_TYPE.key ] );
					if ( type === '全款' ) return <Tooltip
						title={`${type}： ${c.money}元`}><a>{getDictValue( dictionary, FIELDS.FINANCE.ORIGINAL_VALUE.dictionary, record[ FIELDS.FINANCE.ORIGINAL_VALUE.key ] )}</a></Tooltip>;
					if ( type === '首付' ) return <Tooltip
						title={<>
							<div>{`${type}： ${c.money}元`}</div>
							<div>{`欠款： ${c.balance}元`}</div>
						</>}><a>{getDictValue( dictionary, FIELDS.FINANCE.ORIGINAL_VALUE.dictionary, record[ FIELDS.FINANCE.ORIGINAL_VALUE.key ] )}</a></Tooltip>;
					if ( type === '课时' ) return <Tooltip
						title={<>
							<div>{`${type}： ${c.money}元`}</div>
							<div>{`科目二： ${c.km2Lessons}节`}</div>
							<div>{`科目三： ${c.km3Lessons}节`}</div>
						</>}><a>{getDictValue( dictionary, FIELDS.FINANCE.ORIGINAL_VALUE.dictionary, record[ FIELDS.FINANCE.ORIGINAL_VALUE.key ] )}</a></Tooltip>;
					
				}
			},
			{
				...FIELDS.FINANCE.NEW_VALUE,
				customRender: ( text, record, ) => {
					const c = getDictItem( dictionary, FIELDS.FINANCE.NEW_VALUE.dictionary, record[ FIELDS.FINANCE.NEW_VALUE.key ] );
					const type = getDictValue( dictionary, FIELDS.FINANCE.FEE_TYPE.dictionary, c[ FIELDS.FINANCE.FEE_TYPE.key ] );
					if ( type === '全款' ) return <Tooltip
						title={`${type}： ${c.money}元`}><a>{getDictValue( dictionary, FIELDS.FINANCE.NEW_VALUE.dictionary, record[ FIELDS.FINANCE.NEW_VALUE.key ] )}</a></Tooltip>;
					if ( type === '首付' ) return <Tooltip
						title={<>
							<div>{`${type}： ${c.money}元`}</div>
							<div>{`欠款： ${c.balance}元`}</div>
						</>}><a>{getDictValue( dictionary, FIELDS.FINANCE.NEW_VALUE.dictionary, record[ FIELDS.FINANCE.NEW_VALUE.key ] )}</a></Tooltip>;
					if ( type === '课时' ) return <Tooltip
						title={<>
							<div>{`${type}： ${c.money}元`}</div>
							<div>{`科目二： ${c.km2Lessons}节`}</div>
							<div>{`科目三： ${c.km3Lessons}节`}</div>
						</>}><a>{getDictValue( dictionary, FIELDS.FINANCE.NEW_VALUE.dictionary, record[ FIELDS.FINANCE.NEW_VALUE.key ] )}</a></Tooltip>;
					
				}
			},
			{
				...FIELDS.FINANCE.RECEIPTS,
				title: '已报名交费',
				customRender: ( text, record, ) => {
					return numeral( Number( text ) + Number( record.valueAdded ) ).format( '0,0' );
				}
			},
			{
				title: '操作',
				key: 'actions',
				customRender: ( text, record, ) => {
					return [
						<Privilege privs={[ 'pay_change_classpattern_comfrim' ]}  key="pay_change_classpattern_comfrim">
							<Dropdown key="confirm" overlay={menu( record )}>
								<a>{getStudentInfoLoading && <Spin size="small"/>} 确认收费 <Icon type="down"/></a>
							</Dropdown>
						</Privilege>,
						<Privilege privs={[ 'pay_change_classpattern_comfrim' ]}  key="pay_change_classpattern_comfrim2">
							<Divider key="divider" type="vertical"/>
						</Privilege>,
						<Privilege privs={[ 'pay_change_classpattern_cancel' ]}  key="pay_change_classpattern_cancel">
						<Popconfirm
							key="cancel"
							title="确认取消交费吗？"
							onConfirm={() => {
								const { id } = record;
								dispatch( {
									type: `${tableName}/reject`,
									payload: id,
								} ).then( data => {
									if ( data !== false ) {
										dispatch( {
											type: `${tableName}/refresh`,
										} );
									}
								} );
							}}
						>
							<a>{rejectLoading && <Spin size="small"/>} 取消交费</a>
						</Popconfirm></Privilege>,
					]
				}
			},
		]
	}, [ dictionary ] );
	
	return (
		<Card>
			<WithTableName
				{...props}
				bodyStyle={{ padding: 0, }}
				tableName={tableName}
				originColumns={originColumns}
				multipleSelection={false}
				scroll={{ x: 'max-content' }}
				formFields={[
					<WrapperComplexFormItem
						config={FIELDS.FINANCE.QUICK_SEARCH}
						form={form}
					/>,
					<WrapperComplexFormItem
						config={FIELDS.FINANCE.SEARCH_DATE}
						col={9}
						form={form}
					/>,
				]}
			/>
			<ConfirmWithFormModal
				loading={confirmLoading}
				data={info}
				dictionary={dictionary}
				afterClose={() => {
					dispatch( {
						type: `${tableName}/refresh`,
					} );
					setInfo( {} );
				}}
				handleSubmit={fieldsValue => confirm( fieldsValue )}
				payMode={payMode}
				visible={confirmModalVisible}
				setVisible={toggleConfirmModalVisible}
			/>
			<StudentInfoModal
				studentId={studentInfoId}
				visible={studentInfoModalVisible}
				setVisible={setStudentInfoModalVisible}
				dictionary={dictionary}
				dispatch={dispatch}
			/>
		</Card>
	);
};

export default connect( (
	{
		[ tableName ]: data1,
		loading,
		global,
		dictionary,
	}
) => (
	{
		[ tableName ]: data1,
		loading,
		global,
		dictionary,
	}
) )( Form.create()( ChangeClass ) );
