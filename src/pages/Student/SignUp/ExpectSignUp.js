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

const tableName = 'studentExpectSignUp';


const SignUp = props => {
	const { form, user, dispatch, submitLoading, readBaseInfoFromIDLoading, dictionary, quickEntryParams, memoLoading, getStudentInfoLoading, deleteLoading, } = props;
	const [ signUpFormModalVisible, toggleSignUpFormModalVisible ] = useToggle( false );
	const [ studentInfoModalVisible, toggleStudentInfoModalVisible ] = useToggle( false );
	const [ signUpMemoModalVisible, toggleSignUpMemoModalVisible ] = useToggle( false );
	const [ currentRecord, setCurrentRecord ] = useState( {} );
	const [ studentType, setStudentType ] = useState( '1' );
	const [ studentInfo, setStudentInfo ] = useState( {} );
	const [ clueId, setClueId ] = useState( undefined );
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

	const originColumns = [
		{
			title: '序号',
			key: 'key',
		},
		{
			...FIELDS.STUDENT.NAME
		},
		FIELDS.STUDENT.MOBILE,
		{
			key: 'cardCode',
			title: '身份证号',
			customRender: ( text, record ) => record.clueExtensionModel ? record.clueExtensionModel.cardCode : '暂无'
		},
		{
			key: 'createTime',
			title: '预报名时间'
		},
		{
			...FIELDS.STUDENT.OPERATOR_ID,
			customRender: ( text, record ) => getDictValue( dictionary, FIELDS.STUDENT.OPERATOR_ID.dictionary, record.employeeId ) || '暂无'
		},
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record, ) => {
				const { studentStatus } = record;

				return <Privilege key="edit" privs={[ 'student_edit' ]}>
						<a onClick={() => openSignUpFormModal()( record )}>
							正式报名
						</a>
					</Privilege>
			}
		},
	];

	// 报名注册弹层
	const openSignUpFormModal = useCallback( type => record => {
		let info = {
			baseInfo: {
				name: record.name,
				conAddress: record.address
			},
			classId: record.classId,
			apply: {
				introducer: {
					operatorId: record.employeeId
				},
				introducerType: 1, //都是校内
			},
			licenseType: record.licenseType,
			mobile: record.mobile,
		}
		if (record.clueExtensionModel) {
			info.baseInfo.gender = record.clueExtensionModel.gender
			info.baseInfo.majorCardCode = record.clueExtensionModel.cardCode
			info.baseInfo.majorCardType = "idcard"
			info.departId = record.clueExtensionModel.departId
			info.departId = info.departId ?  info.departId : undefined
		}
		setStudentType( '1' );
		setStudentInfo( info );
		setClueId( record.id );
		toggleSignUpFormModalVisible( true );
	}, [] );


	const handleSubmit = useCallback( fieldsValue => {
		let pClueId = fieldsValue.params.clueId
		delete fieldsValue.params.clueId
		dispatch( {
			type: fieldsValue.params.id ? 'student/updateInfo' : 'student/saveInfo',
			payload: fieldsValue,
		} ).then( data => {
			if ( data !== false ) {
				let info = fieldsValue.params
				if (info.apply.introducer.operatorId) {
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
									studentId: res.studentId,
									id: pClueId,
									name: info.name,
									address: info.baseInfo.conAddress,
									classId: info.classId,
									employeeId: info.apply.introducer.operatorId,
									introducerType: info.apply.introducerType,
									licenseType: info.licenseType,
									mobile: info.mobile,
									speedStatus: 2,
									clueExtensionModel: {
										clueId: pClueId,
										gender: info.baseInfo.gender,
										majorCardCode: info.baseInfo.majorCardCode,
										majorCardType: info.baseInfo.majorCardType,
										departId: info.departId
									}
								},
							}
						} );
					})
				}
				toggleSignUpFormModalVisible( false )
			}
		} );
	}, [] );


	return (
		<GridContent>
			<WithTableName
				{...props}
				tableName={tableName}
				originColumns={originColumns}
				scroll={{ x: 'max-content' }}
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
				clueId={clueId}
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
		submitLoading: ( loading.effects[ 'student/saveInfo' ] || false ) || ( loading.effects[ 'student/updateInfo' ] || false ),
	}
) )( Form.create()( SignUp ) );
