import React, { useState, useMemo } from 'react';
import { useToggle, } from 'react-use';
import moment from 'moment';
import { connect } from 'dva';
import {
	Form,
	Button,
	Card,
	Divider,
	Popconfirm,
	Menu,
	Dropdown,
	Icon,
	message
} from 'antd';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import Privilege from '@/components/Privilege';
import { getDictValue, queryDictionary } from '@/utils/dictionaryUtil';
import StudentInfoModal from '@/components/StudentInfoModal';
import ConfirmModal from './ConfirmModal';
const tableName = 'studentInfoOtherCostList';
import Buttons from '@/components/Buttons';
import printJS from 'print-js';

const OtherCost = props => {
		const { form, loading, dispatch, dictionary } = props;
		const [ needUpdate, setNeedUpdate ] = useToggle( false );
		const [ studentInfoId, setStudentInfoId ] = useState( undefined );
		const [ studentInfoModalVisible, setStudentInfoModalVisible ] = useState( false );

		const [ confirmModalVisible, toggleConfirmModalVisible ] = useToggle( false );
		const [ payMode, setPayMode ] = useState( undefined );
		const [ info, setInfo ] = useState( {} );
		const getStudentInfoLoading = loading.effects[ 'student/getInfo' ] || false;
		const confirmLoading = loading.effects[ `${tableName}/insure` ] || false;
		const rejectLoading = loading.effects[ `${tableName}/reject` ] || false;


		const getStudentInfo = record => {
			const { studentId } = record;
			dispatch( {
				type: 'student/getStudentInfo',
				payload: studentId,
			} ).then( student => {
				const { id, } = record;
				
				const value0 = record[ FIELDS.STUDENT.NAME.key ];
				const value1 = student.baseInfo[ FIELDS.STUDENT.MAJOR_CARD_CODE.key ];
				const value2 = record[ FIELDS.FINANCE.AMOUNT.key ];
				
				setInfo( {
					type: 'classFee',
					[ FIELDS.STUDENT.NAME.key ]: value0,
					[ FIELDS.STUDENT.MAJOR_CARD_CODE.key ]: value1,
					[ FIELDS.FINANCE.AMOUNT.key ]: value2,
					id,
				} );
				toggleConfirmModalVisible( true );
			} );
		};
		const [ isSubmit, setIsSubmit ] = useState( false );

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
					if ( data.print ) {
						dispatch( {
							type: `${tableName}/print`,
							payload: {
								studentId: info.id,
								journalId,
								action: 'other_income_type_manage',
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
					...FIELDS.STUDENT.OTHER_COST_TYPE,
					customRender: ( text, record, ) => {
						return getDictValue( dictionary, 'other_income_type_manage', record[FIELDS.STUDENT.OTHER_COST_TYPE.key] )
					}
				},
				{
					...FIELDS.STUDENT.OTHER_COST_KM,
					customRender: ( text, record, ) => {
						return getDictValue( dictionary, record[FIELDS.STUDENT.OTHER_COST_TYPE.key], record[FIELDS.STUDENT.OTHER_COST_KM.key] );
					}
				},
				{
					...FIELDS.STUDENT.OTHER_COST_AMOUNT,
					title: '费用金额',
					customRender: text => String( text ).replace( /\B(?=(\d{3})+(?!\d))/g, ',' )
				},
				{
					...FIELDS.STUDENT.NAME,
					title: '学员姓名',
					customRender: ( text, record, ) => {
						return (
							<Privilege privs={[ 'detail_other_bus_fee_wait_pay_manage' ]}  noMatch={text}>
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
				{...FIELDS.FINANCE.MOBILE, title: '学员手机号'},
				FIELDS.STUDENT.OTHER_COST_DATE,
				FIELDS.STUDENT.OTHER_COST_MEMO,
				{...FIELDS.FINANCE.JOURNAL_CREATE_TIME, title: '提交时间'},
					{
					title: '操作',
					key: 'actions',
					customRender: ( text, record, ) => {
						return <Buttons>
									<Privilege privs={[ 'insure_other_bus_fee_wait_pay_manage' ]}  key="insure_other_bus_fee_wait_pay_manage">
										<Dropdown key="confirm" overlay={menu( record )}>
											<a>{getStudentInfoLoading && <Spin size="small"/>} 确认收费 <Icon type="down"/></a>
										</Dropdown>
									</Privilege>

									<Privilege privs={[ 'cancel_other_bus_fee_wait_pay_manage' ]}  key="cancel_other_bus_fee_wait_pay_manage">
										<Popconfirm
											key="cancel"
											title="确认取消交费吗？"
											onConfirm={() => {
												const { id } = record;
												dispatch( {
													type: `${tableName}/reject`,
													payload: id,
												} ).then( data => {
													if ( data !== false ) {
														dispatch( {
															type: `${tableName}/refresh`,
														} );
													}
												} );
											}}
										>
											<a>{rejectLoading && <Spin size="small"/>} 取消交费</a>
										</Popconfirm>
									</Privilege>
						</Buttons>
					}
				},
			];
		}, [ dictionary ])
		
		const year = moment().format( 'YYYY' );
		
		return (
			<Card>
				<WithTableName
					{...props}
					bodyStyle={{ padding: 0, }}
					tableName={tableName}
					originColumns={originColumns}
					multipleSelection={false}
					scroll={{ x: 'max-content' }}
					needUpdate={needUpdate}
					setNeedUpdate={setNeedUpdate}
					tableSearchParams={
						{opStatus: 0}
					}
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
					]}
				/>
				<StudentInfoModal
					studentId={studentInfoId}
					visible={studentInfoModalVisible}
					setVisible={setStudentInfoModalVisible}
					dictionary={dictionary}
					dispatch={dispatch}
				/>
				<ConfirmModal
					loading={confirmLoading}
					data={info}
					dictionary={dictionary}
					afterClose={() => {
						dispatch( {
							type: `${tableName}/refresh`,
						} );
						setInfo( {} );
					}}
					handleSubmit={fieldsValue => confirm( fieldsValue )}
					payMode={payMode}
					visible={confirmModalVisible}
					setVisible={toggleConfirmModalVisible}
					dispatch={dispatch}
				/>
			</Card>
		);
	}
;

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
) )( Form.create()( OtherCost ) );
