import React from 'react';
import { Form, Modal, Col, Row, } from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';

const ReportModal = props => {
	const { handleSubmit, visible, setVisible, form, selectedRows, payType, loading, afterClose, } = props;
	
	const submit = e => {
		e.preventDefault();
		
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			
			handleSubmit( {
				params: {
					...fieldsValue,
					id: selectedRows[ 0 ].id,
				}
			} );
		} );
	};
	
	return (
		<Modal
			title={`提报 - ${selectedRows[ 0 ] && selectedRows[ 0 ][ FIELDS.FINANCE.NAME.key ]}`}
			width="90%"
			visible={visible}
			afterClose={afterClose}
			onOk={submit}
			destroyOnClose
			confirmLoading={loading}
			onCancel={() => setVisible( false )}
			closable={true}
			maskClosable={false}
			keyboard={false}
		>
			<Form onSubmit={submit}>
				<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
					<Col md={6} sm={24}>
						<WrapperComplexFormItem
							config={{
								...FIELDS.FINANCE.AMOUNT,
								title: '退费金额',
								type: 'inputNumber'
							}}
							formatter={value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' )}
							parser={value => value.replace( /\$\s?|(,*)/g, '' )}
							min={0}
							rules={[ { required: true, } ]}
							form={form}
						/>
					</Col>
					<Col sm={24}>
						<WrapperComplexFormItem
							config={FIELDS.STUDENT.MEMO}
							form={form}
						/>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( ReportModal );
