import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input, Modal, Spin, Row, Col } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";

const PositionEditModal = props => {
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
				id: selectedRow.id,
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
			title={( selectedRow[ FIELDS.EMPLOYEE.ID.key ] ? '修改' : '新增' ) + '职务'}
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
					{
						[
							FIELDS.ORG.POSITION_NAME,
							FIELDS.ORG.POSITION_LEVEL,
							{
								...FIELDS.ORG.POSITION_TYPE,
								status: selectedRow.id ? 'disabled' : 'edit',
							},
							{
								...FIELDS.ORG.POSITION_MEMO,
								notRequired: true,
							},
						].map( v =>
							<Col xs={24} key={v.key}>
								<WrapperComplexFormItem
									{...props}
									config={v}
									form={form}
									initialValue={selectedRow[ v.key ]}
									rules={[ { required: !v.notRequired, message: '该项为必填' } ]}
									style={{ marginBottom: 0 }}
									status={v.status}
								/>
							</Col>
						)
					}
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( PositionEditModal );
