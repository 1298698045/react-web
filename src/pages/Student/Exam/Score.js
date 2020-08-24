import React, { useState, Fragment, useEffect, useMemo } from 'react';
import { connect } from "dva";
import { Menu, Button, Form, Modal, Icon, message, Tooltip } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import router from 'umi/router';
import FIELDS from "@/config/fields";
import ScoreEditModal from './ScoreEditModal';
import ScoreUploadModal from './ScoreUploadModal';
import { useEffectOnce } from "react-use/lib/index";
import { getDictItem, getDictValue, getDictItemValue } from '@/utils/dictionaryUtil';
import Privilege from '@/components/Privilege';

import styles from './Exam.less';

const { Item } = Menu;

const tableName1 = 'examScore_1';
const tableName2 = 'examScore_2';
const tableName3 = 'examScore_3';
const tableName4 = 'examScore_4';
const tableName5 = 'examScore_5';

// 表格-字段
const originColumns = [
	// FIELDS.STUDENT.EXAM_ID,
	FIELDS.STUDENT.EXAM_STUDY_ID,
	FIELDS.STUDENT.IDCARD_NO,
	FIELDS.STUDENT.EXAM_KM,
	FIELDS.STUDENT.EXAM_CAR_TYPE,
	FIELDS.STUDENT.EXAM_DATE,
	FIELDS.STUDENT.EXAM_TIME,
	FIELDS.STUDENT.EXAM_PLACE,
	{
		...FIELDS.STUDENT.EXAM_SCORE,
		customRender: text => Number( text ) < 0 ? '' : text,
	},
	FIELDS.STUDENT.EXAM_RESULT,
	FIELDS.STUDENT.EXAM_FAIL_ITEM,
	FIELDS.STUDENT.MOBILE,
	// FIELDS.STUDENT.EXAM_COACH_ID,
];
// 筛选表单-字段
const formFields = [
	{
		config: FIELDS.STUDENT.DEPART_ID_SCHOOL,
	},
	{
		config: FIELDS.STUDENT.EXAM_KM,
	},
	{
		config: FIELDS.STUDENT.EXAM_RESULT,
	},
	{
		config: FIELDS.STUDENT.EXAM_FAIL_ITEM,
	},
	// {
	// 	config: FIELDS.STUDENT.EXAM_TIMES,
	// },
	{
		config: FIELDS.STUDENT.EXAM_DATE_RANGE,
		col: 9,
	},
	{
		config: FIELDS.STUDENT.QUICK_SEARCH,
		col: 9,
	},
];
// 更多操作菜单
const originRowMenuItems = [];

