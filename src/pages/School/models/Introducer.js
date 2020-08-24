import {
	queryIntroducerList,
	saveIntroducer,
	delIntroducer
} from '@/services/school';
import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'introducer';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			const res = response( yield call( queryIntroducerList, payload ) )( );
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
		* saveIntroducer( { params }, { call, put } ) {
			return response( yield call( saveIntroducer, { params } ) )( MESSAGE.SAVE );
		},
		* delIntroducer( { params }, { call, put } ) {
			return response( yield call( delIntroducer, { params } ) )( MESSAGE.DELETE );
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
