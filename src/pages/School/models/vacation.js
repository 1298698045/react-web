import {
	queryVacationList,
	confirmVacation,
	rejectVacation,
} from '@/services/school';
import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'orgVacation';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			const res = response( yield call( queryVacationList, payload ) )();
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ `${ name }TableData` ]: {
							list: res.list.map( ( v, i ) => ( { key: i + 1, ...v, } ) ),
							pagination: res.pagination,
						}
					},
				} );
			}
		},
		* confirmVacation( { params }, { call, put } ) {
			return response( yield call( confirmVacation, { params } ) )( MESSAGE.OPRATE );
		},
		* rejectVacation( { params }, { call, put } ) {
			return response( yield call( rejectVacation, { params } ) )( MESSAGE.OPRATE );
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
