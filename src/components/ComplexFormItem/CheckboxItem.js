import React, { Fragment } from 'react';
import { Form, Checkbox } from 'antd';

const { Group } = Checkbox;
const FormItem = Form.Item;

const CheckboxItem = ( { className = '', style = {}, id, title, status = 'edit', initialValue = '', getFieldDecorator, values, parent, rules, needLabel, } ) => {
	const Opts = values.map( ( { dKey, dValue, disabled = false, } ) => {
		return <Checkbox key={dKey} value={dKey} disabled={disabled}>{dValue}</Checkbox>;
	} );
	
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
									initialValue: initialValue === '' ? [] : (typeof initialValue === 'string' ? initialValue.split(',') : initialValue),
									rules,
								} )(
									<Group disabled={status === 'disabled'} style={{ marginTop: 4 }}>
										{[ ...Opts ]}
									</Group>
								)
							}
						</FormItem>
					)
			}
		</Fragment>
	);
};

export default CheckboxItem;
