import {
	doGetFinancePreview,
	doGetArchivePreview,
	doGetExamPreview,
	doGetActivePreview,
	doGetStudentPreview,
	doGetSignUpChart,
	doGetBookChart,
	doGetTodoList,
} from '@/services/api';
import response from '@/services/response';

export default {
	namespace: 'workbench',
	
	state: {
		tags: [],
	},
	
	effects: {
		* getSignUpChart ( { payload }, { call, } ){
			return response( yield call( doGetSignUpChart, payload ) )( '', '' );
		},
		* getBookChart ( _, { call, } ){
			return response( yield call( doGetBookChart ) )( '', '' );
		},
		* getStudentPreview ( { payload }, { call, } ){
			return response( yield call( doGetStudentPreview, payload ) )( '', '' );
		},
		* getFinancePreview ( _, { call, } ){
			return response( yield call( doGetFinancePreview ) )( '', '' );
		},
		* getArchivePreview ( { payload }, { call, } ){
			return response( yield call( doGetArchivePreview, payload ) )( '', '' );
		},
		* getExamPreview ( { payload }, { call, } ){
			return response( yield call( doGetExamPreview, payload ) )( '', '' );
		},
		* getActivePreview ( { payload }, { call, } ){
			return response( yield call( doGetActivePreview, payload ) )( '', '' );
		},
		* getTodoList ( { payload }, { call, } ){
			return response( yield call( doGetTodoList, payload ) )( '', '' );
		},
	},
	
	reducers: {
		saveTags ( state, action ){
			return {
				...state,
				tags: action.payload,
			};
		},
	},
};
