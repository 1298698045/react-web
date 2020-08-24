import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from 'dva';
import { Card, Menu, Button, Form, Modal, Icon, message } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import router from 'umi/router';
import FIELDS from '@/config/fields';
import EmployeeEditModal from '@/pages/Common/EmployeeEditModal';
import CarAndRoleModal from './CarAndRoleModal';
import { refreshDictionary } from '@/utils/dictionaryUtil';
import { useEffectOnce } from 'react-use/lib/index';
import Privilege from '@/components/Privilege';

import styles from './Org.less'

const tableName = 'orgEmployee';

const Employee = props => {
	const { dispatch, form, loading, departmentSelected, quickEntryParams } = props;
	const [ selectedRows, setSelectedRows ] = useState( [] );
	// const [ rowMenuItems, setRowMenuItems ] = useState( [ ...originRowMenuItems ] );
	const [ employeeEditVisible, setEmployeeEditVisible ] = useState( false );
	const [ employeeEditItem, setEmployeeFormItem ] = useState( {} );
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );
	const [ roleVisible, setRoleVisible ] = useState( false );
	const [ actionType, setActionType ] = useState( false );

	// 由快捷入口进入
	useEffectOnce( () => {
		if ( quickEntryParams === 'addEmployee' ) {
			setEmployeeFormItem( {} );
			setEmployeeEditVisible( true );
		}
		dispatch( {
			type: 'quickEntryParams/clearParams',
		} );
	} );
	
	const saveEmployeeEdit = params => {
		return dispatch( {
			type: `${tableName}/saveEmployeeEdit`,
			params,
		} ).finally( data => {
			setTableNeedUpdate( true );
			refreshDictionary( dispatch, 'employee_id' );
		} );
	};
	const preLeave = employee => {
		return dispatch( {
			type: `${tableName}/preLeave`,
			params: {
				employeeId: employee[ FIELDS.EMPLOYEE.ID.key ],
			},
		} ).finally( () => {
			setTableNeedUpdate( true );
		} );
	};
	const preLeaveCancel = employee => {
		return dispatch( {
			type: `${tableName}/cancelPreLeave`,
			params: {
				employeeId: employee[ FIELDS.EMPLOYEE.ID.key ],
			},
		} ).finally( () => {
			setTableNeedUpdate( true );
		} );
	};
	const preLeaveConfirm = employee => {
		return dispatch( {
			type: `${tableName}/confirmPreLeave`,
			params: {
				employeeId: employee[ FIELDS.EMPLOYEE.ID.key ],
			},
		} ).finally( () => {
			setTableNeedUpdate( true );
		} );
	};
	
	// 表格-字段
	const tableColumns = [
		// FIELDS.EMPLOYEE.ID,
		// {
		// 	key: 'delete',
		// 	title: '操作',
		// 	customRender: getLeavingButton,
		// },
		{
			...FIELDS.EMPLOYEE.NAME,
			customRender: ( text, record, index ) => {
				return (
				<Privilege privs={[ 'employee_detail' ]} noMatch={text}>
				<a onClick={e => {
					// e.stopPropagation();
					// console.log( text, record, index );
					setEmployeeFormItem( { ...record } );
					setEmployeeEditVisible( true );
				}}>{text}</a></Privilege>);
			},
		},
		FIELDS.EMPLOYEE.MOBILE,
		FIELDS.EMPLOYEE.POSITION_ID,
		FIELDS.EMPLOYEE.DEPART_ID,
		{
			...FIELDS.EMPLOYEE.CAR_ID,
			customRender: ( text, record, index ) => {
				return record.cars ? record.cars.map( car => <div key={car.id}>{car.plateNo}</div> ) : '';
			},
		},
		FIELDS.EMPLOYEE.ROLE_ID,
		{
			...FIELDS.EMPLOYEE.LEAVING,
			// customRender: ( text, record, index ) => ( { 0: '正常', 1: '预离职', 2: '已离职', }[ text ] ),
		},
	];
	// 筛选表单-字段
	const tableFilterFields = [
		{
			config: FIELDS.EMPLOYEE.POSITION_ID_ACTIVE,
		},
		{
			config: FIELDS.EMPLOYEE.POSITION_TYPE,
		},
		{
			config: FIELDS.EMPLOYEE.QUICK_SEARCH,
		},
		{
			config: {...FIELDS.EMPLOYEE.LEAVING, title: '员工状态'},
		},
	];
	// 操作按钮
	const tableActions = [
		<Privilege privs={[ 'employee_add' ]} key="employee_add">
		<Button
			key="input" icon="plus-circle" htmlType="button" type="primary"
			onClick={() => {
				setEmployeeFormItem( {} );
				setEmployeeEditVisible( true );
			}}
		>
			新增员工
		</Button></Privilege>,
		<Privilege privs={[ 'binding_cars' ]} key="binding_cars">
			<Button
				type="primary" key="car" icon="car"
				disabled={!selectedRows.length || selectedRows[ 0 ][ FIELDS.EMPLOYEE.LEAVING.key ] != 0}
				onClick={() => {
					setEmployeeFormItem( { ...selectedRows[ 0 ] } );
					setActionType('car')
					setRoleVisible(true);
				}
			}>绑定车辆</Button>
		</Privilege>
		,
		<Privilege privs={[ 'add_roles' ]} key="add_roles">
		<Button
			type="primary" key="role" icon="fork"
			disabled={!selectedRows.length || selectedRows[ 0 ][ FIELDS.EMPLOYEE.LEAVING.key ] != 0}
			onClick={() => {
				setEmployeeFormItem( { ...selectedRows[ 0 ] } );
				setActionType('role')
				setRoleVisible(true);
			}
		}>分配角色</Button>
		</Privilege>
		,
		<Privilege privs={[ 'employee_pre_leave' ]} key="employee_pre_leave">
		<Button
		type="primary" key="preLeave" icon="logout"
		disabled={!selectedRows.length || selectedRows[ 0 ][ FIELDS.EMPLOYEE.LEAVING.key ] != 0}
		onClick={() => Modal.confirm( {
			title: '是否办理【' + selectedRows[ 0 ][ FIELDS.EMPLOYEE.NAME.key ] + '】预离职？',
			content: '教练员预离职后，所有未被预约的课将自动关闭。',
			okText: '确定',
			cancelText: '取消',
			onOk (){
				return preLeave( selectedRows[ 0 ] ).then( () => setSelectedRows( [] ) );
			},
		} )}>预离职</Button></Privilege>,
		<Privilege privs={[ 'employee_pre_leave_cancel' ]} key="employee_pre_leave_cancel">
		<Button
			type="primary" key="cancel" icon="rollback"
			disabled={!selectedRows.length || selectedRows[ 0 ][ FIELDS.EMPLOYEE.LEAVING.key ] != 1}
			onClick={() => Modal.confirm( {
				title: '是否撤回【' + selectedRows[ 0 ][ FIELDS.EMPLOYEE.NAME.key ] + '】的预离职？',
				content: '教练员撤回后，所有课程将自动打开。',
				okText: '确定',
				cancelText: '取消',
				onOk (){
					return preLeaveCancel( selectedRows[ 0 ] ).then( () => setSelectedRows( [] ) );
				},
			} )}>撤销预离职</Button></Privilege>,
		<Privilege privs={[ 'employee_leave_comfrim' ]} key="employee_leave_comfrim">
		<Button
			type="primary" key="leave" icon="logout"
			disabled={!selectedRows.length || selectedRows[ 0 ][ FIELDS.EMPLOYEE.LEAVING.key ] != 1}
			onClick={() => Modal.confirm( {
				title: '是否办理【' + selectedRows[ 0 ][ FIELDS.EMPLOYEE.NAME.key ] + '】离职？',
				content: '办理离职后将无法撤回！',
				okText: '确定',
				cancelText: '取消',
				onOk (){
					return preLeaveConfirm( selectedRows[ 0 ] ).then( () => setSelectedRows( [] ) );
				},
			} )}>确认离职</Button></Privilege>,
	];
	// 更多操作菜单
	const tableMenuItems = [];
	
	const memoFilterFields = useMemo( () => {
		return tableFilterFields.map( props => <WrapperComplexFormItem
			{...props}
			form={form}
		/> );
	}, [ form ] );
	
	const memoTitle = useMemo( () => {
		return departmentSelected.id ? departmentSelected[ FIELDS.ORG.DEPART_NAME.key ] : '所有员工';
	}, [ departmentSelected ] );
	
	return (
		<Fragment>
			<div className={styles.card}>
				<div className={styles.title}>{memoTitle}</div>
				<GridContent>
					<WithTableName
						{...props}
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
						tableSearchParams={{
							departId: departmentSelected[ FIELDS.ORG.DEPART_ID.key ],
							includeSubDepart: true,
						}}
						needUpdate={tableNeedUpdate}
						setNeedUpdate={setTableNeedUpdate}
					/>
				</GridContent>
			</div>
			
			<EmployeeEditModal
				departId={departmentSelected[ FIELDS.ORG.DEPART_ID.key ]}
				employeeId={employeeEditItem.id}
				visible={employeeEditVisible}
				setVisible={setEmployeeEditVisible}
				confirmLoading={loading.effects[ `${tableName}/saveEmployeeEdit` ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					saveEmployeeEdit( fieldsValue ).then( data => {
						if ( data !== false ) setEmployeeEditVisible( false );
					} );
				}}
			/>
			<CarAndRoleModal
				actionType={actionType}
				employeeId={employeeEditItem.id}
				visible={roleVisible}
				setVisible={setRoleVisible}
				confirmLoading={loading.effects[ `${tableName}/saveEmployeeEdit` ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					saveEmployeeEdit( fieldsValue ).then( data => {
						if ( data !== false ) setRoleVisible( false );
					} );
				}}
			/>
		</Fragment>
	);
};

export default connect( (
	{
		[ tableName ]: data,
		quickEntryParams,
		loading,
		global
	}
) => (
	{
		[ tableName ]: data,
		quickEntryParams,
		loading,
		global,
	}
) )( Form.create()( Employee ) );
