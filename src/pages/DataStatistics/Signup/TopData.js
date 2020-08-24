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
	const searchLoading = loading.effects[ 'dataStatistics/getSignUpData' ] || false;

	const search = () => {
		dispatch( {
			type: 'dataStatistics/getSignUpData',
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
							title="报名总量"
							value={data.total}
						/>
					</Col>
					<Divider type="vertical" style={{height: 'auto'}}/>
					<Col>
						<Statistic
							title="本校报名总量"
							value={data.local_student_count}
						/>
					</Col>
					<Col>
						<Statistic
							title="挂靠报名总量"
							value={data.anchor_student_count}
						/>
					</Col>
					<Col>
						<Statistic
							title="代培报名总量"
							value={data.proxy_student_count}
						/>
					</Col>
					<Divider type="vertical" style={{height: 'auto'}}/>
					<Col>
						<Statistic
							title="本地人数"
							value={data.local_count}
						/>
					</Col>
					<Col>
						<Statistic
							title="外地人数"
							value={data.foreign_count}
						/>
					</Col>
					<Divider type="vertical" style={{height: 'auto'}}/>
					<Col>
						<Statistic
							title="已交费人数"
							value={data.pay_count}
						/>
					</Col>
					<Col>
						<Statistic
							title="待交费人数"
							value={data.wait_pay_count}
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