import React from 'react';
import { Form, Modal, } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import moment from 'moment';

const SettingModal = props => {
	const { handleSubmit, visible, setVisible, form, loading, afterClose, } = props;
	
	const submit = e => {
		e.preventDefault();
		
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			
			handleSubmit( {
				startDate: moment( fieldsValue[ 'date' ][ 0 ] ).format( 'YYYY-MM-DD' ),
				endDate: moment( fieldsValue[ 'date' ][ 1 ] ).format( 'YYYY-MM-DD' ),
			} );
		} );
	};
	
	return (
		<Modal
			title="工资绩效数据报表设置"
			visible={visible}
			afterClose={afterClose}
			onOk={submit}
			destroyOnClose
			okButtonProps={{ loading: loading, }}
			onCancel={() => setVisible( false )}
			closable={true}
			maskClosable={false}
			keyboard={false}
		>
			<Form onSubmit={submit}>
				<WrapperComplexFormItem
					config={{
						title: '时间范围',
						key: 'date',
						type: 'rangeDate',
					}}
					rules={[ { required: true, } ]}
					form={form}
				/>
			</Form>
		</Modal>
	);
};

export default Form.create()( SettingModal );
