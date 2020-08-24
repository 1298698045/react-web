import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from "dva";
import { Card, Menu, Button, Form, Modal, Icon, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";

const tableName = 'operationLog';

const Collaborate = props => {
	const { dispatch, form } = props;
	// const [ selectedRows, setSelectedRows ] = useState( [] );
	// const [ rowMenuItems, setRowMenuItems ] = useState( [ ...originRowMenuItems ] );

	// 表格-字段
	const tableColumns = [
		FIELDS.SYSTEM.OPERATION.ID,
		FIELDS.SYSTEM.OPERATION.ACCOUNT,
		FIELDS.SYSTEM.OPERATION.NAME,
		FIELDS.SYSTEM.OPERATION.CLIENT,
		FIELDS.SYSTEM.OPERATION.TYPE,
		FIELDS.SYSTEM.OPERATION.CONTENT,
		FIELDS.SYSTEM.OPERATION.IP,
		FIELDS.SYSTEM.OPERATION.TIME,
	];
	// 筛选表单-字段
	const tableFilterFields = [
		{
			config: FIELDS.SYSTEM.OPERATION.DATE_RANGE,
			col: 9,
		},
		{
			config: FIELDS.SYSTEM.OPERATION.CLIENT,
			values: [
				{
					dKey: '平台',
					dValue: '平台',
				},
				{
					dKey: '学员端',
					dValue: '学员端',
				},
				{
					dKey: '员工端',
					dValue: '员工端',
				},
			],
		},
		// {
		// 	config: FIELDS.SYSTEM.OPERATION.TYPE,
		// },
		{
			config: FIELDS.SYSTEM.OPERATION.NAME,
		},
		{
			config: FIELDS.SYSTEM.OPERATION.ACCOUNT,
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

	return (
		<PageHeaderWrapper title={<FormattedMessage id="menu.system.operation-log"/>}>
			<GridContent>
				<WithTableName
					{...props}
					tableName={tableName}
					originColumns={tableColumns}
					formFields={memoFilterFields}
					tableActions={tableActions}
					// selectedRows={selectedRows}
					// setSelectedRows={setSelectedRows}
					// rowMenuItems={tableMenuItems}
					// handleMenuClick={handleMenuClick}
					columnSortable={false}
					// scroll={{ x: 1600 }}
				/>
			</GridContent>
		</PageHeaderWrapper>
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
) )( Form.create()( Collaborate ) );
