import React from 'react';
import { Form, Input, Modal, Spin } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";

const ArchiveIDModal = props => {
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
			title={"修改档案编号 - " + selectedRow[ FIELDS.STUDENT.NAME.key ]}
			width={360}
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
				<WrapperComplexFormItem
					{...props}
					config={FIELDS.STUDENT.ARCHIVE_ID}
					form={form}
					initialValue={selectedRow[ FIELDS.STUDENT.ARCHIVE_ID.key ]}
					// style={{ marginBottom: 0 }}
					rules={[ { required: true, message: '该项为必填' } ]}
				/>
			</Form>
		</Modal>
	);
};

export default Form.create()( ArchiveIDModal );
