import React from 'react';
import { Card, Row, Col, Form, Select, Icon, Spin, } from 'antd';
import { connect } from 'dva';
import style from './index.less';
import FIELDS from '@/config/fields';
import { useEffectOnce, useGetSet } from 'react-use';
import { queryDictionary, } from '@/utils/dictionaryUtil';
import router from 'umi/router';
import numeral from 'numeral';

const { Meta } = Card;
const { Option } = Select;

const StudentPreview = ( { dispatch, dictionary, loading, height, } ) => {
	const [ getData, setData ] = useGetSet( {} );
	
	const [ getDepart, setDepart ] = useGetSet( '-1' );
	const [ getLicense, setLicense ] = useGetSet( '-1' );
	const [ getClass, setClass ] = useGetSet( '-1' );
	
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
		
		const params = {};
		if ( getDepart() !== '-1' ) params.departId = getDepart();
		if ( getLicense() !== '-1' ) params.licenseType = getLicense();
		if ( getClass() !== '-1' ) params.classId = getClass();
		
		dispatch( {
			type: 'workbench/getStudentPreview',
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
	
	useEffectOnce( () => {
		queryDictionary( dispatch, FIELDS.STUDENT.DEPART_ID_SCHOOL.dictionary );
		queryDictionary( dispatch, FIELDS.STUDENT.CLASS_ID.dictionary );
	} );
	
	const departDic = dictionary[ FIELDS.STUDENT.DEPART_ID_SCHOOL.dictionary ] || [];
	const licenseDic = dictionary[ FIELDS.STUDENT.LICENSE_TYPE_ACTIVE.dictionary ] ? dictionary[ FIELDS.STUDENT.LICENSE_TYPE_ACTIVE.dictionary ].filter(one => one.dictSwitch === 1) : [];
	const classDic = dictionary[ FIELDS.STUDENT.CLASS_ID.dictionary ] || [];
	
	const departValues = [ { dKey: '-1', dValue: '全部机构' }, ...departDic ];
	const licenseValues = [ { dKey: '-1', dValue: '全部申领类型' }, ...licenseDic ];
	const classValues = [ { dKey: '-1', dValue: '全部班型' }, ...classDic ];
	
	const {
		km1 = {
			'1': 0,
			'3': 0,
			'4': 0,
			total: 0,
		},
		km2 = {
			'1': 0,
			'2': 0,
			'3': 0,
			'4': 0,
			total: 0,
		},
		km3 = {
			'1': 0,
			'2': 0,
			'3': 0,
			'4': 0,
			total: 0,
		},
		km4 = {
			'1': 0,
			'4': 0,
			total: 0,
		},
		graduation = {
			'1': 0,
			'3': 0,
			'4': 0,
			total: 0,
		},
		quit = {
			total: 0,
		}
	} = getData();
	
	const searchLoading = loading.effects[ 'workbench/getStudentPreview' ] || false;
	const linkTo = (link, tabkey) => {
		// 机构、申领类型、班型、学员状态
		if ( link ) {
			dispatch( {
				type: 'quickEntryParams/linkTo',
				payload: {
					url: link,
					params: {
						from: 'work',
						departId: getDepart() === '-1'  ? undefined : getDepart(),
						licenseType: getLicense() === '-1'  ? undefined : getLicense(),
						classId: getClass() === '-1'  ? undefined : getClass(),
						tabKey: tabkey
					},
				}
			} );
		}
	};
	return (
		<Spin spinning={searchLoading}>
			<Card style={{ height, }}
			      title={<a onClick={() => router.push( '/student/student-list' )}><Icon type="link"/> 学员情况</a>} extra={
				<Row type="flex" gutter={4}>
					<Col>
						<Form.Item className={style.formItem}>
							<Select className={style.w100} value={getDepart()} onChange={e => search( 'departId', e )}>
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
					<Col sm={8} className={style.col}>
						<Card type="inner" title="科目一" extra={`${numeral( km1.total || 0 ).format( '0,0' )}人`}
						      style={{ height: 158, }}>
							<Meta
								description={
									<div>
										本校：{numeral(km1[ '1' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo( '/student/student-list/local', '0' )}>{` ${numeral( km1[ '1' ] ).format( '0,0' )}人`}</a>}<br/>
										挂靠：{numeral(km1[ '4' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo( '/student/student-list/depend', '0' )}>{` ${numeral( km1[ '4' ] ).format( '0,0' )}人`}</a>}
									</div>}
							/>
						</Card>
					</Col>
					<Col sm={8} className={style.col}>
						<Card type="inner" title="科目二" extra={`${numeral( km2.total || 0 ).format( '0,0' )}人`}
						      style={{ height: 158, }}>
							<Meta
								description={
									<div>
									本校：{numeral(km2[ '1' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo( '/student/student-list/local', '0' )}>{`${numeral( km2[ '1' ] ).format( '0,0' )}人`}</a>}<br/>
									委培：{numeral(km2[ '2' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo( '/student/student-list/help' , '0')}>{` ${numeral( km2[ '2' ] ).format( '0,0' )}人`}</a>}<br/>
									代培：{numeral(km2[ '3' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo( '/student/student-list/proxy', '0' )}>{` ${numeral( km2[ '3' ] ).format( '0,0' )}人`}</a>}<br/>
									挂靠：{numeral(km2[ '4' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo( '/student/student-list/depend', '0' )}>{` ${numeral( km2[ '4' ] ).format( '0,0' )}人`}</a>}
									</div>}
							/>
						</Card>
					</Col>
					<Col sm={8} className={style.col}>
						<Card type="inner" title="已毕业"
						      extra={`${numeral( graduation[ '1' ] + graduation[ '4' ] ).format( '0,0' )}人`}
						      style={{ height: 158, }}>
							<Meta
								description={
									<div>
									本校: {numeral(graduation[ '1' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo( '/student/student-list/local', '2' )}>{`${numeral( graduation[ '1' ] ).format( '0,0' )}人`}</a>}<br/>
									挂靠: {numeral(graduation[ '4' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo( '/student/student-list/depend', '2' )}>{`${numeral( graduation[ '4' ] ).format( '0,0' )}人`}</a>}
									</div>}
							/>
						</Card>
					</Col>
					<Col sm={8} className={style.col}>
						<Card type="inner" title="科目三" extra={`${numeral( km3.total ).format( '0,0' )}人`}
						      style={{ height: 158, }}>
							<Meta
								description={
								<div>
									本校：{numeral(km3[ '1' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo( '/student/student-list/local', '0' )}>{` ${numeral( km3[ '1' ] ).format( '0,0' )}人`}</a>}<br/>
									委培：{numeral(km3[ '2' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo( '/student/student-list/help', '0' )}>{` ${numeral( km3[ '2' ] ).format( '0,0' )}人`}</a>}<br/>
									代培：{numeral(km3[ '3' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo( '/student/student-list/proxy', '0' )}>{` ${numeral( km3[ '3' ] ).format( '0,0' )}人`}</a>}<br/>
									挂靠：{numeral(km3[ '4' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo( '/student/student-list/depend', '0' )}>{` ${numeral( km3[ '4' ] ).format( '0,0' )}人`}</a>}
								</div>}
							/>
						</Card>
					</Col>
					<Col sm={8} className={style.col}>
						<Card type="inner" title="科目四"
						      extra={`${numeral( (km4[ '1' ] || 0) + (km4[ '4' ] || 0) ).format( '0,0' )}人`}
						      style={{ height: 158, }}>
							<Meta
								description={
								<div>
									本校：{numeral(km4[ '1' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo( '/student/student-list/local', '0' )}>{` ${numeral( km4[ '1' ] ).format( '0,0' )}人`}</a>}<br/>
									{/* 委培：{numeral(km4[ '2' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo( '/student/student-list/help', '0' )}>{` ${numeral( km4[ '2' ] ).format( '0,0' )}人`}</a>}<br/>
									代培：{numeral(km4[ '3' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo( '/student/student-list/proxy', '0' )}>{`${numeral( km4[ '3' ] ).format( '0,0' )}人`}</a>}<br/> */}
									挂靠：{numeral(km4[ '4' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo( '/student/student-list/depend', '0' )}>{` ${numeral( km4[ '4' ] ).format( '0,0' )}人`}</a>}
								</div>}
							/>
						</Card>
					</Col>
					<Col sm={8} className={style.col}>
						<Card type="inner" title="已退学"
						      extra={`${numeral( (quit[ '1' ] ? quit[ '1' ] : 0) + (quit[ '4' ] ? quit[ '4' ] : 0) ).format( '0,0' )}人`}
						      style={{ height: 158, }}>
							<Meta
								description={
								<div>
								本校：{numeral(quit[ '1' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo( '/student/student-list/local', '1' )}>{`${numeral( quit[ '1' ] ).format( '0,0' )}人`}</a>}<br/>
								挂靠：{numeral(quit[ '4' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo( '/student/student-list/depend', '1' )}>{`${numeral( quit[ '4' ] ).format( '0,0' )}人`}</a>}
								</div>}
							/>
						</Card>
					</Col>
				</Row>
			</Card>
		</Spin>
	);
};

export default connect( (
	{
		dictionary,
		loading,
		quickEntryParams
	}
) => (
	{
		dictionary,
		loading,
		quickEntryParams
	}
) )( Form.create()( StudentPreview ) );
