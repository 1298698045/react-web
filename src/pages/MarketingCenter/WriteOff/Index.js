import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from "dva";
import { Popconfirm, Card, Menu, Button, Form, Modal, Icon, Switch, message, Typography, Spin } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
const tableName = 'group';
const { Text } = Typography;

const GroupViewModal = props => {
	const GROUP =  FIELDS.ACTIVITY.GROUP
	const {  dispatch, handleSubmit, visible,form, setVisible, data, loading, afterClose, user} = props;
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );
	const [ getInfoLoadingId, setInfoLoadingId ] = useState( undefined );
	const getInfoLoading = loading.effects[ `${tableName}/closeGroup` ] || false;
	const hexiaoSubmit = id => {
		setInfoLoadingId( id );
		dispatch( {
			type: `${tableName}/closeGroup`,
			payload: id
		} ).then( res => {
			if (res === null) {
				setTableNeedUpdate(true)
			}
		} );
	};
	// 表格-字段
	let tableColumns = [...GROUP.TABLE_HEAD]
	const formFields = GROUP.SEARCH_FORM
	const searchFormFields = useMemo( () => {
		return formFields.map( props => <WrapperComplexFormItem
			{...props}
			form={form}
		/> );
	}, [ form ] );
	tableColumns.push({
		title: '操作',
		key: 'write_off_actions',
		width: 100,
		customRender: ( text, record, ) => {
			let status = record.status
			return [
				String( status ) === 'UNFINISHED' ?
				<Popconfirm
					key="hx"
					title="确定要核销该名额吗？"
					onConfirm={() => {
						hexiaoSubmit( record.id );
					}}>
					<a>{(getInfoLoadingId === record.id && getInfoLoading) && <Spin size="small"/>}核销</a>
				</Popconfirm> : <Text key="delete" disabled>核销</Text>
			]
		}
	})
	console.log(tableColumns.length)
	return (
		<PageHeaderWrapper title={<FormattedMessage id="menu.marketing-center.write-off"/>}>
			<GridContent>
				{user.currentUserSchool.id && <WithTableName
					scroll={{ x: 'max-content' }}
					{...props}
					tableName={tableName}
					originColumns={tableColumns}
					columnSortable={false}
					needUpdate={tableNeedUpdate}
					setNeedUpdate={setTableNeedUpdate}
					formFields={searchFormFields}
					tableSearchParams={{
						schoolId: user.currentUserSchool.id
					}}
				/>}
			</GridContent>
		</PageHeaderWrapper>
	);
}
export default connect( (
	{
		[ tableName ]: data,
		loading,
		global,
		user
	}
) => (
	{
		[ tableName ]: data,
		loading,
		global,
		user
	}
) )( Form.create()( GroupViewModal ) );
