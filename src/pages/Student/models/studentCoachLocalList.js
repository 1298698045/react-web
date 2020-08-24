import { queryCoachList, } from '@/services/teaching';
import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';
import FIELDS from '@/config/fields';

const name = 'studentCoachLocalList';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			const p = {
				...payload.params,
			};
			if ( !p[ FIELDS.STUDENT.KM.key ] ) {
				p[ FIELDS.STUDENT.KM.key ] = 'km2';
			}
			const res = response( yield call( queryCoachList, {
				params: {
					leaving: '0',
					...p,
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
