import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from 'dva';
import { Card, Table, Button, Form, Modal, Icon, message } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from '@/config/fields';
import StudentListModal from './StudentListModal';

const tableName = 'coachStudent';

const Coach = props => {
	const { dispatch, form, [ tableName ]: tableData } = props;
	const [ studentListVisible, setStudentListVisible ] = useState( false );
	const [ searchStudentParams, setSearchStudentParams ] = useState( {} );
	const [ coachName, setCoachName ] = useState( null );

	const linkTo = item => {
		if ( item.link ) {
			dispatch( {
				type: 'quickEntryParams/linkTo',
				payload: {
					url: item.link,
					params: item.params,
				}
			} );
		}
	};

	const openStudentList = ( isActivity, kmCode, coachId, coachName ) => {
		setSearchStudentParams( { isActivity, kmCode, coachId } );
		setCoachName( coachName );
		setStudentListVisible( true );
	};

	// 表格-字段
	const tableColumns = [
		FIELDS.EMPLOYEE.NAME,
		FIELDS.EMPLOYEE.MOBILE,
		FIELDS.EMPLOYEE.DEPART_ID,
		FIELDS.EMPLOYEE.COACH_INFO.SITE_ID,
		{
			...FIELDS.EMPLOYEE.COACH_INFO.STUDENT_TOTAL,
			customRender: ( text, record ) => {
				return text * 1 !== 0 ? <a onClick={() => linkTo( {
					link: '/student/student-list/local',
					params: {
						coachId: record.employeeId,
						tabKey: '0'
					}
				} )}>{text}</a> : 0;
			},
		},
		{
			...FIELDS.EMPLOYEE.COACH_INFO.STUDENT_KM,
			customRender: ( text, record ) => {
				const v2 = record[ FIELDS.EMPLOYEE.COACH_INFO.STUDENT_KM2.key ];
				const v3 = record[ FIELDS.EMPLOYEE.COACH_INFO.STUDENT_KM3.key ];
				return <Fragment>
					<div>科目二：{text * 1 !== 0 ? <a onClick={() => linkTo( {
						link: '/student/student-list/local',
						params: {
							coachId: record.employeeId,
							tabKey: '0'
						}
					} )}>{v2}</a> : 0}</div>
					<div>科目三：{text * 1 !== 0 ? <a onClick={() => linkTo( {
						link: '/student/student-list/local',
						params: {
							coachId: record.employeeId,
							tabKey: '0',
						}
					} )}>{v3}</a> : 0}</div>
				</Fragment>;
			},
		},
		{
			...FIELDS.EMPLOYEE.COACH_INFO.STUDENT_KM2_ACTIVE,
			title: '活跃学员',
			customRender: ( text, record ) => {
				const v2 = record[ FIELDS.EMPLOYEE.COACH_INFO.STUDENT_KM2_ACTIVE.key ];
				const v3 = record[ FIELDS.EMPLOYEE.COACH_INFO.STUDENT_KM3_ACTIVE.key ];
				return <Fragment>
					<div>科目二：<a onClick={() => openStudentList( 0, 'km2', record.employeeId, record.name )}>{v2}</a></div>
					<div>科目三：<a onClick={() => openStudentList( 0, 'km3', record.employeeId, record.name )}>{v3}</a></div>
				</Fragment>;
			},
		},
		{
			...FIELDS.EMPLOYEE.COACH_INFO.STUDENT_KM2_UNACTIVE,
			title: '潜水学员',
			customRender: ( text, record ) => {
				// const v2 = record[ FIELDS.EMPLOYEE.COACH_INFO.STUDENT_KM2.key ] - record[ FIELDS.EMPLOYEE.COACH_INFO.STUDENT_KM2_ACTIVE.key ];
				// const v3 = record[ FIELDS.EMPLOYEE.COACH_INFO.STUDENT_KM3.key ] - record[ FIELDS.EMPLOYEE.COACH_INFO.STUDENT_KM3_ACTIVE.key ];
				return <Fragment>
					<div>科目二：<a onClick={() => openStudentList( 1, 'km2', record.employeeId, record.name )}>{record.km2InActiveCount}</a></div>
					<div>科目三：<a onClick={() => openStudentList( 1, 'km3', record.employeeId, record.name )}>{record.km3InActiveCount}</a></div>
				</Fragment>;
			},
		},
		{
			...FIELDS.EMPLOYEE.COACH_INFO.STUDENT_GRADUATED,
			customRender: ( text, record ) => {
				return text * 1 !== 0 ? <a onClick={() => linkTo( {
					link: '/student/student-list/local',
					params: {
						employeeId: record.employeeId,
						tabKey: '2'
					}
				} )}>{text}</a> : 0;
			},
		},
	];
	// 筛选表单-字段
	const tableFilterFields = [
		{
			config: {
				...FIELDS.EMPLOYEE.QUICK_SEARCH,
				title: '教练',
			},
		},
		{
			config: FIELDS.EMPLOYEE.COACH_INFO.TEACH_LICENSE_TYPE,
		},
		{
			config: FIELDS.EMPLOYEE.DEPART_ID,
		},
		{
			config: FIELDS.EMPLOYEE.COACH_INFO.SITE_ID,
		},
		{
			config: FIELDS.EMPLOYEE.LEAVING,
		},
		{
			config: FIELDS.EMPLOYEE.COACH_INFO.STUDENT_ACTIVE_DAYS,
			initialValue: 30
		},
	];
	// 操作按钮
	const tableActions = [];
	// 更多操作菜单
	const tableMenuItems = [];

	const memoFilterFields = useMemo( () => {
		return tableFilterFields.map( props => {
			return ( <WrapperComplexFormItem
				{...props}
				initialValue={props.initialValue}
				form={form}
			/> )
		} );
	}, [ form ] );

	const totalColumns = [
		{
			title: '总学员数',
			dataIndex: 'total',
			key: 'total',
		},
		{
			title: '总活跃学员数',
			dataIndex: 'activeCount',
			key: 'activeCount',
		},
		{
			title: '总潜水学员数',
			dataIndex: 'unactiveCount',
			key: 'unactiveCount',
		},
		{
			title: '科目二总学员数',
			dataIndex: 'km2',
			key: 'km2',
		},
		{
			title: '科目二活跃数',
			dataIndex: 'km2Active',
			key: 'km2Active',
		},
		{
			title: '科目二潜水数',
			dataIndex: 'km2Unactive',
			key: 'km2Unactive',
		},
		{
			title: '科目二未分配教练数',
			dataIndex: 'unassignedKm2',
			key: 'unassignedKm2',
		},
		{
			title: '科目三总数',
			dataIndex: 'km3',
			key: 'km3',
		},
		{
			title: '科目三活跃数',
			dataIndex: 'km3Active',
			key: 'km3Active',
		},
		{
			title: '科目三潜水数',
			dataIndex: 'km3Unactive',
			key: 'km3Unactive',
		},
		{
			title: '科目三未分配教练数',
			dataIndex: 'unassignedKm3',
			key: 'unassignedKm3',
		},
	];
	const totalData = useMemo( () => {
		const {
			total = 0,
			activeCount = 0,
			km2 = 0,
			km2Active = 0,
			km3 = 0,
			km3Active = 0,
			unassignedKm2 = 0,
			unassignedKm3 = 0,
			inActiveCount = 0,
			km2InActive = 0,
			km3InActive = 0,
		} = tableData.total || {};
		return [
			{
				key: '1',
				total,
				activeCount: <a onClick={() => openStudentList( 0 )}>{activeCount}</a>,
				unactiveCount: <a onClick={() => openStudentList( 1 )}>{inActiveCount}</a>,
				km2,
				km2Active: <a onClick={() => openStudentList( 0, 'km2' )}>{km2Active}</a>,
				km2Unactive: <a onClick={() => openStudentList( 1, 'km2' )}>{km2InActive}</a>,
				unassignedKm2,
				km3,
				km3Active: <a onClick={() => openStudentList( 0, 'km3' )}>{km3Active}</a>,
				km3Unactive: <a onClick={() => openStudentList( 1, 'km3' )}>{km3InActive}</a>,
				unassignedKm3,
			}
		];
	}, [ tableData ] );

	return (
		<Fragment>
			<GridContent>
				<Card bordered={false} style={{ marginBottom: 20 }}>
					<Table key="total" pagination={false} columns={totalColumns} dataSource={totalData}/>
				</Card>

				<WithTableName
					{...props}
					tableName={tableName}
					originColumns={tableColumns}
					formFields={memoFilterFields}
					// tableActions={tableActions}
					// selectedRows={selectedRows}
					// setSelectedRows={setSelectedRows}
					// rowMenuItems={tableMenuItems}
					// handleMenuClick={handleMenuClick}
					columnSortable={false}
					// scroll={{ x: 1600 }}
				/>
			</GridContent>

			<StudentListModal
				searchParams={searchStudentParams}
				coachName={coachName}
				visible={studentListVisible}
				setVisible={setStudentListVisible}
			/>
		</Fragment>
	);
};

export default connect( (
	{
		[ tableName ]: data,
		loading,
		global,
		quickEntryParams
	}
) => (
	{
		[ tableName ]: data,
		loading,
		global,
		quickEntryParams
	}
) )( Form.create()( Coach ) );
