import { stringify } from 'qs';
import request from '@/utils/request';
import { BASE_URL, MOCK_BASE_URL, } from '@/config/url';
import { doGetCarList, doSaveCar, doGetCarInfo, doGetSiteList, doSaveSite, doGetSiteInfo, } from './asset';

export async function queryProjectNotice (){
	return request( '/api/project/notice' );
}

export async function queryActivities (){
	return request( '/api/activities' );
}

export async function queryRule ( params ){
	return request( `/api/rule?${stringify( params )}` );
}

export async function removeRule ( params ){
	return request( '/api/rule', {
		method: 'POST',
		data: {
			...params,
			method: 'delete',
		},
	} );
}

export async function addRule ( params ){
	return request( '/api/rule', {
		method: 'POST',
		data: {
			...params,
			method: 'post',
		},
	} );
}

export async function updateRule ( params = {} ){
	return request( `/api/rule?${stringify( params.query )}`, {
		method: 'POST',
		data: {
			...params.body,
			method: 'update',
		},
	} );
}

export async function fakeSubmitForm ( params ){
	return request( '/api/forms', {
		method: 'POST',
		data: params,
	} );
}

export async function fakeChartData (){
	return request( '/api/fake_chart_data' );
}

export async function queryTags (){
	return request( '/api/tags' );
}

export async function queryBasicProfile ( id ){
	return request( `/api/profile/basic?id=${id}` );
}

export async function queryAdvancedProfile (){
	return request( '/api/profile/advanced' );
}

export async function queryFakeList ( params ){
	return request( `/api/fake_list?${stringify( params )}` );
}

export async function removeFakeList ( params ){
	const { count = 5, ...restParams } = params;
	return request( `/api/fake_list?count=${count}`, {
		method: 'POST',
		data: {
			...restParams,
			method: 'delete',
		},
	} );
}

export async function addFakeList ( params ){
	const { count = 5, ...restParams } = params;
	return request( `/api/fake_list?count=${count}`, {
		method: 'POST',
		data: {
			...restParams,
			method: 'post',
		},
	} );
}

export async function updateFakeList ( params ){
	const { count = 5, ...restParams } = params;
	return request( `/api/fake_list?count=${count}`, {
		method: 'POST',
		data: {
			...restParams,
			method: 'update',
		},
	} );
}

export async function accountLogin ( params ){
	return request( `${BASE_URL}/api/operationcenter/user/login`, {
		method: 'POST',
		data: { params },
	} );
}

export async function fakeAccountLogin ( params ){
	return request( '/api/login/account', {
		method: 'POST',
		data: params,
	} );
}

export async function fakeRegister ( params ){
	return request( '/api/register', {
		method: 'POST',
		data: params,
	} );
}

export async function queryNotices ( params = {} ){
	return request( `/api/notices?${stringify( params )}` );
}

export async function getFakeCaptcha ( mobile ){
	return request( `/api/captcha?mobile=${mobile}` );
}

export async function getOperationLog (){
	return request( `${MOCK_BASE_URL}/api/operate_log`, {
		method: 'POST',
	} );
}

/**
 * 学员报名
 * @param params 报名信息
 * @returns {Promise<*>}
 */
