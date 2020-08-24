import { stringify } from 'qs';
import request from '@/utils/request';
import { BASE_URL, MOCK_BASE_URL, } from '@/config/url';

// 部门列表-树形
export async function queryDepartmentList( params ) {
	return request( BASE_URL + '/api/schooladministration/get-department-tree', {
		method: 'POST',
		data: params,
	} );
}

// 部门列表-不分页
export async function queryAllDepartmentList( params ) {
	return request( BASE_URL + '/api/schooladministration/query-department', {
		method: 'POST',
		data: params,
	} );
}

// 保存部门信息
export async function saveDepartment( params ) {
	return request( BASE_URL + '/api/schooladministration/save-department', {
		method: 'POST',
		data: params,
	} );
}

// 删除部门
export async function deleteDepartment( params ) {
	return request( BASE_URL + '/api/schooladministration/del-department', {
		method: 'POST',
		data: params,
	} );
}


// 员工列表
export async function queryEmployeeList( params ) {
	return request( BASE_URL + '/api/schooladministration/query-employee-by-page', {
		method: 'POST',
		data: params,
	} );
}

// 所有员工列表
export async function queryAllEmployeeList( params ) {
	return request( BASE_URL + '/api/schooladministration/query-employee', {
		method: 'POST',
		data: params,
	} );
}

// 员工详细信息
export async function queryEmployeeInfo( params ) {
	return request( BASE_URL + '/api/schooladministration/get-employee', {
		method: 'POST',
		data: params,
	} );
}

// 保存员工信息
export async function saveEmployee( params ) {
	return request( BASE_URL + '/api/schooladministration/save-employee', {
		method: 'POST',
		data: params,
	} );
}

// 员工预离职
export async function preLeave( params ) {
	return request( BASE_URL + '/api/schooladministration/pre-leaving', {
		method: 'POST',
		data: params,
	} );
}

// 取消员工预离职
export async function cancelPreLeave( params ) {
	return request( BASE_URL + '/api/schooladministration/cancel-pre-leaving', {
		method: 'POST',
		data: params,
	} );
}

// 确认员工预离职
export async function confirmPreLeave( params ) {
	return request( BASE_URL + '/api/schooladministration/confirm-leaving', {
		method: 'POST',
		data: params,
	} );
}


// 分页职务列表
export async function queryPositionList( params ) {
	return request( BASE_URL + '/api/schooladministration/query-position-by-page', {
		method: 'POST',
		data: params,
	} );
}

// 所有职务列表
export async function queryAllPositionList( params ) {
	return request( BASE_URL + '/api/schooladministration/query-position', {
		method: 'POST',
		data: params,
	} );
}

// 保存职务信息
export async function savePosition( params ) {
	return request( BASE_URL + '/api/schooladministration/save-position', {
		method: 'POST',
		data: params,
	} );
}

// 员工休假列表
export async function queryVacationList( params ) {
	return request( BASE_URL + '/api/schooladministration/query-employee-vacation-by-page', {
		method: 'POST',
		data: params,
	} );
}

// 批准员工休假
export async function confirmVacation( params ) {
	return request( BASE_URL + '/api/schooladministration/confirm-employee-vacation', {
		method: 'POST',
		data: params,
	} );
}

// 驳回员工休假
export async function rejectVacation( params ) {
	return request( BASE_URL + '/api/schooladministration/reject-employee-vacation', {
		method: 'POST',
		data: params,
	} );
}

// 外协机构列表
export async function queryCollaborateList( params ) {
	return request( BASE_URL + '/api/schooladministration/query-cooperation-unit-by-page', {
		method: 'POST',
		data: params,
	} );
}

// 所有外协机构
export async function queryAllCollaborateList( params ) {
	return request( BASE_URL + '/api/schooladministration/query-cooperation-unit', {
		method: 'POST',
		data: params,
	} );
}

// 保存外协机构信息
export async function saveCollaborate( params ) {
	return request( BASE_URL + '/api/schooladministration/save-cooperation-unit', {
		method: 'POST',
		data: params,
	} );
}

// 档案受理人列表
export async function queryArchivistList( params ) {
	return request( BASE_URL + '/api/schooladministration/query-archivists', {
		method: 'POST',
		data: params,
	} );
}

// 添加档案受理人
export async function addArchivist( params ) {
	return request( BASE_URL + '/api/schooladministration/add-archivist', {
		method: 'POST',
		data: params,
	} );
}

// 删除档案受理人
export async function deleteArchivist( params ) {
	return request( BASE_URL + '/api/schooladministration/del-archivist', {
		method: 'POST',
		data: params,
	} );
}

// 档案受理人设为默认
export async function setDefaultArchivist( params ) {
	return request( BASE_URL + '/api/schooladministration/set-default-archivist', {
		method: 'POST',
		data: params,
	} );
}

// 档案受理人取消默认
export async function cancelDefaultArchivist( params ) {
	return request( BASE_URL + '/api/schooladministration/cancel-default-archivist', {
		method: 'POST',
		data: params,
	} );
}


// 招生目标列表不分页
export async function queryGoalList( params ) {
	return request( BASE_URL + '/api/schooladministration/query-sales-goal', {
		method: 'POST',
		data: params,
	} );
}

// 保存招生目标信息
export async function saveGoal( params ) {
	return request( BASE_URL + '/api/schooladministration/save-sales-goal', {
		method: 'POST',
		data: params,
	} );
}


// 校外介绍人列表
export async function queryIntroducerList( params ) {
	return request( BASE_URL + '/api/schooladministration/get-outintroducer-page', {
		method: 'POST',
		data: params,
	} );
}

// 所有校外介绍人
export async function queryAllIntroducerList( params ) {
	return request( BASE_URL + '/api/schooladministration/get-outintroducer-list', {
		method: 'POST',
		data: params,
	} );
}

// 保存校外介绍人
export async function saveIntroducer( params ) {
	return request( BASE_URL + '/api/schooladministration/add-update-outintroducer', {
		method: 'POST',
		data: params,
	} );
}

// 删除校外介绍人
export async function delIntroducer( params ) {
	return request( BASE_URL + '/api/schooladministration/delete-outintroducer', {
		method: 'POST',
		data: params,
	} );
}
