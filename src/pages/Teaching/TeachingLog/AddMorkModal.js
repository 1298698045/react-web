import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { useToggle, } from 'react-use';
import { connect } from "dva";
import { Form, Modal, Col, Row, Card, Upload, Button, message, Collapse, Spin } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
import useGetInitialValue from '@/hooks/useGetInitialValue';
import { getDictValue } from "@/utils/dictionaryUtil";

const AddMorkModal = props => {
	const { selectRow, visible, setVisible, loading, afterClose, onSubmit, form  } = props;
	const onOk = e => {
		e.preventDefault();
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			onSubmit( {
				...fieldsValue,
				courseId: selectRow.courseId,
				type: 'remarks',
				studentId: selectRow.studentId,
				coachId: selectRow.coachId,
				recordId: selectRow.id
			} );
		} );
	}
	return <Modal
			width={350}
			title={'添加备注'}
			visible={visible}
			afterClose={afterClose}
			destroyOnClose
			onCancel={() => setVisible( false )}
			onOk={onOk}
		>
			<Form onSubmit={onOk}>
				<Row gutter={24}>
					{
						[
							FIELDS.TEACHING.LOG.CONTENT,
						].map( v =>
							<Col xs={24} md={24} key={v.key}>
								<WrapperComplexFormItem
									{...props}
									config={v}
									form={form}
									rules={[ { required: false, message: '该项为必填' } ]}
									style={{ marginBottom: 0 }}
								/>
							</Col>
						)
					}
				</Row>
			</Form>
		</Modal>
	;
}
export default Form.create()( AddMorkModal );

