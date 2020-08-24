import React, { useState, useEffect } from 'react';
import { Form, Modal, Row, Col, Upload, Button, Icon, message, Progress } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
import { BASE_URL, MOCK_BASE_URL, } from '@/config/url';
import response from '@/services/response';
import { MESSAGE } from '@/config/tips';
import { getHeaders } from '@/utils/request';

const ScoreUploadModal = props => {
	const { selectedRow, onSubmit, visible, setVisible, form, loading, dispatch } = props;

	// const [progressVisible, setProgressVisible] = useState( false );
	const [progressPercent, setProgressPercent] = useState( 0 );
	const [progressInfo, setProgressInfo] = useState( {
		// success_count: 0,
		// exception_count: 0,
		// processed_count: 0,
		// total: 0,
	} );

	useEffect( () => {
		if ( !visible ) {
			setProgressPercent(0)
			setProgressInfo({})
		}
	}, [ visible ] );

	const onOk = e => {
		e.preventDefault();

		// eslint-disable-next-line consistent-return
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			} 
			onSubmit( fieldsValue );
		} );
	};
	const onCancel = e => {
		e.preventDefault();

		setVisible( false );
	};

	// const uploadProps = {
	// 	name: 'file',
	// 	action: `${BASE_URL}/api/student/grade/import`,
	// 	onChange( info ) {
	// 		if ( info.file.status !== 'uploading' ) {
	// 			// console.log( info.file, info.fileList );
	// 		}
	// 		if ( info.file.status === 'done' ) {
	// 			const data = response( info.file.response )( MESSAGE.UPLOAD );
	// 			if ( data !== false ) {
	// 				onSubmit();
	// 				setVisible( false );
	// 			}
	// 		} else if ( info.file.status === 'error' ) {
	// 			message.error( `${info.file.name} 上传失败！` );
	// 		}
	// 	},
	// 	headers: getHeaders(),
	// };
	const onUploadChange = ( info ) => {
		console.log( info );
		if ( info.file.status !== 'uploading' ) {
			console.log( info.file, info.fileList );
		}
		if ( info.file.status === 'done' ) {
			// message.success( `${info.file.name} 上传成功！` );
			const batchNo = response( info.file.response )();
			if ( batchNo !== false ) {
				// setProgressVisible( true );
				updateResult( batchNo );
			} else {
				message.error( '学员信息导入失败！' );
			}
		} else if ( info.file.status === 'error' ) {
			message.error( `${info.file.name} 上传失败！` );
		}
	};

	const updateResult = ( batchNo ) => {
		dispatch( {
			type: 'examScore_1/queryResult',
			params: {
				batchNo,
			},
		} ).then( data => {
			if ( data ) {
				console.log( data )
				setProgressInfo( data );
				setProgressPercent( Math.floor( data.processed_count / data.total * 100 ) );
				if ( data.exception_count || data.exception_count == 0 ) {
					if ( data.exception_count != 0 ) {
						// message.error( '有' + data.exception_count + '个考试信息为异常数据，请查看异常数据并修改！' );
					} else {
						message.success( '恭喜，考试信息全部上传成功！' );
						// setVisible( false );
					}
				} else {
					setTimeout( () => updateResult( batchNo ), 1000 );
				}
			} else {
				setTimeout( () => updateResult( batchNo ), 1000 );
			}
		} );
	};

	return (
		<Modal
			destroyOnClose
			title="导入考试成绩表"
			visible={visible}
			onOk={onOk}
			onCancel={onCancel}
			closable={true}
			maskClosable={false}
			keyboard={false}
			footer={null}
			confirmLoading={loading}
			okText="提交"
			cancelText="取消"
		>
			<Form onSubmit={onOk}>
				<Row gutter={24}>
					<Col>
						<Upload
							name="file"
							showUploadList={false}
							headers={getHeaders()}
							action={`${BASE_URL}/api/student/grade/import`}
							onChange={onUploadChange}
						>
							<Button>
								<Icon type="upload"/> 选择考试成绩表
							</Button>
						</Upload>
					</Col>
				</Row>
			</Form>
			<Progress
				strokeColor={{
					from: '#108ee9',
					to: '#87d068',
				}}
				percent={progressPercent}
				showInfo={true}
				status="active"
			/>
			{progressInfo.total && <div>共{progressInfo.total}个考试信息，已处理{progressInfo.processed_count}个</div>}
			{progressInfo.exception_count && progressInfo.exception_count != 0 ?
				<div>有{progressInfo.exception_count}个考试信息为异常数据，请查看异常数据并修改！</div>
				:
				""
			}
		</Modal>
	);
};

export default Form.create()( ScoreUploadModal );
