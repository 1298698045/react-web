import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from 'dva';
import { Card, Menu, Button, Switch, Form, Modal, Icon, message, Tag } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from '@/config/fields';
import CourseIntensiveModal from './CourseIntensiveModal';
import CourseArrangeModal from './CourseArrangeModal';
import CourseKMModal from './CourseKMModal';
import CourseBookNumModal from './CourseBookNumModal';
import StudentNumModal from './StudentNumModal';
import { isatty } from 'tty';
import Privilege from '@/components/Privilege';

const tableName = 'teachingCourse';

const Course = props => {
	const { dispatch, form, loading } = props;
	const [ selectedRows, setSelectedRows ] = useState( [] );
	// const [ rowMenuItems, setRowMenuItems ] = useState( [ ...originRowMenuItems ] );
	const [ courseIntensiveVisible, setCourseIntensiveVisible ] = useState( false );
	const [ courseArrangeVisible, setCourseArrangeVisible ] = useState( false );
	const [ courseKMVisible, setCourseKMVisible ] = useState( false );
	const [ courseBookNumVisible, setCourseBookNumVisible ] = useState( false );
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );
	const [ disabledBtn, setDisabledBtn ] = useState( true );
	const [ isDoubleKm, setIsDoubleKm ] = useState( true );
	const [ hasSameKm, setHasSameKm ] = useState( false );
	const [ intensiveCourseSwitch, setIntensiveCourseSwitch ] = useState( false );
	const [ selectCatchInfo, setSelectCatchInfo ] = useState( [] );

	const [ studentNumVisible, setStudentNumVisible ] = useState( false );

	const saveCourseIntensive = params => {
		return dispatch( {
			type: `${tableName}/saveCourseIntensive`,
			params,
		} ).then( () => {
			setTableNeedUpdate( true );
		} );
	};
	const saveCourseKM = params => {
		return dispatch( {
			type: `${tableName}/saveCourseKM`,
			params,
		} ).then( () => {
			setTableNeedUpdate( true );
		} );
	};
	const saveCourseBookNum = params => {
		return dispatch( {
			type: `${tableName}/saveCourseBookNum`,
			params,
		} ).then( () => {
			setTableNeedUpdate( true );
		} );
	};
	const toggleCourseStatus = ( id, checked ) => {
		return dispatch( {
			type: `${tableName}/${checked ? 'open' : 'close'}Course`,
			params: { courseIds: [ id ] },
		} ).then( () => {
			setTableNeedUpdate( true );
		} );
	};
	const toggleCoursesStatus = ( checked ) => {
		return dispatch( {
			type: `${tableName}/${checked ? 'open' : 'close'}Course`,
			params: { courseIds: selectedRows.map( v => v[ FIELDS.TEACHING.COURSE.ID.key ] ) },
		} ).then( () => {
			setTableNeedUpdate( true );
		} );
	};

	// 表格-字段
	const tableColumns = [
		FIELDS.TEACHING.COURSE.DATE,
		FIELDS.TEACHING.COURSE.COACH_ID,
		{
			...FIELDS.TEACHING.COURSE.RANGE_TIME,
			customRender: ( text, record ) => [record.intensiveStatus * 1 === 2 ? <Tag color="#f50" key="f50" key="f50">排</Tag> : '', `${record[ FIELDS.TEACHING.COURSE.START_TIME.key ]}~${record[ FIELDS.TEACHING.COURSE.END_TIME.key ]}`],
		},
		FIELDS.TEACHING.COURSE.LICENSE_TYPE,
		{
			...FIELDS.TEACHING.COURSE.KM,
			customRender: ( text, record, index, showText ) => showText + ( record.intensiveStatus == 1 ? '集训' : '' ),
		},
		FIELDS.TEACHING.COURSE.BOOK_NUM,
		{
			...FIELDS.TEACHING.COURSE.STUDENT_NUM,
			customRender: ( text, record ) => text * 1 === 0 ? text : <a onClick={() => {
				dispatch( {
					type: 'orgEmployee/queryEmployeeInfo',
					params: {
						employeeId: record.coachId,
					},
				} ).then( data => {
					if ( data !== false ) {
						setSelectCatchInfo( data )
						setSelectedRows([record])
						setStudentNumVisible(true)
					}
				} );
			}}>{text}</a>,
		},
		{
			...FIELDS.TEACHING.COURSE.STATUS,
			customRender: ( text, record ) => record[ FIELDS.TEACHING.COURSE.STUDENT_NUM.key ] == 0 ?
				<Privilege privs={[ 'course_status_swtich' ]} noMatch={text === 1 ? '打开' : '关闭'}>
					<Switch
						checkedChildren="打开"
						unCheckedChildren="关闭"
						checked={text == 1}
						onChange={checked => toggleCourseStatus( record[ FIELDS.TEACHING.COURSE.ID.key ], checked )}
					/>
				</Privilege> : '已锁定',
		},
	];
	// 筛选表单-字段
	const tableFilterFields = [
		{
			config: FIELDS.TEACHING.COURSE.QUICK_SEARCH,
		},
		{
			config: FIELDS.TEACHING.COURSE.RANGE_DATE,
			col: 9,
		},
		{
			config: FIELDS.TEACHING.COURSE.START_TIME,
		},
		{
			config: FIELDS.TEACHING.COURSE.END_TIME,
		},
		{
			config: FIELDS.TEACHING.COURSE.LICENSE_TYPE_ACTIVE,
		},
		{
			config: FIELDS.TEACHING.COURSE.KM,
			values: [
				{
					dKey: 'km2',
					dValue: '科目二',
				},
				{
					dKey: 'km3',
					dValue: '科目三',
				},
			],
		},
		{
			config: {
				key: 'intensiveStatus',
				title: '是否集训',
				type: 'select',
			},
			values: [
				{
					dKey: '0',
					dValue: '非集训',
				},
				{
					dKey: '1',
					dValue: '集训',
				},
			],
		},
		{
			config: FIELDS.TEACHING.COURSE.BOOK_NUM,
		},
		{
			config: {
				...FIELDS.TEACHING.COURSE.STATUS,
				type: 'select',
			},
		},
		{
			config: FIELDS.TEACHING.COURSE.SITE_ID,
		},
		{
			config: FIELDS.TEACHING.COURSE.DEPART_ID,
		},
		{ config:FIELDS.EMPLOYEE.COACH_INFO.COURSE_ARRANGE },

	];
	useEffect( () => {
		if ( selectedRows.length ) {
			if ( selectedRows.length === 1 ) {
				setDisabledBtn( false );
				setIsDoubleKm( ( selectedRows[ 0 ].teachKm === 'km3' && selectedRows[ 0 ].intensiveStatus * 1 === 1 ) || ( selectedRows[ 0 ].teachKm === 'km2' && selectedRows[ 0 ].intensiveStatus * 1 === 1 ) || selectedRows[ 0 ].teachKm === 'km2,km3' ? false : true );

				setHasSameKm( true );
			} else {
				let compareCoachId = selectedRows[ 0 ].coachId
				let isSame = false
				selectedRows.map( one => {
					if ( compareCoachId !== one.coachId ) {
						isSame = true
					}
				} )
				if ( !isSame ) {
					setIsDoubleKm( ( selectedRows[ 0 ].teachKm === 'km3' && selectedRows[ 0 ].intensiveStatus * 1 === 1 ) || ( selectedRows[ 0 ].teachKm === 'km2' && selectedRows[ 0 ].intensiveStatus * 1 === 1 ) || selectedRows[ 0 ].teachKm === 'km2,km3' ? false : true )
				}
				setDisabledBtn( isSame );

				const sameKms = {
					km2: true,
					km3: true,
				};
				selectedRows.forEach( v => {
					if ( v.teachKm.indexOf( 'km2' ) < 0 ) {
						sameKms.km2 = false;
					}
					if ( v.teachKm.indexOf( 'km3' ) < 0 ) {
						sameKms.km3 = false;
					}
				} );
				setHasSameKm( sameKms.km2 || sameKms.km3 );
			}
		} else {
			setDisabledBtn( true );
			setHasSameKm( false );
		}
	}, [ selectedRows ] );

	useEffect( () => {
		dispatch( {
			type: `systemConfig/intensiveCourseSwitch`,
		} ).then(res => {
			setIntensiveCourseSwitch(res === 'on' ? true : false)
		});
	}, [] );
	// 操作按钮
	const tableActions = [
		intensiveCourseSwitch && <Privilege privs={[ 'intensive_set' ]} key={'intensive_set'}>
			<Button
				key="1" type="primary"
				disabled={!hasSameKm}
				onClick={() => {
					setCourseIntensiveVisible( true );
				}}
			>
				设置集训课程
			</Button>
		</Privilege>,
		<Privilege privs={[ 'course_arrange_set' ]} key={'course_arrange_set'}>
			<Button
				key="6" type="primary"
				disabled={!hasSameKm}
				onClick={() => {
					setCourseArrangeVisible( true );
				}}
			>
				设置排课课程
			</Button>
		</Privilege>,
		<Privilege privs={[ 'adjust_train_course' ]} key={'adjust_train_course'}>
			<Button
				key="2" type="primary"
				// disabled={disabledBtn || isDoubleKm}
				disabled={!hasSameKm}
				onClick={() => {
					dispatch( {
						type: 'orgEmployee/queryEmployeeInfo',
						params: {
							employeeId: selectedRows[ 0 ].coachId,
						},
					} ).then( data => {
						console.log( data )
						if ( data !== false ) {
							setSelectCatchInfo( data )
							setCourseKMVisible( true );
						}
					} );
				}}
			>
				设置普通课程
			</Button>
		</Privilege>,
		<Privilege privs={[ 'adjust_book_num' ]} key={'adjust_book_num'}>
			<Button
				key="3" type="primary"
				disabled={disabledBtn}
				onClick={() => {
					dispatch( {
						type: 'orgEmployee/queryEmployeeInfo',
						params: {
							employeeId: selectedRows[ 0 ].coachId,
						},
					} ).then( data => {
						console.log( data )
						if ( data !== false ) {
							data.bookNum = data.coachInfo && data.coachInfo.bookNum ? data.coachInfo.bookNum : ''
							setSelectCatchInfo( data )
							// if (data.coachInfo && data.coachInfo.bookNum) {
							// 	let newList = data.coachInfo.bookNum.split(',') || []
							// 	newList = newList.map(one => {
							// 		return {
							// 			dKey: one,
							// 			dValue: one
							// 		}
							// 	})
							// 	setCurrBookNumList(newList)
							// } else {
							// 	setCurrBookNumList([])
							// }
							setCourseBookNumVisible( true );
							// setEmployeeInfo( data );
							// onChange( FIELDS.EMPLOYEE.POSITION_ID_ACTIVE.key, data[ FIELDS.EMPLOYEE.POSITION_ID_ACTIVE.key ] );
						}
					} );
				}}
			>
				调整人车上限
			</Button>
		</Privilege>,
		<Privilege privs={[ 'course_status_swtich' ]} key={'course_status_swtich_open'}>
			<Button
				key="4" type="primary"
				disabled={!selectedRows.length}
				onClick={() => {
					toggleCoursesStatus( true );
				}}
			>
				打开
			</Button>
		</Privilege>,
		<Privilege privs={[ 'course_status_swtich' ]} key={'course_status_swtich_close'}>
			<Button
				key="5" type="primary"
				disabled={!selectedRows.length}
				onClick={() => {
					toggleCoursesStatus( false );
				}}
			>
				关闭
			</Button>
		</Privilege>,
	];
	// 更多操作菜单
	const tableMenuItems = [];

	const memoFilterFields = useMemo( () => {
		return tableFilterFields.map( props => <WrapperComplexFormItem
			{...props}
			form={form}
		/> );
	}, [ form ] );

	return (
		<PageHeaderWrapper title={<FormattedMessage id="menu.teaching.course"/>}>
			<GridContent>
				<WithTableName
					{...props}
					tableName={tableName}
					originColumns={tableColumns}
					formFields={memoFilterFields}
					tableActions={tableActions}
					selectedRows={selectedRows}
					setSelectedRows={setSelectedRows}
					// rowMenuItems={tableMenuItems}
					// handleMenuClick={handleMenuClick}
					columnSortable={false}
					scroll={{ x: 'max-content' }}
					needUpdate={tableNeedUpdate}
					setNeedUpdate={setTableNeedUpdate}
				/>
			</GridContent>

			<CourseIntensiveModal
				selectedRows={selectedRows}
				visible={courseIntensiveVisible}
				setVisible={setCourseIntensiveVisible}
				loading={loading.effects[ `${tableName}/saveCourseIntensive` ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					saveCourseIntensive( fieldsValue ).then( data => {
						if ( data !== false ) setCourseIntensiveVisible( false );
					} );
				}}
			/>
			<CourseArrangeModal
				selectedRows={selectedRows}
				visible={courseArrangeVisible}
				setVisible={setCourseArrangeVisible}
				loading={loading.effects[ `${tableName}/saveCourseIntensive` ]}
				onSubmit={fieldsValue => {
					saveCourseIntensive( fieldsValue ).then( data => {
						if ( data !== false ) setCourseArrangeVisible( false );
					} );
				}}
			/>
			<CourseKMModal
				currCoachInfo={selectCatchInfo}
				selectedRows={selectedRows}
				visible={courseKMVisible}
				setVisible={setCourseKMVisible}
				loading={loading.effects[ `${tableName}/saveCourseKM` ]}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					saveCourseKM( fieldsValue ).then( data => {
						if ( data !== false ) setCourseKMVisible( false );
					} );
				}}
			/>

			<CourseBookNumModal
				selectedRows={selectedRows}
				visible={courseBookNumVisible}
				setVisible={setCourseBookNumVisible}
				loading={loading.effects[ `${tableName}/saveCourseBookNum` ]}
				currCoachInfo={selectCatchInfo}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					saveCourseBookNum( fieldsValue ).then( data => {
						if ( data !== false ) setCourseBookNumVisible( false );
					} );
				}}
			/>
			<StudentNumModal
				selectItem={selectedRows[0]}
				visible={studentNumVisible}
				setVisible={setStudentNumVisible}
				currCoachInfo={selectCatchInfo}
			/>
		</PageHeaderWrapper>
	);
};

export default connect( (
	{
		[ tableName ]: data,
		loading,
		global
	}
) => (
	{
		[ tableName ]: data,
		loading,
		global,
	}
) )( Form.create()( Course ) );
