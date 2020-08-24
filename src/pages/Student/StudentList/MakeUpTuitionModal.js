import React from 'react';
import { Form, Modal, Descriptions, } from 'antd';
import FIELDS from '@/config/fields';
import { getDictValue } from '@/utils/dictionaryUtil';

const { Item } = Descriptions;

const MakeUpTuitionModal = props => {
	const { handleSubmit, visible, setVisible, data, afterClose, dictionary, loading, } = props;
	// let valueAdd = data.finance[ FIELDS.STUDENT.VALUE_ADDED.key ] + ''
	// let arrVAdd = valueAdd.split( ',' )
	return (
		<Modal
			title={`补交学费 - ${data[ FIELDS.STUDENT.NAME.key ]}`}
			afterClose={afterClose}
			width={600}
			destroyOnClose
			visible={visible}
			onOk={handleSubmit}
			confirmLoading={loading}
			onCancel={() => setVisible( false )}
			closable={true}
			maskClosable={false}
			keyboard={false}
		>
			{
				visible && <Descriptions bordered column={2}>
					<Item label="学员">{data[ FIELDS.STUDENT.NAME.key ]}</Item>
					<Item label="手机号">{data[ FIELDS.STUDENT.MOBILE.key ]}</Item>
					<Item
						label="班型">{getDictValue( dictionary, FIELDS.STUDENT.CLASS_ID.dictionary, data.newClassId )}</Item>
					<Item label="已交学费">{data.finance[ FIELDS.FINANCE.RECEIPTS.key ]}元</Item>
					<Item label="需补交学费" span={2}>{data.finance[ FIELDS.STUDENT.OWED.key ]}元</Item>
					{/* <Item label="附加增值服务">
						{
							arrVAdd.map( v => {
								const valueAdded = dictionary[ FIELDS.STUDENT.VALUE_ADDED.dictionary ].find( ( { dKey } ) => dKey === String( v ) );

								if ( !valueAdded ) {
									return '暂无'
								}
								const { id, amount, title } = valueAdded;
								return <span key={id}>{`【${title}：${amount}元】`}</span>;
							} )
						}
					</Item> */}
				</Descriptions>
			}
		</Modal>
	);
};

export default Form.create()( MakeUpTuitionModal );
