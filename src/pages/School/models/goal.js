import {
	queryGoalList,
	saveGoal,
} from '@/services/school';
import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'orgGoal';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			const res = response( yield call( queryGoalList, payload ) )();
			if ( res ) {
				const map = {};
				res.list.forEach( v => {
					if ( !map[ v.year ] ) map[ v.year ] = {
						year: v.year,
						total: 0,
						progress: 0,
						list: [],
					};
					map[ v.year ].total += v.total[ 0 ];
					map[ v.year ].progress += v.total[ 1 ];
					map[ v.year ].list.push( v );
				} );
				yield put( {
					type: 'save',
					payload: {
						[ `${ name }TableData` ]: {
							list: Object.keys( map ).map( ( year, i ) => ( {
								key: i + 1,
								year,
								total: map[ year ].total,
								progress: map[ year ].progress,
								list: map[ year ].list,
							} ) ),
							pagination: res.pagination,
						}
					},
				} );
			}
		},
		* saveGoalEdit( { payload }, { call, put } ) {
			return response( yield call( saveGoal, payload ) )( MESSAGE.SAVE );
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
