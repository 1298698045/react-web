import locationData from '@/assets/jx_division';

/**
 * 根据id查询省市区
 * @param type 查询类型 province,city,district，不传为查询三个。
 * @returns {Function}
 */
const getLocation = type => data => {
	let dataId;
	
	if ( type ) {
		// 查询省市区单个
		if ( Array.isArray( data ) ) {
			dataId = data[ 0 ];
		} else {
			dataId = data;
		}
		
		const result = locationData[ type ].find( ( { id } ) => id === String( dataId ) );
		
		return result ? result.name : false;
	} else {
		// 查询多个省市区
		if ( Array.isArray( data ) ) {
			dataId = data;
			
			const locationType = [ 'province', 'city', 'district' ];
			
			return dataId.map( ( d, index ) => {
				const itemResult = locationData[ locationType[ index ] ].find( ( { id } ) => id === String( d ) );
				
				return itemResult ? itemResult.name : false;
			} );
		}
		
		return false;
	}
};

export default getLocation;
