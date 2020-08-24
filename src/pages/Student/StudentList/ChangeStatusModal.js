import React from 'react';
import { Form, Modal, Col, Row, message, } from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';

const ChangeStatusModal = props => {
	const { intensiveCourseSwitch, handleSubmit, visible, setVisible, form, type, data, afterClose, loading, } = props;
	const config = {
		km1: [
			{
				dKey: '1',
				dValue: '进行中'
			},
			{
				dKey: '9',
				dValue: '已完成'
			},
		],
		km2: [],
		km3: [],
		km4: [
			{
				dKey: '0',
				dValue: '待激活'
			},
			{
				dKey: '1',
				dValue: '进行中'
			},
			{
				dKey: '9',
				dValue: '已完成'
			},
		],
	};
	if (intensiveCourseSwitch) {
		let arr = [
			{
				dKey: '0',
				dValue: '待激活'
			},
			{
				dKey: '1',
				dValue: '进行中'
			},
			{
				dKey: '2',
				dValue: '集训中'
			},
			{
				dKey: '9',
				dValue: '已完成'
			},
		]
		config.km2 = arr
		config.km3 = arr
	} else {
		let arr = [
			{
				dKey: '0',
				dValue: '待激活'
			},
			{
				dKey: '1',
				dValue: '进行中'
			},
			{
				dKey: '9',
				dValue: '已完成'
			},
		]
		config.km2 = arr
		config.km3 = arr
	}
	const kms = [];
	if ( data && data.length ) {
		if (type !== 'proxy') kms.push( {
			dKey: 'km1',
			dValue: '科目一',
		} );
		kms.push( {
			dKey: 'km2',
			dValue: '科目二',
			disabled: type === 'proxy' && !!data.find( v => v.apply.insteadKm2 != 1 ),
		} );
		kms.push( {
			dKey: 'km3',
			dValue: '科目三',
			disabled: type === 'proxy' && !!data.find( v => v.apply.insteadKm3 != 1 ),
		} );
		if (type !== 'proxy') kms.push( {
			dKey: 'km4',
			dValue: '科目四',
		} );
	}

	const submit = e => {
		e.preventDefault();

		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}

			if ( fieldsValue[ FIELDS.STUDENT.KM.key ] === 'km2' && String( data[ 0 ].km2Status ) === '6' ) {
				message.info( '该科目正在委培进行中！' );
				return false;
			}

			if ( fieldsValue[ FIELDS.STUDENT.KM.key ] === 'km3' && String( data[ 0 ].km3Status ) === '6' ) {
				message.info( '该科目正在委培进行中！' );
				return false;
			}

			handleSubmit( {
				// id: data.length > 1 ? data.map( v => v.id ).join( ',' ) : data[ 0 ].id,
				studentIds: data.length > 1 ? data.map( v => v.studentId ).join( ',' ) : data[ 0 ].studentId,
				[ `${fieldsValue[ FIELDS.STUDENT.KM.key ]}Status` ]: fieldsValue[ FIELDS.STUDENT.KM_STATUS_NO_DICTIONARY.key ],
			} );
		} );
	};

	return (
		<Modal
			afterClose={afterClose}
			title={data.length === 1 ? `进度变更 - ${data[ 0 ][ FIELDS.STUDENT.NAME.key ]}` : '进度变更'}
			destroyOnClose
			visible={visible && data.length > 0}
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
							config={FIELDS.STUDENT.KM}
							// initialValue="km2"
							values={kms}
							form={form}
							rules={[ { required: true, } ]}
							{...props}
						/>
					</Col>
					<Col md={12} sm={24}>
						<WrapperComplexFormItem
							config={FIELDS.STUDENT.KM_STATUS_NO_DICTIONARY}
							// initialValue="1"
							form={form}
							values={config[ form.getFieldValue( FIELDS.STUDENT.KM.key ) || 'km2' ]}
							rules={[ { required: true, } ]}
							{...props}
						/>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( ChangeStatusModal );
