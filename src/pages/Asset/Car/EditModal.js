import React from 'react';
import { Form, Modal, Row, Col, } from 'antd';
import { useToggle } from 'react-use';
import moment from 'moment';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
// import EmployeeSelectModal from '@/pages/Common/EmployeeSelectModal';

const EditModal = props => {
	const { handleSubmit, visible, setVisible, form, data = {}, loading, afterClose, } = props;
	
	if ( data[ FIELDS.ASSET.DEPART_ID.key ] ) {
		data[ FIELDS.ASSET.DEPART_ID.key ] = String( data[ FIELDS.ASSET.DEPART_ID.key ] );
	}
	
	if ( data[ FIELDS.ASSET.SITE_ID.key ] ) {
		data[ FIELDS.ASSET.SITE_ID.key ] = String( data[ FIELDS.ASSET.SITE_ID.key ] );
	}
	
	if ( data[ FIELDS.ASSET.EMPLOYEE_ID.key ] ) {
		data[ FIELDS.ASSET.EMPLOYEE_ID.key ] = String( data[ FIELDS.ASSET.EMPLOYEE_ID.key ] );
	}
	
	if ( !data[ FIELDS.ASSET.PURCHASE_DATE.key ] ) {
		data[ FIELDS.ASSET.PURCHASE_DATE.key ] = null;
	}
	
	const [ licenseTypeRequired, setLicenseTypeRequired ] = useToggle( false );
	// const [ employeeModalVisible, setEmployeeModalVisible ] = useToggle( false );
	// const [ siteList, setSiteList ] = useState( [] );
	
	// const allSites = dictionary[ FIELDS.ASSET.SITE_ID.dictionary ];
	
	const onChange = ( key, value ) => {
		// 用途为“教学”、“考试”时，申领类型为必选项，请他情况为非必选项
		switch ( key ) {
			case FIELDS.ASSET.PURPOSE.key: {
				setLicenseTypeRequired( value === 'teaching' || value === 'exam' );
				break;
			}
			// case FIELDS.ASSET.DEPART_ID.key: {
			// 	if ( value ) {
			// 		const currentDepart = dictionary[ FIELDS.ASSET.DEPART_ID.dictionary ].find( ( { dKey } ) => {
			// 			return dKey === value;
			// 		} );
			//
			// 		if ( currentDepart ) {
			// 			const prev = String( data[ FIELDS.ASSET.DEPART_ID.key ] );
			// 			const list = allSites.filter( ( { siteDepartId } ) => siteDepartId === currentDepart.dKey );
			//
			// 			if ( currentDepart.dKey !== prev ) {
			// 				const l = list.find( ( { dKey } ) => dKey === prev );
			// 				if ( !l ) {
			// 					form.setFieldsValue( {
			// 						[ FIELDS.ASSET.SITE_ID.key ]: undefined,
			// 					} );
			// 				}
			// 			}
			//
			// 			setSiteList( list );
			// 		}
			// 	}
			// }
		}
	};
	
	const fields = [
		FIELDS.ASSET.PLATE_NO,
		{
			...FIELDS.ASSET.PURPOSE,
			defaultValue: 'teaching',
		},
		{
			...FIELDS.ASSET.LICENSE_TYPE_ACTIVE,
			rules: [ { required: licenseTypeRequired } ],
		},
		FIELDS.ASSET.BRAND,
		FIELDS.ASSET.MODEL,
		FIELDS.ASSET.COLOR,
		FIELDS.ASSET.ENGINE_NO,
		FIELDS.ASSET.VIN,
		FIELDS.ASSET.MANUFACTURE,
		FIELDS.ASSET.PURCHASE_TYPE,
		FIELDS.ASSET.PURCHASE_DATE,
		{
			...FIELDS.ASSET.PURCHASE_AMOUNT,
			type: 'inputNumber',
			formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
			parser: value => value.replace( /\$\s?|(,*)/g, '' ),
			min: 0,
		},
		FIELDS.ASSET.DEPART_ID,
		FIELDS.ASSET.SITE_ID_ACTIVE,
		{
			...FIELDS.ASSET.CAR_STATUS,
			defaultValue: 'normal',
			col: 24,
		},
	];
	
	const submit = e => {
		e.preventDefault();
		
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			
			handleSubmit( {
				...fieldsValue,
				[ FIELDS.ASSET.PURCHASE_DATE.key ]: moment().format( 'YYYY-MM-DD' ),
				id: data.id,
			} );
		} );
	};
	
	return (
		<Modal
			title={data.id ? '编辑车辆' : '新增车辆'}
			width="90%"
			visible={visible}
			afterClose={afterClose}
			onOk={submit}
			closable={true}
			maskClosable={false}
			keyboard={false}
			destroyOnClose
			confirmLoading={loading}
			onCancel={() => setVisible( false )}
		>
			<Form onSubmit={submit}>
				<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
					{
						fields.map( f => (
							<Col key={f.key} md={f.col || 6} sm={24}>
								<WrapperComplexFormItem
									config={f}
									formatter={f.formatter}
									parser={f.parser}
									min={f.min}
									values={f.values}
									onChange={onChange}
									rules={f.rules || [ { required: true, } ]}
									initialValue={data[ f.key ]}
									defaultValue={f.defaultValue}
									form={form}
								/>
							</Col>
						) )
					}
					<Col key={FIELDS.ASSET.EMPLOYEE_ID.key} sm={24}>
						<WrapperComplexFormItem
							config={FIELDS.ASSET.EMPLOYEE_ID}
							initialValue={data[ FIELDS.ASSET.EMPLOYEE_ID.key ]}
							form={form}
						/>
					</Col>
					<Col key={FIELDS.ASSET.MEMO.key} sm={24}>
						<WrapperComplexFormItem
							config={FIELDS.ASSET.MEMO}
							rules={[]}
							initialValue={data[ FIELDS.ASSET.MEMO.key ]}
							form={form}
						/>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( EditModal );
