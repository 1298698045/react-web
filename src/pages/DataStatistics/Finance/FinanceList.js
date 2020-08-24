import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { useToggle, } from 'react-use';
import { connect } from "dva";
import { Spin, Card, Menu, Button, Form, Modal, Icon, message, Divider, Popconfirm,Typography } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
import { getDictValue, } from '@/utils/dictionaryUtil';
import style from "@/pages/DataStatistics/style.less";

const tableName = 'financeList';

const FinanceList = props => {
	const { dispatch, form, loading, params, dictionary } = props;
	// 表格-字段
	const tableColumns = [
		{
			title: '序号',
			key: 'key',
		},
		FIELDS.STUDENT.DEPART_ID,
		{
			key: 'incomeTotal',
			title: '总收入',
		},
		{
			key: 'outTotal',
			title: '总支出',
		},
	]
	return <div className={style.tableName}><WithTableName 
		{...props}
		tableName={tableName}
		originColumns={tableColumns}
		columnSortable={false}
		scroll={{ x: 'max-content' }}
		pagination={false}
		tableSearchParams={{...params}}
	/></div>
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
) )( Form.create()( FinanceList ) );