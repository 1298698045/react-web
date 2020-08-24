import { doGetWageRegistrationList, doDelWageRegistrationList, doGetWageRegistrationMonthList, } from '@/services/api';
import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'financeWageRegistrationList';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
		total: 0,
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			const { params: { month, year } } = payload;
			const data = {};
			if ( year !== '-1' ) {
				data.year = year;
			}
			if ( month !== '-1' ) {
				data.month = month;
			}
			const res = response( yield call( doGetWageRegistrationList, {
				params: {
					...data,
				}
			} ) )( '', '' );
			
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ `${name}TableData` ]: {
							list: res.list.map( ( v, i ) => ({ key: i + 1, ...v, }) ),
							pagination: res.pagination,
						},
						total: res.total,
					},
				} );
			}
		},
		* del ( { payload }, { call, } ){
			return response( yield call( doDelWageRegistrationList, {
				...payload,
			} ) )( '删除成功！', '' );
		},
		* getInfo ( { payload }, { call, } ){
			return response( yield call( doGetWageRegistrationMonthList, {
				...payload,
			} ) )( '', '' );
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
