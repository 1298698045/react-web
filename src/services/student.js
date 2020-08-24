import { stringify } from 'qs';
import request from '@/utils/request';
import { BASE_URL, MOCK_BASE_URL, } from '@/config/url';

// 获取学员详情
export async function doGetStudentInfo( params ) {
	return request( `${BASE_URL}/api/student/query/${params}`, {
		method: 'POST',
	} );
}

// 建档列表
export async function queryArchiveList( params ) {
	return request( BASE_URL + '/api/student/query-document', {
		method: 'POST',
		data: params,
	} );
}

// 打印档案袋
export async function printArchiveBag( payload ) {
	return request( BASE_URL + '/api/student/print-document-info/' + payload.params.id, {
		method: 'POST',
		data: payload,
	} );
}

// 打印体检表
export async function printHealthForm( payload ) {
	return request( BASE_URL + '/api/student/print-heath-table/' + payload.params.id, {
		method: 'POST',
		data: payload,
	} );
}

// 暂缓建档
export async function delayArchive( params ) {
	return request( BASE_URL + '/api/student/update-document-status', {
		method: 'POST',
		data: params,
	} );
}

// 终止建档
export async function stopArchive( params ) {
	return request( BASE_URL + '/api/student/update-document-status', {
		method: 'POST',
		data: params,
	} );
}

// 待建档
export async function waitForArchive( params ) {
	return request( BASE_URL + '/api/student/update-document-status', {
		method: 'POST',
		data: params,
	} );
}

// 完成建档
export async function finishArchive( params ) {
	return request( BASE_URL + '/api/student/update-document-status', {
		method: 'POST',
		data: params,
	} );
}

// 保存建档备注
export async function saveArchiveRemark( params ) {
	return request( BASE_URL + '/api/student/memo/add', {
		method: 'POST',
		data: params,
	} );
}

// 导出建档
export async function exportArchive( params ) {
	return request( BASE_URL + '/api/student/export/document', {
		method: 'POST',
		data: params,
	}, 'blob' );
}

// 修改档案编号
export async function saveArchiveID( params ) {
	return request( BASE_URL + '/api/student/update-document-no', {
		method: 'POST',
		data: params,
	} );
}

// 约考列表
export async function queryExamAppointmentList( params ) {
	return request( BASE_URL + '/api/student/exam/query', {
		method: 'POST',
		data: params,
	} );
}

// 保存考试预约信息
export async function saveExamAppointmentEdit( params ) {
	return request( BASE_URL + '/api/student/exam/save', {
		method: 'POST',
		data: params,
	} );
}

// 上传考试预约信息表格
export async function saveExamAppointmentUpload( params ) {
	return request( BASE_URL + '/api/student/exam/import', {
		method: 'POST',
		data: params,
	} );
}

// 删除考试预约信息
export async function deleteExamAppointment( payload ) {
	return request( BASE_URL + '/api/student/exam/delete/' + payload.params.id, {
		method: 'POST',
		data: payload,
	} );
}

// 批量删除约考信息
export async function deleteAllExamAppointment( payload ) {
	return request( BASE_URL + '/api/student/exam/batch/delete?ids=' + payload.params.ids, {
		method: 'POST',
		data: {},
	} );
}

// 清空考试预约异常数据
export async function clearExamAppointmentOutliers( params ) {
	return request( BASE_URL + '/api/student/exam/delete-all-exception', {
		method: 'POST',
		data: params,
	} );
}

// 导出考试预约信息
export async function exportExamAppointment( payload ) {
	return request( BASE_URL + '/api/student/exam/export', {
		method: 'POST',
		data: payload,
	} );
}

// 考试成绩列表
export async function queryExamScoreList( params ) {
	return request( BASE_URL + '/api/student/grade/query', {
		method: 'POST',
		data: params,
	} );
}

// 轮询导入成绩结果
export async function importScoreResult( params ) {
	return request( `${BASE_URL}/api/student/grade/import/result`, {
		method: 'POST',
		data: params,
	} );
}

// 保存考试成绩信息
export async function saveExamScoreEdit( params ) {
	return request( BASE_URL + '/api/student/grade/save', {
		method: 'POST',
		data: params,
	} );
}

