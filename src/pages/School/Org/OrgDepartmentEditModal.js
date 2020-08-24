import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input, Modal, Spin, Row, Col } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from '@/config/fields';
import { queryDictionary } from '@/utils/dictionaryUtil';

const AppointmentEditModal = props => {
	const { dispatch, selectedRow, onSubmit, visible, setVisible, form, loading } = props;
	const [ departType, setDepartType ] = useState();
	const [ departs, setDeparts ] = useState( [] );

	useEffect( () => {
		queryDictionary( dispatch, 'depart_id' ).then( data => {
			console.log('************', data)
			setDeparts( data.filter( d => d.dKey != selectedRow.id ) );
		} );
	}, [ visible ] );

	const onOk = e => {
		e.preventDefault();

		// eslint-disable-next-line consistent-return
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			onSubmit( {
				...fieldsValue,
				[ FIELDS.ORG.DEPART_ID.key ]: selectedRow[ FIELDS.ORG.DEPART_ID.key ],
			} );
		} );
	};
	const onCancel = e => {
		e.preventDefault();

		setVisible( false );
	};

	const onChange = ( key, value ) => {
		if ( key === FIELDS.ORG.DEPART_TYPE.key ) {
			setDepartType( value );
		}
	};

	return (
		<Modal
			destroyOnClose
			title={( selectedRow[ FIELDS.ORG.DEPART_ID.key ] ? '修改' : '新增' ) + '组织架构'}
			visible={visible}
			onOk={onOk}
			onCancel={onCancel}
			closable={true}
			maskClosable={false}
			keyboard={false}
			confirmLoading={loading}
			okText="提交"
			cancelText="取消"
		>
			<Form onSubmit={onOk}>
				<Row gutter={24}>
					{
						[
							FIELDS.ORG.DEPART_TYPE,
							FIELDS.ORG.DEPART_NAME,
							{
								...FIELDS.ORG.DEPART_PARENT,
								notRequired: true,
								hidden: departType === 'school',
								values: departs,
							},
							FIELDS.ORG.DEPART_ORDER,
							{
								...FIELDS.ORG.DEPART_MEMO,
								notRequired: true,
							},
						].map( v =>
							!v.hidden && <Col xs={24} key={v.key}>
								<WrapperComplexFormItem
									{...props}
									config={v}
									form={form}
									initialValue={selectedRow[ v.key ] || undefined}
									rules={[ { required: !v.notRequired, message: '该项为必填' } ]}
									style={{ marginBottom: 0 }}
									onChange={onChange}
									values={v.values}
								/>
							</Col>
						)
					}
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( AppointmentEditModal );
