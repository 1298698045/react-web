import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { useToggle, } from 'react-use';
import { connect } from "dva";
import { Spin, Card, Menu, Button, Form, Modal, Icon, message, Divider, Popconfirm,Typography } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";

const tableName = 'signUpStudentType';

const StudentType = props => {
	const { dispatch, form, loading,needUpdate,setNeedUpdate,params,tab } = props;

	// 表格-字段
	const tableColumns = [
		{
			title: '序号',
			key: 'key',
		},
		FIELDS.STUDENT.STUDENT_TYPE,
		{
			key: 'count',
			title: '报名人数'
		},
	]
	return tab === '5' && <WithTableName
		{...props}
		tableName={tableName}
		originColumns={tableColumns}
		columnSortable={false}
		scroll={{ x: 'max-content' }}
		pagination={false}
		tableSearchParams={{
			...params,
			tabType: tab
		}}
	/>
	
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
		global
	}
) )( Form.create()( StudentType ) );