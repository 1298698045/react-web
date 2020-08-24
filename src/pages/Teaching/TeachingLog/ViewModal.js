import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { useToggle, } from 'react-use';
import { connect } from "dva";
import { Form, Modal, Col, Row, Card, Upload, Button, message, Collapse, Spin, Descriptions, Tabs, Divider,List, Rate, Icon, Avatar, Drawer,Tag } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
import useGetInitialValue from '@/hooks/useGetInitialValue';
import { getDictValue } from "@/utils/dictionaryUtil";
import AddMorkModal from "./AddMorkModal";
import Privilege from '@/components/Privilege';
import { hasPriv } from '@/utils/privilege';

let Item = Descriptions.Item
const { Panel } = Collapse;
const { TabPane } = Tabs;
const ViewModal = props => {
	const {  selectRow, dispatch,visible, setVisible, data, loading, afterClose, dictionary, onFeatch} = props;
	const [ addModalVisible, setAddModalVisible ] = useState(false);
	// 表格-字段
	const getValue = useGetInitialValue( data.studentInfo );
	
	return visible &&  <Modal
			width="80%"
			title={'教学日志详情-' + getValue(FIELDS.TEACHING.LOG.STUDENT_NAME)}
			visible={visible}
			afterClose={afterClose}
			destroyOnClose
			maskClosable={false}
			onCancel={() => setVisible( false )}
			footer={
				<Button
					icon="close-circle"
					htmlType="button"
					onClick={() => {
						setVisible( false );
					}}>关闭</Button>
			}
		>
			<Descriptions column={3} bordered >
				{
					[
						FIELDS.TEACHING.LOG.STUDENT_NAME,
						FIELDS.TEACHING.LOG.STUDENT_MOBILE,
						FIELDS.TEACHING.LOG.COACH_NAME,
					].map( f =>
						<Item
							span={f.span || 1}
							key={f.key}
							label={f.title}
						>{getValue( f ) || '暂无'}</Item> )
				}

				<Item label={'课程科目'}>
					{ getDictValue( dictionary, FIELDS.TEACHING.COURSE.KM.dictionary, getValue( FIELDS.TEACHING.COURSE.KM) ) + ( data.intensiveStatus == 1 ? '集训' : '' )}
				</Item>
				<Item label={FIELDS.TEACHING.LOG.COURSE_DATE.title}
				>{getValue( FIELDS.TEACHING.LOG.COURSE_DATE ) || '暂无'}</Item>
				<Item label={'课程时段'}>{
					[data.intensiveStatus * 1 === 2 ? <Tag color="#f50" key="f50">排</Tag> : '', getValue(FIELDS.TEACHING.LESSON.START_TIME)  + '-' + getValue( FIELDS.TEACHING.LESSON.END_TIME)]
				}</Item> 
				<Item label={'课程状态'}>
					{data.studentInfo.signStatus == 1 ? '已签到' : '未签到' }
				</Item>
				<Item label={'学习内容'}>
					{data.studentInfo.learningList.length ? data.studentInfo.learningList.map(one => one.tagName).join(',') : '暂无'}					
				</Item>
			</Descriptions>
			<br/>
			<Tabs defaultActiveKey="1" onChange={onFeatch}>
					{hasPriv( 'evaluate_detail_education_log' ) && <TabPane tab="课程评价" key="1">
						{data.student.courseCommentScoreList.length ? ([<List key="list01"
							grid={{
								gutter: 10
							}}
							dataSource={data.student.courseCommentScoreList}
							renderItem={item => (
								<List.Item>
									<span style={{marginRight: '10px'}}>{item.evaluationName}</span><Rate disabled defaultValue={item.score} style={{color: '#fc541b'}} />
								</List.Item>
							)}
						/>,
						<Divider key="Divider01"/>]) : ''}
						<List
							itemLayout="vertical"
							size="small"
							dataSource={data.student.studentList}
							renderItem={item => (
							<List.Item>
								<List.Item.Meta
								title={item.createTime}
								description={item.content ? item.content : '暂无'}
								/>
							</List.Item>
							)}
						/>
					</TabPane>}
				{hasPriv( 'comment_coach_detail_education_log' ) && <TabPane tab="教练点评" key="2">
					{<List
						itemLayout="vertical"
						size="small"
						dataSource={data.coach}
						renderItem={item => (
						<List.Item>
							<List.Item.Meta style={{marginBottom: 0}}
							title={item.createTime}
							// description={}
							/>
							{[
								item.courseCommentTagsList.map(one => <Tag key={one.tagId}>{one.tagName}</Tag>),
								<div key="c1" style={{margin: '15px'}}>{item.content ? item.content : '暂无'}</div>,
								item.voiceList.map(one => {
									return (<audio controls controlsList="nodownload" key={one} style={{width: '230px',marginRight: '5px'}}>
									    <source src={one} type="audio/ogg" />
									</audio>)
								}),
							]}
						</List.Item>
						)}
					/>}
				</TabPane>}
				{hasPriv( 'course_log_detail_education_log' ) && <TabPane tab="课程日志" key="3">
					<List
						itemLayout="vertical"
						size="small"
						dataSource={data.note}
						renderItem={item => (
						<List.Item>
							<List.Item.Meta
							title={item.createTime}
							description={item.content ? item.content : '暂无'}
							/>
						</List.Item>
						)}
					/>
				</TabPane>}
				{hasPriv( 'add_memo_detail_education_log' ) &&  <TabPane tab="备注" key="4" >
					<Privilege privs={[ 'add_memo_detail_education_log' ]}>
					<Button type="primary" onClick={() => {
						setAddModalVisible(true)
					}}>添加备注</Button></Privilege>
					<List
						itemLayout="vertical"
						size="small"
						dataSource={data.remarks}
						renderItem={item => (
						<List.Item>
							<List.Item.Meta
							title={`${getDictValue( dictionary, 'employee_id', item.coachId )}        ${item.createTime}`}
							description={item.content ? item.content : '暂无'}
							/>
						</List.Item>
						)}
					/>
				</TabPane>}
			</Tabs>

			<AddMorkModal
				visible={addModalVisible}
				setVisible={setAddModalVisible}
				selectRow={selectRow}
				onSubmit={(params) => {
					dispatch( {
						type: `teachingLog/addRemarks`,
						payload:{
							params
						}
					} ).then( (res1) => {
						dispatch( {
							type: `teachingLog/getTeachingLogDetail`,
							payload:{
								params: {
									id: selectRow.id
								}
							}
						} ).then( (res) => {
							onFeatch()
							setAddModalVisible(false)
						})
					} )
				}
				}
			/>
		</Modal>
	;
}
export default connect( (
	{
		loading,
		global,
	}
) => (
	{
		loading,
		global,
	}
) )( Form.create()( ViewModal ) );
