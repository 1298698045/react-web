import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from 'dva';
import { Card, Menu, Button, Form, Modal, Icon, message } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from '@/config/fields';
import Privilege from '@/components/Privilege';

const tableName = 'reserveStudentList';

const ReserveStudentListModal = props => {
	const { dispatch, visible, setVisible, form, params } = props;

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
		FIELDS.STUDENT.NAME,
		FIELDS.STUDENT.MOBILE,
		FIELDS.TEACHING.COURSE.CREATE_TIME,
		FIELDS.STUDENT.CLASS_ID,
		FIELDS.TEACHING.COURSE.LOGIC_STATUS,
		FIELDS.TEACHING.COURSE.MEMO,
	];
	// 筛选表单-字段
	const tableFilterFields = [];
	// 操作按钮
	const tableActions = [];
	// 更多操作菜单
	const tableMenuItems = [];

	const memoFilterFields = useMemo( () => {
		return tableFilterFields.map( props => <WrapperComplexFormItem
			{...props}
			initialValue={props.initialValue}
			form={form}
		/> );
	}, [form] );

	return (
		<Modal
			destroyOnClose
			title={params.title}
			width="90%"
			visible={visible}
			footer={null}
			onCancel={onCancel}
			closable={true}
			maskClosable={true}
			keyboard={false}
			bodyStyle={{ padding: 0 }}
		>
			<GridContent>
				<WithTableName
					{...props}
					tableName={tableName}
					originColumns={tableColumns}
					formFields={memoFilterFields}
					tableSearchParams={{ courseId: params.courseId }}
					// tableActions={tableActions}
					// selectedRows={selectedRows}
					// setSelectedRows={setSelectedRows}
					// rowMenuItems={tableMenuItems}
					// handleMenuClick={handleMenuClick}
					columnSortable={false}
					scroll={{ x: 'max-content' }}
				/>
			</GridContent>
		</Modal>
	);
};

export default connect( (
	{
		[ tableName ]: data,
		loading,
		global
	}
) => (
	{
		[ tableName ]: data,
		loading,
		global,
	}
) )( Form.create()( ReserveStudentListModal ) );
