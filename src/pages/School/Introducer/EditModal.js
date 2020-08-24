import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input, Modal, Spin, Row, Col } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
import useGetInitialValue from '@/hooks/useGetInitialValue';

const EditModal = props => {
	const { selectedRow, onSubmit, visible, setVisible, form, loading } = props;

	const getValue = useGetInitialValue( selectedRow );

	const onOk = e => {
		e.preventDefault();

		// eslint-disable-next-line consistent-return
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			onSubmit( {
				...fieldsValue,
				status: '1',
				[ FIELDS.ORG.COLLA_ID.key ]: selectedRow[ FIELDS.ORG.COLLA_ID.key ],
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
			title={( selectedRow[ FIELDS.ORG.COLLA_ID.key ] ? '修改' : '新增' ) + '校外介绍人'}
			width={700}
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
							FIELDS.ORG.INTRODUCER_NAME,
							FIELDS.ORG.INTRODUCER_SEX,
							FIELDS.ORG.INTRODUCER_MOBILE,
							FIELDS.ORG.INTRODUCER_ADDRESS,
							FIELDS.ORG.INTRODUCER_MEMO,
						].map( v =>
							<Col xs={24} md={12} key={v.key}>
								<WrapperComplexFormItem
									{...props}
									config={v}
									form={form}
									initialValue={v.value || getValue( v )}
									rules={[ { required: v.required, message: '该项为必填' } ]}
									style={{ marginBottom: 0 }}
								/>
							</Col>
						)
					}
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( EditModal );
