import React, { useState, Fragment } from 'react';
import { useToggle, } from 'react-use';
import { connect } from 'dva';
import { Button, Form, Tag, Divider, Typography, Switch, Spin, Popconfirm } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import { refreshDictionary } from '@/utils/dictionaryUtil';
import Privilege from '@/components/Privilege';
import Buttons from '@/components/Buttons';
import EditModal from './EditModal';

const tableName = 'teachingLessonList';

const { Text } = Typography;

const Index = props => {
	const { dispatch, loading } = props;
	const [ editModalVisible, toggleEditModalVisible ] = useToggle( false );
	const [ lessonInfo, setLessonInfo ] = useState( { periodList: [] } );
	const [ needUpdate, setNeedUpdate ] = useToggle( false );

	const submitLoading = loading.effects[ `${tableName}/saveTimePlan` ] || false;
	const delLoading = loading.effects[ `${tableName}/deleteRecord` ] || false;

	const addLessonInfo = () => {
		setLessonInfo( { periodList: [] } );
		toggleEditModalVisible( true );
	};
	// 删除
	const deleteRecord = id => {
		dispatch( {
			type: `${tableName}/deleteRecord`,
			payload: {
				params: {
					planId: id
				}
			},
		} ).then( () => {
			setNeedUpdate( true );
		} );
	};
	// 表格-字段
	const tableColumns = [
		{
			key: 'key',
			title: '序号',
		},
		FIELDS.TEACHING.LESSON.TITLE,
		{
			...FIELDS.TEACHING.LESSON.PERIOD_LIST,
			customRender: ( text, record, ) => {
				return <Fragment>
					{
						JSON.parse( record.periodList ).map( ( { title, dateRange }, index ) => {
							return (
								<Fragment key={title}>
									{
										index !== 0 && <Divider dashed style={{ margin: '10px 0', }}/>
									}
									<div>
										<Text strong style={{ marginRight: 10, }}>{`${title}：`}</Text>
										<span>{
											dateRange
												?
												<Tag
													style={{ marginRight: 10, }}>{dateRange.map( d => `${d}月` ).join( ' ~ ' )}</Tag>
												:
												'暂无'
										}</span>
									</div>
								</Fragment>
							)
						} )
					}
				</Fragment>;
			},
		},
		{
			...FIELDS.TEACHING.LESSON.TIME_RANGE,
			customRender: ( text, record, ) => {
				return <Fragment>
					{
						JSON.parse( record.periodList ).map( ( { title, timeRange }, index ) => {
							return (
								<Fragment key={title}>
									{
										index !== 0 && <Divider dashed style={{ margin: '10px 0', }}/>
									}
									<div>
										<Text strong
										      style={{ marginRight: 10, verticalAlign: 'top', }}>{`${title}：`}</Text>
										<span style={{
											verticalAlign: 'top',
											display: 'inline-block',
											width: 340,
										}}>{
											( timeRange && timeRange.length > 0 )
												?
												timeRange.map( ( t, i ) => <Tag key={i}
												                                style={{
													                                marginRight: 10,
													                                marginBottom: 10,
												                                }}>{t.join( ' ~ ' )}</Tag> )
												:
												'暂无'
										}</span>
									</div>
								</Fragment>
							)
						} )
					}
				</Fragment>;
			},
		},
		{
			...FIELDS.TEACHING.LESSON.EXT_TIME_RANGE,
			customRender: ( text, record, ) => {
				return <Fragment>
					{
						JSON.parse( record.periodList ).map( ( { title, extTimeRange }, index ) => {
							return (
								<Fragment key={title}>
									{
										index !== 0 && <Divider dashed style={{ margin: '10px 0', }}/>
									}
									<div>
										<Text strong
										      style={{ marginRight: 10, verticalAlign: 'top', }}>{`${title}：`}</Text>
										<span style={{
											verticalAlign: 'top',
											display: 'inline-block',
											width: 340,
										}}>{
											( extTimeRange && extTimeRange.length > 0 )
												?
												extTimeRange.map( ( t, i ) => {
													return t.length > 0
														?
														(
															<Tag key={i}
															     style={{ marginRight: 10, marginBottom: 10, }}>{
																t.join( ' ~ ' )
															}</Tag>
														)
														: '暂无'
												} )
												:
												'暂无'
										}</span>
									</div>
								</Fragment>
							)
						} )
					}
				</Fragment>;
			},
		},
		{
			...FIELDS.TEACHING.LESSON.STATUS,
			customRender: ( text, record, ) => {
				return (
					<Privilege privs={[ 'status_lession_manage' ]} noMatch={text === 1 ? '启用' : '关闭'}>
						<Switch
							onChange={e => {
								if ( e ) {
									dispatch( {
										type: `${tableName}/openTimePlan`,
										payload: {
											params: {
												planId: record.id,
											}
										}
									} ).then( () => {
										refreshDictionary( dispatch, 'lesson_id' );
										setNeedUpdate( true );
									} );
								} else {
									dispatch( {
										type: `${tableName}/closeTimePlan`,
										payload: {
											params: {
												planId: record.id,
											}
										}
									} ).then( () => {
										refreshDictionary( dispatch, 'lesson_id' );
										setNeedUpdate( true );
									} );
								}
							}
							}
							checked={record[ FIELDS.TEACHING.LESSON.STATUS.key ] === 1}/>
					</Privilege>
				)
			},
		},
		{
			title: '操作',
			key: 'action',
			customRender: ( text, record, ) => {
				const { status } = record;
				return [
					<Fragment>
						<Privilege privs={[ 'delete_lession_manage' ]} key="delete_lession_manage" noMatch={'删除'}>
							{
								status * 1 !== 1 ?
									<Popconfirm
										key="delete"
										title="确定删除该课时吗？"
										onConfirm={() => {
											const { id } = record;
											deleteRecord( id );
										}}>
										<a>{delLoading && <Spin size="small"/>} 删除</a>
									</Popconfirm> : <Text key="delete" disabled>删除</Text>
							}
						</Privilege>
						<Privilege privs={[ 'lesson_copy' ]} key="lesson_copy">
							<a onClick={addLessonInfo}>复制</a>
						</Privilege>
					</Fragment>
				]
			}
		},
	];
	// 操作按钮
	const tableActions = [
		<Privilege privs={[ 'lession_add' ]} key={'lession_add'}>
			<Button
				key="plus-button"
				icon="plus"
				htmlType="button"
				type="primary"
				onClick={() => {
					addLessonInfo();
				}}>新增</Button>
		</Privilege>,
	];

	return (
		<PageHeaderWrapper title={<FormattedMessage id="menu.teaching.lesson"/>}>
			<GridContent>
				<WithTableName
					{...props}
					needUpdate={needUpdate}
					setNeedUpdate={setNeedUpdate}
					pagination={false}
					tableName={tableName}
					originColumns={tableColumns}
					tableActions={tableActions}
					columnSortable={false}
					scroll={{ x: 'max-content' }}
				/>
			</GridContent>

			<EditModal
				loading={submitLoading}
				data={lessonInfo}
				afterClose={() => setNeedUpdate( true )}
				onSubmit={fieldsValue => {
					dispatch( {
						type: `${tableName}/saveTimePlan`,
						payload: {
							...fieldsValue,
						},
					} ).then( data => {
						if ( data !== false ) {
							refreshDictionary( dispatch, 'lesson_id' );
							toggleEditModalVisible( false );
						}
					} );
				}}
				visible={editModalVisible}
				setVisible={toggleEditModalVisible}
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
) )( Form.create()( Index ) );
