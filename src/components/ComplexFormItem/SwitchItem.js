import React, { Fragment } from 'react';
import { Form, Switch } from 'antd';

const FormItem = Form.Item;

const RadioItem = ( { className = '', style = {}, id, title, status = 'edit', initialValue = false, getFieldDecorator, parent, rules, needLabel, checkedChildren = '开', unCheckedChildren = '关', } ) => (
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
								initialValue,
								rules,
								valuePropName: 'checked',
							} )(
								<Switch disabled={status === 'disabled'}
								        checkedChildren={checkedChildren}
								        unCheckedChildren={unCheckedChildren}
								/>
							)
						}
					</FormItem>
				)
		}
	</Fragment>
);

export default RadioItem;
