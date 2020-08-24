import { queryStatisticPageList  } from '@/services/activity';
import createInitialModelState from '@/utils/createInitialModelState';
import {responseA,requestA} from '@/services/response';
import transformRequestParams from '@/utils/transformRequestParams';

const name = 'luckDrawStatistics';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			const res = responseA( yield call( queryStatisticPageList, requestA({
				...payload
			})))( 'item' )();
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ `${name}TableData` ]: {
							params: payload.params,
							list: res.list.map( ( v, i ) => ({ key: i + 1, ...v, }) ),
							pagination: res.pagination,
						}
					},
				} );
			}
		}
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
