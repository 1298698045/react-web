import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { connect } from "dva";
import { Form, Icon, Modal, Spin, Row, Col, Tree, Card  } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
const tableName = 'selectStudentList';
const { TreeNode } = Tree;

const StudentSelectModal = props => {
	const { dispatch, loading, onSelect, visible, setVisible, form } = props;
	const onCancel = e => {
		e.preventDefault();

		setVisible( false );
	};

	// 表格-字段
	const tableColumns = [
		FIELDS.STUDENT.NAME,
		FIELDS.STUDENT.MOBILE,
		FIELDS.STUDENT.CLASS_ID,
		FIELDS.STUDENT.LICENSE_TYPE_ACTIVE,
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
		{
			config: FIELDS.STUDENT.QUICK_SEARCH,
		}
	];
	const memoFilterFields = useMemo( () => {
		return tableFilterFields.map( props => <WrapperComplexFormItem
			{...props}
			form={form}
		/> );
	}, [ form ] );
	// 操作按钮
	const tableActions = [];
	// 更多操作菜单
	const tableMenuItems = [];
	return (
		<Modal 
			title="选择学员"
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
			<WithTableName
				{...props}
				tableName={tableName}
				originColumns={tableColumns}
				formFields={memoFilterFields}
				columnSortable={false}
			/>
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
) )( Form.create()( StudentSelectModal ) );
