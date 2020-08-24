import React, { Fragment, useState, useEffect, useMemo, useCallback } from 'react';
import { connect } from "dva";
import { useEffectOnce, useToggle, } from 'react-use';
import { Card, Menu, Button, Form, Modal, Icon, Switch, message,Popconfirm, Typography, Spin, Tag, Dropdown } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import { getDictValue, queryDictionary } from '@/utils/dictionaryUtil';
import FIELDS from "@/config/fields";
const tableName = 'luckDrawGroup';
const { Text } = Typography;
import SignUpFormModal from '@/pages/Student/SignUp/SignUpFormModal';
import ConfirmModal from './ConfirmModal';
import { router } from 'umi';
import Buttons from '@/components/Buttons';
import { PRIZE_METHOD_LIST } from '@/contsant'


const GroupViewModal = props => {
	const { dispatch, visible,form, setVisible, data, loading, afterClose, selectItem, user, dictionary, submitLoading, readBaseInfoFromIDLoading} = props;
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );
	const [ getInfoLoadingId, setInfoLoadingId ] = useState( undefined );
	const getInfoLoading = loading.effects[ `${tableName}/closeGroup` ] || false;

	// 本校报名
	const [ dependCostConfig, setDependCostConfig ] = useState( [] );
	const [ studentInfo, setStudentInfo ] = useState( {} );
	const [ item, setItem ] = useState( {} );
	const [ signUpFormModalVisible, toggleSignUpFormModalVisible ] = useToggle( false );
	const [ confirmModalVisible, toggleConfirmModalVisible ] = useToggle( false );
	const cooperationUnits = dictionary[ FIELDS.STUDENT.COOPERATION_UNIT.dictionary ];
	const [ activityId, setActivityId ] = useState( undefined );
	const [ method, setMethod ] = useState( '1' );
	useEffect( () => {
		setMethod(selectItem.prizeMethod || '1')
	}, [ selectItem ] );
	
	useEffectOnce( () => {
		
		// 获取校外介绍人
		queryDictionary( dispatch, 'introducer_id' );
		queryDictionary( dispatch, 'colla_id' );
		// 获取教练
		queryDictionary( dispatch, 'employee_id' );
		// 获取增值服务
		queryDictionary( dispatch, FIELDS.STUDENT.VALUE_ADDED.dictionary );
		// 获取班型
		queryDictionary( dispatch, FIELDS.STUDENT.CLASS_ID.dictionary );

		// 获取挂靠费用
		dispatch( {
			type: 'student/getDependCost',
			payload: {
				params: {
					feeType: 'guakao',
				},
			}
		} ).then( dependCostConfig => {
			setDependCostConfig( dependCostConfig );
		} );
	} );

	const hexiaoSubmit = (id) => {
		setInfoLoadingId( id );
		dispatch( {
			type: `${tableName}/closeGroup`,
			payload: id
		} ).then( res => {
			if (res === null) {
				router.push('/student/sign-up')
			}
		} );
	};
	// 表格-字段
	let tableColumns = [...FIELDS.ACTIVITY.LCUK_DRAW_GROUP_TABLE_HEAD]
	const formFields = [...FIELDS.ACTIVITY.LCUK_DRAW_GROUP_SEARCH_FORM]
	const searchFormFields = useMemo( () => {
		return formFields.map( props => <WrapperComplexFormItem
			{...props}
			form={form}
		/> );
	}, [ form ] );
	tableColumns.push({
		title: '操作',
		key: 'group_action',
		width: 200,
		customRender: ( text, record, ) => {
			let status = record.status
			return <Buttons>
					{String( status ) === 'UNFINISHED' ?
					<a key="hex" onClick={() => {
						setActivityId(record.id)
						setStudentInfo({
							name: record.userName,
							mobile: record.phone,
							apply: {
								channel: 'activity'
							},
							finance: {
								discount: record.discountsMoney * 1,
								discountReason: record.configName
							}
						})
						toggleSignUpFormModalVisible(true)
					}}>{(getInfoLoadingId === record.id && getInfoLoading) && <Spin size="small"/>}核销</a>
					: '核销'}
					
					{String( record.signStatus ) === '0' && String( record.prizeStatus ) !== '1' ?
					<a key="sign" onClick={() => {
						let item = {...record}
						item.method = method
						setItem(item)
						toggleConfirmModalVisible(true)
					}}>签到</a> : '签到'}
					{String( record.signStatus ) === '0' && String( record.prizeStatus ) === '1' ?
					<a key="prizeStatus0" onClick={() => {
						setPrizeStatus(record)
					}}>设为有效</a> : String( record.signStatus ) === '0' && String( record.prizeStatus ) === '0' ?
						<a key="prizeStatus1" onClick={() => {
							setPrizeStatus(record)
						}}>设为无效</a> : '设为无效'
					}
			</Buttons>
		}
	})
	const setPrizeStatus = (record) => {
		Modal.confirm( {
			content: String(record.prizeStatus) === '0' ? <span>无效线索不能参加签到参加抽奖活动，线索管理不受影响</span> : <span>有效线索签到后将进入奖池参加抽奖活动</span>,
			title: `是否设为${String(record.prizeStatus) === '0' ? '无效' : '有效'}状态?`,
			okText: "确定",
			cancelText: "取消",
			onOk() {
				dispatch( {
					type: `${tableName}/setPrizeStatus`,
					payload: {
						dtlId: record.id,
						prizeStatus: String(record.prizeStatus) === '0' ? '1' : '0'
					   }
				} ).then(res => {
					setTableNeedUpdate(true)
				})
			},
		} )
	}
	const handleSubmit = useCallback( fieldsValue => {
		const aId = fieldsValue.params.activityId
		delete fieldsValue.params.activityId
		dispatch( {
			type: fieldsValue.params.id ? 'student/updateInfo' : 'student/saveInfo',
			payload: fieldsValue,
		} ).then( data => {
			if ( data !== false ) {
				toggleSignUpFormModalVisible( false )
				hexiaoSubmit(aId);
			}
		} );
	}, [] );
	const menu = record => (
		<Menu
			onClick={( { key } ) => {
				
				if (method !== key) {
					Modal.confirm( {
						title: `确定将开奖方式变更为【${key === '1' ? '驾校统一开奖' : '按员工批次开奖'}】吗？`,
						okText: "确定",
						cancelText: "取消",
						onOk() {
							setMethod(key)
						},
					} )
				}
			}}
		>
			{
				PRIZE_METHOD_LIST.map( ( { dKey, dValue } ) => (
					<Menu.Item key={dKey}>{dValue}</Menu.Item>
				) )
			}
		</Menu>
	);
	return (
		<Modal
			width="80%"
			title={typeof selectItem.configId === 'undefined' ? '活动签到' : "参加详情"}
			visible={visible}
			afterClose={afterClose}
			destroyOnClose
			onCancel={() => setVisible( false )}
			footer={null}
		>
			<WithTableName
				scroll={{ x: 'max-content' }}
				{...props}
				bodyStyle={{ padding: 0, }}
				tableName={tableName}
				originColumns={tableColumns}
				columnSortable={false}
				needUpdate={tableNeedUpdate}
				setNeedUpdate={setTableNeedUpdate}
				formFields={searchFormFields}
				tableSearchParams={{
					configId: selectItem.configId,
					docId:  selectItem.id,
					schoolId: user.currentUserSchool.id,
					type: "PRIZE"
				}}
				tableActions={[
					<div key="t">
						<span>当前开奖方式：<Tag>{method === '1' ? '驾校统一开奖' : '按员工批次开奖'}</Tag></span>
						<Dropdown key="confirm" overlay={menu( )}>
							<a> 更换开奖方式 <Icon type="down"/></a>
						</Dropdown>
					</div>
					]
				}
			/>
			<ConfirmModal
				data={item}
				visible={confirmModalVisible}
				setVisible={toggleConfirmModalVisible}
				user={user}
				signSubmit={(data) => {
					dispatch( {
						type: `${tableName}/signLuckDraw`,
						payload: data
					} ).then( res => {
						setTableNeedUpdate(true)
						toggleConfirmModalVisible(false)
					} );
				}}
			/>
			<SignUpFormModal
				dependCostConfig={dependCostConfig}
				// afterClose={() => setNeedUpdate( true )}
				setNeedUpdate={setTableNeedUpdate}
				handleSubmit={handleSubmit}
				data={studentInfo}
				studentType={'1'}
				dispatch={dispatch}
				dictionary={dictionary}
				loading={submitLoading}
				readBaseInfoFromIDLoading={readBaseInfoFromIDLoading}
				visible={signUpFormModalVisible}
				setVisible={toggleSignUpFormModalVisible}
				cooperationUnits={cooperationUnits}
				activityId={activityId}
				user={user}
				
			/>
			
		</Modal>
	);
}
export default connect( (
	{
		[ tableName ]: data,
		loading,
		global,
		user,
		dictionary
	}
) => (
	{
		[ tableName ]: data,
		loading,
		global,
		user,
		dictionary,
		readBaseInfoFromIDLoading: loading.effects[ 'student/IdentityInfo' ] || false,
		submitLoading: ( loading.effects[ 'student/saveInfo' ] || false ) || ( loading.effects[ 'student/updateInfo' ] || false ),
	}
) )( Form.create()( GroupViewModal ) );
