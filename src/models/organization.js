import {
	queryDepartmentList,
	saveDepartment,
	deleteDepartment,
} from '@/services/school';
import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'organization';

export default {
	namespace: name,

	state: {
		departments: []
	},

	effects: {
		* queryDepartmentList( { payload }, { call, put } ) {
			const res = response( yield call( queryDepartmentList, payload ) )();
			if ( res ) yield put( {
				type: 'save',
				payload: { departments: res.list || [] },
			} );
		},
		* saveDepartment( { params }, { call, put } ) {
			return response( yield call( saveDepartment, { params } ) )( MESSAGE.SAVE );
		},
		* deleteDepartment( { params }, { call, put } ) {
			return response( yield call( deleteDepartment, { params } ) )( MESSAGE.DELETE );
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
