import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from "dva";
import { Card, Switch, Button, Form, Modal, Icon, message } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
import PositionEditModal from './PositionEditModal';
import { refreshDictionary } from '@/utils/dictionaryUtil';
import Privilege from '@/components/Privilege';

const tableName = 'orgPosition';

const Position = props => {
	const { dispatch, form, loading, departmentSelected } = props;
	// const [ selectedRows, setSelectedRows ] = useState( [] );
	// const [ rowMenuItems, setRowMenuItems ] = useState( [ ...originRowMenuItems ] );
	const [ positionEditVisible, setPositionEditVisible ] = useState( false );
	const [ positionEditItem, setPositionFormItem ] = useState( {} );
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );

	const savePosition = params => {
		return dispatch( {
			type: `${tableName}/savePosition`,
			params,
		} ).then( () => {
			setTableNeedUpdate( true );
			refreshDictionary( dispatch, 'position_id' );
		} );
	};
	const togglePositionStatus = ( id, checked ) => {
		return savePosition( { id, status: checked ? 1 : 0 } );
	};

	const getOperationButton = ( text, record, index ) => {
		return {
			0: <a key="enable" onClick={() => Modal.confirm( {
				title: '是否启用【' + record[ FIELDS.ORG.POSITION_NAME.key ] + '】职务？',
				okText: "确定",
				cancelText: "取消",
				onOk() {
					return enablePosition();
				},
			} )}><Icon type="check-circle"/> 启用</a>,
			1: <a key="disable" onClick={() => Modal.confirm( {
				title: '是否停用【' + record[ FIELDS.ORG.POSITION_NAME.key ] + '】职务？',
				okText: "确定",
				cancelText: "取消",
				onOk() {
					return disablePosition();
				},
			} )}><Icon type="stop"/> 停用</a>,
		}[ record[ FIELDS.ORG.POSITION_STATUS.key ] ];
	};

	// 表格-字段
	const tableColumns = [
		{
			...FIELDS.ORG.POSITION_NAME,
			customRender: ( text, record, index ) => {
				return <Privilege privs={[ 'position_edit' ]} noMatch={text}>
					<a onClick={e => {
					setPositionFormItem( { ...record } );
					setPositionEditVisible( true );
				}}>{text}</a></Privilege>;
			},
		},
		FIELDS.ORG.POSITION_TYPE,
		FIELDS.ORG.POSITION_LEVEL,
		FIELDS.ORG.POSITION_MEMO,
		{
			...FIELDS.ORG.POSITION_STATUS,
			customRender: ( text, record ) => <Privilege privs={[ 'position_status_swtich' ]} noMatch={text == 1 ? '启用' : '关闭'}>
			<Switch
				checkedChildren="启用"
				unCheckedChildren="关闭"
				checked={text == 1}
				onChange={checked => togglePositionStatus( record.id, checked )}
			/></Privilege>,
		}
	];
	// 筛选表单-字段
	const tableFilterFields = [
		{
			config: FIELDS.ORG.POSITION_TYPE,
		},
		{
			config: FIELDS.ORG.POSITION_LEVEL,
		},
		{
			config: FIELDS.ORG.POSITION_STATUS,
		},
	];
	// 操作按钮
	const tableActions = [
		<Privilege privs={[ 'position_add' ]} key="position_add">
			<Button
				key="input" icon="plus-circle" htmlType="button" type="primary"
				onClick={() => {
					setPositionFormItem( {} );
					setPositionEditVisible( true );
				}}
			>
				新增职务
			</Button></Privilege>,
		]
	;
	// 更多操作菜单
	const tableMenuItems = [];

	const memoFilterFields = useMemo( () => {
		return tableFilterFields.map( props => <WrapperComplexFormItem
			{...props}
			form={form}
		/> );
	}, [ form ] );

	return (
		<Fragment>
			<GridContent>
				<WithTableName
					{...props}
					tableName={tableName}
					originColumns={tableColumns}
					formFields={memoFilterFields}
					tableActions={tableActions}
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

			<PositionEditModal
				selectedRow={positionEditItem}
				visible={positionEditVisible}
				setVisible={setPositionEditVisible}
				loading={loading.effects[ `${tableName}/savePosition` ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					savePosition( fieldsValue ).then( data => {
						if ( data !== false ) setPositionEditVisible( false );
					} );
				}}
			/>
		</Fragment>
	);
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
		global,
	}
) )( Form.create()( Position ) );