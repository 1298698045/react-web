import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input, Modal, Spin, Row, Col } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";

const CourseIntensiveModal = props => {
	const { selectedRows, onSubmit, visible, setVisible, form, loading } = props;
	const [ kms, setKms ] = useState( [] );

	const onOk = e => {
		e.preventDefault();

		// eslint-disable-next-line consistent-return
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			onSubmit( {
				...fieldsValue,
				intensiveStatus: 1,
				courseIds: selectedRows.map( v => v[ FIELDS.TEACHING.COURSE.ID.key ] ),
			} );
		} );
	};
	const onCancel = e => {
		e.preventDefault();

		setVisible( false );
	};

	useEffect( () => {
		if ( visible ) {
			const arr = [];
			if ( !selectedRows.find( v => v.teachKm.indexOf( 'km2' ) < 0 ) ) {
				arr.push( {
					dKey: 'km2',
					dValue: '科目二集训',
				} );
			}
			if ( !selectedRows.find( v => v.teachKm.indexOf( 'km3' ) < 0 ) ) {
				arr.push( {
					dKey: 'km3',
					dValue: '科目三集训',
				} );
			}
			setKms( arr );
		}
	}, [ visible ] );

	return (
		<Modal
			destroyOnClose
			title="设置集训课程"
			width={350}
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
					<Col>
						<WrapperComplexFormItem
							{...props}
							config={{
								key: 'kmCode',
								title: '集训科目',
								type: 'radio',
							}}
							values={kms}
							form={form}
							// initialValue={}
							rules={[ { required: true, message: '该项为必填' } ]}
							style={{ marginBottom: 0 }}
						/>
					</Col>
					<Col>
						<WrapperComplexFormItem
							{...props}
							config={{
								key: 'bookNum',
								title: '集训课程人车上限',
								type: 'inputNumber',
							}}
							form={form}
							// initialValue={}
							rules={[ { required: true, message: '该项为必填' } ]}
							style={{ marginBottom: 0 }}
						/>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( CourseIntensiveModal );
