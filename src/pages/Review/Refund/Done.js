import React, { useState } from 'react';
import { connect } from 'dva';
import {
	Form,
	Card,
} from 'antd';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import StudentInfoModal from '@/components/StudentInfoModal';
import { useToggle } from 'react-use';
import ReviewModal from '@/pages/Review/Refund/ReviewModal';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import Privilege from '@/components/Privilege';

const tableName = 'reviewRefundDoneList';

const Await = props => {
	const { dispatch, dictionary, form } = props;
	
	const [ studentInfoModalVisible, setStudentInfoModalVisible ] = useState( false );
	const [ reviewModalVisible, toggleReviewModalVisible ] = useToggle( false );
	const [ info, setInfo ] = useState( {} );
	const [ studentInfoId, setStudentInfoId ] = useState( undefined );
	
	const originColumns = [
		{
			title: '序号',
			key: 'key',
		},
		FIELDS.STUDENT.NAME,
		FIELDS.FINANCE.MOBILE,
		FIELDS.FINANCE.REFUND_TYPE,
		FIELDS.STUDENT.MEMO,
		{
			key: 'reporter',
			title: '提报人',
			customRender: ( text, record ) => {
				const { reporter } = record;
				
				if ( reporter && dictionary[ FIELDS.EMPLOYEE.ID.dictionary ] ) {
					
					const employee = dictionary[ FIELDS.EMPLOYEE.ID.dictionary ].find( ( { uid } ) => String( uid ) === String( reporter ) );
					
					if ( employee ) {
						return employee.name;
					}
				}
				return '暂无';
			},
		},
		FIELDS.FINANCE.CREATE_TIME,
		{
			...FIELDS.FINANCE.APPROVER,
			title: '审批人',
			customRender: ( text, record ) => {
				const { operator } = record;
				
				if ( operator && dictionary[ FIELDS.EMPLOYEE.ID.dictionary ] ) {
					
					const employee = dictionary[ FIELDS.EMPLOYEE.ID.dictionary ].find( ( { uid } ) => String( uid ) === String( operator ) );
					
					if ( employee ) {
						return employee.name;
					}
				}
				return '暂无';
			},
		},
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record, ) => {
				return [
				<Privilege privs={[ 'detail_return_fee_complete' ]} key="" noMatch={'查看详情'}>
					<a key="confirm" onClick={() => {
						setInfo( record );
						toggleReviewModalVisible( true );
					}}>查看详情</a>
				</Privilege>
				]
			}
		},
	];

	return (
		<Card>
			<WithTableName
				{...props}
				bodyStyle={{ padding: 0, }}
				tableName={tableName}
				originColumns={originColumns}
				multipleSelection={false}
				formFields={[
					<WrapperComplexFormItem
						config={FIELDS.FINANCE.QUICK_SEARCH}
						form={form}
					/>,
					<WrapperComplexFormItem
						config={{...FIELDS.FINANCE.SEARCH_DATE, title:"审核日期"}}
						form={form}
					/>,
					<WrapperComplexFormItem
						config={FIELDS.FINANCE.REFUND_TYPE}
						form={form}
					/>,
				]}
				scroll={{ x: 'max-content' }}
			/>
			<ReviewModal
				dispatch={dispatch}
				dictionary={dictionary}
				data={info}
				visible={reviewModalVisible}
				setVisible={toggleReviewModalVisible}
			/>
			<StudentInfoModal
				studentId={studentInfoId}
				visible={studentInfoModalVisible}
				setVisible={setStudentInfoModalVisible}
			/>
		</Card>
	);
};

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
) )( Form.create()( Await ) );
