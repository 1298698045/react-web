import React, { Fragment } from 'react';
import { TimePicker, Form } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

const DateItem = ( { className, style, id, title, status = 'edit', initialValue = null, getFieldDecorator, needLabel, placeholder, parent, rules, disabledHours = () => {}, disabledMinutes = () => {}, disabledSeconds = () => {}, hourStep = 1, minuteStep = 15, format = 'HH:mm',onOpenChange=()=>{}, } ) => {
	
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
									initialValue: initialValue ? moment( initialValue, format ) : null,
									rules,
								} )(
									<TimePicker
										style={{ width: '100%' }}
										disabled={status === 'disabled'}
										format={format}
										disabledHours={disabledHours}
										disabledMinutes={disabledMinutes}
										disabledSeconds={disabledSeconds}
										placeholder={!needLabel ? title : (placeholder || '请选择')}
										minuteStep={minuteStep}
										hourStep={hourStep}
										onOpenChange={onOpenChange}
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
