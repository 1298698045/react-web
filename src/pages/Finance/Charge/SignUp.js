import React, { useState, useMemo, } from 'react';
import { useToggle, useEffectOnce } from 'react-use';
import { connect } from 'dva';
import numeral from 'numeral';
import {
	Form,
	Card,
	Tooltip,
	Dropdown,
	Menu,
	Icon,
	Divider,
	Spin,
	message
} from 'antd';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import ConfirmModal from './ConfirmModal';
import TurnDownModal from './TurnDownModal';
import StudentInfoModal from '@/components/StudentInfoModal';
import printJS from 'print-js';
import { getDictItem, getDictValue } from '@/utils/dictionaryUtil';
import Privilege from '@/components/Privilege';

const tableName = 'financeChargeSignUpList';

const getTotal = ( record, dictionary ) => {
	const { quickEntryParams, valueAddInfo, classId, studentType, } = record;
	let total = 0;
	if ( studentType === 1 ) {
		// 本校报名
		const currentClass = dictionary[ FIELDS.STUDENT.CLASS_ID.dictionary ].find( ( { dKey } ) => dKey === String( classId ) );
		
		const { money: currentClassMoney } = currentClass ? currentClass : { money: 0 };
		
		const currentClassValueAdded = currentClass ? currentClass.valueAdded.split( ',' ) : [];
		
		const valueAddedArr = valueAddInfo.split( ',' );
		if ( dictionary[ FIELDS.STUDENT.VALUE_ADDED.dictionary ] && valueAddedArr.length > 0 ) {
			const totalArr = dictionary[ FIELDS.STUDENT.VALUE_ADDED.dictionary ].filter( ( { dKey } ) => {
				return valueAddedArr.includes( String( dKey ) );
			} );
			const currentTotalArr = totalArr.filter( ( { dKey } ) => {
				return !currentClassValueAdded.includes( String( dKey ) );
			} );
			if ( currentTotalArr.length > 0 ) {
				total = currentTotalArr.map( ( { amount } ) => amount ).reduce( ( prev, next ) => {
					return Number( prev ) + Number( next );
				}, [] );
			}
		}
		
		const showTotal = total + currentClassMoney - (record[ FIELDS.FINANCE.DISCOUNT.key ] || 0) - (record[ FIELDS.FINANCE.REDUCE_AMOUNT.key ] || 0);
		
		return Math.max( showTotal, 0 );
	} else {
		// 非本校报名
		
		const currentClass = dictionary[ FIELDS.STUDENT.CLASS_ID.dictionary ].find( ( { dKey } ) => dKey === String( classId ) );
		console.log( currentClass );
		const currentClassMoney = record[ FIELDS.FINANCE.RECEIPTS.key ];
		
		const currentClassValueAdded = currentClass ? currentClass.valueAdded.split( ',' ) : [];
		
		const valueAddedArr = valueAddInfo.split( ',' );
		if ( dictionary[ FIELDS.STUDENT.VALUE_ADDED.dictionary ] && valueAddedArr.length > 0 ) {
			const totalArr = dictionary[ FIELDS.STUDENT.VALUE_ADDED.dictionary ].filter( ( { dKey } ) => {
				return valueAddedArr.includes( String( dKey ) );
			} );
			const currentTotalArr = totalArr.filter( ( { dKey } ) => {
				return !currentClassValueAdded.includes( String( dKey ) );
			} );
			if ( currentTotalArr.length > 0 ) {
				total = currentTotalArr.map( ( { amount } ) => amount ).reduce( ( prev, next ) => {
					return Number( prev ) + Number( next );
				}, [] );
			}
		}
		
		const showTotal = total + currentClassMoney;
		
		return Math.max( showTotal, 0 );
	}
	
};

