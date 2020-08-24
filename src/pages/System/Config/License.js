import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from "dva";
import { Card, Menu, Button, Form, Modal, Icon, Switch, message, Tooltip } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from "@/config/fields";
import { refreshDictionary } from "@/utils/dictionaryUtil";
import Privilege from '@/components/Privilege';

const tableName = 'cfgLicense';

const License = props => {
	const { dispatch, form, dictionary } = props;
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );

	const setLicenseStatus = ( licenseType, checked ) => {
		return dispatch( {
			type: `${tableName}/setLicenseStatus`,
			payload: {
				licenseType,
				status: checked ? 1 : 0,
			},
		} ).then( () => {
			setTableNeedUpdate( true );
			refreshDictionary( dispatch, 'fetch' );
		} );
	};
	const setLicenseDefault = ( licenseType ) => {
		return dispatch( {
			type: `${tableName}/setLicenseDefault`,
			payload: {
				licenseType,
			},
		} ).then( () => {
			setTableNeedUpdate( true );
			refreshDictionary( dispatch, 'fetch' );
		} );
	};

	// 表格-字段
	const tableColumns = [
		{
			key: 'key',
			title: '序号',
		},
		FIELDS.SYSTEM.LICENSE.VALUE,
		FIELDS.SYSTEM.LICENSE.MEMO,
		{
			...FIELDS.SYSTEM.DICT.READONLY,
			customRender: text => ( text == 1 ? '系统定义' : '驾校自定义' ),
		},
		{
			...FIELDS.SYSTEM.DICT.STATUS,
			customRender: ( text, record ) => 
			<Privilege privs={[ 'licence_type_defaut_swtich' ]} noMatch={text === 1 ? '打开' : '关闭'}>
			<Switch
				checkedChildren="打开"
				unCheckedChildren="关闭"
				checked={text == 1}
				// 默认的类型不能修改状态
				disabled={record[ FIELDS.SYSTEM.DICT.DEFAULT.key ] == 1}
				onChange={checked => setLicenseStatus( record[ FIELDS.SYSTEM.DICT.KEY.key ], checked )}
			/></Privilege>,
		},
		{
			...FIELDS.SYSTEM.DICT.DEFAULT,
			customRender: ( text, record ) => 
			<Privilege privs={[ 'licence_type_defaut_set' ]} noMatch={text === 1 ? '是' : '否'}>
			<Switch
				checkedChildren="是"
				unCheckedChildren="否"
				checked={text == 1}
				// 已关闭的类型不能修改默认状态
				disabled={text == 1 || record[ FIELDS.SYSTEM.DICT.STATUS.key ] != 1}
				onChange={checked => setLicenseDefault( record[ FIELDS.SYSTEM.DICT.KEY.key ], checked )}
			/>
			</Privilege>,
		},
	];
	// 筛选表单-字段
	const tableFilterFields = [];
	// 操作按钮
	const tableActions = [];
	// 更多操作菜单
	const tableMenuItems = [];

	// const memoFilterFields = useMemo( () => {
	// 	return tableFilterFields.map( props => <WrapperComplexFormItem
	// 		{...props}
	// 		form={form}
	// 	/> );
	// }, [ form ] );

	return (
		<GridContent>
			<WithTableName
				{...props}
				tableName={tableName}
				originColumns={tableColumns}
				// formFields={memoFilterFields}
				// tableActions={tableActions}
				// selectedRows={selectedRows}
				// setSelectedRows={setSelectedRows}
				// rowMenuItems={tableMenuItems}
				// handleMenuClick={handleMenuClick}
				columnSortable={false}
				// scroll={{ x: 1600 }}
				needUpdate={tableNeedUpdate}
				setNeedUpdate={setTableNeedUpdate}
			/>
		</GridContent>
	);
};

export default connect( (
	{
		[ tableName ]: data,
		dictionary,
		loading,
		global
	}
) => (
	{
		[ tableName ]: data,
		dictionary,
		loading,
		global,
	}
) )( Form.create()( License ) );