import React from 'react';
import { Card, Icon, Col, Row, Spin, Form, } from 'antd';
import router from 'umi/router';
import style from './index.less';
import { useEffectOnce, useGetSet } from 'react-use';
import numeral from 'numeral';
import { connect } from 'dva';

const { Meta } = Card;

const FinancePreview = ( { dispatch, loading, height, } ) => {
	
	const [ getData, setData ] = useGetSet( {} );
	
	useEffectOnce( () => {
		dispatch( {
			type: 'workbench/getFinancePreview',
		} ).then( data => {
			setData( data );
		} );
	} );
	
	const {
		income = 0, outlay = 0, unpaidStudent = 0, unpaidChangeClass = 0, unpaidResitFee = 0, unpaidBuyLesson = 0, unpaidAddKm = 0, unpaidOwedFee = 0, refund = {
			'0': 0,
			'1': 0,
			'3': 0
		}
	} = getData();
	
	const searchLoading = loading.effects[ 'workbench/getFinancePreview' ] || false;
	
	return (
		<Spin spinning={searchLoading}>
			<Card title={<a onClick={() => router.push( '/finance/charge/sign-up' )}><Icon type="link"/> 财务收支</a>}
			      style={{ height, }}>
				<Row gutter={24}>
					<Col xs={12} sm={8} md={12} className={style.col}>
						<Card type="inner" title="本月概况" style={{ height: 157, }}>
							<Meta
								description={
									<div>{`收入：${numeral( income ).format( '0,0' )}`}<br/>{`支出：${numeral( outlay * -1 ).format( '0,0' )}`}<br/>{`结余：${numeral( income - (outlay * -1) ).format( '0,0' )}`}
									</div>}
							/>
						</Card>
					</Col>
					<Col xs={12} sm={8} md={12} className={style.col}>
						<Card type="inner" title="待退费" style={{ height: 157, }}>
							<Meta
								description={
									<div>
										待提报：{numeral( refund[ '0' ] ).format() * 1 === 0 ? 0 : <a onClick={() => router.push( '/finance/refund/await' )}>{`${numeral( refund[ '0' ] ).format( '0,0' )}`}</a>}<br/>
										审核中：{numeral( refund[ '1' ] ).format() * 1 === 0 ? 0 : <a onClick={() => router.push( '/finance/refund/await' )}>{`${numeral( refund[ '1' ] ).format( '0,0' )}`}</a>}<br/>
										待支出：{numeral( refund[ '3' ] ).format() * 1 === 0 ? 0 : <a onClick={() => router.push( '/finance/refund/await' )}>{`${numeral( refund[ '3' ] ).format( '0,0' )}`}</a>}<br/>
									</div>}
							/>
						</Card>
					</Col>
					<Col xs={12} sm={8} md={12} className={style.col}>
						<Card type="inner" title="待收费">
							<Meta
								description={
									<div>
										报名费：{numeral( unpaidStudent ).format() * 1 === 0 ? 0 : <a onClick={() => router.push( '/finance/charge/sign-up' )}>{`${numeral( unpaidStudent ).format( '0,0' )}`}</a>}<br/>
										班型变更费：{numeral( unpaidChangeClass ).format() * 1 === 0 ? 0 : <a onClick={() => router.push( '/finance/charge/change-class' )}>{`${numeral( unpaidChangeClass ).format( '0,0' )}`}</a>}<br/>
										补考费：{numeral( unpaidResitFee ).format() * 1 === 0 ? 0 : <a onClick={() => router.push( '/finance/charge/supplementary-fee' )}>{`${numeral( unpaidResitFee ).format( '0,0' )}`}</a>}<br/>
										课时费：{numeral( unpaidBuyLesson ).format() * 1 === 0 ? 0 : <a onClick={() => router.push( '/finance/charge/class-fee' )}>{`${numeral( unpaidBuyLesson ).format( '0,0' )}`}</a>}<br/>
										添加科目费：{numeral( unpaidAddKm ).format() * 1 === 0 ? 0 : <a onClick={() => router.push( '/finance/charge/add-proxy-fee' )}>{`${numeral( unpaidAddKm ).format( '0,0' )}`}</a>}<br/>
										补交学费：{numeral( unpaidOwedFee ).format() * 1 === 0 ? 0 : <a onClick={() => router.push( '/finance/charge/make-up-tuition' )}>{`${numeral( unpaidOwedFee ).format( '0,0' )}`}</a>}<br/>
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
) )( Form.create()( FinancePreview ) );
