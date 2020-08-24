// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';

function useLoadData ( type, dispatch, payload = {} ) {
	useEffect( () => {
		dispatch( {
			type,
			payload,
		} );
	}, [] );
}

export default useLoadData;
