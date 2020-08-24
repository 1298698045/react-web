import React from 'react';
import { Card, Icon, Spin, } from 'antd';
import { connect } from 'dva';

import { useEffectOnce, useGetSet, } from 'react-use';
import { Line } from '@/components/Charts';
import router from 'umi/router';
import moment from 'moment';

const ReserveChart = props => {
	const { dispatch, loading, } = props;
	const [ getData, setData ] = useGetSet( {} );
	
	const search = () => {
		dispatch( {
			type: 'workbench/getBookChart',
		} ).then( data => {
			setData( data );
		} );
	};
	
	useEffectOnce( () => {
		search();
	} );
	
	// const now = moment().format( 'YYYY-MM-DD' );
	// const arr = [];
	// const length = 10;
	// for ( let i = 0; i < length; i++ ) {
	// 	arr.push( moment().add( i, 'days' ).format( 'YYYY-MM-DD' ) );
	// }
	//
	// console.log( arr );
	
	
	const data = getData();
	
	const chartData = [];
	
	if ( data.km2 ) {
		Object.keys( data.km2 ).forEach( date => chartData.push( {
			name: '科目二',
			x: date,
			y: data.km2[ date ],
		} ) );
	}
	
	if ( data.km3 ) {
		Object.keys( data.km3 ).forEach( date => chartData.push( {
			name: '科目三',
			x: date,
			y: data.km3[ date ],
		} ) );
	}
	
	const searchLoading = loading.effects[ 'workbench/getBookChart' ] || false;
	
	return (
		<Spin spinning={searchLoading}>
			<Card
				style={{ height: 444 }}
				title={<a onClick={() => router.push( '/student/reserve-class' )}><Icon type="link"/> 约课情况</a>}
				bodyStyle={{ padding: 24 }}
			>
				<Line
					padding={[ 40, 50, 80, 50 ]}
					height={350}
					data={chartData}
					legend
					label
				/>
			</Card>
		</Spin>
	);
};

export default connect( ( { loading, } ) => {
	return {
		loading,
	}
} )( ReserveChart );
