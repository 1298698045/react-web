import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { useEffectOnce, useToggle, } from 'react-use';
import { connect } from "dva";
import { Spin, Card, Menu, Button, Form, Modal, Icon, message, Divider, Popconfirm,Typography, Tooltip } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
import getLocation from '@/utils/getLocation';
import { refreshDictionary, queryDictionary } from "@/utils/dictionaryUtil";
import Search from 'antd/lib/input/Search';
import EditModal from './EditModal';
import AdjustModal from './AdjustModal';
import StatisticsModal from './StatisticsModal';
import ViewModal from './ViewModal';
import GroupViewModal from './GroupViewModal';
import OpenLuckModal from './OpenLuckModal';
import Privilege from '@/components/Privilege';
import Buttons from '@/components/Buttons';
const { Text, } = Typography;
const tableName = 'luckDraw';

const LuckDraw = props => {
	const { dispatch, form, loading, user } = props;
	const [ collaborateEditVisible, setCollaborateEditVisible ] = useState( false );
	const [ collaborateEditItem, setCollaborateEditItem ] = useState( {} );
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );
	const [ selectedRows, setSelectedRows ] = useState( [] );

	const [ editModalVisible, toggleEditModalVisible ] = useToggle( false );
	const [ adjustModalVisible, toggleAdjustModalVisible ] = useToggle( false );
	const [ statisticsModalVisible, toggleStatisticsModalVisible ] = useToggle( false );
	const [ activityViewModalVisible, toggleActivityViewModalVisible ] = useToggle( false );
	const [ groupViewModalVisible, toggleGroupViewModalVisible ] = useToggle( false );
	const [ openLuckModalVisible, toggleOpenLuckModalVisible ] = useToggle( false );
	const [ activityInfo, setActivityInfo ] = useState( {} );
	const [ doCopy, setDoCopy ] = useState( false );
	const [ getGetActivityInfoLoadingId, setGetActivityInfoLoadingId ] = useState( undefined );

	const saveLoading = loading.effects[ `${tableName}/saveActivity` ] || false;
	const getActivityInfoLoading = loading.effects[ `${tableName}/getActivityInfo` ] || false;
	const getAdjustLoading = loading.effects[ `${tableName}/activityAdjust` ] || false;
	const statusLoading = loading.effects[ `${tableName}/updAcitivityStatus` ] || false;
	const statisticsLoading = loading.effects[ `assembleStatistics/fetch` ] || false;
	const activityViewLoading = loading.effects[ `assembleView/fetch` ] || false;
	const groupLoading = loading.effects[ `group/fetch` ] || false;
	const [ selectItem, setSelectItem ] = useState( {} );
	const [ loadingStatus, setLoadingStatus ] = useState( undefined );

	useEffectOnce( () => {
		// 获取教练
		queryDictionary( dispatch, 'employee_id' );
	} );
	const getActivityInfo = ( id, type ) => cb => {
		setLoadingStatus( type )
		setGetActivityInfoLoadingId( id );
		dispatch( {
			type: `${tableName}/getActivityInfo`,
			payload: id,
		} ).then( activityInfo => {
			if (type === 'copy') {
				delete activityInfo.id
				delete activityInfo.startTime
				delete activityInfo.endTime
				delete activityInfo.prizeLotteryTime
			}
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
	const tableColumns = [ ...FIELDS.ACTIVITY.LCUK_DRAW_TABLE_HEAD ]
	let tj_id = null;
	tableColumns.push( {
		title: '操作',
		key: 'actions',
		// fixed: 'right',
		// width: 350,
		customRender: ( text, record, ) => {
			let status = record.status
			return <Buttons>
				<Privilege privs={[ 'activity_prize_publish' ]} key="activity_prize_publish">
					{
						String( status ) === 'UNRELEASE' ?
						<Popconfirm
							key="delete"
							title="确定要发布该活动么？"
							onConfirm={() => {
								const { id } = record;
								updateStatus( id, 'RELEASE', '发布' );
							}}>
							<a>{( getGetActivityInfoLoadingId === record.id && statusLoading ) &&
							<Spin size="small"/>}发布</a>
						</Popconfirm> : <Text disabled>发布</Text>
					}
				</Privilege>

				<Privilege privs={[ 'activity_prize_edit' ]} key="activity_prize_edit">
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
						<Spin size="small"/>}编辑</a> :  <Text disabled>编辑</Text>}
				</Privilege>

				<Privilege privs={[ 'activity_prize_cancel' ]} key="activity_prize_cancel">
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

				<Privilege privs={[ 'activity_prize_adjust' ]} key="activity_prize_adjust">
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
				
				<Privilege privs={[ 'activity_prize_copy' ]} key="activity_prize_copy">
					{String( status ) === 'END' ?
						<a key="a5" onClick={e => {
							e.stopPropagation();
							if ( !getActivityInfoLoading ) {
								getActivityInfo( record.id, 'copy' )( () => {
									setDoCopy( true )
									toggleEditModalVisible( true )
								} );
							}
						}}
						> {( getGetActivityInfoLoadingId === record.id && getActivityInfoLoading && loadingStatus !== 'view' ) &&
						<Spin size="small"/>}复制</a> : <Text disabled>复制</Text>
					}
				</Privilege>

				<Privilege privs={[ 'activity_prize_end' ]} key="activity_prize_end">
					{String( status ) === 'PROGRESS' ?
						<Popconfirm
							key="delete"
							title="确定要结束该活动么？"
							onConfirm={() => {
								const { id } = record;
								updateStatus( id, 'FINISH', '结束' );
							}}>
							<a> 结束</a>
						</Popconfirm> : <Text disabled>结束</Text>
					}
				</Privilege>

				<Privilege privs={[ 'activity_prize_statistics' ]} key="activity_prize_statistics">
					{String( status ) === 'PROGRESS' || String( status ) === 'END' ?
						<a key="a7" onClick={e => {
							e.stopPropagation();
							setSelectItem( {
								configId: record.id
							} )
							toggleStatisticsModalVisible( true )
						}}
						>{( getGetActivityInfoLoadingId === record.id && statisticsLoading ) &&
						<Spin size="small"/>} 统计</a> : <Text disabled>统计</Text>}
				</Privilege>

				<Privilege privs={[ 'activity_prize_join_detail' ]} key="activity_prize_join_detail">
					{String( status ) === 'PROGRESS' || String( status ) === 'END' ?
						<a key="a8" onClick={e => {
							e.stopPropagation();
							let r = {
								configId: record.id,
								prizeMethod: record.prizeMethod
							}
							setSelectItem( r )
							toggleGroupViewModalVisible( true )
						}}
						> {( getGetActivityInfoLoadingId === record.id && groupLoading ) &&
						<Spin size="small"/>} 参加详情</a> : <Text disabled>参加详情</Text>}
				</Privilege>
				
				<Privilege privs={[ 'activity_prize_activity_detail' ]} key="activity_prize_activity_detail">
					{<a key="a9" onClick={e => {
						e.stopPropagation();
						if ( !getActivityInfoLoading ) {
							getActivityInfo( record.id, 'view' )( () => {
								toggleActivityViewModalVisible( true );
							} );
						}
					}}
					>{( getGetActivityInfoLoadingId === record.id && activityViewLoading ) && <Spin size="small"/>} 活动详情</a>}
				</Privilege>
			</Buttons>
		}
	} )

	// 操作按钮
	const tableActions = [
		<Privilege privs={['activity_prize_add']} key="activity_prize_add">
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
		<Privilege privs={['activity_prize_sign']} key="activity_prize_sign">
			<Button
				key="hexiaobut"  htmlType="button" type="primary"
				onClick={() => {
					setSelectItem( {} )
					toggleGroupViewModalVisible( true )
				}}
			>
				活动签到
			</Button>		
		</Privilege>,
		<Privilege privs={['activity_prize_pool']} key="activity_prize_pool">
			<Button
				disabled={selectedRows.length ? false : true}
				key="open"  htmlType="button" type="primary"
				onClick={() => {
					setSelectItem( {} )
					console.log(selectedRows)
					toggleOpenLuckModalVisible( true )
				}}
			>
				开奖奖池
			</Button>		
		</Privilege>
	];
	// 更多操作菜单
	const tableMenuItems = [];
	// 筛选表单-字段
	const tableFilterFields = [...FIELDS.ACTIVITY.LUCK_DRAW_SEARCH_FORM]
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
						schoolId: user.currentUserSchool.id,
						type: 'PRIZE'
					}}
					columnSortable={false}
					scroll={{ x: 'max-content' }}
					needUpdate={tableNeedUpdate}
					setNeedUpdate={setTableNeedUpdate}
					multipleSelection={false}
					selectedRows={selectedRows}
					setSelectedRows={setSelectedRows}
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
			<OpenLuckModal
				afterClose={() => {
					dispatch( {
						type: `${tableName}/refresh`,
					} );
				}}
				selectItem={selectedRows[0]}
				visible={openLuckModalVisible}
				setVisible={toggleOpenLuckModalVisible}
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
) )( Form.create()( LuckDraw ) );