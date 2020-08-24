import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from 'dva';
import { Card, Menu, Button, Form, Modal, Icon, message, Tag } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from '@/config/fields';
import EmployeeEditModal from '@/pages/Common/EmployeeEditModal';
import { refreshDictionary } from '@/utils/dictionaryUtil';
import Privilege from '@/components/Privilege';
import StudentLimitModal from './StudentLimitModal';
import CourseTimeModal from './CourseTimeModal';

const tableName = 'coach';

const Coach = props => {
	const { dispatch, form, loading, coach } = props;
	const [ employeeEditVisible, setCoachEditVisible ] = useState( false );
	const [ employeeEditItem, setCoachEditItem ] = useState( {} );
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );
	const [ selectedRows, setSelectedRows ] = useState( [] );
	const [ courseTimeModalVisible, setCourseTimeModalVisible ] = useState( false );
	const [ studentLimitModalVisible, setStudentLimitModalVisible ] = useState( false );
	const saveCoachEdit = params => {
		return dispatch( {
			type: 'orgEmployee/saveEmployeeEdit',
			params,
		} ).then( () => {
			setTableNeedUpdate( true );
			refreshDictionary( dispatch, 'employee_id' );
		} );
	};
	const changePlan = params => {
		return dispatch( {
			type: tableName + '/changePlan',
			params:{params},
		} ).then( () => {
			setTableNeedUpdate( true );
		} );
	};
	const changeBookNum = params => {
		return dispatch( {
			type: tableName + '/changeBookNum',
			params:{params},
		} ).then( () => {
			setTableNeedUpdate( true );
		} );
	};
	// 表格-字段
	const tableColumns = [
		{
			key: 'key',
			title: '序号',
		},
		// {
		// 	key: 'operation',
		// 	title: '操作',
		// 	customRender: getLeavingButton,
		// },
		{
			...FIELDS.EMPLOYEE.NAME,
			customRender: ( text, record, index ) => {
				return (
					<Privilege privs={[ 'coach_edit' ]} noMatch={text}>
						<a onClick={e => {
							// e.stopPropagation();
							// console.log( text, record, index );
							setCoachEditItem( { ...record } );
							setCoachEditVisible( true );
						}}>{text}</a>
					</Privilege>
				)
			},
		},
		FIELDS.EMPLOYEE.MOBILE,
		FIELDS.EMPLOYEE.DEPART_ID,
		FIELDS.EMPLOYEE.COACH_INFO.SITE_ID,
		FIELDS.EMPLOYEE.COACH_INFO.TEACH_KM,
		FIELDS.EMPLOYEE.COACH_INFO.TEACH_LICENSE_TYPE,
		FIELDS.EMPLOYEE.COACH_INFO.BOOK_NUM,
		{
			...FIELDS.EMPLOYEE.COACH_INFO.CARS,
			customRender: ( text, record, index, customText ) => {
				return customText ? customText.split( ',' ).map( plateNo =>
					<Tag key={plateNo}>{plateNo}</Tag>
				) : customText;
			},
		},
		FIELDS.EMPLOYEE.COACH_INFO.COURSE_ARRANGE,
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
			config: {
				...FIELDS.EMPLOYEE.COACH_INFO.TEACH_KM,
				type: 'select',
			},
		},
		{
			config: FIELDS.EMPLOYEE.LEAVING,
		},
	];
	// 操作按钮
	const tableActions = [
		<Privilege privs={[ 'change_time_batch' ]} key={'change_time_batch'}>
			<Button key="stime"
				disabled={!selectedRows.length}
				htmlType="button" type="primary"
				onClick={() => {
					setCourseTimeModalVisible( true );
				}}
			>
				批量更改教学时段
			</Button>,
		</Privilege>,
		<Privilege privs={[ 'change_book_num_batch' ]} key={'change_book_num_batch'}>
			<Button  key="slimit"
				disabled={!selectedRows.length}
			    htmlType="button" type="primary"
				onClick={() => {
					setStudentLimitModalVisible( true );
				}}
			>
				批量更改学员上限
			</Button>
		</Privilege>,
	];
	// 更多操作菜单
	const tableMenuItems = [];

	const memoFilterFields = useMemo( () => {
		return tableFilterFields.map( props => <WrapperComplexFormItem
			{...props}
			form={form}
		/> );
	}, [ form ] );

	return (
		<Fragment>
			<GridContent>
				<WithTableName
					{...props}
					tableName={tableName}
					originColumns={tableColumns}
					formFields={memoFilterFields}
					tableSearchParams={{
						leaving: 0
					}}
					tableActions={tableActions}
					// rowMenuItems={tableMenuItems}
					// handleMenuClick={handleMenuClick}
					columnSortable={false}
					scroll={{ x: 'max-content' }}
					needUpdate={tableNeedUpdate}
					setNeedUpdate={setTableNeedUpdate}
					selectedRows={selectedRows}
					setSelectedRows={setSelectedRows}
				/>
			</GridContent>

			<EmployeeEditModal
				employeeId={employeeEditItem.employeeId}
				visible={employeeEditVisible}
				setVisible={setCoachEditVisible}
				confirmLoading={loading.effects[ 'orgEmployee/saveEmployeeEdit' ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					saveCoachEdit( fieldsValue ).then( data => {
						if ( data !== false ) setCoachEditVisible( false );
					} );
				}}
			/>
			<CourseTimeModal
				selectedRows={selectedRows}
				visible={courseTimeModalVisible}
				setVisible={setCourseTimeModalVisible}
				loading={loading.effects[ tableName + '/changePlan' ]}
				onSubmit={fieldsValue => {
					changePlan( fieldsValue ).then( data => {
						if ( data !== false ) setCourseTimeModalVisible( false );
					} );
				}}
			/>
			<StudentLimitModal
				selectedRows={selectedRows}
				visible={studentLimitModalVisible}
				setVisible={setStudentLimitModalVisible}
				loading={loading.effects[ tableName + '/changeBookNum' ]}
				onSubmit={fieldsValue => {
					changeBookNum( fieldsValue ).then( data => {
						if ( data !== false ) setStudentLimitModalVisible( false );
					} );
				}}
			/>
		</Fragment>
	);
};

export default connect( (
	{
		[ tableName ]: data,
		loading,
		global
	}
) => (
	{
		[ tableName ]: data,
		loading,
		global,
	}
) )( Form.create()( Coach ) );
