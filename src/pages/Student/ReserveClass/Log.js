import React, { useState, useMemo, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Menu, Button, Form, Modal, Icon, message, Tag, Divider, Typography, Spin } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from '@/config/fields';
import LogMemoEditModal from "./LogMemoEditModal";
import { getDictValue } from "@/utils/dictionaryUtil";
import moment from 'moment';
import Privilege from '@/components/Privilege';

const tableName = 'studentLogList';

const Reserve = props => {
	const { dispatch, form, loading, reserve, dictionary } = props;
	const [ selectedRows, setSelectedRows ] = useState( [] );
	const [ logMemoEditVisible, setLogMemoEditVisible ] = useState( false );
	const [ logMemoEditItem, setLogMemoEditItem ] = useState( {} );
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );

	const completeCourse = ( params ) => {
		return dispatch( {
			type: `${tableName}/updateCourseRecord`,
			params,
		} ).then( () => {
			setTableNeedUpdate( true );
		} );
	};
	const cancelCourse = ( params ) => {
		return dispatch( {
			type: `${tableName}/cancelCourseRecord`,
			params,
		} ).then( () => {
			setTableNeedUpdate( true );
		} );
	};

	// 筛选表单-字段
	const tableFilterFields = [
		{
			config: FIELDS.TEACHING.COURSE.BOOK_DATE_RANGE,
			col: 9,
			initialValue: [ moment().subtract( 1, 'days' ), moment().add( 14, 'days' ) ],
		},
		{
			config: FIELDS.TEACHING.COURSE.BOOK_TIME_RANGE,
			col: 9,
		},
		{
			config: FIELDS.TEACHING.COURSE.LICENSE_TYPE_ACTIVE,
		},
		{
			config: FIELDS.TEACHING.COURSE.TEACH_KM,
			values: [
				{
					dKey: 'km2',
					dValue: '科目二',
				},
				{
					dKey: 'km3',
					dValue: '科目三',
				},
			],
		},
		{
			config: FIELDS.TEACHING.COURSE.LOGIC_STATUS,
		},
		// {
		// 	config: FIELDS.TEACHING.COURSE.SIGN_STATUS,
		// },
		// {
		// 	config: FIELDS.TEACHING.COURSE.CONFIRM_STATUS,
		// },
		// {
		// 	config: FIELDS.TEACHING.COURSE.RECORD_STATUS,
		// },
		{
			config: FIELDS.TEACHING.COURSE.SEARCH_COACH_ID,
		},
		{
			config: FIELDS.TEACHING.COURSE.QUICK_SEARCH2,
		},
		{
			config: FIELDS.TEACHING.COURSE.SITE_ID
		},
		{
			config: {...FIELDS.TEACHING.COURSE.START_TIME, title: '时段的开始时间'}
		},
		{
			config: {...FIELDS.TEACHING.COURSE.END_TIME, title: '时段的结束时间'}
		},
		{
			config: FIELDS.TEACHING.COURSE.DEPART_ID
		},
		{ config:FIELDS.EMPLOYEE.COACH_INFO.COURSE_ARRANGE },
	];
	const memoFilterFields = useMemo( () => {
		return tableFilterFields.map( props => <WrapperComplexFormItem
			{...props}
			form={form}
		/> );
	}, [ form ] );
	const setRequetData = () => {
		let formFields = form.getFieldsValue()
		let params = {
			...formFields
		}
		if (formFields.bookDateRange) {
			params.startDate =formFields.bookDateRange[ 0 ].format( 'YYYY-MM-DD' )
			params.endDate = formFields.bookDateRange[ 1 ].format( 'YYYY-MM-DD' )
		}
		if (formFields.bookTimeRange) {
			params.bookTimeBegin = formFields.bookTimeRange[ 0 ].format( 'YYYY-MM-DD' )
			params.bookTimeEnd =formFields.bookTimeRange[ 1 ].format( 'YYYY-MM-DD' )
		}
		if (formFields.startTime) {
			params.startTime = formFields.startTime.format( 'HH:mm:00' )
		}
		if (formFields.endTime) {
			params.endTime = formFields.endTime.format( 'HH:mm:00' )
		}
		delete params.bookDateRange
		delete params.bookTimeRange
		return params
	}
	const exportLog = () => {
		let params = setRequetData()
		dispatch( {
			type:  `${tableName}/exportLog`,
			params,
		} ).then( res => {
			window.open( res );
		} );
	}

	const getBooknumMax = bookNum => {
		return Math.max.apply( Math, bookNum.split( ',' ) );
	};
	// 表格-字段
	const tableColumns = [
		{
			key: 'key',
			title: '序号',
		},
		FIELDS.STUDENT.NAME,
		{
			...FIELDS.STUDENT.MOBILE,
			title: '学员手机号',
		},
		FIELDS.TEACHING.LESSON.COURSE_DATE,
		{
			key: 'timeRange',
			title: '培训时段',
			customRender: ( text, record ) => [record.intensiveStatus * 1 === 2 ? <Tag color="#f50">排</Tag> : '', record[ FIELDS.TEACHING.LESSON.START_TIME.key ] + '-' + record[ FIELDS.TEACHING.LESSON.END_TIME.key ]],
		},
		FIELDS.TEACHING.LESSON.COACH_ID,
		FIELDS.TEACHING.LESSON.COACH_MOBILE,
		FIELDS.STUDENT.LICENSE_TYPE,
		{
			...FIELDS.TEACHING.COURSE.KM,
			customRender: ( text, record ) => getDictValue( dictionary, FIELDS.TEACHING.COURSE.KM.dictionary, record[ FIELDS.TEACHING.COURSE.KM.key ] ) + ( record.intensiveStatus == 1 ? '集训' : '' ),
		},
		{
			key: 'studentNum',
			title: '预约人数',
			customRender: ( text, record ) => {
				return `${record.studentNum}/${getBooknumMax( record.bookNum )}`
			},
		},
		{
			key: 'bookTime',
			title: '预约时间',
			customRender: ( text, record ) => record.createTime,
		},
		FIELDS.TEACHING.COURSE.LOGIC_STATUS,
		FIELDS.STUDENT.MEMO,
	];
	// 操作按钮
	const tableActions = [
		<Privilege key={'complete_order_course'} privs={['complete_order_course']}>
			<Button
				key="done-button"
				icon="check"
				htmlType="button"
				type="primary"
				// 只有“未签到、未确认”状态才允许操作
				disabled={!(selectedRows.length && (selectedRows[0].logicStatus === '3' || selectedRows[0].logicStatus === '4'))}
				onClick={() => {
					setLogMemoEditItem( selectedRows[ 0 ] );
					setLogMemoEditVisible( true );
				}}>完成</Button>
		</Privilege>,
		<Privilege key={'cancel_order_course'} privs={['cancel_order_course']}>
			<Button
				key="cancel-button"
				icon="redo"
				htmlType="button"
				type="primary"
				// 只有“待签到”状态才允许操作
				disabled={!(selectedRows.length && selectedRows[0].logicStatus === '0')}
				onClick={() => {
						Modal.confirm( {
						title: `确定要撤销【${selectedRows[ 0 ][ FIELDS.STUDENT.NAME.key ]}】预约的【${selectedRows[ 0 ][ FIELDS.TEACHING.LESSON.COURSE_DATE.key ]} ${selectedRows[ 0 ][ FIELDS.TEACHING.LESSON.START_TIME.key ]}-${selectedRows[ 0 ][ FIELDS.TEACHING.LESSON.END_TIME.key ]}】这节课吗？`,
						okText: "确定",
						cancelText: "取消",
						onOk() {
							return cancelCourse( { id: selectedRows[ 0 ].id, } );
						},
					})
				}
				}>撤销</Button>
		</Privilege>,
		// <Privilege key={'cancel_order_course'} privs={['cancel_order_course']}>
			<Button
				key="download"
				icon="download"
				htmlType="button"
				type="primary"
				// disabled={data}
				onClick={() => Modal.confirm( {
					title: `确定要导出所筛选出来的记录吗？`,
					okText: "确定",
					cancelText: "取消",
					onOk() {
						exportLog()
					},
				} )}>导出</Button>
		// </Privilege>,
	];

	return (
		<GridContent>
			<WithTableName
				{...props}
				// tableSearchParams={{ studentId: reserve.studentInfo.id }}
				tableName={tableName}
				originColumns={tableColumns}
				formFields={memoFilterFields}
				tableActions={tableActions}
				multipleSelection={false}
				selectedRows={selectedRows}
				setSelectedRows={setSelectedRows}
				// rowMenuItems={tableMenuItems}
				// handleMenuClick={handleMenuClick}
				columnSortable={false}
				scroll={{ x: 'max-content' }}
				needUpdate={tableNeedUpdate}
				setNeedUpdate={setTableNeedUpdate}
			/>

			<LogMemoEditModal
				selectedRow={logMemoEditItem}
				visible={logMemoEditVisible}
				setVisible={setLogMemoEditVisible}
				loading={loading.effects[ `${tableName}/saveLogMemo` ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					completeCourse( fieldsValue ).then( data => {
						if ( data !== false ) setLogMemoEditVisible( false );
					} );
				}}
			/>
		</GridContent>
	);
};

export default connect( (
	{
		[ tableName ]: data,
		dictionary,
		loading,
		reserve,
		global
	}
) => (
	{
		[ tableName ]: data,
		dictionary,
		loading,
		reserve,
		global,
	}
) )( Form.create()( Reserve ) );
