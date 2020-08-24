import React, { useEffect } from 'react';
import Redirect from 'umi/redirect';
import { Spin } from "antd";
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import { getAuthority } from '@/utils/authority';
import { hasPriv } from '@/utils/privilege';
import router from 'umi/router';
import Exception403 from '@/pages/Exception/403';

function AuthComponent( { loading, dispatch, children, location, routerData, currentUserPrivsLoaded } ) {
	useEffect( () => {
		dispatch( {
			type: 'user/fetchCurrent',
		} ).then( userInfo => {
			// console.log(userInfo)
			// if (userInfo.userId) {
				dispatch( {
					type: 'user/getUserPrivs',
					uid: userInfo.userId,
				} );
			// } else {
			// 	if ( !/#\/user\/login/.test( window.location.hash ) ) {
			// 		router.push( {
			// 			pathname: '/user/login',
			// 			query: {
			// 				redirect: window.location.href,
			// 			},
			// 		} );
			// 	}
			// }
		} );
	}, [] );

	const auth = getAuthority();
	const isLogin = auth && auth[ 0 ] !== 'guest';
	const getRoutePrivs = ( path, routeData ) => {
		let privs;
		routeData.forEach( route => {
			// match prefix
			if ( pathToRegexp( `${route.path}(.*)` ).test( path ) ) {
				privs = route.privs || privs;

				// get children authority recursively
				if ( route.routes ) {
					privs = getRoutePrivs( path, route.routes ) || privs;
				}
			}
		} );
		return privs;
	};
	return (
		<Spin spinning={loading.effects[ 'user/getUserPrivs' ] || false}>{
			!currentUserPrivsLoaded ?
				<div style={{ width: '100%', height: '100%' }}></div> :
				( isLogin && hasPriv( getRoutePrivs( location.pathname, routerData ) ) ) ?
					children :
					( isLogin ? <Exception403/> : <Redirect to="/user/login"/> )
		}</Spin>
	);
}

export default connect( ( { loading, menu: menuModel, user: { currentUserPrivs, currentUserPrivsLoaded } } ) => ( {
	loading,
	routerData: menuModel.routerData,
	currentUserPrivsLoaded,
} ) )( AuthComponent );
