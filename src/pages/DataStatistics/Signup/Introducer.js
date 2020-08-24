import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { useToggle, } from 'react-use';
import { connect } from "dva";
import { Spin, Card, Menu, Button, Form, Modal, Icon, message, Divider, Popconfirm,Typography } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
import { getDictValue, } from '@/utils/dictionaryUtil';

const tableName = 'signUpIntroducer';

const Introducer = props => {
	const { dispatch, form, loading, params,tab, dictionary } = props;
	// 表格-字段
	const tableColumns = [
		{
			title: '序号',
			key: 'key',
		},
		{
			key: 'introducer',
			title: '介绍人',
			customRender: ( text, record, ) => {
				if (!text || text === '0') {
					return '暂无'
				}
				return record.introducer_type === '2' ? getDictValue( dictionary, 'introducer_id', text) : getDictValue( dictionary, 'employee_id', text);
			}
		},
		{
			key: 'introducer_type',
			title: '介绍人归属',
			customRender: ( text, record, ) => {
				if (!text || text === '0') {
					return '暂无'
				}
				return text === '2' ? '校外' : '员工';
			}
		},
		{
			key: 'count',
			title: '报名人数'
		},
	]
	return tab === '1' && <WithTableName
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
) )( Form.create()( Introducer ) );