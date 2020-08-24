import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { useToggle, } from 'react-use';
import { connect } from "dva";
import { Spin, Card, Menu, Button, Form, Modal, Icon, message, Divider, Popconfirm, Typography } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
import getLocation from '@/utils/getLocation';
import { refreshDictionary } from "@/utils/dictionaryUtil";
import Search from 'antd/lib/input/Search';
import EditModal from './EditModal';
import AdjustModal from './AdjustModal';
import StatisticsModal from './StatisticsModal';
import ViewModal from './ViewModal';
import GroupViewModal from './GroupViewModal';
import Privilege from '@/components/Privilege';
const { Text, } = Typography;
import Buttons from '@/components/Buttons';

const tableName = 'bargain';

const Activity = props => {
	const { dispatch, form, loading, user } = props;
	const [ collaborateEditVisible, setCollaborateEditVisible ] = useState( false );
	const [ collaborateEditItem, setCollaborateEditItem ] = useState( {} );
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );

	const [ editModalVisible, toggleEditModalVisible ] = useToggle( false );
	const [ adjustModalVisible, toggleAdjustModalVisible ] = useToggle( false );
	const [ statisticsModalVisible, toggleStatisticsModalVisible ] = useToggle( false );
	const [ activityViewModalVisible, toggleActivityViewModalVisible ] = useToggle( false );
	const [ groupViewModalVisible, toggleGroupViewModalVisible ] = useToggle( false );
	const [ activityInfo, setActivityInfo ] = useState( {} );
	const [ doCopy, setDoCopy ] = useState( false );
	const [ getGetActivityInfoLoadingId, setGetActivityInfoLoadingId ] = useState( undefined );

	const saveLoading = loading.effects[ `${tableName}/saveActivity` ] || false;
	const getActivityInfoLoading = loading.effects[ `${tableName}/getActivityInfo` ] || false;
	const getAdjustLoading = loading.effects[ `${tableName}/activityAdjust` ] || false;
	const statusLoading = loading.effects[ `${tableName}/updAcitivityStatus` ] || false;
	const statisticsLoading = loading.effects[ `bargainStatistics/fetch` ] || false;
	const activityViewLoading = loading.effects[ `bargainView/fetch` ] || false;
	const groupLoading = loading.effects[ `bargainGroup/fetch` ] || false;
	const [ selectItem, setSelectItem ] = useState( {} );
	const [ loadingStatus, setLoadingStatus ] = useState( undefined );

	const getActivityInfo = ( id, type ) => cb => {
		setLoadingStatus( type )
		setGetActivityInfoLoadingId( id );
		dispatch( {
			type: `${tableName}/getActivityInfo`,
			payload: id,
		} ).then( activityInfo => {
			setActivityInfo( activityInfo );
			if ( cb ) cb();
		} );
	};
	// 修改状态
	const updateStatus = ( id, status, actionName ) => {
		setGetActivityInfoLoadingId( id );
		dispatch( {
			type: `${tableName}/updAcitivityStatus`,
			params: {
				id: id,
				operate: status
			},
			actionName: actionName
		} ).then( res => {
			if ( res === null ) {
				setTableNeedUpdate( true );
			}
		} );
	};
	const saveActivity = data => {
		let api = 'saveActivity'
		if ( typeof data.id !== 'undefined' ) {
			api = 'updActivity'
		}
		return dispatch( {
			type: `${tableName}/${api}`,
			payload: {
				...data
			},
		} ).then( res => {
			if ( typeof data.id === 'undefined' ) {
				dispatch( {
					type: 'activity/backToFirstPage',
				} );
			}
			if ( res === null ) {
				setTableNeedUpdate( true );
				toggleEditModalVisible( false );
			}
		} );
	};
	const activityAdjust = data => {
		dispatch( {
			type: `${tableName}/activityAdjust`,
			payload: {
				...data
			},
		} ).then( res => {
			if ( res === null ) {
				setTableNeedUpdate( true );
				toggleAdjustModalVisible( false );
			}
		} );
	};

	// 表格-字段
	const tableColumns = [ ...FIELDS.ACTIVITY.BARGAIN_TABLE_HEAD ]
	let tj_id = null;
	tableColumns.push( {
		title: '操作',
		key: 'actions',
		customRender: ( text, record, ) => {
			let status = record.status
			return <Buttons>
			<Privilege privs={[ 'publish_bargain' ]} key="publish_bargain0">
				{String( status ) === 'UNRELEASE' ?
					<Popconfirm
						key="delete"
						title="确定要发布该活动么？"
						onConfirm={() => {
							const { id } = record;
							updateStatus( id, 'RELEASE', '发布' );
						}}>
						<a>{( getGetActivityInfoLoadingId === record.id && statusLoading ) &&
						<Spin size="small"/>}发布</a>
					</Popconfirm> : <Text disabled>发布</Text>}
			</Privilege>
			
			<Privilege privs={[ 'edit_bargain' ]} key="edit_bargain1">
				{String( status ) === 'UNRELEASE' ?
					<a key="a2" onClick={e => {
						e.stopPropagation();
						if ( !getActivityInfoLoading ) {
							getActivityInfo( record.id )( () => {
								setDoCopy( false )
								toggleEditModalVisible( true )
							} );
						}
					}}
					> {( getGetActivityInfoLoadingId === record.id && getActivityInfoLoading && loadingStatus !== 'view' ) &&
					<Spin size="small"/>}编辑</a> : <Text disabled>编辑</Text>}
			</Privilege>
		
			<Privilege privs={[ 'cancel_bargain' ]} key="cancel_bargain">
				{String( status ) === 'WAITLINE' ?
					<Popconfirm
						key="delete"
						title="确定要撤销该活动么？"
						onConfirm={() => {
							const { id } = record;
							updateStatus( id, 'REVOKE', '撤销' );
						}}>
						<a>{( getGetActivityInfoLoadingId === record.id && statusLoading ) &&
						<Spin size="small"/>} 撤销</a>
					</Popconfirm> : <Text disabled>撤销</Text>}
			</Privilege>

			<Privilege privs={[ 'adjust_bargain' ]} key="adjust_bargain">
				{String( status ) === 'PROGRESS' || 	String( status ) === 'WAITLINE' ?
					<a key="a4" onClick={e => {
						e.stopPropagation();
						if ( !getActivityInfoLoading ) {
							getActivityInfo( record.id )( () => toggleAdjustModalVisible( true ) );
						}
					}}
					>{( getGetActivityInfoLoadingId === record.id && getActivityInfoLoading && loadingStatus !== 'view' ) &&
					<Spin size="small"/>}调整</a> : <Text disabled>调整</Text>}
			</Privilege>

			<Privilege privs={[ 'copy_bargain' ]} key="copy_bargain">
				{String( status ) === 'END' ?
					<a key="a5" onClick={e => {
						e.stopPropagation();
						if ( !getActivityInfoLoading ) {
							getActivityInfo( record.id )( () => {
								setDoCopy( true )
								toggleEditModalVisible( true )
							} );
						}
					}}
					> {( getGetActivityInfoLoadingId === record.id && getActivityInfoLoading && loadingStatus !== 'view' ) &&
					<Spin size="small"/>}复制</a> : <Text disabled>复制</Text>}
			</Privilege>

			<Privilege privs={[ 'end_bargain' ]} key="end_bargain">
			{String( status ) === 'PROGRESS' ?
				<Popconfirm
					key="delete"
					title="确定要结束该活动么？"
					onConfirm={() => {
						const { id } = record;
						updateStatus( id, 'FINISH', '结束' );
					}}>
					<a> 结束</a>
				</Popconfirm> : <Text disabled>结束</Text>}
			</Privilege>

			<Privilege privs={[ 'statistics_bargain' ]} key="statistics_bargain">
			{String( status ) === 'PROGRESS' || String( status ) === 'END' ?
				<a key="a7" onClick={e => {
					e.stopPropagation();
					setSelectItem( {
						configId: record.id
					} )
					toggleStatisticsModalVisible( true )
				}}
				>{( getGetActivityInfoLoadingId === record.id && statisticsLoading ) &&
				<Spin size="small"/>} 统计</a> : <Text disabled>统计</Text>
			}
			</Privilege>

			<Privilege privs={[ 'promotion_check_bargain' ]} key="promotion_check_bargain">
			{String( status ) === 'PROGRESS' || String( status ) === 'END' ?
				<a key="a8" onClick={e => {
					e.stopPropagation();
					setSelectItem( {
						id: record.id
					} )
					toggleGroupViewModalVisible( true )
				}}
				> {( getGetActivityInfoLoadingId === record.id && groupLoading ) &&
				<Spin size="small"/>} 活动核销</a> : <Text disabled>活动核销</Text>}
			</Privilege>

			<Privilege privs={[ 'activity_detail_bargain' ]} key="activity_detail_bargain">
				{
					<a key="a9" onClick={e => {
						e.stopPropagation();
						if ( !getActivityInfoLoading ) {
							setSelectItem( {
								id: record.id
							} )
							getActivityInfo( record.id, 'view' )( () => {
								toggleActivityViewModalVisible( true );
							} );
						}
					}}
					>{( getGetActivityInfoLoadingId === record.id && activityViewLoading ) && <Spin size="small"/>} 活动详情</a>
				}
			</Privilege>
		</Buttons>
		}
	} )

	// 操作按钮
	const tableActions = [
		<Privilege privs={['add_bargain']} key="add_bargain">
			<Button
				key="addBut" icon="plus-circle" htmlType="button" type="primary"
				onClick={() => {
					setActivityInfo( {} );
					toggleEditModalVisible( true )
				}}
			>
				新增活动
			</Button>		
		</Privilege>,
		<Privilege privs={['promotion_check_bargain']} key="promotion_check_bargain">
			<Button
				key="hexiaobut"  htmlType="button" type="primary"
				onClick={() => {
					setSelectItem( {} )
					toggleGroupViewModalVisible( true )
				}}
			>
				活动核销
			</Button>		
		</Privilege>
	];
	// 更多操作菜单
	const tableMenuItems = [];
	// 筛选表单-字段
	const [, ...tableFilterFields] = [...FIELDS.ACTIVITY.SEARCH_FORM]
	const searchFormFields = useMemo( () => {
		return tableFilterFields.map( props => <WrapperComplexFormItem
			{...props}
			form={form}
		/> );
	}, [ form ] );

	return (
		<div>
			<GridContent>
				{user.currentUserSchool.id && <WithTableName
					{...props}
					tableName={tableName}
					originColumns={tableColumns}
					formFields={searchFormFields}
					tableActions={tableActions}
					// selectedRows={selectedRows}
					// setSelectedRows={setSelectedRows}
					// rowMenuItems={tableMenuItems}
					// handleMenuClick={handleMenuClick}
					tableSearchParams={{
						schoolId: user.currentUserSchool.id
					}}
					columnSortable={false}
					scroll={{ x: 'max-content' }}
					needUpdate={tableNeedUpdate}
					setNeedUpdate={setTableNeedUpdate}
				/>}
			</GridContent>
			<EditModal
				afterClose={() => {
					dispatch( {
						type: `${tableName}/refresh`,
					} );
				}}
				doCopy={doCopy}
				user={user}
				handleSubmit={fieldsValue => saveActivity( fieldsValue )}
				loading={saveLoading}
				data={activityInfo}
				visible={editModalVisible}
				setVisible={toggleEditModalVisible}
			/>
			<AdjustModal
				afterClose={() => {
					dispatch( {
						type: `${tableName}/refresh`,
					} );
				}}
				handleSubmit={fieldsValue => activityAdjust( fieldsValue )}
				loading={getAdjustLoading}
				data={activityInfo}
				visible={adjustModalVisible}
				setVisible={toggleAdjustModalVisible}
			/>
			<StatisticsModal
				afterClose={() => {
					dispatch( {
						type: `${tableName}/refresh`,
					} );
				}}
				loading={getAdjustLoading}
				selectItem={selectItem}
				visible={statisticsModalVisible}
				setVisible={toggleStatisticsModalVisible}
			/>
			<ViewModal
				afterClose={() => {
					dispatch( {
						type: `${tableName}/refresh`,
					} );
				}}
				loading={getAdjustLoading}
				data={activityInfo}
				selectItem={selectItem}
				visible={activityViewModalVisible}
				setVisible={toggleActivityViewModalVisible}
			/>
			<GroupViewModal
				afterClose={() => {
					dispatch( {
						type: `${tableName}/refresh`,
					} );
				}}
				selectItem={selectItem}
				data={activityInfo}
				visible={groupViewModalVisible}
				setVisible={toggleGroupViewModalVisible}
			/>
		</div>
	);
};

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
) )( Form.create()( Activity ) );