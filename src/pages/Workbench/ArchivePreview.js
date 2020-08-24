import React from 'react';
import { Card, Col, Row, Form, Select, Icon, Spin, Statistic, } from 'antd';
import style from './index.less';
import FIELDS from '@/config/fields';
import { connect } from 'dva';
import { useEffectOnce, useGetSet } from 'react-use';
import { queryDictionary, } from '@/utils/dictionaryUtil';
import router from 'umi/router';
import numeral from 'numeral';

const { Meta } = Card;
const { Option } = Select;

const ArchivePreview = ( { form, dispatch, dictionary, loading, height, } ) => {
	const { getFieldDecorator } = form;
	
	const [ getData, setData ] = useGetSet( {} );
	
	const [ getDepart, setDepart ] = useGetSet( '-1' );
	const [ getLicense, setLicense ] = useGetSet( '-1' );
	
	useEffectOnce( () => {
		queryDictionary( dispatch, FIELDS.STUDENT.DEPART_ID_SCHOOL.dictionary );
	} );
	
	const departDic = dictionary[ FIELDS.STUDENT.DEPART_ID_SCHOOL.dictionary ] || [];
	const licenseDic = dictionary[ FIELDS.STUDENT.LICENSE_TYPE_ACTIVE.dictionary ] ? dictionary[ FIELDS.STUDENT.LICENSE_TYPE_ACTIVE.dictionary ].filter(one => one.dictSwitch === 1) : [];
	const departValues = [ { dKey: '-1', dValue: '全部机构' }, ...departDic ];
	const licenseValues = [ { dKey: '-1', dValue: '全部申领类型' }, ...licenseDic ];
	
	const search = ( key, value ) => {
		if ( key === 'departId' ) {
			setDepart( value );
		}
		
		if ( key === 'licenseType' ) {
			setLicense( value );
		}
		
		const params = {};
		if ( getDepart() !== '-1' ) params.departId = getDepart();
		if ( getLicense() !== '-1' ) params.licenseType = getLicense();
		
		dispatch( {
			type: 'workbench/getArchivePreview',
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
	
	const {
		lastMonthFinish,
		lastMonthStop,
		thisMonthFinish,
		thisMonthStop,
		holdDocument = {
			'7': 0,
			'15': 0,
			'15+': 0,
			'total': 0,
		},
		undocumented = {
			'3': 0,
			'7': 0,
			'7+': 0,
			'total': 0,
		},
	} = getData();
	
	const searchLoading = loading.effects[ 'workbench/getArchivePreview' ] || false;
	const linkTo = () => {
		// 机构、申领类型
		dispatch( {
			type: 'quickEntryParams/linkTo',
			payload: {
				url: '/student/archive',
				params: {
					departId: getDepart() === '-1'  ? undefined : getDepart(),
					licenseType: getLicense() === '-1'  ? undefined : getLicense(),
				},
			}
		} );
	};   
	return (
		<Spin spinning={searchLoading}>
			<Card style={{ height, }}
			      title={<a onClick={() => router.push( '/student/archive' )}><Icon type="link"/> 建档概况</a>} extra={
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
				</Row>
				
			}>
				<Meta
					style={{ marginBottom: 24 }}
					description={
						<Row gutter={24}>
							<Col sm={12}>
								<Card>
									<Row type="flex" justify="space-around">
										<Col>
											<Statistic
												title="上月完成"
												value={numeral( lastMonthFinish ).format( '0,0' )}
												suffix="人"
											/>
										</Col>
										<Col>
											<Statistic
												title="上月终止"
												value={numeral( lastMonthStop ).format( '0,0' )}
												suffix="人"
											/>
										</Col>
									</Row>
								</Card>
							</Col>
							<Col sm={12}>
								<Card>
									<Row type="flex" justify="space-around">
										<Col>
											<Statistic
												title="本月完成"
												value={numeral( thisMonthFinish ).format( '0,0' )}
												suffix="人"
											/>
										</Col>
										<Col>
											<Statistic
												title="本月终止"
												value={numeral( thisMonthStop ).format( '0,0' )}
												suffix="人"
											/>
										</Col>
									</Row>
								</Card>
							</Col>
						</Row>
					}
				/>
				<Row gutter={24}>
					<Col sm={12} className={style.col}>
						<Card type="inner" title="待建档" extra={`${numeral( undocumented.total ).format( '0,0' )}人`}>
							<Meta
								description={
								<div>
									3天以内：{numeral(undocumented[ '3' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo()}>{`${numeral( undocumented[ '3' ] ).format( '0,0' )}人`}</a>}<br/>
									3-7天：{numeral(undocumented[ '7' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo()}>{`${numeral( undocumented[ '7' ] ).format( '0,0' )}人`}</a>}<br/>
									7天以上：{numeral(undocumented[ '7+' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo()}>{`${numeral( undocumented[ '7+' ] ).format( '0,0' )}人`}</a>}
								</div>}
							/>
						</Card>
					</Col>
					<Col sm={12} className={style.col}>
						<Card type="inner" title="暂缓建档" extra={`${numeral( holdDocument.total ).format( '0,0' )}人`}>
							<Meta
								description={
								<div>
									7天以内：{numeral(holdDocument[ '7' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo()}>{`${numeral( holdDocument[ '7' ] ).format( '0,0' )}人`}</a>}<br/>
									7-15天：{numeral(holdDocument[ '15' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo()}>{`${numeral( holdDocument[ '15' ] ).format( '0,0' )}人`}</a>}<br/>
									15天以上：{numeral(holdDocument[ '15+' ]).format() * 1 === 0 ? '0人' : <a onClick={() => linkTo()}>{`${numeral( holdDocument[ '15+' ] ).format( '0,0' )}人`}</a>}
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
) )( Form.create()( ArchivePreview ) );
