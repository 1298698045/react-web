import {
	queryEmployeeList,
	queryEmployeeInfo,
	saveEmployee,
	preLeave,
	cancelPreLeave,
	confirmPreLeave,
} from '@/services/school';
import {
	doGetAllCarList,
	doGetUnbindCarList,
} from '@/services/asset';
import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'orgEmployee';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			const res = response( yield call( queryEmployeeList, payload ) )();
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ `${ name }TableData` ]: {
							list: res.list.map( ( v, i ) => ( { key: i + 1, ...v, } ) ),
							pagination: res.pagination,
						}
					},
				} );
			}
		},
		* queryEmployeeInfo( { params }, { call, put } ) {
			return response( yield call( queryEmployeeInfo, { params } ) )();
		},
		* saveEmployeeEdit( { params }, { call, put } ) {
			return response( yield call( saveEmployee, { params } ) )( MESSAGE.SAVE );
		},
		* preLeave( { params }, { call, put } ) {
			return response( yield call( preLeave, { params } ) )( MESSAGE.OPRATE );
		},
		* cancelPreLeave( { params }, { call, put } ) {
			return response( yield call( cancelPreLeave, { params } ) )( MESSAGE.OPRATE );
		},
		* confirmPreLeave( { params }, { call, put } ) {
			return response( yield call( confirmPreLeave, { params } ) )( MESSAGE.OPRATE );
		},
		* doGetAllCarList( { params }, { call, put } ) {
			const res = response( yield call( doGetAllCarList, { params } ) )();
			if ( res ) yield put( {
				type: 'save',
				payload: {
					allCars: res.list,
				},
			} );
		},
		* doGetUnbindCarList( { params }, { call, put } ) {
			const res = response( yield call( doGetUnbindCarList, { params } ) )();
			if ( res ) yield put( {
				type: 'save',
				payload: {
					unbindCars: res.list,
				},
			} );
		},
	},

	reducers: {
		save( state, action ) {
			return {
				...state,
				...action.payload,
			};
		},
	},
};
