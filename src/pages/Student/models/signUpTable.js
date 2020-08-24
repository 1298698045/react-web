import { doGetStudentList, } from '@/services/api';
import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';
import _ from 'lodash';

const name = 'studentSignUp';
const initialState = createInitialModelState( name );

const deleteParams = obj => {
	Object.keys( obj ).forEach( i => {
		if ( obj[ i ] !== undefined && obj[ i ] !== null ) {
			if ( typeof obj[ i ] === 'object' ) {
				deleteParams( obj[ i ] );
			}
		} else {
			delete obj[ i ];
		}
	} );
};

const deleteEmptyObj = obj => {
	Object.keys( obj ).forEach( i => {
		if ( !_.isEqual( obj[ i ], {} ) ) {
			if ( typeof obj[ i ] === 'object' ) {
				deleteParams( obj[ i ] );
			}
		} else {
			delete obj[ i ];
		}
	} );
};

export default {
	namespace: name,
	
	state: {
		...initialState,
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			const { params } = payload;
			if ( params ) {
				deleteParams( params );
				deleteEmptyObj( params );
			}
			
			const res = response( yield call( doGetStudentList, payload ) )( '', '' );
			
			if ( res ) {
				
				const list = res.list.map( ( v, i ) => ({
					key: i + 1,
					...v,
					...v.finance,
				}) );
				
				yield put( {
					type: 'save',
					payload: {
						[ `${name}TableData` ]: {
							list,
							pagination: res.pagination,
						}
					},
				} );
			}
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