export async function doSaveStudent ( params ){
	return request( `${BASE_URL}/api/student/save`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 获取字典
 * @returns {Promise<*>}
 */
export async function doGetDictionary (){
	return request( `${BASE_URL}/api/dictionary`, {
		method: 'POST',
	} );
}

/**
 * 获取学员列表
 * @param params 查询参数
 * @returns {Promise<*>}
 */
export async function doGetStudentList ( params ){
	return request( `${BASE_URL}/api/student/query-report-student`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 财务管理待收费列表
 * @param params
 * @returns {Promise<*>}
 */
export async function doGetFinanceChargeSignUpList ( params ){
	return request( `${BASE_URL}/api/student/finance/query`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 财务管理绩效数据报表
 * @param params
 * @returns {Promise<*>}
 */
export async function doGetWagePerformanceDataReportList ( params ){
	return request( `${BASE_URL}/api/finance/performance/list`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 财务管理绩效数据报表导出
 * @param params
 * @returns {Promise<*>}
 */
export async function doGetWagePerformanceDataReportListExport ( params ){
	return request( `${BASE_URL}/api/finance/performance/export`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 财务管理工资登记
 * @param params
 * @returns {Promise<*>}
 */
export async function doGetWageRegistrationYearList ( params ){
	return request( `${BASE_URL}/api/finance/salary/list`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 财务管理工资登记
 * @param params
 * @returns {Promise<*>}
 */
export async function doGetWageRegistrationMonthList ( params ){
	return request( `${BASE_URL}/api/finance/salary/list`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 财务管理工资登记列表
 * @param params
 * @returns {Promise<*>}
 */
export async function doGetWageRegistrationList ( params ){
	return request( `${BASE_URL}/api/finance/salary/batch/list`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 财务管理工资导入
 * @param params
 * @returns {Promise<*>}
 */
export async function doUploadWageRegistrationList ( params ){
	return request( `${BASE_URL}/api/finance/salary/import`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 财务管理删除
 * @param params
 * @returns {Promise<*>}
 */
export async function doDelWageRegistrationList ( params ){
	return request( `${BASE_URL}/api/finance/salary/batch/del`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 财务管理待收费确认收费
 * @param params
 * @returns {Promise<*>}
 */
export async function doInsureFinanceChargeSignUp ( params ){
	return request( `${BASE_URL}/api/student/finance/insure`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 财务管理其它业务收入确认收费
 * @param params
 * @returns {Promise<*>}
 */
export async function doInsureFinanceChargeOther ( params ){
	return request( `${BASE_URL}/api/student/finance/other/insure`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 财务管理待收费驳回
 * @param params
 * @returns {Promise<*>}
 */
export async function doRejectFinanceChargeSignUp ( params ){
	return request( `${BASE_URL}/api/student/finance/reject`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 财务管理其它业务收入驳回
 * @param params
 * @returns {Promise<*>}
 */
export async function doRejectFinanceChargeOther ( params ){
	return request( `${BASE_URL}/api/student/finance/other/reject/${params}`, {
		method: 'POST',
	} );
}

/**
 * 财务管理待收费补交学费，班型变更费，补考费，课时费，添加代培科目费,其它业务收入
 * @param params
 * @returns {Promise<*>}
 */
export async function doGetFinanceChargeOther ( params ){
	return request( `${BASE_URL}/api/student/finance/other/query`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 财务管理收入管理 - 其它营收列表
 * @param params
 * @returns {Promise<*>}
 */
export async function doGetFinanceJournal ( params ){
	return request( `${BASE_URL}/api/finance/journal/list`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 财务管理打印收据
 * @param params
 * @returns {Promise<*>}
 */
export async function doPrintReceipt ( params ){
	return request( `${BASE_URL}/api/student/finance/print/receipt`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 财务管理导出报表
 * @param params
 * @returns {Promise<*>}
 */
export async function doExportList ( params ){
	return request( `${BASE_URL}/api/student/export/report-finance`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 财务管理收入管理 - 添加、修改其它营收
 * @param params
 * @returns {Promise<*>}
 */
export async function doSaveFinanceJournal ( params ){
	return request( `${BASE_URL}/api/finance/journal/save`, {
		method: 'POST',
		data: params,
	} );
}
/**
 * 财务管理收入管理 - 删除其它营收
 * @param params
 * @returns {Promise<*>}
 */
export async function doDelFinanceJournal ( params ){
	return request( `${BASE_URL}/api/finance/journal/del`, {
		method: 'POST',
		data: params,
	} );
}
// 财务管理主营业务导出
export async function exportExpenditure ( params ){
	return request( `${BASE_URL}/api/finance/journal/export`, {
		method: 'POST',
		data: params,
	} );
}
/**
 * 工作台-财务收支
 * @param params
 * @returns {Promise<*>}
 */
export async function doGetFinancePreview ( params ){
	return request( `${BASE_URL}/api/workplatform/finance`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 工作台-todoList
 * @param params
 * @returns {Promise<*>}
 */
export async function doGetTodoList ( params ){
	return request( `${BASE_URL}/api/workplatform/todolist`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 工作台-财务收支
 * @param params
 * @returns {Promise<*>}
 */
export async function doGetArchivePreview ( params ){
	return request( `${BASE_URL}/api/workplatform/document`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 工作台-考试情况
 * @param params
 * @returns {Promise<*>}
 */
export async function doGetExamPreview ( params ){
	return request( `${BASE_URL}/api/workplatform/exam`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 工作台-学员活跃度
 * @param params
 * @returns {Promise<*>}
 */
export async function doGetActivePreview ( params ){
	return request( `${BASE_URL}/api/workplatform/active`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 工作台-学员信息
 * @param params
 * @returns {Promise<*>}
 */
export async function doGetStudentPreview ( params ){
	return request( `${BASE_URL}/api/workplatform/student`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 工作台-招生报名
 * @param params
 * @returns {Promise<*>}
 */
export async function doGetSignUpChart ( params ){
	return request( `${BASE_URL}/api/workplatform/recruit`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 工作台-约课情况
 * @param params
 * @returns {Promise<*>}
 */
export async function doGetBookChart ( params ){
	return request( `${BASE_URL}/api/workplatform/book`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 教务管理获取课时列表
 * @param params
 * @returns {Promise<*>}
 */
export async function doGetTeachingLessonList ( params ){
	return request( `${BASE_URL}/api/education/query-time-plan`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 教务管理获取课时详情
 * @param params
 * @returns {Promise<*>}
 */
export async function doGetTeachingLessonInfo ( params ){
	return request( `${BASE_URL}/api/education/get-time-plan`, {
		method: 'POST',
		data: params,
	} );
}


export {
	doGetCarList,
	doSaveCar,
	doGetCarInfo,
	doGetSiteList,
	doSaveSite,
	doGetSiteInfo,
};
