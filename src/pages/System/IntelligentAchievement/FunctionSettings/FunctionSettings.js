import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { connect } from "dva";
import { Button, Form, Card, Switch, Radio, message, Input, Row, Col, Spin, Checkbox, Popconfirm } from 'antd';
import FIELDS from "@/config/fields";
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import Privilege from '@/components/Privilege';
import Buttons from '@/components/Buttons';

const { TextArea } = Input;

const tableName = 'functionSettings';

const Status = props => {
	const { dispatch, form, loading } = props;
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );
	const [ getGetInfoLoadingId, setGetInfoLoadingId ] = useState( undefined );

	const { getFieldDecorator } = form;
	// 操作按钮
	const tableActions = [
		// <Privilege privs={['add_group_buy']} key="add_group_buy">
			<Button
				key="addBut" icon="plus-circle" htmlType="button" type="primary"
				onClick={() => {
					// setActivityInfo( {} );
					// toggleEditModalVisible( true )
				}}
			>
				添加机构
			</Button>		
		// </Privilege>
	];
	const tableColumns = [
		FIELDS.SYSTEM.FUNCTION_SETTINGS.DEPART_ID_SCHOOL,
		FIELDS.SYSTEM.FUNCTION_SETTINGS.USERNAME_122,
		FIELDS.SYSTEM.FUNCTION_SETTINGS.PWD_122,
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record, ) => {
				let status = record.status
				return <Buttons>
	
					{/* <Privilege privs={[ 'edit_group_buy' ]} key="edit_group_buy"> */}
							<a key="a2" onClick={e => {
								// e.stopPropagation();
								// if ( !getActivityInfoLoading ) {
								// 	getActivityInfo( record.id )( () => {
								// 		setDoCopy( false )
								// 		toggleEditModalVisible( true )
								// 	} );
								// }
							}}
							> {( getGetInfoLoadingId === record.id && getGetInfoLoadingId && loadingStatus !== 'view' ) &&
							<Spin size="small"/>}编辑</a>
					{/* </Privilege> */}
	
					{/* <Privilege privs={[ 'cancel_group_buy' ]} key="cancel_group_buy"> */}
						<Popconfirm
							key="delete"
							title="确定要撤销该活动么？"
							onConfirm={() => {
								const { id } = record;
								updateStatus( id, 'REVOKE', '撤销' );
							}}>
							<a>{( getGetActivityInfoLoadingId === record.id && statusLoading ) &&
							<Spin size="small"/>} 删除</a>
						</Popconfirm> 
					{/* </Privilege> */}
				</Buttons>
			}
		}
	]
	return (
		<Row gutter={10}>
			<Col span={12}>
				<Card title="成绩智能化导入功能使用协议" style={{height: '620px'}}>
					<Form>
						<div style={{textAlign: 'center', fontSize: '14px', marginBottom: '20px'}}>
							成绩智能化导入功能，旨在帮助驾校更高效的管理学员约考和成绩<br/>
							开启前请认真阅读并同意“成绩智能化导入功能使用协议”
						</div>
						<Form.Item>
							{getFieldDecorator( 'text' )(
								<TextArea readOnly autosize={{ minRows: 15}}/>
							)}
						</Form.Item>
						<Form.Item>
							{getFieldDecorator( 'checkbox' )(
								<Checkbox>我已阅读并同意上述协议</Checkbox>
							)}
						</Form.Item>
						<div style={{textAlign: 'center'}}> 
							<Button type="primary">确认开启</Button>
						</div>
						
					</Form>
				</Card>
			</Col>
			<Col span={12} >
				<Card title="设置122账号密码" style={{height: '620px'}}
				 extra={tableActions}
				>
					<GridContent>
						{<WithTableName
							{...props}
							tableName={tableName}
							originColumns={tableColumns}
							columnSortable={false}
							scroll={{ x: 'max-content' }}
							needUpdate={tableNeedUpdate}
							setNeedUpdate={setTableNeedUpdate}
						/>}
					</GridContent>
				</Card>
			</Col>
		</Row>
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
) )( Form.create()( Status ) );