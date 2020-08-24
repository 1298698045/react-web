import React, { useMemo,useEffect, useState } from 'react';
import { Form, Modal, Col, Row, Descriptions, } from 'antd';
import numeral from 'numeral';
import getValueFromDictionary from '@/utils/getValueFromDictionary';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import moment from 'moment';
const { Item } = Descriptions;

const ConfirmModal = props => {
	const { handleSubmit, visible, setVisible, form, data, payMode, loading, afterClose, dictionary,dispatch } = props;
	const { infoType, total } = data;
	const [ isFinaceMoneyEdit, setIsFinaceMoneyEdit ] = useState( false );

	useEffect( () => {
		dispatch( {
			type: `charge/queryStatusSetting`,
		} ).then(res => {
			setIsFinaceMoneyEdit(res.isFinaceMoneyEdit === 'on' ? true : false)
		});
	}, [dispatch] );
	const config = useMemo( () => {
		let submitId;
		let amountObj;
		let fieldsMap;
		if ( infoType === 'signUp' ) {
			submitId = 'studentId';
			amountObj = FIELDS.FINANCE.RECEIPTS;
			fieldsMap = [
				FIELDS.FINANCE.NAME,
				FIELDS.STUDENT.MAJOR_CARD_CODE,
				FIELDS.FINANCE.PAY_MODE,
			]
			if (!isFinaceMoneyEdit) {
				fieldsMap.push({
					...amountObj,
					title: '交费金额'
				},)
			}
		} else {
			submitId = 'logId';
			amountObj = FIELDS.FINANCE.AMOUNT;
			fieldsMap = [
				FIELDS.FINANCE.NAME,
				FIELDS.STUDENT.MAJOR_CARD_CODE,
				FIELDS.FINANCE.PAY_MODE,
				// {
				// 	...amountObj,
				// 	title: '交费金额'
				// },
			]
			if (!isFinaceMoneyEdit) {
				fieldsMap.push({
					...amountObj,
					title: '交费金额'
				},)
			}
		}
		
		return {
			submitId,
			amountObj,
			fieldsMap,
		};
	}, [ dictionary, data, payMode, form ] );
	
	const getValue = getValueFromDictionary( dictionary )( data );
	
	const payTypeDic = useMemo( () => {
		if ( dictionary && dictionary[ FIELDS.FINANCE.PAY_MODE.dictionary ] ) {
			const dic = dictionary[ FIELDS.FINANCE.PAY_MODE.dictionary ];
			const item = dic.find( ( { dKey } ) => dKey === payMode );
			if ( item ) {
				return item.dValue;
			}
		}
	}, [ dictionary, payMode ] );
	
	const amount = getValue( config.amountObj );
	const submit = e => {
		e.preventDefault();
		
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			let submitData;
			if ( infoType === 'signUp' ) {
				submitData = {
					[ config.submitId ]: data.id,
					receipts: fieldsValue['receipts'] || amount,
					payTime: moment(fieldsValue['payTime']).format('YYYY-MM-DD HH:mm:ss'),
					payMode,
				};
			} else {
				submitData = {
					[ config.submitId ]: data.id,
					amount: fieldsValue['amount'] || amount,
					journalDate: moment(fieldsValue['journalDate']).format('YYYY-MM-DD'),
					payMode,
				};
			}
			
			handleSubmit( {
				...submitData,
				print: fieldsValue['print'],
			} );
		} );
	};
	
	return (
		<Modal
			title={`确认收费 - ${getValue( FIELDS.FINANCE.NAME )}`}
			visible={visible}
			afterClose={afterClose}
			width={600}
			onOk={submit}
			destroyOnClose
			confirmLoading={loading}
			closable={true}
			maskClosable={false}
			keyboard={false}
			onCancel={() => setVisible( false )}
		>
			<Form>
				<Descriptions bordered column={2}>
					{
						config.fieldsMap.map( f => {
							if ( f.key === FIELDS.FINANCE.PAY_MODE.key ) return <Item key={f.key}
							                                                          label={f.title}>{payTypeDic}</Item>;
							
							if ( f.key === config.amountObj.key ) return <Item key={f.key}
							                                                   label={f.title}>{numeral( total ? Number( total ) : Number( getValue( f ) ) ).format( '0,0' )}元</Item>;
							
							return <Item key={f.key} label={f.title}>{getValue( f ) || '暂无'}</Item>;
						} )
					}
				</Descriptions>
				<Row gutter={{ xs: 8, sm: 16, md: 20, }} style={{ marginTop: 10, }}>
					{isFinaceMoneyEdit &&  infoType === 'signUp' && 
					<Col md={12} sm={24}>
						<WrapperComplexFormItem
							style={{ marginBottom: 0, }}
							config={{...FIELDS.FINANCE.RECEIPTS, title: '交费金额'}}
							initialValue={getValue( FIELDS.FINANCE.RECEIPTS )}
							addonAfter={"元"}
							form={form}
							{...props}
						/>
					</Col>}
					{isFinaceMoneyEdit && infoType !== 'signUp' && 
					<Col md={12} sm={24}>
						<WrapperComplexFormItem
							style={{ marginBottom: 0, }}
							config={{...FIELDS.FINANCE.AMOUNT, title: '交费金额'}}
							initialValue={getValue( FIELDS.FINANCE.AMOUNT )}
							addonAfter={"元"}
							form={form}
							{...props}
						/>
					</Col>}
					{ infoType === 'signUp' && <Col md={12} sm={24}>
						<WrapperComplexFormItem
							style={{ marginBottom: 0, }}
							config={{
								title: '收费时间',
								key: 'payTime',
								type: 'dateTime',
							}}
							rules={[ { required: true, } ]}
							initialValue={moment()}
							form={form}
							{...props}
						/>
					</Col>}
					{infoType !== 'signUp' &&
						<Col md={12} sm={24}>
							<WrapperComplexFormItem
								style={{ marginBottom: 0, }}
								config={{
									title: '收费时间',
									key: 'journalDate',
									type: 'date',
								}}
								initialValue={moment()}
								form={form}
								{...props}
							/>
						</Col>}
					
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

export default Form.create()( ConfirmModal );
