import React, { useState, useEffect, useCallback, useMemo, } from 'react';
import { connect } from 'dva';
import {
	Form,
	Button,
	Tabs,
	Card,
	Tag,
} from 'antd';
import ChangeCoachModal from './ChangeCoachModal';
import ChangeStatusModal from './ChangeStatusModal';
import ChangeClassModal from './ChangeClassModal';
import MakeUpTuitionModal from './MakeUpTuitionModal';
import PaymentFeeModal from './PaymentFeeModal';
import PurchaseClassModal from './PurchaseClassModal';
import StudentInfoModal from '@/components/StudentInfoModal';
import ChangeTelModal from './ChangeTelModal';
import HelpModal from './HelpModal';
import DropOutModal from './DropOutModal';
import OtherCostModal from './OtherCostModal';
import AddStudentFinishModal from './AddStudentFinishModal';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import { useEffectOnce, useGetSet, useToggle } from 'react-use';
import { getDictItem, getDictValue, queryDictionary, refreshDictionary } from '@/utils/dictionaryUtil';
import Privilege from '@/components/Privilege';
import { hasPriv } from '@/utils/privilege';
import AddFeeModal from '@/pages/Finance/Expenditure/AddFeeModal';

import style from './index.less';
import SignUpMemoModal from '@/pages/Student/SignUp/SignUpMemoModal';

const { TabPane } = Tabs;

const originRowMenuItems1 = [
	{
		priv: 'change_class',
		key: 'changeClass',
		title: '班型变更',
	},
	{
		priv: 'after_pay_tuition',
		key: 'makeUpTuition',
		title: '补交学费',
	},
	{
		priv: 'after_pay_exam',
		key: 'paymentFee',
		title: '收补考费',
	},
	{
		priv: 'entrust',
		key: 'commission',
		title: '委培',
	},
	{
		priv: 'drop_lession',
		key: 'dropOut',
		title: '学员退学',
	},
	{
		priv: 'buy_lession',
		key: 'purchaseClass',
		title: '购买课时',
	},
	{
		priv: 'update_mobile',
		key: 'modifyPhoneNumber',
		title: '修改手机号',
	},
	{
		priv: 'other_bus_fee_studing',
		key: 'otherCost',
		title: '其它业务收入',
	},
	{
		priv: 'student_pay_studing',
		key: 'expenditure',
		title: '学员支出',
	}
];
const originRowMenuItems = originRowMenuItems1.filter( r => hasPriv( [ r.priv ] ) );

const tableName1 = 'studentStudyingLocalList';
const tableName2 = 'studentDropOutLocalList';
const tableName3 = 'studentGraduationLocalList';
const tableName4 = 'studentDropOutLocalAwaitList';

