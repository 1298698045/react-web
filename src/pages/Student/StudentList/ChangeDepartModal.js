import React from 'react';
import { Form, Modal, Row, Col, } from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';

const ChangeDepartModal = props => {
	const { handleSubmit, visible, setVisible, form, selectedRows, loading, afterClose, cooperationUnits } = props;
	const submit = e => {
		e.preventDefault();
		
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			
			const { km, studentId } = selectedRows[ 0 ];
			
			handleSubmit( {
				params: {
					studentId,
					km,
					[ FIELDS.STUDENT.COOPERATION_UNIT.key ]: fieldsValue[ FIELDS.STUDENT.COOPERATION_UNIT.key ],
				}
			} );
		} );
	};
	
	return (
		<Modal
			afterClose={afterClose}
			title={`更换外协机构 - ${selectedRows.length === 1 && selectedRows[ 0 ][ FIELDS.STUDENT.NAME.key ]}`}
			visible={visible && selectedRows.length === 1}
			destroyOnClose
			confirmLoading={loading}
			onOk={submit}
			onCancel={() => setVisible( false )}
			closable={true}
			maskClosable={false}
			keyboard={false}
		>
			<Form onSubmit={submit}>
				<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
					<Col md={12} sm={24}>
						<WrapperComplexFormItem
							config={FIELDS.STUDENT.COOPERATION_UNIT}
							values={cooperationUnits ? cooperationUnits.filter( ( { coopType } ) => coopType.split( ',' ).includes( '2' ) ) : []}
							form={form}
							rules={[ { required: true, } ]}
						/>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( ChangeDepartModal );
