import {
	doGetCourseRecordList,
	updateCourseRecord,
	cancelCourseRecord,
	exportLog
} from '@/services/student';
import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'studentLogList';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
		lessonInfo: {},
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			const res = response( yield call( doGetCourseRecordList, payload ) )();
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ `${name}TableData` ]: {
							list: res.list.map( ( v, i ) => ( {
								key: i + 1,
								...v,
							} ) ),
							pagination: res.pagination,
						}
					},
				} );
			}
		},
		* updateCourseRecord( { params }, { call, put } ) {
			return response( yield call( updateCourseRecord, { params } ) )( MESSAGE.OPRATE );
		},
		* cancelCourseRecord( { params }, { call, put } ) {
			return response( yield call( cancelCourseRecord, { params } ) )( MESSAGE.OPRATE );
		},
		* exportLog( { params }, { call, put } ) {
			return response( yield call( exportLog, { params } ) )( MESSAGE.OPRATE );
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
