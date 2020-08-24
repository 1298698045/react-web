import React, { useEffect, useState } from 'react';
import { Form, Modal, Descriptions, Button, Tabs, } from 'antd';
import FIELDS from '@/config/fields';
import WithTableName from '@/components/HOC/WithTableName';
import { connect } from 'dva';
import { setStudentFormFields } from '@/utils/studentFields';
import getValueFromDictionary from '@/utils/getValueFromDictionary';
import { getDictValue } from '@/utils/dictionaryUtil';
import { hasPriv } from '@/utils/privilege';

import MemoTimeline from './MemoTimeline';
import numeral from 'numeral';

const { TabPane } = Tabs;

const { Item } = Descriptions;

const fields0 = [
	FIELDS.STUDENT.NAME,
	FIELDS.STUDENT.GENDER,
	FIELDS.STUDENT.NATIONALITY,
	FIELDS.STUDENT.MAJOR_CARD_TYPE,
	FIELDS.STUDENT.MAJOR_CARD_CODE,
	FIELDS.STUDENT.BIRTHDAY,
	{
		...FIELDS.STUDENT.REG_ADDRESS,
		span: 3,
	},
	{
		...FIELDS.STUDENT.CON_ADDRESS,
		span: 3,
	},
	FIELDS.STUDENT.MOBILE,
	FIELDS.STUDENT.EMAIL,
	FIELDS.STUDENT.ZIP,
	FIELDS.STUDENT.KM2_COACH_ID,
	FIELDS.STUDENT.KM3_COACH_ID,
];

const tableName = 'studentInfoSignUpFeeList';
const tableName1 = 'studentInfoRefundFeeList';
const tableName2 = 'studentInfoChangeLogList';

