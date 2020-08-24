import React from 'react';
import { Form, Modal, Upload, message, Icon, Row, Col, Button, Select, } from 'antd';
import { getHeaders } from '@/utils/request';
import { useGetSet, useToggle, useUpdateEffect, useUpdate, } from 'react-use';
import moment from 'moment';

const { Dragger } = Upload;
const { Item } = Form;
const { Option } = Select;

const minYear = 2000;
const maxYear = Number( moment().format( 'YYYY' ) );
const prevMonth = moment().subtract( 1, 'month' ).format( 'MM' );

const UploadModal = props => {
	const { visible, setVisible, loading, afterClose, dispatch, } = props;
	
	const [ getYear, setYear ] = useGetSet( prevMonth === '12' ? (maxYear - 1) : maxYear );
	const [ getMonth, setMonth ] = useGetSet( prevMonth );
	const [ getFile, setFile ] = useGetSet( undefined );
	const [ confirmModalVisible, toggleConfirmModalVisible ] = useToggle( false );
	
	const update = useUpdate();
	
	useUpdateEffect( () => {
		if ( visible ) {
			setYear( prevMonth === '12' ? (maxYear - 1) : maxYear );
			setMonth( prevMonth );
		} else {
			setFile(null)
		}
	}, [ visible ] );
	
	const uploadProps = {
		name: 'file',
		headers: getHeaders(),
		data: {
			year: getYear(),
			month: getMonth(),
		},
		beforeUpload ( file ){
			setFile( file );
			return false
		},
		onChange ( json ){
			const { fileList } = json;
			const { status } = fileList[ 0 ];
			if ( status === 'error' ) {
				json.response = '上传错误，请重新上传！';
			}
			
			update();
		}
	};
	
	const submitLoading = loading.effects[ 'wageUpload/fetch' ] || false;
	
	const submit = ( force = 0 ) => {
		if ( !getFile() ) {
			message.error( '请上传工资表！' );
			return false;
		}
		dispatch( {
			type: 'wageUpload/fetch',
			payload: {
				year: getYear(),
				month: getMonth(),
				force: force,
				file: getFile(),
			}
		} ).then( data => {
			if ( data === 'duplicate' ) {
				toggleConfirmModalVisible( true );
			} else if ( data !== false ) {
				message.success( '导入成功！' );
				setFile(null)
				setVisible( false );
				toggleConfirmModalVisible( false );
			}
		} );
	};

	return (
		<Modal
			title="工资导入"
			visible={visible}
			afterClose={afterClose}
			destroyOnClose
			onCancel={() => setVisible( false )}
			onOk={() => submit()}
			closable={true}
			maskClosable={false}
			keyboard={false}
			confirmLoading={submitLoading}
		>
			<Row gutter={8}>
				<Col sm={12}>
					<Item label="归属年份" required>
						<Select style={{ width: '100%' }} onChange={e => setYear( e )}
						        value={getYear()}>
							{
								Array.from( { length: maxYear - minYear + 1 } ).map( ( y, index ) => (
									<Option
										key={index + minYear}
										value={index + minYear}>{index + minYear}</Option>
								) )
							}
						</Select>
					</Item>
				</Col>
				<Col sm={12}>
					<Item label="归属月份" required>
						<Select style={{ width: '100%' }} onChange={e => setMonth( e )}
						        value={getMonth()}>
							{
								Array.from( { length: 12 } ).map( ( y, index ) => {
									const month = index + 1 < 10 ? `0${index + 1}` : String( index + 1 );
									return <Option
										key={month}
										value={month}>{month}</Option>
								} )
							}
						</Select>
					</Item>
				</Col>
			</Row>
			<Dragger {...uploadProps} className="hideTip">
				<p className="ant-upload-drag-icon">
					<Icon type="inbox"/>
				</p>
				<p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
				<p className="ant-upload-hint">请使用模板《员工工资导入.xls》来上传。</p>
			</Dragger>
			<Modal
				title="提示"
				centered
				visible={confirmModalVisible}
				afterClose={() => {setVisible( false )}}
				destroyOnClose
				footer={[
					<Button key="close" onClick={() => toggleConfirmModalVisible( false )}>不覆盖</Button>,
					<Button key="confirm" loading={submitLoading} type="primary" onClick={() => submit( 1 )}>覆盖</Button>
				]}
				onCancel={() => toggleConfirmModalVisible( false )}
				closable={true}
				maskClosable={false}
				keyboard={false}
			>
				当前月份工资已存在，是否要覆盖这条记录？
			</Modal>
		</Modal>
	);
};

export default UploadModal;
