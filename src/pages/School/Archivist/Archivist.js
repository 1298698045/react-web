import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from "dva";
import { Card, Switch, Button, Form, Modal, Icon, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
import EmployeeSelectModal from '@/pages/Common/EmployeeSelectModal';
import { getDictItem, getDictValue, refreshDictionary } from '@/utils/dictionaryUtil';
import Privilege from '@/components/Privilege';

const tableName = 'orgArchivist';

const Archivist = props => {
	const { dispatch, form, loading, dictionary } = props;
	const [ employeeSelectVisible, setEmployeeSelectVisible ] = useState( false );
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );

	const addArchivist = employee => {
		return dispatch( {
			type: `${tableName}/addArchivist`,
			params: {
				employeeId: employee[ FIELDS.EMPLOYEE.ID.key ],
			},
		} ).then( () => {
			setTableNeedUpdate( true );
			refreshDictionary( dispatch, 'archivist_id' );
		} );
	};
	const deleteArchivist = employee => {
		return dispatch( {
			type: `${tableName}/deleteArchivist`,
			params: {
				employeeId: employee[ FIELDS.EMPLOYEE.ID.key ],
			},
		} ).then( () => {
			setTableNeedUpdate( true );
			refreshDictionary( dispatch, 'archivist_id' );
		} );
	};

	const toggleDefaultArchivist = ( employee, checked ) => {
		return dispatch( {
			type: `${tableName}/${checked ? 'set' : 'cancel'}DefaultArchivist`,
			params: {
				employeeId: employee[ FIELDS.EMPLOYEE.ID.key ],
			},
		} ).then( () => {
			setTableNeedUpdate( true );
			refreshDictionary( dispatch, 'archivist_id' );
		} );
	};

	// 表格-字段
	const tableColumns = [
		{
			key: 'key',
			title: '序号',
		},
		FIELDS.EMPLOYEE.NAME,
		FIELDS.EMPLOYEE.GENDER,
		FIELDS.EMPLOYEE.MOBILE,
		FIELDS.ORG.POSITION_ID,
		{
			...FIELDS.ORG.POSITION_LEVEL,
			customRender: ( text, record, index ) => {
				const item = ( getDictItem( dictionary, FIELDS.ORG.POSITION_ID.dictionary, record[ FIELDS.ORG.POSITION_ID.key ] ) || {} );
				return getDictValue( dictionary, FIELDS.ORG.POSITION_LEVEL.dictionary, item[ FIELDS.ORG.POSITION_LEVEL.key ] );
			},
		},
		{
			...FIELDS.ORG.POSITION_TYPE,
			customRender: ( text, record, index ) => {
				const item = ( getDictItem( dictionary, FIELDS.ORG.POSITION_ID.dictionary, record[ FIELDS.ORG.POSITION_ID.key ] ) || {} );
				return getDictValue( dictionary, FIELDS.ORG.POSITION_TYPE.dictionary, item[ FIELDS.ORG.POSITION_TYPE.key ] );
			},
		},
		{
			...FIELDS.ORG.ARCHIVIST.DEFAULT,
			customRender: ( text, record ) => 
			<Privilege privs={[ 'archivist_receiver_swtich' ]}  noMatch={text == 2 ? '否' : '是'}>
			<Switch
				checkedChildren="是"
				unCheckedChildren="否"
				checked={text == 2}
				onChange={checked => toggleDefaultArchivist( record, checked )}
			/></Privilege>,
		},
		{
			key: 'operation',
			title: '操作',
			// fixed: 'right',
			customRender: ( text, record, index ) =>
			<Privilege privs={[ 'archivist_receiver_detele' ]}  noMatch={'删除'}>
				<a key="delete" onClick={() => Modal.confirm( {
					title: '确定要删除建档受理人【' + record[ FIELDS.EMPLOYEE.NAME.key ] + '】？',
					okText: "确定",
					cancelText: "取消",
					onOk() {
						return deleteArchivist( record );
					},
				} )}><Icon type="delete"/> 删除</a></Privilege>,
		},
	];
	// 筛选表单-字段
	const tableFilterFields = [];
	// 操作按钮
	const tableActions = [
		<Privilege privs={[ 'archivist_receiver_add' ]} key="archivist_receiver_add">
		<Button
			key="input" icon="plus-circle" htmlType="button" type="primary"
			onClick={() => {
				setEmployeeSelectVisible( true );
			}}
		>
			添加建档受理人
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
		<PageHeaderWrapper title={<FormattedMessage id="menu.school.archivist"/>}>
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
			</GridContent>

			<EmployeeSelectModal
				visible={employeeSelectVisible}
				setVisible={setEmployeeSelectVisible}
				tableSearchParams={{ [ FIELDS.EMPLOYEE.LEAVING.key ]: 0 }}
				onSelect={employee => {
					addArchivist( employee );
				}}
			/>
		</PageHeaderWrapper>
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
) )( Form.create()( Archivist ) );