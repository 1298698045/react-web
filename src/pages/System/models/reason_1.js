import {
	queryDelayReason,
	setDelayReason,
	saveDelayReason,
} from '@/services/system';
import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'reason_1';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			const res = response( yield call( queryDelayReason, payload ) )(  );
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ `${ name }TableData` ]: {
							list: res.map( ( v, i ) => ( { key: i + 1, ...v, } ) ),
							// pagination: res.pagination,
						}
					},
				} );
			}
		},
		* setDelayReason( { payload }, { call, put } ) {
			return response( yield call( setDelayReason, payload ) )( MESSAGE.SAVE );
		},
		* saveDelayReason( { payload }, { call, put } ) {
			return response( yield call( saveDelayReason, payload ) )( MESSAGE.SAVE );
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
