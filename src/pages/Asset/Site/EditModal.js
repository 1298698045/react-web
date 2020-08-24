import React, { useEffect } from 'react';
import { Map } from 'react-amap';
import moment from 'moment';
import { Form, Modal, message, Row, Col, Upload, Button, Icon } from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import { getHeaders } from '@/utils/request';
import AssetMap from './AssetMap';

import useGetInitialValue from '@/hooks/useGetInitialValue';
import { BASE_URL } from '@/config/url';
import { useGetSet, } from 'react-use';
import { IMG_UPLOAD_URL } from '@/contsant'

const fields = [
	FIELDS.ASSET.TITLE,
	FIELDS.ASSET.DEPART_ID,
	{
		...FIELDS.ASSET.AREA,
		title: `${FIELDS.ASSET.AREA.title}（平米）`,
		type: 'inputNumber',
		max: 9999999,
		min: 0,
	},
	FIELDS.ASSET.PURCHASE_TYPE,
	FIELDS.ASSET.FIRST_PARTY,
	FIELDS.ASSET.PAY_MODE,
	{
		...FIELDS.ASSET.PURCHASE_AMOUNT,
		type: 'inputNumber',
		formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
		parser: value => value.replace( /\$\s?|(,*)/g, '' ),
		min: 0,
	},
	FIELDS.ASSET.BEGIN_DATE,
	FIELDS.ASSET.END_DATE,
	FIELDS.ASSET.IS_EXAM,
	{
		...FIELDS.ASSET.STATUS,
		// initialValue: '1',
	},
	{
		...FIELDS.ASSET.LICENSE_TYPE,
		mode: 'multiple',
		maxTagCount: 3,
	},
	FIELDS.ASSET.LOCATION,
	FIELDS.ASSET.ADDRESS,
	// FIELDS.ASSET.LAT,
	// FIELDS.ASSET.LNG,
];

