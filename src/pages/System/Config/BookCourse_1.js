import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from "dva";
import { Card, Menu, Button, Form, Modal, Icon, Switch, message } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from "@/config/fields";
import { refreshDictionary } from "@/utils/dictionaryUtil";
import Privilege from '@/components/Privilege';

const tableName = 'bookCourse_1';

const MatchMode = props => {
	const { dispatch, form, dictionary, [ tableName ]: table } = props;
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );

	const setMatchModeStatus = ( dKey, checked ) => {
		if ( !checked && table[ `${tableName}TableData` ].list.filter( v => v[ FIELDS.SYSTEM.DICT.STATUS.key ] == 1 ).length <= 1 ) {
			message.error( '分配模式不可全是关闭状态！' );
			return;
		}
		return dispatch( {
			type: `${tableName}/setMatchMode`,
			payload: {
				dKey,
				status: checked ? 1 : 0
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
		FIELDS.SYSTEM.MATCH_MODE.VALUE,
		{
			...FIELDS.SYSTEM.DICT.READONLY,
			customRender: text => ( text == 1 ? '系统定义' : '驾校自定义' ),
		},
		{
			...FIELDS.SYSTEM.DICT.STATUS,
			customRender: ( text, record ) => 
			<Privilege privs={[ 'match_mode_status_swtich' ]} noMatch={text === 1 ? '打开' : '关闭'}>
				<Switch
				checkedChildren="打开"
				unCheckedChildren="关闭"
				checked={text == 1}
				onChange={checked => setMatchModeStatus( record[ FIELDS.SYSTEM.DICT.KEY.key ], checked )}
			/></Privilege>,
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
				pagination={false}
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
) )( Form.create()( MatchMode ) );