// 上传考试成绩信息表格
export async function saveExamScoreUpload( params ) {
	return request( BASE_URL + '/api/student/grade/import', {
		method: 'POST',
		data: params,
	} );
}

// 删除考试成绩异常数据
export async function deleteExamScoreOutliers( payload ) {
	return request( BASE_URL + '/api/student/grade/delete/' + payload.params.id, {
		method: 'POST',
		data: payload,
	} );
}

// 成绩-清空异常数据
export async function clearScoreOutliers( payload ) {
	return request( BASE_URL + '/api/student/grade/delete-all-exception', {
		method: 'POST',
		data: payload,
	} );
}

// 考试作废学员退学
export async function dropOutStudent( params ) {
	return request( BASE_URL + '/api/student/leave-school', {
		method: 'POST',
		data: params,
	} );
}

// 学员毕业
export async function graduateStudent( params ) {
	return request( BASE_URL + '/api/student/grade/graduate', {
		method: 'POST',
		data: params,
	} );
}

// 拉取约课列表
export async function doGetCourseList( params ) {
	return request( BASE_URL + '/api/student/course/query', {
		method: 'POST',
		data: params,
	} );
}

// 拉取日历约课列表
export async function doGetCalendarCourseList( params ) {
	return request( BASE_URL + '/api/student/course/query-calendar-course', {
		method: 'POST',
		data: params,
	} );
}

// 学员约课
export async function doOrderCourse( params ) {
	return request( BASE_URL + '/api/student/course/order', {
		method: 'POST',
		data: params,
	} );
}

/**
 * 预约结果查询接口
 * @param params
 * @returns {Promise<*>}
 */
