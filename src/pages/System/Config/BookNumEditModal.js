import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input, Modal, Spin, Row, Col } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";

const BookNumEditModal = props => {
	const { selectedRow, onSubmit, visible, setVisible, form, loading } = props;

	const onOk = e => {
		e.preventDefault();

		// eslint-disable-next-line consistent-return
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			onSubmit( {
				...fieldsValue,
				[ FIELDS.SYSTEM.DICT.KEY.key ]: selectedRow[ FIELDS.SYSTEM.DICT.KEY.key ],
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
			title={( selectedRow[ FIELDS.SYSTEM.DICT.KEY.key ] ? '修改' : '新增' ) + FIELDS.SYSTEM.BOOK_NUM.VALUE.title}
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
							FIELDS.SYSTEM.BOOK_NUM.VALUE,
						].map( v =>
							<Col xs={24} md={24} key={v.key}>
								<WrapperComplexFormItem
									{...props}
									config={v}
									form={form}
									initialValue={selectedRow[ v.key ]}
									rules={[ { required: true, message: '该项为必填' }, {
										pattern: /^[1-9]\d*$/,
										message: '该项必须为正整数'
									} ]}
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

export default Form.create()( BookNumEditModal );
