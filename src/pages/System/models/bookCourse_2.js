import {
	queryWeekday, setMatchMode,
	setWeekday,
	saveWeekday,
	deleteRecord
} from '@/services/system';
import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'bookCourse_2';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			const res = response( yield call( queryWeekday, payload ) )(  );
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ `${ name }TableData` ]: {
							list: res.map( ( v, i ) => ( { key: i + 1, ...v, } ) ),
							// pagination: res.pagination,
						}
					},
				} );
			}
		},
		* setWeekday( { payload }, { call, put } ) {
			return response( yield call( setWeekday, payload ) )( MESSAGE.SAVE );
		},
		* saveWeekday( { payload }, { call, put } ) {
			return response( yield call( saveWeekday, payload ) )( MESSAGE.SAVE );
		},
		* deleteRecord( { payload }, { call, put } ) {
			payload.params.dType= "week_day"
			return response( yield call( deleteRecord, payload ) )( MESSAGE.DELETE );
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
