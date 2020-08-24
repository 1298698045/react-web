import request from '@/utils/request';
import { BASE_URL, MOCK_BASE_URL, } from '@/config/url';

/**
 * 增值服务列表
 * @param params
 * @returns {Promise<*>}
 */
export const doGetValueAddedList = async params => {
	return request( `${BASE_URL}/api/value-added/list`, {
		method: 'POST',
		data: params,
	} );
};

// 增值服务列表（不分页）
export async function doAllGetValueAdded( params ) {
	return request( `${BASE_URL}/api/value-added/get-all`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 增值服务保存
 * @param params
 * @returns {Promise<*>}
 */
export const doSaveValueAdded = async params => {
	return request( `${BASE_URL}/api/value-added/save`, {
		method: 'POST',
		data: params,
	} );
};
