import { openLuckList, closeGroup,signLuckDraw , complateLuckDraw } from '@/services/activity';
import createInitialModelState from '@/utils/createInitialModelState';
import {responseA,requestA} from '@/services/response';
import transformRequestParams from '@/utils/transformRequestParams';

const name = 'openLuckList';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			const res = responseA( yield call( openLuckList, requestA({
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
			const res = responseA( yield call( openLuckList, requestA({
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
		* complateLuckDraw ( { payload }, { call, } ){
			return responseA( yield call( complateLuckDraw, payload ))()('完成开奖操作成功', '');
		},
		* signLuckDraw ( { payload }, { call, } ){
			return responseA( yield call( signLuckDraw, payload ))()();
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
