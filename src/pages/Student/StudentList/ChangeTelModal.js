import React from 'react';
import { Form, Modal, Col, Row, } from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';

const ChangeTelModal = props => {
	const { handleSubmit, visible, setVisible, form, selectedRows, afterClose, loading, } = props;
	
	const submit = e => {
		e.preventDefault();
		
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			
			handleSubmit( {
				params: {
					studentId: selectedRows[ 0 ].studentId,
					[ FIELDS.STUDENT.MOBILE.key ]: fieldsValue[ FIELDS.STUDENT.MOBILE.key ],
				}
			} );
		} );
	};
	
	return (
		<Modal
			afterClose={afterClose}
			title={`修改手机号 - ${selectedRows.length === 1 && selectedRows[ 0 ][ FIELDS.STUDENT.NAME.key ]}`}
			destroyOnClose
			visible={visible && selectedRows.length === 1}
			onOk={submit}
			confirmLoading={loading}
			onCancel={() => setVisible( false )}
			closable={true}
			maskClosable={false}
			keyboard={false}
		>
			<Form onSubmit={submit}>
				<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
					<Col md={12} sm={24}>
						<WrapperComplexFormItem
							config={FIELDS.STUDENT.MOBILE}
							form={form}
							rules={[ { required: true, } ]}
						/>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( ChangeTelModal );
