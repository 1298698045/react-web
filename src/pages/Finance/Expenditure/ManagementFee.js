import React, { useState, } from 'react';
import { useEffectOnce, useGetSet, useToggle, } from 'react-use';
import { connect } from 'dva';
import {
	Form,
	Button,
	Card,
	Popconfirm,
} from 'antd';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import { getDictValue, queryDictionary } from '@/utils/dictionaryUtil';
import numeral from 'numeral';
import AddFeeModal from '@/pages/Finance/Expenditure/AddFeeModal';
import InfoModal from '@/pages/Finance/Expenditure/InfoModal';
import Privilege from '@/components/Privilege';

const tableName = 'financeExpenditureManagementFeeList';

const ManagementFee = props => {
	const { form, dispatch, dictionary, loading, } = props;
	
	useEffectOnce( () => {
		queryDictionary( dispatch, 'car_id' );
		queryDictionary( dispatch, 'employee_id' );
		queryDictionary( dispatch, 'department' );

	} );
	
	const [ selectedRows, setSelectedRows ] = useState( [] );
	const [ addFeePopVisible, toggleAddFeePopVisible ] = useToggle( false );
	const [ infoModalVisible, toggleInfoModalVisible ] = useToggle( false );
	const [ needUpdate, setNeedUpdate ] = useToggle( false );
	const [ getRecord, setRecord ] = useGetSet( {} );
	const [ getMore, setMore ] = useGetSet( [] );
	
	const originColumns = [
		{
			title: '序号',
			key: 'key',
		},
		{
			...FIELDS.FINANCE.EX_JOURNAL_TYPE,
			customRender: ( text, record, ) => {
				const type = record[ FIELDS.FINANCE.EX_JOURNAL_TYPE.key ].split( '.' )[ 0 ];
				return (
					<Privilege privs={[ 'bussiness_expend_detail' ]}  noMatch={getDictValue( dictionary, 'outlay_type_manage', type )}>
					<a onClick={e => {
						e.stopPropagation();
						let item = record
						if (record.more.studentId) {
							dispatch( {
								type: 'student/getStudentInfo',
								payload: record.more.studentId,
							} ).then( res => {
								item.more.studentName = res.name + '_' + res.mobile
								setRecord( item );
								toggleInfoModalVisible( true );
							} );
						} else {
							setRecord( record );
							toggleInfoModalVisible( true );
						}
					}}>{getDictValue( dictionary, 'outlay_type_manage', type )}</a></Privilege>)
			}
		},
		{
			...FIELDS.FINANCE.EX_JOURNAL_SUBTYPE,
			customRender: ( text, record, ) => {
				const type = record[ FIELDS.FINANCE.EX_JOURNAL_TYPE.key ].split( '.' )[ 0 ];
				const subType = record[ FIELDS.FINANCE.EX_JOURNAL_TYPE.key ].split( '.' )[ 1 ];
				return getDictValue( dictionary, type, subType );
			}
		},
		{
			...FIELDS.FINANCE.AMOUNT,
			title: '支付金额（元）',
			customRender: text => {
				if ( text < 0 ) {
					return numeral( text * -1 ).format( '0,0.00' );
				}
				
				return numeral( text ).format( '0,0.00' );
			}
		},
		FIELDS.FINANCE.EX_JOURNAL_TARGET,
		FIELDS.FINANCE.PAY_MODE,
		FIELDS.FINANCE.JOURNAL_DATE,
		FIELDS.FINANCE.EX_JOURNAL_REPORTER,
		{
			title: '登记时间',
			key: 'createTime',
		},
		{
			title: '登记人',
			key: 'creator',
			customRender: text => {
				if ( dictionary[ FIELDS.EMPLOYEE.ID.dictionary ] ) {
					const item = dictionary[ FIELDS.EMPLOYEE.ID.dictionary ].find( ( { uid } ) => {
						return String( uid ) === String( text )
					} );
					
					if ( item ) {
						return item.name;
					}
				}
				
				return '暂无';
			}
		},
		FIELDS.STUDENT.MEMO,
		{
			title: '操作',
			key: 'action',
			customRender: ( text, record, ) => {
				return (
					<Privilege privs={[ 'management_fee_delete' ]}  noMatch={'删除'}>
						<Popconfirm
							title="是否确认删除这笔支出记录？"
							onConfirm={e => {
								e.stopPropagation();
								dispatch( {
									type: `${tableName}/delExpenditure`,
									payload: record.id,
								} ).then( () => setNeedUpdate( true ) )
							}}
							onCancel={e => e.stopPropagation()}
						>
							<a onClick={e => e.stopPropagation()}>删除</a>
						</Popconfirm>
					</Privilege>
				)
			}
		}
	];
	
	
	const tableActions = [
		<Privilege privs={[ 'management_fee_add' ]}  key={'management_fee_add'}>
		<Button key="add-button"
			icon="plus"
			htmlType="button"
			type="primary"
			onClick={() => toggleAddFeePopVisible( true )}>新增</Button></Privilege>,
		<Privilege privs={[ 'management_fee_export' ]}  key={'management_fee_export'}>
		<Button disabled={!selectedRows.length}
			key="exportExpenditure"
			icon="download"
			htmlType="button"
			type="primary"
			onClick={() => {
				let ids = selectedRows.map( row => row.id ).join( ',' );
				dispatch( {
					type:  `${tableName}/exportExpenditure`,
					payload: { 
						ids: ids
					},
				} ).then( res => {
					window.open( res );
			} );
		}}>导出</Button></Privilege>,
	];
	
	
	const confirmLoading = loading.effects[ `${tableName}/saveExpenditure` ];
	
	const onChange = ( key, value ) => {
		if ( key === FIELDS.FINANCE.EX_JOURNAL_TYPE.key ) {
			setMore( dictionary[ value ] ? dictionary[ value ] : [] );
			form.setFieldsValue( {
				[ FIELDS.FINANCE.EX_JOURNAL_SUBTYPE.key ]: undefined
			} );
		}
	};
	
	return (
		<Card>
			<WithTableName
				{...props}
				bodyStyle={{ padding: 0, }}
				tableName={tableName}
				tableActions={tableActions}
				selectedRows={selectedRows}
				setSelectedRows={setSelectedRows}
				originColumns={originColumns}
				scroll={{ x: 'max-content' }}
				needUpdate={needUpdate}
				setNeedUpdate={setNeedUpdate}
				formFields={[
					<WrapperComplexFormItem
						config={{
							key: 'date',
							title: '归属时间',
							type: 'rangeDate',
						}}
						col={9}
						form={form}
					/>,
					<WrapperComplexFormItem
						config={FIELDS.FINANCE.EX_JOURNAL_TYPE}
						values={dictionary[ 'outlay_type_manage' ] ? dictionary[ 'outlay_type_manage' ] : []}
						onChange={onChange}
						form={form}
					/>,
					<WrapperComplexFormItem
						config={FIELDS.FINANCE.EX_JOURNAL_SUBTYPE}
						values={getMore()}
						form={form}
					/>,
					<WrapperComplexFormItem
						config={FIELDS.FINANCE.EX_JOURNAL_REPORTER}
						form={form}
					/>,
				]}
			/>
			<AddFeeModal
				afterClose={() => setNeedUpdate( true )}
				handleSubmit={fieldsValue => {
					dispatch( {
						type: `${tableName}/saveExpenditure`,
						payload: {
							...fieldsValue,
						},
					} ).then( data => {
						if ( data !== false ) {
							toggleAddFeePopVisible( false );
						}
					} );
				}}
				type="outlay_type_manage"
				visible={addFeePopVisible}
				dictionary={dictionary}
				loading={confirmLoading}
				setVisible={toggleAddFeePopVisible}
			/>
			<InfoModal
				getData={getRecord}
				visible={infoModalVisible}
				dictionary={dictionary}
				type="outlay_type_manage"
				setVisible={toggleInfoModalVisible}
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
) )( Form.create()( ManagementFee ) );
