import React, { useState } from 'react';
import { useToggle } from 'react-use';
import { connect } from 'dva';
import {
	Form,
	Card, Button, Tooltip,
} from 'antd';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import BuyClassModal from './BuyClassModal';
import { getDictValue } from '@/utils/dictionaryUtil';
import StudentInfoModal from '@/components/StudentInfoModal';
import printJS from 'print-js';
import numeral from 'numeral';
import Privilege from '@/components/Privilege';
import Buttons from '@/components/Buttons';
import RemarkModal from "./RemarkModal";
const tableName = 'incomeFinanceClassFeeList';

const ClassFee = props => {
		const { form, dispatch, dictionary, loading, } = props;
		const [ buyClassModalVisible, toggleBuyClassModalVisible ] = useToggle( false );
		const [ needUpdate, setNeedUpdate ] = useToggle( false );
		const [ studentInfoModalVisible, setStudentInfoModalVisible ] = useState( false );
		const [ studentInfoId, setStudentInfoId ] = useState( undefined );
		const [ addRemarkVisible, setAddRemarkVisible ] = useState( false );

		const tableActions = [
			<Button key="buy-button"
			        icon="form"
			        htmlType="button"
			        type="primary"
			        onClick={() => toggleBuyClassModalVisible( true )}>购买课时</Button>,
		];
		
		const originColumns = [
			{
				title: '序号',
				key: 'key',
			},
			{
				...FIELDS.STUDENT.NAME,
				customRender: ( text, record, ) => {
					return (
						<Privilege privs={[ 'charge_lesson_detail' ]}  noMatch={text}>
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
			FIELDS.STUDENT.MAJOR_CARD_CODE,
			{
				key: 'km2',
				title: '科目二课节',
				customRender: ( text, record, ) => {
					const km2 = JSON.parse( record.memo ).km2;
					return km2
						?
						(
							<Tooltip title={`${numeral( km2.money ).format( '0,0' )}元`}>
								<a>{`${km2.count}节`}</a>
							</Tooltip>
						)
						:
						'暂无'
				}
			},
			{
				key: 'km3',
				title: '科目三课节',
				customRender: ( text, record, ) => {
					const km3 = JSON.parse( record.memo ).km3;
					return km3
						?
						(
							<Tooltip title={`${numeral( km3.money ).format( '0,0' )}元`}>
								<a>{`${km3.count}节`}</a>
							</Tooltip>
						) :
						'暂无'
				}
			},
			{
				...FIELDS.FINANCE.AMOUNT,
				title: '总费用',
			},
			{
				title: '收费人',
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
				},
			},
			{
				title: '收费时间',
				key: 'payTime',
			},
			{
				...FIELDS.FINANCE.REFUND_REASON,
				title: '备注',
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
						<Privilege privs={[ 'charge_lesson_print' ]}  noMatch={'打印收据'}>
						<a key="cancel" onClick={() => {
							dispatch( {
								type: `${tableName}/print`,
								payload: {
									studentId,
									journalId,
									action: 'BUY_LESSON',
								}
							} ).then( data => {
								if ( data !== false ) {
									printJS( 'data:image/jpg;base64,' + data, 'image' );
								}
							} );
						}}>打印收据</a></Privilege>
						</Buttons>
					)
				},
			},
		];
		
		const buyClassLoading = loading.effects[ `${tableName}/buyLessons` ];
		
		const buyClass = payload => {
			dispatch( {
				type: `${tableName}/buyLessons`,
				payload,
			} ).then( data => {
				if ( data !== false ) {
					toggleBuyClassModalVisible( false );
				}
			} );
		};
		
		return (
			<Card>
				<WithTableName
					{...props}
					bodyStyle={{ padding: 0, }}
					tableActions={tableActions}
					tableName={tableName}
					originColumns={originColumns}
					multipleSelection={false}
					scroll={{ x: 'max-content' }}
					needUpdate={needUpdate}
					setNeedUpdate={setNeedUpdate}
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
				<BuyClassModal
					afterClose={() => setNeedUpdate( true )}
					tableName={tableName}
					dispatch={dispatch}
					dictionary={dictionary}
					visible={buyClassModalVisible}
					setVisible={toggleBuyClassModalVisible}
					loading={buyClassLoading}
					handleSubmit={buyClass}
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
	}
;

export default connect( (
	{
		[ tableName ]: data1,
		loading,
		global,
		classFee,
		dictionary,
	}
) => (
	{
		[ tableName ]: data1,
		loading,
		global,
		classFee,
		dictionary,
	}
) )( Form.create()( ClassFee ) );
