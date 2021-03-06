import React from 'react';
import { Form, Input, Modal, Spin } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";

const ArchiveRemarkModal = props => {
	const { selectedRows, onSubmit, visible, setVisible, form, loading } = props;

	const onOk = e => {
		e.preventDefault();

		// eslint-disable-next-line consistent-return
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			onSubmit( {
				...fieldsValue,
				studentId: selectedRows[0].id,
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
			title={"备注信息 - " + selectedRows.map( v => v[ FIELDS.STUDENT.NAME.key ] ).join( '、' )}
			width={360}
			visible={visible}
			onOk={onOk}
			onCancel={onCancel}
			closable={true}
			maskClosable={false}
			keyboard={false}
			confirmLoading={loading}
			okText="保存"
			cancelText="取消"
		>
			<Form onSubmit={onOk}>
				<WrapperComplexFormItem
					{...props}
					config={FIELDS.STUDENT.MEMO}
					form={form}
					// needLabel={false}
					// style={{ marginBottom: 0 }}
					rules={[ { required: true, message: '该项为必填' } ]}
				/>
			</Form>
		</Modal>
	);
};

export default Form.create()( ArchiveRemarkModal );
