import React, { Fragment, useState, useEffect, useMemo, useCallback } from 'react';
import { connect } from "dva";
import { Form, Modal, Col, Row, Card, Upload, Button, message, Collapse, Spin, Popconfirm, Typography,Divider  } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
const tableName = 'bargainView';
import useGetInitialValue from '@/hooks/useGetInitialValue';
import GroupViewModal from './GroupViewModal';
import HelpModal from './HelpModal';


import SignUpFormModal from '@/pages/Student/SignUp/SignUpFormModal';
import { getDictValue, queryDictionary } from '@/utils/dictionaryUtil';
import { useEffectOnce, useToggle, } from 'react-use';
import { router } from 'umi';

const { Text } = Typography;

const { Panel } = Collapse;
const ActivityViewModal = props => {
	const ACTIVITY =  FIELDS.ACTIVITY
	const { dispatch, visible,form, setVisible, data, loading, afterClose, selectItem, user, dictionary, submitLoading, readBaseInfoFromIDLoading} = props;
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );
	const [ activityView, setActivityView] = useState( {} );
	const [ groupViewModalVisible,toggleGroupViewModalVisible ] = useToggle( false );
	const [ getInfoLoadingId, setInfoLoadingId ] = useState( undefined );
	const getInfoLoading = loading.effects[ `bargainGroup/closeBargain` ] || false;

	const getHelpLoading = loading.effects[ `bargainHelp/fetch` ] || false;
	const [ helpModalVisible, toggleHelpModalVisible ] = useToggle( false );
	const [ selectInfo, setSelectInfo ] = useState( {} );
	
	// 本校报名
	const [ dependCostConfig, setDependCostConfig ] = useState( [] );
	const [ studentInfo, setStudentInfo ] = useState( {} );
	const [ signUpFormModalVisible, toggleSignUpFormModalVisible ] = useToggle( false );
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

	// 表格-字段
	let tableColumns = [...FIELDS.ACTIVITY.BARGAIN_VIEW_TABLE_HEAD]
	const formFields = [FIELDS.ACTIVITY.COMMON_SEARCH_FORM.EMPLOYEE_NAME, FIELDS.ACTIVITY.COMMON_SEARCH_FORM.PHONE]
	const searchFormFields = useMemo( () => {
		return formFields.map( props => <WrapperComplexFormItem
			{...props}
			form={form}
		/> );
	}, [ form ] );
	let FORM = FIELDS.ACTIVITY.FORM
	const getValue = useGetInitialValue( data );
	tableColumns.push({
		title: '操作',
		key: 'group_action',
		customRender: ( text, record, ) => {
			let status = record.status
			return [
				String( status ) === 'UNFINISHED' ?
				<a key="hex" onClick={() => {
					setActivityId(record.id)
					setStudentInfo({
						name: record.studentName,
						mobile: record.studentPhone,
						apply: {
							channel: 'activity'
						},
						finance: {
							discount: record.hagglePrice * 1,
							discountReason: record.groupName
						}
					})
					toggleSignUpFormModalVisible(true)
				}}>{(getInfoLoadingId === record.id && getInfoLoading) && <Spin size="small"/>}核销</a> : <Text key="hexiao" disabled>核销</Text>,
				<Divider key="divider0" type="vertical"/>,
				<a key="a7" onClick={e => {
					e.stopPropagation();
					setSelectInfo( {
						id: record.id,
						activityName: getValue(FORM.NAME)
					} )
					toggleHelpModalVisible( true )
				}}
				>{(getInfoLoadingId === record.id && getHelpLoading) && <Spin size="small"/>} 帮砍详情 </a>,
			]
		}
	})
	const hexiaoSubmit = id => {
		setInfoLoadingId( id );
		dispatch( {
			type: `bargainGroup/closeBargain`,
			payload: id
		} ).then( res => {
			if (res === null) {
				router.push('/student/sign-up')
				// setTableNeedUpdate(true)
			}
		} );
	};
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
			title="活动详情"
			visible={visible}
			afterClose={afterClose}
			destroyOnClose
			onCancel={() => setVisible( false )}
			footer={null}
		>
			<Card title='活动详情' style={{marginBottom: '20px'}}>
				<Form>
					<Row gutter={{ xs: 8, sm: 16, md: 20, }}>	
						<Col md={6} sm={24} >
							<Form.Item label={FORM.NAME.title} style={{display: 'flex'}}>
								<span className="ant-form-text">{getValue(FORM.NAME)}</span>
							</Form.Item>
						</Col>
						<Col md={6} sm={24}>
							<Form.Item label={FORM.PRICE.title} style={{display: 'flex'}}>
							<span className="ant-form-text">{getValue(FORM.PRICE)}元</span>
							</Form.Item>
						</Col>
						<Col md={6} sm={24}>
							<Form.Item label={FORM.LOWEST_PRICE.title} style={{display: 'flex'}}>
							<span className="ant-form-text">{getValue(FORM.LOWEST_PRICE)}元</span>
							</Form.Item>
						</Col>
						<Col md={6} sm={24}>
							<Form.Item label={FORM.VALID_TIME.title} style={{display: 'flex'}}>
							<span className="ant-form-text">{getValue(FORM.VALID_TIME)}小时</span>
							</Form.Item>
						</Col>
						<Col md={6} sm={24}>
							<Form.Item label={FORM.LOWEST_PRICE_NUM.title} style={{display: 'flex'}}>
							<span className="ant-form-text">{getValue(FORM.LOWEST_PRICE_NUM)}次</span>
							</Form.Item>
						</Col>
						<Col md={6} sm={24}>
							<Form.Item label={FORM.BEGIN_DATE.title} style={{display: 'flex'}}>
							<span className="ant-form-text">{getValue(FORM.BEGIN_DATE)}</span>
							</Form.Item>
						</Col>
						<Col md={6} sm={24}>
							<Form.Item label={FORM.END_DATE.title} style={{display: 'flex'}}>
							<span className="ant-form-text">{getValue(FORM.END_DATE)}</span>
							</Form.Item>
						</Col>
					</Row>
					<Collapse>
						<Panel header="活动说明">
							<p dangerouslySetInnerHTML={{__html:getValue(FORM.PROFILE)}}></p>
						</Panel>
					</Collapse>
				</Form>
			</Card>
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
					id: selectItem.id,
					schoolId: user.currentUserSchool.id
				}}
			/>
			<HelpModal
				selectInfo={selectInfo}
				visible={helpModalVisible}
				setVisible={toggleHelpModalVisible}
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
		dictionary,
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
) )( Form.create()( ActivityViewModal ) );
