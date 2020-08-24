import React from 'react';
import { Form, Modal, Col, Row, Divider, Descriptions, } from 'antd';
import numeral from 'numeral';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import { useGetSet } from 'react-use';

const { Item } = Descriptions;

const ChangeClassModal = props => {
	const {
		handleSubmit, visible, setVisible, form, data = {
			finance: {},
			licenseType: ''
		}, dictionary, afterClose, loading,
	} = props;
	const [ getClassValues, setClassValues ] = useGetSet( [] );

	const currentClass = dictionary[ FIELDS.STUDENT.CLASS_ID.dictionary ] ? dictionary[ FIELDS.STUDENT.CLASS_ID.dictionary ].find( ( { dKey } ) => {
		return dKey === String( data.newClassId );
	} ) : undefined;
	const currentLicenseType = dictionary[ FIELDS.STUDENT.LICENSE_TYPE.dictionary ] ? dictionary[ FIELDS.STUDENT.LICENSE_TYPE.dictionary ].find( ( { dKey } ) => {
		return dKey === String( data.licenseType );
	} ) : undefined;
	const submit = e => {
		e.preventDefault();
		
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				// console.log( err, fieldsValue );
				
				return false;
			}
			handleSubmit( {
				params: {
					// studentId: data.id,
					studentId: data.studentId,
					[ FIELDS.STUDENT.REASON.key ]: fieldsValue[ FIELDS.STUDENT.REASON.key ],
					[ FIELDS.STUDENT.IS_CANCEL.key ]: fieldsValue[ FIELDS.STUDENT.IS_CANCEL.key ],
					destClassId: fieldsValue[ FIELDS.STUDENT.CLASS_ID.key ],
					[ FIELDS.STUDENT.ORIGINAL_CLASS_ID.key ]: currentClass.dKey,
				}
			} );
		} );
	};
	
	const money = (dictionary[ FIELDS.STUDENT.CLASS_ID.dictionary ] && dictionary[ FIELDS.STUDENT.CLASS_ID.dictionary ].find( ( { dKey } ) => dKey === form.getFieldValue( FIELDS.STUDENT.CLASS_ID.key ) )) ? dictionary[ FIELDS.STUDENT.CLASS_ID.dictionary ] && dictionary[ FIELDS.STUDENT.CLASS_ID.dictionary ].find( ( { dKey } ) => dKey === form.getFieldValue( FIELDS.STUDENT.CLASS_ID.key ) ).money : 0;
	
	const pay = dictionary[ FIELDS.STUDENT.FEE_TYPE.dictionary ] ? dictionary[ FIELDS.STUDENT.FEE_TYPE.dictionary ].find( ( { dKey } ) => dKey === String( data.finance[ FIELDS.STUDENT.FEE_TYPE.key ] ) ) : undefined;
	
	const onChange = ( key, value ) => {
		let filterValues = [];
		if ( key === FIELDS.STUDENT.DEPART_ID_SCHOOL.key ) {
			console.log(value, data, dictionary[ 'class_id' ])
			if ( value === '-1' ) {
				// 去掉全款修改班型限制 by Rhine
				// if (pay.dKey === 'full_pay') {
				// 	filterValues = dictionary[ 'class_id' ].filter( v => v.dictSwitch == 1 ).filter( ( { licenseType, dKey, payType } ) => (dKey !== String( data[ FIELDS.STUDENT.CLASS_ID.key ] ) && (licenseType === String( data[ FIELDS.STUDENT.LICENSE_TYPE.key ] ) && payType === pay.dKey)) );
				// } else {
				filterValues = dictionary[ 'class_id' ].filter( v => v.dictSwitch == 1 ).filter( ( { licenseType, dKey } ) => (dKey !== String( data.newClassId || data[ FIELDS.STUDENT.CLASS_ID.key ] ) && (licenseType === String( data[ FIELDS.STUDENT.LICENSE_TYPE.key ] ))) );
				// }
			} else {
				filterValues = dictionary[ 'class_id' ].filter( v => v.dictSwitch == 1 ).filter( ( { departId } ) => {
					const d = String( departId ).split( ',' );
					
					return d.includes( value );
				} );

				if ( filterValues.length > 0 ) {
					// 去掉全款修改班型限制 by Rhine
					// if (pay.dKey === 'full_pay') {
					// 	filterValues = filterValues.filter( ( { licenseType, dKey, payType } ) => (dKey !== String( data[ FIELDS.STUDENT.CLASS_ID.key ] ) && (licenseType === String( data[ FIELDS.STUDENT.LICENSE_TYPE.key ] ) && payType === pay.dKey)) );
					// } else {
						filterValues = filterValues.filter( ( { licenseType, dKey } ) => (dKey !== String( data.newClassId || data[ FIELDS.STUDENT.CLASS_ID.key ] ) && (licenseType === String( data[ FIELDS.STUDENT.LICENSE_TYPE.key ] ))) );
					// }
				}
			}
			filterValues = filterValues.filter(v => v.id !== currentClass.id);
			setClassValues( filterValues );
			
			form.resetFields( [ FIELDS.STUDENT.CLASS_ID.key ] );
		}
	};
	// 获取可选择班型列表
	const onChangeLAndD = () => {
		const classDic = dictionary[ 'class_id' ].filter( v => v.dictSwitch == 1 ).filter( ( dKey  ) => (dKey !== String( data.newClassId || data[ FIELDS.STUDENT.CLASS_ID.key ] )) );
		let list = []
		let lic = form.getFieldValue( FIELDS.STUDENT.LICENSE_TYPE.key );
		let dep = form.getFieldValue( FIELDS.STUDENT.DEPART_ID_SCHOOL.key );
		lic = typeof(lic) === 'undefined' ? '-1' : lic
		dep = typeof(dep) === 'undefined' ? '-1' : dep
		if (lic !== '-1' && dep !== '-1') {
			list =  classDic.filter( d => {
				return (d[ FIELDS.STUDENT.LICENSE_TYPE.key ] === lic) && (d[ FIELDS.STUDENT.DEPART_ID_SCHOOL.key ].split( ',' ).indexOf( dep ) !== -1);
			} );
		}
		if (lic === '-1' && dep !== '-1') {
			list =  classDic.filter( d => {
				return (d[ FIELDS.STUDENT.DEPART_ID_SCHOOL.key ].split( ',' ).indexOf( dep ) !== -1);
			} );
		}
		if (lic !== '-1' && dep === '-1') {
			list =  classDic.filter( d => {
				return (d[ FIELDS.STUDENT.LICENSE_TYPE.key ] === lic);
			} );
		}
		if (lic === '-1' && dep === '-1') {
			list = classDic
		}
		list = list.filter(v => v.id !== currentClass.id);
		setClassValues( list );
		form.resetFields( [ FIELDS.STUDENT.CLASS_ID.key ] );
	};
	return (
		<Modal
			title={`更换班型 - ${data[ FIELDS.STUDENT.NAME.key ]}`}
			visible={visible}
			afterClose={afterClose}
			width={600}
			onOk={submit}
			destroyOnClose
			confirmLoading={loading}
			onCancel={() => setVisible( false )}
			closable={true}
			maskClosable={false}
			keyboard={false}
		>
			<Form onSubmit={submit}>
				{
					visible && <Descriptions bordered column={2}>
						<Item label="学员">{data[ FIELDS.STUDENT.NAME.key ]}</Item>
						<Item label="手机号">{data[ FIELDS.STUDENT.MOBILE.key ]}</Item>
						<Item label="班型">{currentClass ? currentClass.dValue : ''}</Item>
						<Item label="申领类型">{currentLicenseType ? currentLicenseType.dValue : ''}</Item>
						<Item
							label="交费类型">{pay ? pay.dValue : '暂无'}</Item>
						<Item label="已交学费">{numeral( Number( data.finance[ FIELDS.STUDENT.RECEIPTS.key ] || 0 ) + Number( data.finance[ FIELDS.STUDENT.VALUE_ADDED.key ] || 0 ) ).format( '0,0' )}元</Item>
						<Item label="科目二已学">{data[ FIELDS.FINANCE.KM2_LESSONS.key ] || 0}节</Item>
						<Item
							label="科目二剩余">{data[ FIELDS.FINANCE.KM2_SURPLUS.key ] === -1 ? '无限' : data[ FIELDS.FINANCE.KM2_SURPLUS.key ] || 0}节</Item>
						<Item label="科目三已学">{data[ FIELDS.FINANCE.KM3_LESSONS.key ] || 0}节</Item>
						<Item
							label="科目三剩余">{data[ FIELDS.FINANCE.KM3_SURPLUS.key ] === -1 ? '无限' : data[ FIELDS.FINANCE.KM3_SURPLUS.key ] || 0}节</Item>
					</Descriptions>
				}
				<Divider dashed/>
				{
					visible && <Row gutter={{ xs: 8, sm: 16, md: 20, }}>
						<Col md={8} sm={24}>
							<WrapperComplexFormItem
								config={FIELDS.STUDENT.DEPART_ID_SCHOOL}
								form={form}
								rules={[ { required: true, } ]}
								values={[ {
									dKey: '-1',
									dValue: '全部',
								}, ...dictionary[ FIELDS.STUDENT.DEPART_ID_SCHOOL.dictionary ] ]}
								initialValue="-1"
								onChange={onChangeLAndD}
							/>
						</Col>
						<Col md={8} sm={24}>
							<WrapperComplexFormItem
								config={FIELDS.STUDENT.LICENSE_TYPE_ACTIVE}
								form={form}
								initialValue="-1"
								// values={licList}
								values={[ {
									dKey: '-1',
									dValue: '全部',
									dictSwitch: 1
								}, ...dictionary[ FIELDS.STUDENT.LICENSE_TYPE_ACTIVE.dictionary ] ]}
								rules={[ { required: true, } ]}
								onChange={onChangeLAndD}
							/>
						</Col>
						<Col md={8} sm={24}>
							<WrapperComplexFormItem
								config={FIELDS.STUDENT.CLASS_ID_ACTIVE}
								form={form}
								rules={[ { required: true, } ]}
								values={getClassValues()}
							/>
						</Col>
						<Col md={8} sm={24}>
							<WrapperComplexFormItem
								config={{
									title: '新班型学费',
									key: 'status',
									type: 'input'
								}}
								form={form}
								status="disabled"
								initialValue={`${Math.max( money - data.finance[ FIELDS.STUDENT.DISCOUNT.key ] - data.finance[ FIELDS.STUDENT.DEPOSIT.key ] - data.finance[ FIELDS.STUDENT.REDUCE_AMOUNT.key ], 0 )}元`}
							/>
						</Col>
					</Row>
				}
				<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
					<Col md={8} sm={24}>
						<WrapperComplexFormItem
							config={FIELDS.STUDENT.IS_CANCEL}
							rules={[ { required: true, } ]}
							form={form}
							initialValue="1"
							values={[
								{
									dKey: '1',
									dValue: '是',
								},
								{
									dKey: '0',
									dValue: '否',
								},
							]}
						/>
					</Col>
				</Row>
				<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
					<Col sm={24}>
						<WrapperComplexFormItem
							config={{
								...FIELDS.STUDENT.REASON,
								title: '变更原因',
							}}
							form={form}
						/>
					</Col>
				</Row>
			</Form>
			说明：<br/>
			修改后会产生一条班型变更费，财务确认收费后才算是修改完成；<br/>
			已经预约但还未学习的课将自动取消，已学过的课不变；<br/>
			当前绑定的教练会自动解绑；
		</Modal>
	);
};

export default Form.create()( ChangeClassModal );
