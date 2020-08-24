import React, { memo } from 'react';
import { Form, Modal, } from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';

const SignUpMemoModal = props => {
	const { handleSubmit, visible, setVisible, form, data, loading, setNeedUpdate, } = props;
	
	const submit = e => {
		e.preventDefault();
		
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) return false;
			
			const { id, } = data;
			
			handleSubmit( {
				...fieldsValue,
				studentId: id,
			} );
		} );
	};
	
	return (
		<Modal
			title={`添加备注 - ${data[ FIELDS.STUDENT.NAME.key ]}`}
			afterClose={() => setNeedUpdate( true )}
			visible={visible}
			onOk={submit}
			confirmLoading={loading}
			destroyOnClose
			onCancel={() => setVisible( false )}
			closable={true}
			maskClosable={false}
			keyboard={false}
		>
			<Form onSubmit={submit} layout="vertical">
				<WrapperComplexFormItem
					style={{ marginBottom: 0, }}
					config={FIELDS.STUDENT.MEMO}
					form={form}
					rules={[ { required: true, } ]}
					{...props}
				/>
			</Form>
		</Modal>
	);
};

export default memo( Form.create()( SignUpMemoModal ) );
