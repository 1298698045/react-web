import React, { useState, } from 'react';
import { useToggle, } from 'react-use';
import moment from 'moment';
import { connect } from 'dva';
import {
	Form,
	Button,
	Card,
	Divider,
	Popconfirm,
} from 'antd';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import Privilege from '@/components/Privilege';
import { getDictValue, queryDictionary } from '@/utils/dictionaryUtil';
import StudentInfoModal from '@/components/StudentInfoModal';
import printJS from 'print-js';
import Buttons from '@/components/Buttons';
import RemarkModal from "./RemarkModal";
const tableName = 'studentInfoOtherCostList';

const OtherCost = props => {
		const { form, loading, dispatch, dictionary } = props;
		const [ needUpdate, setNeedUpdate ] = useToggle( false );
		const [ studentInfoId, setStudentInfoId ] = useState( undefined );
		const [ studentInfoModalVisible, setStudentInfoModalVisible ] = useState( false );
		const [ addRemarkVisible, setAddRemarkVisible ] = useState( false );

		const originColumns = [
			{
				title: '序号',
				key: 'key',
			},
			{
				...FIELDS.STUDENT.OTHER_COST_TYPE,
				customRender: ( text, record, ) => {
					return getDictValue( dictionary, 'other_income_type_manage', record[FIELDS.STUDENT.OTHER_COST_TYPE.key] )
				}
			},
			{
				...FIELDS.STUDENT.OTHER_COST_KM,
				customRender: ( text, record, ) => {
					return getDictValue( dictionary, record[FIELDS.STUDENT.OTHER_COST_TYPE.key], record[FIELDS.STUDENT.OTHER_COST_KM.key] );
				}
			},
			{
				...FIELDS.STUDENT.OTHER_COST_AMOUNT,
				title: '费用金额',
				customRender: text => String( text ).replace( /\B(?=(\d{3})+(?!\d))/g, ',' )
			},
			{
				...FIELDS.STUDENT.NAME,
				title: '学员姓名',
				customRender: ( text, record, ) => {
					return (
						<Privilege privs={[ 'detail_other_bus_fee_charge_manage' ]}  noMatch={text}>
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
			{...FIELDS.FINANCE.MOBILE, title: '学员手机号'},
			FIELDS.STUDENT.OTHER_COST_DATE,
			FIELDS.FINANCE.RECEIPT_NUMBER,
			FIELDS.STUDENT.OTHER_COST_MEMO,
			{ key:'payTime', title: '交费时间'},
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
						<Privilege privs={[ 'print_other_bus_fee_charge_manage' ]} key="print_other_bus_fee_charge_manage">
							<a key="print" onClick={() => {
								dispatch( {
									type: `${tableName}/print`,
									payload: {
										studentId,
										journalId,
										action: 'other_income_type_manage',
									}
								} ).then( data => {
									if ( data !== false ) {
										printJS( 'data:image/jpg;base64,' + data, 'image' );
									}
								} );
							}}>打印收据</a>
						</Privilege>
						</Buttons>
					)
				}
			},
		];
		
		
		const year = moment().format( 'YYYY' );
		
		return (
			<Card>
				<WithTableName
					{...props}
					bodyStyle={{ padding: 0, }}
					tableName={tableName}
					originColumns={originColumns}
					multipleSelection={false}
					scroll={{ x: 'max-content' }}
					needUpdate={needUpdate}
					setNeedUpdate={setNeedUpdate}
					formFields={[
						<WrapperComplexFormItem
							config={FIELDS.STUDENT.OTHER_COST_DATE}
							form={form}
						/>,
						<WrapperComplexFormItem
							config={{...FIELDS.FINANCE.QUICK_SEARCH}}
							form={form}
						/>,
					]}
				/>
				<StudentInfoModal
					studentId={studentInfoId}
					visible={studentInfoModalVisible}
					setVisible={setStudentInfoModalVisible}
					dictionary={dictionary}
					dispatch={dispatch}
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
	}
;

export default connect( (
	{
		[ tableName ]: data1,
		loading,
		global,
		signUp,
		dictionary,
	}
) => (
	{
		[ tableName ]: data1,
		loading,
		global,
		signUp,
		dictionary,
	}
) )( Form.create()( OtherCost ) );
