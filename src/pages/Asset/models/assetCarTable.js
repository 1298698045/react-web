import { doGetCarInfo, doGetCarList, doSaveCar, } from '@/services/api';
import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';
import transformRequestParams from '@/utils/transformRequestParams';

const name = 'assetCarList';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
		carInfo: {},
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			const res = response( yield call( doGetCarList, {
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
						},
					},
				} );
			}
		},
		* refresh ( _, { call, put, select, } ){
			const tableData = yield select( state => state[ name ][ `${name}TableData` ] );
			const { params } = tableData;
			const res = response( yield call( doGetCarList, {
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
		* saveCar ( { payload, }, { call, } ){
			const requestParams = transformRequestParams( { ...payload } );
			
			return response( yield call( doSaveCar, {
				params: {
					...requestParams,
				},
			} ) )( '保存成功！', '' );
		},
		* getCarInfo ( { payload, }, { call, } ){
			return response( yield call( doGetCarInfo, {
				params: {
					carId: payload,
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
