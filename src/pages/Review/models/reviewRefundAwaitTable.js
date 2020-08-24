import { doGetRefundList, doSaveRefundResult, } from '@/services/review';
import createInitialModelState from '@/utils/createInitialModelState';
import FIELDS from '@/config/fields';
import response from '@/services/response';

const name = 'reviewRefundAwaitList';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
		isApprover: '0',
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			const res = response( yield call( doGetRefundList, {
				params: {
					...payload.params,
					opStatus: 1,
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
						},
						isApprover: res.isApprover,
					},
				} );
			}
		},
		* saveResult ( { payload }, { call, } ){
			console.log( payload );
			return response( yield call( doSaveRefundResult, {
				params: {
					...payload,
				},
				pagination: payload.pagination,
			} ) )( `${payload[ FIELDS.FINANCE.OP_STATUS.key ] === 3 ? '审核通过！' : '驳回成功！'}`, '' );
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
