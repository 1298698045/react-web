import {
	queryPositionList,
	savePosition,
} from '@/services/school';
import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'orgPosition';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			const res = response( yield call( queryPositionList, payload ) )( '', '' );
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
		* savePosition( { params }, { call, put } ) {
			return response( yield call( savePosition, { params } ) )( MESSAGE.SAVE );
		},
		* togglePositionStatus( { id, status }, { call, put } ) {
			return response( yield call( savePosition, { params: { id, status } } ) )( MESSAGE.OPRATE );
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
