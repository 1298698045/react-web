const path = require( 'path' );

function resolve ( dir ) {
	return path.join( __dirname, '../', dir );
}

module.exports = {
	context: path.resolve( __dirname, './' ),
	resolve: {
		extensions: [ '.js', '.json' ],
		alias: {
			'@': resolve( 'src' ),
			'@/assets': resolve( 'src/assets' ),
			'@/pages': resolve( 'src/pages' ),
			'@/components': resolve( 'src/components' ),
			'@/services': resolve( 'src/services' ),
			'@/utils': resolve( 'src/utils' ),
		},
	},
};