const Score = props => {
	const { dispatch, form, quickEntryParams } = props;
	const [ selectedRows, setSelectedRows ] = useState( [] );
	// const [ rowMenuItems, setRowMenuItems ] = useState( [ ...originRowMenuItems ] );
	const [ menuSelected, selectMenu ] = useState( '0' );
	const [ scoreEditVisible, setScoreEditVisible ] = useState( false );
	const [ scoreEditLoading, setScoreEditLoading ] = useState( false );
	const [ scoreEditItem, setScoreEditItem ] = useState( {} );
	const [ scoreUploadVisible, setScoreUploadVisible ] = useState( false );
	const [ scoreUploadLoading, setScoreUploadLoading ] = useState( false );
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );

	// 由快捷入口进入
	useEffectOnce( () => {
		if ( quickEntryParams === 'record' ) {
			setScoreEditItem( {} );
			setScoreEditVisible( true );
		} else if ( quickEntryParams === 'import' ) {
			setScoreUploadVisible( true );
		}
		dispatch( {
			type: 'quickEntryParams/clearParams',
		} );
	} );

	const clearScoreOutliers = payload => {
		return dispatch( {
			type: 'studentExam/clearScoreOutliers',
			payload,
		} ).finally( () => {
			setTableNeedUpdate( true );
		} );
	};

	// 左侧菜单
	const menuMap = {
		0: {
			privName: 'grade_list',
			title: "成绩列表",
			tableName: tableName1,
			tableColumns: [
				{
					...FIELDS.STUDENT.NAME,
					default: true,
					customRender: ( text, record, index ) =>
						<Privilege privs={[ 'grade_edit' ]} noMatch={text}>
							<a onClick={e => {
								setScoreEditItem( record );
								setScoreEditVisible( true );
							}}>{text}</a>
						</Privilege>
				},
				...originColumns,
				FIELDS.STUDENT.EXAM_COACH_ID,
				FIELDS.STUDENT.EXAM_TIMES,
			],
			tableActions: [
				<Privilege privs={[ 'record_exam_grade' ]} key="record_exam_grade">
					<Button
						key="input" icon="edit" htmlType="button" type="primary"
						onClick={() => {
							setScoreEditItem( {} );
							setScoreEditVisible( true );
						}}
					>
						录入考试成绩
					</Button>
				</Privilege>,
				<Privilege privs={[ 'import_grade' ]} key="import_grade">
					<Button
						key="import" icon="upload" htmlType="button" type="primary"
						onClick={() => setScoreUploadVisible( true )}
					>
						导入考试成绩表
					</Button>
				</Privilege>,
				<Privilege privs={[ 'download_grade_templete' ]} key="download_grade_templete">
					<Button
						key="download" icon="download" htmlType="button" type="default"
						onClick={() => router.push( '/user-center/template-download' )}
					>
						下载导入模板
					</Button>
				</Privilege>,
				// {<Privilege privs={[ '122_syn' ]} key="122_syn">
				// 	<Button
				// 		key="122" icon="sync" htmlType="button" type="primary"
				// 		// onClick={() => router.push( '/user-center/template-download' )}
				// 	>
				// 		同步122数据
				// 	</Button>
				// </Privilege>,}
			],
		},
		1: {
			title: "毕业确认",
			privName: 'finish_study_confrim',
			tableName: tableName4,
			selectedRows: selectedRows,
			setSelectedRows: setSelectedRows,
			tableActions: [
				<Privilege privs={[ 'graduated_complete' ]} key="graduated_complete">
					<Button disabled={selectedRows.length ? false : true}
					        key="input" icon="check-circle" htmlType="button" type="primary"
					        onClick={() => {
						        let names = selectedRows.map( one => one.name )
						        let ids = selectedRows.map( one => one.studentId )
						        Modal.confirm( {
							        title: '毕业确认',
							        content: '确定要让【' + names.join( ',' ) + '】毕业？',
							        okText: "确定",
							        cancelText: "取消",
							        onOk() {
								        return graduateStudent( ids.join( ',' ) );
							        },
							        onCancel() {
							        },
						        } )
					        }
					        }
					>
						批量确认
					</Button>
				</Privilege>
			],
			tableColumns: [
				{
					key: 'operation',
					title: '操作',
					default: true,
					customRender: ( text, record, index ) =>
						(
							<Privilege privs={[ 'graduated_complete' ]} noMatch={'毕业'}>
								<a onClick={() => Modal.confirm( {
									title: '毕业确认',
									content: '确定要让【' + record[ FIELDS.STUDENT.NAME.key ] + '】毕业？',
									okText: "确定",
									cancelText: "取消",
									onOk() {
										return graduateStudent( record.studentId );
									},
									onCancel() {
									},
								} )}><Icon type="check-circle"/> 毕业</a>
							</Privilege>
						),
				},
				{
					...FIELDS.STUDENT.NAME,
					default: true,
					customRender: ( text, record, index ) =>
						(
							<Privilege privs={[ 'graduated_edit' ]} noMatch={text}>
								<a onClick={e => {
									setScoreEditItem( record );
									setScoreEditVisible( true );
								}}>{text}</a>
							</Privilege>
						)
				},
				...originColumns
				// FIELDS.STUDENT.EXAM_TIMES,
			],
		},
		2: {
			title: "异常数据",
			privName: 'grade_exception_data',
			tableName: tableName2,
			tableActions: [
				<Privilege privs={[ 'grade_exception_data_delete' ]} key="grade_exception_data_delete">
					<Button
						key="delete" icon="delete" htmlType="button" type="primary"
						onClick={() => {
							Modal.confirm( {
								title: '清空异常数据',
								content: '确定要清空所有异常数据吗？',
								okText: '确定',
								cancelText: '取消',
								onOk() {
									return clearScoreOutliers();
								},
								onCancel() {
								},
							} );
						}}
					>
						清空异常数据
					</Button>
				</Privilege>,
			],
			tableColumns: [
				{
					key: 'operation',
					title: '操作',
					default: true,
					customRender: ( text, record, index ) =>
						<Privilege privs={[ 'grade_exception_data_delete' ]} noMatch={'删除'}>
							<a onClick={() => Modal.confirm( {
								title: '删除异常数据',
								content: '确定要删除【' + record[ FIELDS.STUDENT.NAME.key ] + '】的异常数据？',
								okText: "确定",
								cancelText: "取消",
								onOk() {
									return deleteExamScoreOutliers( record.id );
								},
								onCancel() {
								},
							} )}><Icon type="delete"/> 删除</a>
						</Privilege>,
				},
				{
					...FIELDS.STUDENT.NAME,
					default: true,
					customRender: ( text, record, index ) =>
						(
							<Privilege privs={[ 'grade_exception_data_edit' ]} noMatch={text}>
								<a onClick={e => {
									setScoreEditItem( record );
									setScoreEditVisible( true );
								}}>{text}</a>
							</Privilege>
						)
				},
				...originColumns,
				FIELDS.STUDENT.EXAM_COACH_ID,
				{
					...FIELDS.STUDENT.MEMO,
					title: '异常原因',
					customRender: ( text, record, index, dictText ) => {
						let t = text ? text.split( ',' ) : []
						return t.length ? ( t.length === 1 || t[1] === '' ? t[ 0 ] :
							<Tooltip title={t.splice( 1, t.length - 1 ).join( ',' )}><a>{t[ 0 ]}</a></Tooltip> ) : '暂无'
					}
				},
			],
		},
		3: {
			title: "考试作废",
			privName: 'exam_abate',
			tableName: tableName3,
			tableColumns: [
				{
					key: 'operation',
					title: '操作',
					default: true,
					customRender: ( text, record, index ) =>
						(
							<Privilege privs={[ 'drop_study' ]} noMatch={'退学'}>
								<a onClick={() => Modal.confirm( {
									title: '学员退学',
									content: '确定要让【' + record[ FIELDS.STUDENT.NAME.key ] + '】退学？',
									okText: "确定",
									cancelText: "取消",
									onOk() {
										return dropOutStudent( record, 87 );
									},
									onCancel() {
									},
								} )}><Icon type="close-circle"/> 退学</a>
							</Privilege>
						),
				},

				{
					...FIELDS.STUDENT.NAME,
					default: true,
					customRender: ( text, record, index ) =>
						<Privilege privs={[ 'abate_edit' ]} noMatch={text}>
							<a onClick={e => {
								setScoreEditItem( record );
								setScoreEditVisible( true );
							}}>{text}</a>
						</Privilege>
				},

				...originColumns,
				FIELDS.STUDENT.EXAM_COACH_ID,
			],
		},
		4: {
			title: "过期作废",
			privName: 'exam_abate',
			tableName: tableName5,
			tableColumns: [
				{
					key: 'operation',
					title: '操作',
					default: true,
					customRender: ( text, record, index ) =>
						(
							<Privilege privs={[ 'drop_study' ]} noMatch={'退学'}>
								<a onClick={() => Modal.confirm( {
									title: '学员退学',
									content: '确定要让【' + record[ FIELDS.STUDENT.NAME.key ] + '】退学？',
									okText: "确定",
									cancelText: "取消",
									onOk() {
										return dropOutStudent( record, 83 );
									},
									onCancel() {
									},
								} )}><Icon type="close-circle"/> 退学</a>
							</Privilege>
						),
				},

				{
					...FIELDS.STUDENT.NAME,
					default: true,
					customRender: ( text, record, index ) =>
						<Privilege privs={[ 'abate_edit' ]} noMatch={text}>
							<a onClick={e => {
								setScoreEditItem( record );
								setScoreEditVisible( true );
							}}>{text}</a>
						</Privilege>
				},

				...originColumns,
				FIELDS.STUDENT.EXAM_COACH_ID,
			],
		},
	};
	const getmenu = () => {
		return Object.keys( menuMap ).map( item => <Item key={item}>{menuMap[ item ].title}</Item> );
	};

	const memoFormFields = useMemo( () => {
		return formFields.map( props => <WrapperComplexFormItem
			{...props}
			form={form}
		/> );
	}, [ form ] );

	const saveExamScoreEdit = payload => {
		return dispatch( {
			type: 'studentExam/saveExamScoreEdit',
			payload,
		} ).finally( () => {
			setTableNeedUpdate( true );
		} );
	};
	const deleteExamScoreOutliers = id => {
		return dispatch( {
			type: 'studentExam/deleteExamScoreOutliers',
			payload: { id },
		} ).finally( () => {
			setTableNeedUpdate( true );
		} );
	};
	const dropOutStudent = ( { studentId }, reason ) => {
		return dispatch( {
			type: 'studentExam/dropOutStudent',
			payload: { studentId, reason, },
		} ).finally( () => {
			setTableNeedUpdate( true );
			// 线索
			dispatch( {
				type: 'student/updClueStatus',
				payload: {
					params: {
						speedStatus: 4,
						studentId: studentId
					},
				}
			} );
			
		} );
	};
	const graduateStudent = ( ids ) => {
		return dispatch( {
			type: 'studentExam/graduateStudent',
			payload: { studentIds: ids },
		} ).finally( () => {
			setTableNeedUpdate( true );
			// 线索
			dispatch( {
				type: 'student/updArchiveClueStatus',
				payload: {
					params: {
						speedStatus: 5,
						studentIds: ids.split(',').map(one => one * 1)
					},
				}
			} );
		} );
	};

	return (
		<Fragment>
			<GridContent>
				<div className={styles.main}>
					<div className={styles.leftmenu}>
						<Menu mode="inline" onClick={e => selectMenu( e.key )} selectedKeys={[ menuSelected ]}>
							{getmenu()}
						</Menu>
					</div>
					<div className={styles.right}>
						{Object.keys( menuMap ).map( menu => menuSelected === menu && <WithTableName
							key={menu}
							{...props}
							tableName={menuMap[ menu ].tableName}
							tableActions={menuMap[ menu ].tableActions}
							originColumns={menuMap[ menu ].tableColumns}
							formFields={memoFormFields}
							columnSortable={false}
							selectedRows={menuMap[ menu ].selectedRows}
							setSelectedRows={menuMap[ menu ].setSelectedRows}
							scroll={{ x: 'max-content' }}
							needUpdate={tableNeedUpdate}
							setNeedUpdate={setTableNeedUpdate}
						/> )}
					</div>
				</div>
			</GridContent>

			<ScoreEditModal
				selectedRow={scoreEditItem}
				visible={scoreEditVisible}
				setVisible={setScoreEditVisible}
				loading={scoreEditLoading}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					setScoreEditLoading( true );
					saveExamScoreEdit( fieldsValue ).then( data => {
						setScoreEditLoading( false );
						if ( data !== false ) setScoreEditVisible( false );
					} );
				}}
			/>

			<ScoreUploadModal
				visible={scoreUploadVisible}
				setVisible={setScoreUploadVisible}
				loading={scoreUploadLoading}
				dispatch={dispatch}
				onSubmit={() => {
					setScoreUploadLoading( false );
					setTableNeedUpdate( true );
				}}
			/>
		</Fragment>
	);
};

export default connect( (
	{
		[ tableName1 ]: data1,
		[ tableName2 ]: data2,
		[ tableName3 ]: data3,
		[ tableName4 ]: data4,
		[ tableName5 ]: data5,
		quickEntryParams,
		loading,
		global
	}
) => (
	{
		[ tableName1 ]: data1,
		[ tableName2 ]: data2,
		[ tableName3 ]: data3,
		[ tableName4 ]: data4,
		[ tableName5 ]: data5,
		quickEntryParams,
		loading,
		global,
	}
) )( Form.create()( Score ) );