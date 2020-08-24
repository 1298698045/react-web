import React, { useEffect, useState} from 'react';
import { useEffectOnce, useGetSet, useUpdateEffect, } from 'react-use';
import { Form, Modal, Col, Row,Select, Tag,Icon  } from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import moment from 'moment';
import { getDictValue, queryDictionary } from '@/utils/dictionaryUtil';
import StudentSelectModal from './StudentSelectModal'
const { Option } = Select;
const defaultFormItem = [
	{
		...FIELDS.FINANCE.AMOUNT,
		title: '支付金额',
		// formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
		// parser: value => value.replace( /\$\s?|(,*)/g, '' ),
		type: 'input',
		addonAfter: '元'
	},
	FIELDS.FINANCE.EX_JOURNAL_TARGET,
	FIELDS.FINANCE.PAY_MODE,
	FIELDS.FINANCE.JOURNAL_DATE,
	FIELDS.FINANCE.EX_JOURNAL_REPORTER,
];

const AddFeeModal = props => {
	const { dispatch, handleSubmit, visible, setVisible, form, loading, type, afterClose, dictionary,btnType,studentInfo } = props;

	const [ getJournalType, setJournalType ] = useGetSet( [] );
	const [ getJournalMore, setJournalMore ] = useGetSet( [] );
	// const [ getFormItem, setFormItem ] = useGetSet( [ ...defaultFormItem ] );
	const [ formItem, setFormItem ] = useState( [] );
	const [ feeGS, setFeeGS ] = useState( '1' );
	const [ feeGSList, setFeeGSList ] = useState([]);
	const [ tbList, setTbList ] = useState([]);
	const [ studentSelectVisible, setStudentSelectVisible ] = useState( false );
	const [ selectStudentInfo, setSelectStudentInfo ] = useState( undefined );

	useUpdateEffect( () => {
		if (btnType !== 'student') {
			if ( dictionary[ type ] ) setJournalType( [ ...dictionary[ type ] ] );
		} else {
			let l1 = dictionary[ type ] 
			let l2 = dictionary.outlay_type_main ? dictionary.outlay_type_main.filter(one => one.dKey === 'o_gr') : []
			if ( dictionary[ type ] ) setJournalType( [...l1, ...l2] );
		}
		if ( dictionary[ 'depart_id' ] ) setFeeGSList( [ ...dictionary[ 'depart_id' ] ] );
	}, [ dictionary, type, visible ] );

	useEffect( () => {
		if (visible) {
			let list = dictionary.employee_id.filter(one => one.leaving * 1 !== 2)
			setTbList(list)
			setFormItem( [
				{
					...FIELDS.FINANCE.AMOUNT,
					title: '支付金额',
					// formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
					// parser: value => value.replace( /\$\s?|(,*)/g, '' ),
					type: 'input',
					addonAfter: '元'
				},
				FIELDS.FINANCE.EX_JOURNAL_TARGET,
				FIELDS.FINANCE.PAY_MODE,
				FIELDS.FINANCE.JOURNAL_DATE,
				{...FIELDS.FINANCE.EX_JOURNAL_REPORTER, values: tbList},
			] );
		}
	}, [visible] );
	const submit = e => {
		e.preventDefault();
		
		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			
			const data = {
				[ FIELDS.FINANCE.EX_JOURNAL_TYPE.key ]: `${fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_TYPE.key ]}.${fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_SUBTYPE.key ]}`,
				[ FIELDS.FINANCE.AMOUNT.key ]: fieldsValue[ FIELDS.FINANCE.AMOUNT.key ] * -1,
				[ FIELDS.FINANCE.PAY_MODE.key ]: fieldsValue[ FIELDS.FINANCE.PAY_MODE.key ],
				[ FIELDS.FINANCE.EX_JOURNAL_TARGET.key ]: fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_TARGET.key ],
				[ FIELDS.FINANCE.JOURNAL_DATE.key ]: moment( fieldsValue[ FIELDS.FINANCE.JOURNAL_DATE.key ] ).format( 'YYYY-MM-DD' ),
				[ FIELDS.FINANCE.EX_JOURNAL_REPORTER.key ]: fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_REPORTER.key ],
				more: {},
			};
			if (btnType === 'student') {
				data.more.studentId = studentInfo.id
			} else {
				// 费用归属 start
				if (feeGS * 1 === 1) {
					data.more.department = fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_GS.key ]
				} else if (feeGS * 1 === 2) {
					data.more.employeeId = fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_GS.key ]
				} else if (feeGS * 1 === 3) {
					data.more.studentId = selectStudentInfo.id
				}
			}
			// 费用归属 end 
			if ( fieldsValue[ FIELDS.STUDENT.MEMO.key ] ) data[ FIELDS.STUDENT.MEMO.key ] = fieldsValue[ FIELDS.STUDENT.MEMO.key ];
			if ( fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_GAS.key ] ) data.more = Object.assign( {}, data.more, { [ FIELDS.FINANCE.EX_JOURNAL_GAS.key ]: fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_GAS.key ] } );
			if ( fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_CAR_ID.key ] ) data.more = Object.assign( {}, data.more, { [ FIELDS.FINANCE.EX_JOURNAL_CAR_ID.key ]: fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_CAR_ID.key ] } );
			if ( fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_CAR_PART.key ] ) data.more = Object.assign( {}, data.more, { [ FIELDS.FINANCE.EX_JOURNAL_CAR_PART.key ]: fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_CAR_PART.key ] } );
			if ( fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_INSURANCE.key ] ) data.more = Object.assign( {}, data.more, {
				[ FIELDS.FINANCE.EX_JOURNAL_INSURANCE_START.key ]: moment( fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_INSURANCE.key ][ 0 ] ).format( 'YYYY-MM-DD' ),
				[ FIELDS.FINANCE.EX_JOURNAL_INSURANCE_END.key ]: moment( fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_INSURANCE.key ][ 1 ] ).format( 'YYYY-MM-DD' ),
			} );
			if ( fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_INSPECTION.key ] ) data.more = Object.assign( {}, data.more, { 
				[ FIELDS.FINANCE.EX_JOURNAL_INSPECTION.key ]: moment( fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_INSPECTION.key ] ).format( 'YYYY-MM-DD' )
			} );
			
			// if ( fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_CAR_LEASE.key ] ) data.more = Object.assign( {}, data.more, { [ FIELDS.FINANCE.EX_JOURNAL_CAR_LEASE.key ]: fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_CAR_LEASE.key ] } );
			if ( fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_CAR_LEASE.key ] ) data.more = Object.assign( {}, data.more, {
				[ FIELDS.FINANCE.EX_JOURNAL_CAR_LEASE_START.key ]: moment( fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_CAR_LEASE.key ][ 0 ] ).format( 'YYYY-MM-DD' ),
				[ FIELDS.FINANCE.EX_JOURNAL_CAR_LEASE_END.key ]: moment( fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_CAR_LEASE.key ][ 1 ] ).format( 'YYYY-MM-DD' ),
			} );
			
			if ( fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_SITE_ID.key ] ) data.more = Object.assign( {}, data.more, { [ FIELDS.FINANCE.EX_JOURNAL_SITE_ID.key ]: fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_SITE_ID.key ] } );
			if ( fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_SITE_LEASE.key ] ) data.more = Object.assign( {}, data.more, {
				[ FIELDS.FINANCE.EX_JOURNAL_SITE_LEASE_START.key ]: moment( fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_SITE_LEASE.key ][ 0 ] ).format( 'YYYY-MM-DD' ),
				[ FIELDS.FINANCE.EX_JOURNAL_SITE_LEASE_END.key ]: moment( fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_SITE_LEASE.key ][ 1 ] ).format( 'YYYY-MM-DD' ),
			} );
			if ( fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_NUM.key ] ) data.more = Object.assign( {}, data.more, { [ FIELDS.FINANCE.EX_JOURNAL_NUM.key ]: fieldsValue[ FIELDS.FINANCE.EX_JOURNAL_NUM.key ] } );
			
			handleSubmit( {
				params: {
					...data
				}
			} );
		} );
	};
	
	const renderFormItem = () => {
		const type = form.getFieldValue( FIELDS.FINANCE.EX_JOURNAL_SUBTYPE.key );
		
		switch ( type ) {
			case 'gas':
			case 'gasoline': {
				// 燃料费-油费
				setFormItem( [
					FIELDS.FINANCE.EX_JOURNAL_CAR_ID,
					{
						...FIELDS.FINANCE.EX_JOURNAL_GAS,
						// formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
						// parser: value => value.replace( /\$\s?|(,*)/g, '' ),
						min: 0,
						type: 'input',
						addonAfter: '升',
						required: 'no'
					},
					{
						...FIELDS.FINANCE.AMOUNT,
						title: '支付金额',
						// formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
						// parser: value => value.replace( /\$\s?|(,*)/g, '' ),
						min: 0,
						type: 'input',
						addonAfter: '元'
					},
					FIELDS.FINANCE.EX_JOURNAL_TARGET,
					FIELDS.FINANCE.PAY_MODE,
					FIELDS.FINANCE.JOURNAL_DATE,
					{
						...FIELDS.FINANCE.EX_JOURNAL_REPORTER,
						values: dictionary.employee_id_coach ? dictionary.employee_id_coach.filter(one => one.leaving * 1 !== 2) : []
						// dictionary: 'employee_id_coach',
					},
				] );
				break;
			}
			case 'car_repair': {
				// 车辆维修费
				setFormItem( [
					{
						...FIELDS.FINANCE.EX_JOURNAL_CAR_ID,
						title: '维修车辆',
					},
					FIELDS.FINANCE.EX_JOURNAL_CAR_PART,
					{
						...FIELDS.FINANCE.AMOUNT,
						title: '支付金额',
						// formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
						// parser: value => value.replace( /\$\s?|(,*)/g, '' ),
						min: 0,
						type: 'input',
						addonAfter: '元'
					},
					FIELDS.FINANCE.EX_JOURNAL_TARGET,
					FIELDS.FINANCE.PAY_MODE,
					FIELDS.FINANCE.JOURNAL_DATE,
					{...FIELDS.FINANCE.EX_JOURNAL_REPORTER, values: tbList},
				] );
				break;
			}
			case 'car_maintain': {
				// 车辆保养费
				setFormItem( [
					{
						...FIELDS.FINANCE.EX_JOURNAL_CAR_ID,
						title: '保养车辆',
					},
					{
						...FIELDS.FINANCE.AMOUNT,
						title: '支付金额',
						// formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
						// parser: value => value.replace( /\$\s?|(,*)/g, '' ),
						min: 0,
						type: 'input',
						addonAfter: '元'
					},
					FIELDS.FINANCE.EX_JOURNAL_TARGET,
					FIELDS.FINANCE.PAY_MODE,
					FIELDS.FINANCE.JOURNAL_DATE,
					{...FIELDS.FINANCE.EX_JOURNAL_REPORTER, values: tbList},
				] );
				break;
			}
			case 'car_insurance': {
				// 车辆保险费
				setFormItem( [
					{
						...FIELDS.FINANCE.EX_JOURNAL_CAR_ID,
						title: '保险车辆',
					},
					FIELDS.FINANCE.EX_JOURNAL_INSURANCE,
					{
						...FIELDS.FINANCE.AMOUNT,
						title: '支付金额',
						// formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
						// parser: value => value.replace( /\$\s?|(,*)/g, '' ),
						min: 0,
						type: 'input',
						addonAfter: '元'
					},
					FIELDS.FINANCE.EX_JOURNAL_TARGET,
					FIELDS.FINANCE.PAY_MODE,
					FIELDS.FINANCE.JOURNAL_DATE,
					{...FIELDS.FINANCE.EX_JOURNAL_REPORTER, values: tbList},
				] );
				break;
			}
			case 'car_inspection': {
				// 车辆年检费
				setFormItem( [
					{
						...FIELDS.FINANCE.EX_JOURNAL_CAR_ID,
						title: '年检车辆',
					},
					FIELDS.FINANCE.EX_JOURNAL_INSPECTION,
					{
						...FIELDS.FINANCE.AMOUNT,
						title: '支付金额',
						// formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
						// parser: value => value.replace( /\$\s?|(,*)/g, '' ),
						min: 0,
						type: 'input',
						addonAfter: '元'
					},
					FIELDS.FINANCE.EX_JOURNAL_TARGET,
					FIELDS.FINANCE.PAY_MODE,
					FIELDS.FINANCE.JOURNAL_DATE,
					{...FIELDS.FINANCE.EX_JOURNAL_REPORTER, values: tbList},
				] );
				break;
			}
			case 'car_lease': {
				// 车辆年检费
				setFormItem( [
					{
						...FIELDS.FINANCE.EX_JOURNAL_CAR_ID,
						title: '租赁车辆',
					},
					FIELDS.FINANCE.EX_JOURNAL_CAR_LEASE,
					{
						...FIELDS.FINANCE.AMOUNT,
						title: '支付金额',
						// formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
						// parser: value => value.replace( /\$\s?|(,*)/g, '' ),
						min: 0,
						type: 'input',
						addonAfter: '元'
					},
					FIELDS.FINANCE.EX_JOURNAL_TARGET,
					FIELDS.FINANCE.PAY_MODE,
					FIELDS.FINANCE.JOURNAL_DATE,
					{...FIELDS.FINANCE.EX_JOURNAL_REPORTER, values: tbList},
				] );
				break;
			}
			case 'site_repair': {
				// 场地维修费
				setFormItem( [
					{
						...FIELDS.FINANCE.EX_JOURNAL_SITE_ID,
						title: '维修场地',
					},
					{
						...FIELDS.FINANCE.AMOUNT,
						title: '支付金额',
						// formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
						// parser: value => value.replace( /\$\s?|(,*)/g, '' ),
						min: 0,
						type: 'input',
						addonAfter: '元'
					},
					FIELDS.FINANCE.EX_JOURNAL_TARGET,
					FIELDS.FINANCE.PAY_MODE,
					FIELDS.FINANCE.JOURNAL_DATE,
					{...FIELDS.FINANCE.EX_JOURNAL_REPORTER, values: tbList},
				] );
				break;
			}
			case 'site_lease': {
				// 场地租赁费
				setFormItem( [
					{
						...FIELDS.FINANCE.EX_JOURNAL_SITE_ID,
						title: '租赁场地',
					},
					FIELDS.FINANCE.EX_JOURNAL_SITE_LEASE,
					{
						...FIELDS.FINANCE.AMOUNT,
						title: '支付金额',
						// formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
						// parser: value => value.replace( /\$\s?|(,*)/g, '' ),
						min: 0,
						type: 'input',
						addonAfter: '元'
					},
					FIELDS.FINANCE.EX_JOURNAL_TARGET,
					FIELDS.FINANCE.PAY_MODE,
					FIELDS.FINANCE.JOURNAL_DATE,
					{...FIELDS.FINANCE.EX_JOURNAL_REPORTER, values: tbList},
				] );
				break;
			}
			case 'ad':
			case 'event':
			case 'materiel': {
				// 物料费
				setFormItem( [
					{
						...FIELDS.FINANCE.AMOUNT,
						title: '支付金额',
						// formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
						// parser: value => value.replace( /\$\s?|(,*)/g, '' ),
						min: 0,
						type: 'input',
						addonAfter: '元'
					},
					FIELDS.FINANCE.EX_JOURNAL_TARGET,
					FIELDS.FINANCE.PAY_MODE,
					FIELDS.FINANCE.JOURNAL_DATE,
					{...FIELDS.FINANCE.EX_JOURNAL_REPORTER, values: tbList},
				] );
				break;
			}
			case 'people_trans': {
				// 道路危险货物资格证
				setFormItem( [
					{
						...FIELDS.FINANCE.AMOUNT,
						title: '支付金额',
						// formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
						// parser: value => value.replace( /\$\s?|(,*)/g, '' ),
						min: 0,
						type: 'input',
						addonAfter: '元'
					},
					{
						...FIELDS.FINANCE.EX_JOURNAL_NUM,
						title: '学员数量',
						formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
						parser: value => value.replace( /\$\s?|(,*)/g, '' ),
						min: 0,
					},
					FIELDS.FINANCE.EX_JOURNAL_TARGET,
					FIELDS.FINANCE.PAY_MODE,
					FIELDS.FINANCE.JOURNAL_DATE,
					{...FIELDS.FINANCE.EX_JOURNAL_REPORTER, values: tbList},
				] );
				break;
			}
			default: {
				setFormItem( [
					{
						...FIELDS.FINANCE.AMOUNT,
						title: '支付金额',
						// formatter: value => `${value}`.replace( /\B(?=(\d{3})+(?!\d))/g, ',' ),
						// parser: value => value.replace( /\$\s?|(,*)/g, '' ),
						type: 'input',
						addonAfter: '元'
					},
					FIELDS.FINANCE.EX_JOURNAL_TARGET,
					FIELDS.FINANCE.PAY_MODE,
					FIELDS.FINANCE.JOURNAL_DATE,
					{...FIELDS.FINANCE.EX_JOURNAL_REPORTER, values: tbList},
				] );
			}
		}
	};
	
	const onChange = ( key, value ) => {
		
		switch ( key ) {
			case FIELDS.FINANCE.EX_JOURNAL_TYPE.key: {
				if (value === 'o_resit') {
					setJournalMore( dictionary[ value ].filter(one => one.dKey !== 'resit') );
				} else {
					setJournalMore( dictionary[ value ] );
				}
				form.setFieldsValue( {
					[ FIELDS.FINANCE.EX_JOURNAL_SUBTYPE.key ]: undefined,
				} );
				break;
			}
			case FIELDS.FINANCE.EX_JOURNAL_SUBTYPE.key: {
				renderFormItem();
				break;
			}
		}
	};
	let feeGSType = [
		{ dKey: '1', dValue: '归属部门'},
		{ dKey: '2', dValue: '归属员工'},
		{ dKey: '3', dValue: '归属学员'},
	]
	const changeFee = (value, key) => {
		if(value) {
			form.setFieldsValue( { gsId: undefined } );
			setFeeGS(value)
			setSelectStudentInfo(undefined)
			if (value * 1 === 1) {
				setFeeGSList(dictionary['depart_id'])
			} else if (value * 1 === 2) {
				setFeeGSList(dictionary['employee_id'])
			} else if (value * 1 === 3) {
				setStudentSelectVisible(true)
			}
		}
	}
	return (
		<Modal
			title="新增费用"
			visible={visible}
			afterClose={afterClose}
			onOk={submit}
			destroyOnClose
			confirmLoading={loading}
			closable={true}
			maskClosable={false}
			keyboard={false}
			onCancel={() => setVisible( false )}
			width={700}
		>
			<Form onSubmit={submit}>
				<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
					<Col md={12} sm={24}>
						<WrapperComplexFormItem
							config={FIELDS.FINANCE.EX_JOURNAL_TYPE}
							values={getJournalType()}
							rules={[ { required: true, } ]}
							onChange={onChange}
							form={form}
						/>
					</Col>
					<Col md={12} sm={24}>
						<WrapperComplexFormItem
							config={FIELDS.FINANCE.EX_JOURNAL_SUBTYPE}
							values={getJournalMore()}
							rules={[ { required: true, } ]}
							onChange={onChange}
							form={form}
						/>
					</Col>
					{
						formItem.map( f => {
							return (
								<Col md={12} sm={24} key={f.key}>
									<WrapperComplexFormItem
										config={f}
										form={form}
										rules={f.required === 'no' ? [] : [ { required: true, } ]}
										formatter={f.formatter}
										parser={f.parser}
										addonAfter={f.addonAfter}
										min={f.min}
										values={f.values}
									/>
								</Col>
							)
						} )
					}
					{btnType !== 'student' && <Col md={24} sm={24}>
							<Col md={10} sm={24}>
								<Form.Item label="费用归属" required>
									<Select defaultValue={'1'}  onChange={changeFee}>
										{
											feeGSType.map( v => {
												return <Option value={v.dKey} key={v.dKey}>{v.dValue}</Option>
											} )
										}
									</Select>
								</Form.Item>
							</Col>
							<Col md={14} sm={24}>
								{feeGS !== '3' && <WrapperComplexFormItem style={{marginTop: '39px'}}
									config={FIELDS.FINANCE.EX_JOURNAL_GS}
									values={feeGSList}
									form={form}
									rules={[ { required: true} ]}
								/>}
								{feeGS === '3' && selectStudentInfo ? <span>
									<span style={{display: 'inline-block', marginTop: "50px",marginRight: '10px'}}>{selectStudentInfo.name + '_' + selectStudentInfo.mobile}</span>
									<Icon style={{color: '#fc541b'}} type="edit" onClick={()=>{
										setStudentSelectVisible(true)
									}}/>
								</span> : ''}
							</Col>
						</Col>
					}
					<Col sm={24}>
						<WrapperComplexFormItem
							config={FIELDS.STUDENT.MEMO}
							form={form}
						/>
					</Col>
				</Row>
			</Form>
			<StudentSelectModal
				visible={studentSelectVisible}
				setVisible={setStudentSelectVisible}
				onSelect={info => {
					setSelectStudentInfo( info );
				}}
			/>
		</Modal>
	);
};

export default Form.create()( AddFeeModal );
