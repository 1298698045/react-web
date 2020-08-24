import React from 'react';
import { Form, Modal, Descriptions, Button, } from 'antd';
import FIELDS from '@/config/fields';
// import useGetInitialValue from '@/hooks/useGetInitialValue';
import getValueFromDictionary from '@/utils/getValueFromDictionary';

const { Item } = Descriptions;

const fieldsMap = [
	FIELDS.ASSET.PLATE_NO,
	FIELDS.ASSET.PURPOSE,
	FIELDS.ASSET.LICENSE_TYPE,
	FIELDS.ASSET.BRAND,
	FIELDS.ASSET.MODEL,
	FIELDS.ASSET.COLOR,
	FIELDS.ASSET.ENGINE_NO,
	FIELDS.ASSET.VIN,
	FIELDS.ASSET.MANUFACTURE,
	FIELDS.ASSET.PURCHASE_TYPE,
	FIELDS.ASSET.PURCHASE_DATE,
	FIELDS.ASSET.PURCHASE_AMOUNT,
	FIELDS.ASSET.DEPART_ID,
	FIELDS.ASSET.SITE_ID,
	FIELDS.ASSET.CAR_STATUS,
	FIELDS.ASSET.MEMO,
];

const InfoModal = props => {
	const { data = {}, visible, setVisible, dictionary, } = props;
	// const getValue = useGetInitialValue( data );
	const getValue = getValueFromDictionary( dictionary )( data );
	
	return (
		<Modal
			title="车辆信息"
			width="90%"
			visible={visible}
			destroyOnClose
			onCancel={() => setVisible( false )}
			closable={true}
			maskClosable={false}
			keyboard={false}
			footer={
				<Button
					icon="close-circle"
					htmlType="button"
					onClick={() => {
						setVisible( false );
					}}>关闭</Button>
			}
		>
			<Descriptions bordered>
				{
					fieldsMap.map( f => <Item key={f.key} label={f.title}>{getValue( f ) || '暂无'}</Item> )
				}
			</Descriptions>
		</Modal>
	);
};

export default Form.create()( InfoModal );
