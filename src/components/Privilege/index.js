import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import { hasPriv } from '@/utils/privilege';

const Privilege = props => {
	const {
		dispatch,
		user: { currentUserPrivs, currentUserPrivsLoaded },
		loading,
		privs = [],
		logic = '&',
		noMatch = null,
		children,
	} = props;

	const spinning = !currentUserPrivsLoaded || loading.effects[ 'user/getUserPrivs' ];

	return (
			!spinning && (hasPriv( privs, logic ) ? children : noMatch)
	);
};

export default connect( ( { user, loading, global } ) => ({ user, loading, global }) )( Privilege );
