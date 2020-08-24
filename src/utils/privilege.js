export function getMyPrivs() {
	const privString = localStorage.getItem( 'my-privs' ) || "{}";
	let privs;
	try {
		privs = JSON.parse( privString );
	} catch ( e ) {
		privs = {};
	}
	return privs;
}

export function setMyPrivs( privs ) {
	return localStorage.setItem( 'my-privs', JSON.stringify( privs ) );
}

export function hasPriv( needPrivList = [], logic = '&' ) {
	if ( typeof needPrivList === 'string' ) needPrivList = [ needPrivList ];
	const myPrivs = getMyPrivs();
	if ( !needPrivList.length ) return true;
	switch ( logic ) {
		case '&':
		case '&&':
		case 'and':
			return needPrivList.reduce( ( acc, priv ) => ( !!myPrivs[ priv ] && acc ), true );
		case '|':
		case '||':
		case 'or':
			return needPrivList.reduce( ( acc, priv ) => ( !!myPrivs[ priv ] || acc ), false );
	}
	return false;
}
