import React from 'react';
import { Form, Modal, Col, Row, message, } from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';

const AddKmModal = props => {
	const { handleSubmit, visible, setVisible, form, selectedRows, afterClose, loading, } = props;
	
	const submit = e => {
		e.preventDefault();
		
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				console.log( err, fieldsValue );
				
				return false;
			}
			
			const { apply } = selectedRows[ 0 ];
			const { insteadKm2, insteadKm3 } = apply;
			
			if ( fieldsValue[ FIELDS.STUDENT.KM.key ] === 'km2' && String( insteadKm2 ) === '1' ) {
				message.info( '该科目不允许重复代培！' );
				return false;
			}
			
			if ( fieldsValue[ FIELDS.STUDENT.KM.key ] === 'km3' && String( insteadKm3 ) === '1' ) {
				message.info( '该科目不允许重复代培！' );
				return false;
			}
			
			const data = {
				studentId: selectedRows[ 0 ].studentId,
				newValue: fieldsValue[ FIELDS.STUDENT.KM.key ],
				[ FIELDS.FINANCE.AMOUNT.key ]: fieldsValue[ FIELDS.FINANCE.AMOUNT.key ],
			};
			
			if ( fieldsValue[ FIELDS.STUDENT.MEMO.key ] ) {
				data[ FIELDS.STUDENT.MEMO.key ] = fieldsValue[ FIELDS.STUDENT.MEMO.key ];
			}
			
			handleSubmit( {
				params: data,
			} );
		} );
	};
	
	return (
		<Modal
			afterClose={afterClose}
			title={`添加科目 - ${selectedRows.length === 1 && selectedRows[ 0 ][ FIELDS.STUDENT.NAME.key ]}`}
			destroyOnClose
			visible={visible && selectedRows.length === 1}
			onOk={submit}
			onCancel={() => setVisible( false )}
			closable={true}
			maskClosable={false}
			keyboard={false}
			confirmLoading={loading}
		>
			<Form onSubmit={submit}>
				<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
					<Col md={12} sm={24}>
						<WrapperComplexFormItem
							config={{
								...FIELDS.STUDENT.KM,
								title: '选择科目',
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
					<Col md={12} sm={24}>
						<WrapperComplexFormItem
							config={{
								...FIELDS.FINANCE.AMOUNT,
								title: '代培费用',
							}}
							form={form}
							formatter={value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' )}
							parser={value => value.replace( /\$\s?|(,*)/g, '' )}
							min={0}
							rules={[ { required: true, } ]}
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

export default Form.create()( AddKmModal );
