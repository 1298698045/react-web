import React from 'react';
import { Form, Input, Modal, Spin } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";

const ArchiveFinishModal = props => {
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
				studentIds: selectedRows.map( v => v.id ).join( ',' ),
				[ FIELDS.STUDENT.ARCHIVE_FINISH_DATE.key ]: fieldsValue[ FIELDS.STUDENT.ARCHIVE_FINISH_DATE.key ].format( 'YYYY-MM-DD' ),
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
			title={"完成建档 - " + selectedRows.map( v => v[ FIELDS.STUDENT.NAME.key ] ).join( '、' )}
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
					config={FIELDS.STUDENT.ARCHIVE_FINISH_OPERATOR}
					form={form}
					// style={{ marginBottom: 0 }}
					rules={[ { required: true, message: '该选项为必填' } ]}
					useDefault={true}
				/>
				<WrapperComplexFormItem
					{...props}
					config={FIELDS.STUDENT.ARCHIVE_FINISH_DATE}
					form={form}
					// style={{ marginBottom: 0 }}
					rules={[ { required: true, message: '该选项为必填' } ]}
					initialValue={Date.now()}
				/>
			</Form>
		</Modal>
	);
};

export default Form.create()( ArchiveFinishModal );
