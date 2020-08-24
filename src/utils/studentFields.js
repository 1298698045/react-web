import FIELDS from '@/config/fields';
import _ from 'lodash';
import getLocation from '@/utils/getLocation';
import moment from 'moment';

const deleteParams = obj => {
	Object.keys( obj ).forEach( i => {
		if ( obj[ i ] !== undefined && obj[ i ] !== null ) {
			if ( typeof obj[ i ] === 'object' ) {
				deleteParams( obj[ i ] );
			}
		} else {
			delete obj[ i ];
		}
	} );
};

export const setStudentFormFields = () => data => {
	if ( _.isEqual( data, {} ) ) {
		// 新增
		return {
			[ FIELDS.STUDENT.NAME.key ]: undefined,
			[ FIELDS.STUDENT.MOBILE.key ]: undefined,
			[ FIELDS.STUDENT.LICENSE_TYPE.key ]: undefined,
			[ FIELDS.STUDENT.DEPART_ID.key ]: undefined,
			[ FIELDS.STUDENT.CLASS_ID.key ]: undefined,
			// apply:{
			[ FIELDS.STUDENT.SOURCE_TYPE.key ]: undefined,
			[ FIELDS.STUDENT.COOPERATION_UNIT.key ]: undefined,
			[ FIELDS.STUDENT.TEMP_RESIDENCE_PERMIT.key ]: undefined,
			[ FIELDS.STUDENT.BACKUP_TEL_PHONE.key ]: undefined,
			[ FIELDS.STUDENT.CAREER.key ]: undefined,
			[ FIELDS.STUDENT.CAREER.key ]: undefined,
			[ FIELDS.STUDENT.CHANNEL.key ]: undefined,
			[ FIELDS.STUDENT.OPERATOR_TYPE.key ]: undefined,
			[ FIELDS.STUDENT.OPERATOR_ID.key ]: undefined,
			[ FIELDS.STUDENT.CONTRACT_NO.key ]: undefined,
			[ FIELDS.STUDENT.REPORT_TIME.key ]: null,
			[ FIELDS.STUDENT.MATERIAL.key ]: '',
			[ FIELDS.STUDENT.VALUE_ADDED.key ]: '',
			// },
			
			// applyType:{
			[ FIELDS.STUDENT.APPLY_TYPE.key ]: undefined,
			[ FIELDS.STUDENT.APPLY_SUB_TYPE.key ]: undefined,
			[ FIELDS.STUDENT.OLD_LICENCE_TYPE.key ]: undefined,
			[ FIELDS.STUDENT.CHANGE_LICENCE_TIME.key ]: null,
			[ FIELDS.STUDENT.APPLY_WAY.key ]: null,
			[ FIELDS.STUDENT.PROXY_NAME.key ]: undefined,
			[ FIELDS.STUDENT.PROXY_CARD_TYPE.key ]: undefined,
			[ FIELDS.STUDENT.PROXY_CARD_NO.key ]: undefined,
			[ FIELDS.STUDENT.PROXY_TEL_PHONE.key ]: undefined,
			[ FIELDS.STUDENT.PROXY_ADDRESS.key ]: undefined,
			[ FIELDS.STUDENT.PROXY_PROVINCE.key ]: undefined,
			[ FIELDS.STUDENT.PROXY_CITY.key ]: undefined,
			[ FIELDS.STUDENT.PROXY_DISTRICT.key ]: undefined,
			// }
			
			// baseInfo:{
			[ FIELDS.STUDENT.MAJOR_CARD_TYPE.key ]: undefined,
			[ FIELDS.STUDENT.MAJOR_CARD_CODE.key ]: undefined,
			[ FIELDS.STUDENT.MINOR_CARD_TYPE.key ]: undefined,
			[ FIELDS.STUDENT.MINOR_CARD_CODE.key ]: undefined,
			[ FIELDS.STUDENT.CARD_PICTURE.key ]: undefined,
			[ FIELDS.STUDENT.PICTURE.key ]: undefined,
			[ FIELDS.STUDENT.TEL.key ]: undefined,
			[ FIELDS.STUDENT.GENDER.key ]: undefined,
			[ FIELDS.STUDENT.BIRTHDAY.key ]: null,
			[ FIELDS.STUDENT.NATIONALITY.key ]: undefined,
			[ FIELDS.STUDENT.EMAIL.key ]: undefined,
			[ FIELDS.STUDENT.ZIP.key ]: undefined,
			[ FIELDS.STUDENT.REG_ADDRESS.key ]: undefined,
			[ FIELDS.STUDENT.REG_PROVINCE_CODE.key ]: undefined,
			[ FIELDS.STUDENT.REG_CITY_CODE.key ]: undefined,
			[ FIELDS.STUDENT.REG_DISTRICT_CODE.key ]: undefined,
			[ FIELDS.STUDENT.CON_ADDRESS.key ]: undefined,
			[ FIELDS.STUDENT.CON_PROVINCE_CODE.key ]: undefined,
			[ FIELDS.STUDENT.CON_CITY_CODE.key ]: undefined,
			[ FIELDS.STUDENT.CON_DISTRICT_CODE.key ]: undefined,
			[ FIELDS.STUDENT.MEMO.key ]: undefined,
			// }
			
			// finance:{
			[ FIELDS.STUDENT.RECEIVABLE.key ]: undefined,
			[ FIELDS.STUDENT.REDUCE_AMOUNT.key ]: undefined,
			[ FIELDS.STUDENT.REDUCE_REASON.key ]: undefined,
			[ FIELDS.STUDENT.DISCOUNT.key ]: undefined,
			[ FIELDS.STUDENT.DEPOSIT.key ]: undefined,
			[ FIELDS.STUDENT.VALUE_ADDED.key ]: undefined,
			[ FIELDS.STUDENT.RECEIPTS.key ]: undefined,
			[ FIELDS.STUDENT.OWED.key ]: undefined,
			[ FIELDS.STUDENT.FEE_TYPE.key ]: undefined,
			[ FIELDS.STUDENT.PAY_MODE.key ]: undefined,
			[ FIELDS.STUDENT.PAY_STATUS.key ]: undefined,
			[ FIELDS.STUDENT.REJECTION_REASON.key ]: undefined,
			// }
		}
	} else {
		return {
			...data,
			...data.apply,
			...data.applyType,
			...data.finance,
			...data.baseInfo,
			operatorId: data.apply.introducer ? data.apply.introducer.operatorId : undefined,
			introducerType: data.apply.introducerType ? data.apply.introducerType * 1 : undefined,
			valueAdded: data.apply.valueAdded || '',
			material: data.apply.material || '',
		}
	}
};

