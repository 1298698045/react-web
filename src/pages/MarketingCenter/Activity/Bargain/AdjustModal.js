import React from 'react';
import { Form, Modal, Col, Row} from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import useGetInitialValue from '@/hooks/useGetInitialValue';
import moment from 'moment';

const AdjustModal = props => {
	const { handleSubmit, visible, setVisible, form, data, loading, afterClose, } = props;
	const getValue = useGetInitialValue( data );
	let FORM = FIELDS.ACTIVITY.FORM
	const submit = e => {
		e.preventDefault();
		
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}		
			const submitData = {
				[ FORM.SORT.key ]: fieldsValue[ FORM.SORT.key ],
				[ FORM.END_DATE.key ]: moment( fieldsValue[ FORM.END_DATE.key ] ).format( 'YYYY-MM-DD HH:mm:ss' ),
				id: data.id,
			};
			handleSubmit( submitData );
		} );
	};
	return (
		<Modal
			title={'活动调整'}
			visible={visible}
			afterClose={afterClose}
			onOk={submit}
			destroyOnClose
			confirmLoading={loading}
			onCancel={() => setVisible( false )}
		>
			<Form onSubmit={submit}>
				<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
					<Col md={24} sm={24}>
						<Form.Item label={FORM.NAME.title} style={{display: 'flex'}}>
							<span className="ant-form-text">{getValue(FORM.NAME)}</span>
						</Form.Item>
					</Col>
					<Col md={24} sm={24}>
						<WrapperComplexFormItem
							config={FORM.END_DATE}
							initialValue={getValue( FORM.END_DATE )}
							rules={[{ required: true }]}
							{...props}
						/>
					</Col>	
					<Col md={24} sm={24}>
						<WrapperComplexFormItem
							config={FORM.SORT}
							initialValue={getValue( FORM.SORT )}
							{...props}
						/>
					</Col>		
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( AdjustModal );
