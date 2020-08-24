import _ from 'lodash';

const useGetInitialValue = d => fields => {
	const data = _.cloneDeep( d );
	// return useMemo( () => {
	// 	if ( Array.isArray( data ) ) {
	// 		if ( data.length >= 1 ) {
	// 			if ( data[ 0 ][ fields.key ] === undefined ) {
	// 				if ( fields.type === 'checkbox' || fields.type === 'rangeDate' ) {
	// 					return [];
	// 				}
	//
	// 				if ( fields.type === 'date' ) {
	// 					return null;
	// 				}
	// 			}
	//
	// 			if ( fields.type === 'checkbox' ) {
	// 				return data[ 0 ][ fields.key ].split( ',' );
	// 			}
	//
	// 			return data[ 0 ][ fields.key ];
	// 		}
	// 		return '';
	// 	}
	//
	// 	if ( data[ fields.key ] === undefined ) {
	// 		if ( fields.type === 'checkbox' || fields.type === 'rangeDate' ) {
	// 			return [];
	// 		}
	//
	// 		if ( fields.type === 'date' ) {
	// 			return null;
	// 		}
	// 	}
	//
	// 	if ( fields.type === 'checkbox' ) {
	// 		return data[ fields.key ].split( ',' );
	// 	}
	//
	// 	return data[ fields.key ];
	//
	// }, [ data, fields ] );
	
	if ( Array.isArray( data ) ) {
		if ( data.length >= 1 ) {
			if ( data[ 0 ][ fields.key ] === undefined ) {
				if ( fields.type === 'checkbox' || fields.type === 'rangeDate' ) {
					return [];
				}
				
				if ( fields.type === 'date' ) {
					return null;
				}
			}
			
			if ( fields.type === 'checkbox' ) {
				return data[ 0 ][ fields.key ].split( ',' );
			}
			
			return data[ 0 ][ fields.key ];
		}
		return '';
	}
	
	if ( data[ fields.key ] === undefined ) {
		if ( fields.type === 'checkbox' || fields.type === 'rangeDate' ) {
			return [];
		}
		
		if ( fields.type === 'date' ) {
			return null;
		}
	}
	
	if ( fields.type === 'checkbox' ) {
		return data[ fields.key ].split( ',' );
	}
	
	return data[ fields.key ];
};

export default useGetInitialValue;
