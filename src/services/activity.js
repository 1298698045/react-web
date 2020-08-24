import request from '@/utils/request';
import { ACTIVITY_BASE_URL,BASE_URL, MOCK_BASE_URL} from '@/config/url';
let server_name = `${ACTIVITY_BASE_URL}/`
let group_modules_name = `group`
let statistic_modules_name = `statistic`
let api_server_url = server_name + group_modules_name
/**
 * 获取活动列表
 * @param params
 * @returns {Promise<*>}
 */
export const queryActivityPageList = async params => {
	return request( `${api_server_url}/getPageList`, {
		method: 'POST',
		data: params,
	});
};
/**
 * 获取活动统计列表
 * @param params
 * @returns {Promise<*>}
 */
export const queryStatisticPageList = async params => {
	return request( `${api_server_url}/${statistic_modules_name}/getPageList`, {
		method: 'POST',
		data: params,
	});
};

// 根据活动id获取活动详情
export async function getActivityInfoById( id ) {
	return request( `${api_server_url}/detail/${id}`,
	{
		method: 'POST',
	});
}
/**
 * 修改状态
 * RELEASE：发布, REVOKE：撤销, FINISH：结束
 * @param params
 * @returns {Promise<*>}
 */
export const updAcitivityStatus = async params => {
	console.log()
	return request( `${api_server_url}/updateStatus`, {
		method: 'POST',
		data: params,
	});
};
/**
 * 活动保存
 * @param params
 * @returns {Promise<*>}
 */
export const saveActivity = async params => {
	return request( `${api_server_url}/saveGroupConfig`, {
		method: 'POST',
		data: params,
	} );
};
/**
 * 活动修改
 * @param params
 * @returns {Promise<*>}
 */
export const updActivity = async params => {
	return request( `${api_server_url}/updateGroupConfig`, {
		method: 'POST',
		data: params,
	} );
};
/**
 * 活动调整
 * @param params
 * @returns {Promise<*>}
 */
export const activityAdjust = async params => {
	return request( `${api_server_url}/adjust`, {
		method: 'POST',
		data: params,
	} );
};
/**
 * 获取开团列表
 * @param params
 * @returns {Promise<*>}
 */
export const queryOpenGroupList = async params => {
	return request( `${api_server_url}/docList`, {
		method: 'POST',
		data: params,
	} );
};
/**
 * 获取参团列表
 * @param params
 * @returns {Promise<*>}
 */
export const queryJoinGroupList = async params => {
	return request( `${api_server_url}/dtlList`, {
		method: 'POST',
		data: params,
	} );
};
/**
 * 参团核销
 * @param params
 * @returns {Promise<*>}
 */
export const closeGroup = async id => {
	return request( `${api_server_url}/close/${id}`,
	{
		method: 'POST',
		data: {}
	});
};

///////////////////////////以下未砍价团///////////////////////////////////
/**
 * 获取砍价团列表
 * @param params
 * @returns {Promise<*>}
 */
export const queryBargainList = async params => {
	return request( `${api_server_url}/haggleGetPageList`, {
		method: 'POST',
		data: params,
	} );
};
/**
 * 保存砍价团
 * @param params
 * @returns {Promise<*>}
 */
export const saveBargain = async params => {
	return request( `${api_server_url}/haggleSave`, {
		method: 'POST',
		data: params,
	} );
};
/**
 * 修改砍价团
 * @param params
 * @returns {Promise<*>}
 */
export const updBargain = async params => {
	return request( `${api_server_url}/haggleUpdate`, {
		method: 'POST',
		data: params,
	} );
};
/**
 * 修改状态砍价团
 * @param params
 * @returns {Promise<*>}
 */
export const updBargainStatus = async params => {
	return request( `${api_server_url}/haggleUpdateStatus`, {
		method: 'POST',
		data: params,
	} );
};
/**
 * 调整砍价团
 * @param params
 * @returns {Promise<*>}
 */
export const adjustBargain = async params => {
	return request( `${api_server_url}/haggleAdjust`, {
		method: 'POST',
		data: params,
	} );
};
/**
 * 活动详情砍价团
 * @param params
 * @returns {Promise<*>}
 */
export const queryBargainDetailList = async params => {
	return request( `${api_server_url}/haggleVerifications`, {
		method: 'POST',
		data: params,
	} );
};

/**
 * 核销列表砍价团
 * @param params
 * @returns {Promise<*>}
 */
export const queryBargainVerificationList = async params => {
	return request( `${api_server_url}/haggleVerificationsList`, {
		method: 'POST',
		data: params,
	} );
};
/**
 * 帮砍详情砍价团
 * @param params
 * @returns {Promise<*>}
 */
export const queryBargainHelpList = async params => {
	return request( `${api_server_url}/haggleUserList`, {
		method: 'POST',
		data: params,
	} );
};
/**
 * 核销砍价团
 * @param params
 * @returns {Promise<*>}
 */
export const closeBargain = async id => {
	return request( `${api_server_url}/haggleClose/${id}`,
	{
		method: 'POST'
	});
};
// 根据活动id获取砍价活动详情
export async function getBargainInfoById( id ) {
	return request( `${api_server_url}/haggleDetail`,
	{
		method: 'POST',
		data: {
			id: id
		}
	});
}
/**
 * 获取砍价活动统计列表
 * @param params
 * @returns {Promise<*>}
 */
export const queryBargainStatisticPageList = async params => {
	return request( `${api_server_url}/${statistic_modules_name}/haggle/getPageList`, {
		method: 'POST',
		data: params,
	});
};

export const signLuckDraw = async params => {
	return request( `${api_server_url}/prize/sign`, {
		method: 'POST',
		data: params,
	});
};

export const setPrizeStatus = async params => {
	return request( `${api_server_url}/wx/employee/updatePrizeStatus`, {
		method: 'POST',
		data: params,
	});
};
export const openLuckList = async params => {
	return request( `${api_server_url}/prize/query/pool`, {
		method: 'POST',
		data: params,
	});
};
export const openLuckDetailList = async params => {
	return request( `${api_server_url}/prize/detail`, {
		method: 'POST',
		data: params,
	});
};
export const complateLuckDraw = async params => {
	return request( `${api_server_url}/prize/complate`, {
		method: 'POST',
		data: params,
	});
};