import {
	queryRoleList,
	saveRole,
	deleteRole,
	queryPrivilegeTree,
	saveRolePrivilege,
} from '@/services/system';
import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'role';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
		privilegeTree: [],
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			const res = response( yield call( queryRoleList, payload ) )();
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
		* saveRole( { params }, { call, put } ) {
			return response( yield call( saveRole, { params } ) )( MESSAGE.SAVE );
		},
		* deleteRole( { params }, { call, put } ) {
			return response( yield call( deleteRole, { params } ) )( MESSAGE.DELETE );
		},
		* queryPrivilegeTree( { params = {} }, { call, put } ) {
			const privilegeTree = response( yield call( queryPrivilegeTree, { params } ) )();
			if ( privilegeTree ) {
				yield put( {
					type: 'save',
					payload: { privilegeTree },
				} );
			}
		},
		* saveRolePrivilege( { payload }, { call, put } ) {
			return response( yield call( saveRolePrivilege, payload ) )( MESSAGE.SAVE );
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
