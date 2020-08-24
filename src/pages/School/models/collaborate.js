import {
	queryCollaborateList,
	saveCollaborate,
} from '@/services/school';
import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'orgCollaborate';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			const res = response( yield call( queryCollaborateList, payload ) )( );
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
		* saveCollaborate( { params }, { call, put } ) {
			return response( yield call( saveCollaborate, { params } ) )( MESSAGE.SAVE );
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
