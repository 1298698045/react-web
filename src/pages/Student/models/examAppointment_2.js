import {
	queryExamAppointmentList,
} from '@/services/student';
import { sleep } from '@/utils/utils';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'examAppointment_2';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
	},

	effects: {
		* fetch( { payload: { params, pagination } }, { call, put } ) {
			const res = response( yield call( queryExamAppointmentList, {
				params: {
					...params,
					status: 0,
				},
				pagination,
			} ) )( '', '' );

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
