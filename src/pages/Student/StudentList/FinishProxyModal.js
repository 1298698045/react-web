import React from 'react';
import { Modal } from 'antd';
import FIELDS from '@/config/fields';

const FinishProxyModal = props => {
	const { handleSubmit, visible, setVisible, selectedRows, afterClose, loading, } = props;
	
	const submit = () => {
		const data = selectedRows[ 0 ];
		
		handleSubmit( {
			id: data.id,
			km1Status: '9',
			km2Status: '9',
			km3Status: '9',
			km4Status: '9',
		} );
	};
	
	return (
		<Modal
			afterClose={afterClose}
			title={`培训结束 - ${selectedRows.length === 1 && selectedRows[ 0 ][ FIELDS.STUDENT.NAME.key ]}`}
			destroyOnClose
			visible={visible && selectedRows.length === 1}
			onOk={submit}
			confirmLoading={loading}
			onCancel={() => setVisible( false )}
			closable={true}
			maskClosable={false}
			keyboard={false}
		>
			是否确认学员【{`${selectedRows.length === 1 && selectedRows[ 0 ][ FIELDS.STUDENT.NAME.key ]}`}】培训结束？
		</Modal>
	);
};

export default FinishProxyModal;
