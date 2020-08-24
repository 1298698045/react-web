import { doUploadWageRegistrationList, } from '@/services/api';
import response from '@/services/response';


export default {
	namespace: 'wageUpload',
	
	state: {},
	
	effects: {
		* fetch ( { payload }, { call, } ){
			const formData = new FormData();
			Object.keys( payload ).forEach( o => {
				formData.append( o, payload[ o ] );
			} );
			
			return response( yield call( doUploadWageRegistrationList, formData ) )( '', '' );
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