const SignUp = props => {
	const { form, dispatch, loading, dictionary, quickEntryParams } = props;
	const [ confirmModalVisible, toggleConfirmModalVisible ] = useToggle( false );
	const [ rejectModalVisible, toggleRejectModalVisible ] = useToggle( false );
	const [ payMode, setPayMode ] = useState( undefined );
	const [ info, setInfo ] = useState( {} );
	const [ needUpdate, setNeedUpdate ] = useToggle( false );
	const [ studentInfoModalVisible, setStudentInfoModalVisible ] = useState( false );
	const [ studentInfoId, setStudentInfoId ] = useState( undefined );
	
	const confirmLoading = loading.effects[ `${tableName}/insure` ] || false;
	const rejectLoading = loading.effects[ `${tableName}/reject` ] || false;
	const getStudentInfoLoading = loading.effects[ 'student/getInfo' ] || false;
	const [ tableSearchParams, setTableSearchParams ] = useState( {} );
	const [ tabKey, setTabKey ] = useState( '-1' );
	const [ isSubmit, setIsSubmit ] = useState( false );

	useEffectOnce( () => {
		if (quickEntryParams) {
			setTableSearchParams(quickEntryParams)
		}
		setTabKey(quickEntryParams.tabKey || '0')
		dispatch( {
			type: 'quickEntryParams/clearParams',
		} );
	}, [ dispatch ] );
	const getStudentInfo = record => {
		const { studentId } = record;
		dispatch( {
			type: 'student/getStudentInfo',
			payload: studentId,
		} ).then( student => {
			const { studentId, } = record;
			
			const value0 = record[ FIELDS.STUDENT.NAME.key ];
			const value1 = student.baseInfo[ FIELDS.STUDENT.MAJOR_CARD_CODE.key ];
			const value2 = record[ FIELDS.FINANCE.RECEIPTS.key ];
			
			setInfo( {
				infoType: 'signUp',
				[ FIELDS.STUDENT.NAME.key ]: value0,
				[ FIELDS.STUDENT.MAJOR_CARD_CODE.key ]: value1,
				[ FIELDS.FINANCE.RECEIPTS.key ]: value2,
				id: studentId,
				intro: record.intro,
				total: getTotal( record, dictionary ),
			} );
			
			toggleConfirmModalVisible( true );
		} )
	};
	
	const confirm = data => {
		const submitData = { ...data };
		delete submitData.print;
		setIsSubmit(true)
		if (isSubmit) {
			message.error('您已确认，不允许重复操作!')
			return false
		}
		dispatch( {
			type: `${tableName}/insure`,
			payload: {
				...submitData,
			},
		} ).then( journalId => {
			setIsSubmit(false)
			if ( journalId !== false ) {
				toggleConfirmModalVisible( false );
				// 线索
				dispatch( {
					type: 'student/updClueStatus',
					payload: {
						params: {
							speedStatus: 3,
							studentId: info.id
						},
					}
				} );
				if (info.intro) {
					dispatch( {
						type: 'student/updArchiveClueApply',
						payload: {
							params: {
								introducerId: info.intro,
								method: 'increase',
								type:"apply"

							},
						}
					} );
				}
				if ( data.print ) {
					dispatch( {
						type: `${tableName}/print`,
						payload: {
							studentId: info.id,
							journalId,
							action: 'REPORT_ADD',
						}
					} ).then( data => {
						if ( data !== false ) {
							printJS( 'data:image/jpg;base64,' + data, 'image' );
						}
					} );
				}
			}
		} )
	};
	
	const reject = data => dispatch( {
		type: `${tableName}/reject`,
		payload: {
			...data,
		},
	} ).then( data => {
		if ( data !== false ) {
			toggleRejectModalVisible( false );
		}
	} );
	
	const originColumns = useMemo( () => {
		const menu = record => (
			<Menu
				onClick={( { key } ) => {
					setPayMode( key );
					if ( getStudentInfoLoading ) return false;
					getStudentInfo( record );
				}}
			>
				{
					dictionary[ FIELDS.FINANCE.PAY_MODE.dictionary ] && dictionary[ FIELDS.FINANCE.PAY_MODE.dictionary ].map( ( { dKey, dValue } ) => (
						<Menu.Item key={dKey}>{dValue}</Menu.Item>
					) )
				}
			</Menu>
		);
		
		return [
			{
				title: '序号',
				key: 'key',
			},
			{
				...FIELDS.STUDENT.NAME,
				customRender: ( text, record, ) => {
					return (
						<Privilege privs={[ 'apply_pay_detail' ]}  noMatch={text}>
							<a onClick={e => {
								e.stopPropagation();
								setStudentInfoId( record.studentId );
								setStudentInfoModalVisible( true );
							}}>
								{text}
							</a>
						</Privilege>
					)
				}
			},
			FIELDS.FINANCE.MOBILE,
			FIELDS.STUDENT.CLASS_ID,
			{
				...FIELDS.FINANCE.FEE_TYPE,
				customRender: ( text, { classId }, ) => {
					if ( classId ) {
						const item = getDictItem( dictionary, FIELDS.STUDENT.CLASS_ID.dictionary, classId );
						if ( item ) {
							let title = '';
							if ( item[ FIELDS.FINANCE.FEE_TYPE.key ] === 'full_pay' ) {
								// 全款
								title = `全款：${numeral( Number( item.money ) ).format( '0,0' )}元`;
							} else if ( item[ FIELDS.FINANCE.FEE_TYPE.key ] === 'down_pay' ) {
								// 首付
								title =
									<div>{`首付：${numeral( Number( item.money ) ).format( '0,0' )}元`}<br/>{`欠款：${numeral( Number( item.balance ) ).format( '0,0' )}元`}
									</div>;
							} else {
								// 课时
								title =
									<div>{`科目二：${numeral( Number( item.km2Fee ) ).format( '0,0' )}元`}<br/>{`科目三：${numeral( Number( item.km3Fee ) ).format( '0,0' )}元`}
									</div>;
							}
							
							return (
								<Tooltip title={title}>
									<a>{getDictValue( dictionary, FIELDS.FINANCE.FEE_TYPE.dictionary, item[ FIELDS.FINANCE.FEE_TYPE.key ] )}</a>
								</Tooltip>
							);
						}
					}
					
					return '暂无';
				}
			},
			{
				...FIELDS.FINANCE.REDUCE_AMOUNT,
				customRender: ( text, record, ) => {
					return record[ FIELDS.STUDENT.REDUCE_AMOUNT.key ] > 0
						?
						<Tooltip title={`下调原因：${record[ FIELDS.STUDENT.REDUCE_REASON.key ] || '暂无'}`}>
							<a>{text}</a>
						</Tooltip>
						:
						text;
				}
			},
			{
				...FIELDS.FINANCE.DISCOUNT,
				customRender: ( text, record, ) => {
					return record.discountReason || record[FIELDS.FINANCE.DISCOUNT.key] > 0
						?
						<Tooltip title={`优惠原因：${record.discountReason || '暂无'}`}>
							<a>{text}</a>
						</Tooltip>
						:
						text;
				}
			},
			{
				...FIELDS.FINANCE.RECEIPTS,
				customRender: text => {
					return numeral( Number( text ) ).format( '0,0' );
				}
			},
			{
				...FIELDS.FINANCE.VALUE_ADDED,
				customRender: ( text, record, ) => {
					const { valueAddInfo, classId, } = record;
					let total = 0;
					
					// 当前记录的增值服务
					const valueAddedArr = valueAddInfo.split( ',' );
					if ( dictionary[ FIELDS.STUDENT.VALUE_ADDED.dictionary ] && valueAddedArr.length > 0 ) {
						
						const currentClass = dictionary[ FIELDS.STUDENT.CLASS_ID.dictionary ].find( ( { dKey } ) => dKey === String( classId ) );
						
						const currentClassValueAdded = currentClass ? currentClass.valueAdded.split( ',' ) : [];
						
						const totalArr = dictionary[ FIELDS.STUDENT.VALUE_ADDED.dictionary ].filter( ( { dKey } ) => valueAddedArr.includes( String( dKey ) ) );
						const currentTotalArr = totalArr.filter( ( { dKey } ) => {
							return !currentClassValueAdded.includes( String( dKey ) );
						} );
						
						if ( currentTotalArr.length > 0 ) {
							total = currentTotalArr.map( ( { amount } ) => amount ).reduce( ( prev, next ) => {
								return Number( prev ) + Number( next );
							}, [] );
						}
						
						const notCurrentClassValueAdded = valueAddedArr.filter( v => !currentClassValueAdded.includes( v ) );
						
						return total !== 0
							?
							(
								<Tooltip title={(
									<>
										{
											currentClassValueAdded.length > 0 && <div>班型增值服务：
												<div>
													{
														// 当前记录班型自带的增值服务
														currentClassValueAdded.map( v => {
															const valueAdded = dictionary[ FIELDS.STUDENT.VALUE_ADDED.dictionary ].find( ( { dKey } ) => dKey === String( v ) );
															if ( !valueAdded ) {
																return '暂无'
															}
															const { id, amount, title } = valueAdded;
															return <span key={id}>{`【${title}：0元】`}</span>;
														} )
													}
												</div>
											</div>
										}
										{
											notCurrentClassValueAdded.length > 0 && <div>附加增值服务：
												<div>
													{
														// 当前记录的附加增值服务
														notCurrentClassValueAdded.map( v => {
															const valueAdded = dictionary[ FIELDS.STUDENT.VALUE_ADDED.dictionary ].find( ( { dKey } ) => dKey === String( v ) );
															if ( !valueAdded ) {
																return '暂无'
															}
															const { id, amount, title } = valueAdded;
															return <span key={id}>{`【${title}：${amount}元】`}</span>;
														} )
													}
												</div>
											</div>
										}
									</>
								)}>
									<a>{total}</a>
								</Tooltip>
							)
							:
							0
					}
					
					return 0;
				}
			},
			{
				...FIELDS.FINANCE.TOTAL,
				customRender: text => {
					return numeral( Number( text ) ).format( '0,0' );
				}
			},
			{
				title: '操作',
				key: 'actions',
				customRender: ( text, record, ) => {
					return [
						<Privilege privs={[ 'apply_pay_comfrim' ]}  key="apply_pay_comfrim1">
						<Dropdown key="confirm" overlay={menu( record )}>
							<a>{getStudentInfoLoading && <Spin size="small"/>} 确认收费 <Icon type="down"/></a>
						</Dropdown></Privilege>,
						<Privilege privs={[ 'apply_pay_comfrim' ]}  key="apply_pay_comfrim2"><Divider key="divider" type="vertical"/></Privilege>,
						<Privilege privs={[ 'apply_pay_reject' ]}  key="apply_pay_reject">
							<a key="cancel" onClick={() => {
							const { studentId, name, } = record;
							setInfo( {
								id: studentId,
								[ FIELDS.FINANCE.NAME ]: name
							} );
							toggleRejectModalVisible( true )
						}}>驳回</a></Privilege>
					]
				}
			},
		]
	}, [ dictionary ] );
	
	return (
		<Card>
			{ tabKey === '0' && <WithTableName
				{...props}
				bodyStyle={{ padding: 0, }}
				tableName={tableName}
				originColumns={originColumns}
				multipleSelection={false}
				needUpdate={needUpdate}
				setNeedUpdate={setNeedUpdate}
				scroll={{ x: 'max-content' }}
				handleFormReset={() => {
					setTableSearchParams({})
					setNeedUpdate(true)
				}}
				formFields={[
					<WrapperComplexFormItem
						config={FIELDS.FINANCE.QUICK_SEARCH}
						form={form}
					/>,
					<WrapperComplexFormItem
						config={FIELDS.FINANCE.SEARCH_DATE}
						col={9}
						form={form}
					/>,
					<WrapperComplexFormItem
						config={FIELDS.FINANCE.LICENSE_TYPE_ACTIVE}
						initialValue={tableSearchParams.licenseType || undefined}
						col={9}
						form={form}
					/>,
					<WrapperComplexFormItem
						config={FIELDS.FINANCE.STUDENT_TYPE}
						col={9}
						form={form}
					/>,
					<WrapperComplexFormItem
						config={FIELDS.FINANCE.CLASS_ID}
						initialValue={tableSearchParams.classId || undefined}
						col={9}
						form={form}
					/>,
				]}
			/>}
			<ConfirmModal
				loading={confirmLoading}
				data={info}
				dictionary={dictionary}
				afterClose={() => {
					setInfo( {} );
					setNeedUpdate( true );
				}}
				handleSubmit={fieldsValue => confirm( fieldsValue )}
				payMode={payMode}
				visible={confirmModalVisible}
				setVisible={toggleConfirmModalVisible}
				dispatch={dispatch}
			/>
			<TurnDownModal
				loading={rejectLoading}
				data={info}
				dictionary={dictionary}
				afterClose={() => {
					setInfo( {} );
					setNeedUpdate( true );
				}}
				handleSubmit={fieldsValue => reject( fieldsValue )}
				visible={rejectModalVisible}
				setVisible={toggleRejectModalVisible}
			/>
			<StudentInfoModal
				studentId={studentInfoId}
				visible={studentInfoModalVisible}
				setVisible={setStudentInfoModalVisible}
			/>
		</Card>
	);
};

export default connect( (
	{
		[ tableName ]: data1,
		loading,
		global,
		signUp,
		dictionary,
		quickEntryParams
	}
) => (
	{
		[ tableName ]: data1,
		loading,
		global,
		signUp,
		dictionary,
		quickEntryParams
	}
) )( Form.create()( SignUp ) );
