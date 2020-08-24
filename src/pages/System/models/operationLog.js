import {
	queryOperationLogList,
} from '@/services/system';
import { sleep } from '@/utils/utils';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';
import { saveExamAppointmentEdit } from "@/services/student";

const name = 'operationLog';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			const res = response( yield call( queryOperationLogList, payload ) )( '', '' );
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
