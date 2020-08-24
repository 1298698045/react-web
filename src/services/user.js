import request from '@/utils/request';
import { BASE_URL, MOCK_BASE_URL, } from '@/config/url';

export async function query() {
	return request( '/api/users' );
}

// 获取用户驾校信息
export async function queryUserSchool( params ) {
	return request( BASE_URL + '/api/operationcenter/tenant/query-tenant-by-uid', {
		method: 'POST',
		data: params,
	} );
}

// 修改密码
export async function resetPassword( params ) {
	return request( BASE_URL + '/api/operationcenter/user/modify-password', {
		method: 'POST',
		data: params,
	} );
}

// 意见反馈
export async function feedback( params ) {
	return request( BASE_URL + '/api/leavemsg/save', {
		method: 'POST',
		data: params,
	} );
}
