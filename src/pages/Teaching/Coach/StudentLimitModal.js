import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input, Modal, Spin, Row, Col } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";

const StudentLimitModal = props => {
	const {  selectedRows, onSubmit, visible, setVisible, form, loading } = props;

	const onOk = e => {
		e.preventDefault();

		// eslint-disable-next-line consistent-return
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			onSubmit({
				bookNum: fieldsValue.bookNum.join(','),
				employeeIds: selectedRows.map( v => v.employeeId ),
			});
		} );
	};
	const onCancel = e => {
		e.preventDefault();

		setVisible( false );
	};

	return (
		<Modal
			destroyOnClose
			title="批量更改学员上限"
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
					<Col>
						<WrapperComplexFormItem  className="customer-checkbox"
							{...props}
							config={{...FIELDS.EMPLOYEE.COACH_INFO.BOOK_NUM, title: '学员上限人/车'}}
							form={form}
							rules={[ { required: true, message: '该项为必填' } ]}
							style={{ marginBottom: 0 }}
						/>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( StudentLimitModal );
