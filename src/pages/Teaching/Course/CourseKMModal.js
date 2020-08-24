import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input, Modal, Spin, Row, Col } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";

const CourseKMModal = props => {
	const { currCoachInfo, selectedRows, onSubmit, visible, setVisible, form, loading } = props;
	const [ kms, setKms ] = useState( [] );

	useEffect( () => {
		if ( visible ) {
			const arr = [];
			if ( !selectedRows.find( v => v.teachKm.indexOf( 'km2' ) < 0 ) ) {
				arr.push( {
					dKey: 'km2',
					dValue: '科目二',
				} );
			}
			if ( !selectedRows.find( v => v.teachKm.indexOf( 'km3' ) < 0 ) ) {
				arr.push( {
					dKey: 'km3',
					dValue: '科目三',
				} );
			}
			setKms( arr );
		}
	}, [ visible ] );

	const onOk = e => {
		e.preventDefault();

		// eslint-disable-next-line consistent-return
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			onSubmit( {
				...fieldsValue,
				courseIds: selectedRows.map( v => v[ FIELDS.TEACHING.COURSE.ID.key ] ),
				kmCode: fieldsValue.kmCode.join( ',' ),
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
			title="设置普通课程"
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
						<Form.Item label="教练姓名：" style={{display: 'flex'}}>
							<span className="ant-form-text">{currCoachInfo ? currCoachInfo.name : '暂无'}</span>
						</Form.Item>
					</Col>
					<Col>
						<WrapperComplexFormItem
							{...props}
							config={{
								key: 'kmCode',
								title: '调整科目为',
								type: 'checkbox',
							}}
							values={kms}
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

export default Form.create()( CourseKMModal );
