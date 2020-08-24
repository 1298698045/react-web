import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from "dva";
import { Form, Card, Input, Button, Modal, Progress, Row, Col, Icon, Upload, Popconfirm, message } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
import { getHeaders } from "@/utils/request";
import { BASE_URL } from "@/config/url";
import styles from './InitStudent.less';
import response from '@/services/response';
import Privilege from '@/components/Privilege';

const tableName = 'initStudent';

const InitStudent = props => {
	const { dispatch, form, dictionary } = props;
	const [progressVisible, setProgressVisible] = useState( false );
	const [progressPercent, setProgressPercent] = useState( 0 );
	const [progressInfo, setProgressInfo] = useState( {
		success_count: 0,
		failure_count: 0,
		processed_count: 0,
		total: 0,
	} );
	const [download1, setDownload1] = useState( { failure_count: 0 } );
	const [download3, setDownload3] = useState( { failure_count: 0 } );
	const [download4, setDownload4] = useState( { failure_count: 0 } );
	const setDownloads = { 1: setDownload1, 3: setDownload3, 4: setDownload4 };

	const types = [
		{
			priv: 'import_local_student',
			privErrDown: 'error_local',
			dKey: "1",
			dValue: "本校学员",
		},
		{
			priv: 'import_proxy_student',
			privErrDown: 'error_proxy',
			dKey: "3",
			dValue: "代培学员",
		},
		{
			priv: 'import_anchored_student',
			privErrDown: 'error_anchored',
			dKey: "4",
			dValue: "挂靠学员",
		},
	];

	const onUploadChange = ( key, info ) => {
		console.log( info );
		if ( info.file.status !== 'uploading' ) {
			console.log( info.file, info.fileList );
		}
		if ( info.file.status === 'done' ) {
			// message.success( `${info.file.name} 上传成功！` );
			const batchNo = response( info.file.response )();
			if ( batchNo !== false ) {
				setProgressVisible( true );
				updateResult( key, batchNo );
			} else {
				message.error( '学员信息导入失败！' );
			}
		} else if ( info.file.status === 'error' ) {
			message.error( `${info.file.name} 上传失败！` );
		}
	};

	const updateResult = ( key, batchNo ) => {
		dispatch( {
			type: 'initStudent/queryResult',
			params: {
				batchNo,
			},
		} ).then( data => {
			if ( data ) {
				console.log( data )
				setProgressInfo( data );
				setProgressPercent( Math.floor( data.processed_count / data.total * 100 ) );
				if ( data.success_count || data.failure_count ) {
					if ( data.failure_count != 0 ) {
						// message.error( '有' + data.failure_count + '个学员信息解析失败，请重新下载错误数据，修改后再次上传！' );
						setDownloads[ key ]( data );
					} else {
						message.success( '恭喜，学员信息全部上传成功！' );
						setProgressVisible( false );
					}
				} else {
					setTimeout( () => updateResult( key, batchNo ), 1000 );
				}
			} else {
				setTimeout( () => updateResult( key, batchNo ), 1000 );
			}
		} );
	};

	return (
		<Fragment>
			<GridContent>
				<Card style={{ marginBottom: 24 }}>
					{types.map( v =>
						<Privilege privs={[v.priv]} key={v.priv}>
							<Upload
								key={v.dKey}
								name="file"
								showUploadList={false}
								headers={getHeaders()}
								action={`${BASE_URL}/api/student/init/import?studentType=` + v.dKey}
								// beforeUpload={beforeUpload}
								// data={file => ( { file } )}
								onChange={( info ) => onUploadChange( v.dKey, info )}
							>
								<Button type="primary" style={{ marginRight: 10 }}>导入-{v.dValue}</Button>
							</Upload>
						</Privilege>
					)}
				</Card>

				<Row gutter={24}>
					{types.map( v =>
						<Privilege privs={[v.privErrDown]} key={v.privErrDown}>
							<Col xs={8} key={v.dKey}>
								<Card
									className={styles.downloadCard}
									title={`错误数据-${v.dValue}`}
									extra={`共${{ 1: download1, 3: download3, 4: download4 }[ v.dKey ].failure_count}条`}
									actions={[
										<a
											disabled={!{ 1: download1, 3: download3, 4: download4 }[ v.dKey ].path}
											href={{ 1: download1, 3: download3, 4: download4 }[ v.dKey ].path}
										>
											<Icon type="download"/> 下载
										</a>,
									]}
									bodyStyle={{ padding: 0 }}
								>
								</Card>
							</Col>
						</Privilege>
					)}
				</Row>
			</GridContent>

			<Modal
				title={`学员导入中（完成后会自动关闭）`}
				visible={progressVisible}
				onCancel={() => setProgressVisible( false )}
				closable={true}
				maskClosable={false}
				keyboard={false}
				footer={null}
			>
				<Progress
					strokeColor={{
						from: '#108ee9',
						to: '#87d068',
					}}
					percent={progressPercent}
					showInfo={true}
					status="active"
				/>
				{progressInfo.success_count || progressInfo.success_count == 0 ?
					<div>共{progressInfo.total}个学员，成功{progressInfo.success_count}个，失败{progressInfo.failure_count}个</div>
					:
					<div>共{progressInfo.total}个学员，已处理{progressInfo.processed_count}个</div>
				}
				{progressInfo.failure_count && progressInfo.failure_count != 0 &&
				<div>有{progressInfo.failure_count}个学员信息解析失败，请重新
					<a href={progressInfo.path} target="_blank">下载错误数据</a>，修改后再次上传！</div>
				}
			</Modal>
		</Fragment>
	);
};

export default connect( (
	{
		[ tableName ]: data,
		dictionary,
		loading,
		global
	}
) => (
	{
		[ tableName ]: data,
		dictionary,
		loading,
		global,
	}
) )( Form.create()( InitStudent ) );