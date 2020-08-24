/**
 * 拉取字典某一项
 * @param dispatch
 * @param dictKey
 * @returns {*}
 */
export const queryDictionary = ( dispatch, dictKey ) => {
	return dispatch( {
		type: 'dictionary/get',
		dictKey,
		dispatch,
	} );
};
/**
 * 强制更新字典某一项
 * @param dispatch
 * @param dictKey
 * @returns {*}
 */
export const refreshDictionary = ( dispatch, dictKey ) => {
	return dispatch( {
		type: 'dictionary/' + dictKey,
		dictKey,
	} );
};
/**
 * 获取字典某一项dKey对应的item
 * @param dictionary
 * @param dictKey
 * @param dKey
 * @returns {*}
 */
export const getDictItem = ( dictionary, dictKey, dKey ) => {
	if ( dictionary && dictionary[ dictKey ] ) {
		const item = dictionary[ dictKey ].find( v => v.dKey == dKey );
		return item;
	}
};
/**
 * 获取字典某一项dKey对应的item的dValue值
 * @param dictionary
 * @param dictKey
 * @param dKey
 * @returns {*}
 * @example: getDictValue(dictionary, 'student_type', '2') // "委培"
 */
export const getDictValue = ( dictionary, dictKey, dKey ) => {
	if ( dictionary && dictionary[ dictKey ] ) {
		const item = dictionary[ dictKey ].find( v => v.dKey == dKey );
		return item ? item.dValue : dKey;
	}
	return dKey;
};
/**
 * 获取字典某一项dKey对应的item的某一项值
 * @param dictionary
 * @param dictKey
 * @param dKey
 * @param key
 * @returns {*}
 */
export const getDictItemValue = ( dictionary, dictKey, dKey ) => key => {
	const item = getDictItem( dictionary, dictKey, dKey );
	return item && item[ key ];
};
