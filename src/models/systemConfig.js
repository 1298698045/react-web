import {
	querySetting,
	setSetting,
	setOtherSetting,
	intensiveCourseSwitch
} from '@/services/system';
import { MESSAGE } from '@/config/tips';

import createInitialModelState from '@/utils/createInitialModelState';
import response from '@/services/response';

const name = 'systemConfig';
// const initialState = createInitialModelState( name );

const translate = data => {
	Object.keys( data ).forEach( key => {
		switch ( data[ key ] ) {
			case 'on':
				data[ key ] = true;
				break;
			case 'off':
				data[ key ] = false;
				break;
		}
	} );
	return data;
};

export default {
	namespace: name,

	state: {
		// ...initialState,
		status_setting: {},
		other_setting: {
			refund_approver: [],
			service_tel: {},
			receipt_title: {},
		},
	},

	effects: {
		* querySetting( { params }, { call, put } ) {
			const res = response( yield call( querySetting, { params } ) )();
			const { type } = params;
			if ( res ) {
				yield put( {
					type: 'save',
					payload: {
						[ type ]: translate( res ),
					},
				} );
			}
		},
		* setSetting( { params }, { call, put } ) {
			return response( yield call( setSetting, { params } ) )( MESSAGE.SAVE );
		},
		* queryOtherSetting( { payload }, { call, put } ) {
			const res = response( yield call( querySetting, { params: { type: 'other_setting' } } ) )();
			if ( res ) {
				try {
					if ( !res.service_tel ) res.service_tel = {};
					else res.service_tel = JSON.parse( res.service_tel );
					if ( !res.receipt_title ) res.receipt_title = {};
					else res.receipt_title = JSON.parse( res.receipt_title );
				} catch ( e ) {
					console.error( e );
				}
				yield put( {
					type: 'save',
					payload: {
						other_setting: res,
					},
				} );
			}
			return res;
		},
		* setOtherSetting( { payload }, { call, put } ) {
			return response( yield call( setOtherSetting, payload ) )(MESSAGE.SAVE);
		},
		* setOtherRepartSetting( { params }, { call, put } ) {
			return response( yield call( setOtherSetting, params ) )();
		},
		* intensiveCourseSwitch( { payload }, { call, put } ) {
			return response( yield call( intensiveCourseSwitch, { params: { type: "status_setting",key: "intensive_course" } } ) )();
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