const Local = props => {
	const { quickEntryParams, form, dispatch, dictionary, loading, memoLoading, } = props;
	const [ currentRecord, setCurrentRecord ] = useState( {} );
	const [ signUpMemoModalVisible, toggleSignUpMemoModalVisible ] = useToggle( false );
	const [ changeCoachModalVisible, setChangeCoachModalVisible ] = useState( false );
	const [ changeStatusModalVisible, setChangeStatusModalVisible ] = useState( false );
	const [ changeClassModalVisible, setChangeClassModalVisible ] = useState( false );
	const [ makeUpTuitionModalVisible, setMakeUpTuitionModalVisible ] = useState( false );
	const [ paymentFeeModalVisible, setPaymentFeeModalVisible ] = useState( false );
	const [ helpModalVisible, setHelpModalVisible ] = useState( false );
	const [ dropOutModalVisible, setDropOutModalVisible ] = useState( false );
	const [ otherCostModalModalVisible, setOtherCostModalVisible ] = useState( false );
	const [ purchaseClassModalVisible, setPurchaseClassModalVisible ] = useState( false );
	const [ changeTelModalVisible, setChangeTelModalVisible ] = useState( false );
	const [ studentInfoModalVisible, setStudentInfoModalVisible ] = useState( false );
	const [ studentInfoId, setStudentInfoId ] = useState( undefined );
	const [ selectedRows, setSelectedRows ] = useState( [] );
	const [ tabKey, setTabKey ] = useState( '-1' );
	const [ rowMenuItems, setRowMenuItems ] = useState( [ ...originRowMenuItems ] );
	const [ needUpdate, setNeedUpdate ] = useToggle( false );
	const [ needUpdate2, setNeedUpdate2 ] = useToggle( false );
	const [ needUpdate3, setNeedUpdate3 ] = useToggle( false );
	const [ needUpdate1, setNeedUpdate1 ] = useToggle( false );
	const [ studentInfo, setStudentInfo ] = useState( { finance: {} } );
	const [ tableSearchParams, setTableSearchParams ] = useState( {} );
	const [ getClassValues, setClassValues ] = useGetSet( [] );
	const [ getClassDisabled, setClassDisabled ] = useGetSet( true );
	// const [ getLicenseType, setLicenseType ] = useGetSet( [] );
	// const [ getLicenseTypeDisabled, setLicenseTypeDisabled ] = useGetSet( true );
	const [ getChangeCoachDisabled, setChangeCoachDisabled ] = useGetSet( true );
	
	const [ intensiveCourseSwitch, setIntensiveCourseSwitch ] = useState( false );
	
	const [ addStudentFinishModalVisible, toggleAddStudentFinishModalVisible ] = useToggle( false );
	const [ addFeePopVisible, toggleAddFeePopVisible ] = useToggle( false );
	const confirmLoading = loading.effects[ `finance/saveExpenditure` ];

	useEffect( () => {
		dispatch( {
			type: `systemConfig/intensiveCourseSwitch`,
		} ).then(res => {
			setIntensiveCourseSwitch(res === 'on' ? true : false)
		});
		refreshDictionary( dispatch, 'employee_id' );
		queryDictionary( dispatch, 'class_id' );
		queryDictionary( dispatch, 'colla_id' );
	}, [] );

	useEffectOnce( () => {
		if (quickEntryParams) {
			setTableSearchParams(quickEntryParams)
		}
		setTabKey(quickEntryParams.tabKey || '0')
		dispatch( {
			type: 'quickEntryParams/clearParams',
		} );
	}, [ dispatch ] );
	// 学习中
	const originColumns0 = [
		{
			title: '序号',
			key: 'key',
		},
		{
			...FIELDS.STUDENT.NAME,
			customRender: ( text, record, ) => {
				const { studentId } = record;
				return (
					<Privilege privs={[ 'studing_detail' ]} noMatch={text}>
						<a onClick={e => {
							e.stopPropagation();
							// setStudentInfoId( record.id );
							setStudentInfoId( studentId );
							setStudentInfoModalVisible( true );
						}}>
							{text}
						</a>
					</Privilege>
				)
			}
		},
		{
			...FIELDS.STUDENT.GENDER,
			customRender: ( text, record, ) => {
				const { baseInfo: { gender } } = record;
				return getDictValue( dictionary, FIELDS.STUDENT.GENDER.dictionary, String( gender ) )
			}
		},
		FIELDS.STUDENT.MOBILE,
		FIELDS.STUDENT.KM1_STATUS,
		FIELDS.STUDENT.KM2_STATUS,
		FIELDS.STUDENT.KM3_STATUS,
		FIELDS.STUDENT.KM4_STATUS,
		{
			...FIELDS.STUDENT.COACH_ID,
			title: '当前教练',
			customRender: ( text, record ) => {
				const { km2CoachId, km3CoachId } = record;
				return <>
					{km2CoachId !== 0 &&
					<Tag
						className={style.tag}>{`科目二：${getDictValue( dictionary, FIELDS.ASSET.EMPLOYEE_ID.dictionary, String( km2CoachId ) )}`}</Tag>}
					{km3CoachId !== 0 &&
					<Tag
						className={style.tag}>{`科目三：${getDictValue( dictionary, FIELDS.ASSET.EMPLOYEE_ID.dictionary, String( km3CoachId ) )}`}</Tag>}
					{km2CoachId === 0 && km3CoachId === 0 && '暂无'}
				</>
			}
		},
		FIELDS.STUDENT.LICENSE_TYPE_ACTIVE,
		FIELDS.STUDENT.CLASS_ID,
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record, ) => 
			<Privilege privs={[ 'memo_studing' ]} noMatch={text}>
				<a
					key="memo"
					onClick={() => {
						setCurrentRecord( record );
						toggleSignUpMemoModalVisible( true );
					}}
				>备注</a>
			</Privilege>
		},
	];

	// 已退学
	const originColumns1 = [
		{
			title: '序号',
			key: 'key',
		},
		{
			...FIELDS.STUDENT.NAME,
			customRender: ( text, record, ) => {
				const { studentId } = record;
				return (
					<Privilege privs={[ 'droped_study_detail' ]} noMatch={text}>
						<a onClick={e => {
							e.stopPropagation();
							// setStudentInfoId( record.id );
							setStudentInfoId( studentId );
							setStudentInfoModalVisible( true );
						}}>
							{text}
						</a>
					</Privilege>
				)
			}
		},
		{
			...FIELDS.STUDENT.GENDER,
			customRender: ( text, record, ) => {
				const { baseInfo: { gender } } = record;
				return getDictValue( dictionary, FIELDS.STUDENT.GENDER.dictionary, String( gender ) )
			}
		},
		FIELDS.STUDENT.MOBILE,
		FIELDS.STUDENT.KM1_STATUS,
		FIELDS.STUDENT.KM2_STATUS,
		FIELDS.STUDENT.KM3_STATUS,
		FIELDS.STUDENT.KM4_STATUS,
		{
			...FIELDS.STUDENT.COACH_ID,
			title: '当前教练',
			customRender: ( text, record ) => {
				const { km2CoachId, km3CoachId } = record;
				return <>
					{km2CoachId !== 0 &&
					<Tag
						className={style.tag}>{`科目二：${getDictValue( dictionary, FIELDS.ASSET.EMPLOYEE_ID.dictionary, String( km2CoachId ) )}`}</Tag>}
					{km3CoachId !== 0 &&
					<Tag
						className={style.tag}>{`科目三：${getDictValue( dictionary, FIELDS.ASSET.EMPLOYEE_ID.dictionary, String( km3CoachId ) )}`}</Tag>}
					{km2CoachId === 0 && km3CoachId === 0 && '暂无'}
				</>
			}
		},
		FIELDS.STUDENT.LICENSE_TYPE,
		FIELDS.STUDENT.CLASS_ID,
		{

			...FIELDS.FINANCE.REFUND_TYPE,
			customRender: ( text, record, ) => {
				const { refund: { refundType } } = record;
				return getDictValue( dictionary, FIELDS.FINANCE.REFUND_TYPE.dictionary, refundType );
			}
		},
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record, ) => 
				(
				<Privilege privs={[ 'memo_droped' ]} noMatch={'备注'}>
					<a
						key="memo"
						onClick={() => {
							setCurrentRecord( record );
							toggleSignUpMemoModalVisible( true );
						}}
					>备注</a>
				</Privilege>
			)
		},
	];

	// 已毕业
	const originColumns2 = [
		{
			title: '序号',
			key: 'key',
		},
		{
			...FIELDS.STUDENT.NAME,
			customRender: ( text, record, ) => {
				const { studentId } = record;
				return (
					<Privilege privs={[ 'graduated_detail' ]} noMatch={text}>
						<a onClick={e => {
							e.stopPropagation();
							// setStudentInfoId( record.id );
							setStudentInfoId( studentId );
							setStudentInfoModalVisible( true );
						}}>
							{text}
						</a>
					</Privilege>
				)
			}
		},
		{
			...FIELDS.STUDENT.GENDER,
			customRender: ( text, record, ) => {
				const { baseInfo: { gender } } = record;
				return getDictValue( dictionary, FIELDS.STUDENT.GENDER.dictionary, String( gender ) )
			}
		},
		FIELDS.STUDENT.MOBILE,
		FIELDS.STUDENT.DEPART_ID_SCHOOL,
		FIELDS.STUDENT.LICENSE_TYPE,
		FIELDS.STUDENT.CLASS_ID,
		{
			...FIELDS.STUDENT.FEE_TYPE,
			customRender: ( text, record, ) => {
				const { finance } = record;

				return getDictValue( dictionary, FIELDS.STUDENT.FEE_TYPE.dictionary, String( finance[ FIELDS.STUDENT.FEE_TYPE.key ] ) )
			}
		},
		{
			...FIELDS.STUDENT.GRADUATION_TIME,
			customRender: text => {
				return text || '暂无';
			}
		},
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record, ) => {
				return (
				<Privilege privs={[ 'memo_graduated' ]} noMatch={'备注'}>
					<a
						key="memo"
						onClick={() => {
							setCurrentRecord( record );
							toggleSignUpMemoModalVisible( true );
						}}
					>备注</a>
				</Privilege>
				)
			}
		},
	];

	// 退学中
	const originColumns3 = [
		{
			title: '序号',
			key: 'key',
		},
		{
			...FIELDS.STUDENT.NAME,
			customRender: ( text, record, ) => {
				const { studentId } = record;
				return (
					<Privilege privs={[ 'droping_study_detail' ]} noMatch={text}>
						<a onClick={e => {
							e.stopPropagation();
							// setStudentInfoId( record.id );
							setStudentInfoId( studentId );
							setStudentInfoModalVisible( true );
						}}>
							{text}
						</a>
					</Privilege>
				)
			}
		},
		{
			...FIELDS.STUDENT.GENDER,
			customRender: ( text, record, ) => {
				const { baseInfo: { gender } } = record;
				return getDictValue( dictionary, FIELDS.STUDENT.GENDER.dictionary, String( gender ) )
			}
		},
		FIELDS.STUDENT.MOBILE,
		FIELDS.STUDENT.KM1_STATUS,
		FIELDS.STUDENT.KM2_STATUS,
		FIELDS.STUDENT.KM3_STATUS,
		FIELDS.STUDENT.KM4_STATUS,
		{
			...FIELDS.STUDENT.COACH_ID,
			title: '当前教练',
			customRender: ( text, record ) => {
				const { km2CoachId, km3CoachId } = record;
				return <>
					{km2CoachId !== 0 &&
					<Tag
						className={style.tag}>{`科目二：${getDictValue( dictionary, FIELDS.ASSET.EMPLOYEE_ID.dictionary, String( km2CoachId ) )}`}</Tag>}
					{km3CoachId !== 0 &&
					<Tag
						className={style.tag}>{`科目三：${getDictValue( dictionary, FIELDS.ASSET.EMPLOYEE_ID.dictionary, String( km3CoachId ) )}`}</Tag>}
					{km2CoachId === 0 && km3CoachId === 0 && '暂无'}
				</>
			}
		},
		FIELDS.STUDENT.LICENSE_TYPE,
		FIELDS.STUDENT.CLASS_ID,
		{

			...FIELDS.FINANCE.REFUND_TYPE,
			customRender: ( text, record, ) => {
				const { refund: { refundType } } = record;
				return getDictValue( dictionary, FIELDS.FINANCE.REFUND_TYPE.dictionary, refundType );
			}
		},
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record, ) => {
				return (
					<Privilege privs={[ 'memo_droping' ]} noMatch={text}>
						<a
							key="memo"
							onClick={() => {
								setCurrentRecord( record );
								toggleSignUpMemoModalVisible( true );
							}}
						>备注</a>
					</Privilege>
				)
			}
		},
	];

	const getStudentInfo = studentId => cb => {
		dispatch( {
			type: 'student/getStudentInfo',
			payload: studentId,
		} ).then( data => {
			setStudentInfo( data );
			cb();
		} );
	};

	const handleMenuClick = useCallback( ( { key } ) => {
		switch ( key ) {
			case 'changeClass':
				getStudentInfo( selectedRows[ 0 ].studentId )( () => setChangeClassModalVisible( true ) );
				break;
			case 'makeUpTuition':
				getStudentInfo( selectedRows[ 0 ].studentId )( () => setMakeUpTuitionModalVisible( true ) );
				break;
			case 'paymentFee':
				setPaymentFeeModalVisible( true );
				break;
			case 'commission':
				setHelpModalVisible( true );
				break;
			case 'dropOut':
				setDropOutModalVisible( true );
				break;
			case 'purchaseClass':
				setPurchaseClassModalVisible( true );
				break;
			case 'modifyPhoneNumber':
				setChangeTelModalVisible( true );
				break;
			case 'otherCost':
				setOtherCostModalVisible( true );
				break;
			case 'expenditure':
				toggleAddFeePopVisible( true );
				break;
			default:
				return false;
		}
	}, [ selectedRows ] );

	const studyingTableActions = [
		<Privilege privs={['change_coach']} key="change_coach">
			<Button disabled={getChangeCoachDisabled()}
				key="coach-button"
				icon="form"
				htmlType="button"
				type="primary"
				onClick={() => setChangeCoachModalVisible( true )}>更换教练</Button>
		</Privilege>,
		<Privilege privs={['change_schedule']} key="change_schedule">
			<Button disabled={selectedRows.length === 0} key="status-button" icon="edit" htmlType="button" type="primary"
		        onClick={() => {
			        setChangeStatusModalVisible( true );
		        }}>进度变更</Button>
		</Privilege>,
	];
	const endTableActions = [
		<Privilege privs={['add_student_graduated']} key="add_student_graduated">
			<Button key="end"
				icon="form"
				htmlType="button"
				type="primary"
				onClick={() => toggleAddStudentFinishModalVisible( true )}>新增毕业学员</Button>
		</Privilege>
	];
	useEffect( () => {
		if ( selectedRows.length > 1 ) {
			setRowMenuItems( [] );
			const license = selectedRows[ 0 ].licenseType;
			const { bookNum } = dictionary[ FIELDS.STUDENT.CLASS_ID.dictionary ].find( ( { dKey } ) => {
				return dKey === String( selectedRows[ 0 ][ FIELDS.STUDENT.CLASS_ID.key ] );
			} );
			const filter = selectedRows.filter( s => {
				// 这里需要判断多个学员的申领类型和人车上限相同，才可以更换教练。
				const sameLic = s.licenseType === license;
				const b = dictionary[ FIELDS.STUDENT.CLASS_ID.dictionary ].find( ( { dKey } ) => {
					return dKey === String( s[ FIELDS.STUDENT.CLASS_ID.key ] );
				} );
				const sameBook = b.bookNum === bookNum;
				return sameLic && sameBook;
			} );
			if ( filter.length === selectedRows.length ) {
				setChangeCoachDisabled( false );
			} else {
				setChangeCoachDisabled( true );
			}
		} else {
			let oList = [ ...originRowMenuItems ];
			if ( selectedRows.length === 1 ) {
				setChangeCoachDisabled( false );
				const { classId } = selectedRows[ 0 ];
				const currentClass = getDictItem( dictionary, FIELDS.STUDENT.CLASS_ID.dictionary, classId );

				if ( currentClass ) {
					const { payType } = currentClass;
					// 2019.08.27 zhouyan修改  放开班型仅为课时得情况下购买课时，所有班型下都可以购买课时
					// if ( payType !== 'lesson' ) {
					// 	const spliceIndex = oList.findIndex( ( { key } ) => key === 'purchaseClass' );
					// 	if ( spliceIndex !== -1 ) {
					// 		oList.splice( spliceIndex, 1 );
					// 	}
					// }
					// if ( payType !== 'down_pay' ) {
					// 	const spliceIndex = oList.findIndex( ( { key } ) => key === 'makeUpTuition' );
					// 	if ( spliceIndex !== -1 ) {
					// 		oList.splice( spliceIndex, 1 );
					// 	}
					// }
				}
			} else {
				setChangeCoachDisabled( true );
			}

			setRowMenuItems( oList );
		}
	}, [ selectedRows ] );

	const onChange = ( key, value ) => {
		if ( key === FIELDS.STUDENT.DEPART_ID_SCHOOL.key && dictionary[ 'class_id' ] ) {
			let values = dictionary[ 'class_id' ].filter( v => v.dictSwitch == 1 ).filter( ( { departId } ) => {
				const d = String( departId ).split( ',' );

				return d.includes( value );
			} );

			if ( values.length > 0 ) {
				if ( !form.getFieldValue( FIELDS.STUDENT.LICENSE_TYPE.key ) ) {
					setClassValues( values );
					setClassDisabled( values.length === 0 );
				} else {
					let r = values.filter( ( { licenseType } ) => licenseType === form.getFieldValue( FIELDS.STUDENT.LICENSE_TYPE.key ) );

					setClassValues( r );
					setClassDisabled( r.length === 0 );
				}
			} else {
				setClassValues( [] );
				setClassDisabled( true );
			}

			form.setFieldsValue( {
				[ FIELDS.STUDENT.CLASS_ID.key ]: undefined,
			} );
		}

		if ( key === FIELDS.STUDENT.LICENSE_TYPE.key && dictionary[ FIELDS.STUDENT.LICENSE_TYPE.dictionary ] && dictionary[ 'class_id' ] ) {
			let values = dictionary[ 'class_id' ].filter( v => v.dictSwitch == 1 ).filter( ( { licenseType } ) => licenseType === value );

			if ( values.length > 0 ) {
				console.log( values, value, );
				if ( !form.getFieldValue( FIELDS.STUDENT.DEPART_ID_SCHOOL.key ) ) {
					setClassValues( values );
					setClassDisabled( values.length === 0 );
				} else {
					let r = values.filter( ( { departId } ) => {
						const d = String( departId ).split( ',' );

						return d.includes( form.getFieldValue( FIELDS.STUDENT.DEPART_ID_SCHOOL.key ) );
					} );

					setClassValues( r );
					setClassDisabled( r.length === 0 );
				}
			} else {
				setClassValues( [] );
				setClassDisabled( true );
			}

			form.setFieldsValue( {
				[ FIELDS.STUDENT.CLASS_ID.key ]: undefined,
			} );
		}
	};

	// 学习中
	const fields0 = [
		FIELDS.STUDENT.QUICK_SEARCH,
		{
			...FIELDS.STUDENT.DEPART_ID_SCHOOL,
			initialValue: tableSearchParams.departId || undefined
		},
		{
			...FIELDS.STUDENT.LICENSE_TYPE_ACTIVE,
			initialValue: tableSearchParams.licenseType || undefined
			// values: getLicenseType(),
			// disabled: getLicenseTypeDisabled(),
		},
		{
			...FIELDS.STUDENT.CLASS_ID,
			initialValue: tableSearchParams.classId || undefined,
			values: getClassValues(),
			disabled: getClassDisabled(),
		},
		{ 
			...FIELDS.STUDENT.EXAM_COACH_ID, title: '当前教练', 
			type: 'select',
			initialValue: tableSearchParams.coachId || undefined,
		},
		{
			key: 'kmStatus',
			title: '科目状态',
			type: 'select',
			mode: 'cascader',
			values: [
				{
					dKey: 'km1',
					dValue: '科目一',
					children: [
						{
							dKey: '1',
							dValue: '进行中'
						},
						{
							dKey: '9',
							dValue: '已完成'
						},
					]
				},
				{
					dKey: 'km2',
					dValue: '科目二',
					children: [
						{
							dKey: '0',
							dValue: '待激活'
						},
						{
							dKey: '1',
							dValue: '进行中'
						},
						{
							dKey: '2',
							dValue: '集训中'
						},
						{
							dKey: '6',
							dValue: '委培进行中'
						},
						{
							dKey: '9',
							dValue: '已完成'
						},
					]
				},
				{
					dKey: 'km3',
					dValue: '科目三',
					children: [
						{
							dKey: '0',
							dValue: '待激活'
						},
						{
							dKey: '1',
							dValue: '进行中'
						},
						{
							dKey: '2',
							dValue: '集训中'
						},
						{
							dKey: '6',
							dValue: '委培进行中'
						},
						{
							dKey: '9',
							dValue: '已完成'
						},
					]
				},
				{
					dKey: 'km4',
					dValue: '科目四',
					children: [
						{
							dKey: '0',
							dValue: '待激活'
						},
						{
							dKey: '1',
							dValue: '进行中'
						},
						{
							dKey: '9',
							dValue: '已完成'
						},
					]
				},
			]
		},
	];

	// 退学中
	const fields1 = [
		// 
		FIELDS.STUDENT.DEPART_ID_SCHOOL,
		{ ...FIELDS.FINANCE.REFUND_TYPE, title: '退学类型' },
		FIELDS.STUDENT.QUICK_SEARCH,
		// {
		// 	...FIELDS.SYSTEM.QUIT_REASON.VALUE,
		// 	type: 'select',
		// },
		{ ...FIELDS.STUDENT.EXAM_COACH_ID, title: '教练', type: 'select', },
	];

	// 已退学
	const fields3 = [
		FIELDS.STUDENT.QUICK_SEARCH,
		{
			...FIELDS.STUDENT.DEPART_ID_SCHOOL,
			initialValue: tableSearchParams.departId || undefined
		},
		// {
		// 	...FIELDS.SYSTEM.QUIT_REASON.VALUE,
		// 	type: 'select',
		// },
		{ ...FIELDS.FINANCE.REFUND_TYPE, title: '退学类型' },
	];

	// 已毕业
	const fields2 = [
		FIELDS.STUDENT.QUICK_SEARCH,
		{
			...FIELDS.STUDENT.DEPART_ID_SCHOOL,
			initialValue: tableSearchParams.departId || undefined
		},
		{
			...FIELDS.STUDENT.LICENSE_TYPE_ACTIVE,
			initialValue: tableSearchParams.licenseType || undefined
			// values: getLicenseType(),
			// disabled: getLicenseTypeDisabled(),
		},
		{
			...FIELDS.STUDENT.CLASS_ID,
			initialValue: tableSearchParams.classId || undefined,
			values: getClassValues(),
			disabled: getClassDisabled(),
		},
		{ 
			...FIELDS.STUDENT.EXAM_COACH_ID, title: '当前教练', 
			type: 'select',
			initialValue: tableSearchParams.coachId || undefined,
		}
	];

	const formFields0 = fields0.map( f => (
		<WrapperComplexFormItem
			config={f}
			form={form}
			onChange={onChange}
			values={f.values}
			mode={f.mode}
			initialValue={f.initialValue}
			status={f.disabled ? 'disabled' : 'edit'}
		/>
	) );
	const formFields1 = useMemo( () => {
		return fields1.map( f => (
			<WrapperComplexFormItem
				config={f}
				form={form}
				values={f.key === FIELDS.STUDENT.CLASS_ID.key ? getClassValues() : undefined}
			/>
		) );
	}, [ form ] );
	const formFields2 = fields2.map( f => (
		<WrapperComplexFormItem
			config={f}
			form={form}
			onChange={onChange}
			values={f.values}
			initialValue={f.initialValue}
			status={f.disabled ? 'disabled' : 'edit'}
		/>
	) );
	const formFields3 = useMemo( () => {
		return fields3.map( f => (
			<WrapperComplexFormItem
				config={f}
				form={form}
				initialValue={f.initialValue}
				values={f.key === FIELDS.STUDENT.CLASS_ID.key ? getClassValues() : undefined}
			/>
		) );
	}, [ form ] );

	const changeStatusLoading = loading.effects[ 'student/saveStudentStatus' ] || false;
	const changeClassLoading = loading.effects[ 'student/changeStudentClass' ] || false;
	const makeUpTuitionLoading = loading.effects[ 'student/afterPayTuition' ] || false;
	const paymentFeeLoading = loading.effects[ 'student/afterPayExam' ] || false;
	const helpLoading = loading.effects[ 'student/entrust' ] || false;
	const dropOutLoading = loading.effects[ 'student/leaveSchool' ] || false;
	const changeTelLoading = loading.effects[ 'student/changeMobile' ] || false;
	const purchaseClassLoading = loading.effects[ 'student/buyLessons' ] || false;
	const addOtherCostLoading = loading.effects[ 'student/addOtherCost' ] || false;

	// 保存备注
	const saveMemo = ( { studentId, memo, } ) => {
		dispatch( {
			type: 'student/saveMemo',
			payload: {
				params: {
					studentId,
					memo,
				}
			},
		} ).then( data => {
			if ( data !== false ) {
				toggleSignUpMemoModalVisible( false );
			}
		} );
	};
	
	return (
		<Card bodyStyle={
			{ paddingLeft: 0, paddingRight: 0, }
		}>
			<Tabs tabPosition="left" defaultActiveKey="0" activeKey={tabKey} onChange={e => {
				setTabKey( e );
				form.resetFields();
				setClassValues( [] );
				// setLicenseType( [] );
				setClassDisabled( true );
				// setLicenseTypeDisabled( true );
			}}>
				<TabPane tab="学习中" key="0" style={{ paddingRight: 24, }}>
					{
						tabKey === '0' && (
							<WithTableName
								{...props}
								bodyStyle={{ padding: 0, }}
								tableName={tableName1}
								tableActions={studyingTableActions}
								selectedRows={selectedRows}
								rowMenuItems={rowMenuItems}
								setSelectedRows={setSelectedRows}
								originColumns={originColumns0}
								handleMenuClick={handleMenuClick}
								scroll={{ x: 'max-content' }}
								formFields={formFields0}
								needUpdate={needUpdate}
								handleFormReset={() => {
									setTableSearchParams({})
									setNeedUpdate(true)
								}}
								setNeedUpdate={setNeedUpdate}
							/>
						)
					}
				</TabPane>
				<TabPane tab="退学中" key="3" style={{ paddingRight: 24, }}>
					{
						tabKey === '3' && (
							<WithTableName
								{...props}
								bodyStyle={{ padding: 0, }}
								tableName={tableName4}
								rowMenuItems={rowMenuItems}
								originColumns={originColumns3}
								handleMenuClick={handleMenuClick}
								scroll={{ x: 'max-content' }}
								formFields={formFields1}
								needUpdate={needUpdate3}
								setNeedUpdate={setNeedUpdate3}
								handleFormReset={() => {
									setTableSearchParams({})
									setNeedUpdate3(true)
								}}
							/>
						)
					}
				</TabPane>
				<TabPane tab="已退学" key="1" style={{ paddingRight: 24, }}>
					{
						tabKey === '1' && (
							<WithTableName
								{...props}
								bodyStyle={{ padding: 0, }}
								tableName={tableName2}
								rowMenuItems={rowMenuItems}
								originColumns={originColumns1}
								handleMenuClick={handleMenuClick}
								scroll={{ x: 'max-content' }}
								formFields={formFields3}
								needUpdate={needUpdate1}
								setNeedUpdate={setNeedUpdate1}
								handleFormReset={() => {
									setTableSearchParams({})
									setNeedUpdate1(true)
								}}
							/>
						)
					}
				</TabPane>
				<TabPane tab="已毕业" key="2" style={{ paddingRight: 24, }}>
					{
						tabKey === '2' && (
							<WithTableName
								{...props}
								bodyStyle={{ padding: 0, }}
								tableName={tableName3}
								rowMenuItems={rowMenuItems}
								originColumns={originColumns2}
								handleMenuClick={handleMenuClick}
								scroll={{ x: 'max-content' }}
								formFields={formFields2}
								needUpdate={needUpdate2}
								handleFormReset={() => {
									setTableSearchParams({})
									setNeedUpdate2(true)
								}}
								tableActions={endTableActions}
								setNeedUpdate={setNeedUpdate2}
							/>
						)
					}
				</TabPane>
			</Tabs>
			<ChangeCoachModal
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true );
				}}
				visible={changeCoachModalVisible}
				setVisible={setChangeCoachModalVisible}
				data={selectedRows}
			/>
			<ChangeStatusModal
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true );
				}}
				type="local"
				data={selectedRows}
				intensiveCourseSwitch={intensiveCourseSwitch}
				form={form}
				handleSubmit={fieldsValue => {
					dispatch( {
						type: 'student/saveStudentStatus',
						payload: {
							params: {
								...fieldsValue
							},
						},
					} ).then( data => {
						if ( data !== false ) {
							setChangeStatusModalVisible( false );
						}
					} );
				}}
				dictionary={dictionary}
				visible={changeStatusModalVisible}
				setVisible={setChangeStatusModalVisible}
				selectedRows={selectedRows}
				loading={changeStatusLoading}
			/>
			<ChangeClassModal
				handleSubmit={fieldsValue => {
					dispatch( {
						type: 'student/changeStudentClass',
						payload: fieldsValue,
					} ).then( data => {
						if ( data !== false ) {
							setChangeClassModalVisible( false );
						}
					} );
				}}
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true );
				}}
				visible={changeClassModalVisible}
				setVisible={setChangeClassModalVisible}
				data={studentInfo}
				dictionary={dictionary}
				loading={changeClassLoading}
			/>
			<MakeUpTuitionModal
				form={form}
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true );
				}}
				handleSubmit={() => {
					dispatch( {
						type: 'student/afterPayTuition',
						// payload: studentInfo.id,
						payload: studentInfo.studentId,
					} ).then( data => {
						if ( data !== false ) {
							setMakeUpTuitionModalVisible( false );
						}
					} );
				}}
				visible={makeUpTuitionModalVisible}
				setVisible={setMakeUpTuitionModalVisible}
				data={studentInfo}
				dictionary={dictionary}
				loading={makeUpTuitionLoading}
			/>
			<PaymentFeeModal
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true );
				}}
				dispatch={dispatch}
				form={form}
				handleSubmit={fieldsValue => {
					dispatch( {
						type: 'student/afterPayExam',
						payload: fieldsValue,
					} ).then( data => {
						if ( data !== false ) {
							setPaymentFeeModalVisible( false );
						}
					} );
				}}
				visible={paymentFeeModalVisible}
				setVisible={setPaymentFeeModalVisible}
				selectedRows={selectedRows}
				loading={paymentFeeLoading}
				// studentId={selectedRows.length === 1 && selectedRows[ 0 ].id}
			/>
			<HelpModal
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true );
				}}
				form={form}
				handleSubmit={fieldsValue => {
					dispatch( {
						type: 'student/entrust',
						payload: fieldsValue,
					} ).then( data => {
						if ( data !== false ) {
							setHelpModalVisible( false );
						}
					} );
				}}
				visible={helpModalVisible}
				setVisible={setHelpModalVisible}
				selectedRows={selectedRows}
				loading={helpLoading}
			/>
			<DropOutModal
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true );
				}}
				form={form}
				handleSubmit={fieldsValue => {
					dispatch( {
						type: 'student/leaveSchool',
						payload: fieldsValue,
					} ).then( data => {
						if ( data !== false ) {
							setDropOutModalVisible( false );
						}
					} );
				}}
				visible={dropOutModalVisible}
				setVisible={setDropOutModalVisible}
				selectedRows={selectedRows}
				dictionary={dictionary}
				loading={dropOutLoading}
				// studentId={selectedRows.length === 1 && selectedRows[ 0 ].id}
			/>
			<PurchaseClassModal
				dispatch={dispatch}
				dictionary={dictionary}
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true );
				}}
				form={form}
				handleSubmit={fieldsValue => {
					dispatch( {
						type: 'student/buyLessons',
						payload: fieldsValue,
					} ).then( data => {
						if ( data !== false ) {
							setPurchaseClassModalVisible( false );
						}
					} );
				}}
				visible={purchaseClassModalVisible}
				setVisible={setPurchaseClassModalVisible}
				selectedRows={selectedRows}
				loading={purchaseClassLoading}
			/>
			<ChangeTelModal
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true );
				}}
				form={form}
				// id={selectedRows.length === 1 && selectedRows[ 0 ].id}
				handleSubmit={fieldsValue => {
					dispatch( {
						type: 'student/changeMobile',
						payload: fieldsValue,
					} ).then( data => {
						if ( data !== false ) {
							setChangeTelModalVisible( false );
						}
					} );
				}}
				visible={changeTelModalVisible}
				setVisible={setChangeTelModalVisible}
				selectedRows={selectedRows}
				loading={changeTelLoading}
			/>
			<StudentInfoModal
				studentId={studentInfoId}
				visible={studentInfoModalVisible}
				setVisible={setStudentInfoModalVisible}
				dictionary={dictionary}
				dispatch={dispatch}
			/>
			<SignUpMemoModal
				data={currentRecord}
				handleSubmit={saveMemo}
				loading={memoLoading}
				visible={signUpMemoModalVisible}
				setVisible={toggleSignUpMemoModalVisible}
				setNeedUpdate={setNeedUpdate}
			/>
			<AddStudentFinishModal
				dispatch={dispatch}
				studentType={1}
				handleSubmit={() => {
					// toggleAddStudentFinishModalVisible(false)
					setNeedUpdate2(true)
				}}
				visible={addStudentFinishModalVisible}
				setVisible={toggleAddStudentFinishModalVisible}
				handleModalVisible={() => toggleAddStudentFinishModalVisible(false)}
			/>
			<OtherCostModal
				handleSubmit={fieldsValue => {
					dispatch( {
						type: 'student/addOtherCost',
						payload: fieldsValue,
					} ).then( data => {
						if ( data !== false ) {
							setOtherCostModalVisible( false );
						}
					} );
				}}
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true );
				}}
				visible={otherCostModalModalVisible}
				setVisible={setOtherCostModalVisible}
				data={selectedRows[0]}
				dictionary={dictionary}
				loading={addOtherCostLoading}
			/>
			<AddFeeModal
				afterClose={() => setNeedUpdate( true )}
				handleSubmit={fieldsValue => {
					dispatch( {
						type: `finance/saveExpenditure`,
						payload: {
							...fieldsValue,
						},
					} ).then( data => {
						if ( data !== false ) {
							toggleAddFeePopVisible( false );
							setNeedUpdate( true );
						}
					} );
				}}
				type="outlay_type_other"
				visible={addFeePopVisible}
				dictionary={dictionary}
				loading={confirmLoading}
				setVisible={toggleAddFeePopVisible}
				btnType={'student'}
				studentInfo={selectedRows[0]}
			/>
		</Card>
	);
};

export default connect( (
	{
		[ tableName1 ]: data1,
		[ tableName2 ]: data2,
		[ tableName3 ]: data3,
		[ tableName4 ]: data4,
		loading,
		global,
		dictionary,
		quickEntryParams
	}
) => (
	{
		[ tableName1 ]: data1,
		[ tableName2 ]: data2,
		[ tableName3 ]: data3,
		[ tableName4 ]: data4,
		memoLoading: loading.effects[ 'student/saveMemo' ] || false,
		loading,
		global,
		dictionary,
		quickEntryParams
	}
) )( Form.create()( Local ) );
