import { doGetNormalStudentList, doGetDependCost } from '@/services/student';
import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'studentStudyingLocalList';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			const { params } = payload;
			if ( params.kmStatus && params.kmStatus.length > 0 ) {
				params[ `${params.kmStatus[ 0 ]}Status` ] = params.kmStatus[ 1 ];
				delete params.kmStatus;
			} else if ( params.kmStatus && params.kmStatus.length === 0 ) {
				delete params.kmStatus;
			}
			
			const res = response( yield call( doGetNormalStudentList, {
				params: {
					...params,
					studentStatus: 4,
					studentType: 1,
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
		* getFee ( { payload }, { call, } ){
			return response( yield call( doGetDependCost, payload ) )( '', '' );
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
