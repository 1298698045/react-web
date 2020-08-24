import React, { Fragment } from 'react';
import { DatePicker, Form } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const FormItem = Form.Item;

const RangeDateItem = ( { className, style, id, title, status = 'edit', initialValue, getFieldDecorator, needLabel, placeholder, parent, rules, } ) => {
	
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
								getFieldDecorator( parent ? `${parent}.${id}` : id, { initialValue, rules, } )(
									<RangePicker
										showTime 
										style={{ width: '100%' }}
										disabled={status === 'disabled'}
										placeholder={!needLabel ? title : (placeholder || [ '开始日期', '结束日期' ])}
										ranges={{
											'今天': [ moment(), moment() ],
											'本月': [ moment().startOf( 'month' ), moment().endOf( 'month' ) ],
										}}
									/>
								)
							}
						</FormItem>
					)
			}
		</Fragment>
	);
};

export default RangeDateItem;
