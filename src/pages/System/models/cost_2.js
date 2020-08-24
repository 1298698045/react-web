import {
	queryCostSetting, saveRole,
	setCostSetting,
} from '@/services/system';
import { MESSAGE } from "@/config/tips";

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'cfgCost_2';
const initialState = createInitialModelState( name );

export default {
	namespace: name,

	state: {
		...initialState,
	},

	effects: {
		* fetch( { payload }, { call, put, select } ) {
			const res = response( yield call( queryCostSetting, { params: { feeType: 'resit' } } ) )();
			if ( res ) {
				let licenseTypes = ( yield select( state => state.dictionary.license_type ) ).filter( v => v.dictSwitch == 1 );
				yield put( {
					type: 'save',
					payload: {
						[ `${ name }TableData` ]: {
							list: res.filter( v => licenseTypes.find( v2 => v2.dKey === v.licenseType ) ).map( ( v, i ) => ( { key: i + 1, ...v, } ) ),
							data: res.filter( v => licenseTypes.find( v2 => v2.dKey === v.licenseType ) ).map( ( v, i ) => v ),
							// pagination: res.pagination,
						}
					},
				} );
			}
		},
		* setCostSetting( { index, amount }, { call, put, select } ) {
			const data = yield select( state => state[ name ][ `${ name }TableData` ] );
			data.data[ index ].amount = amount;
			let item = data.data[ index ]
			return response( yield call( setCostSetting, { params: { fee: [item] } } ) )( MESSAGE.SAVE );
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
