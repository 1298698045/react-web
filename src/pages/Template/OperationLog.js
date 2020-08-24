import React, { useState, Fragment, useEffect, useMemo } from 'react';
import { connect } from 'dva';
import {
	Form,
	Button,
} from 'antd';
import RemarkFormModal from '@/components/RemarkFormModal';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';

const originRowMenuItems = [
	{
		key: 'suspendFiling',
		title: '暂缓建档',
	},
	{
		key: 'toBeFiled',
		title: '待建档',
	},
	{
		key: 'terminationOfFiling',
		title: '终止建档',
	},
	{
		key: 'completeTheFile',
		title: '完成建档',
	},
	{
		key: 'export',
		title: '导出',
	},
];

const originColumns = [
	{
		title: '序号',
		key: 'key',
		default: true,
	},
	{ ...FIELDS.ID },
	{
		...FIELDS.USERNAME,
		default: true,
	},
	{ ...FIELDS.ACCOUNT },
	{ ...FIELDS.TERMINAL },
	{ ...FIELDS.TIME },
	{ ...FIELDS.CONTENT },
];

const WithFormRemarkFormModal = Form.create()( RemarkFormModal );

const tableName1 = 'operationLog';
const tableName2 = 'studentSignUp';

const OperationLog = props => {
	const [ remarkModalVisible, setRemarkModalVisible ] = useState( false );
	const [ selectedRows, setSelectedRows ] = useState( [] );
	const [ rowMenuItems, setRowMenuItems ] = useState( [ ...originRowMenuItems ] );
	
	useEffect( () => {
		if ( selectedRows.length < 2 ) {
			setRowMenuItems( [
				{
					key: 'printPortfolio',
					title: '打印档案袋',
				},
				{
					key: 'printMedicalExaminationForm',
					title: '打印体检表',
				},
				...originRowMenuItems,
			] );
		} else {
			setRowMenuItems( [ ...originRowMenuItems ] );
		}
	}, [ selectedRows ] );
	
	const tableActions = [ <Button key="modal-button" icon="plus" htmlType="button" type="primary"
	                               onClick={() => setRemarkModalVisible( true )}>报名登记</Button> ];
	
	const overrideColumns = {
		[ FIELDS.USERNAME.key ]: ( text, record, index ) => (
			<a onClick={e => {
				e.stopPropagation();
				console.log( text, record, index );
			}}>{text}</a>
		)
	};
	
	return (
		<PageHeaderWrapper title="操作日志">
			<WithTableName
				{...props}
				overrideColumns={overrideColumns}
				tableName={tableName1}
				tableActions={tableActions}
				selectedRows={selectedRows}
				setSelectedRows={setSelectedRows}
				rowMenuItems={rowMenuItems}
				originColumns={originColumns}
				formFields={[
					<WrapperComplexFormItem
						config={FIELDS.STUDENT.NAME}
						form={form}
					/>,
				
				]}
			/>
			<WithTableName
				{...props}
				tableName={tableName2}
				tableActions={tableActions}
				selectedRows={selectedRows}
				setSelectedRows={setSelectedRows}
				rowMenuItems={rowMenuItems}
				originColumns={originColumns}
				targetKeys={originTargetKeys}
				formFields={[
					<WrapperComplexFormItem
						config={FIELDS.STUDENT.NAME}
						form={form}
					/>,
				
				]}
			/>
			<WithFormRemarkFormModal handleSubmit={fieldsValue => {
				// eslint-disable-next-line no-console
				console.log( fieldsValue );
			}}
			                         visible={remarkModalVisible} setVisible={setRemarkModalVisible}/>
		</PageHeaderWrapper>
	);
};

export default connect( (
	{
		[ tableName1 ]: data1,
		[ tableName2 ]: data2,
		loading,
		global
	}
) => (
	{
		[ tableName1 ]: data1,
		[ tableName2 ]: data2,
		loading,
		global,
	}
) )( Form.create()( OperationLog ) );
