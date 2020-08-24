import React from 'react';
import { Map } from 'react-amap';
import { Form, Modal, Descriptions, Button, } from 'antd';
import FIELDS from '@/config/fields';
import getValueFromDictionary from '@/utils/getValueFromDictionary';
import getLocation from '@/utils/getLocation';

const { Item } = Descriptions;

const fieldsMap = [
	FIELDS.ASSET.TITLE,
	FIELDS.ASSET.DEPART_ID,
	FIELDS.ASSET.AREA,
	FIELDS.ASSET.PURCHASE_TYPE,
	FIELDS.ASSET.FIRST_PARTY,
	FIELDS.ASSET.PAY_MODE,
	FIELDS.ASSET.PURCHASE_AMOUNT,
	FIELDS.ASSET.BEGIN_DATE,
	FIELDS.ASSET.END_DATE,
	FIELDS.ASSET.IS_EXAM,
	FIELDS.ASSET.STATUS,
	FIELDS.ASSET.LICENSE_TYPE,
	FIELDS.ASSET.PROVINCE,
	FIELDS.ASSET.CITY,
	FIELDS.ASSET.DISTRICT,
	FIELDS.ASSET.ADDRESS,
	FIELDS.ASSET.LAT,
	FIELDS.ASSET.LNG,
];
const InfoModal = props => {
	const { visible, setVisible, data = {}, dictionary, } = props;
	
	const getValue = getValueFromDictionary( dictionary )( data );
	
	const renderValue = f => {
		if ( f.key === FIELDS.ASSET.PROVINCE.key ) {
			return getLocation( 'province' )( getValue( f ) );
		}
		if ( f.key === FIELDS.ASSET.CITY.key ) {
			return getLocation( 'city' )( getValue( f ) );
		}
		if ( f.key === FIELDS.ASSET.DISTRICT.key ) {
			return getLocation( 'district' )( getValue( f ) );
		}
		
		return getValue( f );
	};
	
	return (
		<Modal
			title="场地信息"
			width="90%"
			visible={visible}
			destroyOnClose
			closable={true}
			maskClosable={false}
			keyboard={false}
			onCancel={() => setVisible( false )}
			footer={
				<Button
					icon="close-circle"
					htmlType="button"
					onClick={() => setVisible( false )}>关闭</Button>
			}
		>
			<Descriptions bordered>
				{
					fieldsMap.map( f => <Item key={f.key} label={f.title}>{renderValue( f )}</Item> )
				}
				{/*<Item label="地图位置" span={3}>*/}
				{/*	<div style={{ height: 300, padding: '20px 0', }}>*/}
				{/*		<Map zoom={12} scrollWheel={false} amapkey/>*/}
				{/*	</div>*/}
				{/*</Item>*/}
				<Item label="场地图片" span={3}>
					{
						data.url
							?
							<img style={{ width: 200 }}
							     src={`http://oss-dev.aplusx.com/${data.url}`} alt="场地图片"/>
							:
							'暂无'
					}
				
				</Item>
				<Item span={3} label={FIELDS.ASSET.MEMO.title}>{getValue( FIELDS.ASSET.MEMO )}</Item>
			</Descriptions>
		</Modal>
	);
};

export default Form.create()( InfoModal );
