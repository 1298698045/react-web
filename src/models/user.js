import { query as queryUsers, queryUserSchool } from '@/services/user';
import { getUserPrivs } from "@/services/system";
import response from '@/services/response';
import { setMyPrivs } from '@/utils/privilege';
import router from "umi/router";

export default {
	namespace: 'user',

	state: {
		list: [],
		currentUser: {},
		currentUserPrivs: {},
		currentUserPrivsLoaded: false,
		currentUserSchool: {},
	},

	effects: {
		* fetch( _, { call, put } ) {
			const res = yield call( queryUsers );
			yield put( {
				type: 'save',
				payload: res,
			} );
		},
		* fetchCurrent( _, { call, put } ) {
			let userInfo = {};
			try {
				userInfo = JSON.parse( localStorage.getItem( 'userInfo' ) || '{}' ) || {};
			} catch ( e ) {
				userInfo = {};
			}
			yield put( {
				type: 'saveCurrentUser',
				payload: userInfo,
			} );
			return userInfo;
		},
		* getUserPrivs( { uid }, { call, put, select } ) {
			const res = response( yield call( getUserPrivs, { params: { uid } } ) )();
			if ( res !== false ) {
				const privs = {};
				res.forEach( name => {
					privs[ name ] = true;
				} );
				setMyPrivs( privs );
				yield put( {
					type: 'saveCurrentUserPrivs',
					payload: privs,
				} );
			} else {
				if ( !/#\/user\/login/.test( window.location.hash ) ) {
					router.push( {
						pathname: '/user/login',
						query: {
							redirect: window.location.href,
						},
					} );
				}
			}
		},
		* queryUserSchool( _, { call, put, select } ) {
			const res = response( yield call( queryUserSchool ) )();
			if ( res !== false ) {
				localStorage.setItem( 'schoolInfo', JSON.stringify( res.list[ 0 ] ) );
				yield put( {
					type: 'saveCurrentUserSchool',
					payload: res.list[ 0 ],
				} );
			}
			return res.list;
		},
	},

	reducers: {
		save( state, action ) {
			return {
				...state,
				list: action.payload,
			};
		},
		saveCurrentUser( state, action ) {
			return {
				...state,
				currentUser: action.payload || {},
			};
		},
		saveCurrentUserPrivs( state, action ) {
			return {
				...state,
				currentUserPrivs: action.payload || {},
				currentUserPrivsLoaded: true,
			};
		},
		clearCurrentUserPrivs( state, action ) {
			return {
				...state,
				currentUserPrivs: {},
				currentUserPrivsLoaded: false,
			};
		},
		changeNotifyCount( state, action ) {
			return {
				...state,
				currentUser: {
					...state.currentUser,
					notifyCount: action.payload.totalCount,
					unreadCount: action.payload.unreadCount,
				},
			};
		},
		saveCurrentUserSchool( state, action ) {
			return {
				...state,
				currentUserSchool: action.payload || {},
			};
		},
	},
};
