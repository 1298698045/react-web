import React from 'react';
import { Button, Form, Modal, } from 'antd';
import FIELDS from '@/config/fields';
import WithTableName from '@/components/HOC/WithTableName';
import { connect } from 'dva';
import { useEffectOnce } from 'react-use';
import { queryDictionary } from '@/utils/dictionaryUtil';
import numeral from 'numeral';

const tableName = 'financeWageRegistrationMonthList';

const InfoModal = props => {
	const {
		visible, setVisible, afterClose, data = {
			year: '',
			month: '',
		},
		dispatch,
	} = props;
	
	useEffectOnce( () => {
		queryDictionary( dispatch, FIELDS.FINANCE.WAGE_DEPART_ID.dictionary );
	} );
	
	const originColumns = [
		FIELDS.FINANCE.WAGE_ID_NO,
		FIELDS.FINANCE.WAGE_EMPLOYEE_NAME,
		FIELDS.FINANCE.WAGE_DEPART_ID,
		{
			...FIELDS.FINANCE.WAGE_BASE_SALARY,
			customRender: text => {
				return numeral( text ).format( '0,0' )
			},
		},
		{
			...FIELDS.FINANCE.WAGE_B_KM2,
			customRender: text => {
				return numeral( text ).format( '0,0' )
			},
		},
		{
			...FIELDS.FINANCE.WAGE_B_KM3,
			customRender: text => {
				return numeral( text ).format( '0,0' )
			},
		},
		{
			...FIELDS.FINANCE.WAGE_B_RECRUIT,
			customRender: text => {
				return numeral( text ).format( '0,0' )
			},
		},
		{
			...FIELDS.FINANCE.WAGE_B_DOCUMENT,
			customRender: text => {
				return numeral( text ).format( '0,0' )
			},
		},
		{
			...FIELDS.FINANCE.WAGE_B_OVERTIME,
			customRender: text => {
				return numeral( text ).format( '0,0' )
			},
		},
		{
			...FIELDS.FINANCE.WAGE_B_POSITION,
			customRender: text => {
				return numeral( text ).format( '0,0' )
			},
		},
		{
			...FIELDS.FINANCE.WAGE_B_BONUS,
			customRender: text => {
				return numeral( text ).format( '0,0' )
			},
		},
		{
			...FIELDS.FINANCE.WAGE_B_OTHERS,
			customRender: text => {
				return numeral( text ).format( '0,0' )
			},
		},
		{
			...FIELDS.FINANCE.WAGE_DEDUCT,
			customRender: text => {
				return numeral( text ).format( '0,0' )
			},
		},
		{
			...FIELDS.FINANCE.WAGE_TEX,
			customRender: text => {
				return numeral( text ).format( '0,0' )
			},
		},
		{
			...FIELDS.FINANCE.WAGE_FINAL_SALARY,
			customRender: text => {
				return numeral( text ).format( '0,0' )
			},
		},
		FIELDS.FINANCE.WAGE_CREATE_TIME,
	];
	
	return (
		<Modal
			title="工资详情"
			width="90%"
			visible={visible}
			afterClose={afterClose}
			destroyOnClose
			closable={true}
			maskClosable={false}
			keyboard={false}
			footer={
				<Button
					icon="close-circle"
					htmlType="button"
					onClick={() => {
						setVisible( false );
					}}>关闭</Button>
			}
			onCancel={() => setVisible( false )}
		>
			{
				data.year && <WithTableName
					{...props}
					tableSearchParams={{ year: data.year, month: data.month, }}
					bodyStyle={{ padding: 0, }}
					tableName={tableName}
					originColumns={originColumns}
					scroll={{ x: 'max-content' }}
				/>
			}
		</Modal>
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
) )( Form.create()( InfoModal ) );
