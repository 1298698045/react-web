import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from 'dva';
import { Card, Menu, Button, Form, Modal, Icon, message } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from '@/config/fields';
import Privilege from '@/components/Privilege';

const tableName = 'studentList';

const StudentListModal = props => {
	const { dispatch, visible, setVisible, form, loading, searchParams, coachName } = props;

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
		FIELDS.STUDENT.KM1_STATUS,
		FIELDS.STUDENT.KM2_STATUS,
		FIELDS.STUDENT.KM3_STATUS,
		FIELDS.STUDENT.KM4_STATUS,
		FIELDS.STUDENT.COACH_ID,
		FIELDS.STUDENT.CLASS_ID,
		FIELDS.STUDENT.STUDENT_TYPE,
	];
	// 筛选表单-字段
	const tableFilterFields = [
		{
			config: FIELDS.STUDENT.CLASS_ID_ACTIVE,
		},
		{
			config: FIELDS.STUDENT.STUDENT_TYPE,
		},
		{
			config: FIELDS.STUDENT.ACTIVE_DAYS,
			initialValue: searchParams[ FIELDS.STUDENT.ACTIVE_DAYS.key ] || 30,
		},
	];
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
	}, [ form ] );

	return (
		<Modal
			destroyOnClose
			title={`${{
				km2: '科目二',
				km3: '科目三',
			}[ searchParams.kmCode ] || ''}总${!searchParams.isActivity ? '活跃' : '潜水'}学员${coachName ? ' -【' + coachName + '】' : ''}`}
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
					tableSearchParams={searchParams}
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
) )( Form.create()( StudentListModal ) );
