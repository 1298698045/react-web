import { stringify } from 'qs';
import request from '@/utils/request';
import { BASE_URL, MOCK_BASE_URL, } from '@/config/url';

// 操作日志列表
export async function queryOperationLogList( params ) {
	return request( BASE_URL + '/api/log/query-log-page', {
		method: 'POST',
		data: params,
	} );
}

// 角色列表
export async function queryRoleList( params ) {
	return request( BASE_URL + '/api/operationcenter/role/query-role-by-page', {
		method: 'POST',
		data: params,
	} );
}

// 全部角色列表
export async function queryAllRoleList( params ) {
	return request( BASE_URL + '/api/operationcenter/role/query-role', {
		method: 'POST',
		data: params,
	} );
}

// 保存角色信息
export async function saveRole( params ) {
	params.params.platformId = 'jx_management';
	return request( BASE_URL + '/api/operationcenter/role/save-role', {
		method: 'POST',
		data: params,
	} );
}

// 删除角色
export async function deleteRole( params ) {
	params.params.platformId = 'jx_management';
	return request( BASE_URL + '/api/operationcenter/role/delete-role', {
		method: 'POST',
		data: params,
	} );
}

// 权限树
export async function queryPrivilegeTree( params ) {
	params.params.platformId = 'jx_management';
	return request( BASE_URL + '/api/operationcenter/privilege/query-priv-tree', {
		method: 'POST',
		data: params,
	} );
}

// 保存角色权限信息
export async function saveRolePrivilege( params ) {
	params.params.platformId = 'jx_management';
	return request( BASE_URL + '/api/operationcenter/role/set-role-priv', {
		method: 'POST',
		data: params,
	} );
}

// 获取uid的角色权限信息
export async function getUserPrivs( params ) {
	return request( BASE_URL + '/api/operationcenter/role/get-priv-by-uid', {
		method: 'POST',
		data: params,
	} );
}

// 获取设置
export async function querySetting( params ) {
	return request( BASE_URL + '/api/setting/get', {
		method: 'POST',
		data: params,
	} );
}

// 获取是否开启集训设置
export async function intensiveCourseSwitch( params ) {
	return request( BASE_URL + '/api/setting/get-by-key', {
		method: 'POST',
		data: params,
	} );
}

// 修改设置
export async function setSetting( params ) {
	return request( BASE_URL + '/api/setting/set', {
		method: 'POST',
		data: params,
	} );
}

// 修改其他设置
export async function setOtherSetting( params ) {
	return request( BASE_URL + '/api/setting/set', {
		method: 'POST',
		data: {
			params: {
				type: 'other_setting',
				...params,
			},
		},
	} );
}

// 获取费用设置
export async function queryCostSetting( params ) {
	return request( BASE_URL + '/api/setting/fee/query', {
		method: 'POST',
		data: params,
	} );
}

// 修改费用设置
export async function setCostSetting( params ) {
	return request( BASE_URL + '/api/setting/fee/save', {
		method: 'POST',
		data: params,
	} );
}

// 获取申领类型设置
export async function queryLicenseSetting( params ) {
	return request( BASE_URL + '/api/dictionary/query-by-type', {
		method: 'POST',
		data: {
			params: {
				dType: "license_type"
			}
		},
	} );
}

// 修改申领类型状态
export async function setLicenseStatus( { licenseType, status } ) {
	return request( BASE_URL + '/api/dictionary/toggle', {
		method: 'POST',
		data: {
			params: {
				dType: "license_type",
				dKey: licenseType,
				status,
			}
		},
	} );
}

// 修改默认申领类型
export async function setLicenseDefault( { licenseType } ) {
	return request( BASE_URL + '/api/setting/set', {
		method: 'POST',
		data: {
			params: {
				type: "option_default",
				key: "license_type",
				value: licenseType,
			}
		},
	} );
}

// 获取分配模式设置
export async function queryMatchMode( params ) {
	return request( BASE_URL + '/api/dictionary/query-by-type', {
		method: 'POST',
		data: {
			params: {
				dType: "match_mode"
			}
		},
	} );
}

