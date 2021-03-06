import {
	queryScoreTab
} from '@/services/dataStatistics';
import response from '@/services/response';
import createInitialModelState from '@/utils/createInitialModelState';

const name = 'scoreStudentType';
const initialState = createInitialModelState( name );
export default {
	namespace: name,
	
	state: {
		...initialState,
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			const res = response( yield call( queryScoreTab, payload ) )( '', '' );
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ `${name}TableData` ]: {
							params: payload.params,
							list: res.map( ( v, i ) => ({ key: i + 1, ...v, }) ),
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
	}
};
