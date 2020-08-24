import { doDelFinanceJournal, doGetFinanceJournal, doSaveFinanceJournal, exportExpenditure } from '@/services/api';
import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'financeExpenditureManagementFeeList';
const initialState = createInitialModelState( name );

export default {
	namespace: name,
	
	state: {
		...initialState,
	},
	
	effects: {
		* fetch ( { payload }, { call, put } ){
			const p = { ...payload.params };
			if ( payload.params.journalType ) {
				p.journalType = payload.params.journalType;
			}
			if ( payload.params.subtype ) {
				p.journalType = `${payload.params.journalType}.${payload.params.subtype}`;
				delete p.subtype;
			}
			const res = response( yield call( doGetFinanceJournal, {
				params: {
					...p,
					outlayType: 'outlay_type_manage',
				},
				pagination: payload.pagination,
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
		* saveExpenditure ( { payload }, { call } ){
			return response( yield call( doSaveFinanceJournal, payload ) )( '保存成功！', '' );
		},
		* delExpenditure ( { payload, }, { call, } ){
			return response( yield call( doDelFinanceJournal, {
				params: {
					id: payload,
				},
			} ) )( '删除成功！', '' );
		},
		* exportExpenditure ( { payload, }, { call, } ){
			return response( yield call( exportExpenditure, {
				params: {
					...payload,
					outlayType: "outlay_type_manage"
				},
			} ) )( '导出成功！', '' );
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
