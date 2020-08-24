import React, { Fragment } from 'react';
import { Input, Form, InputNumber, } from 'antd';

const FormItem = Form.Item;

const { Password } = Input;

const InputItem = ( { className = '', style = {}, id, title, status, initialValue, getFieldDecorator, needLabel, placeholder, parent, rules, addonAfter = null, addonBefore = null, number = false, min, max, formatter, parser, mode, } ) => {
	const InputCom = number ? InputNumber : (mode === 'pwd' ? Password : Input);
	
	return (
		<Fragment>
			{
				status === 'read'
					?
					(
						<FormItem style={style} className={className} label={needLabel ? title : null}>
							{/* 为了初始化form项，只做隐藏 */}
							{
								<div style={{display: 'none'}}>
								{getFieldDecorator( parent ? `${parent}.${id}` : id, { initialValue, rules, } )(
									<InputCom disabled={status === 'disabled'} 
									          style={{ width: '100%' }}
									          placeholder={!needLabel ? title : (placeholder || '请输入')}
									          addonAfter={addonAfter}
									          addonBefore={addonBefore}
									          min={min}
									          max={max}
									          formatter={formatter}
									          parser={parser}
									/>
								)}</div>
							}
							<span className="ant-form-text"
							      style={{ marginTop: 4, marginBottom: 7, }}>{mode === 'pwd' ? (initialValue + '').replace(/[0-9]/gi, '*') : initialValue} {addonAfter}</span>
						</FormItem>
					)
					:
					(
						<FormItem style={style} className={className} label={needLabel ? title : null}>
							{
								getFieldDecorator( parent ? `${parent}.${id}` : id, { initialValue, rules, } )(
									<InputCom disabled={status === 'disabled'}
									          style={{ width: '100%' }}
									          placeholder={!needLabel ? title : (placeholder || '请输入')}
									          addonAfter={addonAfter}
									          addonBefore={addonBefore}
									          min={min}
									          max={max}
									          formatter={formatter}
									          parser={parser}
									/>
								)
							}
						</FormItem>
					)
			}
		</Fragment>
	)
};

export default InputItem;
