import {
	queryCoachList,
	saveCoach,
	changePlan,
	changeBookNum
} from '@/services/teaching';
import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'coach';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			const res = response( yield call( queryCoachList, payload ) )();
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
		* saveCoachEdit( { payload }, { call, put } ) {
			return response( yield call( saveCoach, payload ) )( MESSAGE.SAVE );
		},
		* changeBookNum( { params }, { call, put } ) {
			return response( yield call( changeBookNum, params ) )( '修改成功'  );
		},
		* changePlan( { params }, { call, put } ) {
			return response( yield call( changePlan, params ) )( '修改成功' );
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
