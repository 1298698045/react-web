import React, { Fragment } from 'react';
import { Form, Radio } from 'antd';

const { Group } = Radio;
const FormItem = Form.Item;

const RadioItem = ( { className = '', style = {}, id, title, status = 'edit', initialValue, getFieldDecorator, values, parent, rules, needLabel, mode = '', } ) => {
	const Opts = values.map( ( { dKey, dValue } ) => {
		if ( mode === 'button' ) return <Radio.Button key={dKey} value={dKey}>{dValue}</Radio.Button>;
		return <Radio key={dKey} value={dKey}>{dValue}</Radio>;
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
								getFieldDecorator( parent ? `${parent}.${id}` : id, { initialValue, rules, } )(
									<Group disabled={status === 'disabled'} style={{ marginTop: 0 }}>
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

export default RadioItem;
