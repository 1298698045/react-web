import React, {useState} from 'react';
import { Row, Col, Card, Icon, Spin,Statistic, Divider } from 'antd';
import { connect } from 'dva';
import { useEffectOnce, useGetSet, } from 'react-use';
import { Line } from '@/components/Charts';
import router from 'umi/router';
import moment from 'moment';

const TopData = props => {
	const { dispatch, loading, } = props;
	const [ data, setData ] = useState( {
		km1: {},
		km2: {},
		km4: {},
		km3: {}
	} );
	const searchLoading = loading.effects[ 'dataStatistics/getFinanceData' ] || false;

	const search = () => {
		dispatch( {
			type: 'dataStatistics/getFinanceData',
		} ).then( data => {
			setData( data );
		} );
	};
	useEffectOnce( () => {
		search();
	} );
	return (
		<Spin spinning={searchLoading}>
			{/* <Card> */}
				<Row gutter={20}>
					<Col span="6">
						<Card><Statistic
							title="总收入"
							prefix="￥"
							precision={2} 
							value={data.incomeTotal}
						/></Card>
					</Col>
					<Col span="6">
						<Card><Statistic
								title="总支出"
								prefix="￥"
								precision={2} 
								value={data.outTotal}
							/></Card>
					</Col>
					<Col span="6">
						<Card><Statistic
								title="待收入"
								prefix="￥"
								precision={2} 
								value={data.waitTotal}
							/></Card>
					</Col>
					<Col span="6">
						<Card><Statistic
								title="待支出"
								prefix="￥"
								precision={2} 
								value={data.waitPayTotal}
							/></Card>
					</Col>
				</Row>
			{/* </Card> */}
		</Spin>
	);
};
export default connect( ( { loading, } ) => {
	return {
		loading,
	}
} )( TopData );