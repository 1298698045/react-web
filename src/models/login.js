import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { accountLogin, fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { setMyPrivs } from '@/utils/privilege';
import response from '@/services/response';

export default {
	namespace: 'login',

	state: {
		status: undefined,
	},

	effects: {
		* login( { payload }, { call, put } ) {
			const data = response( yield call( accountLogin, payload ) )();
			if ( data === false ) return data;
			yield put( {
				type: 'user/clearCurrentUserPrivs',
			} );
			yield put( {
				type: 'changeLoginStatus',
				payload: {
					...data,
					currentAuthority: 'admin',
				},
			} );
			// Login successfully
			localStorage.setItem( 'userInfo', JSON.stringify( data.token ) );

			console.log( data.token )
			// if ( data.status === 'ok' ) {
			reloadAuthorized();
			const urlParams = new URL( window.location.href );
			const params = getPageQuery();
			let { redirect } = params;
			if ( redirect ) {
				const redirectUrlParams = new URL( redirect );
				if ( redirectUrlParams.origin === urlParams.origin ) {
					redirect = redirect.substr( urlParams.origin.length );
					if ( redirect.match( /^\/.*#/ ) ) {
						redirect = redirect.substr( redirect.indexOf( '#' ) + 1 );
					}
				} else {
					redirect = null;
				}
			}
			yield put( routerRedux.replace( redirect || '/' ) );
			// }

			return data;
		},

		* getCaptcha( { payload }, { call } ) {
			yield call( getFakeCaptcha, payload );
		},

		* logout( _, { put } ) {
			yield put( {
				type: 'user/clearCurrentUserPrivs',
			} );
			yield put( {
				type: 'changeLoginStatus',
				payload: {
					status: false,
					currentAuthority: 'guest',
				},
			} );
			setMyPrivs( {} );
			reloadAuthorized();
			yield put( {
				type: 'dictionary/clear',
			} );
			// redirect
			if ( !/#\/user\/login/.test( window.location.hash ) ) {
				yield put(
					routerRedux.replace( {
						pathname: '/user/login',
						search: stringify( {
							redirect: window.location.href,
						} ),
					} )
				);
			}
		},
	},

	reducers: {
		changeLoginStatus( state, { payload } ) {
			setAuthority( payload.currentAuthority );
			return {
				...state,
				status: payload.status,
				type: payload.type,
			};
		},
	},
};
