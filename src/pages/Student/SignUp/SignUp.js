import React, { useState, useMemo, useEffect, useCallback, } from 'react';
import { useEffectOnce, useToggle, } from 'react-use';
import { connect } from 'dva';
import {
	Form,
	Button,
	Spin,
	Divider,
	Popconfirm,
	Typography, Tooltip,
} from 'antd';
import SignUpFormModal from './SignUpFormModal';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import { FormattedMessage } from 'umi-plugin-react/locale';
import StudentInfoModal from './StudentInfoModal';
import SignUpMemoModal from './SignUpMemoModal';
import { getDictValue, queryDictionary } from '@/utils/dictionaryUtil';
import Privilege from '@/components/Privilege';
import Buttons from '@/components/Buttons';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

const { Text, } = Typography;

const tableName = 'studentSignUp';

const fields = [
	FIELDS.STUDENT.QUICK_SEARCH,
	FIELDS.STUDENT.DEPART_ID_SCHOOL,
	FIELDS.STUDENT.STUDENT_TYPE,
	FIELDS.STUDENT.LICENSE_TYPE_ACTIVE,
	{
		...FIELDS.STUDENT.STUDENT_STATUS,
		values: [
			{
				dKey: '0',
				dValue: '待交费',
			},
			{
				dKey: '6',
				dValue: '被驳回',
			},
			{
				dKey: '1',
				dValue: '待建档',
			},
			{
				dKey: '2',
				dValue: '暂缓建档',
			},
		],
		title: '状态',
	},
	{
		...FIELDS.STUDENT.CLASS_ID_ACTIVE,
		title: '报名班型',
	},
	{
		...FIELDS.STUDENT.FEE_TYPE,
		parent: 'finance',
	},
	FIELDS.STUDENT.CHANNEL,
];

const menuValues = [
	{ dKey: '1', dValue: '本校报名', privName: 'register_local' },
	{ dKey: '3', dValue: '代培报名', privName: 'register_agent' },
	{ dKey: '4', dValue: '挂靠报名', privName: 'register_contact' },
];

