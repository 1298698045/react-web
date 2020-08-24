import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input, Modal, Spin, Row, Col } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";

const RemarkModal = props => {
	const { studentId, onSubmit, visible, setVisible, form, loading } = props;

	const onOk = e => {
		e.preventDefault();

		// eslint-disable-next-line consistent-return
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			onSubmit( {
				...fieldsValue,
				studentId: studentId,
				action: 'BILL_MEMO'
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
			title="添加备注"
			width={350}
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
			<p style={{ color: 'red', fontSize: '12px', }}>注：这里添加的备注信息，会在收据中打印出来</p>
			<Form onSubmit={onOk}>
					{
						[
							FIELDS.TEACHING.COURSE.MEMO,
						].map( v =>
								<WrapperComplexFormItem key="memo"
									{...props}
									config={v}
									form={form}
									rules={[ { required: true, message: '该项为必填' } ]}
									style={{ marginBottom: 0 }}
								/>
						)
					}
			</Form>
		</Modal>
	);
};

export default Form.create()( RemarkModal );
