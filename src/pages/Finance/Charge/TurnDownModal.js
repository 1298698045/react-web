import React from 'react';
import { Form, Modal, Col, Row, } from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';

const TurnDownModal = props => {
	const { handleSubmit, visible, setVisible, form, data, loading, afterClose } = props;
	
	const submit = e => {
		e.preventDefault();
		
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			
			handleSubmit( {
				params: {
					...fieldsValue,
					studentId: data.id,
				}
			} );
		} );
	};
	
	return (
		<Modal
			title={`驳回 - ${data[ FIELDS.FINANCE.NAME ]}`}
			visible={visible}
			onOk={submit}
			destroyOnClose
			afterClose={afterClose}
			confirmLoading={loading}
			closable={true}
			maskClosable={false}
			keyboard={false}
			onCancel={() => setVisible( false )}
		>
			<Form onSubmit={submit}>
				<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
					<Col sm={24}>
						<WrapperComplexFormItem
							config={{
								...FIELDS.STUDENT.REJECTION_REASON,
								type: 'textarea',
							}}
							form={form}
							rules={[ { required: true, } ]}
							{...props}
						/>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( TurnDownModal );
