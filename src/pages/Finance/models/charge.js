import { querySetting } from "@/services/system";
import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'charge';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
		status_setting: {},
	},
	
	effects: {
		* queryStatusSetting( { payload }, { call, put } ) {
			return response( yield call( querySetting, { params: { type: "status_setting" } } ) )();
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
