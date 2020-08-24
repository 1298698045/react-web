import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from "dva";
import { Card, Menu, Button, Form, Modal, Icon, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from "@/config/fields";
import GoalEditModal from './GoalEditModal';
import Privilege from '@/components/Privilege';

const tableName = 'orgGoal';

const Goal = props => {
	const { dispatch, form, loading, [ tableName ]: goal } = props;
	// const [ selectedRows, setSelectedRows ] = useState( [] );
	// const [ rowMenuItems, setRowMenuItems ] = useState( [ ...originRowMenuItems ] );
	const [ goalEditVisible, setGoalEditVisible ] = useState( false );
	const [ goalEditItem, setGoalEditItem ] = useState( [] );
	const [ availableYears, setAvailableYears ] = useState( [] );
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );

	const saveGoalEdit = payload => {
		return dispatch( {
			type: 'orgGoal/saveGoalEdit',
			payload,
		} ).then( () => {
			setTableNeedUpdate( true );
		} );
	};

	useEffect( function () {
		const list = goal[ `${ tableName }TableData` ].list;
		const years = [];
		const currentYear = new Date().getFullYear();
		for ( let y = 2019; y <= currentYear + 100; ++y ) {
			if ( !list.find( v => v.year == y ) ) years.push( '' + y );
		}
		setAvailableYears( years );
	}, [ goal ] );


	// 表格-字段
	const tableColumns = [
		{
			key: 'key',
			title: '序号',
		},
		{
			key: 'year',
			title: '年份',
		},
		{
			key: 'total',
			title: '计划招生',
		},
		{
			key: 'progress',
			title: '完成招生',
		},
		{
			key: 'operation',
			title: '操作',
			customRender: ( text, record, index ) => (
				<Privilege privs={[ 'salesgoal_detail' ]}  noMatch={'查看'}>
					<a onClick={e => {
						setGoalEditItem( record.list );
						setGoalEditVisible( true );
					}}>查看</a></Privilege>)
		},
	];
	// 筛选表单-字段
	const tableFilterFields = [];
	// 操作按钮
	const tableActions = [
		<Privilege privs={[ 'salesgoal_add' ]} key="salesgoal_add">
		<Button
			key="input" icon="plus-circle" htmlType="button" type="primary"
			disabled={!availableYears.length}
			onClick={() => {
				setGoalEditItem( [] );
				setGoalEditVisible( true );
			}}
		>
			新增招生目标
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
		<PageHeaderWrapper title={<FormattedMessage id="menu.school.goal"/>}>
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
					scroll={{ x: 'max-content' }}
					pagination={false}
					needUpdate={tableNeedUpdate}
					setNeedUpdate={setTableNeedUpdate}
				/>
			</GridContent>

			<GoalEditModal
				availableYears={availableYears}
				selectedRow={goalEditItem}
				visible={goalEditVisible}
				setVisible={setGoalEditVisible}
				confirmLoading={loading.effects[ 'orgGoal/saveGoalEdit' ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					saveGoalEdit( fieldsValue ).then( data => {
						if ( data !== false ) setGoalEditVisible( false );
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
) )( Form.create()( Goal ) );