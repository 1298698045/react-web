import React, { useState, useMemo, } from 'react';
import { useToggle, } from 'react-use';
import { connect } from 'dva';
import {
	Form,
	Card,
	Dropdown,
	Menu,
	Icon,
	Popconfirm, Spin, Divider, Tooltip,message
} from 'antd';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import ConfirmModal from './ConfirmModal';
import StudentInfoModal from '@/components/StudentInfoModal';
import printJS from 'print-js';
import numeral from 'numeral';
import Privilege from '@/components/Privilege';

const tableName = 'financeChargeClassFeeList';

const ClassFee = props => {
	const { form, dispatch, loading, dictionary, } = props;
	const [ confirmModalVisible, toggleConfirmModalVisible ] = useToggle( false );
	const [ payMode, setPayMode ] = useState( undefined );
	const [ info, setInfo ] = useState( {} );
	const [ studentInfoModalVisible, setStudentInfoModalVisible ] = useState( false );
	const [ studentInfoId, setStudentInfoId ] = useState( undefined );
	
	const confirmLoading = loading.effects[ `${tableName}/insure` ] || false;
	const rejectLoading = loading.effects[ `${tableName}/reject` ] || false;
	const getStudentInfoLoading = loading.effects[ 'student/getInfo' ] || false;
	const [ isSubmit, setIsSubmit ] = useState( false );

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
							action: 'BUY_LESSON',
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
				...FIELDS.STUDENT.NAME,
				customRender: ( text, record, ) => {
					return (
						<Privilege privs={[ 'buy_lesson_detail' ]}  noMatch={text}>
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
				...FIELDS.FINANCE.REFUND_REASON,
				title: '备注',
			},
			{
				title: '操作',
				key: 'actions',
				customRender: ( text, record, ) => {
					return [
						<Privilege privs={[ 'buy_lesson_comfirm' ]}  key="buy_lesson_comfirm">
						<Dropdown key="confirm" overlay={menu( record )}>
							<a>{getStudentInfoLoading && <Spin size="small"/>} 确认收费 <Icon type="down"/></a>
						</Dropdown></Privilege>,
						<Privilege privs={[ 'buy_lesson_comfirm' ]}  key="buy_lesson_comfirm1">
						<Divider key="divider" type="vertical"/></Privilege>,
						<Privilege privs={[ 'buy_lesson_cancel' ]}  key="buy_lesson_cancel">
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
						</Popconfirm></Privilege>,
					]
				}
			},
		]
	}, [ dictionary ] );
	
	return (
		<Card>
			<WithTableName
				{...props}
				bodyStyle={{ padding: 0, }}
				tableName={tableName}
				originColumns={originColumns}
				multipleSelection={false}
				scroll={{ x: 'max-content' }}
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
			<StudentInfoModal
				studentId={studentInfoId}
				visible={studentInfoModalVisible}
				setVisible={setStudentInfoModalVisible}
				dictionary={dictionary}
				dispatch={dispatch}
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
) )( Form.create()( ClassFee ) );
