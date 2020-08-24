import React, { Fragment, useEffect } from 'react';
import { Input, Form } from 'antd';

const FormItem = Form.Item;

const { TextArea } = Input;

const TextareaItem = ( { className = '', style = {}, id, title, status, initialValue, needLabel, placeholder, parent, rules, form, } ) => {
	const { getFieldDecorator, } = form;
	
	return (
		<Fragment>
			{
				status === 'read' ?
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
									<TextArea autosize={{ minRows: 2, maxRows: 6 }} disabled={status === 'disabled'}
									          placeholder={!needLabel ? title : (placeholder || '请输入')}/>
								)
							}
						</FormItem>
					)
			}
		</Fragment>
	)
};

export default TextareaItem;
