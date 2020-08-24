import React, { useState, Fragment, useEffect, useMemo } from 'react';
import { connect } from 'dva';
import { Menu, Button, Form, Modal, message } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import router from 'umi/router';
import FIELDS from '@/config/fields';
import AppointmentEditModal from './AppointmentEditModal';
import AppointmentUploadModal from './AppointmentUploadModal';
import AppointmentExportModal from './AppointmentExportModal';
import { useEffectOnce } from 'react-use/lib/index';
import Privilege from '@/components/Privilege';

import styles from './Exam.less';

const { Item } = Menu;

const tableName1 = 'examAppointment_1';
const tableName2 = 'examAppointment_2';
const tableName3 = 'examAppointment_3';

const Appointment = props => {
	const [ selectedRows, setSelectedRows ] = useState( [] );
	const getmenu = () => {
		return Object.keys( menuMap ).map( item => <Item key={item}>{menuMap[ item ].title}</Item> );
	};

	const { dispatch, form, loading, quickEntryParams } = props;
	const [ menuSelected, selectMenu ] = useState( '0' );
	// const [ tableName, setTableName ] = useState( menuMap[ 1 ].model );
	// const [ tableActions, setTableActions ] = useState( menuMap[ 0 ].tableActions );
	// const [ rowMenuItems, setRowMenuItems ] = useState( [ ...originRowMenuItems ] );
	const [ appointmentEditVisible, setAppointmentEditVisible ] = useState( false );
	const [ appointmentEditItem, setAppointmentFormItem ] = useState( {} );
	const [ appointmentUploadVisible, setAppointmentUploadVisible ] = useState( false );
	const [ appointmentUploadLoading, setAppointmentUploadLoading ] = useState( false );
	const [ appointmentExportVisible, setAppointmentExportVisible ] = useState( false );
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );
	// 表格-字段
	const originColumns = [
		// FIELDS.STUDENT.EXAM_ID,
		FIELDS.STUDENT.EXAM_STUDY_ID,
		FIELDS.STUDENT.IDCARD_NO,
		FIELDS.STUDENT.EXAM_COACH_ID,
		FIELDS.STUDENT.EXAM_KM,
		FIELDS.STUDENT.EXAM_CAR_TYPE,
		FIELDS.STUDENT.EXAM_APPOINT_DATE,
		FIELDS.STUDENT.EXAM_DATE,
		FIELDS.STUDENT.EXAM_TIME,
		FIELDS.STUDENT.EXAM_PLACE,
		FIELDS.STUDENT.MOBILE,
	];
	// 左侧菜单
	const menuMap = {
		0: {
			title: '约考中',
			privName: 'exam',
			tableName: tableName1,
			selectedRows: selectedRows,
			setSelectedRows: setSelectedRows,
			tableActions: [
				<Privilege privs={['export_exam']}  key="export">
					<Button
						key="export" icon="download" htmlType="button" type="primary"
						onClick={() => {
							setAppointmentExportVisible( true );
						}}
						// disabled={!selectedRows.length}
					>
						导出
					</Button>
				</Privilege>
				,
				<Privilege privs={['record_order_exam']} key="record_order_exam">
					<Button
						key="input" icon="edit" htmlType="button" type="primary"
						onClick={() => {
							setAppointmentFormItem( {} );
							setAppointmentEditVisible( true );
						}}
					>
						录入约考信息
					</Button></Privilege>,
				<Privilege privs={['import_exam_info']} key="import_exam_info">
				<Button
					key="import" icon="upload" htmlType="button" type="primary"
					onClick={() => setAppointmentUploadVisible( true )}
				>
					导入约考信息
				</Button></Privilege>,
				<Privilege privs={['order_exam_delete']}  key="order_exam_delete">
				<Button disabled={selectedRows.length ? false : true}
					key="delete" icon="delete" htmlType="button" type="primary" 
					onClick={() => {
						console.log(selectedRows.length)
						let names = selectedRows.map(one => one.name)
						let ids = selectedRows.map(one => one.id)
							Modal.confirm( {
								title: '确定要删除选中的约考信息吗？',
								okText: "确定",
								cancelText: "取消",
								onOk() {
									return deleteAllExamAppointment( {ids: ids.join(',')} );
								},
								onCancel() {
								},
							}) 
						}
					}
				>
					批量删除
				</Button></Privilege>,
				<Privilege privs={['download_templete']} key="download_templete">
				<Button
					key="download" icon="download" htmlType="button" type="default"
					onClick={() => router.push( '/user-center/template-download' )}
				>
					下载导入模板
				</Button></Privilege>,
			],
			originColumns: [
				{
					key: 'operation',
					title: '操作',
					customRender: ( text, record, index ) => 
					(<Privilege privs={[ 'order_exam_delete' ]} noMatch={'删除'}>
						<a key="delete" onClick={() => {
							Modal.confirm( {
								title: '确定要删除【' + record[ FIELDS.STUDENT.NAME.key ] + '】的这条约考信息吗？',
								okText: '确定',
								cancelText: '取消',
								onOk() {
									return deleteExamAppointment( record.id );
								},
								onCancel() {
								},
							} );
						}}>删除</a>
					</Privilege>),
				},
				{
					...FIELDS.STUDENT.NAME,
					customRender: ( text, record, index ) => 
					(<Privilege privs={[ 'order_exam_edit' ]} noMatch={text}>
						 <a onClick={e => {
							e.stopPropagation();
							setAppointmentFormItem( record );
							setAppointmentEditVisible( true );
						}}>{text}</a>
					</Privilege>),
				},
				...originColumns
			]
		},
		1: {
			title: '已考试',
			tableName: tableName2,
			privName: 'complete_exam',
			originColumns: [
				{
					key: 'operation',
					title: '操作',
					customRender: ( text, record, index ) => 
					(
					<Privilege privs={[ 'delete_complete_exam' ]} noMatch={'删除'}>
						<a key="delete" onClick={() => {
							Modal.confirm( {
								title: '确定要删除【' + record[ FIELDS.STUDENT.NAME.key ] + '】的这条约考信息吗？',
								okText: '确定',
								cancelText: '取消',
								onOk() {
									return deleteExamAppointment( record.id );
								},
								onCancel() {
								},
							} );
						}}>删除</a>
					</Privilege>
					),
				},
				{
					...FIELDS.STUDENT.NAME,
					customRender: ( text, record, index ) => 
					(
					<Privilege privs={[ 'edit_complete_exam' ]} noMatch={text}>
						 <a onClick={e => {
							e.stopPropagation();
							setAppointmentFormItem( record );
							setAppointmentEditVisible( true );
						}}>{text}</a>
					</Privilege>
					),
				},
				...originColumns
			]
		},
		2: {
			title: '异常数据',
			privName: 'exception_data_manage',
			tableName: tableName3,
			tableActions: [
				<Privilege privs={['exception_data_clean']}	key="exception_data_clean" >
				<Button
					key="delete" icon="delete" htmlType="button" type="primary"
					onClick={() => {
						Modal.confirm( {
							title: '清空异常数据',
							content: '确定要清空所有异常数据吗？',
							okText: '确定',
							cancelText: '取消',
							onOk() {
								return clearExamAppointmentOutliers();
							},
							onCancel() {
							},
						} );
					}}
				>
					清空异常数据
				</Button></Privilege>,
			],
			originColumns: [
				{
					key: 'operation',
					title: '操作',
					customRender: ( text, record, index ) => 
					(<Privilege privs={[ 'exception_data_delete' ]} noMatch={'删除'}>
						<a key="delete" onClick={() => {
							Modal.confirm( {
								title: '确定要删除【' + record[ FIELDS.STUDENT.NAME.key ] + '】的这条约考信息吗？',
								okText: '确定',
								cancelText: '取消',
								onOk() {
									return deleteExamAppointment( record.id );
								},
								onCancel() {
								},
							} );
						}}>删除</a>
					</Privilege>),
				},
				{
					...FIELDS.STUDENT.NAME,
					customRender: ( text, record, index ) => 
					(<Privilege privs={[ 'exception_data_edit' ]} noMatch={text}>
						<a onClick={e => {
							e.stopPropagation();
							setAppointmentFormItem( record );
							setAppointmentEditVisible( true );
						}}>{text}</a>	
					</Privilege>),
				},
				...originColumns
			]
		},
	};

	// 由快捷入口进入
	useEffectOnce( () => {
		if ( quickEntryParams === 'record' ) {
			setAppointmentFormItem( {} );
			setAppointmentEditVisible( true );
		} else if ( quickEntryParams === 'import' ) {
			setAppointmentUploadVisible( true );
		}
		dispatch( {
			type: 'quickEntryParams/clearParams',
		} );
	} );

	// 筛选表单-字段
	const formFields = [
		{
			config: FIELDS.STUDENT.EXAM_APPOINT_DATE_RANGE,
			col: 9,
		},
		{
			config: FIELDS.STUDENT.EXAM_DATE,
			col: 9,
		},
		{
			config: FIELDS.STUDENT.EXAM_CAR_TYPE,
		},
		{
			config: FIELDS.STUDENT.EXAM_KM,
		},
		{
			config: FIELDS.STUDENT.EXAM_COACH_ID,
		},
		{
			config: FIELDS.STUDENT.QUICK_SEARCH,
		},
	];

	const memoFormFields = useMemo( () => {
		return formFields.map( props => <WrapperComplexFormItem
			{...props}
			form={form}
		/> );
	}, [ form ] );

	const handleSelectMenu = key => {
		selectMenu( key );
		// setTableName( menuMap[ key ].tableName );
		// setTableActions( menuMap[ key ].tableActions );
	};
	// useEffect( () => {
	// 	setTableActions( menuMap[ menuSelected ].tableActions );
	// }, [ selectedRows.length ] );

	const saveExamAppointmentEdit = payload => {
		return dispatch( {
			type: 'studentExam/saveExamAppointmentEdit',
			payload,
		} ).finally( () => {
			setTableNeedUpdate( true );
		} );
	};
	const deleteExamAppointment = id => {
		return dispatch( {
			type: 'studentExam/deleteExamAppointment',
			payload: { id },
		} ).finally( () => {
			setTableNeedUpdate( true );
		} );
	};
	const clearExamAppointmentOutliers = payload => {
		return dispatch( {
			type: 'studentExam/clearExamAppointmentOutliers',
			payload,
		} ).finally( () => {
			setTableNeedUpdate( true );
		} );
	};
	const deleteAllExamAppointment = payload => {
		return dispatch( {
			type: 'studentExam/deleteAllExamAppointment',
			payload,
		} ).finally( () => {
			setTableNeedUpdate( true );
		} );
	};
	const exportExamAppointment = payload => {
		return dispatch( {
			type: 'studentExam/exportExamAppointment',
			payload,
		} ).then( data => {
			if ( data !== false ) {
				window.open( data );
			}
			return data;
		} );
	};

	return (
		<Fragment>
			<GridContent>
				<div className={styles.main}>
					<div className={styles.leftmenu}>
						<Menu mode="inline" onClick={e => handleSelectMenu( e.key )} selectedKeys={[ menuSelected ]}>
							{getmenu()}
						</Menu>
					</div>
					<div className={styles.right}>
						{Object.keys( menuMap ).map( menu => menuSelected === menu && <WithTableName
							key={menu}
							{...props}
							tableName={menuMap[ menu ].tableName}
							tableActions={menuMap[ menu ].tableActions}
							originColumns={menuMap[ menu ].originColumns}
							formFields={memoFormFields}
							columnSortable={false}
							selectedRows={menuMap[ menu ].selectedRows}
							setSelectedRows={menuMap[ menu ].setSelectedRows}
							scroll={{ x: 'max-content' }}
							needUpdate={tableNeedUpdate}
							setNeedUpdate={setTableNeedUpdate}
						/> )}
					</div>
				</div>
			</GridContent>

			<AppointmentEditModal
				selectedRow={appointmentEditItem}
				visible={appointmentEditVisible}
				setVisible={setAppointmentEditVisible}
				loading={loading.effects[ 'studentExam/saveExamAppointmentEdit' ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					saveExamAppointmentEdit( fieldsValue ).then( data => {
						if ( data !== false ) setAppointmentEditVisible( false );
					} );
				}}
			/>

			<AppointmentUploadModal
				visible={appointmentUploadVisible}
				setVisible={setAppointmentUploadVisible}
				loading={appointmentUploadLoading}
				onSubmit={() => {
					setAppointmentUploadLoading( false );
					setTableNeedUpdate( true );
				}}
			/>

			<AppointmentExportModal
				// selectedRows={selectedRows}
				visible={appointmentExportVisible}
				setVisible={setAppointmentExportVisible}
				loading={loading.effects[ 'studentExam/exportExamAppointment' ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					exportExamAppointment( fieldsValue ).then( data => {
						if ( data !== false ) setAppointmentExportVisible( false );
						return data;
					} );
				}}
			/>
		</Fragment>
	);
};

export default connect( (
	{
		[ tableName1 ]: data1,
		[ tableName2 ]: data2,
		[ tableName3 ]: data3,
		quickEntryParams,
		loading,
		global
	}
) => (
	{
		[ tableName1 ]: data1,
		[ tableName2 ]: data2,
		[ tableName3 ]: data3,
		quickEntryParams,
		loading,
		global,
	}
) )( Form.create()( Appointment ) );