const SignUp = props => {
	const { form, user, dispatch, submitLoading, readBaseInfoFromIDLoading, dictionary, quickEntryParams, memoLoading, getStudentInfoLoading, deleteLoading, } = props;
	const [ signUpFormModalVisible, toggleSignUpFormModalVisible ] = useToggle( false );
	const [ studentInfoModalVisible, toggleStudentInfoModalVisible ] = useToggle( false );
	const [ signUpMemoModalVisible, toggleSignUpMemoModalVisible ] = useToggle( false );
	const [ currentRecord, setCurrentRecord ] = useState( {} );
	const [ studentType, setStudentType ] = useState( '1' );
	const [ studentInfo, setStudentInfo ] = useState( {} );
	const [ needUpdate, setNeedUpdate ] = useState( false );
	const [ dependCostConfig, setDependCostConfig ] = useState( [] );

	useEffectOnce( () => {
		if ( quickEntryParams === 'local' ) {
			openSignUpFormModal( '1' )();
		} else if ( quickEntryParams === 'proxy' ) {
			openSignUpFormModal( '3' )();
		}

		dispatch( {
			type: 'quickEntryParams/clearParams',
		} );
		// 获取校外介绍人
		queryDictionary( dispatch, 'introducer_id' );
		queryDictionary( dispatch, 'colla_id' );
		// 获取教练
		queryDictionary( dispatch, 'employee_id' );
		// 获取增值服务
		queryDictionary( dispatch, FIELDS.STUDENT.VALUE_ADDED.dictionary );
		// 获取班型
		queryDictionary( dispatch, FIELDS.STUDENT.CLASS_ID.dictionary );

		// 获取挂靠费用
		dispatch( {
			type: 'student/getDependCost',
			payload: {
				params: {
					feeType: 'guakao',
				},
			}
		} ).then( dependCostConfig => {
			setDependCostConfig( dependCostConfig );
			if ( quickEntryParams === 'depend' ) {
				openSignUpFormModal( '4' )();
			}
		} );
	} );

	const cooperationUnits = dictionary[ FIELDS.STUDENT.COOPERATION_UNIT.dictionary ];

	// 保存备注
	const saveMemo = useCallback( ( { studentId, memo, } ) => {
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
	}, [ dispatch ] );

	// 删除学员
	const deleteStudent = id => {
		dispatch( {
			type: 'student/deleteStudent',
			payload: id,
		} ).then( () => {
			// 线索
			dispatch( {
				type: 'student/updClueStatus',
				payload: {
					params: {
						speedStatus: 0,
						studentId: id
					},
				}
			} );
			setNeedUpdate( true );
		} );
	};

	const originColumns = [
		{
			title: '序号',
			key: 'key',
		},
		{
			...FIELDS.STUDENT.NAME,
			customRender: ( text, record ) => (
				<Privilege privs={[ 'student_detail' ]} noMatch={text}>
					<a onClick={e => {
						e.stopPropagation();
						if ( !getStudentInfoLoading ) {
							openStudentInfoModal( record );
						}
					}}
					>{getStudentInfoLoading && <Spin size="small"/>} {text}</a>
				</Privilege>
			)
		},
		FIELDS.STUDENT.MOBILE,
		{
			...FIELDS.STUDENT.MAJOR_CARD_CODE,
			customRender: ( text, record ) => record.baseInfo[ FIELDS.STUDENT.MAJOR_CARD_CODE.key ] || '暂无'
		},
		FIELDS.STUDENT.DEPART_ID,
		FIELDS.STUDENT.LICENSE_TYPE,
		{
			...FIELDS.STUDENT.CLASS_ID,
			title: '报名班型',
		},
		FIELDS.STUDENT.FEE_TYPE,
		{
			...FIELDS.STUDENT.OPERATOR_ID,
			customRender: ( text, record ) => {
				if ( record.apply ) {
					if ( record.apply.introducer ) {
						if (record.apply.introducerType) {
							if(record.apply.introducerType * 1 === 1) {
								if ( record.apply.introducer[ FIELDS.STUDENT.OPERATOR_ID.key ] ) {
									return getDictValue( dictionary, FIELDS.STUDENT.OPERATOR_ID.dictionary, record.apply.introducer[ FIELDS.STUDENT.OPERATOR_ID.key ] )
								}
							} else if(record.apply.introducerType * 1 === 2){
								if ( record.apply.introducer[ FIELDS.STUDENT.OPERATOR_ID.key ] ) {
									return getDictValue( dictionary, 'introducer_id', record.apply.introducer[ FIELDS.STUDENT.OPERATOR_ID.key ] )
								}
							}
						}
						
					}
					return '暂无';
				}
				return '暂无';
			}
		},
		{
			...FIELDS.STUDENT.STUDENT_STATUS,
			title: '学员状态',
			customRender: ( text, record, ) => {
				if ( String( text ) !== '6' ) {
					return getDictValue( dictionary, FIELDS.STUDENT.STUDENT_STATUS.dictionary, String( text ) );
				}

				return record.finance.rejectionReason ? (
					<Tooltip title={record.finance.rejectionReason}>
						<a>报名驳回</a>
					</Tooltip>
				) : '暂无';
			}
		},
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record, ) => {
				const { studentStatus } = record;

				return <Buttons>
					<Privilege key="edit" privs={[ 'student_edit' ]}>
						{String( studentStatus ) !== '0'
							?
							<a onClick={() => openSignUpFormModal()( record )}>
								{getStudentInfoLoading && <Spin size="small"/>} 编辑
							</a>
							:
							<Text disabled>编辑</Text>
						}
					</Privilege>
					<Privilege key="memo" privs={[ 'student_memo' ]}>
						<a onClick={() => {
							setCurrentRecord( record );
							toggleSignUpMemoModalVisible( true );
						}}>备注</a>
					</Privilege>
					<Privilege key="delete" privs={[ 'student_delete' ]}>
						{String( studentStatus ) === '6'
							?
							<Popconfirm
								title="确定删除此条记录么？"
								onConfirm={() => {
									const { id } = record;
									deleteStudent( id );
								}}>
								<a>{deleteLoading && <Spin size="small"/>} 删除</a>
							</Popconfirm>
							:
							<Text disabled>删除</Text>
						}
					</Privilege>
				</Buttons>;
			}
		},
	];

	// 报名注册弹层
	const openSignUpFormModal = useCallback( type => record => {
		if ( record ) {
			const { id } = record;
			// 编辑 拉取学员详情
			dispatch( {
				type: 'student/getStudentInfo',
				payload: id,
			} ).then( data => {
				setStudentInfo( data );
				toggleSignUpFormModalVisible( true );
			} );
		} else {
			setStudentType( type );
			setStudentInfo( {} );
			toggleSignUpFormModalVisible( true );
		}
	}, [] );

	// 学员信息弹层
	const openStudentInfoModal = useCallback( record => {
		const { id } = record;
		// 编辑 拉取学员详情
		dispatch( {
			type: 'student/getStudentInfo',
			payload: id,
		} ).then( data => {
			setStudentInfo( data );
			toggleStudentInfoModalVisible( true );
		} );
	}, [] );

	const tableActions = useMemo( () => [ ...menuValues.map( v => (
		<Privilege key={v.dKey} privs={[ v.privName ]}>
			<Button type="primary" icon="plus"
			        onClick={() => openSignUpFormModal( v.dKey )()}>{v.dValue}</Button>
		</Privilege>
	) ) ], [ openSignUpFormModal ] );

	const handleSubmit = useCallback( fieldsValue => {
		dispatch( {
			type: fieldsValue.params.id ? 'student/updateInfo' : 'student/saveInfo',
			payload: fieldsValue,
		} ).then( data => {
			if ( data !== false ) {
				let info = fieldsValue.params
				if (info.studentType === '1' && info.apply.introducer.operatorId) {
					dispatch( {
						type: 'student/getStudentIdByMobile',
						payload: {
							params: {
								mobile: info.mobile
							},
						}
					} ).then(res => {
						dispatch( {
							type: 'student/updClueStatus',
							payload: {
								params: {
									name: info.name,
									address: info.baseInfo.conAddress,
									classId: info.classId,
									employeeId: info.apply.introducer.operatorId,
									introducerType: info.apply.introducerType,
									licenseType: info.licenseType,
									mobile: info.mobile,
									speedStatus: 2,
									clueExtensionModel: {
										gender: info.baseInfo.gender,
										majorCardCode: info.baseInfo.majorCardCode,
										majorCardType: info.baseInfo.majorCardType,
										departId: info.departId
									},
									studentId: res.studentId
								},
							}
						} );
					})
				}
				toggleSignUpFormModalVisible( false )
			}
		} );
	}, [] );

	const formFields = useMemo( () => {
		return fields.map( f => (
			<WrapperComplexFormItem
				config={f}
				parent={f.parent}
				form={form}
				values={f.values}
			/>
		) );
	}, [ form ] );

	return (
		// <PageHeaderWrapper
		// 	title={<FormattedMessage
		// 		id="menu.student.sign-up"/>}

		// >
		<GridContent>
			<WithTableName
				{...props}
				tableName={tableName}
				tableActions={tableActions}
				originColumns={originColumns}
				scroll={{ x: 'max-content' }}
				formFields={formFields}
				needUpdate={needUpdate}
				setNeedUpdate={setNeedUpdate}
			/>
			<SignUpFormModal
				dependCostConfig={dependCostConfig}
				// afterClose={() => setNeedUpdate( true )}
				setNeedUpdate={setNeedUpdate}
				handleSubmit={handleSubmit}
				data={studentInfo}
				studentType={studentType}
				dispatch={dispatch}
				dictionary={dictionary}
				loading={submitLoading}
				readBaseInfoFromIDLoading={readBaseInfoFromIDLoading}
				visible={signUpFormModalVisible}
				setVisible={toggleSignUpFormModalVisible}
				cooperationUnits={cooperationUnits}
				user={user}
			/>
			<SignUpMemoModal
				handleSubmit={saveMemo}
				data={currentRecord}
				loading={memoLoading}
				visible={signUpMemoModalVisible}
				setVisible={toggleSignUpMemoModalVisible}
				setNeedUpdate={setNeedUpdate}
			/>
			<StudentInfoModal
				dictionary={dictionary}
				data={studentInfo}
				visible={studentInfoModalVisible}
				setVisible={toggleStudentInfoModalVisible}
			/>
		</GridContent>
		// </PageHeaderWrapper>
	);
};

export default connect( (
	{
		[ tableName ]: data,
		loading,
		global,
		student,
		dictionary,
		quickEntryParams,
		user
	}
) => (
	{
		[ tableName ]: data,
		loading,
		global,
		student,
		dictionary,
		quickEntryParams,
		user,
		memoLoading: loading.effects[ 'student/saveMemo' ] || false,
		getStudentInfoLoading: loading.effects[ 'student/getStudentInfo' ] || false,
		deleteLoading: loading.effects[ 'student/deleteStudent' ] || false,
		readBaseInfoFromIDLoading: loading.effects[ 'student/IdentityInfo' ] || false,
		submitLoading: ( loading.effects[ 'student/saveInfo' ] || false ) || ( loading.effects[ 'student/updateInfo' ] || false ),
	}
) )( Form.create()( SignUp ) );
