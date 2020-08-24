import {
	queryTeachingLog,
	getTeachingLogDetail,
	getTagList,
	addRemarks
} from '@/services/teaching';
import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'teachingLog';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			const res = response( yield call( queryTeachingLog, payload ) )();
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
		* getTeachingLogDetail( { payload }, { call, put } ) {
			return response( yield call( getTeachingLogDetail, payload ) )();
		},
		* getTagList( { payload }, { call, put } ) {
			return response( yield call( getTagList, payload ) )();
		},
		* addRemarks( { payload }, { call, put } ) {
			return response( yield call( addRemarks, payload ) )();
		}
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
