import React, { Fragment } from 'react';
import { Form, Select, Cascader, } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;

const getOptions = values => {
	return values.map( v => {
		if ( v.children && v.children.length > 0 ) {
			return {
				dKey: v.dKey,
				value: v.dKey,
				dValue: v.dValue,
				label: v.dValue,
				children: getOptions( v.children ),
			}
		} else {
			return {
				dKey: v.dKey,
				value: v.dKey,
				dValue: v.dValue,
				label: v.dValue,
			}
		}
	} );
};

const SelectItem = ( { className = '', style = {}, id, title, status = 'edit', initialValue = undefined, getFieldDecorator, needLabel, values, parent, rules, mode = null, maxTagCount = 1, allowClear = true, useDefault = false, } ) => {
	let Opts;
	if ( mode !== 'cascader' ) {
		Opts = values.map( ( { dKey, dValue, disabled } ) => {
			return <Option key={dKey} value={dKey} title={dValue} disabled={disabled}>{dValue}</Option>;
		} );
	} else {
		Opts = getOptions( values );
	}
	
	
	if ( mode === 'multiple' && initialValue === '' ) {
		initialValue = undefined;
	}
	if ( useDefault && initialValue === undefined ) {
		initialValue = (values.find( v => v.isDefault == 1 ) || {})[ 'dKey' ];
	}
	return (
		<Fragment>
			{
				status === 'read'
					?
					(
						<FormItem style={style} className={className} label={needLabel ? title : null}>
							<span className="ant-form-text"
							      style={{
								      marginTop: 4,
								      marginBottom: 7,
							      }}>{values.length > 0 ? (values.find( ( { dKey } ) => dKey === initialValue ) ? values.find( ( { dKey } ) => dKey === initialValue ).dValue : '') : initialValue}</span>
						</FormItem>
					)
					:
					(
						<FormItem style={style} className={className} label={needLabel ? title : null}>
							{
								getFieldDecorator( parent ? `${parent}.${id}` : id, {
									initialValue: mode === 'multiple'
										?
										(initialValue === undefined ? [] : (typeof initialValue === 'string' ? initialValue.split( ',' ) : initialValue))
										:
										(initialValue === undefined ? undefined : initialValue),
									rules,
								} )(
									mode !== 'cascader'
										?
										<Select
											showSearch
											allowClear={allowClear}
											mode={mode}
											maxTagCount={maxTagCount}
											disabled={status === 'disabled'}
											placeholder={!needLabel ? title : '请选择'}
											optionFilterProp="title"
										>
											{[ ...Opts ]}
										</Select>
										:
										<Cascader
											options={Opts}
											placeholder={!needLabel ? title : '请选择'}
										/>
								)
							}
						</FormItem>
					)
			}
		</Fragment>
	);
};

export default SelectItem;
