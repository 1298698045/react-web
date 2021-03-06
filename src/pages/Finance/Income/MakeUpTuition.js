import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import {
	Form,
	Card, Tooltip,
} from 'antd';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import numeral from 'numeral';
import { getDictItem, getDictValue } from '@/utils/dictionaryUtil';
import StudentInfoModal from '@/components/StudentInfoModal';
import printJS from 'print-js';
import Privilege from '@/components/Privilege';
import Buttons from '@/components/Buttons';
import RemarkModal from "./RemarkModal";

const tableName = 'financeIncomeMakeUpTuitionList';

const MakeUpTuition = props => {
	const { form, dictionary, dispatch, loading } = props;
	
	const [ studentInfoModalVisible, setStudentInfoModalVisible ] = useState( false );
	const [ studentInfoId, setStudentInfoId ] = useState( undefined );
	const [ addRemarkVisible, setAddRemarkVisible ] = useState( false );

	const originColumns = [
		{
			title: '序号',
			key: 'key',
		},
		{
			...FIELDS.STUDENT.NAME,
			customRender: ( text, record, ) => {
				return (
					<Privilege privs={[ 'after_apply_charge_detail' ]}  noMatch={text}>
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
			title: '收费人',
			key: 'payee',
			customRender: ( text, record ) => {
				const { operator } = record;
				if ( operator && operator.operatorId ) {
					
					const employee = dictionary[ FIELDS.EMPLOYEE.ID.dictionary ].find( ( { uid } ) => String( uid ) === String( operator.operatorId ) );
					
					if ( employee ) {
						return employee.name;
					}
				}
				return '暂无';
			},
		},
		{
			title: '收费时间',
			key: 'payTime',
		},
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record, ) => {
				const { studentId, journalId } = record;
				return (
					<Buttons>
					{/* // <Privilege privs={[ 'apply_charge_print' ]}  noMatch={'打印收据'}> */}
					<a key="remark" onClick={() => {
						setStudentInfoId( record.studentId );
						setAddRemarkVisible(true)
					}}>备注</a>
					{/* // </Privilege> */}
					<Privilege privs={[ 'after_apply_charge_print' ]}  noMatch={'打印收据'}>
					<a key="cancel" onClick={() => {
						dispatch( {
							type: `${tableName}/print`,
							payload: {
								studentId,
								journalId,
								action: 'AFTER_PAY_TUITION',
							}
						} ).then( data => {
							if ( data !== false ) {
								printJS( 'data:image/jpg;base64,' + data, 'image' );
							}
						} );
					}}>打印收据</a></Privilege>
					</Buttons>
				)
			},
		},
	];
	
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
			<StudentInfoModal
				studentId={studentInfoId}
				visible={studentInfoModalVisible}
				setVisible={setStudentInfoModalVisible}
			/>
			<RemarkModal
				studentId={studentInfoId}
				visible={addRemarkVisible}
				setVisible={setAddRemarkVisible}
				loading={loading.effects[ `income/addMemo` ]}
				onSubmit={params => {
					return dispatch( {
						type: `income/addMemo`,
						params,
					} ).then( () => {
						setAddRemarkVisible(false)
					} );
				}}
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
