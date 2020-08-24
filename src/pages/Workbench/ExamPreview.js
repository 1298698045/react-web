import React from 'react';
import { Card, Col, Row, Form, Select, Icon, Spin, Statistic, } from 'antd';
import style from './index.less';
import { connect } from 'dva';
import FIELDS from '@/config/fields';
import { useEffectOnce, useGetSet } from 'react-use';
import { queryDictionary, } from '@/utils/dictionaryUtil';
import router from 'umi/router';
import numeral from 'numeral';

const { Meta } = Card;
const { Option } = Select;

const ExamPreview = ( { form, dispatch, dictionary, loading, height, } ) => {
	const { getFieldDecorator } = form;
	
	const [ getData, setData ] = useGetSet( {} );
	
	const [ getDepart, setDepart ] = useGetSet( '-1' );
	const [ getLicense, setLicense ] = useGetSet( '-1' );
	const [ getKmCode, setKmCode ] = useGetSet( 'km1' );
	// const [ getClass, setClass ] = useGetSet( '-1' );
	
	const search = ( key, value ) => {
		if ( key === 'departId' ) {
			setDepart( value );
		}
		if ( key === 'licenseType' ) {
			setLicense( value );
		}
		if ( key === 'kmCode' ) {
			setKmCode( value );
		}
		// if ( key === 'classId' ) {
		// 	setClass( value );
		// }
		
		const params = {};
		if ( getDepart() !== '-1' ) params.departId = getDepart();
		if ( getLicense() !== '-1' ) params.licenseType = getLicense();
		if ( getKmCode() !== '-1' ) params.kmCode = getKmCode();
		// if ( getClass() !== '-1' ) params.classId = getClass();
		
		dispatch( {
			type: 'workbench/getExamPreview',
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
	} );
	
	const departDic = dictionary[ FIELDS.STUDENT.DEPART_ID_SCHOOL.dictionary ] || [];
	const licenseDic = dictionary[ FIELDS.STUDENT.LICENSE_TYPE_ACTIVE.dictionary ] ? dictionary[ FIELDS.STUDENT.LICENSE_TYPE_ACTIVE.dictionary ].filter(one => one.dictSwitch === 1) : [];
	const kmDic = dictionary[ FIELDS.STUDENT.KM.dictionary ] || [];
	
	const departValues = [ { dKey: '-1', dValue: '全部机构' }, ...departDic ];
	const licenseValues = [ { dKey: '-1', dValue: '全部申领类型' }, ...licenseDic ];
	const kmValues = [ ...kmDic ];
	
	const {
		book = 0,
		exam = 0,
		times = {
			'1': 0,
			'2': 0,
			'3': 0,
			'4': 0,
			'5': 0,
		},
		thisMonth = {
			'1': 0,
			'2': 0,
		},
		lastMonth = {
			'1': 0,
			'2': 0,
		},
		people = 0,
	} = getData();
	
	const plus5 = Object.keys( times ).filter( ( key, index ) => index >= 4 ).map( key => times[ key ] ).reduce( ( prev, next ) => {
		return prev + next;
	} );
	
	const searchLoading = loading.effects[ 'workbench/getExamPreview' ] || false;
	return (
		<Spin spinning={searchLoading}>
			<Card style={{ height, }}
			      title={<a onClick={() => router.push( '/student/exam/appointment' )}><Icon type="link"/> 考试情况</a>}
			      extra={
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
							      {getFieldDecorator( 'kmCode', {
								      initialValue: 'km1',
							      } )(
								      <Select className={style.w100} onChange={e => search( 'kmCode', e )}>
									      {
										      kmValues.map( v => {
											      return <Option value={v.dKey} key={v.dKey}>{v.dValue}</Option>
										      } )
									      }
								      </Select>
							      )}
						      </Form.Item>
					      </Col>
				      </Row>
			      }>
				<Row gutter={24}>
					<Col sm={12} className={style.col}>
						<Card>
							<Statistic
								title="本月约考"
								value={numeral( book ).format( '0,0' )}
								suffix="人次"
							/>
						</Card>
					</Col>
					<Col sm={12} className={style.col}>
						<Card>
							{
								numeral( exam ).format() * 1 === 0 ? <Statistic
									title="本月考试"
									value={'0'}
									suffix="人次"
								/> :
								<a onClick={
									() => router.push('/student/exam/score')
								}>
									<Statistic
										title="本月考试"
										value={numeral( exam ).format( '0,0' )}
										valueStyle={{ color: '#fc541b' }}
										suffix="人次"
									/>
								</a>
							}
						</Card>
					</Col>
					
					<Col sm={12} className={style.col}>
						<Card type="inner" title="本月考试人次" >
							<Meta 
								description={
									<div>
									第一次考试：{numeral( times[ '1' ] ).format() * 1 === 0 ? '0人次' : <a onClick={() => router.push('/student/exam/score')}>{`${numeral( times[ '1' ] ).format( '0,0' )}人次`}</a>}<br/>
									第二次考试：{numeral( times[ '2' ] ).format() * 1 === 0 ? '0人次' : <a onClick={() => router.push('/student/exam/score')}>{`${numeral( times[ '2' ] ).format( '0,0' )}人次`}</a>}<br/>
									第三次考试：{numeral( times[ '3' ] ).format() * 1 === 0 ? '0人次' : <a onClick={() => router.push('/student/exam/score')}>{`${numeral( times[ '3' ] ).format( '0,0' )}人次`}</a>}<br/>
									第四次考试：{numeral( times[ '4' ] ).format() * 1 === 0 ? '0人次' : <a onClick={() => router.push('/student/exam/score')}>{`${numeral( times[ '4' ] ).format( '0,0' )}人次`}</a>}<br/>
									第五次及以上考试：{numeral( plus5 ).format() * 1 === 0 ? '0人次' : <a onClick={() => router.push('/student/exam/score')}>{`${numeral( plus5 ).format( '0,0' )}人次`}</a>}
									</div>}
							/>
						</Card>
					</Col>
					<Col sm={12} className={style.col}>
						<Card type="inner" title="通过人次" style={{ height: 179, }}>
							<Meta
								description={
									<div>
									上月通过：{numeral( lastMonth[ '1' ] ).format() * 1 === 0 ? '0人次' : <a onClick={() => router.push('/student/exam/score')}>{`${numeral( lastMonth[ '1' ] ).format( '0,0' )}人次`}</a>}<br/>
									上月未通过：{numeral( lastMonth[ '2' ] ).format() * 1 === 0 ? '0人次' : <a onClick={() => router.push('/student/exam/score')}>{`${numeral( lastMonth[ '2' ] ).format( '0,0' )}人次`}</a>}<br/>
									本月通过：{numeral( thisMonth[ '1' ] ).format() * 1 === 0 ? '0人次' : <a onClick={() => router.push('/student/exam/score')}>{`${numeral( thisMonth[ '1' ] ).format( '0,0' )}人次`}</a>}<br/>
									{/* 2、缺考人数的，后台会给你返回key为1、2、3的，其中1为通过、2为未通过 3为缺考，前端相加一下未通过和缺考的数值 */}
									本月未通过：{(numeral( thisMonth[ '2' ] ).format() * 1 + numeral( thisMonth[ '3' ] ).format() * 1) === 0 ? '0人次' : <a onClick={() => router.push('/student/exam/score')}>{`${numeral( (numeral( thisMonth[ '2' ] ).format() * 1 + numeral( thisMonth[ '3' ] ).format() * 1) ).format( '0,0' )}人次`}</a>}
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
	}
) => (
	{
		dictionary,
		loading,
	}
) )( Form.create()( ExamPreview ) );
