import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { useToggle, } from 'react-use';
import { connect } from "dva";
import { Spin, Card, Menu, Button, Form, Modal, Icon, message, Divider, Popconfirm,Typography } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";

const tableName = 'scoreStudentType';

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
			key: 'km2RecordCount',
			title: '科一通过数/报考数',
			customRender: ( text, record, ) => {
				if (record.km1PassedCount && record.km1Total) {
					return `${record.km1PassedCount}/${record.km1Total}`
				}
				if (!record.km1PassedCount && record.km1Total) {
					return `0/${record.km1Total}`
				}
				if (!record.km1PassedCount && !record.km1Total) {
					return `0/0`
				}
			}
		},
		{
			key: 'km3RecordCount',
			title: '科二通过数/报考数',
			customRender: ( text, record, ) => {
				if (record.km2PassedCount && record.km2Total) {
					return `${record.km2PassedCount}/${record.km2Total}`
				}
				if (!record.km2PassedCount && record.km2Total) {
					return `0/${record.km1Total}`
				}
				if (!record.km2PassedCount && !record.km2Total) {
					return `0/0`
				}
			}
		},
		{
			key: 'km2CourseCount',
			title: '科三通过数/报考数',
			customRender: ( text, record, ) => {
				if (record.km3PassedCount && record.km3Total) {
					return `${record.km3PassedCount}/${record.km3Total}`
				}
				if (!record.km3PassedCount && record.km3Total) {
					return `0/${record.km1Total}`
				}
				if (!record.km3PassedCount && !record.km3Total) {
					return `0/0`
				}
			}
		},
		{
			key: 'km3CourseCount',
			title: '科四通过数/报考数',
			customRender: ( text, record, ) => {
				if (record.km4PassedCount && record.km4Total) {
					return `${record.km4PassedCount}/${record.km4Total}`
				}
				if (!record.km4PassedCount && record.km4Total) {
					return `0/${record.km1Total}`
				}
				if (!record.km4PassedCount && !record.km4Total) {
					return `0/0`
				}
			}
		},
	]
	return tab === '4' && <WithTableName
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