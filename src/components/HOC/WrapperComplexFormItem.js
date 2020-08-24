import React, { useEffect } from 'react';
import { useEffectOnce } from 'react-use';
import ComplexFormItem from '@/components/ComplexFormItem';
import { connect } from 'dva';
import { queryDictionary } from '@/utils/dictionaryUtil';

/**
 * 表单子项高阶函数
 * @param form 用于生成表单组件。具体请查看{@link https://ant.design/components/form-cn/}
 * @param config 表单key和title
 * @param status 组件状态 read/edit/disabled
 * @param initialValue 组件初始值
 * @param needLabel 是否展示label
 * @param restProps 剩余props，例如style
 * @returns {function(*): *}
 */
const WrapperComplexFormItem = ( { config, form, status = 'edit', initialValue = undefined, needLabel = true, dictionary, values, className = '', style = {}, parent, rules, addonAfter, addonBefore, checkedChildren, unCheckedChildren, mode, maxTagCount, dispatch, loading, defaultValue, onChange, min, max, formatter, parser, disabledMonth, allowClear, useDefault, onOpenChange, } ) => {
	const { getFieldDecorator } = form;
	const { key, title, type, placeholder, dictSwitch } = config;

	if ( rules ) {
		const required = rules.find( v => v.required === true );
		if ( required && required.message === undefined ) {
			required.message = `请${( type === 'input' || type === 'inputNumber' || type === 'textarea' ) ? '输入' : '选择'}${title}`;
		}
	}

	const itemDictionary = dictionary[ config.dictionary ];
	useEffectOnce( () => {
		if ( !values && config.dictionary && !itemDictionary && !loading.effects[ `dictionary/${config.dictionary}` ] ) {
			queryDictionary( dispatch, config.dictionary );
		}
	} );

	useEffect( () => {
		onChange && onChange( key, form.getFieldValue( parent ? `${parent}.${key}` : key ) );
	}, [ form.getFieldValue( parent ? `${parent}.${key}` : key ), dictionary ] );

	let initialValueString;
	if ( initialValue === undefined ) {
		if ( defaultValue || ( type === 'inputNumber' && defaultValue === 0 ) ) {
			initialValueString = defaultValue;
		} else {
			initialValueString = undefined;
		}
	} else {
		if ( itemDictionary ) {
			if ( Array.isArray( initialValue ) ) {
				initialValueString = initialValue.map( v => String( v ) );
			} else {
				initialValueString = String( initialValue );
			}
		} else {
			initialValueString = initialValue;
		}
	}

	const itemValues = ( values || itemDictionary || [] ).filter( v => {
		if ( Array.isArray( initialValueString ) && initialValueString.find( v2 => v2 == v.dKey ) ) return true;
		return dictSwitch === undefined || v.dictSwitch == dictSwitch;
	} );

	return (
		<ComplexFormItem
			className={className}
			style={style}
			values={itemValues}
			rules={rules}
			id={key}
			parent={parent}
			title={title}
			type={type}
			placeholder={placeholder}
			status={status}
			initialValue={initialValueString}
			needLabel={needLabel}
			getFieldDecorator={getFieldDecorator}
			form={form}
			addonAfter={addonAfter}
			addonBefore={addonBefore}
			checkedChildren={checkedChildren}
			unCheckedChildren={unCheckedChildren}
			mode={mode}
			maxTagCount={maxTagCount}
			min={min}
			max={max}
			formatter={formatter}
			parser={parser}
			disabledMonth={disabledMonth}
			allowClear={allowClear}
			useDefault={useDefault}
			onOpenChange={onOpenChange}
			{...config.props}
		/>
	)
};

export default connect( ( { dictionary, loading } ) => ( { dictionary, loading } ) )( WrapperComplexFormItem );
