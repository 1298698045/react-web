import React, { useMemo, useState, } from 'react';
import { useToggle, } from 'react-use';
import moment from 'moment';
import { connect } from 'dva';
import {
	Form,
	Button,
	Card,
} from 'antd';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import AddMoneyFundsModal from './AddMoneyFundsModal';
import Privilege from '@/components/Privilege';

const tableName = 'financeIncomeMoneyFundsList';

const MoneyFunds = props => {
	const { form, loading, dispatch, [ tableName ]: table, dictionary } = props;
	const [ AddMoneyFundsModalVisible, toggleAddMoneyFundsModalVisible ] = useToggle( false );
	const [ info, setInfo ] = useState( {} );
	const [ needUpdate, setNeedUpdate ] = useToggle( false );
	
	const disabledMonth = useMemo( () => {
		const { list } = table[ `${tableName}TableData` ];
		
		return list.map( l => l[ FIELDS.FINANCE.JOURNAL_DATE.key ] );
	}, [ table ] );
	
	const saveMoneyFunds = data => {
		dispatch( {
			type: `${tableName}/saveMoneyFunds`,
			payload: {
				...data
			},
		} ).then( data => {
			if ( data !== false ) {
				toggleAddMoneyFundsModalVisible( false );
			}
		} );
	};
	
	const tableActions = [
		<Privilege privs={[ 'currency_fund_add' ]} key="currency_fund_add">
		<Button key="buy-button"
		        icon="plus"
		        htmlType="button"
		        type="primary"
		        onClick={() => {
			        setInfo( {} );
			        toggleAddMoneyFundsModalVisible( true );
		        }}>新增</Button></Privilege>,
	];
	
	const originColumns = [
		{
			title: '序号',
			key: 'key',
		},
		FIELDS.FINANCE.JOURNAL_DATE,
		{
			...FIELDS.FINANCE.JOURNAL_AMOUNT,
			customRender: text => String( text ).replace( /\B(?=(\d{3})+(?!\d))/g, ',' )
		},
		FIELDS.FINANCE.JOURNAL_CREATE_TIME,
		{
			...FIELDS.FINANCE.JOURNAL_CREATOR,
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
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record, ) => {
				return [
					<Privilege privs={[ 'currency_fund_edit' ]} key="currency_fund_edit">
					<a key="edit" onClick={() => {
						setInfo( record );
						toggleAddMoneyFundsModalVisible( true );
					}}>修改</a></Privilege>,
				]
			}
		},
	];
	
	const saveMoneyFundsLoading = loading.effects[ `${tableName}/saveMoneyFunds` ];
	
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
			<AddMoneyFundsModal
				disabledMonth={disabledMonth}
				afterClose={() => setNeedUpdate( true )}
				loading={saveMoneyFundsLoading}
				visible={AddMoneyFundsModalVisible}
				setVisible={toggleAddMoneyFundsModalVisible}
				handleSubmit={saveMoneyFunds}
				data={info}
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
) )( Form.create()( MoneyFunds ) );
