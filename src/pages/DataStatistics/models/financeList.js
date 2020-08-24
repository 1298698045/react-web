import {
	queryFinanceTab
} from '@/services/dataStatistics';
import response from '@/services/response';
import createInitialModelState from '@/utils/createInitialModelState';

const name = 'financeList';
const initialState = createInitialModelState( name );
export default {
	namespace: name,
	
	state: {
		...initialState,
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			const res = response( yield call( queryFinanceTab, payload ) )( '', '' );
			// if ( res ) {
			let	res1 = [
{siteId: 1, departId: 1, incomeTotal: 50000, outTotal: 20000},
{siteId: 2, departId: 33, incomeTotal: 100000, outTotal: 50000},
{siteId: 9, departId: 7, incomeTotal: 120000, outTotal: 50000},
{siteId: 10, departId: 28, incomeTotal: 150000, outTotal: 50000},
{siteId: 13, departId: 27, incomeTotal: 80000, outTotal: 20000},
{siteId: 19, departId: 29, incomeTotal: 70000, outTotal: 30000}]
				yield put( {
					type: 'save',
					payload: {
						[ `${name}TableData` ]: {
							params: payload.params,
							list: res1.map( ( v, i ) => ({ key: i + 1, ...v, }) ),
							pagination: res.pagination,
						}
					},
				} );
			// }
		},
	},
	reducers: {
		save( state, action ) {
			return {
				...state,
				...action.payload,
			};
		},
	}
};
