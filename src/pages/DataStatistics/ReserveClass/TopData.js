import React, {useState} from 'react';
import { Row, Col, Card, Icon, Spin,Statistic, Divider } from 'antd';
import { connect } from 'dva';
import { useEffectOnce, useGetSet, } from 'react-use';
import { Line } from '@/components/Charts';
import router from 'umi/router';
import moment from 'moment';

const TopData = props => {
	const { dispatch, loading, } = props;
	const [ data, setData ] = useState( {} );
	const searchLoading = loading.effects[ 'dataStatistics/getReserveClassData' ] || false;

	const search = () => {
		dispatch( {
			type: 'dataStatistics/getReserveClassData',
		} ).then( data => {
			setData( data );
		} );
	};
	useEffectOnce( () => {
		search();
	} );
	return (
		<Spin spinning={searchLoading}>
			<Card>
				<Row type="flex" justify="space-around">
					<Col>
						<Statistic
							title="约课总量（人次）"
							value={data.total}
						/>
					</Col>
					<Divider type="vertical" style={{height: 'auto'}}/>
					<Col>
						<Statistic
							title="科二已完成"
							value={data.km2ComplateCount}
						/>
					</Col>
					<Col>
						<Statistic
							title="科二待签到"
							value={data.km2WaitSignCount}
						/>
					</Col>
					<Col>
						<Statistic
							title="科二待确认"
							value={data.km2WaitConfirmCount}
						/>
					</Col>
					<Divider type="vertical" style={{height: 'auto'}}/>
					<Col>
						<Statistic
							title="科三已完成"
							value={data.km3ComplateCount}
						/>
					</Col>
					<Col>
						<Statistic
							title="科三待签到"
							value={data.km3WaitSignCount}
						/>
					</Col>
					<Col>
						<Statistic
							title="科三待确认"
							value={data.km3WaitConfirmCount}
						/>
					</Col>
					<Divider type="vertical" style={{height: 'auto'}}/>
					<Col>
						<Statistic
							title="已取消"
							value={data.cancelCount}
						/>
					</Col>
				</Row>
			</Card>
		</Spin>
	);
};
export default connect( ( { loading, } ) => {
	return {
		loading,
	}
} )( TopData );