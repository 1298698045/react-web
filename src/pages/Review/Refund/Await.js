import React, { useState, useEffect } from 'react';
import { useEffectOnce, useToggle, } from 'react-use';
import { connect } from 'dva';
import {
	Form,
	Card,
	Typography,
} from 'antd';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import ReviewModal from './ReviewModal';
import StudentInfoModal from '@/components/StudentInfoModal';
import { queryDictionary } from '@/utils/dictionaryUtil';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import Privilege from '@/components/Privilege';

const { Text } = Typography;

const tableName = 'reviewRefundAwaitList';

const Await = props => {
	const { dispatch, dictionary, user, [ tableName ]: rover,form } = props;
	const { isApprover } = rover;
	
	const [ info, setInfo ] = useState( {} );
	const [ reviewModalVisible, toggleReviewModalVisible ] = useToggle( false );
	const [ needUpdate, setNeedUpdate ] = useToggle( false );
	const [ studentInfoModalVisible, setStudentInfoModalVisible ] = useState( false );
	const [ studentInfoId, setStudentInfoId ] = useState( undefined );
	// const [ canReview, toggleCanReview ] = useToggle( true );
	
	useEffectOnce( () => {
		queryDictionary( dispatch, 'employee_id' );
	} );
	// useEffect( () => {
	// 	dispatch( {
	// 		type: 'systemConfig/queryOtherSetting',
	// 	} ).then( data => {
	// 		const { refund_approver } = data;
	// 		const { currentUser } = user;
	// 		if ( dictionary[ 'employee_id' ] ) {
	// 			const employee = dictionary[ 'employee_id' ].find( ( { dKey } ) => dKey === String( refund_approver ) );
	//
	// 			if ( currentUser && employee ) {
	// 				const { userId } = currentUser;
	// 				const { uid } = employee;
	//
	// 				if ( userId ) {
	// 					toggleCanReview( String( userId ) === String( uid ) )
	// 				}
	// 			}
	// 		}
	// 	} );
	// }, [ dictionary.employee_id ] );
	
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
			key: 'operator',
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
		{
			...FIELDS.FINANCE.CREATE_TIME,
			key: 'reporterTime',
			title: '提报时间',
		},
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record, ) => {
				return (
					<Privilege privs={[ 'examine' ]}  noMatch={'审核处理'}>
					 {
					record.hasApproverPriv ? (
						<a onClick={() => {
							setInfo( record );
							toggleReviewModalVisible( true );
						}}>审核处理</a>
					) :
					<Text disabled>审核处理</Text>
					}</Privilege>
				)
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
				needUpdate={needUpdate}
				setNeedUpdate={setNeedUpdate}
				scroll={{ x: 'max-content' }}
				formFields={[
					<WrapperComplexFormItem
						config={FIELDS.FINANCE.QUICK_SEARCH}
						form={form}
					/>,
					<WrapperComplexFormItem
						config={{...FIELDS.FINANCE.SEARCH_DATE, title:"提报日期"}}
						form={form}
					/>,
					<WrapperComplexFormItem
						config={FIELDS.FINANCE.REFUND_TYPE}
						form={form}
					/>,
				]}
			/>
			<ReviewModal
				dictionary={dictionary}
				afterClose={() => setNeedUpdate( true )}
				data={info}
				visible={reviewModalVisible}
				setVisible={toggleReviewModalVisible}
				dispatch={dispatch}
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
		user,
	}
) => (
	{
		[ tableName ]: data1,
		loading,
		global,
		signUp,
		dictionary,
		user,
	}
) )( Form.create()( Await ) );
