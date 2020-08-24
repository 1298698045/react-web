import React from 'react';
import { Form, Modal, Col, Row, } from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import useGetInitialValue from '@/hooks/useGetInitialValue';

const EditModal = props => {
	const { handleSubmit, visible, setVisible, form, data, loading, afterClose, } = props;
	
	const getValue = useGetInitialValue( data );
	
	const submit = e => {
		e.preventDefault();
		
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			
			handleSubmit( {
				...fieldsValue,
				id: data.id,
			} );
		} );
	};
	
	return (
		<Modal
			title={data.id ? '编辑增值服务' : '新增增值服务'}
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
					<Col md={12} sm={24}>
						<WrapperComplexFormItem
							config={FIELDS.VALUE_ADDED.TITLE}
							initialValue={getValue( FIELDS.VALUE_ADDED.TITLE )}
							rules={[ { required: true, } ]}
							{...props}
						/>
					</Col>
					<Col md={12} sm={24}>
						<WrapperComplexFormItem
							config={FIELDS.VALUE_ADDED.AMOUNT}
							min={0}
							formatter={value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' )}
							parser={value => value.replace( /\$\s?|(,*)/g, '' )}
							initialValue={getValue( FIELDS.VALUE_ADDED.AMOUNT )}
							rules={[ { required: true, } ]}
							{...props}
						/>
					</Col>
					<Col sm={24}>
						<WrapperComplexFormItem
							config={FIELDS.VALUE_ADDED.DESCRIPTION}
							initialValue={getValue( FIELDS.VALUE_ADDED.DESCRIPTION )}
							rules={[]}
							{...props}
						/>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( EditModal );
