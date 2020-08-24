import {
	doGetCalendarCourseList,
} from '@/services/student';
import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'reserve_1';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
		kmCode: 'km2',
		studentInfo: {
			baseInfo: {},
		},
		lessonInfo: {},
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			yield put( {
				type: 'save',
				payload: {
					kmCode: payload.params.kmCode,
				},
			} );
			const res = response( yield call( doGetCalendarCourseList, payload ) )();
			if ( res && res.list ) {
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
