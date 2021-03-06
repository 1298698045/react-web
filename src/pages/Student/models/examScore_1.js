import {
	importStudentResult,
	queryExamScoreList,
	importScoreResult,
} from '@/services/student';
import { sleep } from '@/utils/utils';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'examScore_1';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
	},

	effects: {
		* fetch( { payload: { params, pagination } }, { call, put } ) {
			const res = response( yield call( queryExamScoreList, {
				params: {
					...params,
					status: 1,
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
		* queryResult( { params }, { call, put } ) {
			return response( yield call( importScoreResult, { params } ) )( false, false );
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