const InfoModal = props => {
	const { visible, setVisible, dictionary, dispatch,loading, } = props;
	const [ intrpducerDictionary, setIntrpducerDictionary ] = useState( {} );
	const [ isHideData, setIsHideData ] = useState( !hasPriv( 'show_finance_data' ));

	const data = setStudentFormFields()( props.data );
	useEffect(() => {
		if (visible) {
			setIntrpducerDictionary(typeof data.apply.introducerType !== 'undefined' && data.apply.introducerType * 1 === 2 ? 'introducer_id' : 'employee_id')
		}
	}, [visible])
	// 报名费
	const originColumns0 = [
		{
			title: '序号',
			key: 'key',
		},
		{
			...FIELDS.STUDENT.RECEIPTS,
			title: '本次交费',
			customRender: ( text, record, ) => {
				// return `${getTotal( record, dictionary )}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' )
				return isHideData ? numeral( record.total || 0 ).format( '0,0' ).replace(/[0-9]/gi, '*') : numeral( record.total || 0 ).format( '0,0' );
			}
		},
		FIELDS.STUDENT.CLASS_ID,
		{
			...FIELDS.STUDENT.PAY_STATUS,
			customRender: text => {
				return text === 0 ? '待交费' : '已交费';
			}
		},
		{
			title: '收据编号',
			key: 'journalId',
		},
		{
			title: '操作人',
			key: 'payee',
			customRender: ( text, record ) => {
				const { payee } = record;
				if ( payee ) {
					
					const employee = dictionary[ FIELDS.EMPLOYEE.ID.dictionary ].find( ( { uid } ) => String( uid ) === String( payee ) );
					
					if ( employee ) {
						return employee.name;
					}
				}
				return '暂无';
			}
		},
		{
			...FIELDS.FINANCE.CREATE_TIME,
			title: '操作时间',
		},
	];
	
	// 退费
	const originColumns1 = [
		{
			title: '序号',
			key: 'key',
		},
		FIELDS.FINANCE.REFUND_TYPE,
		{
			...FIELDS.FINANCE.REFUND_REASON,
			dictionary: 'quit_reason',
		},
		{
			...FIELDS.FINANCE.AMOUNT,
			title: '退费金额',
			customRender: ( text, record, ) => {
				// return `${getTotal( record, dictionary )}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' )
				return isHideData ? numeral( text || 0 ).format( '0,0' ).replace(/[0-9]/gi, '*') : numeral(text|| 0 ).format( '0,0' );
			}
		},
		FIELDS.STUDENT.MEMO,
		{
			...FIELDS.FINANCE.OP_STATUS,
		},
		{
			title: '操作人',
			key: 'payee',
			customRender: ( text, record ) => {
				const { payee } = record;
				if ( payee ) {
					
					const employee = dictionary[ FIELDS.EMPLOYEE.ID.dictionary ].find( ( { uid } ) => String( uid ) === String( payee ) );
					
					if ( employee ) {
						return employee.name;
					}
				}
				return '暂无';
			}
		},
		{
			...FIELDS.FINANCE.CREATE_TIME,
			title: '操作时间',
		},
	];
	
	// 变更记录
	const originColumns2 = [
		{
			title: '序号',
			key: 'key',
		},
		{
			title: '操作类型',
			key: 'action',
			dictionary: 'change_log_type',
		},
		{
			...FIELDS.STUDENT.MEMO,
			title: '操作内容',
		},
		{
			...FIELDS.STUDENT.OPERATOR_ID,
			title: '操作人',
			customRender: ( text, record ) => {
				if ( record.operator ) {
					if ( record.operator[ FIELDS.STUDENT.OPERATOR_ID.key ] ) {
						// return getDictValue( dictionary, FIELDS.STUDENT.OPERATOR_ID.dictionary, record.operator[ FIELDS.STUDENT.OPERATOR_ID.key ] )
						const employee = dictionary[ FIELDS.EMPLOYEE.ID.dictionary ].find( ( { uid } ) => String( uid ) === String( record.operator[ FIELDS.STUDENT.OPERATOR_ID.key ] ) );
						
						if ( employee ) {
							return employee.name;
						}
					}
					return '暂无';
				}
				return '暂无';
			}
		},
		{
			...FIELDS.FINANCE.CREATE_TIME,
			title: '操作时间',
		},
	];
	
	const fields1 = [
		FIELDS.STUDENT.SOURCE_TYPE,
		FIELDS.STUDENT.TEMP_RESIDENCE_PERMIT,
		FIELDS.STUDENT.BACKUP_TEL_PHONE,
		FIELDS.STUDENT.CAREER,
		FIELDS.STUDENT.LICENSE_TYPE,
		FIELDS.STUDENT.CLASS_ID,
		FIELDS.STUDENT.DEPART_ID,
		FIELDS.STUDENT.FEE_TYPE,
		{
			...FIELDS.STUDENT.REDUCE_AMOUNT,
			isHideData: isHideData,
			formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
		},
		FIELDS.STUDENT.REDUCE_REASON,
		{
			...FIELDS.STUDENT.DISCOUNT,
			isHideData: isHideData,
			formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
		},
		{
			...FIELDS.STUDENT.DEPOSIT,
			isHideData: isHideData,
			formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
		},
		{
			...FIELDS.STUDENT.RECEIVABLE,
			isHideData: isHideData,
			title: '报名交费',
			formatter:
				value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
		},
		{ ...FIELDS.STUDENT.OWED,
			isHideData: isHideData,},
		FIELDS.STUDENT.CHANNEL,
		{
			...FIELDS.STUDENT.OPERATOR_ID,
			dictionary: intrpducerDictionary
		},
		FIELDS.STUDENT.CONTRACT_NO,
		FIELDS.STUDENT.REPORT_TIME,
		FIELDS.STUDENT.VALUE_ADDED,
		FIELDS.STUDENT.APPLY_TYPE,
		{
			...FIELDS.STUDENT.APPLY_SUB_TYPE,
			dictionary: `${FIELDS.STUDENT.APPLY_TYPE.dictionary}_${data[ FIELDS.STUDENT.APPLY_TYPE.key ]}`
		},
		FIELDS.STUDENT.OLD_LICENCE_TYPE,
		FIELDS.STUDENT.CHANGE_LICENCE_TIME,
		FIELDS.STUDENT.APPLY_WAY,
		FIELDS.STUDENT.PROXY_NAME,
		FIELDS.STUDENT.PROXY_CARD_TYPE,
		FIELDS.STUDENT.PROXY_CARD_NO,
		FIELDS.STUDENT.PROXY_TEL_PHONE,
		{
			...FIELDS.STUDENT.PROXY_LOCATION,
			span: 2,
		},
		{
			...FIELDS.STUDENT.PROXY_ADDRESS,
			span: 3,
		},
		{
			...FIELDS.STUDENT.MATERIAL,
			span: 3,
		},
	]
	
	const getValue = getValueFromDictionary( dictionary )( data );
	
	let admin = '暂无';
	const { creator } = data;
	if ( creator ) {
		const { operatorId } = creator;
		if ( dictionary[ FIELDS.EMPLOYEE.ID.dictionary ] ) {
			const item = dictionary[ FIELDS.EMPLOYEE.ID.dictionary ].find( ( { uid } ) => {
				return String( uid ) === String( operatorId )
			} );
			
			if ( item ) admin = item.name;
		}
	}
	
	let proxyKm = '';
	if ( data.apply ) {
		if ( data.apply.insteadKm2 === 1 && data.apply.insteadKm3 === 1 ) {
			proxyKm = '科目二、科目三';
		} else if ( data.apply.insteadKm2 === 0 && data.apply.insteadKm3 === 1 ) {
			proxyKm = '科目三';
		} else if ( data.apply.insteadKm2 === 1 && data.apply.insteadKm3 === 0 ) {
			proxyKm = '科目二';
		}
	}
	
	return (
		<Modal
			title={`学员报名信息 - ${data[ FIELDS.STUDENT.NAME.key ]}`}
			width="90%"
			visible={visible}
			destroyOnClose
			onCancel={() => setVisible( false )}
			bodyStyle={{ paddingTop: 0, }}
			closable={true}
			maskClosable={false}
			keyboard={false}
			footer={
				<Button
					icon="close-circle"
					htmlType="button"
					onClick={() => {
						setVisible( false );
					}}>关闭</Button>
			}
		>
			<Tabs defaultActiveKey="1">
				<TabPane tab="报名信息" key="1">
					<Descriptions column={3} bordered>
						{
							fields0.concat( fields1 ).map( f => <Item
								span={f.span || 1}
								key={f.key}
								label={f.title}
								>{f.isHideData ? (getValue( f ) ? numeral(getValue( f ) || 0 ).format( '0,0' ).replace(/[0-9]/gi, '*') : '*') : getValue( f ) || '暂无'}</Item> )
							}
						<Item
							label="报名方式"
						>{getDictValue( dictionary, FIELDS.STUDENT.STUDENT_TYPE.dictionary, String( data[ FIELDS.STUDENT.STUDENT_TYPE.key ] ) ) || '暂无'}</Item>
						{
							proxyKm ? <Item label="代培科目">{proxyKm || '暂无'}</Item> : null
						}
						{
							data.apply && data.apply.cooperationUnit ? <Item
								label="外协机构">{getValue( FIELDS.STUDENT.COOPERATION_UNIT ) || '暂无'}</Item> : null
						}
						<Item
							label="操作员"
						>{admin || '超级管理员'}</Item>
					</Descriptions>
				</TabPane>
				<TabPane tab="费用信息" key="2">
					<Tabs defaultActiveKey="a" tabPosition="left">
						<TabPane tab="报名费" key="a">
							<WithTableName
								{...props}
								pagination={null}
								bodyStyle={{ padding: 0, }}
								tableSearchParams={{ studentId: data.id }}
								tableName={tableName}
								columnSortable={false}
								originColumns={originColumns0}
								scroll={{ x: 'max-content' }}
							/>
						</TabPane>
						<TabPane tab="退费" key="b">
							<WithTableName
								{...props}
								pagination={null}
								bodyStyle={{ padding: 0, }}
								tableSearchParams={{ studentId: data.id }}
								tableName={tableName1}
								columnSortable={false}
								originColumns={originColumns1}
								scroll={{ x: 'max-content' }}
							/>
						</TabPane>
					</Tabs>
				</TabPane>
				<TabPane tab="变更记录" key="3">
					<WithTableName
						{...props}
						pagination={null}
						bodyStyle={{ padding: 0, }}
						tableSearchParams={{ studentId: data.id }}
						tableName={tableName2}
						columnSortable={false}
						originColumns={originColumns2}
						scroll={{ x: 'max-content' }}
					/>
				</TabPane>
				<TabPane tab="备注" key="4">
					<MemoTimeline dispatch={dispatch} studentId={data.studentId} loading={loading}/>
				</TabPane>
			</Tabs>
		</Modal>
	);
};

export default connect( (
	{
		[ tableName ]: data,
		[ tableName1 ]: data1,
		[ tableName2 ]: data2,
		loading,
		global,
		student,
	}
) => (
	{
		[ tableName ]: data,
		[ tableName1 ]: data1,
		[ tableName2 ]: data2,
		loading,
		global,
		student,
	}
) )( Form.create()( InfoModal ) );
