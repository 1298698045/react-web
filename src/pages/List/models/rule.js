import { queryRule, removeRule, addRule, updateRule } from '@/services/api';
import tableData from '@/assets/userList.json';
import { sleep } from '@/utils/utils';
import { message } from 'antd';

export default {
	namespace: 'table.js',
	
	state: {
		data: {
			list: [],
			pagination: {},
		},
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ) {
			// const response = yield call( queryRule, payload );
			
			let res;
			if ( payload ) {
				res = [ ...tableData ].filter( v => {
					return Object.keys( payload ).every( i => {
						if ( payload[ i ] === '0' ) return true;
						return v[ i ] === payload[ i ];
					} );
				} );
			} else {
				res = [ ...tableData ];
			}
			
			yield sleep( 1500 );
			
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
				data: action.payload,
			};
		},
	},
};
