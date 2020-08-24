import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from "dva";
import { Card, Menu, Button, Form, Modal, Icon, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
import CollaborateEditModal from './CollaborateEditModal';
import getLocation from '@/utils/getLocation';
import { refreshDictionary } from "@/utils/dictionaryUtil";
import Privilege from '@/components/Privilege';

const tableName = 'orgCollaborate';

const Collaborate = props => {
	const { dispatch, form, loading } = props;
	// const [ selectedRows, setSelectedRows ] = useState( [] );
	// const [ rowMenuItems, setRowMenuItems ] = useState( [ ...originRowMenuItems ] );
	const [ collaborateEditVisible, setCollaborateEditVisible ] = useState( false );
	const [ collaborateEditItem, setCollaborateEditItem ] = useState( {} );
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );

	const saveCollaborate = params => {
		return dispatch( {
			type: `${tableName}/saveCollaborate`,
			params,
		} ).then( () => {
			setTableNeedUpdate( true );
			refreshDictionary( dispatch, 'colla_id' );
		} );
	};

	// 表格-字段
	const tableColumns = [
		{
			key: 'id',
			title: 'ID',
		},
		{
			...FIELDS.ORG.COLLA_NAME,
			customRender: ( text, record, index ) => {
				return (	
					<Privilege privs={[ 'cooperationunit_edit' ]}  noMatch={text}>
						<a onClick={e => {
							setCollaborateEditItem( { ...record } );
							setCollaborateEditVisible( true );
						}}>{text || '-'}</a>
					</Privilege>
				);
			},
		},
		FIELDS.ORG.COLLA_CONTACT_NAME,
		FIELDS.ORG.COLLA_CONTACT_MOBILE,
		{
			...FIELDS.ORG.COLLA_ADDRESS,
			customRender: ( text, record, index ) => [
				...getLocation()( [
					record[ FIELDS.ORG.COLLA_PROVINCE_CODE.key ],
					record[ FIELDS.ORG.COLLA_CITY_CODE.key ],
					record[ FIELDS.ORG.COLLA_DISTRICT_CODE.key ],
				] ),
				record[ FIELDS.ORG.COLLA_ADDRESS.key ],
			].join( '' ),
		},
		FIELDS.ORG.COLLA_TYPE,
	];
	// 筛选表单-字段
	const tableFilterFields = [
		{ config: {...FIELDS.ORG.COLLA_TYPE, key:"coopTypes"} },
		{ config: FIELDS.ORG.COLLA_NAME },
		{ config: FIELDS.ORG.COLLA_CONTACT_NAME },
		{ config: FIELDS.ORG.COLLA_CONTACT_MOBILE },
	];
	// 操作按钮
	const tableActions = [
		<Privilege privs={[ 'cooperationunit_add' ]} key="cooperationunit_add">
			<Button
				key="input" icon="plus-circle" htmlType="button" type="primary"
				onClick={() => {
					setCollaborateEditItem( {} );
					setCollaborateEditVisible( true );
				}}
			>
				新增外协结构
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
		<PageHeaderWrapper title={<FormattedMessage id="menu.school.collaborate"/>}>
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

			<CollaborateEditModal
				selectedRow={collaborateEditItem}
				visible={collaborateEditVisible}
				setVisible={setCollaborateEditVisible}
				loading={loading.effects[ `${tableName}/saveCollaborate` ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					saveCollaborate( fieldsValue ).then( () => {
						setCollaborateEditVisible( false );
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