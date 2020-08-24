import { doGetNormalStudentList, graduateStudent  } from '@/services/student';
import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';
import transformRequestParams from '@/utils/transformRequestParams';

const name = 'studentFinishList';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			const { params } = payload;
			console.log(payload)
			const res = response( yield call( doGetNormalStudentList, {
				params: {
					...payload.params
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
		* graduateStudent( { payload }, { call, put } ) {
			return response( yield call( graduateStudent, { params: payload } ) )( '新增毕业学员成功' );
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
