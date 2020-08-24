import { doInsureFinanceChargeOther, doRejectFinanceChargeOther, } from '@/services/api';
import response from '@/services/response';


export default {
	namespace: 'supplementaryFee',
	
	state: {},
	
	effects: {
		* insure ( { payload, callback, }, { call, } ){
			const res = response( yield call( doInsureFinanceChargeOther, {
				params: {
					...payload,
				},
			} ) )( '确认成功！', '' );
			
			if ( res && callback ) callback();
		},
		* reject ( { payload, callback, }, { call, } ){
			const res = response( yield call( doRejectFinanceChargeOther, {
				params: {
					...payload,
				},
			} ) )( '驳回成功！', '' );
			
			if ( res && callback ) callback();
		},
	},
	
	reducers: {
		save ( state, action ){
			return {
				...state,
				...action.payload,
			};
		},
	},
};
