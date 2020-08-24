import React from 'react';
import { Card, Col, Form, Icon, Select, Row, Spin, Radio, Statistic, } from 'antd';
import { connect } from 'dva';

import { useEffectOnce, useGetSet } from 'react-use';
import { Bar } from '@/components/Charts';
import router from 'umi/router';
import style from '@/pages/Workbench/index.less';
import FIELDS from '@/config/fields';
import moment from 'moment';
import numeral from 'numeral';

const { Option } = Select;

// const yesterday = moment().subtract( 2, 'days' ).format( 'YYYY-MM-DD' );
const yesterday = moment().subtract( 1, 'days' ).format( 'YYYY-MM-DD' );
// const today = moment().subtract( 1, 'days' ).format( 'YYYY-MM-DD' );
const today = moment().format( 'YYYY-MM-DD' );
const beforeSevenDays = moment().subtract( 6, 'days' ).format( 'YYYY-MM-DD' );

const SignUpChart = props => {
	const { dispatch, loading, dictionary, height, } = props;
	const [ getData, setData ] = useGetSet( {} );
	const [ getDepart, setDepart ] = useGetSet( '-1' );
	const [ getLicense, setLicense ] = useGetSet( '-1' );
	const [ getClass, setClass ] = useGetSet( '-1' );
	const [ getDate, setDate ] = useGetSet( 'today' );
	const [ getStatus, setStatus ] = useGetSet( '-1' );
	
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
		if ( key === 'date' ) {
			setDate( value.target.value );
		}
		if ( key === 'paid' ) {
			setStatus( value.target.value );
		}
		
		const params = {};
		if ( getDepart() !== '-1' ) params.departId = getDepart();
		if ( getLicense() !== '-1' ) params.licenseType = getLicense();
		if ( getClass() !== '-1' ) params.classId = getClass();
		if ( getStatus() !== '-1' ) params.paid = getStatus();
		
		if ( getDate() === 'today' ) {
			params.createDate = today;
		} else if ( getDate() === 'yesterday' ) {
			params.createDate = yesterday;
		} else {
			params.startDate = beforeSevenDays;
			// params.endDate = today;
		}
		
		dispatch( {
			type: 'workbench/getSignUpChart',
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
	const licenseDic = dictionary[ FIELDS.STUDENT.LICENSE_TYPE_ACTIVE.dictionary ] ? dictionary[ FIELDS.STUDENT.LICENSE_TYPE_ACTIVE.dictionary ].filter(one => one.dictSwitch === 1) : [];
	const classDic = dictionary[ FIELDS.STUDENT.CLASS_ID.dictionary ] || [];
	
	const departValues = [ { dKey: '-1', dValue: '全部机构' }, ...departDic ];
	const licenseValues = [ { dKey: '-1', dValue: '全部申领类型' }, ...licenseDic ];
	const classValues = [ { dKey: '-1', dValue: '全部班型' }, ...classDic ];
	
	const {
		studentType = {
			'1': 0,
			'3': 0,
			'4': 0,
			total: 0,
		}, thisMonth = 0, lastMonth = 0, unpaid = 0, goal = 0,
	} = getData();
	
	const chartData = [ {
		x: '本校',
		y: studentType[ '1' ],
	}, {
		x: '代培',
		y: studentType[ '3' ],
	}, {
		x: '挂靠',
		y: studentType[ '4' ],
	} ];
	
	const searchLoading = loading.effects[ 'workbench/getSignUpChart' ] || false;
	const linkTo = (link) => {
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
					},
				}
			} );
		}
	};
	return (
		<Spin spinning={searchLoading}>
			<Card
				title={<a onClick={() => router.push( '/student/sign-up' )}><Icon type="link"/> 招生报名</a>}
				bodyStyle={{ padding: 24 }}
				style={{ height, }}
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
				}
			>
				<Row gutter={24}>
					<Col sm={24}>
						<Card>
							<Row type="flex" justify="space-around">
								<Col>
									<Statistic
										title="上月完成"
										value={numeral( lastMonth ).format( '0,0' )}
										suffix="人"
									/>
								</Col>
								<Col>
									<Statistic
										title="本月完成"
										value={numeral( thisMonth ).format( '0,0' )}
										suffix="人"
									/>
								</Col>
								<Col>
									<Statistic
										title="本月目标"
										value={numeral( goal ).format( '0,0' )}
										suffix="人"
									/>
								</Col>
								<Col>
									{
										numeral( unpaid ).format() * 1 === 0 ? <Statistic
											title="当前待交费"
											value={'0'}
											suffix="人"
										/>  :
										<a onClick={
											() => linkTo('/finance/charge/sign-up')
										}>
											<Statistic
		 										title="当前待交费"
												value={numeral( unpaid ).format( '0,0' )}
												valueStyle={{ color: '#fc541b' }}
												suffix="人"
											/>
										</a>
									}
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
				<Row>
					<Col sm={24}>
						<Form>
							<Row type="flex" justify="space-around">
								<Col>
									<Form.Item className={style.formItem} label="时间范围"
									           style={{ width: '100%', marginBottom: 24 }}>
										<Radio.Group value={getDate()} onChange={e => search( 'date', e )}>
											<Radio.Button value="yesterday">昨天</Radio.Button>
											<Radio.Button value="today">今天</Radio.Button>
											<Radio.Button value="beforeSevenDays">7天内</Radio.Button>
										</Radio.Group>
									</Form.Item>
								</Col>
								<Col>
									<Form.Item className={style.formItem} label="交费状态"
									           style={{ width: '100%', marginBottom: 24 }}>
										<Radio.Group value={getStatus()} onChange={e => search( 'paid', e )}>
											<Radio.Button value="-1">全部</Radio.Button>
											<Radio.Button value="0">未交费</Radio.Button>
											<Radio.Button value="1">已交费</Radio.Button>
										</Radio.Group>
									</Form.Item>
								</Col>
							</Row>
						</Form>
					</Col>
				</Row>
				<Bar
					height={150}
					data={chartData}
				/>
			</Card>
		</Spin>
	);
};

export default connect( ( { dictionary, loading,quickEntryParams } ) => {
	return {
		dictionary,
		loading,
		quickEntryParams
	}
} )( SignUpChart );
