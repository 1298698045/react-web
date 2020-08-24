import React, { memo, useEffect, useState, } from 'react';
import { Col, Form, Collapse, Modal, Row, Card, Button, Empty, message, } from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import DescriptionList from '@/components/DescriptionList';
import { hasChinese } from '@/utils/reg';
import { useEffectOnce, useToggle, useGetSet, } from 'react-use';
import moment from 'moment';
import getLocation from '@/utils/getLocation';
import { setStudentFormFields, getStudentFormFields } from '@/utils/studentFields';
import { idCard, mobile, email, } from '@/config/reg';
import { hasPriv } from '@/utils/privilege';
const { Description } = DescriptionList;
const { Panel } = Collapse;
const { Meta } = Card;

const SignUpFormModal = props => {
	const { user, handleSubmit, visible, cooperationUnits, dictionary, setVisible, form, studentType, setNeedUpdate, dependCostConfig, dispatch, loading, readBaseInfoFromIDLoading,activityId,clueId  } = props;
	// 初始化表单字段
	const data = setStudentFormFields()( props.data );
	data[ FIELDS.STUDENT.PROXY_KM.key ] = [];
	if ( String( data[ 'insteadKm2' ] ) === '1' ) {
		data[ FIELDS.STUDENT.PROXY_KM.key ] = [ 'km2' ];
	}
	if ( String( data[ 'insteadKm3' ] ) === '1' ) {
		data[ FIELDS.STUDENT.PROXY_KM.key ] = [ ...data[ FIELDS.STUDENT.PROXY_KM.key ], 'km3' ];
	}
	
	// 所有增值服务，对于新增的学员，增值服务应该只包含开启状态的，编辑的学员才展示所有的增值服务。
	const valueAddedDic = data.id ? (dictionary[ FIELDS.STUDENT.VALUE_ADDED.dictionary ] || []) : (dictionary[ 'value_added_active' ] || []);
	
	// 学员报名类型
	const type = dictionary[ FIELDS.STUDENT.STUDENT_TYPE.dictionary ] && dictionary[ FIELDS.STUDENT.STUDENT_TYPE.dictionary ].find( ( { dKey } ) => dKey === String( data.id ? data.studentType : studentType ), );
	
	const [ sourceTypeIsLocal, setSourceTypeIsLocal ] = useToggle( false );
	const [ classIdValues, setClassIdValues ] = useState( [] );
	const [ getInitialValueAddedValues, setInitialValueAddedValues ] = useGetSet( [] );
	const [ getAddedValues, setAddedValues ] = useGetSet( [] );
	const [ reduceAmount, setReduceAmount ] = useState( 9999999 );
	const [ reduceAmountReasonRequired, setReduceAmountReasonRequired ] = useState( false );
	const [ giveMoneyStatus, setGiveMoneyStatus ] = useState( 'disabled' );
	const [ applyType, setApplyType ] = useState( [] );
	const [ applyWay, setApplyWay ] = useState( [] );
	const [ isAdd, setIsAdd ] = useToggle( false );
	const [ majorCardValidate, setMajorCardValidate ] = useState( {} );
	const [ activeKey, setActiveKey ] = useState( [ '1', '2', '6' ] );
	const [ photo, setPhoto ] = useState( undefined );
	const [ totalValueAddedAmount, setTotalValueAddedAmount ] = useState( 0 );
	const [ dpkm2Disabled, setDpkm2Disabled ] = useToggle( false );
	const [ dpkm3Disabled, setDpkm3Disabled ] = useToggle( false );
	const [ getSubTypeName, setSubTypeName ] = useGetSet( '' );
	const [ operationList, setOperationList ] = useState( [] );
	const [ operatorId, setOperatorId ] = useState( undefined );
	const [ isHideData, setIsHideData ] = useState( !hasPriv( 'show_finance_data' ));
	const [ km2CoachList, setKm2CoachList ] = useState( []);
	const [ km3CoachList, setKm3CoachList ] = useState( []);

	useEffect( () => {
		return () => {
			if ( !visible ) {
				setPhoto( undefined );
				setAddedValues( [] );
				setInitialValueAddedValues( [] );
				setOperationList([])
			}
			if (data.id) {
				setOperatorId(String(data.operatorId))
			}
			
		}
		
	}, [ visible, data.id, data.operatorId ] );
	useEffect( () => {
		if (visible) {
			let list = dictionary[ 'employee_id_coach' ] ? dictionary[ 'employee_id_coach' ].map(one => {
				one.teachKm = one.coachInfo.teachKm
				return one
			}) : []
			let km2 = list.filter(one  => one.leaving !== 2 && one.teachKm.indexOf('km2') !== -1)
			let km3 = list.filter(one  => one.leaving !== 2 && one.teachKm.indexOf('km3') !== -1)
			setKm2CoachList(km2)
			setKm3CoachList(km3)
		}
	}, [ visible ] );
	
	// 提交函数
	const submit = e => {
		e.preventDefault();
		
		// if ( submitLoading ) return false;
		if ( loading ) return false;
		
		form.validateFields( ( err, fieldsValue ) => {
			// console.log( fieldsValue );
			if ( err ) {
				return false;
			}
			
			const params = getStudentFormFields( String( data.id ? data.studentType : studentType ) )( {
				...fieldsValue,
				[ FIELDS.STUDENT.RECEIPTS.key ]: fieldsValue[ FIELDS.STUDENT.RECEIVABLE.key ],
				id: props.data.id,
				activityId,
				clueId,
				discountReason: props.data.finance ? props.data.finance.discountReason : undefined
			} );
			
			handleSubmit( { params } );
		} );
	};
	
	// 读取身份证信息
	// const readBaseInfoFromIDLoading = loading.effects[ 'student/IdentityInfo' ] || false;
	const readBaseInfoFromID = e => {
		e.stopPropagation();
		dispatch( {
			type: 'student/IdentityInfo',
		} ).then( res => {
			const { code, data, } = res;
			if ( code === 200 ) {
				message.success( '读取成功！' );
				const { photo, name, gender, cardCode, dateOfBirth, address, } = data;
				const { label } = gender;
				setPhoto( `data:image/jpeg;base64,${photo}` );
				form.setFieldsValue( {
					[ FIELDS.STUDENT.NAME.key ]: name,
					[ FIELDS.STUDENT.GENDER.key ]: label === '男' ? '1' : '2',
					[ FIELDS.STUDENT.NATIONALITY.key ]: 'China',
					[ FIELDS.STUDENT.MAJOR_CARD_TYPE.key ]: 'idcard',
					[ FIELDS.STUDENT.MAJOR_CARD_CODE.key ]: cardCode,
					[ FIELDS.STUDENT.BIRTHDAY.key ]: moment( dateOfBirth ),
					[ FIELDS.STUDENT.CON_ADDRESS.key ]: address,
					[ FIELDS.STUDENT.REG_ADDRESS.key ]: address,
				} );
			} else {
				message.error( '读取失败！' );
			}
		} );
	};
	
	// 获取可选择班型列表
	const getClassValues = classDic => {
		const lic = form.getFieldValue( FIELDS.STUDENT.LICENSE_TYPE.key );
		const dep = form.getFieldValue( FIELDS.STUDENT.DEPART_ID_SCHOOL.key );
		if ( lic && dep && classDic ) {
			return classDic.filter( d => {
				return (d[ FIELDS.STUDENT.LICENSE_TYPE.key ] === lic) && (d[ FIELDS.STUDENT.DEPART_ID_SCHOOL.key ].split( ',' ).indexOf( dep ) !== -1);
			} );
		}
		return [];
	};
	
	// 设置可选择班型
	const setClassValues = classDic => {
		const newClassIdValues = getClassValues( classDic );
		setClassIdValues( newClassIdValues );
		if ( newClassIdValues.length === 0 ) {
			// 无可选班型
			form.setFieldsValue( {
				[ FIELDS.STUDENT.CLASS_ID.key ]: undefined,
			} );
		} else {
			// 有可选班型
			const initialClass = newClassIdValues.find( ( { dKey } ) => dKey === String( data[ FIELDS.STUDENT.CLASS_ID.key ] ) );
			
			form.setFieldsValue( {
				[ FIELDS.STUDENT.CLASS_ID.key ]: initialClass ? initialClass.dKey : undefined,
			} );
		}
	};
	
	// 设置学费最大可下调金额
	const setMaxReduceAmount = ( classDic, fields ) => {
		if ( String( data.id ? data.studentType : studentType ) === '1' ) {
			//本校学员
			
			// 获取当前班型
			if ( !classDic ) {
				setReduceAmount( 0 );
				return false;
			}
			const currentClass = classDic.find( ( { dKey } ) =>
				dKey === fields[ FIELDS.STUDENT.CLASS_ID.key ] );
			
			if ( currentClass ) {
				const { money } = currentClass;
				const amount = money - (fields[ FIELDS.STUDENT.DISCOUNT.key ] || 0) - (fields[ FIELDS.STUDENT.DEPOSIT.key ] || 0);
				setReduceAmount( amount < 0 ? 0 : amount );
			} else {
				setReduceAmount( 0 );
			}
		} else if ( String( data.id ? data.studentType : studentType ) === '4' ) {
			// 挂靠学员
			
			setReduceAmount( fields[ FIELDS.STUDENT.DEPEND_COST.key ] );
		} else {
			// 代培学员
			
			setReduceAmount( fields[ 'insteadKm2Price' ] + fields[ 'insteadKm3Price' ] );
		}
	};
	
	// 设置财务相关字段
	const setFinanceValues = ( classDic, fields ) => {
		if ( String( data.id ? data.studentType : studentType ) === '1' ) {
			// 本校学员
			if ( !classDic ) return false;
			const currentClass = classDic.find( ( { dKey } ) =>
				dKey === fields[ FIELDS.STUDENT.CLASS_ID.key ] );
			if ( currentClass ) {
				//根据当前班型获取缴费类型和费用
				const { payType, money, } = currentClass;
				
				if ( payType === 'full_pay' ) {
					// 全款
					
					// 设置报名交费为可填写状态
					setGiveMoneyStatus( 'disabled' );
					
					// 设置报名交费金额，设置欠款金额
					const params = {
						[ FIELDS.STUDENT.RECEIVABLE.key ]: money - (fields[ FIELDS.STUDENT.DISCOUNT.key ] || 0) - (fields[ FIELDS.STUDENT.DEPOSIT.key ] || 0) - (fields[ FIELDS.STUDENT.REDUCE_AMOUNT.key ] || 0),
					};
					if ( String( data.id ? data.studentType : studentType ) === '1' ) {
						params[ FIELDS.STUDENT.FEE_TYPE.key ] = payType;
						params[ FIELDS.STUDENT.OWED.key ] = 0;
					}
					
					form.setFieldsValue( params );
				} else if ( payType === 'down_pay' ) {
					// 首付
					
					// 设置报名交费为不可填写状态（报名交费永远不可编辑，通过班型获取）
					setGiveMoneyStatus( 'disabled' );
					
					const { balance } = currentClass;
					
					// 设置报名交费金额，设置欠款金额
					// const params = {
					// 	[ FIELDS.STUDENT.RECEIVABLE.key ]: 0,
					// };
					const params = {
						[ FIELDS.STUDENT.RECEIVABLE.key ]: money - (fields[ FIELDS.STUDENT.DISCOUNT.key ] || 0) - (fields[ FIELDS.STUDENT.DEPOSIT.key ] || 0) - (fields[ FIELDS.STUDENT.REDUCE_AMOUNT.key ] || 0),
					};
					if ( String( data.id ? data.studentType : studentType ) === '1' ) {
						params[ FIELDS.STUDENT.FEE_TYPE.key ] = payType;
						// params[ FIELDS.STUDENT.OWED.key ] = Math.max( money - fields[ FIELDS.STUDENT.RECEIVABLE.key ] - (fields[ FIELDS.STUDENT.DISCOUNT.key ] || 0) - (fields[ FIELDS.STUDENT.DEPOSIT.key ] || 0) - (fields[ FIELDS.STUDENT.REDUCE_AMOUNT.key ] || 0), 0 );
						params[ FIELDS.STUDENT.OWED.key ] = balance || 0;
					}
					
					form.setFieldsValue( params );
				} else {
					// 课时
					
					// 设置报名交费为可填写状态
					setGiveMoneyStatus( 'disabled' );
					
					// 设置报名交费为可填写状态
					const params = {
						[ FIELDS.STUDENT.RECEIVABLE.key ]: money - (fields[ FIELDS.STUDENT.DISCOUNT.key ] || 0) - (fields[ FIELDS.STUDENT.DEPOSIT.key ] || 0) - (fields[ FIELDS.STUDENT.REDUCE_AMOUNT.key ] || 0),
					};
					if ( String( data.id ? data.studentType : studentType ) === '1' ) {
						params[ FIELDS.STUDENT.FEE_TYPE.key ] = payType;
						params[ FIELDS.STUDENT.OWED.key ] = 0;
					}
					form.setFieldsValue( params );
				}
			} else {
				form.setFieldsValue( {
					[ FIELDS.STUDENT.RECEIVABLE.key ]: 0,
				} );
			}
		} else if ( String( data.id ? data.studentType : studentType ) === '4' ) {
			// 挂靠学员
			
			// 设置报名交费为可填写状态
			setGiveMoneyStatus( 'disabled' );
			
			form.setFieldsValue( {
				[ FIELDS.STUDENT.RECEIVABLE.key ]: fields[ FIELDS.STUDENT.DEPEND_COST.key ] - (fields[ FIELDS.STUDENT.REDUCE_AMOUNT.key ] || 0),
			} );
		} else {
			// 代培学员
			// 设置报名交费金额，设置欠款金额
			form.setFieldsValue( {
				[ FIELDS.STUDENT.RECEIVABLE.key ]: (fields[ 'insteadKm2Price' ] || 0) + (fields[ 'insteadKm3Price' ] || 0) - (fields[ FIELDS.STUDENT.REDUCE_AMOUNT.key ] || 0)
			} );
		}
	};
	
	// 设置增值服务相关字段
	const setValueAddedValues = () => {
		if ( String( data.id ? data.studentType : studentType ) !== '4' ) {
			// 非挂靠学员
			const v = form.getFieldValue( FIELDS.STUDENT.CLASS_ID.key );
			if ( classIdValues ) {
				const currentClass = classIdValues.find( ( { dKey } ) =>
					dKey === v );
				
				if ( currentClass ) {
					// 当前班型自带的增值服务
					const initial = currentClass.valueAdded.split( ',' );
					
					// 将班型自带增值服务与用户上次所选的增值服务合并，并区分状态
					const arr = data[ FIELDS.STUDENT.VALUE_ADDED.key ]
						?
						data[ FIELDS.STUDENT.VALUE_ADDED.key ].split( ',' ).map( d => ({
							dKey: d,
							disabled: initial.includes( d ),
							inClass: initial.includes( d ),
						}) )
						:
						initial.map( d => ({
							dKey: d,
							disabled: true,
							inClass: true,
						}) );
					
					// 如果编辑信息，则设置初始值，否则使用setFieldsValue方法设置值。
					if ( data.id ) {
						setInitialValueAddedValues( arr.map( ( { dKey } ) => dKey ) );
					} else {
						const v = form.getFieldValue( FIELDS.STUDENT.VALUE_ADDED.key ) || [];
						// 合并选中
						const newArr = _.uniq( [ ...v, ...arr.map( ( { dKey } ) => dKey ) ] );
						
						form.setFieldsValue( {
							[ FIELDS.STUDENT.VALUE_ADDED.key ]: newArr,
						} );
					}
					
					const merge = valueAddedDic.map( v => ({
						...v,
						disabled: (data.id && String( data.studentStatus ) !== '6') ? true : (arr.find( ( { dKey } ) => String( v.dKey ) === dKey )
							?
							arr.find( ( { dKey } ) => String( v.dKey ) === dKey ).disabled
							:
							false),
						inClass: arr.find( ( { dKey } ) => String( v.dKey ) === dKey )
							?
							arr.find( ( { dKey } ) => String( v.dKey ) === dKey ).inClass
							:
							false
					}) );
					
					// 设置增值服务值
					setAddedValues( merge );
				} else {
					// 非挂靠且没有选择班型
					
					// setAddedValues( [] );
					const arr = valueAddedDic.map( v => {
						return {
							...v,
							disabled: false,
						}
					} );
					
					setAddedValues( arr );
				}
			}
		} else {
			// 挂靠学员
			const arr = valueAddedDic.map( v => {
				return {
					...v,
					disabled: data.id ? (String( data.studentStatus ) !== '6') : false,
				}
			} );
			
			if ( data.id && data[ FIELDS.STUDENT.VALUE_ADDED.key ] ) {
				// 编辑回显增值服务
				const initial = data.valueAdded.split( ',' );
				setInitialValueAddedValues( initial );
			}
			
			setAddedValues( arr );
		}
	};
	
	// 字段值联动
	const onChange = ( key, value ) => {
		// 获取所有班型
		// const classDic0 = dictionary[ FIELDS.STUDENT.CLASS_ID.dictionary ];
		const classDic = dictionary[ 'class_id' ].filter( v => v.dictSwitch == 1 );
		const fields = form.getFieldsValue();
		
		switch ( key ) {
			case FIELDS.STUDENT.MAJOR_CARD_TYPE.key: {
				const cardType = fields[ FIELDS.STUDENT.MAJOR_CARD_TYPE.key ];
				
				// 选择证件类型之后，做相应正则验证
				if ( cardType ) {
					const reg = {
						idcard: idCard,
						// passport: passPortCard,
						// military: officerCard,
					};
					
					// if ( cardType !== data[ FIELDS.STUDENT.MAJOR_CARD_TYPE.key ] ) {
					// 	form.setFieldsValue( {
					// 		[ FIELDS.STUDENT.MAJOR_CARD_CODE.key ]: undefined,
					// 	} );
					// }
					
					if ( reg[ value ] ) {
						setMajorCardValidate( {
							validator: ( rule, inputValue, callback ) => {
								if ( !reg[ value ].test( inputValue ) ) {
									if ( inputValue !== '' ) {
										callback( `请输入正确的${FIELDS.STUDENT.MAJOR_CARD_TYPE.title}` );
										return false;
									}
									callback();
									return false;
								}
								callback();
							},
						} );
					} else {
						setMajorCardValidate( {
							validator: ( rule, inputValue, callback ) => {
								callback();
							},
						} );
					}
				}
				
				break;
			}
			case FIELDS.STUDENT.MAJOR_CARD_CODE.key: {
				const cardType = form.getFieldValue( FIELDS.STUDENT.MAJOR_CARD_TYPE.key );
				if ( cardType && cardType === 'idcard' ) {
					// 身份证识别生日
					if ( idCard.test( value ) ) {
						// 符合身份证
						const birth = value.substring( 6, 10 ) + '-' + value.substring( 10, 12 ) + '-' + value.substring( 12, 14 );
						// 设置生日值
						form.setFieldsValue( {
							[ FIELDS.STUDENT.BIRTHDAY.key ]: moment( birth ),
						} );
					}
				}
				break;
			}
			case FIELDS.STUDENT.SOURCE_TYPE.key: {
				setSourceTypeIsLocal( value === 'local' );
				break;
			}
			case FIELDS.STUDENT.LICENSE_TYPE.key: {
				
				// 挂靠
				if ( String( data.id ? data.studentType : studentType ) === '4' ) {
					// 查询当前申领类型的挂靠费用
					const dependCost = dependCostConfig.find( d => d[ FIELDS.STUDENT.LICENSE_TYPE.key ] === value );
					if ( dependCost ) {
						const { amount } = dependCost;
						form.setFieldsValue( {
							[ FIELDS.STUDENT.DEPEND_COST.key ]: amount,
						} );
					}
				}
				
				setClassValues( classDic );
				break;
			}
			case FIELDS.STUDENT.DEPART_ID_SCHOOL.key: {
				setClassValues( classDic );
				break;
			}
			case FIELDS.STUDENT.RECEIVABLE.key: {
				setMaxReduceAmount( classDic, fields );
				setFinanceValues( classDic, fields );
				break;
			}
			case FIELDS.STUDENT.DISCOUNT.key: {
				setMaxReduceAmount( classDic, fields );
				setFinanceValues( classDic, fields );
				break;
			}
			case FIELDS.STUDENT.DEPOSIT.key: {
				setMaxReduceAmount( classDic, fields );
				setFinanceValues( classDic, fields );
				break;
			}
			case FIELDS.STUDENT.DEPEND_COST.key: {
				setValueAddedValues();
				
				setMaxReduceAmount( classDic, fields );
				setFinanceValues( classDic, fields );
				break;
			}
			case FIELDS.STUDENT.CLASS_ID.key: {
				setValueAddedValues();
				
				setMaxReduceAmount( classDic, fields );
				setFinanceValues( classDic, fields );
				break;
			}
			case FIELDS.STUDENT.REDUCE_AMOUNT.key: {
				setReduceAmountReasonRequired( value > 0 );
				if ( value === 0 ) {
					form.setFieldsValue( {
						[ FIELDS.STUDENT.REDUCE_REASON.key ]: undefined,
					} );
				}
				setFinanceValues( classDic, fields );
				break;
			}
			case FIELDS.STUDENT.COOPERATION_UNIT.key: {
				// 代培
				if ( String( data.id ? data.studentType : studentType ) !== '1' && cooperationUnits ) {
					const cooperationUnit = cooperationUnits.find( ( { dKey } ) =>
						dKey === value );
					if ( cooperationUnit ) {
						const { contact, province, city, district, address } = cooperationUnit;
						form.setFieldsValue( {
							[ FIELDS.STUDENT.COOPERATION_UNIT_CONCAT_PEOPLE.key ]: contact,
							[ FIELDS.STUDENT.COOPERATION_UNIT_CONCAT_MOBILE.key ]: cooperationUnit.mobile,
							[ FIELDS.STUDENT.COOPERATION_UNIT_CONCAT_ADDRESS.key ]: getLocation()( [ province, city, district ] ) + address,
						} );
					}
				}
				break;
			}
			case FIELDS.STUDENT.APPLY_TYPE.key: {
				const dic = dictionary[ FIELDS.STUDENT.APPLY_TYPE.dictionary ];
				if ( dic ) {
					if ( value === 'recover' ) {
						setSubTypeName( '原因' );
					} else {
						setSubTypeName( '' );
					}
					
					const subDic = dictionary[ `${FIELDS.STUDENT.APPLY_TYPE.dictionary}_${value}` ];
					
					if ( subDic.find( ( { dKey } ) => dKey === data[ FIELDS.STUDENT.APPLY_SUB_TYPE.key ] ) ) {
					
					} else {
						form.setFieldsValue( { [ FIELDS.STUDENT.APPLY_SUB_TYPE.key ]: subDic[ 0 ][ 'dKey' ] } );
					}
					
					setApplyType( subDic );
					if ( value === 'add' ) {
						setIsAdd( true );
					} else {
						setIsAdd( false );
					}
				}
				break;
			}
			case FIELDS.STUDENT.APPLY_WAY.key: {
				const dic = dictionary[ FIELDS.STUDENT.APPLY_WAY.dictionary ];
				if ( dic ) {
					if ( value && value !== 'self' ) {
						setApplyWay( [
							FIELDS.STUDENT.PROXY_NAME,
							FIELDS.STUDENT.PROXY_CARD_TYPE,
							FIELDS.STUDENT.PROXY_CARD_NO,
							FIELDS.STUDENT.PROXY_TEL_PHONE,
							FIELDS.STUDENT.PROXY_LOCATION,
							FIELDS.STUDENT.PROXY_ADDRESS,
						] );
					} else {
						setApplyWay( [] );
					}
				}
				break;
			}
			case 'insteadKm2Price': {
				setMaxReduceAmount( classDic, fields );
				setFinanceValues( classDic, fields );
				break;
			}
			case 'insteadKm3Price': {
				setMaxReduceAmount( classDic, fields );
				setFinanceValues( classDic, fields );
				break;
			}
			case FIELDS.STUDENT.VALUE_ADDED.key: {
				if ( value && getAddedValues().length > 0 ) {
					let result;
					if ( data.id ) {
						if ( String( data.studentType ) === '4' ) {
							result = getAddedValues().filter( v => {
								return value.find( i => i === v.dKey );
							} ).map( v => v.amount ).reduce( ( prev, next ) => {
								return Number( prev ) + Number( next );
							}, [] );
						} else {
							result = getAddedValues().filter( v => {
								return (value.find( i => i === v.dKey )) && (v.inClass === false);
							} ).map( v => v.amount ).reduce( ( prev, next ) => {
								return Number( prev ) + Number( next );
							}, [] );
						}
					} else {
						result = getAddedValues().filter( v => {
							return (value.find( i => i === v.dKey )) && (v.disabled === false);
						} ).map( v => v.amount ).reduce( ( prev, next ) => {
							return Number( prev ) + Number( next );
						}, [] );
					}
					
					if ( Array.isArray( result ) && result.length === 0 ) {
						setTotalValueAddedAmount( 0 );
					} else {
						setTotalValueAddedAmount( result );
					}
				} else {
					setTotalValueAddedAmount( 0 );
				}
				break;
			}
			case FIELDS.STUDENT.PROXY_KM.key: {
				if ( value.includes( 'km2' ) ) {
					const dis = (data.id && String( data.studentStatus ) !== '6') || false;
					setDpkm2Disabled( dis );
					if ( dis ) {
						form.setFieldsValue( { insteadKm2Price: 0 } );
						setMaxReduceAmount( classDic, fields );
						setFinanceValues( classDic, fields );
					}
				} else {
					setDpkm2Disabled( true );
					
					if ( fields[ 'insteadKm2Price' ] !== 0 ) {
						form.setFieldsValue( { insteadKm2Price: 0 } );
						setMaxReduceAmount( classDic, fields );
						setFinanceValues( classDic, fields );
					}
				}
				
				if ( value.includes( 'km3' ) ) {
					const dis = (data.id && String( data.studentStatus ) !== '6') || false;
					setDpkm3Disabled( dis );
					if ( dis ) {
						form.setFieldsValue( { insteadKm3Price: 0 } );
						setMaxReduceAmount( classDic, fields );
						setFinanceValues( classDic, fields );
					}
				} else {
					setDpkm3Disabled( true );
					
					if ( fields[ 'insteadKm3Price' ] !== 0 ) {
						form.setFieldsValue( { insteadKm3Price: 0 } );
						setMaxReduceAmount( classDic, fields );
						setFinanceValues( classDic, fields );
					}
				}
				break;
			}
			case FIELDS.STUDENT.OPERATOR_TYPE.key: {
				// form.setFieldsValue( { operatorId: operatorId ? operatorId : undefined } );
				if (value === 1) {
					setOperationList(dictionary['employee_id']);
				} 
				if (value === 2) {
					if (data.id) {
						setOperationList(dictionary['introducer_id'].filter(one => (one.dictSwitch * 1 === 1 || data.operatorId * 1 === one.dKey * 1)));
					} else {
						setOperationList(dictionary['introducer_id'].filter(one => one.dictSwitch * 1 === 1));
					}
				}
				break;
			}
		}
	};
	
	// 基础字段
	const baseFields = [
		{
			...FIELDS.STUDENT.NAME,
			rules: [ { required: true, }, { whitespace: true, message: `请输入${FIELDS.STUDENT.NAME.title}`, } ],
		},
		{
			...FIELDS.STUDENT.GENDER,
			initialValue: data[ FIELDS.STUDENT.GENDER.key ],
		},
		{
			...FIELDS.STUDENT.NATIONALITY,
			defaultValue: 'China',
		},
		{
			...FIELDS.STUDENT.MAJOR_CARD_TYPE,
			defaultValue: 'idcard',
		},
		{
			...FIELDS.STUDENT.MAJOR_CARD_CODE,
			rules: [ { required: true, }, { ...majorCardValidate } ],
		},
		FIELDS.STUDENT.BIRTHDAY,
		{
			...FIELDS.STUDENT.REG_ADDRESS,
			rules: [ { required: true, }, { whitespace: true, message: `请输入${FIELDS.STUDENT.REG_ADDRESS.title}`, } ],
			col: 24,
		},
		{
			...FIELDS.STUDENT.CON_ADDRESS,
			rules: [ { required: true, }, { whitespace: true, message: `请输入${FIELDS.STUDENT.CON_ADDRESS.title}`, } ],
			col: 24,
		},
		{
			...FIELDS.STUDENT.MOBILE,
			rules: [ { required: true, }, { pattern: mobile, message: `请输入正确的${FIELDS.STUDENT.MOBILE.title}`, } ],
		},
		{
			...FIELDS.STUDENT.EMAIL,
			rules: [ { pattern: email, message: `请输入正确的${FIELDS.STUDENT.EMAIL.title}`, } ],
		},
		{
			...FIELDS.STUDENT.ZIP,
			rules: [],
		},
	];
	
	// 本校字段
	const localFields = [
		{
			...FIELDS.STUDENT.LICENSE_TYPE_ACTIVE,
			// defaultValue: 'C1',
			status: (data.id && String( data.studentStatus ) !== '6') ? 'disabled' : 'edit',
		},
		{
			...FIELDS.STUDENT.DEPART_ID_SCHOOL,
			status: (data.id && String( data.studentStatus ) !== '6') ? 'disabled' : 'edit',
		},
		{
			...FIELDS.STUDENT.SOURCE_TYPE,
			defaultValue: 'local',
		},
		{
			...FIELDS.STUDENT.TEMP_RESIDENCE_PERMIT,
			// rules: [ { required: !sourceTypeIsLocal, } ],
			rules: [],
			status: !sourceTypeIsLocal ? 'edit' : 'disabled',
		},
		{
			...FIELDS.STUDENT.BACKUP_TEL_PHONE,
			rules: [
				{
					validator: ( rule, value, callback ) => {
						if ( hasChinese.test( value ) ) {
							callback( `${FIELDS.STUDENT.BACKUP_TEL_PHONE.title}不可有汉字` );
							return false;
						}
						callback();
					},
				}, ],
		},
		{
			...FIELDS.STUDENT.CAREER,
			rules: [],
		},
		{
			...FIELDS.STUDENT.CLASS_ID_ACTIVE,
			initialValue: data[ FIELDS.STUDENT.CLASS_ID.key ] || undefined,
			values: classIdValues,
			status: (data.id && String( data.studentStatus ) !== '6') ? 'disabled' : 'edit',
		},
		{
			...FIELDS.STUDENT.FEE_TYPE,
			status: 'disabled',
		},
		{
			...FIELDS.STUDENT.REDUCE_AMOUNT,
			title: '学费下调',
			type: 'inputNumber',
			initialValue: data[ FIELDS.STUDENT.REDUCE_AMOUNT.key ] || 0,
			status: (data.id && String( data.studentStatus ) !== '6') ? 'disabled' : 'edit',
			rules: [],
			max: reduceAmount || 0,
			formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
			parser: value => value.replace( /\$\s?|(,*)/g, '' ),
			min: 0,
		},
		{
			...FIELDS.STUDENT.REDUCE_REASON,
			status: (data.id && String( data.studentStatus ) !== '6') ? 'disabled' : 'edit',
			rules: [ { required: reduceAmountReasonRequired, } ],
		},
		{
			...FIELDS.STUDENT.DISCOUNT,
			// status: 'disabled',
			type: 'inputNumber',
			// initialValue: data[ FIELDS.STUDENT.DISCOUNT.key ] || 0,
			defaultValue: data[ FIELDS.STUDENT.DISCOUNT.key ] || 0,
			// status: (data.id && String( data.studentStatus ) !== '6') ? 'disabled' : 'edit',
			rules: [],
			formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
			parser: value => value.replace( /\$\s?|(,*)/g, '' ),
			min: 0,
			status: isHideData ? 'read' : 'disabled',
			// type: isHideData ? 'input' : 'inputNumber',
			mode: isHideData ? 'pwd' : ''
		},
		{
			...FIELDS.STUDENT.DEPOSIT,
			type: 'inputNumber',
			rules: [],
			// initialValue: data[ FIELDS.STUDENT.DEPOSIT.key ] || 0,
			defaultValue: data[ FIELDS.STUDENT.DEPOSIT.key ] || 0,
			formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
			parser: value => value.replace( /\$\s?|(,*)/g, '' ),
			// status: 'disabled'
			status: isHideData ? 'read' : 'disabled',
			// type: isHideData ? 'input' : 'inputNumber',
			mode: isHideData ? 'pwd' : ''
		},
		{
			...FIELDS.STUDENT.RECEIVABLE,
			title: '报名交费',
			type: 'inputNumber',
			defaultValue: 0,
			min: 0,
			formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
			parser: value => value.replace( /\$\s?|(,*)/g, '' ),
			// status: giveMoneyStatus,
			status: isHideData ? 'read' : giveMoneyStatus,
			// type: isHideData ? 'input' : 'inputNumber',
			mode: isHideData ? 'pwd' : ''
		},
		{
			...FIELDS.STUDENT.OWED,
			title: '尾款',
			defaultValue: data[ FIELDS.STUDENT.OWED.key ] || 0,
			// initialValue: data[ FIELDS.STUDENT.OWED.key ] || 0,
			// status: 'disabled',
			type: 'inputNumber',
			status: isHideData ? 'read' : 'disabled',
			// type: isHideData ? 'input' : 'inputNumber',
			mode: isHideData ? 'pwd' : ''
		},
		{
			...FIELDS.STUDENT.CHANNEL,
			initialValue: data[ FIELDS.STUDENT.CHANNEL.key ] || 'school',
			rules: [],
		},
		{
			...FIELDS.STUDENT.OPERATOR_TYPE,
			values: [
				{dKey: 1, dValue: '员工'},
				{dKey: 2, dValue: '校外介绍人'}
			],
			initialValue: data[ FIELDS.STUDENT.OPERATOR_TYPE.key ] ,
			rules: [],
		},
		{
			...FIELDS.STUDENT.OPERATOR_ID,
			rules: [],
			values: operationList,
			initialValue: operatorId,
		},
		{
			...FIELDS.STUDENT.CONTRACT_NO,
			rules: [],
		},
		{
			...FIELDS.STUDENT.REPORT_TIME,
			rules: [],
		},
		{
			...FIELDS.STUDENT.KM2_COACH_ID,
			rules: [],
			values: km2CoachList,
			// values: 
			// values: dictionary[ FIELDS.STUDENT.KM2_COACH_ID.dictionary ].filter(one),
		},
		{
			...FIELDS.STUDENT.KM3_COACH_ID,
			rules: [],
			values: km3CoachList,
		}
	];
	
	// 代培字段
	let helpFields = [
		{
			...FIELDS.STUDENT.LICENSE_TYPE_ACTIVE,
			status: (data.id && String( data.studentStatus ) !== '6') ? 'disabled' : 'edit',
			// defaultValue: 'C1',
		},
		{
			...FIELDS.STUDENT.DEPART_ID_SCHOOL,
			status: (data.id && String( data.studentStatus ) !== '6') ? 'disabled' : 'edit',
		},
		{
			...FIELDS.STUDENT.COOPERATION_UNIT,
			initialValue: data[ FIELDS.STUDENT.COOPERATION_UNIT.key ] && String( data[ FIELDS.STUDENT.COOPERATION_UNIT.key ] ),
			// 代培机构职能选择有代培资格的外协机构
			values: cooperationUnits ? cooperationUnits.filter( ( { coopType } ) => coopType.split( ',' ).includes( '3' ) ) : [],
		},
		{
			...FIELDS.STUDENT.COOPERATION_UNIT_CONCAT_PEOPLE,
			rules: [],
			status: 'disabled',
		},
		{
			...FIELDS.STUDENT.COOPERATION_UNIT_CONCAT_MOBILE,
			rules: [],
			status: 'disabled',
		},
		{
			...FIELDS.STUDENT.COOPERATION_UNIT_CONCAT_ADDRESS,
			rules: [],
			status: 'disabled',
		},
		{
			...FIELDS.STUDENT.SOURCE_TYPE,
			defaultValue: 'local',
		},
		{
			...FIELDS.STUDENT.TEMP_RESIDENCE_PERMIT,
			// rules: [ { required: !sourceTypeIsLocal, } ],
			rules: [],
			status: !sourceTypeIsLocal ? 'edit' : 'disabled',
		},
		{
			...FIELDS.STUDENT.BACKUP_TEL_PHONE,
			rules: [
				{
					validator: ( rule, value, callback ) => {
						if ( hasChinese.test( value ) ) {
							callback( `${FIELDS.STUDENT.BACKUP_TEL_PHONE.title}不可有汉字` );
							return false;
						}
						callback();
					},
				}, ],
		},
		{
			...FIELDS.STUDENT.CAREER,
			rules: [],
		},
		{
			...FIELDS.STUDENT.CLASS_ID_ACTIVE,
			values: classIdValues,
			status: (data.id && String( data.studentStatus ) !== '6') ? 'disabled' : 'edit',
		},
		{
			...FIELDS.STUDENT.PROXY_KM,
			mode: 'multiple',
			initialValue: data[ FIELDS.STUDENT.PROXY_KM.key ],
			status: (data.id && String( data.studentStatus ) !== '6') ? 'disabled' : 'edit',
			values: [
				{ dKey: 'km2', dValue: '科目二' },
				{ dKey: 'km3', dValue: '科目三' }
			]
		},
		{
			title: '代培科目二',
			key: 'insteadKm2Price',
			type: 'inputNumber',
			defaultValue: data[ 'insteadKm2Price' ] || 0,
			// initialValue: data[ 'insteadKm2Price' ] || 0,
			// status: dpkm2Disabled ? 'disabled' : 'edit',
			formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
			parser: value => value.replace( /\$\s?|(,*)/g, '' ),
			min: 0,
			status: isHideData ? 'read' : dpkm2Disabled ? 'disabled' : 'edit',
			// type: isHideData ? 'input' : 'inputNumber',
			mode: isHideData ? 'pwd' : ''
		},
		{
			title: '代培科目三',
			key: 'insteadKm3Price',
			type: 'inputNumber',
			// initialValue: data[ 'insteadKm3Price' ] || 0,
			defaultValue: data[ 'insteadKm3Price' ] || 0,
			// status: dpkm3Disabled ? 'disabled' : 'edit',
			formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
			parser: value => value.replace( /\$\s?|(,*)/g, '' ),
			min: 0,
			status: isHideData ? 'read' : (dpkm3Disabled ? 'disabled' : 'edit'),
			// type: isHideData ? 'input' : 'inputNumber',
			mode: isHideData ? 'pwd' : ''
		},
		{
			...FIELDS.STUDENT.REDUCE_AMOUNT,
			title: '学费下调',
			type: 'inputNumber',
			// initialValue: data[ FIELDS.STUDENT.REDUCE_AMOUNT.key ] || 0,
			defaultValue: data[ FIELDS.STUDENT.REDUCE_AMOUNT.key ] || 0,
			rules: [],
			// status: (data.id && String( data.studentStatus ) !== '6') ? 'disabled' : 'edit',
			max: reduceAmount || 0,
			formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
			parser: value => value.replace( /\$\s?|(,*)/g, '' ),
			min: 0,
			status: isHideData ? 'read' : ((data.id && String( data.studentStatus ) !== '6') ? 'disabled' : 'edit'),
			// type: isHideData ? 'input' : 'inputNumber',
			mode: isHideData ? 'pwd' : ''
		},
		{
			...FIELDS.STUDENT.REDUCE_REASON,
			status: (data.id && String( data.studentStatus ) !== '6') ? 'disabled' : 'edit',
			rules: [ { required: reduceAmountReasonRequired, } ],
		},
		{
			...FIELDS.STUDENT.RECEIVABLE,
			title: '报名交费',
			type: 'inputNumber',
			min: 0,
			defaultValue: data[ FIELDS.STUDENT.RECEIVABLE.key ] || 0,
			// initialValue: data[ FIELDS.STUDENT.RECEIVABLE.key ],
			formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
			parser: value => value.replace( /\$\s?|(,*)/g, '' ),
			// status: giveMoneyStatus,
			status: isHideData ? 'read' : giveMoneyStatus,
			// type: isHideData ? 'input' : 'inputNumber',
			mode: isHideData ? 'pwd' : ''
		},
		{
			...FIELDS.STUDENT.CHANNEL,
			initialValue: data[ FIELDS.STUDENT.CHANNEL.key ] || 'school',
			rules: [],
		},
		{
			...FIELDS.STUDENT.OPERATOR_TYPE,
			values: [
				{dKey: 1, dValue: '员工'},
				{dKey: 2, dValue: '校外介绍人'}
			],
			initialValue: data[ FIELDS.STUDENT.OPERATOR_TYPE.key ] ,
			rules: [],
		},
		{
			...FIELDS.STUDENT.OPERATOR_ID,
			rules: [],
			values: operationList,
			initialValue: operatorId,
		},
		{
			...FIELDS.STUDENT.CONTRACT_NO,
			rules: [],
		},
		{
			...FIELDS.STUDENT.REPORT_TIME,
			rules: [],
		},
		{
			...FIELDS.STUDENT.KM2_COACH_ID,
			rules: [],
		},
		{
			...FIELDS.STUDENT.KM3_COACH_ID,
			rules: [],
		},
	];
	
	// if ( data.id ) {
	// 	// 编辑的时候，不再显示科目二和科目三的费用，只显示总费用
	// 	helpFields = helpFields.filter( ( { key } ) => (key !== 'dpkm2') && (key !== 'dpkm3') );
	// }
	
	// 挂靠字段
	const dependFields = [
		{
			...FIELDS.STUDENT.LICENSE_TYPE_ACTIVE,
			status: (data.id && String( data.studentStatus ) !== '6') ? 'disabled' : 'edit',
			// defaultValue: 'C1',
		},
		{
			...FIELDS.STUDENT.DEPART_ID_SCHOOL,
			status: (data.id && String( data.studentStatus ) !== '6') ? 'disabled' : 'edit',
		},
		{
			...FIELDS.STUDENT.COOPERATION_UNIT,
			initialValue: data[ FIELDS.STUDENT.COOPERATION_UNIT.key ] && String( data[ FIELDS.STUDENT.COOPERATION_UNIT.key ] ),
			// 挂靠机构职能选择有挂靠资格的外协机构
			values: cooperationUnits ? cooperationUnits.filter( ( { coopType } ) => coopType.split( ',' ).includes( '4' ) ) : [],
		},
		// FIELDS.STUDENT.COOPERATION_UNIT,
		{
			...FIELDS.STUDENT.COOPERATION_UNIT_CONCAT_PEOPLE,
			rules: [],
			status: 'disabled',
		},
		{
			...FIELDS.STUDENT.COOPERATION_UNIT_CONCAT_MOBILE,
			rules: [],
			status: 'disabled',
		},
		{
			...FIELDS.STUDENT.COOPERATION_UNIT_CONCAT_ADDRESS,
			rules: [],
			status: 'disabled',
		},
		{
			...FIELDS.STUDENT.SOURCE_TYPE,
			defaultValue: 'local',
		},
		{
			...FIELDS.STUDENT.TEMP_RESIDENCE_PERMIT,
			// rules: [ { required: !sourceTypeIsLocal, } ],
			rules: [],
			status: !sourceTypeIsLocal ? 'edit' : 'disabled',
		},
		{
			...FIELDS.STUDENT.CAREER,
			rules: [],
		},
		{
			...FIELDS.STUDENT.BACKUP_TEL_PHONE,
			rules: [
				{
					validator: ( rule, value, callback ) => {
						if ( hasChinese.test( value ) ) {
							callback( `${FIELDS.STUDENT.BACKUP_TEL_PHONE.title}不可有汉字` );
							return false;
						}
						callback();
					},
				}, ],
		},
		{
			...FIELDS.STUDENT.OPERATOR_TYPE,
			values: [
				{dKey: 1, dValue: '员工'},
				{dKey: 2, dValue: '校外介绍人'}
			],
			initialValue: data[ FIELDS.STUDENT.OPERATOR_TYPE.key ] ,
			rules: [],
		},
		{
			...FIELDS.STUDENT.OPERATOR_ID,
			rules: [],
			values: operationList,
			initialValue: operatorId,
		},
		{
			title: '挂靠学费',
			key: 'dependCost',
			defaultValue: 0,
			type: 'inputNumber',
			// status: 'disabled',
			status: isHideData ? 'read' : 'disabled',
			// type: isHideData ? 'inputNumber' : 'input',
			mode: isHideData ? 'pwd' : ''
		},
		{
			...FIELDS.STUDENT.REDUCE_AMOUNT,
			title: '学费下调',
			type: 'inputNumber',
			// initialValue: data[ FIELDS.STUDENT.REDUCE_AMOUNT.key ] || 0,
			defaultValue: data[ FIELDS.STUDENT.REDUCE_AMOUNT.key ] || 0,
			rules: [],
			max: reduceAmount || 0,
			// status: (data.id && String( data.studentStatus ) !== '6') ? 'disabled' : 'edit',
			formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
			parser: value => value.replace( /\$\s?|(,*)/g, '' ),
			min: 0,
			status: isHideData ? 'read' : ((data.id && String( data.studentStatus ) !== '6') ? 'disabled' : 'edit'),
			// type: isHideData ? 'input' : 'inputNumber',
			mode: isHideData ? 'pwd' : ''
		},
		{
			...FIELDS.STUDENT.REDUCE_REASON,
			status: (data.id && String( data.studentStatus ) !== '6') ? 'disabled' : 'edit',
			rules: [ { required: reduceAmountReasonRequired, } ],
		},
		{
			...FIELDS.STUDENT.RECEIVABLE,
			title: '报名交费',
			type: 'inputNumber',
			min: 0,
			defaultValue: 0,
			formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
			parser: value => value.replace( /\$\s?|(,*)/g, '' ),
			// status: giveMoneyStatus,
			status: isHideData ? 'read' : giveMoneyStatus,
			// type: isHideData ? 'input' : 'inputNumber',
			mode: isHideData ? 'pwd' : ''
		},
		{
			...FIELDS.STUDENT.CHANNEL,
			initialValue: data[ FIELDS.STUDENT.CHANNEL.key ] || 'school',
			rules: [],
		},
		{
			...FIELDS.STUDENT.CONTRACT_NO,
			rules: [],
		},
		{
			...FIELDS.STUDENT.REPORT_TIME,
			rules: [],
		},
	];
	
	// 新增学员显示备注
	if ( !data.id ) {
		localFields.push( {
			...FIELDS.STUDENT.MEMO,
			rules: [],
			col: 24,
		} );
		dependFields.push( {
			...FIELDS.STUDENT.MEMO,
			rules: [],
			col: 24,
		} );
		helpFields.push( {
			...FIELDS.STUDENT.MEMO,
			rules: [],
			col: 24,
		} );
	}
	
	// 获取报名费
	const totalReceivableMoney = form.getFieldValue( FIELDS.STUDENT.RECEIVABLE.key ) ? Math.max( form.getFieldValue( FIELDS.STUDENT.RECEIVABLE.key ), 0 ) : 0;
	
	// 274为除去表单组件的Modal高度
	return (
		<Modal
			title={data.id ? `编辑报名信息 - ${data.name}` : `新增报名信息 - ${type && type.dValue}`}
			destroyOnClose
			centered
			visible={visible}
			style={{ paddingBottom: 0, }}
			width="90%"
			onOk={submit}
			// confirmLoading={submitLoading}
			confirmLoading={loading}
			onCancel={() => setVisible( false )}
			afterClose={() => setNeedUpdate( true )}
			closable={true}
			maskClosable={false}
			keyboard={false}
		>
			<Form onSubmit={submit} layout="vertical"
			      style={{ height: `calc(100vh - 274px - ${24 * 3}px)`, overflowY: 'auto' }}>
				<Collapse activeKey={activeKey} onChange={key => setActiveKey( key )} expandIconPosition="right">
					<Panel header="申领人信息" key="1" forceRender>
						<Row gutter={{ sm: 24 }}>
							<Col lg={20} md={19} sm={24}>
								<Row gutter={{ sm: 24 }}>
									{
										baseFields.map( f => (
											<Col key={f.key} md={f.col || 8} sm={24}>
												<WrapperComplexFormItem
													config={f}
													rules={f.rules ? [ ...f.rules, ] : [ { required: true, } ]}
													initialValue={f.initialValue || data[ f.key ]}
													onChange={onChange}
													form={form}
													defaultValue={f.defaultValue}
													useDefault={true}
												/>
											</Col>
										) )
									}
								</Row>
							</Col>
							<Col lg={4} md={5} sm={24}>
								<Card
									bordered={false}
									bodyStyle={{ paddingLeft: 0, paddingRight: 0, }}
									cover={
										photo
											?
											<img alt="身份证照片"
											     src={photo}/>
											:
											null
									}
								>
									<Meta title={
										<Button type="primary"
										        block
										        loading={readBaseInfoFromIDLoading}
										        htmlType="button"
										        onClick={e => readBaseInfoFromID( e )}
										>读取身份证</Button>
									}/>
								
								</Card>
							</Col>
						</Row>
					</Panel>
					<Panel header="报名信息" key="2" forceRender>
						<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
							{
								String( data.id ? data.studentType : studentType ) === '1' && localFields.map( f => (
									<Col key={f.key} md={f.col || 4} sm={24} style={{height: '93px', overflow: 'hidden'}}>
										<WrapperComplexFormItem
											config={f}
											status={f.status}
											rules={f.rules ? [ ...f.rules, ] : [ { required: true, } ]}
											defaultValue={f.defaultValue}
											useDefault={true}
											initialValue={f.initialValue === 0 ? 0 : (f.initialValue || data[ f.key ])}
											min={f.min}
											max={f.max}
											onChange={onChange}
											values={f.values}
											formatter={f.formatter}
											parser={f.parser}
											form={form}
											mode={f.mode}
										/>
									</Col>
								) )
							}
							{
								String( data.id ? data.studentType : studentType ) === '3' && helpFields.map( f => (
									<Col key={f.key} md={f.col || 4} sm={24}>
										<WrapperComplexFormItem
											config={f}
											status={f.status}
											rules={f.rules ? [ ...f.rules, ] : [ { required: true, } ]}
											defaultValue={f.defaultValue}
											useDefault={true}
											initialValue={f.initialValue === 0 ? 0 : (f.initialValue || data[ f.key ])}
											min={f.min}
											max={f.max}
											onChange={onChange}
											values={f.values}
											formatter={f.formatter}
											parser={f.parser}
											mode={f.mode}
											form={form}
										/>
									</Col>
								) )
							}
							{
								String( data.id ? data.studentType : studentType ) === '4' && dependFields.map( f => (
									<Col key={f.key} md={f.col || 4} sm={24}>
										<WrapperComplexFormItem
											config={f}
											status={f.status}
											rules={f.rules ? [ ...f.rules, ] : [ { required: true, } ]}
											defaultValue={f.defaultValue}
											useDefault={true}
											initialValue={f.initialValue === 0 ? 0 : (f.initialValue || data[ f.key ])}
											min={f.min}
											max={f.max}
											form={form}
											onChange={onChange}
											values={f.values}
											formatter={f.formatter}
											parser={f.parser}
											mode={f.mode}
										/>
									</Col>
								) )
							}
						</Row>
					</Panel>
					<Panel header="增值服务" key="3" forceRender>
						{
							getAddedValues().length === 0
								?
								<Empty/>
								:
								<WrapperComplexFormItem
									config={FIELDS.STUDENT.VALUE_ADDED}
									needLabel={false}
									initialValue={getInitialValueAddedValues()}
									values={getAddedValues()}
									onChange={onChange}
									form={form}
								/>
						}
					</Panel>
					<Panel header="申请业务种类" key="4" forceRender>
						<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
							<Col xl={4} lg={6} md={8} sm={24}>
								<WrapperComplexFormItem
									config={{
										...FIELDS.STUDENT.APPLY_TYPE,
										title: '申请业务种类',
									}}
									form={form}
									initialValue={data[ FIELDS.STUDENT.APPLY_TYPE.key ] || 'first'}
									onChange={onChange}
									rules={[ { required: true, } ]}
								/>
							</Col>
							<Col sm={24}>
								<Row gutter={{ xs: 8, }}>
									<Col sm={24}>
										<WrapperComplexFormItem
											config={{
												...FIELDS.STUDENT.APPLY_SUB_TYPE,
												title: getSubTypeName(),
											}}
											form={form}
											initialValue={data[ FIELDS.STUDENT.APPLY_SUB_TYPE.key ] || undefined}
											values={applyType}
											rules={[ { required: true, } ]}
										/>
									</Col>
								</Row>
							</Col>
							{
								isAdd && <Col sm={24}>
									<Row gutter={{ sm: 24 }}>
										<Col md={6} sm={24}>
											<WrapperComplexFormItem
												config={FIELDS.STUDENT.OLD_LICENCE_TYPE}
												initialValue={data[ FIELDS.STUDENT.OLD_LICENCE_TYPE.key ] || undefined}
												form={form}
												rules={[]}
											/>
										</Col>
										<Col md={6} sm={24}>
											<WrapperComplexFormItem
												config={FIELDS.STUDENT.CHANGE_LICENCE_TIME}
												initialValue={data[ FIELDS.STUDENT.CHANGE_LICENCE_TIME.key ] || undefined}
												form={form}
												rules={[]}
											/>
										</Col>
									</Row>
								</Col>
							}
						</Row>
					</Panel>
					<Panel header="申请方式" key="5" forceRender>
						<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
							<Col sm={24}>
								<WrapperComplexFormItem
									config={FIELDS.STUDENT.APPLY_WAY}
									form={form}
									initialValue={data[ FIELDS.STUDENT.APPLY_WAY.key ] || 'self'}
									onChange={onChange}
									rules={[ { required: true, } ]}
								/>
							</Col>
						</Row>
						<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
							{
								applyWay.map( f => (
									<Col key={f.key} md={f.col || 4} sm={24}>
										<WrapperComplexFormItem
											config={f}
											status={f.status}
											rules={f.rules ? [ ...f.rules, ] : [ { required: true, } ]}
											defaultValue={f.defaultValue}
											useDefault={true}
											initialValue={f.initialValue || data[ f.key ]}
											onChange={onChange}
											values={f.values}
											form={form}
										/>
									</Col>
								) )
							}
						</Row>
					</Panel>
					<Panel header="报名材料" key="6" forceRender>
						<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
							<Col sm={24}>
								<WrapperComplexFormItem
									config={FIELDS.STUDENT.MATERIAL}
									initialValue={data.id ? (data[ FIELDS.STUDENT.MATERIAL.key ] ? data[ FIELDS.STUDENT.MATERIAL.key ].split( ',' ) : undefined) : [ 'am1', 'am3', 'am4', 'am6', ]}
									needLabel={false}
									form={form}
								/>
							</Col>
						</Row>
					</Panel>
				</Collapse>
			</Form>
			<Card style={{ padding: 16, marginTop: 24, }} bodyStyle={{ padding: 0 }}>
				<DescriptionList size="large" title="费用总计">
					<Description
						term="报名费">{isHideData ? (totalReceivableMoney + '').replace(/[0-9]/gi, '*') : totalReceivableMoney}元</Description>
					<Description term="增值服务费">{isHideData ? (totalValueAddedAmount + '').replace(/[0-9]/gi, '*') : totalValueAddedAmount}元</Description>
					<Description term="合计">{isHideData ? ((totalReceivableMoney + totalValueAddedAmount) + '').replace(/[0-9]/gi, '*') : (totalReceivableMoney + totalValueAddedAmount)}元</Description>
				</DescriptionList>
			</Card>
		</Modal>
	);
};

export default memo( Form.create()( SignUpFormModal ) );
