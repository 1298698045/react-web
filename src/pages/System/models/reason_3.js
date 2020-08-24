import {
	queryQuitReason,
	setQuitReason,
	saveQuitReason,
} from '@/services/system';
import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'reason_3';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			const res = response( yield call( queryQuitReason, payload ) )( '', '' );
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
		* setQuitReason( { payload }, { call, put } ) {
			return response( yield call( setQuitReason, payload ) )( MESSAGE.SAVE );
		},
		* saveQuitReason( { payload }, { call, put } ) {
			return response( yield call( saveQuitReason, payload ) )( MESSAGE.SAVE );
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
