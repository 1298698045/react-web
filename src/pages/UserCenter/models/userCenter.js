import {
	resetPassword,
	feedback,
} from '@/services/user';
import { MESSAGE } from '@/config/tips';

import response from '@/services/response';

const name = 'userCenter';

export default {
	namespace: name,

	state: {},

	effects: {
		* resetPassword( { payload }, { call, put } ) {
			return response( yield call( resetPassword, { params: payload } ) )( MESSAGE.EDIT );
		},
		* feedback( { payload }, { call, put } ) {
			return response( yield call( feedback, { params: { platform: 'jx_management', ...payload } } ) )( '意见反馈成功，我们会尽快处理！', '提交失败，请稍后重试！' );
		},
	},

	reducers: {
		save( state, action ) {
			return {
				...state,
				...action.payload,
			};
		},
	},
};
