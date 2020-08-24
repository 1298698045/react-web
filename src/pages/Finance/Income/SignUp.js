import React, { useState, useEffect, } from 'react';
import { useToggle, } from 'react-use';
import { connect } from 'dva';
import {
	Form,
	Button,
	Card,
	Tooltip, message,
} from 'antd';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import ExportModal from './ExportModal';
import numeral from 'numeral';
import { getDictValue, getDictItem, refreshDictionary, queryDictionary } from '@/utils/dictionaryUtil';
import StudentInfoModal from '@/components/StudentInfoModal';
import printJS from 'print-js';
// import downloadBlob from '@/utils/downloadBlob';
import Privilege from '@/components/Privilege';
import Buttons from '@/components/Buttons';
import RemarkModal from "./RemarkModal";

const tableName = 'financeIncomeSignUpList';

const IncomeSignUp = props => {
	const { form, dictionary, dispatch, loading, } = props;

	useEffect( () => {
		queryDictionary( dispatch, 'introducer_id' );
		refreshDictionary( dispatch, 'employee_id' );
	}, [] );
	const [ operationList, setOperationList ] = useState( [] );
	const [ exportModalVisible, toggleExportModalVisible ] = useToggle( false );
	const [ studentInfoModalVisible, setStudentInfoModalVisible ] = useState( false );
	const [ studentInfoId, setStudentInfoId ] = useState( undefined );
	const [ addRemarkVisible, setAddRemarkVisible ] = useState( false );

	const originColumns = [
		{
			title: '序号',
			key: 'key',
		},
		{
			...FIELDS.STUDENT.NAME,
			customRender: ( text, record, ) => {
				return (
					<Privilege privs={[ 'apply_charge_detail' ]}  noMatch={text}>
					<a onClick={e => {
						e.stopPropagation();
						setStudentInfoId( record.studentId );
						setStudentInfoModalVisible( true );
					}}>
						{text}
					</a></Privilege>
				)
			}
		},
		FIELDS.FINANCE.MOBILE,
		FIELDS.STUDENT.STUDENT_TYPE,
		{
			...FIELDS.STUDENT.CLASS_ID,
			title: '报名班型',
		},
		{
			...FIELDS.FINANCE.FEE_TYPE,
			customRender: ( text, { classId }, ) => {
				// console.log( classId, dictionary );
				if ( classId ) {
					const item = getDictItem( dictionary, FIELDS.STUDENT.CLASS_ID.dictionary, classId );
					if ( !item ) return '';
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
			title: '收费人',
			key: 'payee',
			customRender: ( text, record ) => {
				const { payee } = record;
				if ( payee ) {
					
					const employee = ( dictionary[ FIELDS.EMPLOYEE.ID.dictionary ] || [] ).find( ( { uid } ) => String( uid ) === String( payee ) );
					
					if ( employee ) {
						return employee.name;
					}
				}
				return '暂无';
			},
		},
		{
			title: '收费日期',
			key: 'payTime',
		},
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record, ) => {
				const { studentId, journalId } = record;
				return (
					<Buttons>
					{/* // <Privilege privs={[ 'apply_charge_print' ]}  noMatch={'打印收据'}> */}
					<a key="remark" onClick={() => {
						setStudentInfoId( record.studentId );
						setAddRemarkVisible(true)
					}}>备注</a>
					{/* // </Privilege> */}
					<Privilege privs={[ 'apply_charge_print' ]}  noMatch={'打印收据'}>
					<a key="cancel" onClick={() => {
						dispatch( {
							type: `${tableName}/print`,
							payload: {
								studentId,
								journalId,
								action: 'REPORT_ADD',
							}
						} ).then( data => {
							if ( data !== false ) {
								printJS( 'data:image/jpg;base64,' + data, 'image' );
							}
						} );
					}}>打印收据</a></Privilege></Buttons>
				)
			},
		},
	];
	
	const tableActions = [
		<Privilege privs={[ 'apply_charge_export' ]} key="apply_charge_export">
		<Button key="export-button"
		        icon="download"
		        htmlType="button"
		        type="primary"
		        onClick={() => toggleExportModalVisible( true )}
		>导出报表</Button></Privilege>,
	];
	
	const exportLoading = loading.effects[ `${tableName}/exportList` ] || false;
	const onChange = (key, value) => {
		form.setFieldsValue( { intro: undefined } );
		if (value === 1) {
			setOperationList(dictionary['employee_id']);
		} 
		if (value === 2) {
			setOperationList(dictionary['introducer_id'].filter(one => one.dictSwitch * 1 === 1));
		}
		if (typeof value === 'undefined'){
			setOperationList([])
		}
	}
	return (
		<Card>
			<WithTableName
				{...props}
				bodyStyle={{ padding: 0, }}
				tableName={tableName}
				tableActions={tableActions}
				originColumns={originColumns}
				multipleSelection={false}
				scroll={{ x: 'max-content' }}
				formFields={[
					<WrapperComplexFormItem
						config={FIELDS.FINANCE.LICENSE_TYPE_ACTIVE}
						form={form}
					/>,
					<WrapperComplexFormItem
						config={FIELDS.FINANCE.STUDENT_TYPE}
						form={form}
					/>,
					<WrapperComplexFormItem
						config={FIELDS.FINANCE.CLASS_ID}
						form={form}
					/>,
					<WrapperComplexFormItem
						config={FIELDS.FINANCE.INTRO_TYPE}
						values={ [
							{dKey: 1, dValue: '员工'},
							{dKey: 2, dValue: '校外介绍人'}
						]}
						onChange={onChange}
						form={form}
					/>,
					<WrapperComplexFormItem
						config={FIELDS.FINANCE.INTRO}
						values={operationList}
						form={form}
					/>,
					<WrapperComplexFormItem
						config={FIELDS.FINANCE.QUICK_SEARCH}
						form={form}
					/>,
					<WrapperComplexFormItem
						config={{...FIELDS.FINANCE.SEARCH_DATE,title: '收费日期'}}
						col={9}
						form={form}
					/>,
				]}
			/>
			<ExportModal
				loading={exportLoading}
				handleSubmit={fieldsValue => {
					dispatch( {
						type: `${tableName}/exportList`,
						payload: fieldsValue,
					} ).then( res => {
						console.log( res );
						const { code } = res;
						if ( code !== 0 ) {
							message.error( res.msg );
						} else {
							const { data } = res;
							message.error( '导出成功！' );
							toggleExportModalVisible( false );
							window.open( data );
						}
						// downloadBlob( '报名交费导出.xls', data );
					} );
				}}
				visible={exportModalVisible}
				setVisible={toggleExportModalVisible}
			/>
			<StudentInfoModal
				studentId={studentInfoId}
				visible={studentInfoModalVisible}
				setVisible={setStudentInfoModalVisible}
			/>
			<RemarkModal
				studentId={studentInfoId}
				visible={addRemarkVisible}
				setVisible={setAddRemarkVisible}
				loading={loading.effects[ `income/addMemo` ]}
				onSubmit={params => {
					return dispatch( {
						type: `income/addMemo`,
						params,
					} ).then( () => {
						setAddRemarkVisible(false)
					} );
				}}
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
	}
) => (
	{
		[ tableName ]: data1,
		loading,
		global,
		signUp,
		dictionary,
	}
) )( Form.create()( IncomeSignUp ) );
