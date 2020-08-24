import React, { Fragment, useState, useEffect, useMemo, useCallback } from 'react';
import { connect } from "dva";
import { Card, Menu, Button, Form, Modal, Icon, Switch, message, Popconfirm, Typography, Spin } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";


import SignUpFormModal from '@/pages/Student/SignUp/SignUpFormModal';
import { getDictValue, queryDictionary } from '@/utils/dictionaryUtil';
import { useEffectOnce, useToggle, } from 'react-use';
import { router } from 'umi';

const tableName = 'bargainGroup';
const { Text } = Typography;

const GroupViewModal = props => {
	const { dispatch, visible,form, setVisible, data, loading, afterClose, selectItem, user, dictionary, submitLoading, readBaseInfoFromIDLoading} = props;
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );
	const [ getInfoLoadingId, setInfoLoadingId ] = useState( undefined );
	const getInfoLoading = loading.effects[ `${tableName}/closeBargain` ] || false;
	
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
	const hexiaoSubmit = id => {
		setInfoLoadingId( id );
		dispatch( {
			type: `${tableName}/closeBargain`,
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
	// 表格-字段
	let tableColumns = [...FIELDS.ACTIVITY.BARGAIN_VIEW_TABLE_HEAD]
	const formFields = [FIELDS.ACTIVITY.COMMON_SEARCH_FORM.PHONE]
	const searchFormFields = useMemo( () => {
		return formFields.map( props => <WrapperComplexFormItem
			{...props}
			form={form}
		/> );
	}, [ form ] );
	tableColumns.push({
		title: '操作',
		key: 'group_action',
		width: 100,
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
			]
		}
	})

	return (
		<Modal
			width="80%"
			title="活动核销"
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
					id: selectItem.id,
					schoolId: user.currentUserSchool.id
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
