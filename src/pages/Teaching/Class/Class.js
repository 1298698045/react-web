import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from 'dva';
import { Card, Tag, Button, Switch, Form, Modal, Icon, message, Tooltip } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from '@/config/fields';
import Privilege from '@/components/Privilege';
import ClassEditModal from './ClassEditModal';
import { refreshDictionary, queryDictionary } from '@/utils/dictionaryUtil';
import ChangeClassModal from './ChangeClassModal';

const tableName = 'teachingClass';

const Class = props => {
	const { dispatch, form, loading, dictionary } = props;
	const [ employeeEditVisible, setClassEditVisible ] = useState( false );
	const [ employeeEditItem, setClassEditItem ] = useState( {} );
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );
	const [ selectedRows, setSelectedRows ] = useState( [] );

	const [ changeClassModalVisible, setChangeClassModalVisible ] = useState( false );
	const changeClassLoading = loading.effects[ `${tableName}/changeClass` ] || false;
	useEffect( () => {
		queryDictionary( dispatch, 'class_id' );
	}, [] );
	const saveClass = params => {
		return dispatch( {
			type: `${tableName}/saveClass`,
			params,
		} ).then( () => {
			setTableNeedUpdate( true );
			refreshDictionary( dispatch, 'class_id' );
		} );
	};
	const toggleClassStatus = ( id, checked ) => {
		return saveClass( { id, [ FIELDS.TEACHING.CLASS.STATUS.key ]: checked ? 1 : 0 } );
	};

	// 表格-字段
	const tableColumns = [
		{
			...FIELDS.TEACHING.CLASS.NAME,
			customRender: ( text, record, index ) => {
				return (
					<Privilege privs={[ 'class_pattern_edit' ]} noMatch={text}>
						<a onClick={e => {
							// e.stopPropagation();
							// console.log( text, record, index );
							setClassEditItem( { ...record } );
							setClassEditVisible( true );
						}}>{text}</a>
					</Privilege>
				)
			},
		},
		FIELDS.TEACHING.CLASS.LICENSE_TYPE,
		FIELDS.TEACHING.CLASS.MATCH_MODE,
		FIELDS.TEACHING.CLASS.BOOK_NUM,
		{
			...FIELDS.TEACHING.CLASS.WEEKDAY,
			dictionary: 'week_day_all',
		},
		{
			...FIELDS.TEACHING.CLASS.DEPART_ID,
			customRender: ( text, record, index, values ) => {
				return values ? values.split( ',' ).map( ( v, i ) => <div key={i}><Tag>{v}</Tag></div> ) : text;
			},
		},
		{
			...FIELDS.TEACHING.CLASS.MONEY,
			customRender: ( text, record, index, values ) => {
				let money = text
				if (record.payType === 'down_pay') {
					money = <Tooltip title={`首付：${( text ) }元   余额款：${record.balance}元`}><a>{money + record.balance}</a></Tooltip>
				}
				return money
			},
		},
		// FIELDS.TEACHING.CLASS.MONEY,
		FIELDS.TEACHING.CLASS.PAY_TYPE,
		{
			...FIELDS.TEACHING.CLASS.STATUS,
			customRender: ( text, record ) =>
				<Privilege privs={[ 'class_pattern_status_swtich' ]} noMatch={text === 1 ? '启用' : '关闭'}>
					<Switch
						checkedChildren="启用"
						unCheckedChildren="关闭"
						checked={text == 1}
						onChange={checked => toggleClassStatus( record[ FIELDS.TEACHING.CLASS.ID.key ], checked )}
					/>
				</Privilege>,
		},
	];
	// 筛选表单-字段
	const tableFilterFields = [
		{
			config: FIELDS.TEACHING.CLASS.NAME,
		},
		{
			config: FIELDS.TEACHING.CLASS.LICENSE_TYPE_ACTIVE,
		},
		{
			config: FIELDS.TEACHING.CLASS.MATCH_MODE,
		},
		{
			config: FIELDS.TEACHING.CLASS.BOOK_NUM,
		},
		{
			config: FIELDS.TEACHING.CLASS.WEEKDAY,
		},
		{
			config: FIELDS.TEACHING.CLASS.DEPART_ID_SCHOOL,
		},
		{
			config: {
				...FIELDS.TEACHING.CLASS.STATUS,
				type: 'select',
			},
		},
	];
	// 操作按钮
	const tableActions = [
		<Privilege privs={[ 'class_pattern_add' ]} key={'class_pattern_add'}>
			<Button
				key="input" icon="plus-circle" htmlType="button" type="primary"
				onClick={() => {
					setClassEditItem( {} );
					setClassEditVisible( true );
				}}
			>
				新增班型
			</Button>
		</Privilege>,
		<Privilege privs={[ 'student_batch_change_class' ]} key={'student_batch_change_class'}>
			<Button
				disabled={!selectedRows.length}
				key="input" icon="plus-circle" htmlType="button" type="primary"
				onClick={() => {
					setChangeClassModalVisible( true );
				}}
			>
				学员变更班型
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
		<PageHeaderWrapper title={<FormattedMessage id="menu.teaching.class"/>}>
			<GridContent>
				<WithTableName
					{...props}
					tableName={tableName}
					originColumns={tableColumns}
					formFields={memoFilterFields}
					tableActions={tableActions}
					multipleSelection={false}
					selectedRows={selectedRows}
					setSelectedRows={setSelectedRows}
					columnSortable={false}
					needUpdate={tableNeedUpdate}
					setNeedUpdate={setTableNeedUpdate}
					scroll={{ x: 'max-content' }}
				/>
			</GridContent>

			<ClassEditModal
				dictionary={dictionary}
				selectedRow={employeeEditItem}
				visible={employeeEditVisible}
				setVisible={setClassEditVisible}
				loading={loading.effects[ `${tableName}/saveClass` ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					saveClass( fieldsValue ).then( data => {
						if ( data !== false ) setClassEditVisible( false );
					} );
				}}
			/>
			<ChangeClassModal
				handleSubmit={params => {
					dispatch( {
						type: `${tableName}/changeClass`,
						params,
					} ).then( data => {
						if ( data !== false ) {
							setChangeClassModalVisible( false );
						}
					} );
				}}
				afterClose={() => {
					setSelectedRows( [] );
					setTableNeedUpdate( true );
				}}
				selectItem={selectedRows[ 0 ]}
				visible={changeClassModalVisible}
				setVisible={setChangeClassModalVisible}
				dictionary={dictionary}
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
) )( Form.create()( Class ) );
