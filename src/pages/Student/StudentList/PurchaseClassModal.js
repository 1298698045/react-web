import React, { useEffect, useState } from 'react';
import { Form, Modal, Button, Spin, Col, Row, Divider,message  } from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import { getDictItem, queryDictionary } from '@/utils/dictionaryUtil';


const PurchaseClassModal = props => {
	const { handleSubmit, visible, setVisible, form, selectedRows, dictionary, dispatch, afterClose, loading, } = props;
	const [ total, setTotal ] = useState( 0 );
	const [ fee, setFee ] = useState( {
		k2Fee: 0,
		k3Fee: 0,
	} );
	
	useEffect( () => {
		queryDictionary( dispatch, 'class_id' );
	}, [] );
	
	useEffect( () => {
		if ( selectedRows.length === 1 ) {
			const item = getDictItem( dictionary, 'class_id', selectedRows[ 0 ][ FIELDS.STUDENT.CLASS_ID.key ] );
			
			if ( item ) {
				setFee( {
					k2Fee: item[ FIELDS.TEACHING.CLASS.FEE_KM2.key ],
					k3Fee: item[ FIELDS.TEACHING.CLASS.FEE_KM3.key ],
				} )
			}
		}
		
	}, [ dictionary, selectedRows ] );
	
	const submit = e => {
		e.preventDefault();
		
		form.validateFields( ( err, fieldsValue ) => {
			console.log( err, fieldsValue );
			if ( err ) {
				console.log( err, fieldsValue );
				
				return false;
			}
			if (!form.getFieldValue( FIELDS.FINANCE.KM2_LESSON.key ) && !form.getFieldValue( FIELDS.FINANCE.KM3_LESSON.key ) ) {
				message.error( '科目二和科目三至少必填一项' );
				return false
			}
			const km2LessonAmount = fee.k2Fee * form.getFieldValue( FIELDS.FINANCE.KM2_LESSON.key ) || 0;
			const km3LessonAmount = fee.k3Fee * form.getFieldValue( FIELDS.FINANCE.KM3_LESSON.key ) || 0;
		
			// const total = km2LessonAmount + km3LessonAmount;
			const total = form.getFieldValue( FIELDS.FINANCE.TOTAL.key ) || 0;
			const memo = form.getFieldValue( FIELDS.TEACHING.COURSE.MEMO.key ) || '';
			
			handleSubmit( {
				params: {
					...fieldsValue,
					studentId: selectedRows[ 0 ].studentId,
					km2LessonAmount,
					km3LessonAmount,
					total,
					memo
				}
			} );
		} );
	};
	const change = () => {
		setTotal((fee.k2Fee * form.getFieldValue( FIELDS.FINANCE.KM2_LESSON.key ) || 0) + (fee.k3Fee * form.getFieldValue( FIELDS.FINANCE.KM3_LESSON.key ) || 0))
	}
	return (
		<Modal
			afterClose={afterClose}
			title={`购买课时 - ${selectedRows.length === 1 && selectedRows[ 0 ][ FIELDS.STUDENT.NAME.key ]}`}
			destroyOnClose
			visible={visible && selectedRows.length === 1}
			onOk={submit}
			onCancel={() => setVisible( false )}
			confirmLoading={loading}
			closable={true}
			maskClosable={false}
			keyboard={false}
		>
			<Form onSubmit={submit}>
				<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
					<Col sm={12}>
						<WrapperComplexFormItem
							config={FIELDS.FINANCE.KM2_LESSON}
							addonAfter={`课时 ${fee.k2Fee * form.getFieldValue( FIELDS.FINANCE.KM2_LESSON.key ) || 0}元`}
							form={form}
							initialValue={0}
							// rules={[ { required: true, } ]}
							{...props}
							onChange={change}
						/>
					</Col>
					<Col sm={12}>
						<WrapperComplexFormItem
							config={FIELDS.FINANCE.KM3_LESSON}
							addonAfter={`课时 ${fee.k3Fee * form.getFieldValue( FIELDS.FINANCE.KM3_LESSON.key ) || 0}元`}
							initialValue={0}
							form={form}
							// rules={[ { required: true, } ]}
							{...props}
							onChange={change}
						/>
					</Col>
					<Col sm={12}>
						<WrapperComplexFormItem
							config={
								{
									...FIELDS.FINANCE.TOTAL,
									title: '总费用'
								}
							}
							status="read"
							addonAfter='元'
							initialValue={total}
							// addonAfter={`总费用 ${(fee.k2Fee * form.getFieldValue( FIELDS.FINANCE.KM2_LESSON.key ) || 0) + (fee.k3Fee * form.getFieldValue( FIELDS.FINANCE.KM3_LESSON.key ) || 0)}元`}
							form={form}
							rules={[ { required: true, } ]}
							{...props}
						/>
					</Col>
					<Col sm={24}>
						<WrapperComplexFormItem
							config={ FIELDS.TEACHING.COURSE.MEMO }
							form={form}
							{...props}
						/>
					</Col>
				</Row>
				{/* <Row gutter={{ xs: 8, sm: 16, md: 20, }}>
					<Col
						sm={24}>总费用：{(fee.k2Fee * form.getFieldValue( FIELDS.FINANCE.KM2_LESSON.key ) || 0) + (fee.k3Fee * form.getFieldValue( FIELDS.FINANCE.KM3_LESSON.key ) || 0)}元</Col>
				</Row> */}
			</Form>
		</Modal>
	);
};

export default Form.create()( PurchaseClassModal );
