import React, { useEffect, useMemo, useState, } from 'react';
import { Form, Modal, Descriptions, Button, Typography, Skeleton, Tabs, Radio } from 'antd';
import FIELDS from '@/config/fields';
import WithTableName from '@/components/HOC/WithTableName';
import { connect } from 'dva';
import { setStudentFormFields } from '@/utils/studentFields';
import getValueFromDictionary from '@/utils/getValueFromDictionary';
import { getDictValue, queryDictionary, } from '@/utils/dictionaryUtil';
import MemoTimeline from './MemoTimeline';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import numeral from 'numeral';
import { useGetSet } from 'react-use';
import printJS from 'print-js';
import Privilege from '@/components/Privilege';
import { hasPriv } from '@/utils/privilege';

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

// 报名费
const tableName = 'studentInfoSignUpFeeList';

// 退费
const tableName1 = 'studentInfoRefundFeeList';

// 变更记录
const tableName2 = 'studentInfoChangeLogList';

// 补交学费
const tableName3 = 'studentInfoMakeUpTuitionList';

// 班型变更费
const tableName4 = 'studentInfoChangeClassList';

// 课时费
const tableName5 = 'studentInfoClassFeeList';

// 补考费
const tableName6 = 'studentInfoPaymentFeeList';

// 约课记录
const tableName7 = 'studentInfoCourseRecordList';

// 成绩记录
const tableName8 = 'studentInfoExamRecordList';
// 其它业务收入
const tableName9 = 'studentInfoOtherCostList';
// 学员支出
const tableName10 = 'studentInfoExpenditureList';

