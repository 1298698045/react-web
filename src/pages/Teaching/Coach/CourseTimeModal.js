import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input, Modal, Spin, Row, Col } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";

const CourseTimeModal = props => {
	const {  selectedRows, onSubmit, visible, setVisible, form, loading } = props;

	const onOk = e => {
		e.preventDefault();

		// eslint-disable-next-line consistent-return
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			onSubmit( {
				...fieldsValue,
				employeeIds: selectedRows.map( v => v.employeeId ),
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
			title="批量更改教学时段"
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
			<Form onSubmit={onOk}>
				<Row gutter={24}>
					<WrapperComplexFormItem 
						{...props}
						config={FIELDS.EMPLOYEE.COACH_INFO.LESSON_ID_ACTIVE}
						form={form}
						rules={[ { required: true, message: '该项为必填' } ]}
						style={{ marginBottom: 0 }}
					/>
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( CourseTimeModal );
