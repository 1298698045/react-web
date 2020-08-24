import React, { useState, useMemo, } from 'react';
import { useToggle, } from 'react-use';
import { connect } from 'dva';
import {
	Form,
	Card,
	Dropdown,
	Menu,
	Icon,
	Popconfirm, Spin, Divider,message
} from 'antd';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';

import numeral from 'numeral';
import ConfirmModal from './ConfirmModal';
import StudentInfoModal from '@/components/StudentInfoModal';
import printJS from 'print-js';
import Privilege from '@/components/Privilege';

const tableName = 'financeChargeSupplementaryFeeList';

const SupplementaryFee = props => {
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
				type: 'supplementaryFee',
				[ FIELDS.STUDENT.NAME.key ]: value0,
				[ FIELDS.STUDENT.MAJOR_CARD_CODE.key ]: value1,
				[ FIELDS.FINANCE.AMOUNT.key ]: value2,
				id,
			} );
			toggleConfirmModalVisible( true );
		} )
	};
	
	const confirm = data => {
		console.log( data, info );
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
							action: 'AFTER_PAY_EXAM',
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
						<Privilege privs={[ 'detail_after_pay_exam' ]}  noMatch={text}>
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
				...FIELDS.FINANCE.AMOUNT,
				title: '交费金额',
			},
			FIELDS.STUDENT.LICENSE_TYPE,
			FIELDS.FINANCE.SUPPLEMENTARY_KM,
			{
				title: '操作',
				key: 'actions',
				customRender: ( text, record, ) => {
					return [
						<Privilege privs={[ 'insure_pay_exam' ]}  key="insure_pay_exam1">
						<Dropdown key="confirm" overlay={menu( record )}>
							<a>{getStudentInfoLoading && <Spin size="small"/>} 确认收费 <Icon type="down"/></a>
						</Dropdown>
						</Privilege> 
						,
						<Privilege privs={[ 'insure_pay_exam' ]}  key="insure_pay_exam2">
						<Divider key="divider" type="vertical"/>
						</Privilege>
						,
						<Privilege privs={[ 'cancel_pay_exam' ]}  key="cancel_pay_exam">
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
) )( Form.create()( SupplementaryFee ) );
