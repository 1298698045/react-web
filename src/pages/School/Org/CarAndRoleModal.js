import React, { useState, useEffect, useMemo } from 'react';
import { connect } from "dva";
import { Form, Input, Modal, Spin, Row, Col } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
import { getDictItem, queryDictionary } from '@/utils/dictionaryUtil';
import { idCard } from '@/config/reg';
import moment from 'moment';

const RoleModal = props => {
	const { actionType, employeeId, dispatch, dictionary, employee, onSubmit, visible, setVisible, form, loading, confirmLoading, departId } = props;
	const [ employeeInfo, setEmployeeInfo ] = useState( {} );
	const [ currentDepartId, setCurrentDepartId ] = useState();

	useEffect( () => {
		if ( employeeId && visible ) {
			dispatch( {
				type: 'orgEmployee/doGetAllCarList',
			} );
			dispatch( {
				type: 'orgEmployee/doGetUnbindCarList',
			} );
			queryDictionary( dispatch, 'role_id' );
			dispatch( {
				type: 'orgEmployee/queryEmployeeInfo',
				params: {
					employeeId,
				},
			} ).then( data => {
				if ( data !== false ) {
					setEmployeeInfo( data );
				}
			} );
		} else if ( !employeeId ) {
			setEmployeeInfo( {} );
		}
	}, [ visible ] );


	const onOk = e => {
		e.preventDefault();

		// eslint-disable-next-line consistent-return
		form.validateFields( ( err, fieldsValue ) => {
			fieldsValue
			if ( err ) {
				return false;
			}
			onSubmit( {
				...employeeInfo,
				...fieldsValue,
				[ FIELDS.EMPLOYEE.ID.key ]: employeeInfo[ FIELDS.EMPLOYEE.ID.key ]
			} );
		} );
	};
	const onCancel = e => {
		e.preventDefault();
		setVisible( false );
	};
	const getCarValues = useMemo( () => {
		if ( !employee.allCars || !employee.unbindCars ) return [];
		if ( !employeeInfo.carIds ) employeeInfo.carIds = [];
		const myCars = employee.allCars.filter( car => {
			return employeeInfo.carIds.indexOf( car.id ) > -1 || ( car.carStatus === 'normal' && employee.unbindCars.find( v => v.id === car.id ) );
		} );
		return myCars.map( v => ( {
			dKey: String( v.id ),
			dValue: v.plateNo,
		} ) );
	}, [ employee.allCars, employee.unbindCars, employeeInfo.carIds ] );

	let itemList = [
		{
			...FIELDS.EMPLOYEE.ROLE_ID_ACTIVE,
			mode: 'multiple',
			notRequired: true,
		}
	]
	if (actionType === 'car') {
		itemList = [{
			...FIELDS.EMPLOYEE.CAR_ID,
			values: getCarValues,
			mode: 'multiple',
			notRequired: true,
		}]
	}
	return (
		<Modal
			destroyOnClose
			title={actionType === 'car' ? '绑定车辆' : '分配角色'}
			visible={visible}
			onOk={onOk}
			onCancel={onCancel}
			closable={true}
			maskClosable={false}
			keyboard={false}
			confirmLoading={confirmLoading}
			okText="提交"
			cancelText="取消"
		>
			<Spin
				spinning={loading.effects[ 'orgEmployee/queryEmployeeInfo' ] || loading.effects[ 'dictionary/position_id' ] || false}>
				<Form onSubmit={onOk}>
						{
							itemList.map( v =>
								<WrapperComplexFormItem
									key={v.key}
									{...props}
									config={v}
									mode={v.mode}
									maxTagCount={3}
									form={form}
									initialValue={v.initialValue || employeeInfo[ v.key ]}
									values={v.values}
									// rules={[ { required: !v.notRequired, message: '该项为必填' } ]}
									style={{ marginBottom: 0 }}
									status={v.status}
								/>
							)
						}
				</Form>
			</Spin>
		</Modal>
	);
};

export default connect( (
	{
		orgEmployee,
		dictionary,
		loading,
		global
	}
) => ( {
	employee: orgEmployee,
	dictionary,
	loading,
	global
} ) )( Form.create()( RoleModal ) );
