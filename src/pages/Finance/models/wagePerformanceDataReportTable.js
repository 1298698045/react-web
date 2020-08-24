import { doGetWagePerformanceDataReportList, doGetWagePerformanceDataReportListExport, } from '@/services/api';
import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'financeWagePerformanceDataReportList';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			const data = {
				...payload,
				params: {
					startDate: payload.params.startDate,
					endDate: payload.params.endDate,
				}
			};
			const res = response( yield call( doGetWagePerformanceDataReportList, {
				...data,
			} ) )( '', '' );
			
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ `${name}TableData` ]: {
							list: res.list.map( ( v, i ) => ({ key: i + 1, ...v, }) ),
							pagination: res.pagination,
						}
					},
				} );
			}
		},
		* exportList ( { payload }, { call, } ){
			return response( yield call( doGetWagePerformanceDataReportListExport, {
				...payload,
			} ) )( '生成成功！', '' );
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
