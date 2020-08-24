import request from '@/utils/request';
import { BASE_URL, MOCK_BASE_URL, } from '@/config/url';

/**
 * 资产管理拉取车辆列表
 * @param params
 * @returns {Promise<*>}
 */
export const doGetCarList = async params => {
	return request( `${BASE_URL}/api/assetmanage/query-car-by-page`, {
		method: 'POST',
		data: params,
	} );
};

/**
 * 资产管理保存车辆信息
 * @param params
 * @returns {Promise<*>}
 */
export const doSaveCar = async params => {
	return request( `${BASE_URL}/api/assetmanage/save-car`, {
		method: 'POST',
		data: params,
	} );
};

/**
 * 资产管理查看车辆信息
 * @param params
 * @returns {Promise<*>}
 */
export const doGetCarInfo = async params => {
	return request( `${BASE_URL}/api/assetmanage/get-car`, {
		method: 'POST',
		data: params,
	} );
};

/**
 * 资产管理拉取所有车辆列表
 * @param params
 * @returns {Promise<*>}
 */
export const doGetAllCarList = async params => {
	return request( `${BASE_URL}/api/assetmanage/query-car`, {
		method: 'POST',
		data: params,
	} );
};


/**
 * 资产管理拉取场地列表
 * @param params
 * @returns {Promise<*>}
 */
export const doGetSiteList = async params => {
	return request( `${BASE_URL}/api/assetmanage/query-site-by-page`, {
		method: 'POST',
		data: params,
	} );
};

/**
 * 资产管理拉取所有场地列表
 * @param params
 * @returns {Promise<*>}
 */
export const doGetAllSiteList = async params => {
	return request( `${BASE_URL}/api/assetmanage/query-site`, {
		method: 'POST',
		data: params,
	} );
};

/**
 * 资产管理保存场地信息
 * @param params
 * @returns {Promise<*>}
 */
export const doSaveSite = async params => {
	return request( `${BASE_URL}/api/assetmanage/save-site`, {
		method: 'POST',
		data: params,
	} );
};

/**
 * 资产管理查看场地信息
 * @param params
 * @returns {Promise<*>}
 */
export const doGetSiteInfo = async params => {
	return request( `${BASE_URL}/api/assetmanage/get-site`, {
		method: 'POST',
		data: params,
	} );
};


/**
 * 资产管理拉取未绑定员工车辆列表
 * @param params
 * @returns {Promise<*>}
 */
export const doGetUnbindCarList = async params => {
	return request( `${BASE_URL}/api/assetmanage/query-unbind-car`, {
		method: 'POST',
		data: params,
	} );
};
