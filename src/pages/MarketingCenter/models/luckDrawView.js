import { queryOpenGroupList  } from '@/services/activity';
import createInitialModelState from '@/utils/createInitialModelState';
import { responseA, requestA } from '@/services/response';
import transformRequestParams from '@/utils/transformRequestParams';

const name = 'luckDrawView';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			const res = responseA( yield call( queryOpenGroupList, requestA({
				...payload
			} ) ) )()();
			let pagination = {
				current: res.docPage.currentPage,
				pageSize: res.docPage.pageSize,
				total: res.docPage.totalNum
			}
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ `${name}TableData` ]: {
							params: payload.params,
							list: res.docPage.item.map( ( v, i ) => ({ key: i + 1, ...v, }) ),
							pagination: pagination,
						}
					},
				} );
			}
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
