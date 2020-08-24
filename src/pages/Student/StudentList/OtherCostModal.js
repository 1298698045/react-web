import React, { useState } from 'react';
import { useGetSet, useUpdateEffect } from 'react-use';
import { Form, Modal, Col, Row, Divider, Descriptions, } from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';

const { Item } = Descriptions;

const OtherCostModal = props => {
	const { handleSubmit, visible, setVisible, form, data, dictionary, afterClose, loading, } = props;
	const [ costKm, setCostKm ] = useState();

	const submit = e => {
		e.preventDefault();
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			handleSubmit( {
				params: {
					action: 'other_income_type_manage',
					studentId: data.studentId,
					...fieldsValue,
					[ FIELDS.STUDENT.OTHER_COST_DATE.key ]: fieldsValue[ FIELDS.STUDENT.OTHER_COST_DATE.key ].format( 'YYYY-MM-DD' ),
				}
			} );
		} );
	};

	const onChange = ( key, val ) => {
		switch ( key ) {
			case FIELDS.STUDENT.OTHER_COST_TYPE.key:
				setCostKm( val );
				break;
		}
	};

	return (
		<Modal
			title={`新增其它业务收入`}
			visible={visible}
			afterClose={afterClose}
			width={600}
			onOk={submit}
			destroyOnClose
			confirmLoading={loading}
			onCancel={() => setVisible( false )}
			closable={true}
			maskClosable={false}
			keyboard={false}
		>
			<Form onSubmit={submit}>
				{
					visible && <Row gutter={{ xs: 8, sm: 16, md: 20, }}>
						{
							[
								FIELDS.STUDENT.OTHER_COST_TYPE,
								{
									...FIELDS.STUDENT.OTHER_COST_KM,
									dictionary: costKm,
								},
								FIELDS.STUDENT.OTHER_COST_DATE,
								FIELDS.STUDENT.OTHER_COST_AMOUNT,
								{
									...FIELDS.STUDENT.OTHER_COST_MEMO,
									notRequired: true,
								},
							].map( v =>
								<Col xs={24} md={12} key={v.key}>
									<WrapperComplexFormItem
										{...props}
										config={v}
										form={form}
										rules={[ { required: !v.notRequired, message: '该项为必填' } ]}
										style={{ marginBottom: 0 }}
										onChange={onChange}
									/>
								</Col>
							)
						}
					</Row>
				}
			</Form>
		</Modal>
	);
};

export default Form.create()( OtherCostModal );
