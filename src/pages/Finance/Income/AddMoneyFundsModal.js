import React from 'react';
import { Form, Modal, Col, Row, } from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import useGetInitialValue from '@/hooks/useGetInitialValue';
import moment from 'moment';

const AddMoneyFundsModal = props => {
	const { handleSubmit, visible, setVisible, form, data, loading, afterClose, disabledMonth, } = props;
	
	const getValue = useGetInitialValue( data );
	const monthStatus = getValue( FIELDS.FINANCE.JOURNAL_DATE ) !== null && 'disabled';
	
	const submit = e => {
		e.preventDefault();
		
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			
			handleSubmit( {
				id: data.id,
				...fieldsValue,
				[ FIELDS.FINANCE.JOURNAL_DATE.key ]: moment( fieldsValue[ FIELDS.FINANCE.JOURNAL_DATE.key ] ).format( 'YYYY-MM-DD' ),
			} );
		} );
	};
	
	return (
		<Modal
			title={data.id ? '修改货币资金' : '新增货币资金'}
			visible={visible}
			afterClose={afterClose}
			onOk={submit}
			destroyOnClose
			confirmLoading={loading}
			onCancel={() => setVisible( false )}
			closable={true}
			maskClosable={false}
			keyboard={false}
		>
			<Form onSubmit={submit}>
				<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
					<Col sm={24}>
						<WrapperComplexFormItem
							config={FIELDS.FINANCE.JOURNAL_DATE}
							mode="month"
							disabledMonth={disabledMonth}
							initialValue={getValue( FIELDS.FINANCE.JOURNAL_DATE )}
							rules={[ { required: true, } ]}
							status={monthStatus}
							form={form}
						/>
					</Col>
					<Col sm={24}>
						<WrapperComplexFormItem
							config={{
								...FIELDS.FINANCE.JOURNAL_AMOUNT,
								title: '货币资金',
							}}
							rules={[ { required: true, } ]}
							initialValue={getValue( FIELDS.FINANCE.JOURNAL_AMOUNT )}
							formatter={value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' )}
							parser={value => value.replace( /\$\s?|(,*)/g, '' )}
							form={form}
						/>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( AddMoneyFundsModal );
