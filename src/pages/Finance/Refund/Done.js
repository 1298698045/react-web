import React, { useMemo, useState } from 'react';
import { connect } from 'dva';
import {
	Form,
	Card,
} from 'antd';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import StudentInfoModal from '@/components/StudentInfoModal';
import Privilege from '@/components/Privilege';

const tableName = 'financeRefundDoneList';

const fields = [
	{
		...FIELDS.STUDENT.QUICK_SEARCH,
		title: '关键字',
	},
	FIELDS.FINANCE.REFUND_TYPE,
	FIELDS.FINANCE.OP_STATUS,
];

const Await = props => {
	const { form, dictionary } = props;
	
	const [ studentInfoModalVisible, setStudentInfoModalVisible ] = useState( false );
	const [ studentInfoId, setStudentInfoId ] = useState( undefined );
	
	const originColumns = [
		{
			title: '序号',
			key: 'key',
		},
		{
			...FIELDS.STUDENT.NAME,
			customRender: ( text, record, ) => {
				return (
					<Privilege privs={[ 'wait_return_fee_complete_detail' ]}  noMatch={text}>
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
		FIELDS.FINANCE.REFUND_TYPE,
		{
			...FIELDS.FINANCE.REFUND_REASON,
			customRender: text => {
				if ( dictionary ) {
					const dics = [ ...dictionary[ 'quit_reason' ], ...dictionary[ 'stop_reason' ] ];
					const item = dics.find( ( { dKey } ) => dKey === String( text ) );
					if ( item ) {
						return item.dValue;
					}
				}
				
				return text || '暂无';
			}
		},
		{
			...FIELDS.FINANCE.AMOUNT,
			title: '退费金额（元）',
		},
		{
			title: '支出人',
			key: 'refundPerson',
			customRender: text => {
				if ( text ) {
					
					const employee = dictionary[ FIELDS.EMPLOYEE.ID.dictionary ].find( ( { uid } ) => String( uid ) === String( text ) );
					
					if ( employee ) {
						return employee.name;
					}
				}
				return '暂无';
			},
		},
		FIELDS.FINANCE.CREATE_TIME,
		FIELDS.STUDENT.MEMO,
	];
	
	const formFields = useMemo( () => {
		return fields.map( f => (
			<WrapperComplexFormItem
				config={f}
				form={form}
			/>
		) );
	}, [ form ] );
	
	return (
		<Card>
			<WithTableName
				{...props}
				bodyStyle={{ padding: 0, }}
				tableName={tableName}
				originColumns={originColumns}
				multipleSelection={false}
				scroll={{ x: 'max-content' }}
				formFields={formFields}
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
