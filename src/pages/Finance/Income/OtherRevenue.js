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
import AddOtherRevenueModal from './AddOtherRevenueModal';
import Privilege from '@/components/Privilege';

const tableName = 'financeIncomeOtherRevenueList';

const OtherRevenue = props => {
		const { form, loading, dispatch, dictionary } = props;
		const [ AddOtherRevenueModalVisible, toggleAddOtherRevenueModalVisible ] = useToggle( false );
		const [ info, setInfo ] = useState( {} );
		const [ needUpdate, setNeedUpdate ] = useToggle( false );
		
		const saveOtherRevenue = data => {
			dispatch( {
				type: `${tableName}/saveOtherRevenue`,
				payload: {
					...data
				},
			} ).then( data => {
				if ( data !== false ) {
					toggleAddOtherRevenueModalVisible( false );
				}
			} );
		};
		
		const deleteOtherRevenue = id => {
			dispatch( {
				type: `${tableName}/delOtherRevenue`,
				payload: id,
			} ).then( () => {
				setNeedUpdate( true );
			} );
		};
		
		const tableActions = [
			<Privilege privs={[ 'other_charge_add' ]} key="other_charge_add">
			<Button key="buy-button"
			        icon="plus"
			        htmlType="button"
			        type="primary"
			        onClick={() => toggleAddOtherRevenueModalVisible( true )}>新增</Button></Privilege>,
		];
		
		const originColumns = [
			{
				title: '序号',
				key: 'key',
			},
			FIELDS.FINANCE.JOURNAL_TARGET,
			FIELDS.FINANCE.JOURNAL_DATE,
			{
				...FIELDS.FINANCE.JOURNAL_AMOUNT,
				customRender: text => String( text ).replace( /\B(?=(\d{3})+(?!\d))/g, ',' )
			},
			FIELDS.FINANCE.JOURNAL_CREATE_TIME,
			{
				...FIELDS.FINANCE.JOURNAL_CREATOR,
				customRender: text => {
					if ( text && dictionary[ FIELDS.EMPLOYEE.ID.dictionary ] ) {
						
						const employee = dictionary[ FIELDS.EMPLOYEE.ID.dictionary ].find( ( { uid } ) => String( uid ) === String( text ) );
						
						if ( employee ) {
							return employee.name;
						}
					}
					return '暂无';
				}
			},
			{
				title: '操作',
				key: 'actions',
				customRender: ( text, record, ) => {
					const { target } = record;
					return [
						<Privilege privs={[ 'other_charge_edit' ]} key="other_charge_edit">
						<a key="edit" onClick={() => {
							setInfo( record );
							toggleAddOtherRevenueModalVisible( true );
						}}>编辑</a></Privilege>,
						<Privilege privs={[ 'other_charge_edit' ]} key="other_charge_edit1">
						<Divider type="vertical" key="divider"/></Privilege>,
						<Privilege privs={[ 'other_charge_detele' ]} key="other_charge_detele">
						<Popconfirm key="delete" title={`确定要删除【${target}】吗？`}
						            onConfirm={() => deleteOtherRevenue( record.id )}>
							<a>删除</a>
						</Popconfirm></Privilege>,
					]
				}
			},
		];
		
		const saveOtherRevenueLoading = loading.effects[ `${tableName}/saveOtherRevenue` ];
		
		const year = moment().format( 'YYYY' );
		
		return (
			<Card>
				<WithTableName
					{...props}
					bodyStyle={{ padding: 0, }}
					tableActions={tableActions}
					tableName={tableName}
					originColumns={originColumns}
					multipleSelection={false}
					scroll={{ x: 'max-content' }}
					needUpdate={needUpdate}
					setNeedUpdate={setNeedUpdate}
					formFields={[
						<WrapperComplexFormItem
							config={FIELDS.FINANCE.JOURNAL_SEARCH_YEAR}
							form={form}
							min={2000}
							max={Number( year )}
						/>,
						<WrapperComplexFormItem
							config={FIELDS.FINANCE.JOURNAL_SEARCH_MONTH}
							form={form}
							min={1}
							max={12}
						/>,
					]}
				/>
				<AddOtherRevenueModal
					afterClose={() => setNeedUpdate( true )}
					loading={saveOtherRevenueLoading}
					visible={AddOtherRevenueModalVisible}
					setVisible={toggleAddOtherRevenueModalVisible}
					handleSubmit={saveOtherRevenue}
					data={info}
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
) )( Form.create()( OtherRevenue ) );
