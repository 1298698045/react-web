import request from '@/utils/request';
import { BASE_URL, MOCK_BASE_URL, } from '@/config/url';

/**
 * 退费审核列表
 * @param params
 * @returns {Promise<*>}
 */
export const doGetRefundList = async params => {
	return request( `${BASE_URL}/api/student/refund/query`, {
		method: 'POST',
		data: params,
	} );
};

/**
 * 退费提报
 * @param params
 * @returns {Promise<*>}
 */
export const doReportRefund = async params => {
	return request( `${BASE_URL}/api/student/refund/report`, {
		method: 'POST',
		data: params,
	} );
};

/**
 * 退费撤销
 * @param params
 * @returns {Promise<*>}
 */
export const doCancelRefund = async params => {
	return request( `${BASE_URL}/api/student/refund/cancel`, {
		method: 'POST',
		data: params,
	} );
};

/**
 * 退费撤回
 * @param params
 * @returns {Promise<*>}
 */
export const doRevokeRefund = async params => {
	return request( `${BASE_URL}/api/student/refund/pickup`, {
		method: 'POST',
		data: params,
	} );
};

/**
 * 退费支出
 * @param params
 * @returns {Promise<*>}
 */
export const doExpenditureRefund = async params => {
	return request( `${BASE_URL}/api/student/refund/pay`, {
		method: 'POST',
		data: params,
	} );
};

/**
 * 退费审核接口
 * @param params
 * @returns {Promise<*>}
 */
export const doSaveRefundResult = async params => {
	return request( `${BASE_URL}/api/student/refund/approve`, {
		method: 'POST',
		data: params,
	} );
};

