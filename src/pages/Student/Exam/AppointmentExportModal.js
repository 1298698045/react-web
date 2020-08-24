import React from 'react';
import { Form, Modal, Row, Col, Upload, Button, Icon, message } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";

const AppointmentExportModal = props => {
	const { selectedRows, onSubmit, visible, setVisible, form, loading } = props;

	const onOk = e => {
		e.preventDefault();

		// eslint-disable-next-line consistent-return
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			let values = {
				[ FIELDS.STUDENT.EXAM_DATE.key ]: fieldsValue[ FIELDS.STUDENT.EXAM_DATE.key ].format( 'YYYY-MM-DD' ),
			};
			if (fieldsValue[ FIELDS.STUDENT.EXAM_CAR_TYPE.key ].length) {
				values[ FIELDS.STUDENT.EXAM_CAR_TYPE.key ] = fieldsValue[ FIELDS.STUDENT.EXAM_CAR_TYPE.key ].join(',');
			}
			if (fieldsValue[ FIELDS.STUDENT.EXAM_KM.key ].length) {
				values[ FIELDS.STUDENT.EXAM_KM.key ] = fieldsValue[ FIELDS.STUDENT.EXAM_KM.key ].join(',');
			}
			onSubmit( values );
		} );
	};
	const onCancel = e => {
		e.preventDefault();

		setVisible( false );
	};

	return (
		<Modal
			destroyOnClose
			title="导出约考信息表"
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
							FIELDS.STUDENT.EXAM_DATE,
							{
								...FIELDS.STUDENT.EXAM_CAR_TYPE,
								type: 'checkbox',
							},
							{
								...FIELDS.STUDENT.EXAM_KM,
								type: 'checkbox',
							},
						].map( v =>
							<Col md={24} sm={24} key={v.key}>
								<WrapperComplexFormItem
									{...props}
									config={v}
									form={form}
									values={v.values}
									// initialValue={selectedRow[ v.key ]}
									rules={[ { required: true, message: '该项为必填' } ]}
									style={{ marginBottom: 0 }}
								/>
							</Col>
						)
					}
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( AppointmentExportModal );
