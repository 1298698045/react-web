import { doGetWageRegistrationYearList, } from '@/services/api';
import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'financeWageRegistrationYearList';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			console.log( payload );
			const res = response( yield call( doGetWageRegistrationYearList, {
				...payload,
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
