import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from "dva";
import { Card, Menu, Button, Form, Modal, Icon, message, Divider } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
import EditModal from './EditModal';
import getLocation from '@/utils/getLocation';
import { refreshDictionary } from "@/utils/dictionaryUtil";
import Privilege from '@/components/Privilege';

const tableName = 'introducer';

const Collaborate = props => {
	const { dispatch, form, loading } = props;
	const [ editVisible, setEditVisible ] = useState( false );
	const [ editItem, setEditItem ] = useState( {} );
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );

	const saveIntrducer = params => {
		return dispatch( {
			type: `${tableName}/saveIntroducer`,
			params,
		} ).then( () => {
			setTableNeedUpdate( true );
			refreshDictionary( dispatch, 'introducer_id' );
		} );
	};
	const deleteIntroducer = id => {
		return dispatch( {
			type: `${tableName}/delIntroducer`,
			params: {
				id: id
			},
		} ).then( () => {
			setTableNeedUpdate( true );
			refreshDictionary( dispatch, 'introducer_id' );
		} );
	};
	// 表格-字段
	const tableColumns = [
		{ title: '序号', key: 'key'},
		{
			...FIELDS.ORG.INTRODUCER_NAME,
			customRender: ( text, record, index ) => {
				return (	
					<Privilege privs={[ 'cooperationunit_edit' ]}  noMatch={text}>
						<a onClick={e => {
							setEditItem( { ...record } );
							setEditVisible( true );
						}}>{text || '-'}</a>
					</Privilege>
				);
			},
		},
		FIELDS.ORG.INTRODUCER_SEX,
		FIELDS.ORG.INTRODUCER_MOBILE,
		FIELDS.ORG.INTRODUCER_ADDRESS,
		FIELDS.ORG.INTRODUCER_MEMO,
		FIELDS.ORG.INTRODUCER_CONTACT_NAME,
		{
			key: 'operation',
			title: '操作',
			customRender: ( text, record, index ) => ([
				<Privilege privs={[ 'edit_outside_school_introducer' ]} key="edit_outside_school_introducer">
					{[<a key="delete" onClick={e => {
							setEditItem( { ...record } );
							setEditVisible( true );
						}
					}><Icon type="edit"/> 编辑</a>, <Divider key="divider0" type="vertical"/>]}
				</Privilege>,
				<Privilege privs={[ 'delete_outside_school_introducer' ]} key="delete_outside_school_introducer">
					{[<a key="delete" onClick={() => Modal.confirm( {
						title: '确定要删除校外介绍人【' + record[ FIELDS.ORG.INTRODUCER_NAME.key ] + '】？',
						okText: "确定",
						cancelText: "取消",
						onOk() {
							return deleteIntroducer( record.id );
						},
					} )}><Icon type="delete"/> 删除</a>
					]}
				</Privilege>,
				
			])
		},
	];
	// 筛选表单-字段
	const tableFilterFields = [
		{ config: FIELDS.ORG.INTRODUCER_QUICK_SEARCH },
	];
	// 操作按钮
	const tableActions = [
		<Privilege privs={[ 'add_outside_school_introducer' ]} key="add_outside_school_introducer">
			<Button
				key="input" icon="plus-circle" htmlType="button" type="primary"
				onClick={() => {
					setEditItem( {} );
					setEditVisible( true );
				}}
			>
				新增校外介绍人
			</Button>
		</Privilege>,
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
		<PageHeaderWrapper title={<FormattedMessage id="menu.school.introducer"/>}>
			<GridContent>
				<WithTableName
					{...props}
					tableName={tableName}
					originColumns={tableColumns}
					formFields={memoFilterFields}
					tableActions={tableActions}
					columnSortable={false}
					scroll={{ x: 'max-content' }}
					needUpdate={tableNeedUpdate}
					tableSearchParams={{status: '1'}}
					setNeedUpdate={setTableNeedUpdate}
				/>
			</GridContent>

			<EditModal
				selectedRow={editItem}
				visible={editVisible}
				setVisible={setEditVisible}
				loading={loading.effects[ `${tableName}/saveIntrducer` ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					saveIntrducer( fieldsValue ).then( () => {
						setEditVisible( false );
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
) )( Form.create()( Collaborate ) );