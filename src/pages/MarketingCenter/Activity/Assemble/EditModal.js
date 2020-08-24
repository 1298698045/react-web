import React, { useState, useEffect } from 'react';
import { Form, Modal, Col, Row, Card, Upload, Button, message, Icon } from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import useGetInitialValue from '@/hooks/useGetInitialValue';
import { getHeaders } from '@/utils/request';
import { BASE_URL } from '@/config/url';
import { useToggle, useGetSet, } from 'react-use';
import moment from 'moment';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import { IMG_UPLOAD_URL } from '@/contsant'

const EditModal = props => {
	const { user, doCopy, handleSubmit, visible, setVisible, form, data, loading, afterClose, } = props;
	const { getFieldDecorator } = form
	const [ isType, setIsType ] = useToggle( false );
	const [ getImg, setImg ] = useGetSet( undefined );
	// 海报模板
	const [ getPosterImg, setPosterImg ] = useGetSet( undefined );
	const getValue = useGetInitialValue( data );
	let FORM = FIELDS.ACTIVITY.FORM
	let url = ''
	// 上传图片 start
	const beforeUpload = ( file ) => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
		if ( !isJpgOrPng ) {
			message.error( '只能上传JPG 、JPEG 、GIF、 PNG格式的图片' );
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if ( !isLt2M ) {
			message.error( '建议图片大小750*416px，超过2M限制，不允许上传!' );
		}
		return isJpgOrPng && isLt2M;
	}
	// 上传图片 start
	const beforePosterImgUpload = ( file ) => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
		if ( !isJpgOrPng ) {
			message.error( '只能上传JPG 、JPEG 、GIF、 PNG格式的图片' );
		}
		const isLt2M = file.size / 1024 / 1024 < 3;
		if ( !isLt2M ) {
			message.error( '建议图片大小750*1334px，超过3M限制，不允许上传!' );
		}
		return isJpgOrPng && isLt2M;
	}
	const uploadButton = (
		<div>
			<Icon type='plus'/>
			<div className="ant-upload-text"></div>
		</div>
	);
	const uploadPictureUrlChange = ( info ) => {
		vImg(info, 'img')
	}
	const uploadPosterUrlChange = ( info ) => {
		vImg(info, 'poster')
	}
	const  vImg = ( info, type ) => {
		if ( info.file.status !== 'uploading' ) {
			console.log( info.file, info.fileList );
		}
		if ( info.file.status === 'done' ) {
			// message.success( `${info.file.name} file uploaded successfully` );
			message.success( `${info.file.name} 上传成功！` );
			if (type === 'img') {
				setImg( info.file.response.data );
			} else {
				setPosterImg( info.file.response.data );
			}
			
		} else if ( info.file.status === 'error' ) {
			message.error( `${info.file.name} 上传失败.` );
		}
	}
	// 上传图片 end
	// 富文本 start
	const controls = [ 'bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator' ]
	const [ editorState, setEditorState ] = useState( BraftEditor.createEditorState( null ) );

	useEffect( () => {
		if (visible) {
			setEditorState( BraftEditor.createEditorState( data.profile ) );
			setImg(typeof data.pictureUrl !== 'undefined' ? `${data.pictureUrl}` : '' );
			setPosterImg(typeof data.posterUrl !== 'undefined' ? `${data.posterUrl}` : '' );
		}
	}, [ visible ] );

	const uploadPictureChange = ( info ) => {
		if ( info.file.status !== 'uploading' ) {
			console.log( info.file, info.fileList );
		}
		if ( info.file.status === 'done' ) {
			message.success( `${info.file.name} 上传成功！` );
			setEditorState( ContentUtils.insertMedias( editorState, [ {
				type: 'IMAGE',
				url: `${IMG_UPLOAD_URL}${info.file.response.data}`,
			} ] ) );
			console.log( editorState.toHTML() )
		} else if ( info.file.status === 'error' ) {
			message.error( `${info.file.name} 上传失败.` );
		}
	}
	const extendControls = [
		{
			key: 'antd-uploader',
			type: 'component',
			component: (
				<Upload
					name="file"
					accept="image/*"
					showUploadList={false}
					headers={getHeaders()}
					action={`${BASE_URL}/api/oss/upload`}
					beforeUpload={beforeUpload}
					onChange={uploadPictureChange}
				>
					<button type="button" className="control-item button upload-button" data-title="插入图片">
						<Icon type="picture" theme="filled"/>
					</button>
				</Upload>
			)
		}
	]
	const getEditorHtml = ( html ) => {
		console.log( html )
		setEditorState( html )
	}
	// 富文本 end
	const submit = e => {
		e.preventDefault();
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			if ( typeof getImg() === 'undefined' || getImg() === '' ) {
				message.error( '请上传活动图片！' );
				return false;
			}
			const submitData = {
				[ FIELDS.ACTIVITY.FORM.NAME.key ]: fieldsValue[ FIELDS.ACTIVITY.FORM.NAME.key ],
				[ FIELDS.ACTIVITY.FORM.PRICE.key ]: fieldsValue[ FIELDS.ACTIVITY.FORM.PRICE.key ],
				[ FIELDS.ACTIVITY.FORM.VALID_QUANTITY.key ]: fieldsValue[ FIELDS.ACTIVITY.FORM.VALID_QUANTITY.key ],
				[ FIELDS.ACTIVITY.FORM.VALID_TIME.key ]: fieldsValue[ FIELDS.ACTIVITY.FORM.VALID_TIME.key ],

				[ FIELDS.ACTIVITY.FORM.TYPE.key ]: fieldsValue[ FIELDS.ACTIVITY.FORM.TYPE.key ] || data.type,
				[ FIELDS.ACTIVITY.FORM.DIS_MONEY.key ]: fieldsValue[ FIELDS.ACTIVITY.FORM.DIS_MONEY.key ],
				[ FIELDS.ACTIVITY.FORM.DIS_RESTRICTIONS.key ]: fieldsValue[ FIELDS.ACTIVITY.FORM.DIS_RESTRICTIONS.key ],
				[ FIELDS.ACTIVITY.FORM.PEOPLE_RESTRICTIONS.key ]: fieldsValue[ FIELDS.ACTIVITY.FORM.PEOPLE_RESTRICTIONS.key ],

				[ FIELDS.ACTIVITY.FORM.SORT.key ]: fieldsValue[ FIELDS.ACTIVITY.FORM.SORT.key ],
				[ FIELDS.ACTIVITY.FORM.PROFILE.key ]: editorState.toHTML(),

				[ FIELDS.ACTIVITY.FORM.BEGIN_DATE.key ]: moment( fieldsValue[ FIELDS.ACTIVITY.FORM.BEGIN_DATE.key ] ).format( 'YYYY-MM-DD HH:mm:ss' ),
				[ FIELDS.ACTIVITY.FORM.END_DATE.key ]: moment( fieldsValue[ FIELDS.ACTIVITY.FORM.END_DATE.key ] ).format( 'YYYY-MM-DD HH:mm:ss' ),
				pictureUrl: getImg(),
				posterUrl: getPosterImg(),
				createEmployeeId: user.currentUser.userId,
				createEmployeeName: user.currentUser.realname,
				schoolId: user.currentUserSchool.id,
				schoolName: fieldsValue[ FIELDS.ACTIVITY.FORM.SCHOOL_NAME.key ]
			};
			if ( !doCopy ) {
				submitData.id = data.id
			}
			handleSubmit( submitData );
		} );
	};
	const setCurrVisible = () => {
		setImg( undefined )
		setPosterImg( undefined )
		setVisible( false )
	}
	// 字段值联动
	const onChange = ( key, value ) => {
		switch ( key ) {
			case FIELDS.ACTIVITY.FORM.TYPE.key: {
				if ( value === 'REDUCTION' ) {
					setIsType( true );
				} else {
					setIsType( false );
				}
				break;
			}
		}
	};
	// 金钱校验
	const numPointValidator = (rule, value, callback) => {
		if (!value) {callback();}
		let patten = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g;
		if(!patten.test(value)){
			callback('请输入数字')
		}
		// 必须总是返回一个 callback，否则 validateFields 无法响应
		callback();
	}
	const numValidator = (rule, value, callback) => {
		if (!value) {callback();}
		let patten = /^[0-9]+$/;
		if(!patten.test(value)){
			callback('请输入整数的数字')
		}
		// 必须总是返回一个 callback，否则 validateFields 无法响应
		callback();
	}
	return (
		<Modal
			width="80%"
			title={data.id ? '编辑活动' : '新增活动'}
			visible={visible}
			afterClose={afterClose}
			onOk={submit}
			destroyOnClose
			confirmLoading={loading}
			closable={true}
			maskClosable={false}
			keyboard={false}
			onCancel={() => setCurrVisible( false )}
		>
			<Form onSubmit={submit}>
				<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
					<Col md={16} sm={24}>
						<Card title="基本信息" style={{ height: '800px', overflow: 'hidden' }}>
							<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
								<Col md={24} sm={24}>
									<Col md={12} sm={24}>
										<WrapperComplexFormItem
											config={FORM.NAME}
											initialValue={getValue( FORM.NAME )}
											rules={[ { required: true, } ]}
											{...props}
										/>
									</Col>
									<Col md={12} sm={24}>
										<WrapperComplexFormItem
											config={FORM.PRICE}
											min={0}
											// formatter={value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' )}
											// parser={value => value.replace( /\$\s?|(,*)/g, '' )}
											initialValue={getValue( FORM.PRICE )}
											rules={[ { required: true }, { validator: numPointValidator } ]}
											{...props}
											addonAfter="元"
										/>
									</Col>
								</Col>
								<Col md={24} sm={24}>
									<Col md={12} sm={24}>
										<WrapperComplexFormItem
											config={FORM.VALID_QUANTITY}
											min={0}
											initialValue={getValue( FORM.VALID_QUANTITY )}
											rules={[ { required: true }, { validator: numValidator } ]}
											{...props}
											addonAfter="份"
										/>
									</Col>
									<Col md={12} sm={24}>
										<div style={{ marginTop: '50px', color: 'red', fontSize: '12px', }}>
											注：活动份数是指允许最多开团数
										</div>
									</Col>
								</Col>
								<Col md={24} sm={24}>
									<Col md={12} sm={24}>
										<WrapperComplexFormItem
											config={FORM.VALID_TIME}
											min={0}
											initialValue={getValue( FORM.VALID_TIME )}
											rules={[ { required: true }, { validator: numValidator } ]}
											{...props}
											addonAfter="小时"
										/>
									</Col>
									<Col md={12} sm={24}>
										<div style={{ marginTop: '50px', color: 'red', fontSize: '12px', }}>
											注：活动时效是指开团后所允许的最长完成时间
										</div>
									</Col>
								</Col>
								<Col md={24} sm={24}>
									<Col md={12} sm={24}>
										<WrapperComplexFormItem
											config={FORM.BEGIN_DATE}
											initialValue={getValue( FORM.BEGIN_DATE )}
											rules={[ { required: true } ]}
											{...props}
										/>
									</Col>
									<Col md={12} sm={24}>
										<WrapperComplexFormItem
											config={FORM.END_DATE}
											initialValue={getValue( FORM.END_DATE )}
											rules={[ { required: true } ]}
											{...props}
										/>
									</Col>
									<Col md={12} sm={12}>
										<WrapperComplexFormItem
											config={FORM.SCHOOL_NAME}
											initialValue={getValue( FORM.SCHOOL_NAME ) || user.currentUserSchool.title}
											rules={[ { required: true } ]}
											{...props}
										/>
									</Col>
									
								</Col>
								<Col md={24} sm={24}>
									<Col md={12} sm={12}>
										<Form.Item label="活动图片" required>
											{/* <Upload {...uploadProps}>
												<Button icon="upload">点击上传</Button>
											</Upload> */}
											<Upload
												name="file"
												listType="picture-card"
												className="avatar-uploader"
												showUploadList={false}
												headers={getHeaders()}
												action={`${BASE_URL}/api/oss/upload`}
												beforeUpload={beforeUpload}
												onChange={uploadPictureUrlChange}
												style={{height: '95px', display:'block',overflow: 'hidden', lineHeight: '95px'}}
											>
												{getImg() && typeof getImg() !== 'undefined' ?
													<img src={`${IMG_UPLOAD_URL}${getImg()}`}
														alt="活动图片" style={{ width: '100%' }}/> : uploadButton}
											</Upload>
											<div style={{
												fontSize: '12px',
												lineHeight: '20px'
											}}>
												图片大小：750*416px   200kb以内<br/>
												图片格式：PNG/JPG/JPEG
											</div>
										</Form.Item>
									</Col>
									<Col md={12} sm={12}>
										<Form.Item label="海报模板">
											{/* <Upload {...uploadProps}>
												<Button icon="upload">点击上传</Button>
											</Upload> */}
											<Upload
												name="file"
												listType="picture-card"
												className="avatar-uploader"
												showUploadList={false}
												headers={getHeaders()}
												action={`${BASE_URL}/api/oss/upload`}
												beforeUpload={beforePosterImgUpload}
												onChange={uploadPosterUrlChange}
												style={{height: '95px', display:'block',overflow: 'hidden', lineHeight: '95px'}}
											>
												{getPosterImg() && typeof getPosterImg() !== 'undefined' ?
													<img src={`${IMG_UPLOAD_URL}${getPosterImg()}`}
														alt="海报模板" style={{ width: '100%' }}/> : uploadButton}
											</Upload>
											<div style={{
												fontSize: '12px',
												lineHeight: '20px'
											}}>
												图片大小：750*1334px   300kb以内<br/>
												图片格式：PNG/JPG/JPEG
											</div>
										</Form.Item>
									</Col>
								</Col>
							</Row>
						</Card>
					</Col>
					<Col md={8} sm={24}>
						<Card title="规则信息" style={{ height: '800px', overflow: 'hidden' }}>
							<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
								<Col md={24} sm={24}>
									<WrapperComplexFormItem style={typeof data.id !== 'undefined' ? {
										display: 'flex',
										alignItems: 'center'
									} : {}}
										config={FORM.TYPE}
										initialValue={getValue( FORM.TYPE ) || 'COMMON'}
										rules={[ { required: true } ]}
										values={FORM.TYPE.values}
										{...props}
										allowClear={false}
										onChange={onChange}
										status={typeof data.id === 'undefined' ? 'edit' : 'read'}
									/>
								</Col>
								{isType || data.type === 'REDUCTION' ?
									[ <Col md={24} sm={24} key="c01">
										<WrapperComplexFormItem
											config={FORM.DIS_MONEY}
											addonBefore='每增加一人减'
											initialValue={getValue( FORM.DIS_MONEY )}
											rules={[ 
												{ required: true, message: '请输入团价规则' }, 
												{validator: numPointValidator}
											]}
											{...props}
											addonAfter="元"
										/>
									</Col>,
										<Col md={24} sm={24} key="c02">
											<WrapperComplexFormItem
												config={FORM.DIS_RESTRICTIONS}
												addonBefore='减价优惠上限'
												initialValue={getValue( FORM.DIS_RESTRICTIONS )}
												rules={[ 
													{ required: true, message: '请输入团价规则' }, 
													{ validator: numPointValidator }
												]}
												{...props}
												addonAfter="元"
											/>
										</Col>,
										<Col md={24} sm={24} key="c03">
											<WrapperComplexFormItem
												config={FORM.PEOPLE_RESTRICTIONS}
												initialValue={getValue( FORM.PEOPLE_RESTRICTIONS )}
												rules={[ { required: true }, { validator: numValidator }]}
												{...props}
												addonBefore="参团人数上限"
												addonAfter="人"
											/>
										</Col> ] : [
										<Col md={24} sm={24} key="c11">
											<WrapperComplexFormItem
												config={
													{
														...FORM.DIS_RESTRICTIONS,
														title: '团购价格'
													}
												}
												initialValue={getValue( FORM.DIS_RESTRICTIONS )}
												rules={[ 
													{ required: true, message: '请输入团购价格' },
													{ validator: numPointValidator }
												]}
												{...props}
												addonAfter="元"
											/>
										</Col>,
										<Col md={24} sm={24} key="c12">
											<WrapperComplexFormItem
												config={FORM.PEOPLE_RESTRICTIONS}
												initialValue={getValue( FORM.PEOPLE_RESTRICTIONS )}
												rules={[ { required: true }, { validator: numValidator } ]}
												{...props}
												addonBefore="成团人数"
												addonAfter="人"
											/>
										</Col>
									]
								}
								<Col md={24} sm={24}>
									<WrapperComplexFormItem
										config={FORM.SORT}
										rules={[ { validator: numValidator }]}
										initialValue={getValue( FORM.SORT ) || 0}
										{...props}
									/>
								</Col>
								{isType ?
									<Col md={24} sm={24}>
										<div style={{
											marginTop: '-20px',
											color: 'red',
											fontSize: '12px',
											lineHeight: '30px'
										}}>

											注：<br/>1、请注意上面三项的计算合理性； <br/>
											2、减价优惠上限填写“0”为无限制，但不超过原价； <br/>
											3、参团人数上限填写“0”为无限制。
										</div>
									</Col> : ''
								}
							</Row>
						</Card>
					</Col>
					<Col md={24} sm={24}>
						<Card title="活动说明" style={{ marginTop: '20px' }}>
							{
								// getFieldDecorator('editorState', {
								// 	initialValue:BraftEditor.createEditorState(data.profile)
								// })(
								<BraftEditor
									controls={controls}
									value={editorState}
									extendControls={extendControls}
									onChange={getEditorHtml}
									placeholder="请输入正文内容"
								/>
							}

						</Card>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( EditModal );
