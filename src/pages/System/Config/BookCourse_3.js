import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from "dva";
import { Card, Menu, Button, Form, Modal, Icon, Switch, message, Divider, Spin, Typography,Popconfirm } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from "@/config/fields";
import BookNumEditModal from "./BookNumEditModal";
import { refreshDictionary } from "@/utils/dictionaryUtil";
import Privilege from '@/components/Privilege';

const { Text, } = Typography;

const tableName = 'bookCourse_3';

const BookNum = props => {
	const { dispatch, form, dictionary, loading } = props;
	const [ bookNumEditVisible, setBookNumEditVisible ] = useState( false );
	const [ bookNumEditItem, setBookNumEditItem ] = useState( {} );
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );
	// const delLoading = loading.effects[ `${tableName}/deleteRecord` ] || false;
	const delLoading =  false;
	const setBookNumStatus = ( dKey, checked ) => {
		return dispatch( {
			type: `${tableName}/setBookNum`,
			payload: {
				dKey,
				status: checked ? 1 : 0
			},
		} ).then( () => {
			setTableNeedUpdate( true );
			refreshDictionary( dispatch, 'fetch' );
		} );
	};
	const saveBookNum = payload => {
		return dispatch( {
			type: `${tableName}/saveBookNum`,
			payload,
		} ).then( () => {
			setTableNeedUpdate( true );
			refreshDictionary( dispatch, 'fetch' );
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
			refreshDictionary( dispatch, 'fetch' );
		} );
	};
	// 表格-字段
	const tableColumns = [
		{
			key: 'key',
			title: '序号',
		},
		FIELDS.SYSTEM.BOOK_NUM.VALUE,
		// {
		// 	...FIELDS.SYSTEM.BOOK_NUM.VALUE,
		// 	customRender: ( text, record, index ) => {
		// 		return (
		// 		<Privilege privs={[ 'booknum_edit' ]} noMatch={text}>
		// 			{record[ FIELDS.SYSTEM.DICT.READONLY.key ] == 1 ? text : <a onClick={e => {
		// 				setBookNumEditItem( { ...record } );
		// 				setBookNumEditVisible( true );
		// 			}}>{text}</a>}
		// 		</Privilege>);
		// 	},
		// },
		{
			...FIELDS.SYSTEM.DICT.READONLY,
			customRender: text => ( text == 1 ? '系统定义' : '驾校自定义' ),
		},
		{
			...FIELDS.SYSTEM.DICT.STATUS,
			customRender: ( text, record ) => 
			<Privilege privs={[ 'booknum_status_swtich' ]} noMatch={text === 1 ? '打开' : '关闭'}>
			<Switch
				checkedChildren="打开"
				unCheckedChildren="关闭"
				checked={text == 1}
				onChange={checked => setBookNumStatus( record[ FIELDS.SYSTEM.DICT.KEY.key ], checked )}
			/></Privilege>,
		},
		{
			title: '操作',
			key: 'action',
			customRender: ( text, record, ) => {
				const { readonly, dictSwitch } = record;
				return [
					readonly  * 1 !== 1 && dictSwitch *  1 !== 1 ?
					<Popconfirm
						key="delete"
						title="确定删除此条记录么？"
						onConfirm={() => {
							const { dKey } = record;
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
		<Privilege privs={[ 'booknum_define' ]} key={'booknum_define'}>
		<Button type="primary" key="add" onClick={() => {
			setBookNumEditItem( {} );
			setBookNumEditVisible( true );
		}}>
			<Icon type="plus-circle"/> 自定义{FIELDS.SYSTEM.BOOK_NUM.VALUE.title}
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

			<BookNumEditModal
				selectedRow={bookNumEditItem}
				visible={bookNumEditVisible}
				setVisible={setBookNumEditVisible}
				loading={loading.effects[ `${tableName}/saveBookNum` ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					saveBookNum( fieldsValue ).then( data => {
						if ( data !== false ) setBookNumEditVisible( false );
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
) )( Form.create()( BookNum ) );