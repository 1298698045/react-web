import React, { useState, useMemo, } from 'react';
import { useEffectOnce, useToggle, } from 'react-use';
import { connect } from 'dva';
import {
	Form,
	Button,
	Card,
	Spin,
} from 'antd';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import UploadModal from './UploadModal';
import { refreshDictionary } from '@/utils/dictionaryUtil';
import EditModal from './EditModal';
import InfoModal from './InfoModal';
import router from 'umi/router';
import Privilege from '@/components/Privilege';

const tableName = 'assetCarList';

const fields = [
	FIELDS.ASSET.PURPOSE,
	FIELDS.ASSET.LICENSE_TYPE_ACTIVE,
	FIELDS.ASSET.SITE_ID_ACTIVE,
	FIELDS.ASSET.DEPART_ID,
	{
		...FIELDS.ASSET.CAR_STATUS,
		type: 'select',
	},
	FIELDS.ASSET.PLATE_NO,
	FIELDS.ASSET.COACH_ID,
];

const Index = props => {
	const { form, dispatch, loading, dictionary, quickEntryParams, } = props;
	const [ uploadModalVisible, toggleUploadModalVisible ] = useToggle( false );
	const [ editModalVisible, toggleEditModalVisible ] = useToggle( false );
	const [ infoModalVisible, toggleInfoModalVisible ] = useToggle( false );
	const [ carInfo, setCarInfo ] = useState( {} );
	const [ getCarInfoLoadingId, setGetCarInfoLoadingId ] = useState( undefined );
	
	useEffectOnce( () => {
		if ( quickEntryParams === 'record' ) {
			setCarInfo( {} );
			toggleEditModalVisible( true );
		} else if ( quickEntryParams === 'import' ) {
			toggleUploadModalVisible( true );
		}
		
		dispatch( {
			type: 'quickEntryParams/clearParams',
		} );
	} );
	
	const getCarInfoLoading = loading.effects[ `${tableName}/getCarInfo` ] || false;
	
	const getCarInfo = id => cb => {
		setGetCarInfoLoadingId( id );
		dispatch( {
			type: `${tableName}/getCarInfo`,
			payload: id,
		} ).then( carInfo => {
			setCarInfo( carInfo );
			if ( cb ) cb();
		} );
	};
	
	const tableActions = [
		<Privilege privs={[ 'car_add' ]} key="car_add">
		<Button
			key="plus-button"
			icon="edit"
			htmlType="button"
			type="primary"
			onClick={() => {
				setCarInfo( {} );
				toggleEditModalVisible( true );
			}}>录入车辆信息</Button></Privilege>,
		<Privilege privs={[ 'car_import' ]} key="car_import">
		<Button
			key="upload-button"
			icon="upload"
			htmlType="button"
			type="primary"
			onClick={() => {
				toggleUploadModalVisible( true );
			}}>导入车辆信息</Button></Privilege>,
		<Privilege privs={[ 'download_car_templete' ]} key="download_car_templete">
		<Button
			key="download" icon="download" htmlType="button" type="default"
			onClick={() => router.push( '/user-center/template-download' )}
		>
			下载导入模板
		</Button></Privilege>,
	];
	
	const originColumns = [
		{
			title: '序号',
			key: 'key',
		},
		{
			...FIELDS.ASSET.PLATE_NO,
			customRender: ( text, record, ) => {
				return (
				<Privilege privs={[ 'car_detail' ]}  noMatch={text}>
					<a onClick={e => {
						e.stopPropagation();
						if ( !getCarInfoLoading ) {
							getCarInfo( record.id )( () => toggleInfoModalVisible( true ) );
						}
					}}>{(getCarInfoLoadingId === record.id && getCarInfoLoading) && <Spin size="small"/>} {text}</a>
				</Privilege>)
			}
		},
		FIELDS.ASSET.BRAND,
		FIELDS.ASSET.MODEL,
		FIELDS.ASSET.PURPOSE,
		FIELDS.ASSET.LICENSE_TYPE,
		FIELDS.ASSET.SITE_ID,
		FIELDS.ASSET.DEPART_ID,
		FIELDS.ASSET.CAR_STATUS,
		FIELDS.ASSET.EMPLOYEE_ID,
		{
			title: '操作',
			key: 'action',
			customRender: ( text, record ) => {
				return (
					<Privilege privs={[ 'car_edit' ]}  noMatch={'编辑'}>
						<a onClick={e => {
							e.stopPropagation();
							if ( !getCarInfoLoading ) {
								getCarInfo( record.id )( () => toggleEditModalVisible( true ) );
							}
						}}
						>{(getCarInfoLoadingId === record.id && getCarInfoLoading) && <Spin size="small"/>} 编辑</a>
					</Privilege>
				)
			}
		},
	];
	
	const formFields = useMemo( () => {
		return fields.map( f => (
			<WrapperComplexFormItem
				config={f}
				form={form}
			/>
		) );
	}, [ form ] );
	
	return (
		<PageHeaderWrapper title="车辆管理">
			<Card>
				<WithTableName
					{...props}
					bodyStyle={{ padding: 0, }}
					tableName={tableName}
					tableActions={tableActions}
					originColumns={originColumns}
					scroll={{ x: 'max-content' }}
					formFields={formFields}
				/>
				<UploadModal
					afterClose={() => {
						dispatch( {
							type: `${tableName}/refresh`,
						} );
					}}
					data={carInfo}
					visible={uploadModalVisible}
					setVisible={toggleUploadModalVisible}
				/>
				<EditModal
					afterClose={() => {
						dispatch( {
							type: `${tableName}/refresh`,
						} );
					}}
					data={carInfo}
					handleSubmit={fieldsValue => {
						dispatch( {
							type: `${tableName}/saveCar`,
							payload: {
								...fieldsValue,
							},
						} ).then( data => {
							if ( data !== false ) {
								refreshDictionary( dispatch, 'car_id' );
								toggleEditModalVisible( false );
							}
						} );
					}}
					dictionary={dictionary}
					visible={editModalVisible}
					setVisible={toggleEditModalVisible}
				/>
				<InfoModal
					data={carInfo}
					dictionary={dictionary}
					visible={infoModalVisible}
					setVisible={toggleInfoModalVisible}
				/>
			</Card>
		</PageHeaderWrapper>
	);
};

export default connect( (
	{
		[ tableName ]: data1,
		loading,
		global,
		signUp,
		dictionary,
		quickEntryParams,
	}
) => (
	{
		[ tableName ]: data1,
		loading,
		global,
		signUp,
		dictionary,
		quickEntryParams,
	}
) )( Form.create()( Index ) );
