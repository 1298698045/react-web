import response from '@/services/response';
import tableConfig from '@/config/tables'

export default {
	namespace: 'table',
	
	state: {},
	
	effects: {
		//todo table的加载方法统一提到global，每个model下不用再写了
		* fetch ( { payload, tableName, }, { call, put } ){
			const res = response( yield call( tableConfig[ tableName ], {
				...payload,
			} ) )( '', '' );
			
			console.log( res );
			
			if ( res ) {
				console.log( tableName );
				yield put( {
					type: `${tableName}/save`,
					payload: {
						[ `${tableName}TableData` ]: {
							list: res.list.map( ( v, i ) => ({ key: i + 1, ...v, }) ),
							pagination: res.pagination,
						}
					},
				} );
			}
		},
	},
};
