import React, { useMemo } from 'react';
import { Form, Modal, Col, Row, Descriptions, } from 'antd';
import useGetInitialValue from '@/hooks/useGetInitialValue';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import moment from 'moment';

const studyFieldsMap = [
	FIELDS.FINANCE.NAME,
	FIELDS.STUDENT.MAJOR_CARD_CODE,
	FIELDS.FINANCE.PAY_MODE,
];

const { Item } = Descriptions;

const ConfirmWithFormModal = props => {
	const { handleSubmit, visible, setVisible, form, data, payMode, loading, afterClose, dictionary, } = props;
	const getValue = useGetInitialValue( data );
	
	const payTypeDic = useMemo( () => {
		if ( dictionary && dictionary[ FIELDS.FINANCE.PAY_MODE.dictionary ] ) {
			const dic = dictionary[ FIELDS.FINANCE.PAY_MODE.dictionary ];
			const item = dic.find( ( { dKey } ) => dKey === payMode );
			if ( item ) {
				return item.dValue;
			}
		}
	}, [ dictionary, payMode ] );
	
	const submit = e => {
		e.preventDefault();
		
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			
			handleSubmit( {
				logId: data.id,
				[ FIELDS.FINANCE.AMOUNT.key ]: fieldsValue[ FIELDS.FINANCE.AMOUNT.key ],
				[ FIELDS.FINANCE.PAY_MODE.key ]: payMode,
				print: form.getFieldValue( 'print' ),
				journalDate: moment(fieldsValue['journalDate']).format('YYYY-MM-DD'),
			} );
		} );
	};
	
	return (
		<Modal
			title={`确认收费 - ${getValue( FIELDS.FINANCE.NAME )}`}
			visible={visible}
			width={600}
			afterClose={afterClose}
			onOk={submit}
			destroyOnClose
			confirmLoading={loading}
			closable={true}
			maskClosable={false}
			keyboard={false}
			onCancel={() => setVisible( false )}
		>
			<Form>
				<Descriptions bordered column={2} title="学员学习情况">
					{
						studyFieldsMap.map( f => {
							if ( f.key === FIELDS.FINANCE.PAY_MODE.key ) {
								return <Item key={f.key} label={f.title} span={2}>{payTypeDic}</Item>
							}
							return (
								<Item key={f.key}
								      label={f.title}>{getValue( f ) || '暂无'}</Item>
							)
						} )
					}
					<Item label="科目二已学">{data[ FIELDS.FINANCE.KM2_LESSONS.key ] || 0}节</Item>
					<Item
						label="科目二剩余">{data[ FIELDS.FINANCE.KM2_SURPLUS.key ] === -1 ? '无限' : data[ FIELDS.FINANCE.KM2_SURPLUS.key ] || 0}节</Item>
					<Item label="科目三已学">{data[ FIELDS.FINANCE.KM3_LESSONS.key ] || 0}节</Item>
					<Item
						label="科目三剩余">{data[ FIELDS.FINANCE.KM3_SURPLUS.key ] === -1 ? '无限' : data[ FIELDS.FINANCE.KM3_SURPLUS.key ] || 0}节</Item>
				</Descriptions>
				<Row gutter={{ xs: 8, sm: 16, md: 20, }} style={{ marginTop: 10, }}>
					<Col md={12} sm={24}>
						<WrapperComplexFormItem
							style={{ marginBottom: 0, }}
							config={{
								...FIELDS.FINANCE.AMOUNT,
								title: '本次交费',
								
							}}
							min={0}
							formatter={value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' )}
							parser={value => value.replace( /\$\s?|(,*)/g, '' )}
							form={form}
							rules={[ { required: true, } ]}
							{...props}
						/>
					</Col>
					<Col md={12} sm={24}>
							<WrapperComplexFormItem
								style={{ marginBottom: 0, }}
								config={{
									title: '收费时间',
									key: 'journalDate',
									type: 'date',
								}}
								rules={[ { required: true, } ]}
								initialValue={moment()}
								form={form}
								{...props}
							/>
						</Col>
					<Col md={12} sm={24}>
						<WrapperComplexFormItem
							style={{ marginBottom: 0, }}
							config={{
								title: '打印收据',
								key: 'print',
								type: 'switch',
							}}
							form={form}
							initialValue={false}
							checkedChildren="是"
							unCheckedChildren="否"
							{...props}
						/>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( ConfirmWithFormModal );
