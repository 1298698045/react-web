import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input, Modal, Spin, Row, Col } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
import useGetInitialValue from '@/hooks/useGetInitialValue';

const CollaborateEditModal = props => {
	const { selectedRow, onSubmit, visible, setVisible, form, loading } = props;

	const getValue = useGetInitialValue( selectedRow );

	const onOk = e => {
		e.preventDefault();

		// eslint-disable-next-line consistent-return
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}

			const location = fieldsValue[ FIELDS.ORG.COLLA_LOCATION.key ];
			delete fieldsValue[ FIELDS.ORG.COLLA_LOCATION.key ];
			onSubmit( {
				...fieldsValue,
				[ FIELDS.ORG.COLLA_TYPE.key ]: fieldsValue[ FIELDS.ORG.COLLA_TYPE.key ].join( ',' ),
				[ FIELDS.ORG.COLLA_ID.key ]: selectedRow[ FIELDS.ORG.COLLA_ID.key ],
				[ FIELDS.ORG.COLLA_PROVINCE_CODE.key ]: location[ 0 ],
				[ FIELDS.ORG.COLLA_CITY_CODE.key ]: location[ 1 ],
				[ FIELDS.ORG.COLLA_DISTRICT_CODE.key ]: location[ 2 ],
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
			title={( selectedRow[ FIELDS.ORG.COLLA_ID.key ] ? '修改' : '新增' ) + '外协机构'}
			width={700}
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
							FIELDS.ORG.COLLA_NAME,
							FIELDS.ORG.COLLA_TYPE,
							{
								...FIELDS.ORG.COLLA_LOCATION,
								value: [
									getValue( FIELDS.ORG.COLLA_PROVINCE_CODE ),
									getValue( FIELDS.ORG.COLLA_CITY_CODE ),
									getValue( FIELDS.ORG.COLLA_DISTRICT_CODE ),
								],
							},
							FIELDS.ORG.COLLA_ADDRESS,
							FIELDS.ORG.COLLA_CONTACT_NAME,
							FIELDS.ORG.COLLA_CONTACT_MOBILE,
						].map( v =>
							<Col xs={24} md={12} key={v.key}>
								<WrapperComplexFormItem
									{...props}
									config={v}
									form={form}
									initialValue={v.value || getValue( v )}
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

export default Form.create()( CollaborateEditModal );
