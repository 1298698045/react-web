import React, { useState, useEffect, useMemo } from 'react';
import { Form, Table, Modal, Spin, Row, Col, Input, InputNumber, Select } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import { connect } from "dva";
import FIELDS from "@/config/fields";
import styles from './Goal.less';

const GoalEditModal = props => {
	const { availableYears, selectedRow, onSubmit, visible, setVisible, form, confirmLoading, dictionary } = props;
	const { getFieldDecorator } = form;
	const [ totals, setTotals ] = useState( {} );
	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth() + 1;

	let years = [ ...availableYears ];
	if ( selectedRow.length && selectedRow[ 0 ].year ) {
		years = [ '' + selectedRow[ 0 ].year ];
	}

	const months = [];
	for ( let m = 1; m <= 12; ++m ) {
		months.push( 'm' + m );
	}

	const onOk = e => {
		e.preventDefault();

		// eslint-disable-next-line consistent-return
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			onSubmit( dictionary.license_type.map( v => {
				const data = {
					year: fieldsValue.year,
					licenseType: v.dKey,
				};
				if ( selectedRow.find( d => d.licenseType === v.dKey ) ) data.id = selectedRow.find( d => d.licenseType === v.dKey ).id;
				months.forEach( month => {
					const key = `${v.dKey}-${month}`;
					data[ month ] = fieldsValue[ key ];
				} );
				return data;
			} ) );
		} );
	};
	const onCancel = e => {
		e.preventDefault();

		setVisible( false );
	};

	const columns = [
		{
			title: '类型',
			dataIndex: 'licenseType',
			key: 'licenseType',
		},
	];
	for ( let i = 1; i <= 12; ++i ) {
		columns.push( {
			title: i + '月',
			dataIndex: 'm' + i,
			key: 'm' + i,
		} );
	}
	columns.push( {
		title: '合计',
		dataIndex: 'total',
		key: 'total',
	} );


	useEffect( function () {
		if ( visible ) {
			const values = form.getFieldsValue();
			let _totals = {};
			selectedRow.forEach( ( { licenseType } ) => {
				let total = 0;
				months.forEach( month => {
					const key = `${licenseType}-${month}`;
					total += Number( values[ key ] ) || 0;
				} );
				_totals[ licenseType ] = total;
			} );
			setTotals( _totals );
		}
	}, [ visible ] );


	const onInputChange = ( e ) => {
		const [ licenseType, thisMonth ] = e.target.id.split( '-' );
		const values = form.getFieldsValue();
		let total = 0;
		months.forEach( month => {
			const key = `${licenseType}-${month}`;
			total += Number( month === thisMonth ? e.target.value : values[ key ] ) || 0;
		} );
		setTotals( {
			...totals,
			[ licenseType ]: total,
		} );
	};

	const data = ( () => {
		if ( !dictionary.license_type ) return [];
		const licenseTypes = dictionary.license_type.filter( v => v.dictSwitch == 1 ).map( v => v.dKey );
		selectedRow.forEach( v => {
			if ( v.total[ 0 ] && licenseTypes.indexOf( v.licenseType ) < 0 ) {
				licenseTypes.push( v.licenseType );
			}
		} );
		return licenseTypes.map( licenseType => {
			const obj = {
				key: licenseType,
				licenseType,
				total: totals[ licenseType ] || 0,
			};
			months.forEach( month => {
				const key = `${licenseType}-${month}`;
				let initialValue = 0;
				if ( selectedRow.length ) {
					const licenseTypeData = selectedRow.find( v => v.licenseType === licenseType );
					if ( licenseTypeData ) initialValue = licenseTypeData[ month ][ 0 ];
				}
				obj[ month ] = <Form.Item key={key}>
					{getFieldDecorator( key, {
						initialValue: initialValue,
						rules: [ { required: true, message: '该项为必填！' } ],
					} )(
						<Input style={{ padding: 3 }}
						       disabled={currentYear > Number( form.getFieldValue( 'year' ) ) || ( currentYear == Number( form.getFieldValue( 'year' ) ) && currentMonth > Number( month.substr( 1 ) ) )}
						       onChange={onInputChange}/>
					)}
				</Form.Item>;
			} );
			return obj;
		} );
	} )();

	return (
		<Modal
			destroyOnClose
			title={( selectedRow.length ? '修改' : '新增' ) + '招生目标'}
			width="90%"
			visible={visible}
			onOk={onOk}
			onCancel={onCancel}
			closable={true}
			maskClosable={false}
			keyboard={false}
			confirmLoading={confirmLoading}
			okText="提交"
			cancelText="取消"
			className={styles.modal}
		>
			<Form onSubmit={onOk}>
				<Row gutter={24}>
					<Col xs={24} ms={12} md={8} lg={6}>
						<Form.Item>
							{getFieldDecorator( 'year', {
								initialValue: years.length ? years[ 0 ] : '',
								rules: [ { required: true, message: '该项为必填！' } ],
							} )( <Select placeholder="请选择年份">
								{years.map( year => <Select.Option key={year} value={year}>{year}年</Select.Option> )}
							</Select> )}
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={24}>
					<Col xs={24}>
						<Table dataSource={data} columns={columns} scroll={{ x: 'max-content' }}
						       pagination={false}/>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default connect( (
	{
		dictionary,
		loading,
		global
	}
) => (
	{
		dictionary,
		loading,
		global,
	}
) )( Form.create()( GoalEditModal ) );
