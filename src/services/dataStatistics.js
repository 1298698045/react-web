import { stringify } from 'qs';
import request from '@/utils/request';
import { BASE_URL, MOCK_BASE_URL, } from '@/config/url';

// 获取报名统计-报名量
export async function getSignUpData ( params ){
	return request( BASE_URL + '/api/statistics/student/report', {
		method: 'POST',
		data: params,
	} );
}

// 获取报名统计-各tab项
export async function queryTab ( params ){
	return request( BASE_URL + '/api/statistics/student/by-tab', {
		method: 'POST',
		data: params,
	} );
}

// 获取约课统计-top
export async function getReserveClassData ( params ){
	return request( BASE_URL + '/api/statistics/student/record', {
		method: 'POST',
		data: params,
	} );
}

// 获取约课统计-各tab项
export async function queryReserveClassTab ( params ){
	return request( BASE_URL + '/api/statistics/student/record/by-tab', {
		method: 'POST',
		data: params,
	} );
}


// 获取成绩统计-top
export async function getScoreData ( params ){
	return request( BASE_URL + '/api/statistics/student/grade', {
		method: 'POST',
		data: params,
	} );
}

// 获取成绩统计-各tab项
export async function queryScoreTab ( params ){
	return request( BASE_URL + '/api/statistics/student/grade/by-tab', {
		method: 'POST',
		data: params,
	} );
}

// 获取收支统计-top
export async function getFinanceData ( params ){
	return request( BASE_URL + '/api/statistics/student/finance', {
		method: 'POST',
		data: params,
	} );
}

// 获取收支统计-各tab项
export async function queryFinanceTab ( params ){
	return request( BASE_URL + '/api/statistics/student/grade/by-tab', {
		method: 'POST',
		data: params,
	} );
}


export async function getSignUpTotal ( params ){
	return request( BASE_URL + '/api/statistics/student/total', {
		method: 'POST',
		data: params,
	} );
}

export async function getReserveClassTotal ( params ){
	return request( BASE_URL + '/api/statistics/student/record/total', {
		method: 'POST',
		data: params,
	} );
}
export async function getScoreTotal ( params ){
	return request( BASE_URL + '/api/statistics/student/grade/total', {
		method: 'POST',
		data: params,
	} );
}