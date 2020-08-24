import {
	importStudentResult,
} from '@/services/student';
import { MESSAGE } from '@/config/tips';

import response from '@/services/response';

const name = 'initStudent';

export default {
	namespace: name,

	state: {},

	effects: {
		* queryResult( { params }, { call, put } ) {
			return response( yield call( importStudentResult, { params } ) )( false, false );
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
