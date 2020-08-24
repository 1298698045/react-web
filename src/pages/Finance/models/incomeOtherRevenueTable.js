import { doDelFinanceJournal, doGetFinanceJournal, doSaveFinanceJournal, } from '@/services/api';
import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';
import FIELDS from '@/config/fields';
import transformRequestParams from '@/utils/transformRequestParams';

const name = 'financeIncomeOtherRevenueList';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			const year = String( payload.params[ FIELDS.FINANCE.JOURNAL_SEARCH_YEAR.key ] );
			const month = payload.params[ FIELDS.FINANCE.JOURNAL_SEARCH_MONTH.key ] < 10 ? `0${payload.params[ FIELDS.FINANCE.JOURNAL_SEARCH_MONTH.key ]}` : String( payload.params[ FIELDS.FINANCE.JOURNAL_SEARCH_MONTH.key ] );
			
			let searchParams = {};
			if ( payload.params[ FIELDS.FINANCE.JOURNAL_SEARCH_YEAR.key ] ) {
				if ( payload.params[ FIELDS.FINANCE.JOURNAL_SEARCH_MONTH.key ] ) {
					// 准确日期查询
					searchParams[ FIELDS.FINANCE.JOURNAL_DATE.key ] = `${year}-${month}-01`;
				} else {
					searchParams.startDate = `${year}-01-01`;
					searchParams.endDate = `${year}-12-31`;
				}
			}
			
			
			const res = response( yield call( doGetFinanceJournal, {
				params: {
					...searchParams,
					journalType: 'income_other',
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
			const res = response( yield call( doGetFinanceJournal, {
				params,
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
		* saveOtherRevenue ( { payload, }, { call, } ){
			const requestParams = transformRequestParams( { ...payload } );
			
			return response( yield call( doSaveFinanceJournal, {
				params: {
					...requestParams,
					journalType: 'income_other',
				},
			} ) )( '添加成功！', '' );
		},
		* delOtherRevenue ( { payload, }, { call, } ){
			return response( yield call( doDelFinanceJournal, {
				params: {
					id: payload,
				},
			} ) )( '删除成功！', '' );
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
