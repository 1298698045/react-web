import React from 'react';
import { Form, Modal, Col, Row, } from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';

const DropOutModal = props => {
	const { handleSubmit, visible, setVisible, form, selectedRows, afterClose, loading, } = props;
	const submit = e => {
		e.preventDefault();
		
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				console.log( err, fieldsValue );
				
				return false;
			}
			
			handleSubmit( {
				params: {
					studentId: selectedRows[ 0 ].studentId,
					reason: fieldsValue.reason,
					[ FIELDS.STUDENT.MEMO.key ]: fieldsValue[ FIELDS.STUDENT.MEMO.key ],
				},
			} );
		} );
	};
	
	return (
		<Modal
			afterClose={afterClose}
			title={`退学 - ${selectedRows.length === 1 && selectedRows[ 0 ][ FIELDS.STUDENT.NAME.key ]}`}
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
							config={{
								key: 'reason',
								title: '退学原因',
								type: 'select',
								dictionary: 'quit_reason',
							}}
							form={form}
							rules={[ { required: true, } ]}
							{...props}
						/>
					</Col>
				</Row>
				<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
					<Col sm={24}>
						<WrapperComplexFormItem
							config={FIELDS.STUDENT.MEMO}
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

export default Form.create()( DropOutModal );
