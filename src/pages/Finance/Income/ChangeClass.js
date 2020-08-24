import React, { useState } from 'react';
import { connect } from 'dva';
import {
	Form,
	Card,
	Tooltip,
} from 'antd';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import numeral from 'numeral';
import { getDictValue, getDictItem } from '@/utils/dictionaryUtil';
import StudentInfoModal from '@/components/StudentInfoModal';
import printJS from 'print-js';
import Privilege from '@/components/Privilege';
import Buttons from '@/components/Buttons';
import RemarkModal from "./RemarkModal";

const tableName = 'financeIncomeChangeClassList';

const ChangeClass = props => {
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
					<Privilege privs={[ 'apply_charge_change_classpattern_detail' ]}  noMatch={text}>
					<a onClick={e => {
						e.stopPropagation();
						setStudentInfoId( record.studentId );
						setStudentInfoModalVisible( true );
					}}>
						{text}
					</a></Privilege>
				)
			}
		},
		FIELDS.FINANCE.MOBILE,
		FIELDS.STUDENT.MAJOR_CARD_CODE,
		FIELDS.STUDENT.LICENSE_TYPE,
		{
			...FIELDS.FINANCE.ORIGINAL_VALUE,
			customRender: ( text, record, ) => {
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
			title: '本次交费',
			customRender: ( text, record, ) => {
				return numeral( Number( record.amount ) ).format( '0,0' );
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
					<Privilege privs={[ 'apply_charge_change_classpattern_print' ]}  noMatch={'打印收据'}>
					<a key="cancel" onClick={() => {
						dispatch( {
							type: `${tableName}/print`,
							payload: {
								studentId,
								journalId,
								action: 'CHANGE_CLASS',
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
		changeClass,
		dictionary,
	}
) => (
	{
		[ tableName ]: data1,
		loading,
		global,
		changeClass,
		dictionary,
	}
) )( Form.create()( ChangeClass ) );
