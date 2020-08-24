import React, { Fragment, useState } from 'react';
import { Card, Typography, Icon, Col, Row, Form, Select, Radio, Spin, } from 'antd';
import router from 'umi/router';
import style from './index.less';
import { connect } from 'dva';
import FIELDS from '@/config/fields';
import { useEffectOnce, useGetSet } from 'react-use';
import { queryDictionary, } from '@/utils/dictionaryUtil';
import numeral from 'numeral';
import StudentListModal from './StudentListModal';

const { Meta } = Card;
const { Option } = Select;

const ExamPreview = ( { form, dispatch, dictionary, loading, height, } ) => {
	const { getFieldDecorator } = form;
	const [ studentListVisible, setStudentListVisible ] = useState( false );
	const [ searchStudentParams, setSearchStudentParams ] = useState( {} );

	useEffectOnce( () => {
		queryDictionary( dispatch, FIELDS.STUDENT.DEPART_ID_SCHOOL.dictionary );
		queryDictionary( dispatch, FIELDS.STUDENT.CLASS_ID.dictionary );
	} );

	const [ getData, setData ] = useGetSet( {} );

	const [ getDepart, setDepart ] = useGetSet( '-1' );
	const [ getLicense, setLicense ] = useGetSet( '-1' );
	const [ getClass, setClass ] = useGetSet( '-1' );
	const [ getDate, setDate ] = useGetSet( '30' );

	const search = ( key, value ) => {
		if ( key === 'departId' ) {
			setDepart( value );
		}
		if ( key === 'licenseType' ) {
			setLicense( value );
		}
		if ( key === 'classId' ) {
			setClass( value );
		}
		if ( key === 'active' ) {
			setDate( value.target.value );
		}

		const params = {
			active: getDate(),
		};
		if ( getDepart() !== '-1' ) params.departId = getDepart();
		if ( getLicense() !== '-1' ) params.licenseType = getLicense();
		if ( getClass() !== '-1' ) params.classId = getClass();

		dispatch( {
			type: 'workbench/getActivePreview',
			payload: {
				params,
			},
		} ).then( data => {
			setData( data );
		} );
	};

	useEffectOnce( () => {
		search();
	} );

	const departDic = dictionary[ FIELDS.STUDENT.DEPART_ID_SCHOOL.dictionary ] || [];
	const licenseDic = dictionary[ FIELDS.STUDENT.LICENSE_TYPE_ACTIVE.dictionary ] ? dictionary[ FIELDS.STUDENT.LICENSE_TYPE_ACTIVE.dictionary ].filter( one => one.dictSwitch === 1 ) : [];
	const classDic = dictionary[ FIELDS.STUDENT.CLASS_ID.dictionary ] || [];

	const departValues = [ { dKey: '-1', dValue: '全部机构' }, ...departDic ];
	const licenseValues = [ { dKey: '-1', dValue: '全部申领类型' }, ...licenseDic ];
	const classValues = [ { dKey: '-1', dValue: '全部班型' }, ...classDic ];

	const {
		active = {
			'1': 0,
			'3': 0,
		},
		inactive = {
			'1': 0,
			'3': 0,
		},
	} = getData();

	const openStudentList = ( isActivity ) => {
		const departId = getDepart() == -1 ? undefined : getDepart();
		const licenseType = getLicense() == -1 ? undefined : getLicense();
		const classId = getClass() == -1 ? undefined : getClass();
		const activityDays = getDate() == -1 ? undefined : getDate();
		setSearchStudentParams( { isActivity, departId, licenseType, classId, activityDays } );
		setStudentListVisible( true );
	};

	const searchLoading = loading.effects[ 'workbench/getStudentPreview' ] || false;
	let a1 = typeof active[ '1' ] === 'undefined' ? 0 : active[ '1' ]
	let a3 = typeof active[ '3' ] === 'undefined' ? 0 : active[ '3' ]
	let activeTotal = a1 + a3
	let ia1 = typeof inactive[ '1' ] === 'undefined' ? 0 : inactive[ '1' ]
	let ia3 = typeof inactive[ '3' ] === 'undefined' ? 0 : inactive[ '3' ]
	let inactiveTotal = ia1 + ia3
	return (
		<Fragment>
			<Spin spinning={searchLoading}>
				<Card title="学员活跃度" style={{ height, }} extra={
					<Row type="flex" gutter={4}>
						<Col>
							<Form.Item className={style.formItem}>
								<Select className={style.w100} value={getDepart()}
								        onChange={e => search( 'departId', e )}>
									{
										departValues.map( v => {
											return <Option value={v.dKey} key={v.dKey}>{v.dValue}</Option>
										} )
									}
								</Select>
							</Form.Item>
						</Col>
						<Col>
							<Form.Item className={style.formItem}>
								<Select className={style.w100} value={getLicense()}
								        onChange={e => search( 'licenseType', e )}>
									{
										licenseValues.map( v => {
											return <Option value={v.dKey} key={v.dKey}>{v.dValue}</Option>
										} )
									}
								</Select>
							</Form.Item>
						</Col>
						<Col>
							<Form.Item className={style.formItem}>
								<Select className={style.w100} value={getClass()}
								        onChange={e => search( 'classId', e )}>
									{
										classValues.map( v => {
											return <Option value={v.dKey} key={v.dKey}>{v.dValue}</Option>
										} )
									}
								</Select>
							</Form.Item>
						</Col>
					</Row>
				}>
					<Row gutter={24}>
						<Col sm={24}>
							<Form layout="inline">
								<Form.Item className={style.formItem} label="时间范围"
								           style={{ width: '100%', marginBottom: 24 }}>
									<Radio.Group value={getDate()} onChange={e => search( 'active', e )}>
										<Radio.Button value="7">7天</Radio.Button>
										<Radio.Button value="30">30天</Radio.Button>
										<Radio.Button value="60+">60天以上</Radio.Button>
									</Radio.Group>
								</Form.Item>
							</Form>
						</Col>
						<Col sm={12} className={style.col}>
							<Card type="inner" title="活跃学员"
							      extra={<a
								      onClick={() => openStudentList( 0 )}>{`${numeral( activeTotal ).format( '0,0' )}人`}</a>}>
								<Meta
									description={
										<div>{`本校: ${numeral( active[ '1' ] ).format( '0,0' )}人`}<br/>{`代培: ${numeral( active[ '3' ] ).format( '0,0' )}人`}
										</div>}
								/>
							</Card>
						</Col>
						<Col sm={12} className={style.col}>
							<Card type="inner" title="潜水学员"
							      extra={<a
								      onClick={() => openStudentList( 1 )}>{`${numeral( inactiveTotal ).format( '0,0' )}人`}</a>}>
								<Meta
									description={
										<div>{`本校: ${numeral( inactive[ '1' ] ).format( '0,0' )}人`}<br/>{`代培: ${numeral( inactive[ '3' ] ).format( '0,0' )}人`}
										</div>}
								/>
							</Card>
						</Col>
					</Row>
				</Card>
			</Spin>
			<StudentListModal
				searchParams={searchStudentParams}
				visible={studentListVisible}
				setVisible={setStudentListVisible}
			/>
		</Fragment>
	);
};

export default connect( (
	{
		dictionary,
		loading,
	}
) => (
	{
		dictionary,
		loading,
	}
) )( Form.create()( ExamPreview ) );
