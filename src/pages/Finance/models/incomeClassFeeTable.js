import { doGetFinanceChargeOther, doPrintReceipt, } from '@/services/api';
import { doGetNormalStudentList, doBuyLessons, } from '@/services/student';
import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'incomeFinanceClassFeeList';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			const res = response( yield call( doGetFinanceChargeOther, {
				params: {
					...payload.params,
					opStatus: 1,
					action: 'BUY_LESSON',
				},
				pagination: payload.pagination,
			} ) )( '', '' );
			
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ `${name}TableData` ]: {
							params: payload.params,
							list: res.list.map( ( v, i ) => ({ key: i + 1, ...v, }) ),
							pagination: res.pagination,
						}
					},
				} );
			}
		},
		* search ( { payload }, { call, } ){
			return response( yield call( doGetNormalStudentList, {
				params: {
					keywords: payload,
					// finance: {
					// 	// payType: 'lesson',
					// },
				},
				pagination: {
					current: 1,
					pageSize: 1000,
				},
			} ) )( '', '' );
		},
		* buyLessons ( { payload }, { call, } ){
			return response( yield call( doBuyLessons, {
				params: {
					...payload,
				},
			} ) )( '购买课时成功！', '' );
		},
		* print ( { payload, }, { call, } ){
			return response( yield call( doPrintReceipt, {
				params: {
					...payload,
				},
			} ) )( '操作成功！', '' );
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
