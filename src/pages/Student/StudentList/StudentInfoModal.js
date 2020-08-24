import React, { useEffect, useState } from 'react';
import { Form, Modal, Button, Spin, Col, Row, Divider, Tabs, } from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';

import moment from 'moment';
import WithTableName from '@/components/HOC/WithTableName';

const { TabPane } = Tabs;

const tableName = 'coachList';

const originColumns = [
	{
		title: '序号',
		key: 'key',
		default: true,
	},
	{
		...FIELDS.STUDENT.NAME,
		default: true,
	},
	{ ...FIELDS.STUDENT.MOBILE },
	{ ...FIELDS.STUDENT.DEPART_ID },
];

const ChangeClassModal = props => {
	const { handleSubmit, visible, setVisible, form, } = props;
	
	const submit = e => {
		e.preventDefault();
		
		form.validateFields( ( err, fieldsValue ) => {
			console.log( err, fieldsValue );
			if ( err ) {
				console.log( err, fieldsValue );
				
				return false;
			}
			
			// handleSubmit( fieldsValue );
		} );
	};
	
	const [ selectedRows, setSelectedRows ] = useState( [] );
	
	const tableActions = [
		<Button disabled={selectedRows.length !== 1} key="coach-button" icon="form" htmlType="button" type="primary"
		        onClick={() => {console.log( selectedRows );}}>打印收据</Button>,
	];
	
	const overrideColumns = {
		[ FIELDS.STUDENT.NAME.key ]: ( text, record, index ) => {
			return (
				<a onClick={e => {
					e.stopPropagation();
				}}>
					<Spin size="small"/> {text}
				</a>
			)
		},
	};
	
	return (
		<Modal
			title="班型变更"
			width="90%"
			visible={visible}
			onOk={submit}
			destroyOnClose
			onCancel={() => setVisible( false )}
			closable={true}
			maskClosable={false}
			keyboard={false}
		>
			<Tabs defaultActiveKey="0">
				<TabPane tab="基本信息" key="0">
					<Form onSubmit={submit}>
						<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
							<Col md={6} sm={24}>
								<WrapperComplexFormItem
									config={{
										title: '学员',
										key: 'student',
										type: 'input',
									}}
									form={form}
									initialValue={selectedRows.length === 1 && selectedRows[ 0 ][ FIELDS.STUDENT.NAME.key ]}
									status="read"
									{...props}
								/>
							</Col>
							<Col md={6} sm={24}>
								<WrapperComplexFormItem
									config={FIELDS.STUDENT.TEL}
									form={form}
									initialValue="15011393237"
									status="read"
									rules={[ { required: true, } ]}
									{...props}
								/>
							</Col>
							<Col md={6} sm={24}>
								<WrapperComplexFormItem
									config={FIELDS.STUDENT.CLASS_ID}
									form={form}
									initialValue="普通班"
									status="read"
									rules={[ { required: true, } ]}
									{...props}
								/>
							</Col>
							<Col md={6} sm={24}>
								<WrapperComplexFormItem
									config={FIELDS.STUDENT.FEE_TYPE}
									form={form}
									initialValue="全款xx元"
									status="read"
									rules={[ { required: true, } ]}
									{...props}
								/>
							</Col>
							<Col md={6} sm={24}>
								<WrapperComplexFormItem
									config={{
										title: '已交学费',
										key: 'status',
										type: 'input'
									}}
									form={form}
									initialValue="xx元"
									status="read"
									rules={[ { required: true, } ]}
									{...props}
								/>
							</Col>
							<Col md={6} sm={24}>
								<WrapperComplexFormItem
									config={{
										title: '科目二',
										key: 'status',
										type: 'input'
									}}
									form={form}
									initialValue="已学n课节（或 已完成）,剩余x课节，科目三：剩余y课节"
									status="read"
									rules={[ { required: true, } ]}
									{...props}
								/>
							</Col>
							<Col md={6} sm={24}>
								<WrapperComplexFormItem
									config={{
										title: '科目三',
										key: 'status',
										type: 'input'
									}}
									form={form}
									initialValue="已学m课节（或 已完成）"
									status="read"
									rules={[ { required: true, } ]}
									{...props}
								/>
							</Col>
						</Row>
						<Divider dashed/>
						<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
							<Col md={6} sm={24}>
								<WrapperComplexFormItem
									config={{
										title: '变更班型',
										key: 'student',
										type: 'select',
									}}
									form={form}
									values={[
										{
											dKey: '0',
											dValue: '贵宾班',
										},
										{
											dKey: '1',
											dValue: 'VIP班',
										},
									]}
									{...props}
								/>
							</Col>
							<Col md={6} sm={24}>
								<WrapperComplexFormItem
									config={{
										title: '变更学费',
										key: 'status',
										type: 'input'
									}}
									form={form}
									initialValue="xxx元"
									status="read"
									rules={[ { required: true, } ]}
									{...props}
								/>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
							<Col md={6} sm={24}>
								<WrapperComplexFormItem
									config={{
										title: '是否取消未学课程',
										key: 'student',
										type: 'radio',
									}}
									form={form}
									values={[
										{
											dKey: '0',
											dValue: '是',
										},
										{
											dKey: '1',
											dValue: '否',
										},
									]}
									{...props}
								/>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
							<Col sm={24}>
								<WrapperComplexFormItem
									config={{
										title: '变更原因',
										key: 'student',
										type: 'textarea',
									}}
									form={form}
									{...props}
								/>
							</Col>
						</Row>
					</Form>
				</TabPane>
				<TabPane tab="费用信息" key="1">
					<WithTableName
						{...props}
						bodyStyle={{ padding: 0, }}
						overrideColumns={overrideColumns}
						tableName={tableName}
						tableActions={tableActions}
						selectedRows={selectedRows}
						setSelectedRows={setSelectedRows}
						originColumns={originColumns}
					/>
				</TabPane>
				<TabPane tab="约课记录" key="2">
					<WithTableName
						{...props}
						bodyStyle={{ padding: 0, }}
						overrideColumns={overrideColumns}
						tableName={tableName}
						tableActions={tableActions}
						selectedRows={selectedRows}
						setSelectedRows={setSelectedRows}
						originColumns={originColumns}
					/>
				</TabPane>
				<TabPane tab="成绩记录" key="3">
					<WithTableName
						{...props}
						bodyStyle={{ padding: 0, }}
						overrideColumns={overrideColumns}
						tableName={tableName}
						tableActions={tableActions}
						selectedRows={selectedRows}
						setSelectedRows={setSelectedRows}
						originColumns={originColumns}
					/>
				</TabPane>
				<TabPane tab="变更记录" key="4">
					<WithTableName
						{...props}
						bodyStyle={{ padding: 0, }}
						overrideColumns={overrideColumns}
						tableName={tableName}
						tableActions={tableActions}
						selectedRows={selectedRows}
						setSelectedRows={setSelectedRows}
						originColumns={originColumns}
					/>
				</TabPane>
				<TabPane tab="备注" key="5">
					<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
						<Col sm={24}>
							<WrapperComplexFormItem
								config={{
									title: '备注',
									key: 'student',
									type: 'textarea',
								}}
								form={form}
								{...props}
							/>
						</Col>
					</Row>
				</TabPane>
			</Tabs>
		</Modal>
	);
};

export default Form.create()( ChangeClassModal );
