import {
	queryCoachStudentData,
} from '@/services/teaching';
import { sleep } from '@/utils/utils';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'coachStudent';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			const res = response( yield call( queryCoachStudentData, payload ) )( '', '' );
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ `${ name }TableData` ]: {
							list: res.list.map( ( v, i ) => ( { key: i + 1, ...v, } ) ),
							pagination: res.pagination,
						},
						total: res.total,
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