export async function queryOrderCourseResult( params ) {
	return request( `${BASE_URL}/api/student/course/order/result/query`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 学员管理获取约课记录列表
 * @param params
 * @returns {Promise<*>}
 */
export async function doGetCourseRecordList( params ) {
	return request( `${BASE_URL}/api/student/course/record/query`, {
		method: 'POST',
		data: params,
	} );
}

/**
 * 预约记录更新接口
 * @param params
 * @returns {Promise<*>}
 */
export async function updateCourseRecord( params ) {
	return request( `${BASE_URL}/api/student/course/record/update`, {
		method: 'POST',
		data: params,
	} );
}

export async function cancelCourseRecord( params ) {
	return request( `${BASE_URL}/api/student/course/record/cancel`, {
		method: 'POST',
		data: params,
	} );
}
export async function exportLog( params ) {
	return request( `${BASE_URL}/api/student/course/record/export`, {
		method: 'POST',
		data: params,
	} );
}

// 学员报名-添加备注
export async function doSaveMemo( params ) {
	return request( BASE_URL + '/api/student/memo/add', {
		method: 'POST',
		data: params,
	} );
}

// 学员报名-修改备注
export async function doUpdateMemo( params ) {
	return request( BASE_URL + '/api/student/memo/update', {
		method: 'POST',
		data: params,
	} );
}

// 学员报名-删除备注
export async function doDeleteMemo( params ) {
	return request( BASE_URL + '/api/student/memo/delete', {
		method: 'POST',
		data: params,
	} );
}

// 学员报名-注册
export async function doSaveInfo( params ) {
	return request( BASE_URL + '/api/student/save', {
		method: 'POST',
		data: params,
	} );
}

// 学员报名-更新信息
export async function doUpdateInfo( params ) {
	return request( BASE_URL + '/api/student/update', {
		method: 'POST',
		data: params,
	} );
}

// 学员报名-删除
export async function doDeleteStudent( params ) {
	return request( `${BASE_URL}/api/student/delete/${params}`, {
		method: 'POST',
	} );
}

// 本校、代培学员列表（适用于学习中和毕业学员）
export async function doGetNormalStudentList( params ) {
	return request( `${BASE_URL}/api/student/query-formal-student`, {
		method: 'POST',
		data: params,
	} );
}

// 本校、挂靠已退学学员列表（适用于学习中和毕业学员）
export async function doGetRefundStudentList( params ) {
	return request( `${BASE_URL}/api/student/query-refund-student`, {
		method: 'POST',
		data: params,
	} );
}

// 购买课时
export async function doBuyLessons( params ) {
	return request( `${BASE_URL}/api/student/buy-lessons`, {
		method: 'POST',
		data: params,
	} );
}

// 学员列表 - 进度变更
export async function doSaveStudentStatus( params ) {
	return request( `${BASE_URL}/api/student/change-study-process`, {
		method: 'POST',
		data: params,
	} );
}

// 学员列表 - 教练变更
export async function doChangeCoach( params ) {
	return request( `${BASE_URL}/api/student/change-coach`, {
		method: 'POST',
		data: params,
	} );
}

// 学员列表 - 班型变更
export async function doChangeStudentClass( params ) {
	return request( `${BASE_URL}/api/student/change-student-class`, {
		method: 'POST',
		data: params,
	} );
}

// 学员列表 - 补交学费
export async function doAfterPayTuition( params ) {
	return request( `${BASE_URL}/api/student/after-pay-tuition/${params}`, {
		method: 'POST',
	} );
}

// 学员列表 - 收补考费
export async function doAfterPayExam( params ) {
	return request( `${BASE_URL}/api/student/after-pay-exam`, {
		method: 'POST',
		data: params,
	} );
}

// 学员列表 - 委培
export async function doEntrust( params ) {
	return request( `${BASE_URL}/api/student/entrust`, {
		method: 'POST',
		data: params,
	} );
}

// 学员列表 - 学员退学
export async function doLeaveSchool( params ) {
	return request( `${BASE_URL}/api/student/leave-school`, {
		method: 'POST',
		data: params,
	} );
}

// 学员列表 - 修改手机号
export async function doChangeStudentMobile( params ) {
	return request( `${BASE_URL}/api/student/change-student-mobile`, {
		method: 'POST',
		data: params,
	} );
}

// 学员列表 - 更换外协机构
export async function doChangeEntrust( params ) {
	return request( `${BASE_URL}/api/student/update-entrust`, {
		method: 'POST',
		data: params,
	} );
}

// 学员列表 - 添加其它业务收入
export async function addOtherCost( params ) {
	return request( `${BASE_URL}/api/student/add-ohter-incomefee`, {
		method: 'POST',
		data: params,
	} );
}

// 委培学员列表
export async function doGetEntrustStudentList( params ) {
	return request( `${BASE_URL}/api/student/query-entrust-student`, {
		method: 'POST',
		data: params,
	} );
}

// 获取挂靠报名费
export async function doGetDependCost( params ) {
	return request( `${BASE_URL}/api/setting/fee/query`, {
		method: 'POST',
		data: params,
	} );
}

// 代培添加科目
export async function doAddProxyKm( params ) {
	return request( `${BASE_URL}/api/student/add/proxy/km`, {
		method: 'POST',
		data: params,
	} );
}

// 读取身份证信息
export async function doIdentityInfo() {
	return request( `http://localhost:8088/identity/info`, {
		method: 'GET',
	} );
}

// 轮询导入学生结果
export async function importStudentResult( params ) {
	return request( `${BASE_URL}/api/student/init/import/result`, {
		method: 'POST',
		data: params,
	} );
}

// 活跃、潜水学员查询接口
export async function queryActiveStudentList( params ) {
	return request( BASE_URL + '/api/student/query-active-student', {
		method: 'POST',
		data: params,
	} );
}

// 获取预报名列表
// 建档列表
export async function getExpectSignUpList( params ) {
	return request( BASE_URL + '/api/marketing/query-clue-by-page', {
		method: 'POST',
		data: params,
	} );
}

// 批量修改线索状态
export async function updArchiveClueStatus( params ) {
	return request( BASE_URL + '/api/marketing/update-clues-status', {
		method: 'POST',
		data: params,
	} );
}
export async function updArchiveClueApply( params ) {
	return request( BASE_URL + '/api/marketing/introducer/update-clue-apply', {
		method: 'POST',
		data: params,
	} );
}
// 修改线索状态
export async function updClueStatus( params ) {
	return request( BASE_URL + '/api/marketing/update-clue-by-student', {
		method: 'POST',
		data: params,
	} );
}
// 根据手机号获取学员id
export async function getStudentIdByMobile( params ) {
	return request( BASE_URL + '/api/marketing/query-studentid-by-mobile', {
		method: 'POST',
		data: params,
	} );
}
