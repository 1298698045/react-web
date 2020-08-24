import {
	saveClass,
	delTimePlan
} from '@/services/teaching';
import {
	doGetTeachingLessonList,
	doGetTeachingLessonInfo,
} from '@/services/api';
import { saveTimePlan,openTimePlan,closeTimePlan } from '@/services/teaching';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'teachingLessonList';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
		lessonInfo: {},
	},
	
	effects: {
		* fetch ( { payload, }, { call, put } ){
			const res = response( yield call( doGetTeachingLessonList, payload ) )( '', '' );
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ `${name}TableData` ]: {
							list: res.list.map( ( v, i ) => ({
								key: i + 1,
								...v,
								periodList: JSON.stringify( v.periodList ),
							}) ),
							pagination: res.pagination,
						}
					},
				} );
			}
		},
		* getLessonInfo ( { payload, callback }, { call, put } ){
			return response( yield call( doGetTeachingLessonInfo, payload ) )( '', '' );
		},
		* saveTimePlan ( { payload, callback }, { call } ){
			return response( yield call( saveTimePlan, payload ) )( '保存成功！', '' );
		},
		* openTimePlan ( { payload, callback }, { call } ){
			return response( yield call( openTimePlan, payload ) )( '打开成功！', '' );
		},
		* closeTimePlan ( { payload, callback }, { call } ){
			return response( yield call( closeTimePlan, payload ) )( '关闭成功！', '' );
		},
		* saveClassEdit ( { payload }, { call, put } ){
			const res = response( yield call( saveClass, payload ) );
			// yield put( {
			// 	type: 'save',
			// 	payload: res,
			// } );
		},
		* deleteRecord ( { payload, callback }, { call } ){
			return response( yield call( delTimePlan, payload ) )( '删除成功', '' );
		},
	},
	
	reducers: {
		save ( state, action ){
			return {
				...state,
				...action.payload,
			};
		},
	},
};
