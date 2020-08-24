import React, { useState, useMemo, } from 'react';
import { useToggle } from 'react-use';
import { connect } from 'dva';
import numeral from 'numeral';
import {
	Form,
	Card,
	Dropdown,
	Menu,
	Icon,
	Popconfirm,
	Divider,
	Spin, Tooltip,message
} from 'antd';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import ConfirmModal from './ConfirmModal';
import StudentInfoModal from '@/components/StudentInfoModal';
import printJS from 'print-js';
import { getDictItem, getDictValue } from '@/utils/dictionaryUtil';
import Privilege from '@/components/Privilege';

const tableName = 'financeChargeMakeUpTuitionList';

const MakeUpTuition = props => {
	const { form, dispatch, dictionary, loading, } = props;
	const [ confirmModalVisible, toggleConfirmModalVisible ] = useToggle( false );
	const [ payMode, setPayMode ] = useState( undefined );
	const [ financeInfo, setFinanceInfo ] = useState( {} );
	const [ studentInfoModalVisible, setStudentInfoModalVisible ] = useState( false );
	const [ studentInfoId, setStudentInfoId ] = useState( undefined );
	
	const confirmLoading = loading.effects[ `${tableName}/insure` ] || false;
	const rejectLoading = loading.effects[ `${tableName}/reject` ] || false;
	const [ isSubmit, setIsSubmit ] = useState( false );

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
			if ( journalId !== false ) {
				toggleConfirmModalVisible( false );
				if ( data.print ) {
					dispatch( {
						type: `${tableName}/print`,
						payload: {
							studentId: financeInfo.id,
							journalId,
							action: 'AFTER_PAY_TUITION',
						}
					} ).then( data => {
						if ( data !== false ) {
							printJS( 'data:image/jpg;base64,' + data, 'image' );
						}
					} );
				}
			}
		} )
	};
	
	const originColumns = useMemo( () => {
		const menu = record => (
			<Menu
				onClick={( { key } ) => {
					setPayMode( key );
					setFinanceInfo( record );
					toggleConfirmModalVisible( true );
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
						<Privilege privs={[ 'after_pay_tuition_detail' ]}  noMatch={text}>
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
			FIELDS.STUDENT.CLASS_ID,
			{
				...FIELDS.FINANCE.FEE_TYPE,
				customRender: ( text, { classId }, ) => {
					// console.log( classId, dictionary );
					if ( classId ) {
						const item = getDictItem( dictionary, FIELDS.STUDENT.CLASS_ID.dictionary, classId );
						let title = '';
						if ( item[ FIELDS.FINANCE.FEE_TYPE.key ] === 'full_pay' ) {
							// 全款
							title = `全款：${numeral( Number( item.money ) ).format( '0,0' )}元`;
						} else if ( item[ FIELDS.FINANCE.FEE_TYPE.key ] === 'down_pay' ) {
							// 首付
							title =
								<div>{`首付：${numeral( Number( item.money ) ).format( '0,0' )}元`}<br/>{`欠款：${numeral( Number( item.balance ) ).format( '0,0' )}元`}
								</div>;
						} else {
							// 课时
							title =
								<div>{`科目二：${numeral( Number( item.km2Fee ) ).format( '0,0' )}元`}<br/>{`科目三：${numeral( Number( item.km3Fee ) ).format( '0,0' )}元`}
								</div>;
						}
						
						return (
							<Tooltip title={title}>
								<a>{getDictValue( dictionary, FIELDS.FINANCE.FEE_TYPE.dictionary, item[ FIELDS.FINANCE.FEE_TYPE.key ] )}</a>
							</Tooltip>
						);
					}
					
					return '暂无';
				}
			},
			{
				...FIELDS.FINANCE.RECEIPTS,
				title: '已报名交费',
				customRender: text => {
					return numeral( Number( text ) ).format( '0,0' );
				}
			},
			{
				...FIELDS.FINANCE.AMOUNT,
				customRender: text => {
					return numeral( Number( text ) ).format( '0,0' );
				}
			},
			{
				title: '操作',
				key: 'actions',
				customRender: ( text, record, ) => {
					return [
						<Privilege privs={[ 'after_pay_tuition_comfrim' ]}  key="after_pay_tuition_comfrim">
						<Dropdown key="confirm" overlay={menu( record )}>
							<a>确认收费 <Icon type="down"/></a>
						</Dropdown></Privilege>,
						<Privilege privs={[ 'after_pay_tuition_comfrim' ]}  key="after_pay_tuition_comfrim2"><Divider key="divider" type="vertical"/></Privilege>,
						<Privilege privs={[ 'after_pay_tuition_cancel' ]}  key="after_pay_tuition_cancel">
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
			<ConfirmModal
				loading={confirmLoading}
				data={financeInfo}
				dictionary={dictionary}
				afterClose={() => {
					dispatch( {
						type: `${tableName}/refresh`,
					} );
					setFinanceInfo( {} );
				}}
				handleSubmit={fieldsValue => confirm( fieldsValue )}
				payMode={payMode}
				visible={confirmModalVisible}
				setVisible={toggleConfirmModalVisible}
				dispatch={dispatch}
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
) )( Form.create()( MakeUpTuition ) );
