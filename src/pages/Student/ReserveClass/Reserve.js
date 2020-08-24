import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Spin, Tag, Button, Form, Modal, Row, Col, Input, Radio, Icon, message, notification } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from '@/config/fields';
import { getDictItem, getDictValue, getDictItemValue, queryDictionary } from '@/utils/dictionaryUtil';
import styles from './Reserve.less';
import moment from 'moment';
import Privilege from '@/components/Privilege';
import DescriptionList from '@/components/DescriptionList';
import classNames from 'classnames';
import ReserveStudentListModal from './ReserveStudentListModal';

const { Description } = DescriptionList;
const { Search } = Input;

const tableName_1 = 'reserve_1';
const tableName_2 = 'reserve';

let queryResultCount = 0;
const Reserve = props => {
	const { dispatch, form, loading, dictionary, reserve, reserve_1 } = props;
	const { studentInfo } = reserve;
	const [tableNeedUpdate, setTableNeedUpdate] = useState( false );
	const [searchKeywords, setSearchKeywords] = useState( '' );
	const [isCurrentCoach, setIsCurrentCoach] = useState( true );
	const [kmCode, setKmCode] = useState();
	const [canReserve, setCanReserve] = useState( false );
	const [showReserve, setShowReserve] = useState( true );
	const [tableStyle, setTableStyle] = useState( '1' );
	const [table_1_date, setTable_1_Date] = useState( 0 );
	const [coachList, setCoachList] = useState( [] );
	const [reserveStudentListVisible, setReserveStudentListVisible] = useState( false );
	const [reserveStudentListParams, setReserveStudentListParams] = useState( {} );

	useEffect( () => {
		['class_id', 'employee_id', 'employee_id_coach'].forEach( dictKey => {
			dispatch( {
				type: 'dictionary/get',
				dictKey,
				dispatch,
			} );
		} );
		dispatch( {
			type: 'reserve/queryStatusSetting',
		} );
		dispatch( {
			type: 'reserve/clearStudentInfo',
		} );
		if ( dictionary.employee_id_coach ) {
			setCoachList( dictionary[ 'employee_id_coach' ].filter( one => one.leaving * 1 !== 2 ) )
		}
	}, [dictionary] );

	useEffect( () => {
		setCanReserve( studentInfo.id && studentInfo.studentStatus == 4 && ( studentInfo.km2Status == 1 || studentInfo.km3Status == 1 || studentInfo.km2Status == 2 || studentInfo.km3Status == 2 ) );
		if ( !studentInfo.id ) {
			setShowReserve( true );
		} else if ( studentInfo.studentStatus != 4 ) { // 不是已建档状态
			setShowReserve( false );
		} else if ( studentInfo.km2Status != 1 && studentInfo.km3Status != 1 && studentInfo.km2Status != 2 && studentInfo.km3Status != 2 ) { // 科目状态不是进行中或集训中
			setShowReserve( false );
		} else if ( getDictItemValue( dictionary, 'class_id', studentInfo.classId )( 'matchMode' ) == 0 ) { // 绑定教练
			if ( studentInfo.km2CoachId || studentInfo.km3CoachId ) {
				setShowReserve( true );
			} else {
				setShowReserve( false );
			}
		} else {
			setShowReserve( true );
		}
	}, [studentInfo] );

	const description = useMemo( () => {
		const classValue = getDictItemValue( dictionary, 'class_id', studentInfo.classId );
		return <DescriptionList
			className={styles.description}
			size="small"
			col="3">
			<Description term="学员姓名">{studentInfo.name}</Description>
			<Description term="学员性别">{getDictValue( dictionary, 'gender', studentInfo.baseInfo.gender )}</Description>
			<Description term="手机号">{studentInfo.mobile}</Description>
			<Description term="申领类型">{getDictValue( dictionary, 'license_type', studentInfo.licenseType )}</Description>
			<Description term="当前班型">{getDictValue( dictionary, 'class_id', studentInfo.classId )}</Description>
			<Description
				term="分配模式">{getDictValue( dictionary, 'match_mode', classValue( 'matchMode' ) ) || '无'}</Description>
			<Description term="当前状态">
				<Tag color={studentInfo.km2Status == 1 || studentInfo.km2Status == 2 ? 'blue' : 'red'}>
					科目二：{studentInfo.km2Status ? getDictValue( dictionary, 'km_status', studentInfo.km2Status ) : '无'}
				</Tag>
				<Tag color={studentInfo.km3Status == 1 || studentInfo.km3Status == 2 ? 'blue' : 'red'}>
					科目三：{studentInfo.km3Status ? getDictValue( dictionary, 'km_status', studentInfo.km3Status ) : '无'}
				</Tag>
			</Description>
			<Description term="当前教练">
				<Tag color={studentInfo.km2CoachId ? 'blue' : 'red'}>
					科目二：{studentInfo.km2CoachId ? getDictValue( dictionary, 'employee_id', studentInfo.km2CoachId ) : '无'}
				</Tag>
				<Tag color={studentInfo.km3CoachId ? 'blue' : 'red'}>
					科目三：{studentInfo.km3CoachId ? getDictValue( dictionary, 'employee_id', studentInfo.km3CoachId ) : '无'}
				</Tag>
			</Description>
			<Description term="学员上限/车">{classValue( 'bookNum' )}人</Description>
			<Description term="允许预约日">{getDictValue( dictionary, 'week_day', classValue( 'allowDays' ) )}</Description>
			<Description term="提前预约">{classValue( 'preDays' )}天</Description>
			<Description term="单日可约最多课节">{classValue( 'lessonsPerDay' )}节</Description>
			<Description term="学员状态">
				<Tag color={studentInfo.studentStatus == 4 ? 'blue' : 'red'}>
					{getDictValue( dictionary, 'student_status', studentInfo.studentStatus ) || '暂无'}
				</Tag>
			</Description>
		</DescriptionList>;
	}, [studentInfo] );

	const search = keywords => {
		if ( !keywords ) return;
		dispatch( {
			type: `${tableName_2}/search`,
			keywords,
		} ).then( data => {
			if ( data !== false ) {
				setTableNeedUpdate( true );
			} else {
				notification.error( {
					message: `未查询到【${keywords}】对应的学员信息！`,
				} );
			}
		} );
		setTableStyle( '1' );
	};
	const searching = loading.effects[ `${tableName_2}/search` ] || false;

	const doOrderCourse = record => {
		dispatch( {
			type: `${tableName_2}/doOrderCourse`,
			params: {
				studentId: studentInfo.id,
				courseId: record.id,
				[ FIELDS.TEACHING.COURSE.KM.key ]: kmCode,
			},
		} ).then( data => {
			// setTableNeedUpdate( true );
			if ( data !== false ) {
				queryResultCount = 0;
				queryOrderCourseResult( {
					studentId: studentInfo.id,
					courseId: record.id,
					batchNo: data,
				} );
			}
		} );
	};
	const confirmReserve = record => {
		if ( !canReserve ) return;
		if ( ['red', 'gray'].indexOf( canReserveCalendar( record ) ) >= 0 ) return;
		Modal.confirm( {
			title: `确定要为【${studentInfo.name}】预约【${record[ FIELDS.TEACHING.LESSON.COURSE_DATE.key ]} ${record[ FIELDS.TEACHING.LESSON.START_TIME.key ]}-${record[ FIELDS.TEACHING.LESSON.END_TIME.key ]}】【${getDictValue( dictionary, 'employee_id', record[ FIELDS.TEACHING.LESSON.COACH_ID.key ] )}】【${getDictValue( dictionary, 'coach_km', kmCode )}${record.intensiveStatus == 1 ? '集训' : ''}】这节课吗？`,
			okText: '确定',
			cancelText: '取消',
			onOk() {
				return doOrderCourse( record );
			},
		} );
	};

	const showReserveStudentList = ( course, coachName ) => {
		setReserveStudentListParams( {
			courseId: course.id,
			title: [coachName, course.courseDate, course.startTime + '-' + course.endTime, getDictValue( dictionary, 'coach_km', course.kmCode )].join( '，' ),
		} );
		setReserveStudentListVisible( true );
	};

	const queryOrderCourseResult = ( params ) => {
		if ( ++queryResultCount < 10 ) {
			dispatch( {
				type: `${tableName_2}/queryOrderCourseResult`,
				params,
			} ).then( data => {
				console.log( data )
				if ( data == -112 ) {
					setTimeout( () => queryOrderCourseResult( params ), 1000 );
				} else if ( data !== false ) {
					setTableNeedUpdate( true );
				}
			} );
		} else {
			queryResultCount = 0;
			notification.error( {
				message: `未查询到预约结果，请重新预约！`,
			} );
		}
	};

	const doIdentityInfo = () => {
		dispatch( {
			type: `${tableName_2}/doIdentityInfo`,
		} ).then( data => {
			if ( data !== false ) {
				message.success( '读取身份证信息成功！' );
				setSearchKeywords( data.cardCode );
				search( data.cardCode );
			} else {
				notification.error( {
					message: '读取身份证信息失败！',
				} );
			}
		} );
	};

	const availableKm = [];
	if ( !studentInfo.id || studentInfo.km2Status == 1 || studentInfo.km2Status == 2 ) {
		availableKm.push( {
			dKey: 'km2',
			dValue: '科目二',
		} );
	}
	if ( !studentInfo.id || studentInfo.km3Status == 1 || studentInfo.km3Status == 2 ) {
		availableKm.push( {
			dKey: 'km3',
			dValue: '科目三',
		} );
	}

	const matchModeValues = useMemo( () => {
		if ( !studentInfo.id ) {
			return [
				{
					dKey: 0,
					dValue: '所有教练课程',
				},
			];
		}
		if ( reserve.status_setting.freedom === 'on' ) {
			if ( !studentInfo.km2CoachId && !studentInfo.km3CoachId ) return [
				{
					dKey: 0,
					dValue: '所有教练课程',
				},
			];
			return [
				{
					dKey: 1,
					dValue: '当前教练课程',
				},
				{
					dKey: 0,
					dValue: '其他教练课程',
				},
			];
		}
		const matchMode = getDictItemValue( dictionary, 'class_id', studentInfo.classId )( 'matchMode' );
		return matchMode === 'freedom' ? [
			{
				dKey: 0,
				dValue: '所有教练课程',
			},
		] : [
			{
				dKey: 1,
				dValue: '当前教练课程',
			},
		];
	}, [dictionary.class_id, studentInfo.classId, reserve.status_setting.freedom] );
	// 筛选表单-字段
	const tableFilterFields_1 = [
		{
			config: {
				...FIELDS.TEACHING.COURSE.TEACH_KM,
				key: 'teachKm',
			},
			values: availableKm,
			initialValue: studentInfo.id && availableKm[ 0 ] ? availableKm[ 0 ].dKey : undefined,
			allowClear: !studentInfo.id,
		},
		{
			config: FIELDS.TEACHING.LESSON.CURRENT_COACH,
			values: matchModeValues,
			initialValue: matchModeValues[ 0 ].dKey,
			allowClear: false,
		},
		{
			config: FIELDS.TEACHING.COURSE.COACH_ID,
			status: isCurrentCoach ? 'disabled' : 'edit',
			values: coachList
		},
		{
			config: FIELDS.TEACHING.COURSE.SITE_ID
		},
		{
			config: FIELDS.TEACHING.COURSE.DEPART_ID
		},
		// { config: FIELDS.EMPLOYEE.COACH_INFO.COURSE_ARRANGE },
	];
	const tableFilterFields_2 = [
		{
			config: {
				...FIELDS.TEACHING.LESSON.COURSE_DATE,
				props: {
					disabledDate: ( current ) => {
						return current && current < moment().startOf( 'day' );
					},
				},
			},
			col: 8,
		},
		{
			config: FIELDS.TEACHING.COURSE.TEACH_KM,
			values: availableKm,
			initialValue: studentInfo.id && availableKm[ 0 ] ? availableKm[ 0 ].dKey : undefined,
			allowClear: !studentInfo.id,
		},
		{
			config: {
				key: 'courseArrange',
				title: '排课课程',
				type: 'switch',
			},
			col: 4,
		},
		{
			config: FIELDS.TEACHING.LESSON.START_TIME,
		},
		{
			config: FIELDS.TEACHING.LESSON.END_TIME,
		},
		{
			config: FIELDS.TEACHING.LESSON.CURRENT_COACH,
			values: matchModeValues,
			initialValue: matchModeValues[ 0 ].dKey,
			allowClear: false,
		},
		{
			config: FIELDS.TEACHING.COURSE.COACH_ID,
			status: isCurrentCoach ? 'disabled' : 'edit',
		},
		{
			config: FIELDS.TEACHING.COURSE.DEPART_ID
		},
		// { config: FIELDS.EMPLOYEE.COACH_INFO.COURSE_ARRANGE },
	];

	const onChange = ( key, val ) => {
		switch ( key ) {
			case 'teachKm':
			case 'kmCode':
				setKmCode( val );
				break;
			case FIELDS.TEACHING.LESSON.CURRENT_COACH.key:
				setIsCurrentCoach( val == 1 );
				break;
		}
	};
	const memoFilterFields_1 = useMemo( () => {
		return tableFilterFields_1.map( props => <WrapperComplexFormItem
			{...props}
			form={form}
			onChange={onChange}
		/> );
	}, [form, isCurrentCoach, tableFilterFields_1] );
	const memoFilterFields_2 = useMemo( () => {
		return tableFilterFields_2.map( props => <WrapperComplexFormItem
			{...props}
			form={form}
			onChange={onChange}
		/> );
	}, [form, isCurrentCoach, tableFilterFields_2] );

	const getBooknumMax = bookNum => {
		return Math.max.apply( Math, bookNum.split( ',' ) );
	};
	const canReserveCalendar = course => {
		const courseBookNum = parseInt( getBooknumMax( course.bookNum ) );
		// 约满
		if ( course.placeNum >= courseBookNum ) return 'red';

		if ( studentInfo.id ) {
			// 是否已约
			// if ( course.isBooked == 1 ) return 'green';

			const classValue = getDictItemValue( dictionary, 'class_id', studentInfo.classId );
			// 课程开始超过半小时
			if ( moment( course.courseDate + ' ' + course.startTime ).add( 30, 'm' ).isBefore( moment() ) ) return 'gray';

			// 非集训课程
			if ( course.intensiveStatus != 1 ) {
				// 提前预约天数是否匹配(中午12点才能约最后一天)
				if ( moment().isBefore( moment( course.courseDate + ' 12:00:00' ).subtract( classValue( 'preDays' ), 'd' ) ) ) return 'gray';
				// 可预约日是否匹配
				const allowDays = getDictItemValue( dictionary, 'week_day', classValue( 'allowDays' ) )( 'memo' );
				const courseWeekday = ( moment( course.courseDate + ' ' + course.startTime ).weekday() + 1 ) % 7;
				if ( !allowDays || allowDays.indexOf( courseWeekday ) < 0 ) return 'gray';
				// 学员上限是否匹配
				if ( classValue( 'bookNum' ) > courseBookNum ) return 'gray';
			}

			// 集训状态是否匹配
			if ( course.kmCode === 'km2' ) {
				if ( kmCode !== 'km2' ) return 'gray';
				if ( course.intensiveStatus != 2 ) {
					if ( ( studentInfo.km2Status == 2 ) !== ( course.intensiveStatus == 1 ) ) return 'gray';
				}
			} else if ( course.kmCode === 'km3' ) {
				if ( kmCode !== 'km3' ) return 'gray';
				if ( course.intensiveStatus != 2 ) {
					if ( ( studentInfo.km3Status == 2 ) !== ( course.intensiveStatus == 1 ) ) return 'gray';
				}
			} else if ( course.kmCode === 'km2,km3' ) {
				// 增加课程intensiveStatus是否为2即排课课程判断
				if ( kmCode === 'km2' ) {
					if ( studentInfo.km2Status != 1 && ( studentInfo.km2Status != 2 || course.intensiveStatus != 2 ) ) return 'gray';
				}
				if ( kmCode === 'km3' ) {
					if ( studentInfo.km3Status != 1 && ( studentInfo.km3Status != 2 || course.intensiveStatus != 2 ) ) return 'gray';
				}
			}
			// 科目是否匹配
			if ( !availableKm.find( v => course.kmCode.indexOf( v.dKey ) >= 0 ) ) return 'gray';
			// 是否快约满
			// if ( course.placeNum >= Math.floor( courseBookNum * 0.8 ) ) return 'orange';
		}

		if ( course.placeNum > 0 ) return 'orange';
		return 'green';
	};

	// 表格-字段
	const tableColumns_1 = [
		{
			key: 'coachInfo',
			title: '教练信息',
			customRender: ( text, record ) => <Fragment>
				<div style={{ width: 'max-content' }}>
					<Tag style={{ fontSize: 16, fontWeight: 'bold' }}>{record.name}</Tag>
					<Tag>{record.mobile}</Tag>
				</div>
				<div style={{ width: 'max-content' }}>
					<Tag>男</Tag>
					<Tag>{record.teachLicense}</Tag>
					<Tag>{getDictValue( dictionary, 'coach_km', record.teachKm )}</Tag>
				</div>
				<div style={{ width: 'max-content' }}><Tag>人车上限：{record.bookNum}</Tag></div>
			</Fragment>,
		},
		{
			key: 'reserveInfo',
			title: '约课时段',
			customRender: ( text, record ) => <Fragment>
				<Card size="small">
					{record.courses && record.courses.map( v =>
						<Card.Grid key={v.id} style={{ position: 'relative' }}
						           className={classNames( styles.calendarCard, styles[ canReserveCalendar( v ) ] )}
						           onClick={() => confirmReserve( v )}>
							<div style={{ fontWeight: 'bold' }}>
								{v.startTime}-{v.endTime}
							</div>
							{v.intensiveStatus * 1 === 2 && <span className={styles.courseArrange}>排</span>}
							<Tag>{getDictValue( dictionary, 'coach_km', v.kmCode )}{v.intensiveStatus == 1 ? '集训' : ''}</Tag><br/>
							{v.placeNum
								?
								<a onClick={e => {
									showReserveStudentList( v, record.name );
									e.stopPropagation();
								}}>
									<Tag className={styles.aTag}>
										{v.placeNum}/{getBooknumMax( v.bookNum )}
									</Tag>
								</a>
								:
								<Tag>{v.placeNum}/{getBooknumMax( v.bookNum )}</Tag>
							}
						</Card.Grid> )}
				</Card>
			</Fragment>,
		},
	];
	const tableColumns_2 = [
		{
			key: 'key',
			title: '序号',
		},
		FIELDS.TEACHING.LESSON.COURSE_DATE,
		{
			key: 'timeRange',
			title: '培训时段',
			customRender: ( text, record ) => [record.intensiveStatus * 1 === 2 ? <Tag color="#f50"
			                                                                           key="f50">排</Tag> : '', record[ FIELDS.TEACHING.LESSON.START_TIME.key ] + '-' + record[ FIELDS.TEACHING.LESSON.END_TIME.key ]],
		},
		FIELDS.TEACHING.LESSON.COACH_ID,
		{
			...FIELDS.TEACHING.LESSON.COACH_GENDER,
			customRender: ( text, record ) => getDictValue( dictionary, FIELDS.EMPLOYEE.GENDER.key, getDictItemValue( dictionary, 'employee_id', record[ FIELDS.TEACHING.LESSON.COACH_ID.key ] )( FIELDS.EMPLOYEE.GENDER.key ) ),
		},
		{
			...FIELDS.TEACHING.LESSON.COACH_MOBILE,
			customRender: ( text, record ) => getDictValue( dictionary, FIELDS.EMPLOYEE.MOBILE.key, getDictItemValue( dictionary, 'employee_id', record[ FIELDS.TEACHING.LESSON.COACH_ID.key ] )( FIELDS.EMPLOYEE.MOBILE.key ) ),
		},
		{
			...FIELDS.TEACHING.COURSE.TEACH_KM,
			customRender: ( text, record ) => ( getDictValue( dictionary, 'coach_km', text ) + ( record.intensiveStatus == 1 ? '集训' : '' ) ),
		},
		{
			key: 'studentNum',
			title: '预约人数',
			customRender: ( text, record ) => record.placeNum
				?
				<a onClick={e => {
					showReserveStudentList( record, record.coachName );
					e.stopPropagation();
				}}>
					{record.studentNum}/{getBooknumMax( record.bookNum )}
				</a>
				:
				<div>{record.studentNum}/{getBooknumMax( record.bookNum )}</div>,
		},
		{
			key: 'placeNum',
			title: '占位情况',
			customRender: ( text, record ) => `${record.placeNum}/${getBooknumMax( record.bookNum )}`,
		},
		FIELDS.STUDENT.LICENSE_TYPE,
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record ) => <Spin
				spinning={loading.effects[ `${tableName_2}/queryOrderCourseResult` ] || false}>
				<a onClick={() => confirmReserve( record )}>预约</a>
			</Spin>,
		}
	];
	let tableTags = ['未约', '未约满', '已约满', '不可约'];
	return (
		<GridContent>
			<Spin spinning={searching}>
				<Card bordered={false} style={{ marginBottom: 20 }}>
					<Row gutter={24} type="flex" justify="center" style={{ marginBottom: 20 }}>
						<Col md={10} sm={24}>
							<Search
								size="large"
								placeholder="学员手机号/身份证号"
								value={searchKeywords}
								onChange={e => setSearchKeywords( e.target.value )}
								onSearch={value => search( value )}
								enterButton
							/>
						</Col>
						<Col md={6} sm={24}>
							<Button size="large" type="default" icon="idcard" htmlType="button"
							        loading={loading.effects[ `${tableName_2}/doIdentityInfo` ]}
							        onClick={doIdentityInfo}>
								读取身份证
							</Button>
						</Col>
					</Row>
					{studentInfo.id && description}
				</Card>
			</Spin>


			{!searching && showReserve && <Fragment>
				<Card bordered={false} bodyStyle={{ padding: '20px 24px 10px 24px' }}>
					<Radio.Group defaultValue={tableStyle} size="large" buttonStyle="solid"
					             onChange={e => setTableStyle( e.target.value )}>
						<Radio.Button value="1"><Icon type="table"/> 日历形式</Radio.Button>
						{studentInfo.id && <Radio.Button value="2"><Icon type="unordered-list"/> 列表形式</Radio.Button>}
					</Radio.Group>
				</Card>

				{tableStyle == 1 ? <div className={styles.table_1}>
					<Card bordered={false} bodyStyle={{ padding: '10px 24px 10px 24px' }}>
						<Row>
							{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map( v =>
								<Col key={v} sm={2}
								     className={classNames( { [ styles.active ]: table_1_date == v }, styles.date_ctnr )}
								     onClick={() => setTable_1_Date( v )}>
									<div className={styles.date}>{moment().add( v, 'days' ).format( 'DD' )}</div>
									<div className={styles.weekday}>{moment().add( v, 'days' ).format( 'dddd' )}</div>
								</Col> )}
						</Row>
					</Card>
					<WithTableName
						key="table_1"
						{...props}
						tableSearchParams={{
							studentId: studentInfo.id,
							teachLicense: studentInfo.licenseType,
							bookNum: getDictItemValue( dictionary, 'class_id', studentInfo.classId )( 'bookNum' ),
							courseDate: moment().add( table_1_date, 'days' ).format( 'YYYY-MM-DD' ),
						}}
						tableTags={tableTags}
						tableName={tableName_1}
						originColumns={tableColumns_1}
						formFields={memoFilterFields_1}
						columnSortable={false}
						// scroll={{ x: 'max-content' }}
						needUpdate={tableNeedUpdate}
						setNeedUpdate={setTableNeedUpdate}
					/>
				</div> : <WithTableName
					key="table_2"
					{...props}
					tableSearchParams={{
						studentId: studentInfo.id,
						isCurrentCoach: matchModeValues[ 0 ].dKey,
					}}
					tableName={tableName_2}
					originColumns={tableColumns_2}
					formFields={memoFilterFields_2}
					columnSortable={false}
					scroll={{ x: 'max-content' }}
					needUpdate={tableNeedUpdate}
					setNeedUpdate={setTableNeedUpdate}
				/>}
			</Fragment>}

			<ReserveStudentListModal
				visible={reserveStudentListVisible}
				setVisible={setReserveStudentListVisible}
				params={reserveStudentListParams}
				dispatch={dispatch}
			/>
		</GridContent>
	);
};

export default connect( (
	{
		[ tableName_1 ]: data_1,
		[ tableName_2 ]: data_2,
		loading,
		dictionary,
		global
	}
) => (
	{
		[ tableName_1 ]: data_1,
		[ tableName_2 ]: data_2,
		loading,
		dictionary,
		global,
	}
) )( Form.create()( Reserve ) );
