import {
	queryMatchMode,
	setMatchMode,
} from '@/services/system';
import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'bookCourse_1';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			const res = response( yield call( queryMatchMode, payload ) )( );
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
		* setMatchMode( { payload }, { call, put } ) {
			return response( yield call( setMatchMode, payload ) )( MESSAGE.SAVE );
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
