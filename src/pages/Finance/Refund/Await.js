import React, { useEffect, useMemo, useState, } from 'react';
import { useEffectOnce, useToggle } from 'react-use';
import { connect } from 'dva';
import {
	Form,
	Button,
	Card,
	Popconfirm,
} from 'antd';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import ReportModal from './ReportModal';
import StudentInfoModal from '@/components/StudentInfoModal';
import { queryDictionary } from '@/utils/dictionaryUtil';
import Privilege from '@/components/Privilege';

const tableName = 'financeRefundAwaitList';

const fields = [
	{
		...FIELDS.STUDENT.QUICK_SEARCH,
		title: '关键字',
	},
	FIELDS.FINANCE.REFUND_TYPE,
	FIELDS.FINANCE.OP_STATUS,
];

const Await = props => {
	const { form, dispatch, loading, dictionary, } = props;
	const [ selectedRows, setSelectedRows ] = useState( [] );
	const [ reportModalVisible, toggleReportModalVisible ] = useToggle( false );
	const [ cancelPopVisible, toggleCancelPopVisible ] = useToggle( false );
	const [ revokePopVisible, toggleRevokePopVisible ] = useToggle( false );
	const [ expenditurePopVisible, toggleExpenditurePopVisible ] = useToggle( false );
	const [ needUpdate, setNeedUpdate ] = useToggle( false );
	const [ canReport, setCanReport ] = useToggle( false );
	const [ canCancel, setCanCancel ] = useToggle( false );
	const [ canRevoke, setCanRevoke ] = useToggle( false );
	const [ canExpenditure, setCanExpenditure ] = useToggle( false );
	const [ studentInfoModalVisible, setStudentInfoModalVisible ] = useState( false );
	const [ studentInfoId, setStudentInfoId ] = useState( undefined );
	
	// useEffectOnce( () => {
	// 	queryDictionary( dispatch, 'quit_reason' );
	// 	queryDictionary( dispatch, 'stop_reason' );
	// } );
	
	useEffect( () => {
		if ( selectedRows.length === 1 ) {
			const type = String( selectedRows[ 0 ][ FIELDS.FINANCE.OP_STATUS.key ] );
			// 0 待提报
			// 1 审核中
			// 2 被驳回
			// 3 待支出
			// 4 已支出
			
			// cancel撤销 revoke撤回
			switch ( type ) {
				case '0': {
					setCanReport( true );
					setCanCancel( true );
					setCanRevoke( false );
					setCanExpenditure( false );
					break;
				}
				case '1': {
					setCanReport( false );
					setCanCancel( true );
					setCanRevoke( true );
					setCanExpenditure( false );
					break;
				}
				case '2': {
					setCanReport( true );
					setCanCancel( true );
					setCanRevoke( false );
					setCanExpenditure( false );
					break;
				}
				case '3': {
					setCanReport( false );
					setCanRevoke( false );
					setCanCancel( true );
					setCanExpenditure( true );
					break;
				}
			}
		} else {
			setCanReport( false );
			setCanRevoke( false );
			setCanCancel( false );
			setCanExpenditure( false );
		}
	}, [ selectedRows ] );
	
	const originColumns = [
		{
			title: '序号',
			key: 'key',
		},
		{
			...FIELDS.STUDENT.NAME,
			customRender: ( text, record, ) => {
				return (
					<Privilege privs={[ 'wait_return_fee_detail' ]}  noMatch={text}>

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
		FIELDS.FINANCE.REFUND_TYPE,
		{
			...FIELDS.FINANCE.REFUND_REASON,
			customRender: text => {
				if ( dictionary ) {
					const dics = [ ...dictionary[ 'quit_reason' ], ...dictionary[ 'stop_reason' ] ];
					const item = dics.find( ( { dKey } ) => dKey === String( text ) );
					if ( item ) {
						return item.dValue;
					}
				}
				
				return text || '暂无';
			}
		},
		FIELDS.FINANCE.OP_STATUS,
		{
			...FIELDS.FINANCE.OPERATOR_NAME,
			key: 'operator',
			customRender: text => {
				if ( text ) {
					
					const employee = dictionary[ FIELDS.EMPLOYEE.ID.dictionary ].find( ( { uid } ) => String( uid ) === String( text ) );
					
					if ( employee ) {
						return employee.name;
					}
				}
				return '暂无';
			},
		},
		FIELDS.FINANCE.CREATE_TIME,
		FIELDS.STUDENT.MEMO,
	];
	
	const tableActions = [
		<Privilege privs={[ 'wait_return_fee_submit' ]} key="wait_return_fee_submit">
		<Button
			disabled={!canReport}
			key="report-button"
			icon="form"
			htmlType="button"
			type="primary"
			onClick={() => {
				toggleReportModalVisible( true );
			}}>提报</Button></Privilege>,
		<Privilege privs={[ 'wait_return_fee_cancel' ]} key="wait_return_fee_cancel">
		<Popconfirm
			key="cancel-button"
			title="是否确认撤销这笔退费记录？"
			visible={cancelPopVisible}
			onVisibleChange={visible => {
				if ( canCancel ) toggleCancelPopVisible( visible );
			}}
			onConfirm={() => {
				dispatch( {
					type: `${tableName}/cancel`,
					payload: {
						params: {
							id: selectedRows[ 0 ].id,
						}
					}
				} ).then( () => {
					setSelectedRows( [] );
					setNeedUpdate( true )
				} );
			}}
		>
			<Button
				disabled={!canCancel}
				icon="undo"
				htmlType="button"
				type="danger"
			>撤销</Button>
		</Popconfirm></Privilege>,
		<Privilege privs={[ 'wait_return_fee_back' ]} key="wait_return_fee_back">
		<Popconfirm
			key="revoke-button"
			title="是否确认撤回这笔退费记录？"
			visible={revokePopVisible}
			onVisibleChange={visible => {
				if ( canRevoke ) toggleRevokePopVisible( visible );
			}}
			onConfirm={() => {
				dispatch( {
					type: `${tableName}/revoke`,
					payload: {
						params: {
							id: selectedRows[ 0 ].id,
						}
					}
				} ).then( () => {
					setSelectedRows( [] );
					setNeedUpdate( true )
				} );
			}}
		>
			<Button
				disabled={!canRevoke}
				icon="stop"
				htmlType="button"
				type="danger"
			>撤回</Button>
		</Popconfirm></Privilege>,
		<Privilege privs={[ 'wait_return_fee_expend' ]} key="wait_return_fee_expend">
		<Popconfirm
			key="expenditure-button"
			title="是否确认这条记录已支出？"
			visible={expenditurePopVisible}
			onVisibleChange={visible => {
				if ( canExpenditure ) toggleExpenditurePopVisible( visible );
			}}
			onConfirm={() => {
				dispatch( {
					type: `${tableName}/expenditure`,
					payload: {
						params: {
							id: selectedRows[ 0 ].id,
						}
					}
				} ).then( () => {
					// 线索
					dispatch( {
						type: 'student/updClueStatus',
						payload: {
							params: {
								speedStatus: 4,
								studentId: id
							},
						}
					} );
					setSelectedRows( [] );
					setNeedUpdate( true )
				} );
			}}
		>
			<Button
				disabled={!canExpenditure}
				icon="check-circle"
				htmlType="button"
				type="default"
			>支出</Button>
		</Popconfirm></Privilege>,
	];
	
	const formFields = useMemo( () => {
		return fields.map( f => (
			<WrapperComplexFormItem
				config={f}
				form={form}
			/>
		) );
	}, [ form ] );
	
	const reportLoading = loading.effects[ `${tableName}/report` ] || false;
	
	return (
		<Card>
			<WithTableName
				{...props}
				form={form}
				needUpdate={needUpdate}
				setNeedUpdate={setNeedUpdate}
				bodyStyle={{ padding: 0, }}
				tableName={tableName}
				tableActions={tableActions}
				selectedRows={selectedRows}
				setSelectedRows={setSelectedRows}
				originColumns={originColumns}
				multipleSelection={false}
				scroll={{ x: 'max-content' }}
				formFields={formFields}
			/>
			<ReportModal
				afterClose={() => {
					setSelectedRows( [] );
					setNeedUpdate( true )
				}}
				handleSubmit={fieldsValue => {
					dispatch( {
						type: `${tableName}/report`,
						payload: {
							...fieldsValue,
						},
					} ).then( data => {
						if ( data !== false ) {
							setSelectedRows( [] );
							toggleReportModalVisible( false );
						}
					} );
				}}
				loading={reportLoading}
				visible={reportModalVisible}
				setVisible={toggleReportModalVisible}
				selectedRows={selectedRows}
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
	}
) => (
	{
		[ tableName ]: data1,
		loading,
		global,
		signUp,
		dictionary,
	}
) )( Form.create()( Await ) );
