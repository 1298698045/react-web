import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'dva';
import { hasPriv } from '@/utils/privilege';
import Redirect from 'umi/redirect';

const RouterRedirect = props => {
	const { match, children, location, dispatch, loading, menu } = props;
	const { menuData } = menu;
	
	const findMenu = ( list ) => {
		if ( !list ) return false;
		let re = list.find( v => v.path === location.pathname );
		if ( re ) return re;
		for ( let i = 0; i < list.length; ++i ) {
			re = findMenu( list[ i ].children );
			if ( re ) return re;
		}
	};
	
	const currentMenu = findMenu( menuData );
	// console.log(currentMenu)
	let redirectPath = '/';
	
	if ( currentMenu.children ) {
		const menuFound = currentMenu.children.find( v => v.path !== currentMenu.path && hasPriv( v.privs ) );
		if ( menuFound ) redirectPath = menuFound.path;
	}
	
	return (
		<Redirect to={redirectPath}/>
	);
};

export default connect( (
	{
		loading,
		global,
		menu,
	}
) => (
	{
		loading,
		global,
		menu,
	}
) )( RouterRedirect );
