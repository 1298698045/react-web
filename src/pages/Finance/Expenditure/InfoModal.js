import React from 'react';
import { Form, Modal, Button, Descriptions } from 'antd';
import FIELDS from '@/config/fields';
import { getDictValue } from '@/utils/dictionaryUtil';

const { Item } = Descriptions;

const defaultFormItem = [
	{
		...FIELDS.FINANCE.AMOUNT,
		title: '支付金额',
		formatter: value => `${value < 0 ? (value * -1) : value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
	},
	FIELDS.FINANCE.EX_JOURNAL_TARGET,
	FIELDS.FINANCE.PAY_MODE,
	FIELDS.FINANCE.JOURNAL_DATE,
	FIELDS.FINANCE.EX_JOURNAL_REPORTER,
];

const InfoModal = props => {
	const { visible, setVisible, getData, dictionary, type } = props;

	const data = Object.assign( {}, getData(), {
		...getData().more,
	} );
	
	if ( !data[ FIELDS.FINANCE.EX_JOURNAL_TYPE.key ] ) return null;
	const parentType = getDictValue( dictionary, type, data[ FIELDS.FINANCE.EX_JOURNAL_TYPE.key ].split( '.' )[ 0 ] );
	const subType = getDictValue( dictionary, data[ FIELDS.FINANCE.EX_JOURNAL_TYPE.key ].split( '.' )[ 0 ], data[ FIELDS.FINANCE.EX_JOURNAL_TYPE.key ].split( '.' )[ 1 ] );
	const renderFormItem = () => {
		switch ( data[ FIELDS.FINANCE.EX_JOURNAL_TYPE.key ].split( '.' )[ 1 ] ) {
			case 'gas':
			case 'gasoline': {
				// 燃料费-油费
				return [
					FIELDS.FINANCE.EX_JOURNAL_CAR_ID,
					{
						...FIELDS.FINANCE.EX_JOURNAL_GAS,
						formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
					},
					{
						...FIELDS.FINANCE.AMOUNT,
						title: '支付金额',
						formatter: value => {
							return `${value < 0 ? (value * -1) : value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' )
						},
					},
					FIELDS.FINANCE.EX_JOURNAL_TARGET,
					FIELDS.FINANCE.PAY_MODE,
					FIELDS.FINANCE.JOURNAL_DATE,
					{
						...FIELDS.FINANCE.EX_JOURNAL_REPORTER,
						dictionary: 'employee_id_coach',
					},
				];
			}
			case 'car_repair': {
				// 车辆维修费
				return [
					{
						...FIELDS.FINANCE.EX_JOURNAL_CAR_ID,
						title: '维修车辆',
					},
					FIELDS.FINANCE.EX_JOURNAL_CAR_PART,
					{
						...FIELDS.FINANCE.AMOUNT,
						title: '支付金额',
						formatter: value => `${value < 0 ? (value * -1) : value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
					},
					FIELDS.FINANCE.EX_JOURNAL_TARGET,
					FIELDS.FINANCE.PAY_MODE,
					FIELDS.FINANCE.JOURNAL_DATE,
					FIELDS.FINANCE.EX_JOURNAL_REPORTER,
				];
			}
			case 'car_maintain': {
				// 车辆保养费
				return [
					{
						...FIELDS.FINANCE.EX_JOURNAL_CAR_ID,
						title: '保养车辆',
					},
					{
						...FIELDS.FINANCE.AMOUNT,
						title: '支付金额',
						formatter: value => `${value < 0 ? (value * -1) : value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
					},
					FIELDS.FINANCE.EX_JOURNAL_TARGET,
					FIELDS.FINANCE.PAY_MODE,
					FIELDS.FINANCE.JOURNAL_DATE,
					FIELDS.FINANCE.EX_JOURNAL_REPORTER,
				];
			}
			case 'car_insurance': {
				// 车辆保险费
				return [
					{
						...FIELDS.FINANCE.EX_JOURNAL_CAR_ID,
						title: '保险车辆',
					},
					FIELDS.FINANCE.EX_JOURNAL_INSURANCE,
					{
						...FIELDS.FINANCE.AMOUNT,
						title: '支付金额',
						formatter: value => `${value < 0 ? (value * -1) : value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
					},
					FIELDS.FINANCE.EX_JOURNAL_TARGET,
					FIELDS.FINANCE.PAY_MODE,
					FIELDS.FINANCE.JOURNAL_DATE,
					FIELDS.FINANCE.EX_JOURNAL_REPORTER,
				];
			}
			case 'car_inspection': {
				// 车辆年检费
				return [
					{
						...FIELDS.FINANCE.EX_JOURNAL_CAR_ID,
						title: '年检车辆',
					},
					FIELDS.FINANCE.EX_JOURNAL_INSPECTION,
					{
						...FIELDS.FINANCE.AMOUNT,
						title: '支付金额',
						formatter: value => `${value < 0 ? (value * -1) : value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
					},
					FIELDS.FINANCE.EX_JOURNAL_TARGET,
					FIELDS.FINANCE.PAY_MODE,
					FIELDS.FINANCE.JOURNAL_DATE,
					FIELDS.FINANCE.EX_JOURNAL_REPORTER,
				];
			}
			case 'car_lease': {
				// 车辆年检费
				return [
					{
						...FIELDS.FINANCE.EX_JOURNAL_CAR_ID,
						title: '租赁车辆',
					},
					FIELDS.FINANCE.EX_JOURNAL_CAR_LEASE,
					{
						...FIELDS.FINANCE.AMOUNT,
						title: '支付金额',
						formatter: value => `${value < 0 ? (value * -1) : value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
					},
					FIELDS.FINANCE.EX_JOURNAL_TARGET,
					FIELDS.FINANCE.PAY_MODE,
					FIELDS.FINANCE.JOURNAL_DATE,
					FIELDS.FINANCE.EX_JOURNAL_REPORTER,
				];
			}
			case 'site_repair': {
				// 场地维修费
				return [
					{
						...FIELDS.FINANCE.EX_JOURNAL_SITE_ID,
						title: '维修场地',
					},
					{
						...FIELDS.FINANCE.AMOUNT,
						title: '支付金额',
						formatter: value => `${value < 0 ? (value * -1) : value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
					},
					FIELDS.FINANCE.EX_JOURNAL_TARGET,
					FIELDS.FINANCE.PAY_MODE,
					FIELDS.FINANCE.JOURNAL_DATE,
					FIELDS.FINANCE.EX_JOURNAL_REPORTER,
				];
			}
			case 'site_lease': {
				// 场地租赁费
				return [
					{
						...FIELDS.FINANCE.EX_JOURNAL_SITE_ID,
						title: '租赁场地',
					},
					FIELDS.FINANCE.EX_JOURNAL_SITE_LEASE,
					{
						...FIELDS.FINANCE.AMOUNT,
						title: '支付金额',
						formatter: value => `${value < 0 ? (value * -1) : value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
					},
					FIELDS.FINANCE.EX_JOURNAL_TARGET,
					FIELDS.FINANCE.PAY_MODE,
					FIELDS.FINANCE.JOURNAL_DATE,
					FIELDS.FINANCE.EX_JOURNAL_REPORTER,
				];
			}
			case 'ad':
			case 'event':
			case 'materiel': {
				// 物料费
				return [
					{
						...FIELDS.FINANCE.AMOUNT,
						title: '支付金额',
						formatter: value => `${value < 0 ? (value * -1) : value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
					},
					FIELDS.FINANCE.EX_JOURNAL_TARGET,
					FIELDS.FINANCE.PAY_MODE,
					FIELDS.FINANCE.JOURNAL_DATE,
					FIELDS.FINANCE.EX_JOURNAL_REPORTER,
				];
			}
			case 'people_trans': {
				// 道路危险货物资格证
				return [
					{
						...FIELDS.FINANCE.AMOUNT,
						title: '支付金额',
						formatter: value => `${value < 0 ? (value * -1) : value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
					},
					{
						...FIELDS.FINANCE.EX_JOURNAL_NUM,
						title: '学员数量',
						formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
					},
					FIELDS.FINANCE.EX_JOURNAL_TARGET,
					FIELDS.FINANCE.PAY_MODE,
					FIELDS.FINANCE.JOURNAL_DATE,
					FIELDS.FINANCE.EX_JOURNAL_REPORTER,
				];
			}
			default: {
				return [ ...defaultFormItem ];
			}
		}
	};

	return (
		<Modal
			title="费用详情"
			visible={visible}
			destroyOnClose
			width={650}
			onCancel={() => setVisible( false )}
			closable={true}
			maskClosable={false}
			keyboard={false}
			footer={[
				<Button key="close" onClick={() => setVisible( false )} icon="close-circle">关闭</Button>
			]}
		>
			<Descriptions bordered column={2}>
				<Item label={FIELDS.FINANCE.EX_JOURNAL_TYPE.title}>{parentType}</Item>
				<Item label={FIELDS.FINANCE.EX_JOURNAL_SUBTYPE.title}>{subType}</Item>
				{
					renderFormItem().map( r => {
						let renderText = '暂无';
						
						if ( data[ r.key ] ) {
							renderText = data[ r.key ];
						}
						
						if ( r.key === FIELDS.FINANCE.EX_JOURNAL_SITE_ID.key ) {
							// 有车辆
							renderText = getDictValue( dictionary, FIELDS.FINANCE.EX_JOURNAL_SITE_ID.dictionary, data[ r.key ] );
						}
						
						if ( r.key === FIELDS.FINANCE.EX_JOURNAL_CAR_ID.key ) {
							// 有车辆
							renderText = getDictValue( dictionary, FIELDS.FINANCE.EX_JOURNAL_CAR_ID.dictionary, data[ r.key ] );
						}
						
						if ( r.key === FIELDS.FINANCE.EX_JOURNAL_INSURANCE.key ) {
							renderText = `${data.more[ FIELDS.FINANCE.EX_JOURNAL_INSURANCE_START.key ]} ~ ${data.more[ FIELDS.FINANCE.EX_JOURNAL_INSURANCE_END.key ]}`;
						}
						if ( r.key === FIELDS.FINANCE.EX_JOURNAL_SITE_LEASE.key ) {
							renderText = `${data.more[ FIELDS.FINANCE.EX_JOURNAL_SITE_LEASE_START.key ]} ~ ${data.more[ FIELDS.FINANCE.EX_JOURNAL_SITE_LEASE_END.key ]}`;
						}

						if ( r.key === FIELDS.FINANCE.EX_JOURNAL_CAR_LEASE.key ) {
							renderText = `${data.more[ FIELDS.FINANCE.EX_JOURNAL_CAR_LEASE_START.key ]} ~ ${data.more[ FIELDS.FINANCE.EX_JOURNAL_CAR_LEASE_END.key ]}`;
						}

						if ( r.key === FIELDS.FINANCE.PAY_MODE.key ) {
							renderText = getDictValue( dictionary, FIELDS.FINANCE.PAY_MODE.dictionary, data[ r.key ] );
						}
						
						if ( r.key === FIELDS.FINANCE.EX_JOURNAL_REPORTER.key ) {
							renderText = getDictValue( dictionary, FIELDS.FINANCE.EX_JOURNAL_REPORTER.dictionary, data[ r.key ] );
						}
						
						if ( r.formatter ) {
							renderText = r.formatter( data[ r.key ] );
						}
						
						
						return <Item key={r.key}
						             label={r.title}>{renderText}</Item>
					} )
				}
				{
					data.more.department && <Item label={'费用归属部门'}>{getDictValue( dictionary, 'depart_id', data.more.department)}</Item>
				}
				{
					data.more.employeeId && <Item label={'费用归属员工'}>{getDictValue( dictionary, 'employee_id', data.more.employeeId)}</Item>
				}
				{
					data.more.studentId && <Item label={'费用归属学员'}>{data.more.studentName}</Item>
				}
			</Descriptions>
		</Modal>
	);
};

export default Form.create()( InfoModal );
