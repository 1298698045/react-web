import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { useToggle, } from 'react-use';
import { connect } from "dva";
import { Spin, Card, Menu, Button, Form, Modal, Icon, message, Divider, Popconfirm,Typography } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
import { getDictValue, } from '@/utils/dictionaryUtil';

const tableName = 'reserveClassCoach';

const Coach = props => {
	const { dispatch, form, loading, params,tab, dictionary } = props;
	// 表格-字段
	const tableColumns = [
		{
			title: '序号',
			key: 'key',
		},
		FIELDS.STUDENT.COACH_ID,
		FIELDS.STUDENT.SITE_ID,
		FIELDS.STUDENT.DEPART_ID,
		FIELDS.STUDENT.LICENSE_TYPE,
		FIELDS.STUDENT.TEACH_KM,
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
	return tab === '6' && <WithTableName
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
) )( Form.create()( Coach ) );