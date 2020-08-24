import { doGetNormalStudentList, } from '@/services/student';
import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'changeClassStudents';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			delete payload.params.isCancel
			delete payload.params.destClassId
			const res = response( yield call( doGetNormalStudentList, payload ) )();
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
		}
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
