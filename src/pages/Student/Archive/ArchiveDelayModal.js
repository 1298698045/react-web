import React from 'react';
import { Form, Input, Modal, Spin } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
import styles from './Archive.less';

const ArchiveDelayModal = props => {
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
				[ FIELDS.STUDENT.ARCHIVE_DELAY_REASON.key ]: fieldsValue[ FIELDS.STUDENT.ARCHIVE_DELAY_REASON.key ].join( ',' ),
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
			title={"暂缓建档 - " + selectedRows.map( v => v[ FIELDS.STUDENT.NAME.key ] ).join( '、' )}
			width={360}
			visible={visible}
			onOk={onOk}
			onCancel={onCancel}
			closable={true}
			maskClosable={false}
			keyboard={false}
			confirmLoading={loading}
			okText="确认"
			cancelText="取消"
		>
			<Form onSubmit={onOk} className={styles.checkboxGroup}>
				<WrapperComplexFormItem className="zh-customer-checkbox"
					{...props}
					config={FIELDS.STUDENT.ARCHIVE_DELAY_REASON}
					form={form}
					// style={{ marginBottom: 0 }}
					rules={[ { required: true, message: '该项为必填' } ]}
				/>
			</Form>
		</Modal>
	);
};

export default Form.create()( ArchiveDelayModal );
