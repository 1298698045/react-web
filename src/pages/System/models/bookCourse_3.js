import {
	queryBookNum,
	setBookNum,
	saveBookNum,
	deleteRecord
} from '@/services/system';
import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'bookCourse_3';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			const res = response( yield call( queryBookNum, payload ) )( );
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
		* setBookNum( { payload }, { call, put } ) {
			return response( yield call( setBookNum, payload ) )( MESSAGE.SAVE );
		},
		* saveBookNum( { payload }, { call, put } ) {
			return response( yield call( saveBookNum, payload ) )( MESSAGE.SAVE );
		},
		* deleteRecord( { payload }, { call, put } ) {
			payload.params.dType= "book_num"
			return response( yield call( deleteRecord, payload ) )( MESSAGE.DELETE );
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
