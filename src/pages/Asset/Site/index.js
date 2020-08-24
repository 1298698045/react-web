import React, { useMemo, useState, } from 'react';
import { useToggle, } from 'react-use';
import { connect } from 'dva';
import {
	Form,
	Button,
	Card, Spin,
} from 'antd';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { refreshDictionary } from '@/utils/dictionaryUtil';
import EditModal from './EditModal';
import InfoModal from './InfoModal';
import Privilege from '@/components/Privilege';

const tableName = 'assetSiteList';

const fields = [
	FIELDS.ASSET.DEPART_ID,
	FIELDS.ASSET.PURCHASE_TYPE,
	FIELDS.ASSET.IS_EXAM,
	FIELDS.ASSET.STATUS,
	FIELDS.ASSET.TITLE,
];

const Index = props => {
	const { form, dispatch, loading, dictionary, } = props;
	const [ editModalVisible, toggleEditModalVisible ] = useToggle( false );
	const [ infoModalVisible, toggleInfoModalVisible ] = useToggle( false );
	const [ siteInfo, setSiteInfo ] = useState( {} );
	const [ getSiteInfoLoadingId, setGetSiteInfoLoadingId ] = useState( undefined );
	const [ needUpdate, setNeedUpdate ] = useToggle( false );
	
	const getSiteInfoLoading = loading.effects[ `${tableName}/getSiteInfo` ] || false;
	
	const getSiteInfo = id => cb => {
		setGetSiteInfoLoadingId( id );
		dispatch( {
			type: `${tableName}/getSiteInfo`,
			payload: id,
		} ).then( siteInfo => {
			setSiteInfo( siteInfo );
			if ( cb ) cb();
		} );
	};
	
	const tableActions = [
		<Privilege privs={[ 'site_add' ]} key="site_add">
		<Button
			key="plus-button"
			icon="plus"
			htmlType="button"
			type="primary"
			onClick={() => {
				setSiteInfo( {} );
				toggleEditModalVisible( true );
			}}>新增</Button></Privilege>,
	];
	
	const formFields = useMemo( () => {
		return fields.map( f => (
			<WrapperComplexFormItem
				config={f}
				form={form}
			/>
		) );
	}, [ form ] );
	
	const originColumns = [
		{
			title: '序号',
			key: 'key',
		},
		{
			...FIELDS.ASSET.TITLE,
			customRender: ( text, record, ) => {
				return (
				<Privilege privs={[ 'site_detail' ]}  noMatch={text}>
					<a onClick={e => {
						e.stopPropagation();
						if ( !getSiteInfoLoading ) {
							getSiteInfo( record.id )( () => toggleInfoModalVisible( true ) );
						}
					}}>
						{(getSiteInfoLoadingId === record.id && getSiteInfoLoading) && <Spin size="small"/>} {text}
					</a>
				</Privilege>)
			}
		},
		FIELDS.ASSET.DEPART_ID,
		FIELDS.ASSET.AREA,
		FIELDS.ASSET.PURCHASE_TYPE,
		FIELDS.ASSET.IS_EXAM,
		FIELDS.ASSET.STATUS,
		{
			title: '操作',
			key: 'action',
			customRender: ( text, record ) => {
				return (
					<Privilege privs={[ 'site_edit' ]}  noMatch={'编辑'}>
						<a onClick={e => {
							e.stopPropagation();
							if ( !getSiteInfoLoading ) {
								getSiteInfo( record.id )( () => toggleEditModalVisible( true ) );
							}
						}}
						>{(getSiteInfoLoadingId === record.id && getSiteInfoLoading) && <Spin size="small"/>} 编辑</a>
					</Privilege>
				)
			}
		},
	];
	
	const submitLoading = loading.effects[ `${tableName}/saveSite` ];
	
	return (
		<PageHeaderWrapper title="场地管理">
			<Card>
				<WithTableName
					{...props}
					needUpdate={needUpdate}
					setNeedUpdate={setNeedUpdate}
					bodyStyle={{ padding: 0, }}
					tableName={tableName}
					tableActions={tableActions}
					originColumns={originColumns}
					scroll={{ x: 'max-content' }}
					formFields={formFields}
				/>
				<EditModal
					afterClose={() => setNeedUpdate( true )}
					data={siteInfo}
					handleSubmit={fieldsValue => {
						dispatch( {
							type: `${tableName}/saveSite`,
							payload: {
								...fieldsValue,
							},
						} ).then( data => {
							if ( data !== false ) {
								refreshDictionary( dispatch, 'site_id' );
								// refreshDictionary( dispatch, 'site_all_id' );
								toggleEditModalVisible( false );
							}
						} );
					}}
						loading={submitLoading}
						visible={editModalVisible}
						setVisible={toggleEditModalVisible}
						/>
						<InfoModal
						dictionary={dictionary}
						data={siteInfo}
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
						}
						) => (
						{
						[ tableName ]: data1,
						loading,
						global,
						signUp,
						dictionary,
						}
						) )( Form.create()( Index ) );
