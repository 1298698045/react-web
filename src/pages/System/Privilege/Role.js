import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from 'dva';
import { Card, Menu, Button, Form, Modal, Icon, Switch, Divider, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from '@/config/fields';
import RoleEditModal from './RoleEditModal';
import PrivEditModal from './PrivEditModal';
import { refreshDictionary } from '@/utils/dictionaryUtil';
import Privilege from '@/components/Privilege';
import Buttons from '@/components/Buttons';

const tableName = 'role';

const Role = props => {
	const { dispatch, form, loading, role } = props;
	// const [ selectedRows, setSelectedRows ] = useState( [] );
	// const [ rowMenuItems, setRowMenuItems ] = useState( [ ...originRowMenuItems ] );
	const [ roleEditVisible, setRoleEditVisible ] = useState( false );
	const [ roleEditItem, setRoleEditItem ] = useState( {} );
	const [ privEditVisible, setPrivEditVisible ] = useState( false );
	const [ privEditItem, setPrivEditItem ] = useState( {} );
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );
	
	useEffect( () => {
		dispatch( {
			type: `${tableName}/queryPrivilegeTree`,
		} );
	}, [] );
	
	const saveRole = params => {
		return dispatch( {
			type: `${tableName}/saveRole`,
			params,
		} ).then( () => {
			setTableNeedUpdate( true );
			refreshDictionary( dispatch, 'role_id' );
		} );
	};
	const deleteRole = role => {
		return dispatch( {
			type: `${tableName}/deleteRole`,
			params: {
				roleId: role[ FIELDS.SYSTEM.ROLE.ID.key ],
			},
		} ).then( () => {
			setTableNeedUpdate( true );
			refreshDictionary( dispatch, 'role_id' );
		} );
	};
	const saveRolePrivilege = privNameArray => {
		return dispatch( {
			type: `${tableName}/saveRolePrivilege`,
			payload: {
				params: privNameArray,
			},
		} ).then( () => {
			setTableNeedUpdate( true );
			refreshDictionary( dispatch, 'role_id' );
		} );
	};
	const toggleRoleStatus = ( id, checked ) => {
		return saveRole( { id, status: checked ? 1 : 0 } );
	};
	
	// 表格-字段
	const tableColumns = [
		FIELDS.SYSTEM.ROLE.ID,
		{
			...FIELDS.SYSTEM.ROLE.NAME,
			customRender: ( text, record, index ) => {
				return (
					<Privilege privs={[ 'privs_edit' ]} key="privs_edit" noMatch={text}>
					<a onClick={e => {
						setRoleEditItem( { ...record } );
						setRoleEditVisible( true );
					}}>{text}</a></Privilege>
				)
			},
		},
		FIELDS.SYSTEM.ROLE.DESC,
		// FIELDS.SYSTEM.ROLE.DATE,
		{
			...FIELDS.SYSTEM.ROLE.STATUS,
			customRender: ( text, record ) => 
			<Privilege privs={[ 'privs_swtich' ]} noMatch={text === 1 ? '启用' : '关闭'}>
				<Switch
					checkedChildren="启用"
					unCheckedChildren="禁用"
					checked={text == 1}
					onChange={checked => toggleRoleStatus( record[ FIELDS.SYSTEM.ROLE.ID.key ], checked )}
				/>
			</Privilege>,
		},
		{
			key: 'operation',
			title: '操作',
			customRender: ( text, record, index ) => {
				return <Buttons>
					<Privilege privs={[ 'privs_privs_setting' ]} key="privs_privs_setting" >
						<a key="privilege" onClick={e => {
							setPrivEditItem( { ...record } );
							setPrivEditVisible( true );
						}}><Icon type="setting"/> 权限 </a>
					</Privilege>
					<Privilege privs={[ 'privs_delete' ]} key="privs_delete">
						<a key="delete" onClick={() => Modal.confirm( {
							title: '删除提示！',
							content: '确定要删除角色【' + record[ FIELDS.SYSTEM.ROLE.NAME.key ] + '】吗？',
							okText: '确定',
							cancelText: '取消',
							onOk (){
								return deleteRole( record );
							},
						} )}><Icon type="delete"/> 删除</a> 
					</Privilege>
				</Buttons>
			},
		},
	];
	// 筛选表单-字段
	const tableFilterFields = [
		{
			config: FIELDS.SYSTEM.ROLE.NAME,
		},
		{
			config: FIELDS.SYSTEM.ROLE.STATUS,
		},
	];
	// 操作按钮
	const tableActions = [
		<Privilege privs={[ 'privs_add' ]} key="privs_add">
		<Button
			key="input" icon="plus-circle" htmlType="button" type="primary"
			onClick={() => {
				setRoleEditItem( {} );
				setRoleEditVisible( true );
			}}
		>
			新增角色
		</Button></Privilege>,
	];
	// 更多操作菜单
	const tableMenuItems = [];
	
	const memoFilterFields = useMemo( () => {
		return tableFilterFields.map( props => <WrapperComplexFormItem
			{...props}
			form={form}
		/> );
	}, [ form ] );
	
	return (
		<PageHeaderWrapper title={<FormattedMessage id="menu.system.privilege"/>}>
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
			
			<RoleEditModal
				selectedRow={roleEditItem}
				visible={roleEditVisible}
				setVisible={setRoleEditVisible}
				loading={loading.effects[ `${tableName}/saveRole` ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					saveRole( fieldsValue ).then( data => {
						if ( data !== false ) setRoleEditVisible( false );
					} );
				}}
			/>
			
			<PrivEditModal
				role={role}
				privEditItem={privEditItem}
				visible={privEditVisible}
				setVisible={setPrivEditVisible}
				loading={loading.effects[ `${tableName}/saveRolePrivilege` ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					saveRolePrivilege( fieldsValue ).then( data => {
						if ( data !== false ) setPrivEditVisible( false );
					} );
				}}
			/>
		</PageHeaderWrapper>
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
) )( Form.create()( Role ) );
