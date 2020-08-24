import React, { Fragment, useEffect } from 'react';
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
	message,
} from 'antd';
import moment from 'moment';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from '@/config/fields';

import style from './index.less';
import { useUpdateEffect } from 'react-use';

let id = 0;
let timeRangeId = -1;
let exTimeRangeId = -1;

const EditModal = props => {
		const { onSubmit, visible, setVisible, form, loading, afterClose } = props;
		const { getFieldDecorator, getFieldValue, } = form;
		
		useUpdateEffect( () => {
			if ( !visible ) {
				id = 0;
				timeRangeId = -1;
				exTimeRangeId = -1;
				form.resetFields();
			}
		}, [ visible, form, ] );
		useEffect( () => {
			if (visible) {
				add()
			}
		}, [ visible ] );
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
							const { beginTime, endTime } = p[ key ][ v ];
							return [ moment( beginTime ).format( 'HH:mm' ), moment( endTime ).format( 'HH:mm' ) ];
						} ),
						extTimeRange: exTimeRangeKeys[ key ].map( v => {
							const { beginTime, endTime } = e[ key ][ v ];
							return [ moment( beginTime ).format( 'HH:mm' ), moment( endTime ).format( 'HH:mm' ) ];
						} ),
					}
				} );
				
				const isNormalInvalid = r.filter( f => !f.timeRange.length || f.timeRange.find( t => t[ 0 ] === 'Invalid date' || t[ 1 ] === 'Invalid date' ) );
				const isExInvalid = r.filter( f => f.extTimeRange.find( t => t[ 0 ] === 'Invalid date' || t[ 1 ] === 'Invalid date' ) );
				if ( isNormalInvalid.length > 0 ) {
					message.error( '请配置正常时段！' );
					return false;
				}
				if ( isExInvalid.length > 0 ) {
					message.error( '请配置加班时段！' );
					return false;
				}
				let reqParams = [...r]
				if (!reqParams.length) {
					message.error( '请添加周期！' );
					return false;
				}
				reqParams = reqParams.map(one => {
					if (one.timeRange.length) {
						one.timeRange.sort((a, b) => {
							return a[1].replace(':', '') * 1 - b[1].replace(':', '') * 1
						})
					}
					if (one.extTimeRange.length) {
						one.extTimeRange.sort((a, b) => {
							return a[1].replace(':', '') * 1 - b[1].replace(':', '') * 1
						})
					}
					return one
				})
				onSubmit( {
					params: {
						title: fieldsValue[ FIELDS.TEACHING.LESSON.TITLE.key ],
						periodList: reqParams,
					},
				} );
			} );
		};
		
		const onCancel = e => {
			e.preventDefault();
			
			setVisible( false );
		};
		
		getFieldDecorator( 'keys', {
			initialValue: []
		} );
		
		getFieldDecorator( 'timeRangeKeys', {
			initialValue: [],
		} );
		
		getFieldDecorator( 'exTimeRangeKeys', {
			initialValue: [],
		} );
		
		const keys = getFieldValue( 'keys' );
		const timeRangeKeys = getFieldValue( 'timeRangeKeys' );
		const exTimeRangeKeys = getFieldValue( 'exTimeRangeKeys' );
		
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
														onOpenChange={( e ) => {
															if ( e ) {
																const vals = form.getFieldValue( 'p' );
																const current = vals[ k ][ t ];
																if ( !current.beginTime ) {
																	current.beginTime = moment( `${moment().format( 'YYYY-MM-DD HH' )}:00` );
																	form.setFieldsValue( {
																		p: vals
																	} );
																}
																
															}
														}}
														needLabel={false}
														form={form}
													/>
												</Col>
												<Col sm={10}>
													<WrapperComplexFormItem
														config={{
															title: '终止时间',
															key: `p[${k}][${t}].endTime`,
															type: 'time',
														}}
														onOpenChange={( e ) => {
															if ( e ) {
																const vals = form.getFieldValue( 'p' );
																const current = vals[ k ][ t ];
																if ( !current.endTime ) {
																	current.endTime = moment( `${moment().format( 'YYYY-MM-DD HH' )}:00` );
																	form.setFieldsValue( {
																		p: vals
																	} );
																}
																
															}
														}}
														needLabel={false}
														form={form}
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
							<Form.Item label="加班时段">
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
														onOpenChange={( e ) => {
															if ( e ) {
																const vals = form.getFieldValue( 'e' );
																const current = vals[ k ][ t ];
																if ( !current.beginTime ) {
																	current.beginTime = moment( `${moment().format( 'YYYY-MM-DD HH' )}:00` );
																	form.setFieldsValue( {
																		e: vals
																	} );
																}
																
															}
														}}
														form={form}
													/>
												</Col>
												<Col sm={10}>
													<WrapperComplexFormItem
														config={{
															title: '终止时间',
															key: `e[${k}][${t}].endTime`,
															type: 'time',
														}}
														onOpenChange={( e ) => {
															if ( e ) {
																const vals = form.getFieldValue( 'e' );
																const current = vals[ k ][ t ];
																if ( !current.endTime ) {
																	current.endTime = moment( `${moment().format( 'YYYY-MM-DD HH' )}:00` );
																	form.setFieldsValue( {
																		e: vals
																	} );
																}
																
															}
														}}
														needLabel={false}
														form={form}
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
			const nextKeys = keys.concat( id++ );
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
			
			timeRangeKeys[ k ] = timeRangeKeys[ k ].filter( key => key !== t );
			form.setFieldsValue( {
				timeRangeKeys: [ ...timeRangeKeys ],
			} );
		};
		
		const removeExTimeRange = ( t, k ) => {
			const exTimeRangeKeys = getFieldValue( 'exTimeRangeKeys' );
			
			exTimeRangeKeys[ k ] = exTimeRangeKeys[ k ].filter( key => key !== t );
			form.setFieldsValue( {
				exTimeRangeKeys: [ ...exTimeRangeKeys ],
			} );
		};
		
		return (
			<Modal
				destroyOnClose
				afterClose={afterClose}
				title="新增时段"
				width={600}
				visible={visible}
				onOk={onOk}
				onCancel={onCancel}
				confirmLoading={loading}
				closable={true}
				maskClosable={false}
				keyboard={false}
				okText="提交"
				cancelText="取消"
			>
				<Form onSubmit={onOk} layout="vertical">
					<Row gutter={24}>
						<Col sm={24}>
							<WrapperComplexFormItem
								config={FIELDS.TEACHING.LESSON.TITLE}
								form={form}
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
