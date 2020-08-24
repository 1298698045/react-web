import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from "dva";
import { Card, Menu, Button, Form, Modal, Icon, message, Tag } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
import ViewModal from "./ViewModal";
import { getDictValue, queryDictionary } from "@/utils/dictionaryUtil";
import Privilege from '@/components/Privilege';

const tableName = 'teachingLog';

const TeachingLog = props => {
	const { dispatch, form, dictionary } = props;
	const [ logInfo, setLogInfo ] = useState({});
	const [ viewModalVisible, setViewModalVisible ] = useState(false);
	const [ tagList, setTagList ] = useState([]);
	const [ selectRow, setSelectRow ] = useState({});
	useEffect( () => {
		queryDictionary( dispatch, 'employee_id' );
	}, [] );
	useEffect( () => {
		dispatch( {
			type: `${tableName}/getTagList`
		} ).then( (res) => {
			setTagList( res );
		} );
	}, [] );
	let getDetail = (record) => {
		dispatch( {
			type: `${tableName}/getTeachingLogDetail`,
			payload:{
				params: {
					id: record.id
				}
			}
		} ).then( (res) => {
			// 课程评价
			if (res.student.courseCommentScoreList) {
				res.student.courseCommentScoreList = res.student.courseCommentScoreList.map(one => {
					one.evaluationName = getDictValue( dictionary, 'course_evaluation', one.evaluation)
					return one
				})
			} else {
				res.student.courseCommentScoreList = []
			}
			// 教练评价-标签
			if (res.coach) {
				res.coach = res.coach.map(item => {
					if(item.courseCommentTagsList) {
						item.courseCommentTagsList = item.courseCommentTagsList.map(one => {
							const item = tagList['comment_' + record.kmCode] ? tagList['comment_' + record.kmCode].find( v => v.id == one.tagId ) : {};
							one.tagName = item ? item.tag : ''
							return one
						})
					}
					return item
				})
			}
			// 学习内容
			if (res.studentInfo) {
				res.studentInfo.learningList = res.studentInfo.learningList.map(one => {
					const item = tagList['learning_content_' + record.kmCode] ? tagList['learning_content_' + record.kmCode].find( v => v.id == one.tagId ) : {};
					one.tagName = item ? item.tag : ''
					return one
				})
			}
			setSelectRow(record)
			setLogInfo( res );
			setViewModalVisible(true)
		} );
	}
	// 表格-字段
	const tableColumns = [
		{
			key: 'key',
			title: '序号',
		},
		{...FIELDS.TEACHING.LOG.STUDENT_NAME, title: '学员姓名'},
		{...FIELDS.TEACHING.LOG.STUDENT_MOBILE, title: '联系方式'},
		{...FIELDS.TEACHING.LESSON.COACH_ID, title: '责任教练'},
		FIELDS.TEACHING.LOG.COURSE_DATE,
		{
			key: 'timeRange',
			title: '课程时段',
			customRender: ( text, record ) => [record.intensiveStatus * 1 === 2 ? <Tag color="#f50" key="f50">排</Tag> : '', record[ FIELDS.TEACHING.LESSON.START_TIME.key ] + '-' + record[ FIELDS.TEACHING.LESSON.END_TIME.key ]],
		},
		{
			...FIELDS.TEACHING.COURSE.KM, 
			title: '课程科目',
			customRender: ( text, record ) => getDictValue( dictionary, FIELDS.TEACHING.COURSE.KM.dictionary, record[ FIELDS.TEACHING.COURSE.KM.key ] ) + ( record.intensiveStatus == 1 ? '集训' : '' ),
		},
		FIELDS.TEACHING.LOG.EVALUATION_STATUS,
		FIELDS.TEACHING.LOG.REVIEW_STATUS,
		{
			key: 'operation',
			title: '操作',
			default: true,
			customRender: ( text, record, index ) =>
				(
					<Privilege privs={[ 'detail_education_log' ]} noMatch={'详情'}>
						<a onClick={() => {
							getDetail(record)
						}}> 详情</a>
					</Privilege>
				),
		},
	];
	// 筛选表单-字段
	const tableFilterFields = [
		{
			config: FIELDS.TEACHING.LOG.COURSE_DATE,
		},
		{
			config: {...FIELDS.TEACHING.LESSON.START_TIME, title: '课程时段开始时间'}
		},
		{
			config: {...FIELDS.TEACHING.LESSON.END_TIME, title: '课程时段结束时间'}
		},
		{
			config: {...FIELDS.STUDENT.EXAM_KM, title: '课程科目'}
		},
		{
			config: FIELDS.TEACHING.LOG.EVALUATION_STATUS
		},
		{
			config: FIELDS.TEACHING.LOG.REVIEW_STATUS
		},
		{
			config: FIELDS.TEACHING.LOG.SEARCH_KEY
		},
	];
	// 操作按钮
	const tableActions = [];
	// 更多操作菜单
	const tableMenuItems = [];

	const memoFilterFields = useMemo( () => {
		return tableFilterFields.map( props => <WrapperComplexFormItem
			{...props}
			form={form}
		/> );
	}, [ form ] );

	return (
		<PageHeaderWrapper title={<FormattedMessage id="menu.teaching.log"/>}>
			<GridContent>
				<WithTableName
					{...props}
					tableName={tableName}
					originColumns={tableColumns}
					formFields={memoFilterFields}
					tableActions={tableActions}
					columnSortable={false}
				/>
				
			</GridContent>
			<ViewModal
				visible={viewModalVisible}
				setVisible={setViewModalVisible}
				data={logInfo}
				dictionary={dictionary}
				dispatch={dispatch}
				selectRow={selectRow}
				onFeatch={() => {
					getDetail(selectRow)
				}}
			/>
		</PageHeaderWrapper>
	);
};

export default connect( (
	{
		[ tableName ]: data,
		loading,
		global,
		dictionary
	}
) => (
	{
		[ tableName ]: data,
		loading,
		global,
		dictionary
	}
) )( Form.create()( TeachingLog ) );
