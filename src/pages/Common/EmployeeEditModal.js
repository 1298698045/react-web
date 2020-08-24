import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'dva';
import { Form, Input, Modal, Spin, Row, Col, Button } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from '@/config/fields';
import { getDictItem } from '@/utils/dictionaryUtil';
import { idCard } from '@/config/reg';
import moment from 'moment';

const EmployEditModal = props => {
	const { employeeId, dispatch, dictionary, employee, onSubmit, visible, setVisible, form, loading, confirmLoading, departId } = props;
	const [ isCoach, setIsCoach ] = useState( false );
	const [ employeeInfo, setEmployeeInfo ] = useState( {} );
	const [ currentDepartId, setCurrentDepartId ] = useState();

	useEffect( () => {
		if ( visible ) {
			dispatch( {
				type: 'orgEmployee/doGetAllCarList',
			} );
			dispatch( {
				type: 'orgEmployee/doGetUnbindCarList',
			} );
		}
		if ( employeeId && visible ) {
			dispatch( {
				type: 'orgEmployee/queryEmployeeInfo',
				params: {
					employeeId,
				},
			} ).then( data => {
				if ( data !== false ) {
					setEmployeeInfo( data );
					onChange( FIELDS.EMPLOYEE.POSITION_ID_ACTIVE.key, data[ FIELDS.EMPLOYEE.POSITION_ID_ACTIVE.key ] );
				}
			} );
		} else if ( !employeeId ) {
			setEmployeeInfo( {} );
		}
	}, [ visible ] );

	// useEffect( function () {
	// 	dispatch( {
	// 		type: 'orgEmployee/doGetUnbindCarList',
	// 		params: {
	// 			[ FIELDS.EMPLOYEE.DEPART_ID.key ]: currentDepartId,
	// 		},
	// 	} );
	// 	form.setFieldsValue( { [ FIELDS.EMPLOYEE.CAR_ID.key ]: [] } );
	// }, [ currentDepartId ] );

	const onChange = ( key, value ) => {
		switch ( key ) {
			case FIELDS.EMPLOYEE.POSITION_ID_ACTIVE.key :
				const item = getDictItem( dictionary, 'position_id', value );
				setIsCoach( item ? item.positionType == 1 : false );
				break;
			// 自动从身份证号中读取出生日期
			case FIELDS.EMPLOYEE.IDCARD_NO.key :
				if ( idCard.test( value ) && !form.getFieldValue( FIELDS.EMPLOYEE.BIRTHDAY.key ) ) {
					form.setFieldsValue( { [ FIELDS.EMPLOYEE.BIRTHDAY.key ]: moment( `${value.substr( 6, 4 )}-${value.substr( 10, 2 )}-${value.substr( 12, 2 )}`, 'YYYY-MM-DD' ) } );
				}
				break;
			// 选择机构自动修改未绑定车辆
			case FIELDS.EMPLOYEE.DEPART_ID.key :
				setCurrentDepartId( value );
				break;
		}
	};

	const onOk = e => {
		e.preventDefault();

		// eslint-disable-next-line consistent-return
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}

			if ( fieldsValue.coachInfo ) {
				fieldsValue.coachInfo = {
					...fieldsValue.coachInfo,
					// [ FIELDS.EMPLOYEE.COACH_INFO.TEACH_KM.key ]: fieldsValue.coachInfo[ FIELDS.EMPLOYEE.COACH_INFO.TEACH_KM.key ].join( ',' ),
					[ FIELDS.EMPLOYEE.COACH_INFO.BOOK_NUM.key ]: fieldsValue.coachInfo[ FIELDS.EMPLOYEE.COACH_INFO.BOOK_NUM.key ].sort( ( a, b ) => a - b ).join( ',' ),
				};
				if ( fieldsValue.coachInfo[ FIELDS.EMPLOYEE.COACH_INFO.LICENSE_FIRST_DATE.key ] ) fieldsValue.coachInfo[ FIELDS.EMPLOYEE.COACH_INFO.LICENSE_FIRST_DATE.key ] = fieldsValue.coachInfo[ FIELDS.EMPLOYEE.COACH_INFO.LICENSE_FIRST_DATE.key ].format( 'YYYY-MM-DD' );
				if ( fieldsValue.coachInfo[ FIELDS.EMPLOYEE.COACH_INFO.LICENSE_EXPIRE_DATE.key ] ) fieldsValue.coachInfo[ FIELDS.EMPLOYEE.COACH_INFO.LICENSE_EXPIRE_DATE.key ] = fieldsValue.coachInfo[ FIELDS.EMPLOYEE.COACH_INFO.LICENSE_EXPIRE_DATE.key ].format( 'YYYY-MM-DD' );
			}
			onSubmit( {
				...fieldsValue,
				[ FIELDS.EMPLOYEE.BIRTHDAY.key ]: fieldsValue[ FIELDS.EMPLOYEE.BIRTHDAY.key ].format( 'YYYY-MM-DD' ),
				[ FIELDS.EMPLOYEE.ENTRY_TIME.key ]: fieldsValue[ FIELDS.EMPLOYEE.ENTRY_TIME.key ].format( 'YYYY-MM-DD' ),
				[ FIELDS.EMPLOYEE.ID.key ]: employeeInfo[ FIELDS.EMPLOYEE.ID.key ],
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

	return (
		<Modal
			destroyOnClose
			title={( employeeId ? (employeeInfo.leaving === 1 || employeeInfo.leaving === 2 ? '查看' : '修改') : '新增' ) + '员工信息'}
			width="90%"
			visible={visible}
			// onOk={onOk}
			// onCancel={onCancel}
			closable={true}
			maskClosable={false}
			keyboard={false}
			confirmLoading={confirmLoading}
			onCancel={(e) => {
				onCancel(e);
			}}
			// okText="提交"
			// cancelText="取消"
			footer={
				employeeInfo.leaving === 1 || employeeInfo.leaving === 2 ? <Button
					icon="close-circle"
					htmlType="button"
					onClick={(e) => {
						onCancel(e);
					}}>关闭</Button> : [ <Button
					htmlType="button"
					key='cancel'
					onClick={(e) => {
						onCancel(e);
					}}>取消</Button>, <Button
					htmlType="button"
					key='ok'
					type="primary"
					onClick={(e) => {
						onOk(e);
					}}>提交</Button> ]
			}
		>
			<Spin
				spinning={loading.effects[ 'orgEmployee/queryEmployeeInfo' ] || loading.effects[ 'dictionary/position_id' ] || false}>
				<Form onSubmit={onOk}>
					<Row gutter={24}>
						<Col xs={24}><h2>基础信息</h2></Col>
						{
							[
								FIELDS.EMPLOYEE.NAME,
								FIELDS.EMPLOYEE.MOBILE,
								FIELDS.EMPLOYEE.IDCARD_NO,
								FIELDS.EMPLOYEE.GENDER,
								FIELDS.EMPLOYEE.BIRTHDAY,
								FIELDS.EMPLOYEE.EDUCATION,
								FIELDS.EMPLOYEE.SALARY,
								FIELDS.EMPLOYEE.LABOR_RELATION,
								FIELDS.EMPLOYEE.ENTRY_TIME,
								{
									...FIELDS.EMPLOYEE.DEPART_ID,
									initialValue: departId,
								},
								FIELDS.EMPLOYEE.POSITION_ID_ACTIVE,
								{
									...FIELDS.EMPLOYEE.ROLE_ID_ACTIVE,
									mode: 'multiple',
									notRequired: true,
								},
								{
									...FIELDS.EMPLOYEE.CAR_ID,
									values: getCarValues,
									mode: 'multiple',
									notRequired: true,
									// status: currentDepartId ? 'edit' : 'disabled',
								},
								{
									...FIELDS.EMPLOYEE.BANK,
									notRequired: true,
								},
								{
									...FIELDS.EMPLOYEE.BANK_ACCOUNT,
									notRequired: true,
								},
							].map( v => {
									let rule = [ { required: !v.notRequired, message: '该项为必填' } ]
									if ( typeof v.validator !== 'undefined' ) {
										rule.push( { validator: v.validator } )
									}
									return ( <Col md={8} sm={24} key={v.key} style={{ height: '88px' }}>
										<WrapperComplexFormItem
											{...props}
											config={v}
											mode={v.mode}
											maxTagCount={3}
											form={form}
											initialValue={v.initialValue || employeeInfo[ v.key ]}
											values={v.values}
											rules={rule}
											style={{ marginBottom: 0 }}
											onChange={onChange}
											status={employeeInfo.leaving === 1 || employeeInfo.leaving === 2 ? 'disabled' : v.status}
										/>
									</Col> )
								}
							)
						}
					</Row>
					{isCoach && <Row gutter={24} style={{ marginTop: 20 }}>
						<Col xs={24}><h2>教练信息</h2></Col>
						{
							[
								{
									...FIELDS.EMPLOYEE.COACH_INFO.LICENSE_TYPE,
									values: [ 'A1', 'A2', 'A3', 'B1', 'B2', 'C1', 'C2' ].map( type => ( {
										dKey: type,
										dValue: type,
									} ) ),
								},
								{
									...FIELDS.EMPLOYEE.COACH_INFO.TEACH_LICENSE_TYPE,
									dictSwitch: 1,
								},
								FIELDS.EMPLOYEE.COACH_INFO.TEACH_KM,
								FIELDS.EMPLOYEE.COACH_INFO.LESSON_ID_ACTIVE,
								FIELDS.EMPLOYEE.COACH_INFO.BOOK_NUM,
								FIELDS.EMPLOYEE.COACH_INFO.SITE_ID,
								FIELDS.EMPLOYEE.COACH_INFO.COURSE_ARRANGE,
								{
									...FIELDS.EMPLOYEE.COACH_INFO.LICENSE_NO,
									notRequired: true,
								},
								{
									...FIELDS.EMPLOYEE.COACH_INFO.LICENSE_FIRST_DATE,
									notRequired: true,
								},
								{
									...FIELDS.EMPLOYEE.COACH_INFO.LICENSE_EXPIRE_DATE,
									notRequired: true,
								},
								{
									...FIELDS.EMPLOYEE.COACH_INFO.COACH_NO,
									notRequired: true,
								},
							].map( v =>
								<Col md={8} sm={24} key={v.key}>
									<WrapperComplexFormItem
										className="customer-checkbox"
										{...props}
										config={v}
										form={form}
										values={v.values}
										initialValue={v.initialValue || ( employeeInfo.coachInfo || {} )[ v.key ]}
										useDefault={true}
										rules={[ { required: !v.notRequired, message: '该项为必填' } ]}
										style={{ marginBottom: 0 }}
										parent="coachInfo"
										status={employeeInfo.leaving === 1 || employeeInfo.leaving === 2 ? 'disabled' : v.status}
									/>
								</Col>
							)
						}
					</Row>}
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
} ) )( Form.create()( EmployEditModal ) );
