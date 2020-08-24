import { queryRule, removeRule, addRule, updateRule, getOperationLog } from '@/services/api';
import tableData from '@/assets/userList.json';
import { sleep } from '@/utils/utils';
import { message } from 'antd';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'operationLog';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ) {
			const res = response( yield call( getOperationLog, payload ) )( '', '' );
			
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ `${ name }TableData` ]: {
							list: res.list.map( ( v, i ) => ({ key: i + 1, ...v, }) ),
							pagination: res.pagination,
						}
					},
				} );
			}
		},
		* add ( { payload, callback }, { call, put } ) {
			const response = yield call( addRule, payload );
			yield put( {
				type: 'save',
				payload: response,
			} );
			if ( callback ) callback();
		},
		* remove ( { payload, callback }, { call, put } ) {
			const newTableData = [ ...tableData ].filter( v => payload.key.indexOf( v.key ) === -1 );
			
			let res;
			if ( payload.form ) {
				res = [ ...newTableData ].filter( v => {
					return Object.keys( payload.form ).every( i => {
						if ( payload.form[ i ] === '0' ) return true;
						return v[ i ] === payload.form[ i ];
					} );
				} );
			} else {
				res = [ ...newTableData ];
			}
			
			yield sleep( 1000 );
			
			yield put( {
				type: 'save',
				payload: {
					list: res.map( ( v, index ) => ({ ...v, index: index + 1 }) ),
					pagination: {
						current: 1,
						pageSize: 10,
						total: res.length,
					},
				},
			} );
			
			message.success( '删除成功！' );
			
			if ( callback ) callback();
		},
		* update ( { payload, callback }, { call, put } ) {
			const response = yield call( updateRule, payload );
			yield put( {
				type: 'save',
				payload: response,
			} );
			if ( callback ) callback();
		},
	},
	
	reducers: {
		save ( state, action ) {
			return {
				...state,
				...action.payload,
			};
		},
	},
};
