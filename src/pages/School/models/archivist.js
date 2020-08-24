import {
	queryArchivistList,
	addArchivist,
	deleteArchivist,
	setDefaultArchivist,
	cancelDefaultArchivist,
} from '@/services/school';
import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'orgArchivist';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			const res = response( yield call( queryArchivistList, payload ) )();
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
		* addArchivist( { params }, { call, put } ) {
			return response( yield call( addArchivist, { params } ) )( MESSAGE.ADD );
		},
		* deleteArchivist( { params }, { call, put } ) {
			return response( yield call( deleteArchivist, { params } ) )( MESSAGE.DELETE );
		},
		* setDefaultArchivist( { params }, { call, put } ) {
			return response( yield call( setDefaultArchivist, { params } ) )( MESSAGE.OPRATE );
		},
		* cancelDefaultArchivist( { params }, { call, put } ) {
			return response( yield call( cancelDefaultArchivist, { params } ) )( MESSAGE.OPRATE );
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
