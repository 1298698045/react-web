import {
	saveExamAppointmentEdit,
	saveExamAppointmentUpload,
	deleteExamAppointment,
	clearExamAppointmentOutliers,
	exportExamAppointment,
	saveExamScoreEdit,
	saveExamScoreUpload,
	deleteExamScoreOutliers,
	dropOutStudent,
	graduateStudent,
	deleteAllExamAppointment,
	clearScoreOutliers
} from '@/services/student';
import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'studentExam';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
	},

	effects: {
		* saveExamAppointmentEdit( { payload }, { call, put } ) {
			return response( yield call( saveExamAppointmentEdit, { params: payload } ) )( MESSAGE.SAVE );
		},
		* saveExamAppointmentUpload( { payload }, { call, put } ) {
			return response( yield call( saveExamAppointmentUpload, { params: payload } ) )( MESSAGE.SAVE );
		},
		* clearExamAppointmentOutliers( { payload }, { call, put } ) {
			return response( yield call( clearExamAppointmentOutliers, { params: payload } ) )(  '清空成功' );
		},
		* exportExamAppointment( { payload }, { call, put } ) {
			return response( yield call( exportExamAppointment, { params: payload } ) )( MESSAGE.OPRATE );
		},
		* saveExamScoreEdit( { payload }, { call, put } ) {
			return response( yield call( saveExamScoreEdit, { params: payload } ) )( MESSAGE.SAVE );
		},
		* saveExamScoreUpload( { payload }, { call, put } ) {
			return response( yield call( saveExamScoreUpload, { params: payload } ) )( MESSAGE.SAVE );
		},
		* deleteExamAppointment( { payload }, { call, put } ) {
			return response( yield call( deleteExamAppointment, { params: payload } ) )( MESSAGE.SAVE );
		},
		* deleteAllExamAppointment( { payload }, { call, put } ) {
			return response( yield call( deleteAllExamAppointment, { params: payload } ) )( MESSAGE.DELETE );
		},
		* deleteExamScoreOutliers( { payload }, { call, put } ) {
			return response( yield call( deleteExamScoreOutliers, { params: payload } ) )( MESSAGE.DELETE );
		},
		* clearScoreOutliers( { payload }, { call, put } ) {
			return response( yield call( clearScoreOutliers, { params: payload } ) )( '清空成功' );
		},
		* dropOutStudent( { payload }, { call, put } ) {
			return response( yield call( dropOutStudent, { params: payload } ) )( MESSAGE.OPRATE );
		},
		* graduateStudent( { payload }, { call, put } ) {
			return response( yield call( graduateStudent, { params: payload } ) )( MESSAGE.OPRATE );
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
