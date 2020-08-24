import React, { useState } from 'react';
import { connect } from 'dva';
import {
	Form,
	Card, Tag,
} from 'antd';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import { getDictValue } from '@/utils/dictionaryUtil';
import StudentInfoModal from '@/components/StudentInfoModal';
import printJS from 'print-js';
import style from '@/pages/Student/StudentList/index.less';
import Privilege from '@/components/Privilege';
import Buttons from '@/components/Buttons';
import RemarkModal from "./RemarkModal";
const tableName = 'financeIncomeAddProxyFeeList';

const AddProxyFee = props => {
	const { form, dictionary, dispatch, loading} = props;
	
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
					<Privilege privs={[ 'add_proxy_km_fee_detail' ]}  noMatch={text}>
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
		FIELDS.STUDENT.CLASS_ID,
		{
			title: '代培科目',
			key: 'newValue',
			dictionary: 'km',
		},
		{
			...FIELDS.FINANCE.AMOUNT,
			title: '代培费用',
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
					<Privilege privs={[ 'add_proxy_km_fee_print' ]}  noMatch={'打印收据'}>
					<a key="cancel" onClick={() => {
						dispatch( {
							type: `${tableName}/print`,
							payload: {
								studentId,
								journalId,
								action: 'ADD_PROXY_TRAIN_KM',
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
) )( Form.create()( AddProxyFee ) );
