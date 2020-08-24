import {
	doSaveMemo
} from '@/services/student';
import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'income';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
	},
	
	effects: {
		* addMemo ( { params }, { call, } ){
			return response( yield call( doSaveMemo, {
				params: params,
			} ) )( '保存成功', '' );
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
