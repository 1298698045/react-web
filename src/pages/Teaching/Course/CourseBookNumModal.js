import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input, Modal, Spin, Row, Col } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";

const CourseBookNumModal = props => {
	const { currCoachInfo, selectedRows, onSubmit, visible, setVisible, form, loading } = props;
	let currBookNumList = [];
	if (currCoachInfo && currCoachInfo.bookNum) {
		let newList = currCoachInfo.bookNum.split(',') || []
		currBookNumList = newList.map(one => {
			return {
				dKey: one,
				dValue: one
			}
		})
	}
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
				[ FIELDS.TEACHING.COURSE.BOOK_NUM.key ]: fieldsValue[ FIELDS.TEACHING.COURSE.BOOK_NUM.key ].join( ',' ),
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
			title="调整人车上限"
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
						<WrapperComplexFormItem className="customer-checkbox"
							{...props}
							config={{
								key: 'bookNum',
								type: 'checkbox',
								title: '调整人车上限为：',
								
							}}
							values= {currBookNumList}
							form={form}
							// mode="multiple"
							// initialValue={selectedRows[ FIELDS.TEACHING.COURSE.BOOK_NUM.key ]}
							rules={[ { required: true, message: '该项为必填' } ]}
							style={{ marginBottom: 0 }}
						/>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( CourseBookNumModal );
