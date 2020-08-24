import {
	doGetNormalStudentList,
	doGetCourseList,
	doOrderCourse,
	queryOrderCourseResult,
	doIdentityInfo,
} from '@/services/student';
import { querySetting } from "@/services/system";
import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'reserve';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
		kmCode: 'km2',
		studentInfo: {
			baseInfo: {},
		},
		status_setting: {},
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			yield put( {
				type: 'save',
				payload: {
					kmCode: payload.params.kmCode,
				},
			} );
			const res = response( yield call( doGetCourseList, payload ) )();
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
		* search( { keywords }, { call, put } ) {
			const res = response( yield call( doGetNormalStudentList, { params: { keywords } } ) )();
			if ( res && res.list && res.list.length ) {
				yield put( {
					type: 'save',
					payload: {
						studentInfo: res.list[ 0 ],
					},
				} );
				return true;
			} else {
				yield put( {
					type: 'save',
					payload: {
						studentInfo: {
							baseInfo: {},
						},
					},
				} );
				return false;
			}
		},
		* doOrderCourse( { params }, { call, put } ) {
			return response( yield call( doOrderCourse, { params } ) )( '正在预约中，请稍候！' );
		},
		* queryOrderCourseResult( { params }, { call, put } ) {
			const res = yield call( queryOrderCourseResult, { params } );
			const { code, data, msg } = res;
			if ( code != -112 ) {
				return response( res )( '预约成功！' );
			} else {
				return code;
			}
		},
		* doIdentityInfo( { payload }, { call, put } ) {
			const res = yield call( doIdentityInfo, payload );
			if ( res.code !== 200 ) {
				return false;
			}
			return res.data;
		},
		* queryStatusSetting( { payload }, { call, put } ) {
			const res = response( yield call( querySetting, { params: { type: "status_setting" } } ) )();
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						status_setting: res,
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
		clearStudentInfo( state ) {
			return {
				...state,
				studentInfo: {
					baseInfo: {},
				},
			};
		},
	},
};
