import {
	queryArchiveList,
	printArchiveBag,
	printHealthForm,
	delayArchive,
	stopArchive,
	finishArchive,
	waitForArchive,
	saveArchiveRemark,
	exportArchive,
	saveArchiveID,
} from '@/services/student';
import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'studentArchive';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
	},

	effects: {
		* fetch( { payload }, { call, put } ) {
			const res = response( yield call( queryArchiveList, payload ) )();

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
		* printArchiveBag( { payload }, { call, put } ) {
			return response( yield call( printArchiveBag, { params: payload } ) )( MESSAGE.OPRATE );
		},
		* printHealthForm( { payload }, { call, put } ) {
			return response( yield call( printHealthForm, { params: payload } ) )( MESSAGE.OPRATE );
		},
		* delayArchive( { payload }, { call, put } ) {
			return response( yield call( delayArchive, {
				params: {
					...payload,
					studentStatus: 2,
				},
			} ) )( MESSAGE.OPRATE );
		},
		* stopArchive( { payload }, { call, put } ) {
			return response( yield call( stopArchive, {
				params: {
					...payload,
					studentStatus: 3,
				},
			} ) )( MESSAGE.OPRATE );
		},
		* finishArchive( { payload }, { call, put } ) {
			return response( yield call( finishArchive, {
				params: {
					...payload,
					studentStatus: 4,
				},
			} ) )( MESSAGE.OPRATE );
		},
		* waitForArchive( { payload }, { call, put } ) {
			return response( yield call( waitForArchive, {
				params: {
					...payload,
					studentStatus: 1,
				},
			} ) )( MESSAGE.OPRATE );
		},
		* saveArchiveRemark( { payload }, { call, put } ) {
			return response( yield call( saveArchiveRemark, {
				params: payload,
			} ) )( MESSAGE.OPRATE );
		},
		* exportArchive( { payload }, { call, put } ) {
			return yield call( exportArchive, { params: payload } );
		},
		* saveArchiveID( { payload }, { call, put } ) {
			return response( yield call( saveArchiveID, { params: payload } ) )( MESSAGE.OPRATE );
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
