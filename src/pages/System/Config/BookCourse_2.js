import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from "dva";
import { Card, Menu, Button, Form, Modal, Icon, Switch, message, Divider, Spin, Typography,Popconfirm } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from "@/config/fields";
import WeekdayEditModal from "./WeekdayEditModal";
import { refreshDictionary } from "@/utils/dictionaryUtil";
import Privilege from '@/components/Privilege';
import { Record } from 'immutable';

const { Text, } = Typography;

const tableName = 'bookCourse_2';

const Weekday = props => {
	const { dispatch, form, dictionary, loading } = props;
	const [ weekdayEditVisible, setWeekdayEditVisible ] = useState( false );
	const [ weekdayEditItem, setWeekdayEditItem ] = useState( {} );
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );
	// const delLoading = loading.effects[ `${tableName}/deleteRecord` ] || false;
	const delLoading =  false;

	const setWeekdayStatus = ( dKey, checked ) => {
		return dispatch( {
			type: `${tableName}/setWeekday`,
			payload: {
				dKey,
				status: checked ? 1 : 0
			},
		} ).then( () => {
			setTableNeedUpdate( true );
			refreshDictionary( dispatch, 'week_day_all' );
		} );
	};
	const saveWeekday = payload => {
		return dispatch( {
			type: `${tableName}/saveWeekday`,
			payload,
		} ).then( () => {
			setTableNeedUpdate( true );
			refreshDictionary( dispatch, 'week_day_all' );
		} );
	};
	
	// 删除
	const deleteRecord = dKey => {
		console.log(dKey)
		dispatch( {
			type:`${tableName}/deleteRecord`,
			payload: {
				params: {
					dKey: dKey
				}
			},
		} ).then( () => {
			setTableNeedUpdate( true );
			refreshDictionary( dispatch, 'week_day_all' );
		} );
	};
	
	// 表格-字段
	const tableColumns = [
		{
			key: 'key',
			title: '序号',
		},
		FIELDS.SYSTEM.WEEKDAY.VALUE,
		FIELDS.SYSTEM.WEEKDAY.MEMO,
		{
			...FIELDS.SYSTEM.DICT.READONLY,
			customRender: text => ( text == 1 ? '系统定义' : '驾校自定义' ),
		},
		{
			...FIELDS.SYSTEM.DICT.STATUS,
			customRender: ( text, record ) => 
			<Privilege privs={[ 'allow_order_date_status_swtich' ]} noMatch={text === 1 ? '打开' : '关闭'}>
			<Switch
				checkedChildren="打开"
				unCheckedChildren="关闭"
				checked={text == 1}
				onChange={checked => setWeekdayStatus( record[ FIELDS.SYSTEM.DICT.KEY.key ], checked )}
			/></Privilege>,
		},
		{
			title: '操作',
			key: 'action',
			customRender: ( text, record, ) => {
				const { readonly, dictSwitch } = record;
				return [
					// readonly  * 1 !== 1 && dictSwitch *  1 !== 1 ? 
					// <a key="edit" onClick={() => {
					// 	setWeekdayEditItem( { ...record } );
					// 	setWeekdayEditVisible( true );
					// }}>编辑</a> : <Text key="edit" disabled>编辑</Text>,
					// <Divider key="divider0" type="vertical"/>,
					readonly  * 1 !== 1 && dictSwitch *  1 !== 1 ?
					<Popconfirm
						key="delete"
						title="确定删除此条记录么？"
						onConfirm={() => {
							const { dKey } = record;
							console.log(record)
							deleteRecord( dKey );
						}}>
						<a>{ delLoading &&  <Spin size="small"/>} 删除</a>
					</Popconfirm> : <Text key="delete" disabled>删除</Text>
				]
			}
		},
	];
	// 筛选表单-字段
	const tableFilterFields = [];
	// 操作按钮
	const tableActions = [
		<Privilege privs={[ 'allow_order_date_define' ]} key={'allow_order_date_define'}>
		<Button type="primary" key="add" onClick={() => {
			setWeekdayEditItem( {} );
			setWeekdayEditVisible( true );
		}}>
			<Icon type="plus-circle"/> 自定义{FIELDS.SYSTEM.WEEKDAY.MEMO.title}
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

			<WeekdayEditModal
				selectedRow={weekdayEditItem}
				visible={weekdayEditVisible}
				setVisible={setWeekdayEditVisible}
				loading={loading.effects[ `${tableName}/saveWeekday` ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					saveWeekday( fieldsValue ).then( data => {
						if ( data !== false ) setWeekdayEditVisible( false );
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
) )( Form.create()( Weekday ) );