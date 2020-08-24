import React, { Fragment } from 'react';
import { Cascader, Form } from 'antd';
import data from '@/assets/jx_division';

const FormItem = Form.Item;

const { province, city, district, } = data;

district.forEach( area => {
	const matchCity = city.filter( city => city.id === area.pid )[ 0 ];
	if ( matchCity ) {
		matchCity.children = matchCity.children || [];
		matchCity.children.push( {
			label: area.name,
			value: area.id,
		} );
	}
} );

city.forEach( city => {
	const matchProvince = province.filter(
		province => province.id === city.pid
	)[ 0 ];
	if ( matchProvince ) {
		matchProvince.children = matchProvince.children || [];
		matchProvince.children.push( {
			label: city.name,
			value: city.id,
			children: city.children
		} );
	}
} );

const options = province.map( province => ({
	label: province.name,
	value: province.id,
	children: province.children,
}) );

const DateItem = ( { className, style, id, title, status = 'edit', initialValue = null, getFieldDecorator, needLabel, placeholder, parent, rules, } ) => {
	return (
		<Fragment>
			{
				status === 'read'
					?
					(
						<FormItem style={style} className={className} label={needLabel ? title : null}>
							<span className="ant-form-text"
							      style={{ marginTop: 4, marginBottom: 7, }}>{initialValue}</span>
						</FormItem>
					)
					:
					(
						<FormItem style={style} className={className} label={needLabel ? title : null}>
							{
								getFieldDecorator( parent ? `${parent}.${id}` : id, {
									initialValue: initialValue,
									rules,
								} )(
									<Cascader
										options={options}
										showSearch
										style={{ width: '100%' }}
										disabled={status === 'disabled'}
										placeholder={!needLabel ? title : (placeholder || '请选择')}
									/>
								)
							}
						</FormItem>
					)
			}
		</Fragment>
	);
};

export default DateItem;
