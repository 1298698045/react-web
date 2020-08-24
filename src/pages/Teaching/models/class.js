import {
	queryClassList,
	saveClass,
	changeClass
} from '@/services/teaching';
import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'teachingClass';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			const res = response( yield call( queryClassList, payload ) )();
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
		* saveClass( { params }, { call, put } ) {
			return response( yield call( saveClass, { params } ) )( MESSAGE.SAVE );
		},
		* changeClass( { params }, { call, put } ) {
			console.log(params)
			return response( yield call( changeClass, { params } ) )( '变更成功' );
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
