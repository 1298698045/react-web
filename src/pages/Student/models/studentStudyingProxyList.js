import { doGetNormalStudentList, doAddProxyKm, } from '@/services/student';
import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'studentStudyingProxyList';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			const res = response( yield call( doGetNormalStudentList, {
				params: {
					...payload.params,
					studentType: 3,
					proxyStatus: 0,
					// studentStatus: 0,
				},
				pagination: payload.pagination,
			} ) )( '', '' );
			
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ `${name}TableData` ]: {
							list: res.list.map( ( v, i ) => ({ key: i + 1, ...v, }) ),
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
