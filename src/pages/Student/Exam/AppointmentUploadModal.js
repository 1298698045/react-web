import React from 'react';
import { Form, Modal, Row, Col, Upload, Button, Icon, message } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
import { BASE_URL, MOCK_BASE_URL, } from '@/config/url';
import response from '@/services/response';
import { MESSAGE } from '@/config/tips';
import { getHeaders } from '@/utils/request';

const AppointmentUploadModal = props => {
	const { selectedRow, onSubmit, visible, setVisible, form, loading } = props;

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

	const uploadProps = {
		name: 'file',
		action: `${BASE_URL}/api/student/exam/import`,
		onChange( info ) {
			if ( info.file.status !== 'uploading' ) {
				// console.log( info.file, info.fileList );
			}
			if ( info.file.status === 'done' ) {
				const data = response( info.file.response )( MESSAGE.UPLOAD );
				if ( data !== false ) {
					setVisible( false );
					onSubmit();
				}
			} else if ( info.file.status === 'error' ) {
				message.error( `${info.file.name} 上传失败！` );
			}
		},
		headers: getHeaders(),
	};

	return (
		<Modal
			destroyOnClose
			title="导入约考信息表"
			width={350}
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
						<Upload {...uploadProps}>
							<Button>
								<Icon type="upload"/> 选择约考信息表
							</Button>
						</Upload>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( AppointmentUploadModal );