const InfoModal = props => {
	const { visible, setVisible, dictionary, dispatch, studentId, loading, form, } = props;
	const [ isHideData, setIsHideData ] = useState( !hasPriv( 'show_finance_data' ));

	const [ data, setData ] = useState( {} );
	const [ getOriginData, setOriginData ] = useGetSet( {} );
	const getStudentInfoLoading = loading.effects[ 'student/getStudentInfo' ] || false;
	const getDictionaryLoading = loading.models.dictionary || false;
	const [ intrpducerDictionary, setIntrpducerDictionary ] = useState( {} );
	const [ getOutlayType, setOutlayType ] = useGetSet( 'outlay_type_other' );
	useEffect( () => {
		queryDictionary( dispatch, 'value_added' );
		queryDictionary( dispatch, 'class_id' );
		queryDictionary( dispatch, 'employee_id' );
		queryDictionary( dispatch, 'depart_id' );
		queryDictionary( dispatch, 'introducer_id' );
	}, [] );

	useEffect( () => {
		if ( visible ) {
			dispatch( {
				type: 'student/getStudentInfo',
				payload: studentId,
			} ).then( res => {
				const d = setStudentFormFields()( res );
				setOriginData( res );
				setData( d );
				setIntrpducerDictionary( typeof res.apply.introducerType !== 'undefined' && res.apply.introducerType * 1 === 2 ? 'introducer_id' : 'employee_id' )
			} );
		}
	}, [ studentId, visible ] );

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
				return isHideData ? numeral( record.total || 0 ).format( '0,0' ).replace(/[0-9]/gi, '*') : numeral( record.total || 0 ).format( '0,0' );
			}
			// customRender: ( text, record, ) => {
			
			// 	return numeral( record.total || 0 ).format( '0,0' );
			// }
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
		FIELDS.FINANCE.PAY_MODE,
		{
			...FIELDS.FINANCE.CREATE_TIME,
			title: '操作时间',
		},
	];

	// 补交学费
	const originColumns8 = [
		{
			title: '序号',
			key: 'key',
		},
		{
			...FIELDS.FINANCE.AMOUNT,
			title: '本次交费',
			customRender: ( text, record, ) => {
				return isHideData ? numeral( text || 0 ).format( '0,0' ).replace(/[0-9]/gi, '*') : numeral(text|| 0 ).format( '0,0' );
			}
			// customRender: text => {
			// 	return `${text}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' )
			// }
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
				const { operator } = record;
				if ( operator && operator.operatorId ) {

					const employee = dictionary[ FIELDS.EMPLOYEE.ID.dictionary ].find( ( { uid } ) => String( uid ) === String( operator.operatorId ) );

					if ( employee ) {
						return employee.name;
					}
				}
				return '暂无';
			}
		},
		FIELDS.FINANCE.PAY_MODE,
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
		FIELDS.FINANCE.PAY_MODE,
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
			customRender: ( text, record, ) => {
				if ( record.action === 'BUY_LESSON' ) {
					// 课时需要解析json
					const d = JSON.parse( text );
					if ( d.km2 && d.km2.count > 0 && d.km3 && d.km3.count > 0 ) {
						return <>
							<div>{`科目二：${d.km2.count}节 ${d.km2.money}元`}</div>
							<div>{`科目三：${d.km3.count}节 ${d.km3.money}元`}</div>
						</>
					} else {
						if ( d.km2 && d.km2.count > 0 ) {
							return <div>{`科目二：${d.km2.count}节 ${d.km2.money}元`}</div>
						}

						if ( d.km3 && d.km3.count > 0 ) {
							return <div>{`科目三：${d.km3.count}节 ${d.km3.money}元`}</div>
						}
					}
				}

				return text;
			}
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

	// 变更班型费
	const originColumns3 = [
		{
			title: '序号',
			key: 'key',
		},
		FIELDS.FINANCE.ORIGINAL_VALUE,
		FIELDS.FINANCE.NEW_VALUE,
		{
			...FIELDS.FINANCE.AMOUNT,
			title: '本次交费',
			customRender: ( text, record, ) => {
				return isHideData ? numeral( text || 0 ).format( '0,0' ).replace(/[0-9]/gi, '*') : numeral(text|| 0 ).format( '0,0' );
			}
			// customRender: text => `${text}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' )
		},
		{
			...FIELDS.STUDENT.PAY_STATUS,
			title: '费用状态',
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
				const { operator } = record;
				if ( operator && operator.operatorId ) {

					const employee = dictionary[ FIELDS.EMPLOYEE.ID.dictionary ].find( ( { uid } ) => String( uid ) === String( operator.operatorId ) );

					if ( employee ) {
						return employee.name;
					}
				}
				return '暂无';
			}
		},
		FIELDS.FINANCE.PAY_MODE,
		{
			...FIELDS.FINANCE.CREATE_TIME,
			title: '操作时间',
		},
	];

	// 课时费
	const originColumns4 = [
		{
			title: '序号',
			key: 'key',
		},
		{
			title: '购买科目二',
			key: 'km2',
			customRender: ( text, record, ) => {
				// 课时需要解析json
				const d = JSON.parse( record.memo );
				if ( d.km2 && d.km2.count > 0 ) {
					return <div>{`${d.km2.count}节 ${d.km2.money}元`}</div>
				}
			}
		},
		{
			title: '购买科目三',
			key: 'km3',
			customRender: ( text, record, ) => {
				// 课时需要解析json
				const d = JSON.parse( record.memo );
				if ( d.km3 && d.km3.count > 0 ) {
					return <div>{`${d.km3.count}节 ${d.km3.money}元`}</div>
				}

				return '暂无';
			}
		},
		{
			...FIELDS.FINANCE.AMOUNT,
			title: '总费用',
			customRender: ( text, record, ) => {
				return isHideData ? numeral( text || 0 ).format( '0,0' ).replace(/[0-9]/gi, '*') : numeral(text|| 0 ).format( '0,0' );
			}
		},
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
				const { operator } = record;
				if ( operator && operator.operatorId ) {

					const employee = dictionary[ FIELDS.EMPLOYEE.ID.dictionary ].find( ( { uid } ) => String( uid ) === String( operator.operatorId ) );

					if ( employee ) {
						return employee.name;
					}
				}
				return '暂无';
			}
		},
		FIELDS.FINANCE.PAY_MODE,
		{
			...FIELDS.FINANCE.REFUND_REASON,
			title: '备注',
		},
		{
			...FIELDS.FINANCE.CREATE_TIME,
			title: '操作时间',
		},
	];

	// 补考费
	const originColumns5 = [
		{
			title: '序号',
			key: 'key',
		},
		{
			...FIELDS.STUDENT.MEMO,
			title: '补考科目',
		},
		{
			...FIELDS.FINANCE.AMOUNT,
			title: '费用',
			customRender: ( text, record, ) => {
				return isHideData ? numeral( text || 0 ).format( '0,0' ).replace(/[0-9]/gi, '*') : numeral(text|| 0 ).format( '0,0' );
			}
		},
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
				const { operator } = record;
				if ( operator && operator.operatorId ) {

					const employee = dictionary[ FIELDS.EMPLOYEE.ID.dictionary ].find( ( { uid } ) => String( uid ) === String( operator.operatorId ) );

					if ( employee ) {
						return employee.name;
					}
				}
				return '暂无';
			}
		},
		FIELDS.FINANCE.PAY_MODE,
		{
			...FIELDS.FINANCE.CREATE_TIME,
			title: '操作时间',
		},
	];

	// 约课记录
	const originColumns6 = [
		{
			title: '序号',
			key: 'key',
		},
		FIELDS.TEACHING.COURSE.DATE,
		{
			...FIELDS.TEACHING.COURSE.RANGE_TIME,
			customRender: ( text, { startTime, endTime, }, ) => {
				return `${startTime} ~ ${endTime}`;
			}
		},
		FIELDS.TEACHING.COURSE.COACH_ID,
		{
			...FIELDS.STUDENT.MOBILE,
			key: 'coachMobile',
		},
		FIELDS.STUDENT.LICENSE_TYPE,
		FIELDS.TEACHING.COURSE.CREATE_TIME,
		FIELDS.TEACHING.COURSE.MEMO,
		FIELDS.TEACHING.COURSE.LOGIC_STATUS,
	];

	// 成绩记录
	const originColumns7 = [
		{
			title: '序号',
			key: 'key',
		},
		FIELDS.STUDENT.EXAM_KM,
		FIELDS.STUDENT.EXAM_CAR_TYPE,
		FIELDS.STUDENT.EXAM_DATE,
		FIELDS.STUDENT.EXAM_PLACE,
		FIELDS.STUDENT.EXAM_TIME,
		FIELDS.STUDENT.EXAM_SCORE,
		FIELDS.STUDENT.EXAM_RESULT,
	];
	// 其它业务收入
	const originColumns9 = [
		{
			title: '序号',
			key: 'key',
		},
		{
			...FIELDS.STUDENT.OTHER_COST_TYPE,
			customRender: ( text, record, ) => {
				return getDictValue( dictionary, 'other_income_type_manage', record[ FIELDS.STUDENT.OTHER_COST_TYPE.key ] )
			}
		},
		{
			...FIELDS.STUDENT.OTHER_COST_KM,
			customRender: ( text, record, ) => {
				return getDictValue( dictionary, record[ FIELDS.STUDENT.OTHER_COST_TYPE.key ], record[ FIELDS.STUDENT.OTHER_COST_KM.key ] );
			}
		},
		{
			...FIELDS.FINANCE.JOURNAL_AMOUNT,
			title: '费用金额',
			customRender: ( text, record, ) => {
				// return `${getTotal( record, dictionary )}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' )
				return isHideData ? numeral( text || 0 ).format( '0,0' ).replace(/[0-9]/gi, '*') : numeral( text || 0 ).format( '0,0' );
			}
			// customRender: text => String( text ).replace( /\B(?=(\d{3})+(?!\d))/g, ',' )
		},
		FIELDS.STUDENT.OTHER_COST_DATE,
		FIELDS.STUDENT.OTHER_COST_MEMO,
		{
			...FIELDS.STUDENT.PAY_STATUS,
			customRender: text => {
				return text === 0 ? '待交费' : '已交费';
			}
		},
		FIELDS.FINANCE.RECEIPT_NUMBER,
		{
			title: '操作人',
			key: 'payee',
			customRender: ( text, record ) => {
				const { operator } = record;
				if ( operator && operator.operatorId ) {

					const employee = dictionary[ FIELDS.EMPLOYEE.ID.dictionary ].find( ( { uid } ) => String( uid ) === String( operator.operatorId ) );

					if ( employee ) {
						return employee.name;
					}
				}
				return '暂无';
			}
		},
		{ ...FIELDS.FINANCE.CREATE_TIME, title: '操作时间' },
		// {
		// 	title: '操作',
		// 	key: 'actions',
		// 	customRender: ( text, record, ) => {
		// 		const { studentId, journalId } = record;
		// 		return [
		// 			<a key="print" onClick={print(studentId, journalId}>打印收据</a>
		// 		]
		// 	}
		// },
	];
	const originColumns10 = [
		{
			title: '序号',
			key: 'key',
		},
		{
			...FIELDS.FINANCE.EX_JOURNAL_TYPE,
			customRender: ( text, record, ) => {
				const arr = record[ FIELDS.FINANCE.EX_JOURNAL_TYPE.key ].split( '.' );
				return getDictValue( dictionary, getOutlayType(), arr[0] )
			}
		},
		{
			...FIELDS.FINANCE.EX_JOURNAL_SUBTYPE,
			customRender: ( text, record, ) => {
				const type = record[ FIELDS.FINANCE.EX_JOURNAL_TYPE.key ].split( '.' )[ 0 ];
				const subType = record[ FIELDS.FINANCE.EX_JOURNAL_TYPE.key ].split( '.' )[ 1 ];
				return getDictValue( dictionary, type, subType );
			}
		},
		{
			...FIELDS.FINANCE.AMOUNT,
			title: '支付金额（元）',
			customRender: text => {
				if ( text < 0 ) {
					return numeral( text * -1 ).format( '0,0.00' );
				}
				
				return numeral( text ).format( '0,0.00' );
			}
		},
		FIELDS.FINANCE.EX_JOURNAL_TARGET,
		FIELDS.FINANCE.PAY_MODE,
		FIELDS.FINANCE.JOURNAL_DATE,
		FIELDS.FINANCE.EX_JOURNAL_REPORTER,
		{
			title: '登记时间',
			key: 'createTime',
		},
		{
			title: '登记人',
			key: 'creator',
			customRender: text => {
				if ( dictionary[ FIELDS.EMPLOYEE.ID.dictionary ] ) {
					const item = dictionary[ FIELDS.EMPLOYEE.ID.dictionary ].find( ( { uid } ) => {
						return String( uid ) === String( text )
					} );
					
					if ( item ) {
						return item.name;
					}
				}
				
				return '暂无';
			}
		},
		FIELDS.STUDENT.MEMO
	];
	
	const print = ( studentId, journalId ) => {
		dispatch( {
			type: `${tableName}/print`,
			payload: {
				studentId,
				journalId,
				action: 'other_income_type_manage',
			}
		} ).then( data => {
			if ( data !== false ) {
				printJS( 'data:image/jpg;base64,' + data, 'image' );
			}
		} );
	}
	// 报名信息字段
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
			formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
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
	];

	// 约课记录筛选
	const fields2 = [
		{
			...FIELDS.TEACHING.COURSE.RANGE_DATE,
			col: 9,
		},
		{
			...FIELDS.TEACHING.COURSE.KM,
			dictionary: 'course_km',
		},
		{
			key: 'intensiveStatus',
			title: '是否集训',
			type: 'select',
			values: [
				{
					dKey: '0',
					dValue: '非集训',
				},
				{
					dKey: '1',
					dValue: '集训',
				},
			],
		}
	];
	const formFields = useMemo( () => {
		return fields2.map( f => (
			<WrapperComplexFormItem
				config={f}
				values={f.values}
				col={f.col}
				form={form}
			/>
		) );
	}, [ form ] );

	// 成绩记录筛选
	const fields3 = [
		{
			...FIELDS.STUDENT.EXAM_DATE,
			type: 'rangeDate',
		},
		FIELDS.STUDENT.KM_CODE,
		FIELDS.STUDENT.EXAM_RESULT,
	];
	const formFields3 = useMemo( () => {
		return fields3.map( f => (
			<WrapperComplexFormItem
				config={f}
				col={f.col}
				form={form}
			/>
		) );
	}, [ form ] );

	const getValue = !( studentId && getStudentInfoLoading && getDictionaryLoading ) ? getValueFromDictionary( dictionary )( data ) : () => '';

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

	let documentAccepter = '暂无';
	if ( data.documentAccepter && data.documentAccepter.operatorId ) {
		const documentAccepterItem = dictionary[ FIELDS.EMPLOYEE.ID.dictionary ].find( ( { dKey } ) => dKey === String( data.documentAccepter.operatorId ) );
		if ( documentAccepterItem ) documentAccepter = documentAccepterItem.name;
	}

	let creatorPeople = '暂无';
	if ( data.creator && data.creator.operatorId ) {
		const creatorItem = dictionary[ FIELDS.EMPLOYEE.ID.dictionary ].find( ( { uid } ) => String( uid ) === String( data.creator.operatorId ) );
		if ( creatorItem ) creatorPeople = creatorItem.name;
	}

	let { createTime } = getOriginData();
	if ( createTime ) createTime = createTime.split( ' ' )[ 0 ];

	let { documentedTime } = getOriginData();
	if ( documentedTime ) documentedTime = documentedTime.split( ' ' )[ 0 ];

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
			title={`学员信息详情 - ${data[ FIELDS.STUDENT.NAME.key ]}`}
			width="90%"
			visible={visible}
			destroyOnClose
			closable={true}
			maskClosable={false}
			keyboard={false}
			onCancel={() => setVisible( false )}
			bodyStyle={{ paddingTop: 0, }}
			footer={
				<Button
					icon="close-circle"
					htmlType="button"
					onClick={() => {
						setVisible( false );
					}}>关闭</Button>
			}
		>
			<Skeleton loading={!studentId || ( getStudentInfoLoading && getDictionaryLoading )} active
					  paragraph={{ rows: 20 }}>
				<Tabs defaultActiveKey="1">
					{hasPriv( 'base_info' ) &&
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
								label="受理日期"
							>{documentedTime || '暂无'}</Item>
							<Item
								label="建档操作员"
							>{documentAccepter || '暂无'}</Item>
							<Item
								label="登记日期"
							>{createTime || '暂无'}</Item>
							<Item
								label="登记员"
							>{creatorPeople || '暂无'}</Item>
							<Item
								label={FIELDS.STUDENT.KM1_STATUS.title}
							>{getValue( FIELDS.STUDENT.KM1_STATUS ) || '暂无'}</Item>
							<Item
								label={FIELDS.STUDENT.KM2_STATUS.title}
							>{getValue( FIELDS.STUDENT.KM2_STATUS ) || '暂无'}</Item>
							<Item
								label={FIELDS.STUDENT.KM3_STATUS.title}
							>{getValue( FIELDS.STUDENT.KM3_STATUS ) || '暂无'}</Item>
							<Item
								label={FIELDS.STUDENT.KM4_STATUS.title}
							>{getValue( FIELDS.STUDENT.KM4_STATUS ) || '暂无'}</Item>
							<Item
								label="科目二已学"
							>{`${getValue( { key: 'km2Lessons' } )}节` || '暂无'}</Item>
							<Item
								label="科目二剩余"
							>
								{
									`${
										( getValue( { key: 'km2Surplus' } ) === -1 ) ? '无限' : ( typeof data[ 'km2Surplus' ] !== 'undefined' ? getValue( { key: 'km2Surplus' } ) + '节' : '暂无' )
										}`
								}
							</Item>
							<Item
								label="科目三已学"
							>{`${getValue( { key: 'km3Lessons' } )}节` || '暂无'}</Item>
							<Item
								label="科目三剩余"
							>
								{
									`${( getValue( { key: 'km3Surplus' } ) === -1 ) ? '无限' : ( typeof data[ 'km3Surplus' ] !== 'undefined' ? getValue( { key: 'km3Surplus' } ) + '节' : '暂无' )}`
								}
							</Item>
							<Item
								label="报名交费"
							>{isHideData ? `${numeral( getValue( FIELDS.STUDENT.RECEIPTS ) || 0 ).format( '0,0' ).replace(/[0-9]/gi, '*')}元` : `${numeral( getValue( FIELDS.STUDENT.RECEIPTS ) || 0 ).format( '0,0' )}元`}</Item>
							<Item
								label="增值服务费"
							>{data.finance ? (isHideData ? `${numeral( data.finance.valueAdded || 0 ).format( '0,0' ).replace(/[0-9]/gi, '*')}元` : `${numeral( data.finance.valueAdded || 0 ).format( '0,0' )}元`) : '暂无'}</Item>
							<Item
								label="合计"
							>{ data.finance ? (isHideData ? `${numeral( ( getValue( FIELDS.STUDENT.RECEIPTS ) || 0 ) + ( data.finance.valueAdded || 0 ) ).format( '0,0' ).replace(/[0-9]/gi, '*')}元` : `${numeral( ( getValue( FIELDS.STUDENT.RECEIPTS ) || 0 ) + ( data.finance.valueAdded || 0 ) ).format( '0,0' )}元`) : '暂无'}</Item>
							<Item
								label="操作员"
							>{admin || '暂无'}</Item>
						</Descriptions>
					</TabPane>
					}
					{hasPriv( 'fee_info' ) &&
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
							<TabPane tab="补交学费" key="c">
								<WithTableName
									{...props}
									pagination={null}
									bodyStyle={{ padding: 0, }}
									tableSearchParams={{ studentId: data.id }}
									tableName={tableName3}
									columnSortable={false}
									originColumns={originColumns8}
									scroll={{ x: 'max-content' }}
								/>
							</TabPane>
							<TabPane tab="变更班型费" key="d">
								<WithTableName
									{...props}
									pagination={null}
									bodyStyle={{ padding: 0, }}
									tableSearchParams={{ studentId: data.id }}
									tableName={tableName4}
									columnSortable={false}
									originColumns={originColumns3}
									scroll={{ x: 'max-content' }}
								/>
							</TabPane>
							<TabPane tab="课时费" key="e">
								<WithTableName
									{...props}
									pagination={null}
									bodyStyle={{ padding: 0, }}
									tableSearchParams={{ studentId: data.id }}
									tableName={tableName5}
									columnSortable={false}
									originColumns={originColumns4}
									scroll={{ x: 'max-content' }}
								/>
							</TabPane>
							<TabPane tab="补考费" key="f">
								<WithTableName
									{...props}
									pagination={null}
									bodyStyle={{ padding: 0, }}
									tableSearchParams={{ studentId: data.id }}
									tableName={tableName6}
									columnSortable={false}
									originColumns={originColumns5}
									scroll={{ x: 'max-content' }}
								/>
							</TabPane>
							<TabPane tab="其它业务收入" key="other">
								<WithTableName
									{...props}
									pagination={null}
									bodyStyle={{ padding: 0, }}
									tableSearchParams={{ studentId: data.id }}
									tableName={tableName9}
									columnSortable={false}
									originColumns={originColumns9}
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
							<TabPane tab="学员支出" key="expenditure">
								<Form layout="inline">
									<Form.Item >
										<Radio.Group value={getOutlayType()} onChange={e => {
											setOutlayType(e.target.value)
										}}>
											<Radio value="outlay_type_other">其它业务支出</Radio>
											<Radio value="outlay_type_main">主营业务支出</Radio>
											<Radio value="outlay_type_manage">管理费</Radio>
											<Radio value="outlay_type_capital">资本支出</Radio>
											<Radio value="outlay_type_tax">所得税</Radio>
										</Radio.Group>
									</Form.Item>
								</Form>
								<WithTableName
									{...props}
									pagination={null}
									bodyStyle={{ padding: 0, }}
									tableSearchParams={{ jKey: 'studentId', jValue: data.id, outlayType: getOutlayType()  }}
									tableName={tableName10}
									columnSortable={false}
									originColumns={originColumns10}
									scroll={{ x: 'max-content' }}
								/>
							</TabPane>
						</Tabs>
					</TabPane>
					}
					{hasPriv( 'student_order_course_record' ) &&
					<TabPane tab="约课记录" key="5">
						<WithTableName
							{...props}
							pagination={null}
							bodyStyle={{ padding: 0, }}
							tableSearchParams={{ studentId: data.id }}
							tableName={tableName7}
							formFields={formFields}
							columnSortable={false}
							originColumns={originColumns6}
							scroll={{ x: 'max-content' }}
						/>
					</TabPane>
					}
					{hasPriv( 'student_score_record' ) &&
					<TabPane tab="成绩记录" key="6">
						<WithTableName
							{...props}
							pagination={null}
							bodyStyle={{ padding: 0, }}
							tableSearchParams={{ studentId: data.id }}
							tableName={tableName8}
							formFields={formFields3}
							columnSortable={false}
							originColumns={originColumns7}
							scroll={{ x: 'max-content' }}
						/>
					</TabPane>
					}
					{hasPriv( 'change_record' ) &&
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
					}
					{hasPriv( 'student_detail_memo' ) &&
					<TabPane tab="备注" key="4">
						<MemoTimeline dispatch={dispatch} studentId={data.studentId} loading={loading}/>
					</TabPane>
					}
				</Tabs>
			</Skeleton>
		</Modal>
	);
};

export default connect( (
	{
		[ tableName ]: data,
		[ tableName1 ]: data1,
		[ tableName2 ]: data2,
		[ tableName3 ]: data3,
		[ tableName4 ]: data4,
		[ tableName5 ]: data5,
		[ tableName6 ]: data6,
		[ tableName7 ]: data7,
		[ tableName8 ]: data8,
		[ tableName9 ]: data9,
		[ tableName10 ]: data10,
		dictionary,
		loading,
		global,
		student,
	}
) => (
	{
		[ tableName ]: data,
		[ tableName1 ]: data1,
		[ tableName2 ]: data2,
		[ tableName3 ]: data3,
		[ tableName4 ]: data4,
		[ tableName5 ]: data5,
		[ tableName6 ]: data6,
		[ tableName7 ]: data7,
		[ tableName8 ]: data8,
		[ tableName9 ]: data9,
		[ tableName10 ]: data10,
		dictionary,
		loading,
		global,
		student,
	}
) )( Form.create()( InfoModal ) );
