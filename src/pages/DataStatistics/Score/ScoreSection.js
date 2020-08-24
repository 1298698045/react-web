import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { useToggle, } from 'react-use';
import { connect } from "dva";
import { Spin, Card, Menu, Button, Form, Modal, Icon, message, Divider, Popconfirm,Typography } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
import { getDictValue, } from '@/utils/dictionaryUtil';

const tableName = 'scoreSection';

const ScoreSection = props => {
	const { dispatch, form, loading, params,tab, dictionary } = props;
	// 表格-字段
	const tableColumns = [
		{
			title: '序号',
			key: 'key',
		},
		{
			title: '分数段',
			key: 'gardeSection',
			customRender: ( text, record, ) => {
				if (text === '1') {
					return '0或缺考'
				}
				if (text === '2') {
					return '1-79'
				}
				if (text === '3') {
					return '80-89'
				}
				if (text === '4') {
					return '90-100'
				}
			}
		},
		{
			key: 'km1Total',
			title: '科一次数',
			customRender: ( text, record, ) => {
				return text ? text : 0
			}
		},
		{
			key: 'km2Total',
			title: '科二次数',
			customRender: ( text, record, ) => {
				return text ? text : 0
			}
		},
		{
			key: 'km3Total',
			title: '科三次数',
			customRender: ( text, record, ) => {
				return text ? text : 0
			}
		},
		{
			key: 'km4Total',
			title: '科目四次数',
			customRender: ( text, record, ) => {
				return text ? text : 0
			}
		},
	]
	return tab === '7' && <WithTableName
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
) )( Form.create()( ScoreSection ) );