// 修改分配模式设置
export async function setMatchMode( params ) {
	return request( BASE_URL + '/api/dictionary/toggle', {
		method: 'POST',
		data: {
			params: {
				dType: "match_mode",
				...params,
			},
		},
	} );
}

// 获取允许预约日设置
export async function queryWeekday( params ) {
	return request( BASE_URL + '/api/dictionary/query-by-type', {
		method: 'POST',
		data: {
			params: {
				dType: "week_day"
			}
		},
	} );
}

// 修改允许预约日状态
export async function setWeekday( params ) {
	return request( BASE_URL + '/api/dictionary/toggle', {
		method: 'POST',
		data: {
			params: {
				dType: "week_day",
				...params,
			}
		},
	} );
}

// 修改允许预约日设置
export async function saveWeekday( params ) {
	return request( BASE_URL + '/api/dictionary/save', {
		method: 'POST',
		data: {
			params: {
				dType: "week_day",
				...params,
			}
		},
	} );
}

// 获取学员上限/车设置
export async function queryBookNum( params ) {
	return request( BASE_URL + '/api/dictionary/query-by-type', {
		method: 'POST',
		data: {
			params: {
				dType: "book_num"
			}
		},
	} );
}

// 修改学员上限/车状态
export async function setBookNum( params ) {
	return request( BASE_URL + '/api/dictionary/toggle', {
		method: 'POST',
		data: {
			params: {
				dType: "book_num",
				...params,
			}
		},
	} );
}

// 修改学员上限/车设置
export async function saveBookNum( params ) {
	return request( BASE_URL + '/api/dictionary/save', {
		method: 'POST',
		data: {
			params: {
				dType: "book_num",
				...params,
				dKey: params.dValue,
			}
		},
	} );
}

// 获取暂缓建档原因设置
export async function queryDelayReason( params ) {
	return request( BASE_URL + '/api/dictionary/query-by-type', {
		method: 'POST',
		data: {
			params: {
				dType: "delay_reason"
			}
		},
	} );
}

// 修改暂缓建档原因状态
export async function setDelayReason( params ) {
	return request( BASE_URL + '/api/dictionary/toggle', {
		method: 'POST',
		data: {
			params: {
				dType: "delay_reason",
				...params,
			}
		},
	} );
}

// 修改暂缓建档原因设置
export async function saveDelayReason( params ) {
	return request( BASE_URL + '/api/dictionary/save', {
		method: 'POST',
		data: {
			params: {
				dType: "delay_reason",
				...params,
			}
		},
	} );
}

// 获取终止建档原因设置
export async function queryStopReason( params ) {
	return request( BASE_URL + '/api/dictionary/query-by-type', {
		method: 'POST',
		data: {
			params: {
				dType: "stop_reason"
			}
		},
	} );
}

// 修改终止建档原因状态
export async function setStopReason( params ) {
	return request( BASE_URL + '/api/dictionary/toggle', {
		method: 'POST',
		data: {
			params: {
				dType: "stop_reason",
				...params,
			}
		},
	} );
}

// 修改终止建档原因设置
export async function saveStopReason( params ) {
	return request( BASE_URL + '/api/dictionary/save', {
		method: 'POST',
		data: {
			params: {
				dType: "stop_reason",
				...params,
			}
		},
	} );
}


// 获取学员退学原因设置
export async function queryQuitReason( params ) {
	return request( BASE_URL + '/api/dictionary/query-by-type', {
		method: 'POST',
		data: {
			params: {
				dType: "quit_reason"
			}
		},
	} );
}

// 修改学员退学原因状态
export async function setQuitReason( params ) {
	return request( BASE_URL + '/api/dictionary/toggle', {
		method: 'POST',
		data: {
			params: {
				dType: "quit_reason",
				...params,
			}
		},
	} );
}

// 修改学员退学原因设置
export async function saveQuitReason( params ) {
	return request( BASE_URL + '/api/dictionary/save', {
		method: 'POST',
		data: {
			params: {
				dType: "quit_reason",
				...params,
			}
		},
	} );
}

// 删除设置
export async function deleteRecord( params ) {
	return request( BASE_URL + '/api/dictionary/delete', {
		method: 'POST',
		data: params,
	} );
}
