const system = ( key => {
	const r = window.location.search.match( new RegExp( "([\?|&])" + key + "=([^&]*)(&|$)" ) );
	return r ? decodeURIComponent( r[ 2 ] ) : null;
} )( 'system' );

const titles = {
	aplus: '好好科技',
	default: '好好科技',
};

const logos = {
	aplus: require( '@/assets/logo.png' ),
	default: require( '@/assets/logo.png' ),
};

export const title = titles[ system ] || titles.default;

export const logo = logos[ system ] || logos.default;