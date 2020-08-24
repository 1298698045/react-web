import React from 'react';
import { Form, Input, Modal, Spin, Row, Col } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from '@/config/fields';

const AppointmentEditModal = props => {
	const { selectedRow, onSubmit, visible, setVisible, form, loading } = props;
	
	const onOk = e => {
		e.preventDefault();
		
		// eslint-disable-next-line consistent-return
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			onSubmit( {
				...fieldsValue,
				id: selectedRow.id,
				[ FIELDS.STUDENT.EXAM_APPOINT_DATE.key ]: fieldsValue[ FIELDS.STUDENT.EXAM_APPOINT_DATE.key ].format( 'YYYY-MM-DD' ),
				[ FIELDS.STUDENT.EXAM_DATE.key ]: fieldsValue[ FIELDS.STUDENT.EXAM_DATE.key ].format( 'YYYY-MM-DD' ),
			} );
		} );
	};
	const onCancel = e => {
		e.preventDefault();
		
		setVisible( false );
	};
	
	return (
		<Modal
			destroyOnClose
			title={(selectedRow[ FIELDS.STUDENT.NAME.key ] ? '修改' : '录入') + '约考信息'}
			width="90%"
			visible={visible}
			onOk={onOk}
			onCancel={onCancel}
			closable={true}
			maskClosable={false}
			keyboard={false}
			confirmLoading={loading}
			okText="提交"
			cancelText="取消"
		>
			<Form onSubmit={onOk}>
				<Row gutter={24}>
					{
						[
							FIELDS.STUDENT.NAME,
							{...FIELDS.STUDENT.EXAM_STUDY_ID, notRequired: true},
							FIELDS.STUDENT.IDCARD_NO,
							FIELDS.STUDENT.EXAM_CAR_TYPE,
							{
								...FIELDS.STUDENT.EXAM_KM,
								// values: [ {
								// 	dKey: '科目二',
								// 	dValue: '科目二',
								// }, {
								// 	dKey: '科目三',
								// 	dValue: '科目三',
								// }, ],
							},
							FIELDS.STUDENT.EXAM_PLACE,
							FIELDS.STUDENT.EXAM_APPOINT_DATE,
							FIELDS.STUDENT.EXAM_DATE,
							// {
							// 	...FIELDS.STUDENT.EXAM_TIME,
							// 	values: [ {
							// 		dKey: '上午',
							// 		dValue: '上午',
							// 	}, {
							// 		dKey: '下午',
							// 		dValue: '下午',
							// 	}, ],
							// },
							{
								...FIELDS.STUDENT.EXAM_TIME,
								values: [ {
									dKey: '上午',
									dValue: '上午',
								}, {
									dKey: '下午',
									dValue: '下午',
								}, ],
							},
							// FIELDS.STUDENT.MOBILE,
						].map( v =>
							<Col md={8} sm={24} key={v.key}>
								<WrapperComplexFormItem
									{...props}
									config={v}
									form={form}
									values={v.values}
									initialValue={selectedRow[ v.key ]}
									rules={[ { required: !v.notRequired, message: '该项为必填' } ]}
									// style={{ marginBottom: 0 }}
								/>
							</Col>
						)
					}
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( AppointmentEditModal );