export const getStudentFormFields = studentType => data => {
	// if ( studentType === '1' ) {
	const p = {
		...data,
		studentType,
		apply: {
			[ FIELDS.STUDENT.SOURCE_TYPE.key ]: data[ FIELDS.STUDENT.SOURCE_TYPE.key ],
			[ FIELDS.STUDENT.TEMP_RESIDENCE_PERMIT.key ]: data[ FIELDS.STUDENT.TEMP_RESIDENCE_PERMIT.key ],
			[ FIELDS.STUDENT.COOPERATION_UNIT.key ]: data[ FIELDS.STUDENT.COOPERATION_UNIT.key ],
			[ FIELDS.STUDENT.BACKUP_TEL_PHONE.key ]: data[ FIELDS.STUDENT.BACKUP_TEL_PHONE.key ],
			[ FIELDS.STUDENT.VALUE_ADDED.key ]: (data[ FIELDS.STUDENT.VALUE_ADDED.key ] || []).join( ',' ),
			[ FIELDS.STUDENT.MATERIAL.key ]: data[ FIELDS.STUDENT.MATERIAL.key ].join( ',' ),
			[ FIELDS.STUDENT.CAREER.key ]: data[ FIELDS.STUDENT.CAREER.key ],
			[ FIELDS.STUDENT.CONTRACT_NO.key ]: data[ FIELDS.STUDENT.CONTRACT_NO.key ],
			[ FIELDS.STUDENT.CHANNEL.key ]: data[ FIELDS.STUDENT.CHANNEL.key ],
			[ FIELDS.STUDENT.REPORT_TIME.key ]: data[ FIELDS.STUDENT.REPORT_TIME.key ] ? moment( data[ FIELDS.STUDENT.REPORT_TIME.key ] ).format( 'YYYY-MM-DD' ) : undefined,
			[ FIELDS.STUDENT.OPERATOR_TYPE.key ]: data[ FIELDS.STUDENT.OPERATOR_TYPE.key ],
			introducer: {
				[ FIELDS.STUDENT.OPERATOR_ID.key ]: data[ FIELDS.STUDENT.OPERATOR_ID.key ],
			},
		},
		applyType: {
			[ FIELDS.STUDENT.CHANGE_LICENCE_TIME.key ]: data[ FIELDS.STUDENT.CHANGE_LICENCE_TIME.key ] ? moment( data[ FIELDS.STUDENT.CHANGE_LICENCE_TIME.key ] ).format( 'YYYY-MM-DD' ) : undefined,
			[ FIELDS.STUDENT.OLD_LICENCE_TYPE.key ]: data[ FIELDS.STUDENT.OLD_LICENCE_TYPE.key ] ? data[ FIELDS.STUDENT.OLD_LICENCE_TYPE.key ] : undefined,
			[ FIELDS.STUDENT.APPLY_TYPE.key ]: data[ FIELDS.STUDENT.APPLY_TYPE.key ],
			[ FIELDS.STUDENT.APPLY_SUB_TYPE.key ]: data[ FIELDS.STUDENT.APPLY_SUB_TYPE.key ],
			[ FIELDS.STUDENT.APPLY_WAY.key ]: data[ FIELDS.STUDENT.APPLY_WAY.key ],
			[ FIELDS.STUDENT.PROXY_NAME.key ]: data[ FIELDS.STUDENT.PROXY_NAME.key ],
			[ FIELDS.STUDENT.PROXY_CARD_TYPE.key ]: data[ FIELDS.STUDENT.PROXY_CARD_TYPE.key ],
			[ FIELDS.STUDENT.PROXY_CARD_NO.key ]: data[ FIELDS.STUDENT.PROXY_CARD_NO.key ],
			[ FIELDS.STUDENT.PROXY_TEL_PHONE.key ]: data[ FIELDS.STUDENT.PROXY_TEL_PHONE.key ],
			[ FIELDS.STUDENT.PROXY_ADDRESS.key ]: data[ FIELDS.STUDENT.PROXY_ADDRESS.key ],
			[ FIELDS.STUDENT.PROXY_PROVINCE.key ]: data.proxyLocation ? getLocation( 'province' )( data.proxyLocation[ 0 ] ) : undefined,
			[ FIELDS.STUDENT.PROXY_CITY.key ]: data.proxyLocation ? getLocation( 'city' )( data.proxyLocation[ 1 ] ) : undefined,
			[ FIELDS.STUDENT.PROXY_DISTRICT.key ]: data.proxyLocation ? getLocation( 'district' )( data.proxyLocation[ 2 ] ) : undefined,
		},
		baseInfo: {
			[ FIELDS.STUDENT.BIRTHDAY.key ]: moment( data[ FIELDS.STUDENT.BIRTHDAY.key ] ).format( 'YYYY-MM-DD' ),
			[ FIELDS.STUDENT.EMAIL.key ]: data[ FIELDS.STUDENT.EMAIL.key ],
			[ FIELDS.STUDENT.ZIP.key ]: data[ FIELDS.STUDENT.ZIP.key ],
			[ FIELDS.STUDENT.GENDER.key ]: data[ FIELDS.STUDENT.GENDER.key ],
			[ FIELDS.STUDENT.NATIONALITY.key ]: data[ FIELDS.STUDENT.NATIONALITY.key ],
			[ FIELDS.STUDENT.MEMO.key ]: data[ FIELDS.STUDENT.MEMO.key ],
			[ FIELDS.STUDENT.REG_ADDRESS.key ]: data[ FIELDS.STUDENT.REG_ADDRESS.key ],
			[ FIELDS.STUDENT.CON_ADDRESS.key ]: data[ FIELDS.STUDENT.CON_ADDRESS.key ],
			[ FIELDS.STUDENT.MAJOR_CARD_CODE.key ]: data[ FIELDS.STUDENT.MAJOR_CARD_CODE.key ],
			[ FIELDS.STUDENT.MAJOR_CARD_TYPE.key ]: data[ FIELDS.STUDENT.MAJOR_CARD_TYPE.key ],
		},
		finance: {
			[ FIELDS.STUDENT.DEPOSIT.key ]: data[ FIELDS.STUDENT.DEPOSIT.key ],
			[ FIELDS.STUDENT.DISCOUNT.key ]: data[ FIELDS.STUDENT.DISCOUNT.key ],
			[ FIELDS.STUDENT.OWED.key ]: data[ FIELDS.STUDENT.OWED.key ],
			[ FIELDS.STUDENT.FEE_TYPE.key ]: data[ FIELDS.STUDENT.FEE_TYPE.key ],
			[ FIELDS.STUDENT.RECEIVABLE.key ]: data[ FIELDS.STUDENT.RECEIVABLE.key ],
			[ FIELDS.STUDENT.REDUCE_AMOUNT.key ]: data[ FIELDS.STUDENT.REDUCE_AMOUNT.key ],
			[ FIELDS.STUDENT.REDUCE_REASON.key ]: data[ FIELDS.STUDENT.REDUCE_REASON.key ],
			[ FIELDS.STUDENT.RECEIPTS.key ]: data[ FIELDS.STUDENT.RECEIPTS.key ],
			discountReason: data.discountReason
		},
	};
	
	delete p.proxyLocation;
	delete p[ FIELDS.STUDENT.CONTRACT_NO.key ];
	delete p[ FIELDS.STUDENT.REPORT_TIME.key ];
	delete p[ FIELDS.STUDENT.BACKUP_TEL_PHONE.key ];
	delete p[ FIELDS.STUDENT.VALUE_ADDED.key ];
	delete p[ FIELDS.STUDENT.TEMP_RESIDENCE_PERMIT.key ];
	delete p[ FIELDS.STUDENT.SOURCE_TYPE.key ];
	delete p[ FIELDS.STUDENT.MATERIAL.key ];
	delete p[ FIELDS.STUDENT.APPLY_WAY.key ];
	delete p[ FIELDS.STUDENT.BIRTHDAY.key ];
	delete p[ FIELDS.STUDENT.APPLY_SUB_TYPE.key ];
	delete p[ FIELDS.STUDENT.EMAIL.key ];
	delete p[ FIELDS.STUDENT.PROXY_NAME.key ];
	delete p[ FIELDS.STUDENT.PROXY_CARD_TYPE.key ];
	delete p[ FIELDS.STUDENT.PROXY_CARD_NO.key ];
	delete p[ FIELDS.STUDENT.PROXY_TEL_PHONE.key ];
	delete p[ FIELDS.STUDENT.PROXY_ADDRESS.key ];
	delete p[ FIELDS.STUDENT.DEPOSIT.key ];
	delete p[ FIELDS.STUDENT.DISCOUNT.key ];
	delete p[ FIELDS.STUDENT.ZIP.key ];
	delete p[ FIELDS.STUDENT.GENDER.key ];
	delete p[ FIELDS.STUDENT.GENDER.key ];
	delete p[ FIELDS.STUDENT.MAJOR_CARD_CODE.key ];
	delete p[ FIELDS.STUDENT.MAJOR_CARD_TYPE.key ];
	delete p[ FIELDS.STUDENT.NATIONALITY.key ];
	delete p[ FIELDS.STUDENT.OWED.key ];
	delete p[ FIELDS.STUDENT.FEE_TYPE.key ];
	delete p[ FIELDS.STUDENT.RECEIVABLE.key ];
	delete p[ FIELDS.STUDENT.REDUCE_AMOUNT.key ];
	delete p[ FIELDS.STUDENT.REDUCE_REASON.key ];
	delete p[ FIELDS.STUDENT.RECEIPTS.key ];
	delete p[ FIELDS.STUDENT.MEMO.key ];
	delete p[ FIELDS.STUDENT.REG_ADDRESS.key ];
	delete p[ FIELDS.STUDENT.CON_ADDRESS.key ];
	delete p[ FIELDS.STUDENT.CAREER.key ];
	delete p[ FIELDS.STUDENT.CHANNEL.key ];
	delete p[ FIELDS.STUDENT.OPERATOR_ID.key ];
	delete p[ FIELDS.STUDENT.OLD_LICENCE_TYPE.key ];
	delete p[ FIELDS.STUDENT.CHANGE_LICENCE_TIME.key ];
	delete p[ FIELDS.STUDENT.COOPERATION_UNIT.key ];
	delete p[ FIELDS.STUDENT.COOPERATION_UNIT_CONCAT_PEOPLE.key ];
	delete p[ FIELDS.STUDENT.COOPERATION_UNIT_CONCAT_ADDRESS.key ];
	delete p[ FIELDS.STUDENT.COOPERATION_UNIT_CONCAT_MOBILE.key ];
	
	if ( studentType === '3' ) {
		//代培
		p.apply[ 'insteadKm2' ] = p[ FIELDS.STUDENT.PROXY_KM.key ].includes( 'km2' ) ? 1 : 0;
		p.apply[ 'insteadKm3' ] = p[ FIELDS.STUDENT.PROXY_KM.key ].includes( 'km3' ) ? 1 : 0;
		p.finance[ 'insteadKm2Price' ] = p.insteadKm2Price;
		p.finance[ 'insteadKm3Price' ] = p.insteadKm3Price;
	}
	
	delete p[ FIELDS.STUDENT.PROXY_KM.key ];
	delete p.insteadKm2Price;
	delete p.insteadKm3Price;
	delete p[FIELDS.STUDENT.OPERATOR_TYPE.key]
	delete p.discountReason
	
	deleteParams( p );
	
	return p;
	// }
};
