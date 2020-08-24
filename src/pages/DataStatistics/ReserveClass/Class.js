import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { useToggle, } from 'react-use';
import { connect } from "dva";
import { Spin, Card, Menu, Button, Form, Modal, Icon, message, Divider, Popconfirm,Typography } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";

const tableName = 'reserveClassClass';

const Class = props => {
	const { dispatch, form, loading,needUpdate,setNeedUpdate,params,tab } = props;

	// 表格-字段
	const tableColumns = [
		{
			title: '序号',
			key: 'key',
		},
		FIELDS.STUDENT.CLASS_ID,
		FIELDS.STUDENT.DEPART_ID,
		FIELDS.STUDENT.LICENSE_TYPE,
		{
			key: 'km2RecordCount',
			title: '科二预约量（人次）',
			customRender: ( text, record, ) => {
				return text ? text : 0;
			}
		},
		{
			key: 'km3RecordCount',
			title: '科三预约量（人次）',
			customRender: ( text, record, ) => {
				return text ? text : 0;
			}
		},
		{
			key: 'km2CourseCount',
			title: '科二课程量（课节）',
			customRender: ( text, record, ) => {
				return text ? text : 0;
			}
		},
		{
			key: 'km3CourseCount',
			title: '科三课程量（课节）',
			customRender: ( text, record, ) => {
				return text ? text : 0;
			}
		},
	]
	return tab === '3' && <WithTableName
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
) )( Form.create()( Class ) );