import React, { useEffect, useState } from 'react';
import { Form, Modal, Col, Row, } from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';

const PaymentFeeModal = props => {
	const { handleSubmit, visible, setVisible, dispatch, form, selectedRows, afterClose, loading, } = props;
	const [ feeList, setFeeList ] = useState( [] );
	const [ fee, setFee ] = useState( [] );
	useEffect( () => {
		dispatch( {
			type: 'studentStudyingLocalList/getFee',
			payload: {
				params: {
					feeType: 'resit',
				},
			},
		} ).then( feeList => {
			setFeeList( feeList );
		} )
	}, [] );
	
	const onChange = ( key, value ) => {
		if ( key === FIELDS.STUDENT.KM.key ) {
			if ( feeList.length > 0 ) {
				const lic = selectedRows[ 0 ][ FIELDS.STUDENT.LICENSE_TYPE.key ];
				const kmCode = value;
				const current = feeList.find( f => (f[ FIELDS.STUDENT.LICENSE_TYPE.key ] === lic) && (f[ 'kmCode' ] === kmCode) );
				
				if ( current ) {
					const { amount } = current;
					setFee( amount );
				} else {
					setFee( 0 );
				}
			}
		}
	};
	
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
					[ FIELDS.STUDENT.KM.key ]: fieldsValue[ FIELDS.STUDENT.KM.key ],
					[ FIELDS.FINANCE.AMOUNT.key ]: fee,
				}
			} );
		} );
	};
	
	return (
		<Modal
			title={`收补考费 - ${selectedRows.length === 1 ? selectedRows[ 0 ][ FIELDS.STUDENT.NAME.key ] : ''}`}
			destroyOnClose
			afterClose={afterClose}
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
							config={FIELDS.STUDENT.NAME}
							form={form}
							initialValue={selectedRows.length === 1 && selectedRows[ 0 ][ FIELDS.STUDENT.NAME.key ]}
							status="read"
							{...props}
						/>
					</Col>
					<Col md={12} sm={24}>
						<WrapperComplexFormItem
							config={FIELDS.STUDENT.LICENSE_TYPE}
							form={form}
							initialValue={selectedRows.length === 1 && selectedRows[ 0 ][ FIELDS.STUDENT.LICENSE_TYPE.key ]}
							status="read"
							rules={[ { required: true, } ]}
							{...props}
						/>
					</Col>
					<Col md={12} sm={24}>
						<WrapperComplexFormItem
							config={FIELDS.STUDENT.KM}
							form={form}
							onChange={onChange}
							rules={[ { required: true, } ]}
							{...props}
						/>
					</Col>
					<Col md={12} sm={24}>
						<WrapperComplexFormItem
							config={{
								title: '补考费用',
								key: 'feeAmount',
								type: 'input'
							}}
							form={form}
							initialValue={`${fee}元`}
							status="read"
							rules={[ { required: true, } ]}
							{...props}
						/>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( PaymentFeeModal );
