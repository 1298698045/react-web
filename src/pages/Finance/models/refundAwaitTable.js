import {
	doGetRefundList,
	doCancelRefund,
	doRevokeRefund,
	doExpenditureRefund,
	doReportRefund,
} from '@/services/review';
import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'financeRefundAwaitList';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			const res = response( yield call( doGetRefundList, {
				params: {
					...payload.params,
					completeStatus: 0,
				},
				pagination: payload.pagination,
			} ) )( '', '' );
			
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ `${name}TableData` ]: {
							list: res.list.map( ( v, i ) => ({ key: i + 1, ...v, }) ),
							pagination: res.pagination,
						}
					},
				} );
			}
		},
		* report ( { payload }, { call } ){
			return response( yield call( doReportRefund, payload ) )( '提报成功！', '' );
		},
		* cancel ( { payload }, { call } ){
			return response( yield call( doCancelRefund, payload ) )( '撤销成功！', '' );
		},
		* revoke ( { payload }, { call } ){
			return response( yield call( doRevokeRefund, payload ) )( '撤回成功！', '' );
		},
		* expenditure ( { payload }, { call } ){
			return response( yield call( doExpenditureRefund, payload ) )( '支出成功！', '' );
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
