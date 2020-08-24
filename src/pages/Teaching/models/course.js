import {
	queryCourseList,
	saveCourseIntensive,
	saveCourseKM,
	saveCourseBookNum,
	openCourse,
	closeCourse,
} from '@/services/teaching';

import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';
import FIELDS from "@/config/fields";

const name = 'teachingCourse';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			const res = response( yield call( queryCourseList, payload ) )();
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ `${ name }TableData` ]: {
							list: res.list.map( ( v, i ) => ( { key: i + 1, ...v, disabled: v.studentNum != 0 } ) ),
							pagination: res.pagination,
						}
					},
				} );
			}
		},
		* saveCourseIntensive( { params }, { call, put } ) {
			return response( yield call( saveCourseIntensive, { params } ) )( MESSAGE.EDIT );
		},
		* saveCourseKM( { params }, { call, put } ) {
			return response( yield call( saveCourseKM, { params } ) )( MESSAGE.EDIT );
		},
		* saveCourseBookNum( { params }, { call, put } ) {
			return response( yield call( saveCourseBookNum, { params } ) )( MESSAGE.EDIT );
		},
		* openCourse( { params }, { call, put } ) {
			return response( yield call( openCourse, { params } ) )( MESSAGE.EDIT );
		},
		* closeCourse( { params }, { call, put } ) {
			return response( yield call( closeCourse, { params } ) )( MESSAGE.EDIT );
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
