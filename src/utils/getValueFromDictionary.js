const getValueFromDictionary = dictionary => data => fields => {
	const value = data[ fields.key ];
	
	// 没有值直接返回
	if ( !value && value !== 0 ) {
		return value;
	}
	
	// 有值且是字典
	if ( fields.dictionary ) {
		const dic = dictionary[ fields.dictionary ];
		
		if ( dic ) {
			// 需要展示多个值的
			if ( fields.type === 'checkbox' ) {
				// 字符串逗号分隔
				if ( typeof value === 'string' ) {
					const valueArray = value.split( ',' );
					return valueArray.map( v => {
						const dObj = dic.find( ( { dKey } ) => dKey === String( v ) );
						if ( dObj ) {
							return dObj.dValue;
						}
					} ).join( ',' );
				}
				
				// 数组
				if ( Array.isArray( value ) ) {
					return value.map( v => {
						return dic.find( ( { dKey } ) => dKey === String( v ) );
					} ).join( ',' );
				}
			}
			// 展示单个值
			const item = dic.find( ( { dKey } ) => dKey === String( value ) );
			
			// 字典内找到dKey
			if ( item ) {
				return fields.formatter ? fields.formatter( item.dValue ) : item.dValue;
			}
		}
	}
	
	// 有值不是字典
	return fields.formatter ? fields.formatter( value ) : value;
};

export default getValueFromDictionary;
