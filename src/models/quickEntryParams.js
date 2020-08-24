import { routerRedux } from 'dva/router';

export default {
	namespace: 'quickEntryParams',
	
	state: '',
	
	effects: {
		* linkTo ( { dictKey, payload }, { put, } ){
			const { url, params } = payload;
			
			yield put( {
				type: 'saveParams',
				payload: params,
			} );
			
			yield put( routerRedux.push( url ) );
		},
	},
	
	reducers: {
		saveParams ( state, action, ){
			return action.payload
		},
		clearParams (){
			return '';
		}
		,
	},
};
