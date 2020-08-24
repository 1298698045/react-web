import React, { useState, useMemo, } from 'react';
import { connect } from 'dva';
import {
	Form,
	Button,
	Tabs,
	Card,
	Modal,
} from 'antd';
import ChangeDepartModal from './ChangeDepartModal';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import { useToggle, useEffectOnce } from 'react-use';
import SignUpMemoModal from '@/pages/Student/SignUp/SignUpMemoModal';
import Privilege from '@/components/Privilege';

const { TabPane } = Tabs;

const tableName1 = 'studentStudyingHelpList';
const tableName2 = 'studentFinishHelpList';

const Help = props => {
	const { form, dispatch, loading, memoLoading,dictionary, quickEntryParams } = props;
	const [ changeDepartModalVisible, setChangeDepartModalVisible ] = useState( false );
	const [ finishDepartModalVisible, setFinishDepartModalVisible ] = useState( false );
	const [ selectedRows, setSelectedRows ] = useState( [] );
	const [ tabKey, setTabKey ] = useState( '-1' );
	const [ studentInfo, setStudentInfo ] = useState( {} );
	const [ needUpdate, setNeedUpdate ] = useToggle( false );
	const [ currentRecord, setCurrentRecord ] = useState( {} );
	const [ signUpMemoModalVisible, toggleSignUpMemoModalVisible ] = useToggle( false );
	const [ tableSearchParams, setTableSearchParams ] = useState( {} );
	useEffectOnce( () => {
		if (quickEntryParams) {
			setTableSearchParams(quickEntryParams)
		}
		setTabKey(quickEntryParams.tabKey || '0')
		dispatch( {
			type: 'quickEntryParams/clearParams',
		} );
	}, [ dispatch ] );
	const originColumns0 = [
		{
			title: '序号',
			key: 'key',
		},
		{
			title: '委培开始日期',
			key: 'createTime',
		},
		FIELDS.STUDENT.NAME,
		FIELDS.STUDENT.GENDER,
		FIELDS.STUDENT.MOBILE,
		FIELDS.STUDENT.DEPART_ID,
		{
			title: '外协机构',
			key: 'cooperationUnitName',
		},
		{
			...FIELDS.STUDENT.KM,
			title: '委培科目',
		},
		FIELDS.STUDENT.LICENSE_TYPE,
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record, ) => {
				return <Privilege privs={[ 'memo_entrust' ]} noMatch={text}>
				<a
					key="memo"
					onClick={() => {
						setCurrentRecord( record );
						toggleSignUpMemoModalVisible( true );
					}}
				>备注</a></Privilege>
			}
		},
	];
	
	const originColumns1 = [
		{
			title: '序号',
			key: 'key',
		},
		{
			title: '委培开始日期',
			key: 'createTime',
		},
		FIELDS.STUDENT.NAME,
		FIELDS.STUDENT.GENDER,
		FIELDS.STUDENT.MOBILE,
		FIELDS.STUDENT.DEPART_ID,
		{
			title: '外协机构',
			key: 'cooperationUnitName',
		},
		{
			...FIELDS.STUDENT.KM,
			title: '委培科目',
		},
		FIELDS.STUDENT.LICENSE_TYPE,
		{
			title: '委培结束日期',
			key: 'endTime',
			customRender: text => {
				return text || '暂无';
			}
		},
		FIELDS.STUDENT.END_TYPE,
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record, ) => {
				return <Privilege privs={[ 'memo_entrusted' ]} noMatch={text}><a
					key="memo"
					onClick={() => {
						setCurrentRecord( record );
						toggleSignUpMemoModalVisible( true );
					}}
				>备注</a></Privilege>
			}
		},
	];
	
	const fields = [
		FIELDS.STUDENT.QUICK_SEARCH,
		{
			...FIELDS.STUDENT.DEPART_ID_SCHOOL,
			initialValue: tableSearchParams.departId || undefined
		},
		FIELDS.STUDENT.COOPERATION_UNIT,
		{
			...FIELDS.STUDENT.LICENSE_TYPE_ACTIVE,
			initialValue: tableSearchParams.licenseType || undefined
		},
		{
			...FIELDS.STUDENT.KM,
			values: [ {
				dKey: 'km2',
				dValue: '科目二',
			}, {
				dKey: 'km3',
				dValue: '科目三',
			} ]
		},
	];
	
	const formFields = useMemo( () => {
		return fields.map( f => (
			<WrapperComplexFormItem
				config={f}
				form={form}
				values={f.values}
			/>
		) );
	}, [ form ] );
	
	const tableActions = [
		<Privilege privs={['change_cooperation_unit']} key="change_cooperation_unit">
		<Button disabled={selectedRows.length === 0}
		        key="change-button"
		        icon="form"
		        htmlType="button"
		        type="primary"
		        onClick={() => {
			        setStudentInfo( selectedRows );
			        setChangeDepartModalVisible( true );
		        }}>更换外协机构</Button></Privilege>,
		<Privilege privs={['stop_entrust']} key="stop_entrust">
		<Button key="finish-button" disabled={selectedRows.length === 0} icon="edit" htmlType="button" type="primary"
		        onClick={() => setFinishDepartModalVisible( true )}>委培结束</Button></Privilege>,
	];
	
	const changeDepartLoading = loading.effects[ 'student/changeEntrust' ] || false;
	const finishEntrustLoading = loading.effects[ 'student/finishEntrust' ] || false;
	
	// 保存备注
	const saveMemo = ( { studentId, memo, } ) => {
		dispatch( {
			type: 'student/saveMemo',
			payload: {
				params: {
					studentId,
					memo,
				}
			},
		} ).then( data => {
			if ( data !== false ) {
				toggleSignUpMemoModalVisible( false );
			}
		} );
	};
	const cooperationUnits = dictionary[ FIELDS.STUDENT.COOPERATION_UNIT.dictionary ];

	return (
		<Card bodyStyle={
			{ paddingLeft: 0, paddingRight: 0, }
		}>
			<Tabs tabPosition="left" defaultActiveKey="0" activeKey={tabKey} onChange={e => {
				setTabKey( e );
				form.resetFields();
			}}>
				<TabPane tab="进行中" key="0" style={{ paddingRight: 24, }}>
					{
						tabKey === '0' && (
							<WithTableName
								{...props}
								tableActions={tableActions}
								bodyStyle={{ padding: 0, }}
								tableName={tableName1}
								needUpdate={needUpdate}
								multipleSelection={false}
								setNeedUpdate={setNeedUpdate}
								selectedRows={selectedRows}
								setSelectedRows={setSelectedRows}
								originColumns={originColumns0}
								scroll={{ x: 'max-content' }}
								formFields={formFields}
								handleFormReset={() => {
									setTableSearchParams({})
									setNeedUpdate(true)
								}}
							/>
						)
					}
				</TabPane>
				<TabPane tab="已结束" key="1" style={{ paddingRight: 24, }}>
					{
						tabKey === '1' && (
							<WithTableName
								{...props}
								bodyStyle={{ padding: 0, }}
								needUpdate={needUpdate}
								setNeedUpdate={setNeedUpdate}
								tableName={tableName2}
								originColumns={originColumns1}
								scroll={{ x: 'max-content' }}
								formFields={formFields}
								handleFormReset={() => {
									setTableSearchParams({})
									setNeedUpdate(true)
								}}
							/>
						)
					}
				</TabPane>
			</Tabs>
			<ChangeDepartModal
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true );
				}}
				form={form}
				handleSubmit={fieldsValue => {
					dispatch( {
						type: 'student/changeEntrust',
						payload: fieldsValue,
					} ).then( data => {
						if ( data !== false ) {
							setChangeDepartModalVisible( false );
						}
					} );
				}}
				cooperationUnits={cooperationUnits}
				visible={changeDepartModalVisible}
				setVisible={setChangeDepartModalVisible}
				selectedRows={studentInfo}
				loading={changeDepartLoading}
			/>
			<Modal
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true );
				}}
				closable={true}
				maskClosable={false}
				keyboard={false}
				title="提示"
				confirmLoading={finishEntrustLoading}
				onOk={() => {
					const { km, studentId } = selectedRows[ 0 ];
					dispatch( {
						type: 'student/finishEntrust',
						payload: {
							params: {
								studentId,
								km,
								entrustStatus: 2,
							}
						}
					} ).then( data => {
						if ( data !== false ) {
							setFinishDepartModalVisible( false )
						}
					} )
				}}
				onCancel={() => setFinishDepartModalVisible( false )}
				visible={finishDepartModalVisible}
				setVisible={setFinishDepartModalVisible}
			>
				{`是否确认${selectedRows.length === 1 && selectedRows[ 0 ][ FIELDS.STUDENT.NAME.key ]}委培结束？`}
			</Modal>
			<SignUpMemoModal
				data={currentRecord}
				handleSubmit={saveMemo}
				loading={memoLoading}
				visible={signUpMemoModalVisible}
				setVisible={toggleSignUpMemoModalVisible}
				setNeedUpdate={setNeedUpdate}
			/>
		</Card>
	);
};

export default connect( (
	{
		[ tableName1 ]: data1,
		[ tableName2 ]: data2,
		loading,
		global,
		dictionary,
		quickEntryParams
	}
) => (
	{
		[ tableName1 ]: data1,
		[ tableName2 ]: data2,
		memoLoading: loading.effects[ 'student/saveMemo' ] || false,
		loading,
		global,
		dictionary,
		quickEntryParams
	}
) )( Form.create()( Help ) );
