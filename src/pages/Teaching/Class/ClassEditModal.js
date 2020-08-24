import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input, Modal, Button, Row, Col } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from '@/config/fields';
import useGetInitialValue from '@/hooks/useGetInitialValue';
import { connect } from 'dva';
import { getDictItemValue } from '@/utils/dictionaryUtil';

const ClassEditModal = props => {
	const { selectedRow, onSubmit, visible, setVisible, form, loading, dictionary, disabled } = props;
	const status = selectedRow && selectedRow[ FIELDS.TEACHING.CLASS.STATUS.key ] == 1 ? 'disabled' : null;
	const [ payType, setPayType ] = useState( '' );
	const [ moneyName, setMoneyName ] = useState( '班型费用' );
	selectedRow[ FIELDS.TEACHING.CLASS.NONCANCELABLE_BEFORE.key ] = selectedRow[ FIELDS.TEACHING.CLASS.NONCANCELABLE_BEFORE.key ] ? selectedRow[ FIELDS.TEACHING.CLASS.NONCANCELABLE_BEFORE.key ] : 0
	selectedRow[ FIELDS.TEACHING.CLASS.NONCANCELABLE_IN.key ] = selectedRow[ FIELDS.TEACHING.CLASS.NONCANCELABLE_IN.key ] ? selectedRow[ FIELDS.TEACHING.CLASS.NONCANCELABLE_IN.key ] : 0

	const getValue = v => {
		return selectedRow[ v.key ];
	};

	const onChange = ( key, value ) => {
		if ( key === FIELDS.TEACHING.CLASS.PAY_TYPE.key ) {
			setPayType( value );
		}
	};

	const onOk = e => {
		e.preventDefault();

		// eslint-disable-next-line consistent-return
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			onSubmit( {
				...fieldsValue,
				id: getValue( FIELDS.TEACHING.CLASS.ID ),
				[ FIELDS.TEACHING.CLASS.VALUE_ADDED.key ]: fieldsValue[ FIELDS.TEACHING.CLASS.VALUE_ADDED.key ].join( ',' ),
				[ FIELDS.TEACHING.CLASS.DEPART_ID.key ]: fieldsValue[ FIELDS.TEACHING.CLASS.DEPART_ID.key ].join( ',' ),
				[ FIELDS.TEACHING.CLASS.INCLUDE_KM2.key ]: fieldsValue[ FIELDS.TEACHING.CLASS.INCLUDE_KM2.key ] ? 1 : 0,
				[ FIELDS.TEACHING.CLASS.NONCANCELABLE_BEFORE.key ]: fieldsValue[ FIELDS.TEACHING.CLASS.NONCANCELABLE_BEFORE.key ] ? fieldsValue[ FIELDS.TEACHING.CLASS.NONCANCELABLE_BEFORE.key ] : 0,
				[ FIELDS.TEACHING.CLASS.NONCANCELABLE_IN.key ]: fieldsValue[ FIELDS.TEACHING.CLASS.NONCANCELABLE_IN.key ] ? fieldsValue[ FIELDS.TEACHING.CLASS.NONCANCELABLE_IN.key ] : 0,
				// [ FIELDS.TEACHING.CLASS.WEEKDAY.key ]: ( getDictItemValue( dictionary, FIELDS.TEACHING.CLASS.WEEKDAY.dictionary, fieldsValue[ FIELDS.TEACHING.CLASS.WEEKDAY.key ] )( 'memo' ) || [] ).join( ',' ),
			} );
		} );
	};
	const onCancel = e => {
		e.preventDefault();

		setVisible( false );
	};

	return (
		<Modal
			destroyOnClose
			title={( getValue( FIELDS.TEACHING.CLASS.ID ) ? '修改' : '新增' ) + '班型'}
			width="90%"
			visible={visible}
			onOk={onOk}
			onCancel={onCancel}
			closable={true}
			maskClosable={false}
			keyboard={false}
			confirmLoading={loading}
			okText="提交"
			cancelText="取消"
			footer={status ? <Button type="default" onClick={onCancel}>关闭</Button> : [
				<Button type="default" key="close" onClick={onCancel}>关闭</Button>,
				<Button type="primary" key="confirm" onClick={onOk} loading={loading}>确定</Button> ]}
		>
			<Form onSubmit={onOk}>
				<Row gutter={24} style={{ marginBottom: 20 }}>
					<Col xs={24}><h2>基础信息</h2></Col>
					{
						[
							FIELDS.TEACHING.CLASS.NAME,
							{
								...FIELDS.TEACHING.CLASS.LICENSE_TYPE_ACTIVE,
								status: getValue( FIELDS.TEACHING.CLASS.ID ) ? 'disabled' : null,
							},
							{
								...FIELDS.TEACHING.CLASS.DEPART_ID_SCHOOL,
								mode: 'multiple',
							},
							{
								...FIELDS.TEACHING.CLASS.MATCH_MODE,
								dictSwitch: 1,
								// status: getValue( FIELDS.TEACHING.CLASS.ID ) ? 'disabled' : null,
							},
						].map( v =>
							<Col md={6} sm={24} key={v.key}>
								<WrapperComplexFormItem
									{...props}
									config={v}
									form={form}
									mode={v.mode}
									initialValue={getValue( v )}
									rules={[ { required: !v.notRequired, message: '该项为必填' } ]}
									style={{ marginBottom: 0 }}
									onChange={onChange}
									status={status || v.status}
								/>
							</Col>
						)
					}
				</Row>
				<Row gutter={24} style={{ marginBottom: 20 }}>
					<Col xs={24}><h2>约课规则</h2></Col>
					{
						[
							{
								...FIELDS.TEACHING.CLASS.BOOK_NUM,
								dictSwitch: 1,
								// status: getValue( FIELDS.TEACHING.CLASS.ID ) ? 'disabled' : null,
							},
							{
								...FIELDS.TEACHING.CLASS.WEEKDAY,
								dictSwitch: 1,
							},
							FIELDS.TEACHING.CLASS.PRE_DAYS,
							FIELDS.TEACHING.CLASS.LESSONS_PER_DAY,
							{
								...FIELDS.TEACHING.CLASS.NONCANCELABLE_IN,
								notRequired: true,
							},
							{
								...FIELDS.TEACHING.CLASS.NONCANCELABLE_BEFORE,
								notRequired: true,
							},
						].map( v =>
							<Col md={6} sm={24} key={v.key} style={{ height: '88px' }}>
								<WrapperComplexFormItem
									{...props}
									config={v}
									form={form}
									initialValue={getValue( v )}
									rules={[ { required: !v.notRequired, message: '该项为必填' } ]}
									style={{ marginBottom: 0 }}
									onChange={onChange}
									status={status || v.status}
								/>
							</Col>
						)
					}
				</Row>
				<Row gutter={24} style={{ marginBottom: 20 }}>
					<Col xs={24}><h2>增值服务</h2></Col>
					{
						[
							{
								...FIELDS.TEACHING.CLASS.VALUE_ADDED,
								notRequired: true,
							},
						].map( v =>
							<Col md={24} sm={24} key={v.key}>
								<WrapperComplexFormItem
									{...props}
									config={v}
									form={form}
									initialValue={getValue( v )}
									rules={[ { required: !v.notRequired, message: '该项为必填' } ]}
									style={{ marginBottom: 0 }}
									onChange={onChange}
									status={status || v.status}
								/>
							</Col>
						)
					}
				</Row>
				<Row gutter={24}>
					<Col xs={24}><h2>交费类型</h2></Col>
					{
						[
							{
								...FIELDS.TEACHING.CLASS.PAY_TYPE,
								status: getValue( FIELDS.TEACHING.CLASS.ID ) ? 'disabled' : null,
							},
							{...FIELDS.TEACHING.CLASS.MONEY, title: payType === 'down_pay' ? '首付款' : '班型费用'},
						].map( v =>
							<Col md={6} sm={24} key={v.key}>
								<WrapperComplexFormItem
									{...props}
									config={v}
									form={form}
									initialValue={getValue( v )}
									rules={[ { required: !v.notRequired, message: '该项为必填' } ]}
									style={{ marginBottom: 0 }}
									onChange={onChange}
									status={status || v.status}
								/>
							</Col>
						)
					}
				</Row>
				<Row gutter={24} style={{ marginBottom: 20 }}>
					{
						payType === 'down_pay' &&
						[
							<Col md={6} sm={24} key={FIELDS.TEACHING.CLASS.INCLUDE_KM2.key}>
								<WrapperComplexFormItem
									{...props}
									config={FIELDS.TEACHING.CLASS.INCLUDE_KM2}
									form={form}
									checkedChildren="是"
									unCheckedChildren="否"
									initialValue={getValue( FIELDS.TEACHING.CLASS.INCLUDE_KM2 ) == 1 ? true : false}
									rules={[ { required: true, message: '该项为必填' } ]}
									style={{ marginBottom: 0 }}
									onChange={onChange}
									status={status}
								/>
							</Col>,
							<Col md={6} sm={24} key={FIELDS.TEACHING.CLASS.BALANCE.key}>
								<WrapperComplexFormItem
									{...props}
									config={FIELDS.TEACHING.CLASS.BALANCE}
									form={form}
									checkedChildren="是"
									unCheckedChildren="否"
									initialValue={getValue( FIELDS.TEACHING.CLASS.BALANCE )}
									rules={[ { required: true, message: '该项为必填' } ]}
									style={{ marginBottom: 0 }}
									onChange={onChange}
									status={status}
								/>
							</Col>,
						]
					}
					{
						payType === 'lesson' && [
							FIELDS.TEACHING.CLASS.LESSONS_KM2,
							FIELDS.TEACHING.CLASS.LESSONS_KM3,
							// FIELDS.TEACHING.CLASS.FEE_KM2,
							// FIELDS.TEACHING.CLASS.FEE_KM3,
						].map( v =>
							<Col md={6} sm={24} key={v.key}>
								<WrapperComplexFormItem
									{...props}
									config={v}
									form={form}
									initialValue={getValue( v )}
									rules={[ { required: !v.notRequired, message: '该项为必填' } ]}
									style={{ marginBottom: 0 }}
									onChange={onChange}
									status={status || v.status}
								/>
							</Col>
						)
					}
					{
						[
							FIELDS.TEACHING.CLASS.FEE_KM2,
							FIELDS.TEACHING.CLASS.FEE_KM3,
						].map( v =>
							<Col md={6} sm={24} key={v.key}>
								<WrapperComplexFormItem
									{...props}
									config={v}
									form={form}
									initialValue={getValue( v )}
									rules={[ { required: !v.notRequired, message: '该项为必填' } ]}
									style={{ marginBottom: 0 }}
									onChange={onChange}
									status={status || v.status}
								/>
							</Col>
						)
					}
				</Row>
				<Row gutter={24}>
					<Col xs={24}><h2>班型简介</h2></Col>
					{
						[
							FIELDS.TEACHING.CLASS.MEMO,
						].map( v =>
							<Col md={12} sm={24} key={v.key}>
								<WrapperComplexFormItem
									{...props}
									config={v}
									form={form}
									checkedChildren="启用"
									unCheckedChildren="禁用"
									initialValue={getValue( v )}
									rules={[ { required: !v.notRequired, message: '该项为必填' } ]}
									style={{ marginBottom: 0 }}
									onChange={onChange}
									status={status || v.status}
								/>
							</Col>
						)
					}
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( ClassEditModal );
