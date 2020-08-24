import React from 'react';
import { Form, Input, Modal, Spin, Row, Col } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from '@/config/fields';

const ScoreEditModal = props => {
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
				[ FIELDS.STUDENT.EXAM_DATE.key ]: fieldsValue[ FIELDS.STUDENT.EXAM_DATE.key ].format( 'YYYY-MM-DD' ),
				// [ FIELDS.STUDENT.EXAM_FAIL_ITEM.key ]: fieldsValue[ FIELDS.STUDENT.EXAM_FAIL_ITEM.key ].join( ',' ),
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
			title={(selectedRow[ FIELDS.STUDENT.NAME.key ] ? '修改' : '录入') + '考试成绩'}
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
							FIELDS.STUDENT.EXAM_KM,
							FIELDS.STUDENT.EXAM_CAR_TYPE,
							FIELDS.STUDENT.EXAM_PLACE,
							FIELDS.STUDENT.EXAM_DATE,
							{
								...FIELDS.STUDENT.EXAM_TIME,
								// values: [ {
								// 	dKey: '上午',
								// 	dValue: '上午',
								// }, {
								// 	dKey: '下午',
								// 	dValue: '下午',
								// }, ],
							},
							FIELDS.STUDENT.EXAM_SCORE,
							{
								...FIELDS.STUDENT.EXAM_FAIL_ITEM,
								mode: 'multiple',
								notRequired: true,
							},
							// FIELDS.STUDENT.MOBILE,
							{
								key: 'overwrite',
								title: '是否覆盖',
								type: 'radio',
								dictionary: 'switch',
								initialValue: '0',
							},
						].map( v =>
							<Col md={8} sm={24} key={v.key} style={{ height: '88px' }}>
								<WrapperComplexFormItem
									{...props}
									config={v}
									form={form}
									mode={v.mode}
									values={v.values}
									initialValue={selectedRow[ v.key ] !== undefined ? selectedRow[ v.key ] : v.initialValue}
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

export default Form.create()( ScoreEditModal );
