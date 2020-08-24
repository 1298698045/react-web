import { queryBargainList, saveBargain, updBargain, updBargainStatus, adjustBargain, getBargainInfoById} from '@/services/activity';
import createInitialModelState from '@/utils/createInitialModelState';
import { responseA, requestA } from '@/services/response';
import transformRequestParams from '@/utils/transformRequestParams';

const name = 'bargain';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			const res = responseA( yield call( queryBargainList, requestA({
				...payload
			})))( 'item' )();
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
		//todo 把这个refresh 更新到所有table上
		* refresh ( _, { call, put, select, } ){
			const tableData = yield select( state => state[ name ][ `${name}TableData` ] );
			const { params } = tableData;
			const res = responseA( yield call( queryBargainList, requestA({
				params,
				pagination: {
					current: 1,
					pageSize: 10,
				},
			} ) ) )( 'item', '' );
			
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
		* saveActivity ( { payload }, { call, } ){
			const requestParams = transformRequestParams( { ...payload } );
			return responseA( yield call( saveBargain, payload ) )()('保存成功！', '' );
		},
		* updActivity ( { payload }, { call, } ){
			const requestParams = transformRequestParams( { ...payload } );
			return responseA( yield call( updBargain, payload ) )()('修改成功！', '' );
		},
		* updAcitivityStatus ( { params, actionName }, { call, } ){
			return responseA( yield call( updBargainStatus, params ) )()( `${actionName}成功`, '' );
		},
		* activityAdjust ( { payload }, { call, } ){			
			return responseA( yield call( adjustBargain, payload ))()( '调整成功', '' );
		},
		* getActivityInfo ( { payload }, { call, } ){
			return responseA( yield call( getBargainInfoById,  payload ) )()();
		}
	},
	reducers: {
		save ( state, action ){
			return {
				...state,
				...action.payload,
			};
		},
		backToFirstPage(state, action) {
			return {
				...state,
				[ `${name}TableData` ]: {
					...state[ `${name}TableData` ],
					pagination: {
						...state[ `${name}TableData` ].pagination,
						current: 1,
					},
				},
			};
		}
	},
};
