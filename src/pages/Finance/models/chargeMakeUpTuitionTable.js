import {
	doGetFinanceChargeOther,
	doInsureFinanceChargeOther,
	doPrintReceipt,
	doRejectFinanceChargeOther,
} from '@/services/api';
import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'financeChargeMakeUpTuitionList';
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
					opStatus: 0,
					action: 'AFTER_PAY_TUITION',
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
		* refresh ( _, { call, put, select, } ){
			const tableData = yield select( state => state[ name ][ `${name}TableData` ] );
			const { params } = tableData;
			const res = response( yield call( doGetFinanceChargeOther, {
				params: {
					...params,
					opStatus: 0,
					action: 'AFTER_PAY_TUITION',
				},
				pagination: {
					current: 1,
					pageSize: 10,
				},
			} ) )( '', '' );
			
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ `${name}TableData` ]: {
							...tableData,
							list: res.list.map( ( v, i ) => ({ key: i + 1, ...v, }) ),
							pagination: res.pagination,
						}
					},
				} );
			}
		},
		* insure ( { payload, }, { call, } ){
			return response( yield call( doInsureFinanceChargeOther, {
				params: {
					...payload,
				},
				pagination: payload.pagination,
			} ) )( '确认收费成功！', '' );
		},
		* reject ( { payload, }, { call, } ){
			return response( yield call( doRejectFinanceChargeOther, payload ) )( '取消成功！', '' );
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
