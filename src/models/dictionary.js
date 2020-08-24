import { doGetDictionary, doGetTeachingLessonList, } from '@/services/api';
import {
	queryDepartmentList,
	queryAllDepartmentList,
	queryAllPositionList,
	queryAllEmployeeList,
	queryAllCollaborateList,
	queryAllIntroducerList,
	queryArchivistList,
} from '@/services/school';
import {
	queryAllRoleList,
	queryWeekday,
} from '@/services/system';
import {
	doGetAllSiteList,
	doGetAllCarList,
} from '@/services/asset';
import {
	queryAllClassList,
	queryAllCoachList
} from '@/services/teaching';
import {
	doAllGetValueAdded,
} from '@/services/valueAdded';

import response from '@/services/response';

const defaultStatus = {
	status: [
		{
			dKey: '1',
			dValue: '启用',
		},
		{
			dKey: '0',
			dValue: '关闭',
		},
	],
	'switch': [
		{
			dKey: '1',
			dValue: '是',
		},
		{
			dKey: '0',
			dValue: '否',
		},
	],
	exam_result: [
		{
			dKey: '1',
			dValue: '通过',
		},
		{
			dKey: '2',
			dValue: '未通过',
		},
		{
			dKey: '3',
			dValue: '缺考',
		},
	],
	// 约课状态
	logic_status: [
		{ dKey: '0', dValue: '待签到' },
		{ dKey: '1', dValue: '待确认' },
		{ dKey: '2', dValue: '已完成' },
		{ dKey: '3', dValue: '未签到' },
		{ dKey: '4', dValue: '未确认' },
		{ dKey: '5', dValue: '已完成(未签到)' },
		{ dKey: '6', dValue: '已完成(未确认)' },
		{ dKey: '7', dValue: '已取消' },
		{ dKey: '8', dValue: '已撤销' },
	],
};
export default {
	namespace: 'dictionary',

	state: {
		...defaultStatus,
	},

	effects: {
		* fetch( _, { call, put } ) {
			const res = response( yield call( doGetDictionary ) )();
			// console.log( res )
			if ( res ) {
				yield put( {
					type: 'save',
					payload: res,
				} );
			}
		},
		* get( { dictKey, dispatch, payload }, { call, put, select } ) {
			// console.log( 'dictionary get ', dictKey )
			dictKey = {
				// role_id_active: 'role_id',
				depart_id_school: 'depart_id',
				depart_id_other: 'depart_id',
				// class_id_active: 'class_id',
				// position_id_active: 'position_id',
				value_added_active: 'value_added',
				employee_id_coach: 'employee_id',
				// lesson_id_active: 'lesson_id',
				// site_all_id_active: 'site_all_id',
			}[ dictKey ] || dictKey;
			const dicts = yield select( state => state.dictionary[ dictKey ] );
			if ( dicts ) return dicts;
			switch ( dictKey ) {
				case 'depart_id':
				case 'position_id':
				case 'role_id':
				case 'site_id':
				case 'car_id':
				case 'class_id':
				case 'employee_id':
				case 'value_added':
				case 'lesson_id':
				case 'colla_id':
				case 'introducer_id':
				case 'archivist_id':
				case 'coach_id':
				case 'week_day_all':
					// TODO: 临时解决字典重复拉的问题
					yield put( {
						type: 'save',
						payload: { [ dictKey ]: [] },
					} );

					return dispatch( {
						type: `dictionary/${dictKey}`,
						dictKey,
						payload,
					} );
					break;
				default:
					return [];
					break;
			}
		},
		* depart_id( { dictKey, payload }, { call, put } ) {
			const res = response( yield call( queryAllDepartmentList, payload ) )();
			if ( res ) {
				const dicts = [], dicts_school = [], dicts_other = [];
				const __dict = obj => {
					obj.dictSwitch = obj.status;
					dicts.push( {
						...obj,
						dKey: String( obj.id ),
						dValue: obj.departName,
					} );
					if ( obj.departType === 'school' && obj.status == 1 ) {
						dicts_school.push( {
							...obj,
							dKey: String( obj.id ),
							dValue: obj.departName,
						} );
					} else if ( obj.departType === 'other' && obj.status == 1 ) {
						dicts_other.push( {
							...obj,
							dKey: String( obj.id ),
							dValue: obj.departName,
						} );
					}
					// if ( obj.children ) obj.children.forEach( __dict );
				};
				res.list.forEach( __dict );

				yield put( {
					type: 'save',
					payload: {
						[ dictKey ]: dicts,
						[ dictKey + '_school' ]: dicts_school,
						[ dictKey + '_other' ]: dicts_other,
					},
				} );

				return dicts;
			}
		},
		* position_id( { dictKey, payload }, { call, put } ) {
			const res = response( yield call( queryAllPositionList, payload ) )();
			if ( res ) {
				const dicts = [], dicts_active = [];
				const __dict = obj => {
					dicts.push( {
						dKey: String( obj.id ),
						dValue: obj.title,
						positionType: obj.positionType,
						positionLevel: obj.positionLevel,
						status: obj.status,
						dictSwitch: obj.status,
					} );
					// if ( obj.status == 1 ) dicts_active.push( {
					// 	dKey: String( obj.id ),
					// 	dValue: obj.title,
					// 	positionType: obj.positionType,
					// 	positionLevel: obj.positionLevel,
					// 	status: obj.status,
					// } );
				};
				res.list.forEach( __dict );

				yield put( {
					type: 'save',
					payload: {
						[ dictKey ]: dicts,
						// [ dictKey + '_active' ]: dicts_active,
					},
				} );

				return dicts;
			}
		},
		* role_id( { dictKey, payload }, { call, put } ) {
			const res = response( yield call( queryAllRoleList, payload ) )();
			if ( res ) {
				const dicts = [], dicts_active = [];
				const __dict = obj => {
					dicts.push( {
						dKey: String( obj.id ),
						dValue: obj.title,
						dictSwitch: obj.status,
					} );
					// if ( obj.status == 1 ) dicts_active.push( {
					// 	dKey: String( obj.id ),
					// 	dValue: obj.title,
					// } );
				};
				res.forEach( __dict );

				yield put( {
					type: 'save',
					payload: {
						[ dictKey ]: dicts,
						// [ dictKey + '_active' ]: dicts_active,
					},
				} );

				return dicts;
			}
		},
		* site_id( { dictKey, payload }, { call, put } ) {
			const res = response( yield call( doGetAllSiteList, payload ) )();

			if ( res ) {
				const dicts = [];
				const __dict = obj => {
					dicts.push( {
						dKey: String( obj.id ),
						dValue: obj.title,
						siteDepartId: String( obj.departId ),
						dictSwitch: obj.status,
					} );
				};
				res.list.forEach( __dict );

				yield put( {
					type: 'save',
					payload: { [ dictKey ]: dicts },
				} );

				return dicts;
			}
		},
		// * site_all_id( { dictKey, payload }, { call, put } ) {
		// 	const res = response( yield call( doGetAllSiteList, payload ) )();
		// 	if ( res ) {
		// 		const dicts = [];
		// 		const __dict = obj => {
		// 			dicts.push( {
		// 				dKey: String( obj.id ),
		// 				dValue: obj.title,
		// 				siteDepartId: String( obj.departId ),
		// 			} );
		// 		};
		// 		res.list.forEach( __dict );
		//
		// 		yield put( {
		// 			type: 'save',
		// 			payload: { [ dictKey ]: dicts },
		// 		} );
		//
		// 		return dicts;
		// 	}
		// },
		* car_id( { dictKey, payload }, { call, put } ) {
			const res = response( yield call( doGetAllCarList, payload ) )();
			if ( res ) {
				const dicts = [];
				const __dict = obj => {
					dicts.push( {
						dKey: String( obj.id ),
						dValue: obj.plateNo,
						dictSwitch: obj.carStatus === 'normal' ? 1 : 0,
					} );
				};
				res.list.forEach( __dict );

				yield put( {
					type: 'save',
					payload: { [ dictKey ]: dicts },
				} );

				return dicts;
			}
		},
		* class_id( { dictKey, payload }, { call, put } ) {
			const res = response( yield call( queryAllClassList, payload ) )();
			if ( res ) {
				const dicts = [], dicts_active = [];
				const __dict = obj => {
					dicts.push( {
						...obj,
						dKey: String( obj.id ),
						dValue: obj.title,
						dictSwitch: obj.status,
					} );
					// if ( obj.status == 1 ) dicts_active.push( {
					// 	...obj,
					// 	dKey: String( obj.id ),
					// 	dValue: obj.title,
					// } );
				};
				res.list.forEach( __dict );

				yield put( {
					type: 'save',
					payload: {
						[ dictKey ]: dicts,
						// [ dictKey + '_active' ]: dicts_active,
					},
				} );

				return dicts;
			}
		},
		* employee_id( { dictKey, payload }, { call, put } ) {
			const res = response( yield call( queryAllEmployeeList, payload ) )();
			if ( res ) {
				const dicts = [], dicts_coach = [];
				const __dict = obj => {
					dicts.push( {
						...obj,
						dKey: String( obj.id ),
						dValue: obj.name,
					} );
					if ( obj.coachInfo && obj.coachInfo.id ) {
						dicts_coach.push( {
							...obj,
							dKey: String( obj.id ),
							dValue: obj.name,
						} );
					}
				};
				res.list.forEach( __dict );

				yield put( {
					type: 'save',
					payload: { [ dictKey ]: dicts, [ dictKey + '_coach' ]: dicts_coach },
				} );

				return dicts;
			}
		},
		* lesson_id( { dictKey, payload }, { call, put } ) {
			const res = response( yield call( doGetTeachingLessonList, payload ) )();
			if ( res ) {
				const dicts = [], dicts_active = [];
				const __dict = obj => {
					dicts.push( {
						dKey: String( obj.id ),
						dValue: obj.title,
						dictSwitch: obj.status,
					} );
					// if ( obj.status == 1 ) dicts_active.push( {
					// 	dKey: String( obj.id ),
					// 	dValue: obj.title,
					// } );
				};
				res.list.forEach( __dict );

				yield put( {
					type: 'save',
					payload: {
						[ dictKey ]: dicts,
						// [ dictKey + '_active' ]: dicts_active,
					},
				} );

				return dicts;
			}
		},
		* value_added( { dictKey, payload }, { call, put } ) {
			const res = response( yield call( doAllGetValueAdded, {
				params: {
					status: 1,
				}
			} ) )();
			if ( res ) {
				const dicts = [], dicts_active = [];
				const __dict = obj => {
					dicts.push( {
						...obj,
						dKey: String( obj.id ),
						dValue: obj.title,
					} );
					if ( obj.status === 1 ) dicts_active.push( {
						...obj,
						dKey: String( obj.id ),
						dValue: obj.title,
					} );
				};
				res.forEach( __dict );

				yield put( {
					type: 'save',
					payload: { [ dictKey ]: dicts, [ dictKey + '_active' ]: dicts_active },
				} );
			}

			return dicts;
		},
		* colla_id( { dictKey, payload }, { call, put } ) {
			const res = response( yield call( queryAllCollaborateList, {
				params: {
					status: 1,
				}
			} ) )();
			if ( res ) {
				const dicts = [];
				const __dict = obj => {
					dicts.push( {
						...obj,
						dKey: String( obj.id ),
						dValue: obj.title,
					} );
				};
				res.list.forEach( __dict );

				yield put( {
					type: 'save',
					payload: { [ dictKey ]: dicts },
				} );
			}

			return dicts;
		},
		* introducer_id( { dictKey, payload }, { call, put } ) {
			const res = response( yield call( queryAllIntroducerList, {
				params: {}
			} ) )();
			if ( res ) {
				const dicts = [];
				const __dict = obj => {
					dicts.push( {
						...obj,
						dKey: String( obj.id ),
						dValue: obj.name,
						dictSwitch: obj.status,
					} );
				};
				res.forEach( __dict );
				yield put( {
					type: 'save',
					payload: { [ dictKey ]: dicts },
				} );
			}
			return dicts;
		},
		* coach_id( { dictKey, payload }, { call, put } ) {
			const res = response( yield call( queryAllCoachList, {
				params: {}
			} ) )();
			if ( res ) {
				const dicts = [];
				const __dict = obj => {
					dicts.push( {
						...obj,
						dKey: String( obj.id ),
						dValue: obj.name,
						dictSwitch: obj.status,
					} );
				};
				res.forEach( __dict );
				yield put( {
					type: 'save',
					payload: { [ dictKey ]: dicts },
				} );
			}
			return dicts;
		},
		* archivist_id( { dictKey, payload }, { call, put } ) {
			const res = response( yield call( queryArchivistList, {
				pagination: { current: 1, pageSize: 10000 },
				params: {},
			} ) )();
			if ( res ) {
				const dicts = [];
				const __dict = obj => {
					dicts.push( {
						dKey: String( obj.id ),
						dValue: obj.name,
						isDefault: obj.isDocAcceptor == 2 ? 1 : 0,
					} );
				};
				res.list.forEach( __dict );

				yield put( {
					type: 'save',
					payload: { [ dictKey ]: dicts },
				} );
			}

			return dicts;
		},
		* week_day_all( { dictKey, payload }, { call, put } ) {
			const res = response( yield call( queryWeekday, payload ) )();
			if ( res ) {
				yield put( {
					type: 'save',
					payload: { [ dictKey ]: res },
				} );

				return res;
			}
		},
	},

	reducers: {
		save( state, { payload } ) {
			return {
				...state,
				...payload,
			};
		},
		clear() {
			return {
				...defaultStatus,
			};
		},
	},
};
