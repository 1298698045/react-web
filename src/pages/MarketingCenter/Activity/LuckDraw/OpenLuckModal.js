import React, { Fragment, useState, useEffect, useMemo, useCallback } from 'react';
import { connect } from "dva";
import { useEffectOnce, useToggle, } from 'react-use';
import { Card, Menu, Button, Form, Modal, Icon, Switch, message,Popconfirm, Typography, Spin, Tag, Dropdown,Row,Col } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import { getDictValue, queryDictionary } from '@/utils/dictionaryUtil';
import FIELDS from "@/config/fields";
const tableName = 'openLuckList';
const { Text } = Typography;
import SignUpFormModal from '@/pages/Student/SignUp/SignUpFormModal';
import OpenLuckDetailModal from './OpenLuckDetailModal';
import { router } from 'umi';
import Buttons from '@/components/Buttons';
import { PRIZE_METHOD_LIST, OPEN_PRIZE_METHOD_LIST, OPEN_PRIZE_STATUS_LIST } from '@/contsant'


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
	const [ infoModalVisible, toggleInfoModalVisible ] = useToggle( false );
	const cooperationUnits = dictionary[ FIELDS.STUDENT.COOPERATION_UNIT.dictionary ];
	const [ activityId, setActivityId ] = useState( undefined );
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
	let tableColumns =  [
		{ title: '序号', key: 'key',  align: 'center'},
		{ title: '活动名称', key: 'activityName'},
		{ title: '开奖方式', key: 'activityPrizeType', 
		customRender: ( text, record ) => {
			let strs = OPEN_PRIZE_METHOD_LIST.filter(one => one.dKey === text + '').map(one=>one.dValue).join(',')
			return strs;
		}},
		{ title: '归属', key: 'activityBelongTo', 
			customRender: ( text, record ) => {
				if (text === 0) {
					return '驾校'
				}
				return getDictValue( dictionary, 'employee_id', text )
			}
		},
		{ title: '活动开奖时间', key: 'prizeLotteryTime'},
		{ title: '完成开奖时间', key: 'activityPrizeComplateTime'},
		{ title: '奖池人数', key: 'poolSize'},
		{ title: '中奖人数', key: 'prizedCount'},
		{ title: '开奖状态', key: 'activityPrizeComplateStatus', 
		customRender: ( text, record ) => {
			let strs = OPEN_PRIZE_STATUS_LIST.filter(one => one.dKey ===  text + '').map(one=>one.dValue).join(',')
			return strs;
		}}
	]
	const formFields = [...FIELDS.ACTIVITY.OPEN_LCUK_SEARCH_FORM]
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
			let status = record.activityPrizeComplateStatus
			return <Buttons>
					{String( status ) === '0' ?
					<a key="hex" onClick={() => {
						Modal.confirm( {
							content: <Row>
								<Col span={17}>活动名称：{record.activityName}</Col>
								<Col span={6}>奖池人数：{record.poolSize}</Col>
								<Col span={24}>开奖方式：{record.activityPrizeType * 1 === 0 ? '驾校统一开奖' : '按员工批次开奖'}</Col>
							</Row>,
							title: `确定将开奖吗？`,
							okText: "确定",
							cancelText: "取消",
							onOk() {
								window.open(`/lottery?activityPrizeType=${record.activityPrizeType}&activityBelongTo=${record.activityBelongTo}&activityId=${record.activityId}&activityName=${record.activityName}`)
							},
						} )
					}}>{(getInfoLoadingId === record.id && getInfoLoading) && <Spin size="small"/>}开奖</a>
					: '开奖'}
					{ String( status ) === '0' ?
					<a key="complate" onClick={() => {
						Modal.confirm( {
							title: `确定要完成开奖吗？`,
							okText: "确定",
							cancelText: "取消",
							content: <Row>
								<Col span={17}>活动名称：{record.activityName}</Col>
								<Col span={7}>奖池人数：{record.poolSize}</Col>
								<Col span={17}>开奖方式：{record.activityPrizeType * 1 === 0 ? '驾校统一开奖' : '按员工批次开奖'}</Col>
								<Col span={7}>中奖人数：{record.prizedCount}</Col>
							</Row>,
							onOk() {
								dispatch( {
									type: `${tableName}/complateLuckDraw`,
									payload: { 
										activityId: String(record.activityId),
										activityPrizeType: String(record.activityPrizeType),
										activityBelongTo: String(record.activityBelongTo)
									}
								} ).then( res => {
									setTableNeedUpdate(true)
								} );
							},
						} )
					}}>完成</a> : '完成'} 
					<a key="sign" onClick={() => {
						setItem(record)
						toggleInfoModalVisible(true)
					}}>详情</a>
				
			</Buttons>
		}
	})
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

	return (
		<Modal
			width="80%"
			title={"开奖奖池"}
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
					activityId: selectItem ? selectItem.id : undefined
				}}
			/>
			<OpenLuckDetailModal
				data={item}
				visible={infoModalVisible}
				setVisible={toggleInfoModalVisible}
				dictionary={dictionary}
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
