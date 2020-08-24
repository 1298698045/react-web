import { queryBargainDetailList  } from '@/services/activity';
import createInitialModelState from '@/utils/createInitialModelState';
import { responseA, requestA } from '@/services/response';
import transformRequestParams from '@/utils/transformRequestParams';

const name = 'bargainView';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			const res = responseA( yield call( queryBargainDetailList, {
				...payload.params,
				haggleVerificationDto: {
					pageNo: payload.pagination.current,
					pageSize: payload.pagination.pageSize
				}
			}))()();
			let pagination = {
				current: res.currentPage,
				pageSize: res.pageSize,
				total: res.totalNum
			}
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ `${name}TableData` ]: {
							params: payload.params,
							list: res.haggleVerificationList.map( ( v, i ) => ({ key: i + 1, ...v, }) ),
							pagination: pagination,
						}
					},
				} );
			}
		},
		//todo 把这个refresh 更新到所有table上
		* refresh ( _, { call, put, select, } ){
			const tableData = yield select( state => state[ name ][ `${name}TableData` ] );
			const { params } = tableData;
			const res = responseA( yield call( queryBargainDetailList, {
				...payload.params,
				haggleVerificationDto: {
					pageNo: payload.pagination.current,
					pageSize: payload.pagination.pageSize
				}
			} ) )();
			let pagination = {
				current: res.currentPage,
				pageSize: res.pageSize,
				total: res.totalNum
			}
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ `${name}TableData` ]: {
							params: payload.params,
							list: res.haggleVerificationList.map( ( v, i ) => ({ key: i + 1, ...v, }) ),
							pagination: pagination,
						}
					},
				} )
			}
		},
		* closeBargain ( { payload }, { call, } ){
			return responseA( yield call( closeBargain, payload ))()();
		}
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
