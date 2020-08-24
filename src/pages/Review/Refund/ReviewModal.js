import React from 'react';
import { Modal, Button, Descriptions, } from 'antd';
import FIELDS from '@/config/fields';
import getValueFromDictionary from '@/utils/getValueFromDictionary';
import { useEffectOnce } from 'react-use';
import { queryDictionary } from '@/utils/dictionaryUtil';
import numeral from 'numeral';

const { Item } = Descriptions;

let opStatus = 0;
const ReviewModal = props => {
	const { dispatch, visible, setVisible, data, loading, afterClose, dictionary, } = props;
	
	useEffectOnce( () => {
		queryDictionary( dispatch, 'quit_reason' );
		queryDictionary( dispatch, 'stop_reason' );
	} );
	
	const getValue = getValueFromDictionary( dictionary )( data );
	
	const submit = () => {
		dispatch( {
			type: 'reviewRefundAwaitList/saveResult',
			payload: {
				id: data.id,
				[ FIELDS.FINANCE.OP_STATUS.key ]: opStatus
			},
		} ).then( data => {
			if ( data !== false ) {
				setVisible( false )
			}
		} );
	};
	
	const confirm = () => {
		opStatus = 3;
		submit();
	};
	
	const cancel = () => {
		opStatus = 0;
		submit();
	};
	
	const d0 = dictionary[ 'quit_reason' ] || [];
	const d1 = dictionary[ 'stop_reason' ] || [];
	const reasonDic = [ ...d0, ...d1 ];
	
	const item = reasonDic.find( ( { dKey } ) => dKey === data[ FIELDS.FINANCE.REFUND_REASON.key ] );
	
	const { createTime } = data;
	
	return (
		<Modal
			title="退费详情"
			visible={visible}
			afterClose={afterClose}
			width={600}
			destroyOnClose
			onCancel={() => setVisible( false )}
			closable={true}
			maskClosable={false}
			keyboard={false}
			footer={afterClose
				?
				[
					<Button key="confirm" type="primary" loading={opStatus === 3 && loading}
					        onClick={() => confirm()}>通过</Button>,
					<Button key="cancel" type="danger" loading={opStatus === 0 && loading}
					        onClick={() => cancel()}>驳回</Button>,
					<Button key="close" onClick={() => setVisible( false )}>关闭</Button>,
				]
				:
				[ <Button key="close" onClick={() => setVisible( false )}>关闭</Button> ]}
		>
			<Descriptions column={2} title={createTime && createTime.split( ' ' )[ 0 ]} bordered>
				<Item label="类型">{getValue( FIELDS.FINANCE.REFUND_TYPE )}</Item>
				<Item label="退费金额">{numeral( getValue( FIELDS.FINANCE.AMOUNT ) || 0 ).format( '0,0' )}</Item>
				<Item
					label="原因">{item ? item.dValue : '暂无'}</Item>
				<Item label="提报时间">
					{getValue( FIELDS.FINANCE.CREATE_TIME )}
				</Item>
				<Item label="学员姓名">
					{getValue( FIELDS.FINANCE.NAME )}
				</Item>
				<Item label="学员手机号">
					{getValue( FIELDS.STUDENT.MOBILE )}
				</Item>
				<Item label="备注">
					{getValue( FIELDS.STUDENT.MEMO )}
				</Item>
			</Descriptions>
		</Modal>
	);
};

export default ReviewModal;
