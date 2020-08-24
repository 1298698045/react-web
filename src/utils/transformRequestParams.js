import _ from 'lodash';

const transformRequestParams = params => {
	const paramsArr = Object.keys( params ).filter( key => {
			if ( _.isEqual( params[ key ], undefined ) ) {
				return false;
			}
			
			return !_.isEqual( params[ key ], null );
		}
	).map( key => ({ [ key ]: params[ key ] }) );
	
	return Object.assign( {}, ...paramsArr );
};

export default transformRequestParams;
