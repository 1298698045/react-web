import React from 'react';
import { Form, Modal, } from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import moment from 'moment';

const ExportModal = props => {
	const { handleSubmit, visible, setVisible, form, loading, } = props;
	
	const submit = e => {
		e.preventDefault();
		
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			
			const data = {
				startDate: moment( fieldsValue[ FIELDS.FINANCE.SEARCH_DATE.key ][ 0 ] ).format( 'YYYY-MM-DD' ),
				endDate: moment( fieldsValue[ FIELDS.FINANCE.SEARCH_DATE.key ][ 1 ] ).format( 'YYYY-MM-DD' ),
			};
			
			handleSubmit( data );
		} );
	};
	
	return (
		<Modal
			title="导出报名费报表"
			visible={visible}
			onOk={submit}
			okText="确定生成"
			destroyOnClose
			confirmLoading={loading}
			onCancel={() => setVisible( false )}
			closable={true}
			maskClosable={false}
			keyboard={false}
		>
			<Form>
				<WrapperComplexFormItem
					style={{ marginBottom: 0, }}
					config={{
						...FIELDS.FINANCE.SEARCH_DATE,
						title: '时间范围',
					}}
					form={form}
					rules={[ { required: true, } ]}
				/>
			</Form>
		</Modal>
	);
};

export default Form.create()( ExportModal );
