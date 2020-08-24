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
	const searchLoading = loading.effects[ 'dataStatistics/getScoreData' ] || false;

	const search = () => {
		dispatch( {
			type: 'dataStatistics/getScoreData',
		} ).then( data => {
			setData( data );
		} );
	};
	useEffectOnce( () => {
		search();
	} );
	return (
		<Spin spinning={searchLoading}>
			<Row gutter={10}>
				<Col span={6}>
					<Card title="科目一">
						<Row type="flex" justify="space-around">
							<Col>
								<Statistic
									title="总次数"
									value={data.km1.total}
								/>
							</Col>
							<Col>
								<Statistic
									title="通过"
									value={data.km1.passedCount}
								/>
							</Col>
							<Col>
								<Statistic
									title="未通过"
									value={data.km1.unPassedCount}
								/>
							</Col>
							<Col>
								<Statistic
									title="缺考"
									value={data.km1.missedExamCount}
								/>
							</Col>
						</Row>
					</Card>
				</Col>
				<Col span={6}>
					<Card title="科目二">
						<Row type="flex" justify="space-around">
							<Col>
								<Statistic
									title="总次数"
									value={data.km2.total}
								/>
							</Col>
							<Col>
								<Statistic
									title="通过"
									value={data.km2.passedCount}
								/>
							</Col>
							<Col>
								<Statistic
									title="未通过"
									value={data.km2.unPassedCount}
								/>
							</Col>
							<Col>
								<Statistic
									title="缺考"
									value={data.km2.missedExamCount}
								/>
							</Col>
						</Row>
					</Card>
				</Col>
				<Col span={6}>
					<Card title="科目三">
						<Row type="flex" justify="space-around">
							<Col>
								<Statistic
									title="总次数"
									value={data.km3.total}
								/>
							</Col>
							<Col>
								<Statistic
									title="通过"
									value={data.km3.passedCount}
								/>
							</Col>
							<Col>
								<Statistic
									title="未通过"
									value={data.km3.unPassedCount}
								/>
							</Col>
							<Col>
								<Statistic
									title="缺考"
									value={data.km3.missedExamCount}
								/>
							</Col>
						</Row>
					</Card>
				</Col>
				<Col span={6}>
					<Card title="科目四">
						<Row type="flex" justify="space-around">
							<Col>
								<Statistic
									title="总次数"
									value={data.km4.total}
								/>
							</Col>
							<Col>
								<Statistic
									title="通过"
									value={data.km4.passedCount}
								/>
							</Col>
							<Col>
								<Statistic
									title="未通过"
									value={data.km4.unPassedCount}
								/>
							</Col>
							<Col>
								<Statistic
									title="缺考"
									value={data.km4.missedExamCount}
								/>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>	
		</Spin>
	);
};
export default connect( ( { loading, } ) => {
	return {
		loading,
	}
} )( TopData );