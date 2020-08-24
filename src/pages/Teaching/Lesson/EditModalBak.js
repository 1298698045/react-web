import React, { Fragment, useState, useEffect, useMemo, } from 'react';
import { useCounter, useList } from 'react-use';
import {
	Form,
	Modal,
	Row,
	Col,
	Icon,
	Card,
	Divider,
	Button,
	Popconfirm,
} from 'antd';
import moment from 'moment';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from '@/config/fields';

import style from './index.less';

let id = 0;
let timeRangeId = -1;
let exTimeRangeId = -1;
let timeRangeArr = [];
let exTimeRangeArr = [];

const EditModal = props => {
		const { onSubmit, visible, setVisible, form, loading, afterClose } = props;
		const { getFieldDecorator, getFieldValue, resetFields, } = form;
		
		const data = {
			title: props.data.title,
			periodList: props.data.periodList.map( p => {
				return {
					...p,
					extTimeRange: p.extTimeRange ? p.extTimeRange.filter( e => e && e.length > 0 ) : [],
				};
				
			} ),
		};
		useEffect( () => {
			return () => {
				if ( !visible ) {
					id = 0;
					timeRangeId = -1;
					exTimeRangeId = -1;
					timeRangeArr = [];
					exTimeRangeArr = [];
					resetFields();
				}
			}
		}, [ data, visible ] );
		
		const onOk = e => {
			e.preventDefault();
			
			form.validateFields( ( err, fieldsValue ) => {
				if ( err ) {
					return false;
				}
				const { keys, timeRangeKeys, p, e, pBeginMonth, pTitle, pEndMonth, } = fieldsValue;
				const r = keys.map( key => {
					
					return {
						title: pTitle[ key ],
						dateRange: [ pBeginMonth[ key ], pEndMonth[ key ] ],
						timeRange: timeRangeKeys[ key ].map( v => {
							return [ moment( p[ key ][ v ].beginTime ).format( 'HH:mm' ), moment( p[ key ][ v ].endTime ).format( 'HH:mm' ) ];
						} ),
						extTimeRange: exTimeRangeKeys[ key ].map( v => {
							return [ moment( e[ key ][ v ].beginTime ).format( 'HH:mm' ), moment( e[ key ][ v ].endTime ).format( 'HH:mm' ) ];
						} ),
					}
				} );
				
				onSubmit( {
					params: {
						id: data.id,
						title: fieldsValue[ FIELDS.TEACHING.LESSON.TITLE.key ],
						periodList: [ ...r ],
					},
				} );
			} );
		};
		
		const onCancel = e => {
			e.preventDefault();
			
			setVisible( false );
		};
		
		if ( data.periodList.length === 0 ) id = 0;
		getFieldDecorator( 'keys', {
			initialValue: data.periodList.map( ( v, i ) => {
				id = i;
				return i;
			} )
		} );
		
		console.log( form.getFieldValue( 'keys' ), id );
		
		const initialTimeRangeKeys = data.periodList.map( ( v, i ) => {
			console.log( 'initialTimeRangeKeys' );
			return v.timeRange.map( ( t, j ) => {
				timeRangeId = timeRangeId + 1;
				timeRangeArr[ timeRangeId ] = t;
				return timeRangeId;
			} );
		} );
		
		const initialExTimeRangeKeys = data.periodList.map( ( v, i ) => {
			return v.extTimeRange.map( ( t, j ) => {
				exTimeRangeId = exTimeRangeId + 1;
				exTimeRangeArr[ exTimeRangeId ] = t;
				return exTimeRangeId;
			} );
		} );
		
		getFieldDecorator( 'timeRangeKeys', {
			initialValue: initialTimeRangeKeys,
		} );
		
		getFieldDecorator( 'exTimeRangeKeys', {
			initialValue: initialExTimeRangeKeys,
		} );
		
		const keys = getFieldValue( 'keys' );
		const timeRangeKeys = getFieldValue( 'timeRangeKeys' );
		const exTimeRangeKeys = getFieldValue( 'exTimeRangeKeys' );
		console.log( keys, timeRangeKeys, exTimeRangeKeys );
		
		const formItems = keys.map( ( k, index ) => {
			return (
				<Fragment key={k}>
					{
						index !== 0 && <Divider dashed/>
					}
					<Row gutter={24}>
						<Col md={6} sm={20}>
							<WrapperComplexFormItem
								config={{
									title: '周期名称',
									key: `pTitle[${k}]`,
									type: 'input',
								}}
								form={form}
								initialValue={data.periodList[ k ] ? data.periodList[ k ].title : undefined}
								rules={[ { required: true, } ]}
								style={{ marginBottom: 10, }}
							/>
						</Col>
						<Col sm={4}>
							<Popconfirm title="确认删除这个周期么？" onConfirm={() => remove( k )}>
								<Icon
									style={{ marginTop: 30, }}
									className={style.dynamicDeleteButton}
									type="minus-circle-o"
								/>
							</Popconfirm>
						</Col>
						<Col sm={24}>
							<Form.Item label="周期范围" required style={{ marginBottom: 10, }}>
								<Row gutter={24}>
									<Col md={12} sm={24}>
										<WrapperComplexFormItem
											config={{
												title: '起始月份',
												key: `pBeginMonth[${k}]`,
												type: 'input',
											}}
											initialValue={data.periodList[ k ] ? data.periodList[ k ].dateRange[ 0 ] : undefined}
											needLabel={false}
											form={form}
											addonBefore="起始月份"
											rules={[ { required: true, } ]}
											style={{ marginBottom: 0, }}
										/>
									</Col>
									<Col md={12} sm={24}>
										<WrapperComplexFormItem
											config={{
												title: '终止月份',
												key: `pEndMonth[${k}]`,
												type: 'input',
											}}
											needLabel={false}
											initialValue={data.periodList[ k ] ? data.periodList[ k ].dateRange[ 1 ] : undefined}
											form={form}
											addonBefore="终止月份"
											rules={[ { required: true, } ]}
											style={{ marginBottom: 0, }}
										/>
									</Col>
								</Row>
							</Form.Item>
						</Col>
						<Col sm={24}>
							<Form.Item label="正常时段" required>
								{
									timeRangeKeys[ k ] && timeRangeKeys[ k ].map( ( t, i ) => {
										return (
											<Row gutter={24} key={i}>
												<Col sm={10}>
													<WrapperComplexFormItem
														config={{
															title: '起始时间',
															key: `p[${k}][${t}].beginTime`,
															type: 'time',
														}}
														needLabel={false}
														form={form}
														initialValue={
															timeRangeArr
																?
																timeRangeArr[ t ]
																	?
																	timeRangeArr[ t ][ 0 ]
																	:
																	undefined
																:
																undefined}
														rules={[ { required: true, } ]}
														style={{ marginBottom: 0, }}
													/>
												</Col>
												<Col sm={10}>
													<WrapperComplexFormItem
														config={{
															title: '终止时间',
															key: `p[${k}][${t}].endTime`,
															type: 'time',
														}}
														needLabel={false}
														initialValue={
															timeRangeArr
																?
																timeRangeArr[ t ]
																	?
																	timeRangeArr[ t ][ 1 ]
																	:
																	undefined
																:
																undefined}
														form={form}
														rules={[ { required: true, } ]}
														style={{ marginBottom: 0, }}
													/>
												</Col>
												<Col sm={4}>
													<Popconfirm title="确认删除这个时段么？"
													            onConfirm={() => removeTimeRange( t, k )}>
														<Icon
															className={style.dynamicDeleteButton}
															type="minus-circle-o"
														/>
													</Popconfirm>
												</Col>
											</Row>
										)
									} )
								}
								<Button block type="dashed" onClick={() => addTimeRange( k )} icon="plus-circle-o">
									添加正常时段
								</Button>
							</Form.Item>
						</Col>
						<Col sm={24}>
							<Form.Item label="加班时段" required>
								{
									exTimeRangeKeys[ k ] && exTimeRangeKeys[ k ].length > 0 && exTimeRangeKeys[ k ].map( ( t, i ) => {
										return (
											<Row gutter={24} key={i}>
												<Col sm={10}>
													<WrapperComplexFormItem
														config={{
															title: '起始时间',
															key: `e[${k}][${t}].beginTime`,
															type: 'time',
														}}
														needLabel={false}
														form={form}
														initialValue={
															exTimeRangeArr
																?
																exTimeRangeArr[ t ]
																	?
																	exTimeRangeArr[ t ][ 0 ]
																	:
																	undefined
																:
																undefined
														}
														rules={[ { required: true, } ]}
														style={{ marginBottom: 0, }}
													/>
												</Col>
												<Col sm={10}>
													<WrapperComplexFormItem
														config={{
															title: '终止时间',
															key: `e[${k}][${t}].endTime`,
															type: 'time',
														}}
														needLabel={false}
														form={form}
														initialValue={
															exTimeRangeArr
																?
																exTimeRangeArr[ t ]
																	?
																	exTimeRangeArr[ t ][ 1 ]
																	:
																	undefined
																:
																undefined
														}
														rules={[ { required: true, } ]}
														style={{ marginBottom: 0, }}
													/>
												</Col>
												<Col sm={4}>
													<Popconfirm title="确认删除这个时段么？"
													            onConfirm={() => removeExTimeRange( t, k )}>
														<Icon
															className={style.dynamicDeleteButton}
															type="minus-circle-o"
														/>
													</Popconfirm>
												</Col>
											</Row>
										)
									} )
								}
								<Button block type="dashed" onClick={() => addExTimeRange( k )} icon="plus-circle-o">
									添加加班时段
								</Button>
							</Form.Item>
						</Col>
					</Row>
				</Fragment>
			)
		} );
		
		const add = () => {
			const keys = getFieldValue( 'keys' );
			let nextKeys;
			if ( keys.length === 0 ) {
				nextKeys = keys.concat( id );
				id = id + 1;
			} else {
				id = id + 1;
				nextKeys = keys.concat( id );
			}
			console.log( id, getFieldValue( 'keys' ), timeRangeKeys, exTimeRangeKeys );
			timeRangeKeys[ id - 1 ] = [];
			exTimeRangeKeys[ id - 1 ] = [];
			form.setFieldsValue( {
				keys: nextKeys,
				timeRangeKeys: [ ...timeRangeKeys ],
				exTimeRangeKeys: [ ...exTimeRangeKeys ],
			} );
		};
		
		const addTimeRange = keys => {
			const timeRangeKeys = getFieldValue( `timeRangeKeys` );
			
			timeRangeId = timeRangeId + 1;
			timeRangeKeys[ keys ] = timeRangeKeys[ keys ].concat( timeRangeId );
			form.setFieldsValue( {
				timeRangeKeys: [ ...timeRangeKeys ],
			} );
			
			console.log( timeRangeId, getFieldValue( `timeRangeKeys` ) );
		};
		
		const addExTimeRange = keys => {
			const exTimeRangeKeys = getFieldValue( `exTimeRangeKeys` );
			
			exTimeRangeId = exTimeRangeId + 1;
			exTimeRangeKeys[ keys ] = exTimeRangeKeys[ keys ].concat( exTimeRangeId );
			form.setFieldsValue( {
				exTimeRangeKeys: [ ...exTimeRangeKeys ],
			} );
		};
		
		const remove = k => {
			const keys = getFieldValue( 'keys' );
			
			form.setFieldsValue( {
				keys: keys.filter( key => key !== k ),
			} );
		};
		
		const removeTimeRange = ( t, k ) => {
			const timeRangeKeys = getFieldValue( 'timeRangeKeys' );
			
			console.log( k, t, timeRangeKeys, timeRangeArr, timeRangeId );
			timeRangeKeys[ k ] = timeRangeKeys[ k ].filter( key => key !== t );
			form.setFieldsValue( {
				timeRangeKeys: [ ...timeRangeKeys ],
				// timeRangeKeys: timeRangeKeys.filter( key => key !== t ),
			} );
		};
		
		const removeExTimeRange = ( t, k ) => {
			const exTimeRangeKeys = getFieldValue( 'exTimeRangeKeys' );
			
			exTimeRangeKeys[ k ].splice( t, 1 );
			form.setFieldsValue( {
				exTimeRangeKeys: [ ...exTimeRangeKeys ],
			} );
		};
		
		return (
			<Modal
				destroyOnClose
				afterClose={afterClose}
				title={`${data.id ? '修改' : '新增'}时段`}
				width={600}
				visible={visible}
				onOk={onOk}
				onCancel={onCancel}
				confirmLoading={loading}
				okText="提交"
				cancelText="取消"
			>
				<Form onSubmit={onOk} layout="vertical">
					<Row gutter={24}>
						<Col sm={24}>
							<WrapperComplexFormItem
								{...props}
								config={FIELDS.TEACHING.LESSON.TITLE}
								form={form}
								initialValue={data[ FIELDS.TEACHING.LESSON.TITLE.key ]}
								rules={[ { required: true, } ]}
							/>
						</Col>
					</Row>
					<Card>
						{formItems}
						<Button block type="dashed" onClick={() => add()} icon="plus-circle-o">
							添加周期
						</Button>
					</Card>
				</Form>
			</Modal>
		);
	}
;

export default Form.create()( EditModal );
