import { stringify } from 'qs';
import request from '@/utils/request';
import { BASE_URL, MOCK_BASE_URL, } from '@/config/url';

// 获取所有教练列表
export async function queryAllCoachList ( params ){
	return request( BASE_URL + '/api/schooladministration/get-employee-list-by-coach', {
		method: 'POST',
		data: params,
	} );
}

// 教练列表
export async function queryCoachList ( params ){
	return request( BASE_URL + '/api/schooladministration/get-coach-list', {
		method: 'POST',
		data: params,
	} );
}

// 保存教练信息
export async function saveCoach ( params ){
	return request( BASE_URL + '/api/schooladministration/get-coach-list', {
		method: 'POST',
		data: params,
	} );
}

// 教练学员数据列表
export async function queryCoachStudentData ( params ){
	return request( BASE_URL + '/api/schooladministration/get-coach-data', {
		method: 'POST',
		data: params,
	} );
}

// 课程列表
export async function queryCourseList ( params ){
	return request( BASE_URL + '/api/education/query-course-by-page', {
		method: 'POST',
		data: params,
	} );
}
// 获取预约人数情况列表 zhouyan 20191028
export async function queryStudentNumList ( params ){
	return request( BASE_URL + '/api/education/query-record-by-courseid', {
		method: 'POST',
		data: params,
	} );
}

// 获取课程约课学生列表
export async function queryCourseStudentList ( params ){
	return request( BASE_URL + '/api/education/query-record-by-courseid', {
		method: 'POST',
		data: params,
	} );
}

// 批量设置集训课程
export async function saveCourseIntensive ( params ){
	return request( BASE_URL + '/api/education/set-intensive-course-batch', {
		method: 'POST',
		data: params,
	} );
}

// 批量设置培训科目
export async function saveCourseKM ( params ){
	return request( BASE_URL + '/api/education/set-course-item-batch', {
		method: 'POST',
		data: params,
	} );
}

// 批量调整人车上限
export async function saveCourseBookNum ( params ){
	return request( BASE_URL + '/api/education/set-course-num-batch', {
		method: 'POST',
		data: params,
	} );
}

// 批量打开课表
export async function openCourse ( params ){
	return request( BASE_URL + '/api/education/open-course-batch', {
		method: 'POST',
		data: params,
	} );
}

// 批量关闭课表
export async function closeCourse ( params ){
	return request( BASE_URL + '/api/education/close-course-batch', {
		method: 'POST',
		data: params,
	} );
}

// 班型列表
export async function queryClassList ( params ){
	return request( BASE_URL + '/api/education/query-class-page', {
		method: 'POST',
		data: params,
	} );
}

// 所有班型列表
export async function queryAllClassList ( params ){
	return request( BASE_URL + '/api/education/query-class', {
		method: 'POST',
		data: params,
	} );
}

// 保存班型信息
export async function saveClass ( params ){
	return request( BASE_URL + '/api/education/save-class', {
		method: 'POST',
		data: params,
	} );
}
// 变更班型信息
export async function changeClass ( params ){
	return request( BASE_URL + '/api/student/batch-change-student-class', {
		method: 'POST',
		data: params,
	} );
}

// 保存课时信息
export async function saveTimePlan ( params ){
	return request( BASE_URL + '/api/education/save-time-plan', {
		method: 'POST',
		data: params,
	} );
}

// 打开课时信息
export async function openTimePlan ( params ){
	return request( BASE_URL + '/api/education/open-time-plan', {
		method: 'POST',
		data: params,
	} );
}

// 关闭课时信息
export async function closeTimePlan ( params ){
	return request( BASE_URL + '/api/education/close-time-plan', {
		method: 'POST',
		data: params,
	} );
}
// 删除课时信息
export async function delTimePlan ( params ){
	return request( BASE_URL + '/api/education/del-time-plan', {
		method: 'POST',
		data: params,
	} );
}
// 批量更改学员上限
export async function changeBookNum ( params ){
	return request( BASE_URL + '/api/schooladministration/change-book-num', {
		method: 'POST',
		data: params,
	} );
}

// 批量更改教学时段
export async function changePlan ( params ){
	return request( BASE_URL + '/api/schooladministration/change-plan', {
		method: 'POST',
		data: params,
	} );
}

// 教学日志 列表
export async function queryTeachingLog ( params ){
	return request( BASE_URL + '/api/education/query-course-record-by-page', {
		method: 'POST',
		data: params,
	} );
}
// 教学日志 详情
export async function getTeachingLogDetail ( params ){
	return request( BASE_URL + '/api/education/get-course-comment', {
		method: 'POST',
		data: params,
	} );
}
// 课程内容列表
export async function getTagList ( params ){
	return request( BASE_URL + '/api/education/get-all-tag', {
		method: 'POST',
		data: params,
	} );
}
// 教学日志添加备注
export async function addRemarks ( params ){
	return request( BASE_URL + '/api/education/save-course-comment', {
		method: 'POST',
		data: params,
	} );
}
