import {
	getSignUpData,
	getReserveClassData,
	getScoreData,
	getFinanceData,
	getSignUpTotal,
	getReserveClassTotal,
	getScoreTotal
} from '@/services/dataStatistics';
import response from '@/services/response';
import createInitialModelState from '@/utils/createInitialModelState';

const name = 'dataStatistics';
const initialState = createInitialModelState( name );
export default {
	namespace: name,
	
	state: {
		...initialState,
	},
	
	effects: {
		* getSignUpData ( { payload }, { call, } ){
			return response( yield call( getSignUpData, payload ) )( '', '' );
		},
		* getReserveClassData ( { payload }, { call, } ){
			return response( yield call( getReserveClassData, payload ) )( '', '' );
		},
		* getScoreData ( { payload }, { call, } ){
			return response( yield call( getScoreData, payload ) )( '', '' );
		},
		* getFinanceData ( { payload }, { call, } ){
			return response( yield call( getFinanceData, payload ) )( '', '' );
		},
		* getSignUpTotal ( { payload }, { call, } ){
			return response( yield call( getSignUpTotal, payload ) )( '', '' );
		},
		* getReserveClassTotal ( { payload }, { call, } ){
			return response( yield call( getReserveClassTotal, payload ) )( '', '' );
		},
		* getScoreTotal ( { payload }, { call, } ){
			return response( yield call( getScoreTotal, payload ) )( '', '' );
		}
	},
	
	reducers: {
		save( state, action ) {
			return {
				...state,
				...action.payload,
			};
		},
	}
};
