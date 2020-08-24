import React from 'react';
import { Form, Modal, Upload, message, Icon, Button, } from 'antd';
import response from '@/services/response';
import { BASE_URL } from '@/config/url';
import { getHeaders } from '@/utils/request';

const { Dragger } = Upload;

const UploadModal = props => {
	const { visible, setVisible, loading, afterClose, } = props;
	
	const uploadProps = {
		name: 'file',
		// multiple: true,
		// directory: true,
		headers: getHeaders(),
		action: `${BASE_URL}/api/assetmanage/import-cars`,
		onChange ( info ){
			const { status } = info.file;
			if ( status !== 'uploading' ) {
				console.log( info.file, info.fileList );
			}
			if ( status === 'done' ) {
				const data = response( info.file.response )( '', '' );
				
				if ( data.list && data.list.length > 0 ) message.success( `${Object.entries( data.list[ data.list.length - 1 ] )[ 0 ][ 0 ]}：${Object.entries( data.list[ data.list.length - 1 ] )[ 0 ][ 1 ]}` );
				if ( data !== false ) setVisible( false );
			} else if ( status === 'error' ) {
				message.error( `${info.file.name} 上传失败！.` );
			}
		},
	};
	
	return (
		<Modal
			title="车辆批量导入"
			visible={visible}
			afterClose={afterClose}
			closable={true}
			maskClosable={false}
			keyboard={false}
			destroyOnClose
			okButtonProps={{ loading: loading, }}
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
			<Dragger {...uploadProps}>
				<p className="ant-upload-drag-icon">
					<Icon type="inbox"/>
				</p>
				<p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
				<p className="ant-upload-hint">请使用模板《车辆采购.xlsx》来上传。</p>
			</Dragger>
		</Modal>
	);
};

export default Form.create()( UploadModal );
