import React, { useEffect, useState } from 'react';
import { Form, Modal, Col, Row, } from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import moment from 'moment';

const AddOtherRevenueModal = props => {
	const { handleSubmit, visible, setVisible, form, data, loading, afterClose, } = props;
	
	const submit = e => {
		e.preventDefault();
		
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			
			handleSubmit( {
				id: data.id,
				...fieldsValue,
				[ FIELDS.FINANCE.JOURNAL_DATE.key ]: moment( fieldsValue[ FIELDS.FINANCE.JOURNAL_DATE.key ] ).format( 'YYYY-MM-DD' )
			} );
		} );
	};
	
	return (
		<Modal
			title={data.id ? '修改其它营收' : '新增其它营收'}
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
					<Col sm={24}>
						<WrapperComplexFormItem
							config={FIELDS.FINANCE.JOURNAL_DATE}
							initialValue={data.id ? data[ FIELDS.FINANCE.JOURNAL_DATE.key ] : undefined}
							rules={[ { required: true, } ]}
							form={form}
						/>
					</Col>
					<Col sm={24}>
						<WrapperComplexFormItem
							config={FIELDS.FINANCE.JOURNAL_TARGET}
							initialValue={data.id ? data[ FIELDS.FINANCE.JOURNAL_TARGET.key ] : undefined}
							rules={[ { required: true, } ]}
							form={form}
						/>
					</Col>
					<Col sm={24}>
						<WrapperComplexFormItem
							config={FIELDS.FINANCE.JOURNAL_AMOUNT}
							rules={[ { required: true, } ]}
							initialValue={data.id ? data[ FIELDS.FINANCE.JOURNAL_AMOUNT.key ] : undefined}
							formatter={value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' )}
							parser={value => value.replace( /\$\s?|(,*)/g, '' )}
							form={form}
						/>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( AddOtherRevenueModal );
