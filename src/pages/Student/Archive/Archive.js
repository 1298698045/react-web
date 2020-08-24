import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from 'dva';
import { Modal, message, Form, Button, Tooltip, } from 'antd';
import Privilege from '@/components/Privilege';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import ArchiveDelayModal from './ArchiveDelayModal';
import ArchiveStopModal from './ArchiveStopModal';
import ArchiveFinishModal from './ArchiveFinishModal';
import ArchiveRemarkModal from './ArchiveRemarkModal';
import ArchiveIDModal from './ArchiveIDModal';
import StudentInfoModal from '@/components/StudentInfoModal';
import printJS from 'print-js';
import downloadBlob from "@/utils/downloadBlob";
import { getDictItem, getDictValue, getDictItemValue } from '@/utils/dictionaryUtil';
import {  useEffectOnce } from 'react-use';

const tableName1 = 'studentArchive';

const StudentArchive = props => {
	const [ selectedRows, setSelectedRows ] = useState( [] );
	const { dispatch, form, dictionary, loading, quickEntryParams } = props;
	const [ delayFormVisible, setDelayFormVisible ] = useState( false );
	const [ stopFormVisible, setStopFormVisible ] = useState( false );
	const [ finishFormVisible, setFinishFormVisible ] = useState( false );
	const [ remarkFormVisible, setRemarkFormVisible ] = useState( false );
	const [ IDFormVisible, setIDFormVisible ] = useState( false );
	const [ IDFormItem, setIDFormItem ] = useState( {} );
	const [ studentInfoId, setStudentInfoId ] = useState( false );
	const [ studentInfoModalVisible, setStudentInfoModalVisible ] = useState( false );
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );
	const [ tableSearchParams, setTableSearchParams ] = useState( {} );
	
	const [ tabKey, setTabKey ] = useState( '-1' );
	useEffectOnce( () => {
		if (quickEntryParams) {
			setTableSearchParams(quickEntryParams)
		}
		setTabKey(quickEntryParams.tabKey || '0')
		dispatch( {
			type: 'quickEntryParams/clearParams',
		} );
	}, [ dispatch ] );
	const getReason = records => {
		if ( records ) return records.map( v => {
			return v.reason.split( ',' ).map( v2 => getDictValue( dictionary, {
				'REPORT_STOP_DOCUMENT': 'stop_reason',
				'REPORT_DEFER_DOCUMENT': 'delay_reason',
			}[ v.action ], v2 ) ).join( '、' );
		} ).join( '\n' );
	};
	const originColumns = [
		{
			...FIELDS.STUDENT.NAME,
			customRender: ( text, record, index ) => {
				return (
				<Privilege privs={[ 'archivist_detail' ]} noMatch={text}>
					<a onClick={e => {
						e.stopPropagation();
						setStudentInfoId( record.id );
						setStudentInfoModalVisible( true );
					}}>{text}</a>
				</Privilege>);
			},
		},
		FIELDS.STUDENT.MOBILE,
		{
			...FIELDS.STUDENT.MAJOR_CARD_CODE,
			customRender: ( text, record, index ) => {
				return record[ 'baseInfo' ][ FIELDS.STUDENT.MAJOR_CARD_CODE.key ];
			},
		},
		{
			...FIELDS.STUDENT.ARCHIVE_ID,
			customRender: ( text, record, index ) => {
				return (
				<Privilege privs={[ 'archivist_no_edit' ]} noMatch={text}>
					<a onClick={e => {
						e.stopPropagation();
						setIDFormItem( record );
						setIDFormVisible( true );
					}}>{text || '添加'}</a>
				</Privilege>
				);
			},
		},
		FIELDS.STUDENT.DEPART_ID_SCHOOL,
		FIELDS.STUDENT.LICENSE_TYPE,
		FIELDS.STUDENT.STUDENT_TYPE,
		{
			...FIELDS.STUDENT.ARCHIVE_STATUS,
			customRender: ( text, record, index, dictText ) => text == 1 ? dictText :
				<Tooltip title={`原因：${( getReason( record.changeLogs ) ) || '暂无'}`}><a>{dictText}</a></Tooltip>,
		},
	];

	const formFields = [
		{
			config: {
				key: 'keywords',
				title: '学员',
				type: 'input',
				placeholder: '姓名/手机号/身份证模糊搜索',
			},
		},
		{
			config: FIELDS.STUDENT.DEPART_ID_SCHOOL,
			initialValue: tableSearchParams.departId || undefined

		},
		{
			config: FIELDS.STUDENT.LICENSE_TYPE_ACTIVE,
			initialValue: tableSearchParams.licenseType || undefined
		},
		{
			config: {
				key: 'studentType',
				title: '学员类型',
				type: 'select',
			},
			values: [
				{ dKey: '1', dValue: '本校' },
				{ dKey: '4', dValue: '挂靠' },
			],
		},
		{
			config: FIELDS.STUDENT.CLASS_ID,
		},
		{
			config: {
				key: 'studentStatus',
				title: '档案状态',
				type: 'select',
			},
			values: [
				{ dKey: '1', dValue: '待建档' },
				{ dKey: '2', dValue: '暂缓建档' },
				{ dKey: '3', dValue: '终止建档' },
			],
		},
		{
			config: FIELDS.STUDENT.PAY_TIME,
		},
	];

	const memoFormFields = useMemo( () => {
		return formFields.map( props => <WrapperComplexFormItem
			{...props}
			initialValue={props.initialValue}
			form={form}
		/> );
	}, [ form ] );

	const handleMenuClick = e => {
		if ( selectedRows.length === 0 ) return;

		const studentIds = selectedRows.map( row => row.id ).join( ',' );
		switch ( e.key ) {
			case 'printArchiveBag':
				dispatch( {
					type: `studentArchive/${e.key}`,
					payload: { id: studentIds },
				} ).then( data => {
					if ( data !== false ) {
						printJS( {
							printable: [ 'data:image/jpeg;base64,' + data ],
							type: 'image',
							// header: 'Multiple Images',
							imageStyle: 'width: 1500px; height: 1030px;',
						} );
					}
				} );
				break;
			case 'printHealthForm':
				dispatch( {
					type: `studentArchive/${e.key}`,
					payload: { id: studentIds },
				} ).then( data => {
					if ( data !== false ) {
						printJS( 'data:image/jpeg;base64,' + data, 'image' );
					}
				} );
				break;
			// 缺少导出接口
			case 'exportArchive':
				dispatch( {
					type: `studentArchive/exportArchive`,
					payload: { ids: studentIds },
				} ).then( data => {
					downloadBlob( '建档导出.xls', data );
				} );
				break;
			case 'delayArchive':
				setDelayFormVisible( true );
				break;
			case 'waitForArchive':
				Modal.confirm( {
					title: '转为待建档',
					content: '你确定要把【' + selectedRows.map( v => v.name ).join( '】，【' ) + '】转为待建档吗？',
					onOk() {
						return dispatch( {
							type: `studentArchive/waitForArchive`,
							payload: { studentIds },
						} ).then( data => {
							if ( data !== false ) {
								setTableNeedUpdate( true );
								setSelectedRows( [] );
							}
						} );
					},
					onCancel() {
					},
				} );
				break;
			case 'stopArchive':
				setStopFormVisible( true );
				break;
			case 'finishArchive':
				setFinishFormVisible( true );
				break;
			case 'remark':
				setRemarkFormVisible( true );
				break;
		}
	};

	const tableActions = [
		{
			privName: 'archivist_print',
			key: 'printArchiveBag',
			title: '打印档案袋',
			length: 1,
			disable: selectedRows => selectedRows.find( v => v.studentStatus == 3 ),
		},
		{
			privName: 'physcial_print',
			key: 'printHealthForm',
			title: '打印体检表',
			length: 1,
			disable: selectedRows => selectedRows.find( v => v.studentStatus == 3 ),
		},
		{
			privName: 'pause_document',
			key: 'delayArchive',
			title: '暂缓建档',
			length: 100,
			disable: selectedRows => selectedRows.find( v => v.studentStatus == 2 || v.studentStatus == 3 ),
		},
		{
			privName: 'wait_document',
			key: 'waitForArchive',
			title: '待建档',
			length: 100,
			disable: selectedRows => selectedRows.find( v => v.studentStatus == 1 || v.studentStatus == 3 ),
		},
		{
			privName: 'break_document',
			key: 'stopArchive',
			title: '终止建档',
			length: 100,
			disable: selectedRows => selectedRows.find( v => v.studentStatus == 3 ),
		},
		{
			privName: 'complete_document',
			key: 'finishArchive',
			title: '完成建档',
			length: 100,
			disable: selectedRows => selectedRows.find( v => v.studentStatus == 3 ),
		},
		{
			privName: 'export_document',
			key: 'exportArchive',
			title: '导出',
			length: 100,
		},
		{
			privName: 'archivist_memo',
			key: 'remark',
			title: '备注',
			length: 1,
		},
	].map( v => (
		<Privilege key={v.key} privs={[ v.privName ]}>
			<Button
				type="primary"
				key={v.key}
				disabled={!selectedRows.length || selectedRows.length > v.length || ( v.disable && v.disable( selectedRows ) )}
				onClick={() => handleMenuClick( { key: v.key } )}
			>{v.title}</Button> 	
		</Privilege>
	));

	const saveDelay = payload => {
		return dispatch( {
			type: 'studentArchive/delayArchive',
			payload,
		} ).then( data => {
			if ( data !== false ) {
				setTableNeedUpdate( true );
				setSelectedRows( [] );
			}
		} );
	};
	const saveStop = payload => {
		return dispatch( {
			type: 'studentArchive/stopArchive',
			payload,
		} ).then( data => {
			if ( data !== false ) {
				// 线索
				dispatch( {
					type: 'student/updArchiveClueStatus',
					payload: {
						params: {
							speedStatus: 0,
							studentIds: payload.studentIds.split(',').map(one => one * 1)
						},
					}
				} );
				setTableNeedUpdate( true );
				setSelectedRows( [] );
			}
		} );
	};
	const saveFinish = payload => {
		return dispatch( {
			type: 'studentArchive/finishArchive',
			payload,
		} ).then( data => {
			if ( data !== false ) {
				// 线索
				dispatch( {
					type: 'student/updArchiveClueStatus',
					payload: {
						params: {
							speedStatus: 6,
							studentIds: payload.studentIds.split(',').map(one => one * 1)
						},
					}
				} );
				setTableNeedUpdate( true );
				setSelectedRows( [] );
			}
		} );
	};
	const saveRemark = payload => {
		return dispatch( {
			type: 'studentArchive/saveArchiveRemark',
			payload,
		} ).then( data => {
			if ( data !== false ) {
				setTableNeedUpdate( true );
				setSelectedRows( [] );
			}
		} );
	};
	const saveID = payload => {
		return dispatch( {
			type: 'studentArchive/saveArchiveID',
			payload,
		} ).then( () => {
			setTableNeedUpdate( true );
		} );
	};

	return (
		<PageHeaderWrapper title={<FormattedMessage id="menu.student.archive"/>}>
			{/*<Privilege privs={[ 'student_add', 'student_del' ]} logic='&' noMatch={*/}
			{/*<Button type="primary">没有权限</Button>*/}
			{/*}>*/}
			{ tabKey === '0' && <WithTableName
				{...props}
				tableName={tableName1}
				tableActions={tableActions}
				selectedRows={selectedRows}
				setSelectedRows={setSelectedRows}
				// rowMenuItems={rowMenuItems}
				// handleMenuClick={handleMenuClick}
				originColumns={originColumns}
				formFields={memoFormFields}
				columnSortable={false}
				needUpdate={tableNeedUpdate}
				setNeedUpdate={setTableNeedUpdate}
				handleFormReset={() => {
					setTableSearchParams({})
					setTableNeedUpdate(true)
				}}
			/>}
			{/*</Privilege>*/}

			<ArchiveDelayModal
				selectedRows={selectedRows}
				visible={delayFormVisible}
				setVisible={setDelayFormVisible}
				loading={loading.effects[ 'studentArchive/delayArchive' ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					saveDelay( fieldsValue ).then( data => {
						if ( data !== false ) setDelayFormVisible( false );
					} );
				}}
			/>

			<ArchiveStopModal
				selectedRows={selectedRows}
				visible={stopFormVisible}
				setVisible={setStopFormVisible}
				loading={loading.effects[ 'studentArchive/stopArchive' ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					saveStop( fieldsValue ).then( data => {
						if ( data !== false ) setStopFormVisible( false );
					} );
				}}
			/>

			<ArchiveFinishModal
				selectedRows={selectedRows}
				visible={finishFormVisible}
				setVisible={setFinishFormVisible}
				loading={loading.effects[ 'studentArchive/finishArchive' ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					saveFinish( fieldsValue ).then( data => {
						if ( data !== false ) setFinishFormVisible( false );
					} );
				}}
			/>

			<ArchiveRemarkModal
				selectedRows={selectedRows}
				visible={remarkFormVisible}
				setVisible={setRemarkFormVisible}
				loading={loading.effects[ 'studentArchive/saveArchiveRemark' ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					saveRemark( fieldsValue ).then( data => {
						if ( data !== false ) setRemarkFormVisible( false );
					} );
				}}
			/>

			<ArchiveIDModal
				selectedRow={IDFormItem}
				visible={IDFormVisible}
				setVisible={setIDFormVisible}
				loading={loading.effects[ 'studentArchive/saveArchiveID' ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					saveID( fieldsValue ).then( data => {
						if ( data !== false ) setIDFormVisible( false );
					} );
				}}
			/>

			<StudentInfoModal
				studentId={studentInfoId}
				visible={studentInfoModalVisible}
				setVisible={setStudentInfoModalVisible}
			/>
		</PageHeaderWrapper>
	);
};

export default connect( (
	{
		[ tableName1 ]: data1,
		dictionary,
		loading,
		global,
		quickEntryParams
	}
) => (
	{
		[ tableName1 ]: data1,
		dictionary,
		loading,
		global,
		quickEntryParams
	}
) )( Form.create()( StudentArchive ) );
