import { getExpectSignUpList, } from '@/services/student';
import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';
import _ from 'lodash';

const name = 'studentExpectSignUp';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			payload.params.speedStatus = 1
			const res = response( yield call( getExpectSignUpList, payload ) )( '', '' );
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
