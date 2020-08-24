import React from 'react';
import { Form, Modal, Col, Row, message, } from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';


const HelpModal = props => {
	const { handleSubmit, visible, setVisible, form, selectedRows, loading, afterClose, } = props;
	
	const submit = e => {
		e.preventDefault();
		
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			if ( fieldsValue[ FIELDS.STUDENT.KM.key ] === 'km2' && String( selectedRows[ 0 ].km2Status ) === '6' ) {
				message.info( '该科目正在委培进行中！' );
				return false;
			}
			
			if ( fieldsValue[ FIELDS.STUDENT.KM.key ] === 'km3' && String( selectedRows[ 0 ].km3Status ) === '6' ) {
				message.info( '该科目正在委培进行中！' );
				return false;
			}
			
			handleSubmit( {
				params: {
					studentId: selectedRows[ 0 ].studentId,
					[ FIELDS.STUDENT.KM.key ]: fieldsValue[ FIELDS.STUDENT.KM.key ],
					[ FIELDS.STUDENT.COOPERATION_UNIT.key ]: fieldsValue[ FIELDS.STUDENT.COOPERATION_UNIT.key ],
				},
			} );
		} );
	};
	
	return (
		<Modal
			title={`委培 - ${selectedRows.length === 1 && selectedRows[ 0 ][ FIELDS.STUDENT.NAME.key ]}`}
			destroyOnClose
			visible={visible && selectedRows.length === 1}
			onOk={submit}
			confirmLoading={loading}
			onCancel={() => setVisible( false )}
			closable={true}
			maskClosable={false}
			keyboard={false}
			afterClose={afterClose}
		>
			<Form onSubmit={submit}>
				<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
					<Col md={12} sm={24}>
						<WrapperComplexFormItem
							config={FIELDS.STUDENT.COOPERATION_UNIT}
							form={form}
							rules={[ { required: true, } ]}
						/>
					</Col>
					<Col md={12} sm={24}>
						<WrapperComplexFormItem
							config={{
								...FIELDS.STUDENT.KM,
								title: '委培科目',
							}}
							values={[
								{
									dKey: 'km2',
									dValue: '科目二',
								},
								{
									dKey: 'km3',
									dValue: '科目三',
								}
							]}
							form={form}
							rules={[ { required: true, } ]}
						/>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( HelpModal );
