import React, { Fragment } from 'react';
import { DatePicker, Form } from 'antd';
import moment from 'moment';

const { MonthPicker, } = DatePicker;
const FormItem = Form.Item;

const DateItem = ( { className, style, id, title, status = 'edit', initialValue = null, getFieldDecorator, needLabel, placeholder, parent, rules, mode, disabledMonth } ) => (
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
								initialValue: (initialValue === '' || initialValue === null) ? null : moment( initialValue ),
								rules,
							} )(
								mode === 'month'
									?
									<MonthPicker
										disabledDate={current => disabledMonth.find( d => moment( d ).format( 'YYYY-MM' ) === moment( current ).format( 'YYYY-MM' ) )}
										style={{ width: '100%' }}
										disabled={status === 'disabled'}
										placeholder={!needLabel ? title : (placeholder || '请选择')}
									/>
									: <DatePicker
										// mode={mode}
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

export default DateItem;
