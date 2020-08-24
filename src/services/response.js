import { notification, message } from 'antd';
import { setAuthority } from '@/utils/authority';
import { routerRedux } from 'dva/router';
import router from 'umi/router';
import { stringify } from "qs";

/**
 * 此函数用于接受接口返回值。
 * @param res
 * @returns {Function}
 */
const response = res =>
	/**
	 * 此函数通过判断是否传入请求成功 / 失败字段来决定通信结果的展示
	 * @param successText
	 * @param failText
	 * @returns {boolean|Object.data}
	 */
		( successText, failText ) => {

		if ( typeof successText === 'object' && successText.SUCCESS ) {
			failText = successText.FAIL;
			successText = successText.SUCCESS;
		}

		const { code, data, msg } = res;

		if ( code === 0 ) {
			if ( successText ) message.success( successText );
			return data;
		} else if ( code === 108 ) {
			setAuthority( 'guest' );
			if ( !/#\/user\/login/.test( window.location.hash ) ) {
				router.push( {
					pathname: '/user/login',
					query: {
						redirect: window.location.href,
					},
				} );
				notification.error( {
					message: '您的登录状态已过期，请重新登录！',
				} );
			}
		} else {
			if ( failText !== false ) {
				if ( msg || failText ) {
					notification.error( {
						message: msg || failText,
						// description: `${errordesc}${errspc}`,
						// description: '系统错误',
					} );
				}
			} else {
				return data;
			}
		}

		return false;
	};

// 活动接收数据翻译
export const responseA = res => listVar => ( successText, failText ) => {
	const { status, content } = res;
	let { code, message: msg } = status;
	let data = {};
	if ( code == 10 ) code = 0;
	if ( code === 0 ) {
		if ( listVar ) { // 列表型数据
			data.pagination = {
				current: content.currentPage,
				pageSize: content.pageSize,
				total: content.totalNum,
			};
			data.list = content[ listVar ];
		} else {
			data = content;
		}
	}
	return response( {
		code,
		msg,
		data,
	} )( successText, failText );
};
// 活动发送数据翻译
export const requestA = ( { params, pagination, } ) => {
	return {
		...params,
		pageNo: pagination.current + '',
		pageSize: pagination.pageSize + '',
		// schoolId: JSON.parse(localStorage.getItem('schoolInfo')).id
	};
};

export default response;
