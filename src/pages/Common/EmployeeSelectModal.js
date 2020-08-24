import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { connect } from "dva";
import { Form, Icon, Modal, Spin, Row, Col, Tree, Card  } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
import styles from '@/pages/School/Org/Org.less'
const tableName = 'orgEmployee';
const { TreeNode } = Tree;

const EmployeeSelectModal = props => {
	const { dispatch, loading, organization, onSelect, visible, setVisible, form } = props;
	const { departments } = organization;
	const [ departmentSelected, setDepartmentSelected ] = useState( {} );
	const refreshDepartments = () => {
		dispatch( {
			type: 'organization/queryDepartmentList',
		} ).then( () => {
			setDepartmentSelected( {} );
		} );
	};
	
	useEffect( refreshDepartments, [] );

	const onCancel = e => {
		e.preventDefault();

		setVisible( false );
	};

	// 表格-字段
	const tableColumns = [
		{
			key: 'key',
			title: '序号',
		},
		FIELDS.EMPLOYEE.NAME,
		FIELDS.EMPLOYEE.GENDER,
		FIELDS.EMPLOYEE.MOBILE,
		FIELDS.ORG.POSITION_ID,
		{
			key: 'operation',
			title: '操作',
			customRender: ( text, record, index ) => <a key="select" onClick={() => {
				onSelect( record );
				setVisible( false );
			}}><Icon type="check-circle"/> 选择</a>,
		},
	];
	// 筛选表单-字段
	const tableFilterFields = [
		// {
		// 	config: {...FIELDS.EMPLOYEE.DEPART_ID_SCHOOL, dictionary: 'depart_id'},
		// },
		{
			config: FIELDS.EMPLOYEE.NAME,
		},
		{
			config: FIELDS.EMPLOYEE.MOBILE,
		},
	];
	// 操作按钮
	const tableActions = [];
	// 更多操作菜单
	const tableMenuItems = [];

	const memoFilterFields = useMemo( () => {
		return tableFilterFields.map( props => <WrapperComplexFormItem
			{...props}
			form={form}
		/> );
	}, [ form ] );
	// 组织树
	const memoDepartments = useMemo( () => {
		let dict = {};
		(function __forEach ( ds ){
			ds.forEach( d => {
				dict[ d[ FIELDS.ORG.DEPART_ID.key ] ] = d;
				d.children && __forEach( d.children );
			} );
		})( departments );
		return dict;
	}, [ departments ] );
	const memoTree = useMemo( () => {
		function __tree ( d ){
			return d && d.map( d2 =>
				<TreeNode
					title={d2[ FIELDS.ORG.DEPART_NAME.key ]}
					key={d2[ FIELDS.ORG.DEPART_ID.key ]}
				>
					{__tree( d2.children )}
				</TreeNode> );
		}
		
		return departments.length
			?
			<Tree showLine defaultExpandAll
			      onSelect={keys => setDepartmentSelected( memoDepartments[ keys[ 0 ] ] || {} )}
			>
				{__tree( departments )}
			</Tree>
			:
			<div>暂无数据</div>;
	}, [ departments ] );
	const memoTitle = useMemo( () => {
		return departmentSelected.id ? departmentSelected[ FIELDS.ORG.DEPART_NAME.key ] : '所有员工';
	}, [ departmentSelected ] );
	return (
		<Modal 
			title="选择员工"
			width="90%"
			visible={visible}
			// onOk={onOk}
			onCancel={onCancel}
			closable={true}
			maskClosable={false}
			keyboard={false}
			// okText="提交"
			cancelText="关闭"
			footer={null}
		>
			{/* <GridContent> */}
			<Fragment>
				<Row gutter={20}>
					<Col span={6}>
						<Card title='选择机构/部门'>
							<div style={{height: 600, overflowY: 'auto'}}>
								<Spin spinning={loading.effects[ 'organization/queryDepartmentList' ] || false}>{memoTree}</Spin>
							</div>
						</Card>
					</Col>
					<Col span={18}>
						<Card title={memoTitle}>
							<div style={{height: 600, overflowY: 'auto'}}>
								<WithTableName
									scroll={{ y: 345 }}
									{...props}
									tableName={tableName}
									originColumns={tableColumns}
									formFields={memoFilterFields}
									tableSearchParams={{
										departId: departmentSelected[ FIELDS.ORG.DEPART_ID.key ],
										includeSubDepart: true,
									}}
									// tableActions={tableActions}
									// selectedRows={selectedRows}
									// setSelectedRows={setSelectedRows}
									// rowMenuItems={tableMenuItems}
									// handleMenuClick={handleMenuClick}
									columnSortable={false}
									// scroll={{ x: 1600 }}
								/>
							</div>
						</Card>
					</Col>
				</Row>
			</Fragment>
			{/* </GridContent> */}
		</Modal>
	);
};

export default connect( (
	{
		[ tableName ]: data,
		loading,
		global,
		organization
	}
) => (
	{
		[ tableName ]: data,
		loading,
		global,
		organization
	}
) )( Form.create()( EmployeeSelectModal ) );
