import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from "dva";
import { Card, Menu, Button, Form, Modal, Icon, Switch, message } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from "@/config/fields";
import StopReasonEditModal from "./StopReasonEditModal";
import { refreshDictionary } from "@/utils/dictionaryUtil";
import Privilege from '@/components/Privilege';

const tableName = 'reason_2';

const StopReason = props => {
	const { dispatch, form, dictionary, loading } = props;
	const [ stopReasonEditVisible, setStopReasonEditVisible ] = useState( false );
	const [ stopReasonEditItem, setStopReasonEditItem ] = useState( {} );
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );

	const setStopReasonStatus = ( dKey, checked ) => {
		return dispatch( {
			type: `${tableName}/setStopReason`,
			payload: {
				dKey,
				status: checked ? 1 : 0
			},
		} ).then( () => {
			setTableNeedUpdate( true );
			refreshDictionary( dispatch, 'fetch' );
		} );
	};
	const saveStopReason = payload => {
		return dispatch( {
			type: `${tableName}/saveStopReason`,
			payload,
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
		{
			...FIELDS.SYSTEM.STOP_REASON.VALUE,
			customRender: ( text, record, index ) => {
				return (
					<Privilege privs={[ 'pause_archivist_reason_edit' ]} noMatch={text}>
					{record[ FIELDS.SYSTEM.DICT.READONLY.key ] == 1 ? text : <a onClick={e => {
					setStopReasonEditItem( { ...record } );
					setStopReasonEditVisible( true );
				}}>{text}</a>}</Privilege>);
			},
		},
		{
			...FIELDS.SYSTEM.DICT.READONLY,
			customRender: text => ( text == 1 ? '系统定义' : '驾校自定义' ),
		},
		{
			...FIELDS.SYSTEM.DICT.STATUS,
			customRender: ( text, record ) => 
			<Privilege privs={[ 'pause_archivist_reason_status_swtich' ]} noMatch={text === 1 ? '打开' : '关闭'}>
			<Switch
				checkedChildren="打开"
				unCheckedChildren="关闭"
				checked={text == 1}
				onChange={checked => setStopReasonStatus( record[ FIELDS.SYSTEM.DICT.KEY.key ], checked )}
			/></Privilege>,
		},
	];
	// 筛选表单-字段
	const tableFilterFields = [];
	// 操作按钮
	const tableActions = [
		<Privilege privs={[ 'pause_archivist_reason_define' ]} key="pause_archivist_reason_define">
		<Button type="primary" key="add" onClick={() => {
			setStopReasonEditItem( {} );
			setStopReasonEditVisible( true );
		}}>
			<Icon type="plus-circle"/> 自定义{FIELDS.SYSTEM.STOP_REASON.VALUE.title}
		</Button></Privilege>,
	];
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
				tableActions={tableActions}
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

			<StopReasonEditModal
				selectedRow={stopReasonEditItem}
				visible={stopReasonEditVisible}
				setVisible={setStopReasonEditVisible}
				loading={loading.effects[ `${tableName}/saveStopReason` ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					saveStopReason( fieldsValue ).then( data => {
						if ( data !== false ) setStopReasonEditVisible( false );
					} );
				}}
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
) )( Form.create()( StopReason ) );