const EditModal = props => {
	const { handleSubmit, visible, setVisible, form, data, loading, afterClose, } = props;

	useEffect( () => {
		setImg( typeof data.url !== 'undefined' ? `${data.url}` : '' );
		// if ( data.url ) setImg( data.url );
	}, [ visible ] );

	const newData = {
		...data,
		[ FIELDS.ASSET.STATUS.key ]: typeof  data[ FIELDS.ASSET.STATUS.key ] !== 'undefined' ? data[ FIELDS.ASSET.STATUS.key ] + '' : '1',
		[ FIELDS.ASSET.LOCATION.key ]: data[ FIELDS.ASSET.PROVINCE.key ] ? [ data[ FIELDS.ASSET.PROVINCE.key ], data[ FIELDS.ASSET.CITY.key ], data[ FIELDS.ASSET.DISTRICT.key ] ] : [],
		[ FIELDS.ASSET.LICENSE_TYPE.key ]: data[ FIELDS.ASSET.LICENSE_TYPE.key ] ? data[ FIELDS.ASSET.LICENSE_TYPE.key ].split( ',' ) : [],
		[ FIELDS.ASSET.IS_EXAM.key ]: data[ FIELDS.ASSET.IS_EXAM.key ] ? String( data[ FIELDS.ASSET.IS_EXAM.key ] ) : '0',
	};
	const getValue = useGetInitialValue( newData );

	const [ getImg, setImg ] = useGetSet( '' );

	const uploadProps = {
		name: 'file',
		listType: 'picture',
		action: `${BASE_URL}/api/oss/upload`,
		headers: getHeaders(),
		onChange( info ) {
			if ( info.file.status !== 'uploading' ) {
				// console.log( info.file, info.fileList );
			}
			if ( info.file.status === 'done' ) {
				// message.success( `${info.file.name} file uploaded successfully` );
				message.success( `${info.file.name} 上传成功！` );
				setImg( info.file.response.data );
			} else if ( info.file.status === 'error' ) {
				message.error( `${info.file.name} file upload failed.` );
			}
		},
	};
	// 上传图片 start
	const beforeUpload = ( file ) => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
		if ( !isJpgOrPng ) {
			message.error( '只能上传JPG 、JPEG 、GIF、 PNG格式的图片' );
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if ( !isLt2M ) {
			message.error( '超过2M限制，不允许上传' );
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
		if ( info.file.status !== 'uploading' ) {
			console.log( info.file, info.fileList );
		}
		if ( info.file.status === 'done' ) {
			// message.success( `${info.file.name} file uploaded successfully` );
			message.success( `${info.file.name} 上传成功！` );
			setImg( info.file.response.data );
		} else if ( info.file.status === 'error' ) {
			message.error( `${info.file.name} 上传失败.` );
		}
	}
	// 上传图片 end
	const submit = e => {
		e.preventDefault();

		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}

			// if ( getImg() === '' ) {
			// 	message.error( '请上传场地图片！' );
			// 	return false;
			// }

			const locationArr = fieldsValue[ FIELDS.ASSET.LOCATION.key ];

			const submitData = {
				[ FIELDS.ASSET.MEMO.key ]: fieldsValue[ FIELDS.ASSET.MEMO.key ],
				[ FIELDS.ASSET.TITLE.key ]: fieldsValue[ FIELDS.ASSET.TITLE.key ],
				[ FIELDS.ASSET.DEPART_ID.key ]: fieldsValue[ FIELDS.ASSET.DEPART_ID.key ],
				[ FIELDS.ASSET.AREA.key ]: fieldsValue[ FIELDS.ASSET.AREA.key ],
				[ FIELDS.ASSET.PURCHASE_TYPE.key ]: fieldsValue[ FIELDS.ASSET.PURCHASE_TYPE.key ],
				[ FIELDS.ASSET.PURCHASE_AMOUNT.key ]: fieldsValue[ FIELDS.ASSET.PURCHASE_AMOUNT.key ],
				[ FIELDS.ASSET.PAY_MODE.key ]: fieldsValue[ FIELDS.ASSET.PAY_MODE.key ],
				[ FIELDS.ASSET.FIRST_PARTY.key ]: fieldsValue[ FIELDS.ASSET.FIRST_PARTY.key ],
				[ FIELDS.ASSET.IS_EXAM.key ]: fieldsValue[ FIELDS.ASSET.IS_EXAM.key ],
				[ FIELDS.ASSET.LICENSE_TYPE.key ]: fieldsValue[ FIELDS.ASSET.LICENSE_TYPE.key ].join( ',' ),
				[ FIELDS.ASSET.ADDRESS.key ]: fieldsValue[ FIELDS.ASSET.ADDRESS.key ],
				[ FIELDS.ASSET.LNG.key ]: fieldsValue[ FIELDS.ASSET.LNG.key ],
				[ FIELDS.ASSET.LAT.key ]: fieldsValue[ FIELDS.ASSET.LAT.key ],
				[ FIELDS.ASSET.PROVINCE.key ]: locationArr[ 0 ],
				[ FIELDS.ASSET.CITY.key ]: locationArr[ 1 ],
				[ FIELDS.ASSET.DISTRICT.key ]: locationArr[ 2 ],
				[ FIELDS.ASSET.STATUS.key ]: fieldsValue[ FIELDS.ASSET.STATUS.key ],
				[ FIELDS.ASSET.BEGIN_DATE.key ]: moment( fieldsValue[ FIELDS.ASSET.BEGIN_DATE.key ] ).format( 'YYYY-MM-DD' ),
				[ FIELDS.ASSET.END_DATE.key ]: moment( fieldsValue[ FIELDS.ASSET.END_DATE.key ] ).format( 'YYYY-MM-DD' ),
				url: getImg(),
				id: data.id,
			};

			handleSubmit( submitData );
		} );
	};

	return (
		<Modal
			title={data.id ? '编辑场地' : '新增场地'}
			width="90%"
			visible={visible}
			afterClose={afterClose}
			onOk={submit}
			destroyOnClose
			confirmLoading={loading}
			closable={true}
			maskClosable={false}
			keyboard={false}
			onCancel={() => setVisible( false )}
		>
			<Form onSubmit={submit}>
				<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
					{
						fields.map( f => {
							return (
								<Col key={f.key} md={f.col || 6} sm={24}>
									<WrapperComplexFormItem
										config={f}
										mode={f.mode || null}
										maxTagCount={f.maxTagCount || 0}
										max={f.max}
										min={f.min}
										rules={[ { required: true, } ]}
										initialValue={getValue( f ) || f.initialValue}
										{...props}
									/>
								</Col>
							)
						} )
					}
					<Col sm={24}>
						<AssetMap form={form} data={data}/>
					</Col>
					<Col sm={24}>
						<Form.Item label="场地图片">
							<Upload
								name="file"
								listType="picture-card"
								className="avatar-uploader"
								showUploadList={false}
								headers={getHeaders()}
								action={`${BASE_URL}/api/oss/upload`}
								beforeUpload={beforeUpload}
								onChange={uploadPictureUrlChange}
							>
								{getImg() && typeof getImg() !== 'undefined' ?
									<img src={`${IMG_UPLOAD_URL}${getImg()}`}
									     alt="场地图片" style={{ width: '100%' }}/> : uploadButton}
							</Upload>
							{/* {getImg() && <img style={{ width: 200, display: 'block', marginBottom: 10, }}
							                  src={`http://oss-dev.aplusx.com/${getImg()}`} alt="场地图片"/>}
							
							<Upload {...uploadProps}>
								<Button icon="upload">点击上传</Button>
							</Upload> */}
						</Form.Item>
					</Col>
					<Col sm={24}>
						<WrapperComplexFormItem
							config={FIELDS.ASSET.MEMO}
							initialValue={getValue( FIELDS.ASSET.MEMO )}
							form={form}
						/>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( EditModal );
