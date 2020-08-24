import { doGetSiteInfo, doGetSiteList, doSaveSite, } from '@/services/api';
import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';
import transformRequestParams from '@/utils/transformRequestParams';

const name = 'assetSiteList';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
		siteInfo: {},
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			const res = response( yield call( doGetSiteList, {
				...payload,
			} ) )( '', '' );
			
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ `${name}TableData` ]: {
							params: payload.params,
							list: res.list.map( ( v, i ) => ({ key: i + 1, ...v, }) ),
							pagination: res.pagination,
						}
					},
				} );
			}
		},
		* refresh ( _, { call, put, select, } ){
			const tableData = yield select( state => state[ name ][ `${name}TableData` ] );
			const { params } = tableData;
			const res = response( yield call( doGetSiteList, {
				params,
				pagination: {
					current: 1,
					pageSize: 10,
				},
			} ) )( '', '' );
			
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ `${name}TableData` ]: {
							...tableData,
							list: res.list.map( ( v, i ) => ({ key: i + 1, ...v, }) ),
							pagination: res.pagination,
						}
					},
				} );
			}
		},
		* saveSite ( { payload, }, { call, } ){
			const requestParams = transformRequestParams( { ...payload } );
			
			return response( yield call( doSaveSite, {
				params: {
					...requestParams,
				},
			} ) )( '保存成功！', '' );
		},
		* getSiteInfo ( { payload, }, { call, } ){
			return response( yield call( doGetSiteInfo, {
				params: {
					siteId: payload,
				},
			} ) )( '', '' );
		},
	},
	
	reducers: {
		save ( state, action ){
			return {
				...state,
				...action.payload,
			};
		},
	},
};
