import { doGetValueAddedList, doSaveValueAdded, } from '@/services/valueAdded';
import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';
import transformRequestParams from '@/utils/transformRequestParams';

const name = 'valueAddedList';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			const res = response( yield call( doGetValueAddedList, {
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
		//todo 把这个refresh 更新到所有table上
		* refresh ( _, { call, put, select, } ){
			const tableData = yield select( state => state[ name ][ `${name}TableData` ] );
			const { params } = tableData;
			const res = response( yield call( doGetValueAddedList, {
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
		* switchValueAdded ( { payload }, { call, } ){
			response( yield call( doSaveValueAdded, {
				params: {
					...payload
				}
			} ) )( payload.status === '0' ? '关闭成功' : '开启成功！', '' );
		},
		* saveValueAdded ( { payload }, { call, } ){
			const requestParams = transformRequestParams( { ...payload } );
			
			response( yield call( doSaveValueAdded, {
				params: {
					...requestParams,
				}
			} ) )( '保存成功！', '' );
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
