import {
	querySetting,
	setSetting,
	setOtherSetting,
	intensiveCourseSwitch
} from '@/services/system';
import { queryActivityPageList } from '@/services/activity';

import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'functionSettings';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState
	},

	effects: {
		* queryReadingSetting( { params }, { call, put } ) {
			const res = response( yield call( querySetting, { params } ) )();
			const { type } = params;
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ type ]: translate( res ),
					},
				} );
			}
		},
		* fetch ( { payload }, { call, put } ){
			const res = responseA( yield call( queryActivityPageList, requestA({
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
