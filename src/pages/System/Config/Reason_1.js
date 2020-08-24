import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from "dva";
import { Card, Menu, Button, Form, Modal, Icon, Switch, message } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from "@/config/fields";
import DelayReasonEditModal from "./DelayReasonEditModal";
import { refreshDictionary } from "@/utils/dictionaryUtil";
import Privilege from '@/components/Privilege';

const tableName = 'reason_1';

const DelayReason = props => {
	const { dispatch, form, dictionary, loading } = props;
	const [ delayReasonEditVisible, setDelayReasonEditVisible ] = useState( false );
	const [ delayReasonEditItem, setDelayReasonEditItem ] = useState( {} );
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );

	const setDelayReasonStatus = ( dKey, checked ) => {
		return dispatch( {
			type: `${tableName}/setDelayReason`,
			payload: {
				dKey,
				status: checked ? 1 : 0
			},
		} ).then( () => {
			setTableNeedUpdate( true );
			refreshDictionary( dispatch, 'fetch' );
		} );
	};
	const saveDelayReason = payload => {
		return dispatch( {
			type: `${tableName}/saveDelayReason`,
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
			...FIELDS.SYSTEM.DELAY_REASON.VALUE,
			customRender: ( text, record, index ) => {
				return (
					<Privilege privs={[ 'delay_archivist_reason_edit' ]} noMatch={text === 1 ? '打开' : '关闭'}>
					{record[ FIELDS.SYSTEM.DICT.READONLY.key ] == 1 ? text : <a onClick={e => {
					setDelayReasonEditItem( { ...record } );
					setDelayReasonEditVisible( true );
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
			<Privilege privs={[ 'delay_archivist_reason_status_swtich' ]} noMatch={text === 1 ? '打开' : '关闭'}>
			<Switch
				checkedChildren="打开"
				unCheckedChildren="关闭"
				checked={text == 1}
				onChange={checked => setDelayReasonStatus( record[ FIELDS.SYSTEM.DICT.KEY.key ], checked )}
			/></Privilege>,
		},
	];
	// 筛选表单-字段
	const tableFilterFields = [];
	// 操作按钮
	const tableActions = [
		<Privilege privs={[ 'delay_archivist_reason_define' ]} key="delay_archivist_reason_define">
		<Button type="primary" key="add" onClick={() => {
			setDelayReasonEditItem( {} );
			setDelayReasonEditVisible( true );
		}}>
			<Icon type="plus-circle"/> 自定义{FIELDS.SYSTEM.DELAY_REASON.VALUE.title}
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

			<DelayReasonEditModal
				selectedRow={delayReasonEditItem}
				visible={delayReasonEditVisible}
				setVisible={setDelayReasonEditVisible}
				loading={loading.effects[ `${tableName}/saveDelayReason` ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					saveDelayReason( fieldsValue ).then( data => {
						if ( data !== false ) setDelayReasonEditVisible( false );
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
) )( Form.create()( DelayReason ) );