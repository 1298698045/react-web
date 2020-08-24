import React from 'react';
import { Card, List, Badge, } from 'antd';
import router from 'umi/router';
import { useEffectOnce, useGetSet } from 'react-use';
import { connect } from 'dva';
import { hasPriv } from '@/utils/privilege';

const Item = ( { dispatch, data, index, setCount, getCount, } ) => {
	useEffectOnce( () => {
		switch ( data[ index ].name ) {
			case '财务待收费事项': {
				dispatch( {
					type: 'workbench/getFinancePreview',
				} ).then( data => {
					const {
						unpaidAddKm = 0,
						unpaidBuyLesson = 0,
						unpaidChangeClass = 0,
						unpaidOwedFee = 0,
						unpaidResitFee = 0,
						unpaidStudent = 0,
					} = data;
					
					const count = unpaidAddKm + unpaidBuyLesson + unpaidChangeClass + unpaidOwedFee + unpaidResitFee + unpaidStudent;
					setCount( {
						...getCount(),
						'财务待收费事项': count,
					} );
				} );
				break;
			}
			case '待建档事项': {
				dispatch( {
					type: 'workbench/getArchivePreview',
				} ).then( data => {
					const { undocumented = { total: 0, } } = data;
					const { total = 0 } = undocumented;
					
					setCount( {
						...getCount(),
						'待建档事项': total,
					} );
				} );
				break;
			}
			case '学员未签到待处理事项': {
				dispatch( {
					type: 'workbench/getTodoList',
				} ).then( data => {
					const { unSignCourse = 0 } = data;
					// setCount( unSignCourse );
					setCount( {
						...getCount(),
						'学员未签到待处理事项': unSignCourse,
					} );
				} );
				break;
			}
			case '教练未确认待处理事项': {
				dispatch( {
					type: 'workbench/getTodoList',
				} ).then( data => {
					const { unConfirmCourse = 0 } = data;
					setCount( {
						...getCount(),
						'教练未确认待处理事项': unConfirmCourse,
					} );
				} );
				break;
			}
			case '退费待提报事项': {
				dispatch( {
					type: 'workbench/getFinancePreview',
				} ).then( data => {
					const {
						refund = { '0': 0 },
					} = data;
					
					const count = refund[ '0' ] || 0;
					setCount( {
						...getCount(),
						'退费待提报事项': count,
					} );
				} );
				break;
			}
			case '退费待审核事项': {
				dispatch( {
					type: 'workbench/getFinancePreview',
				} ).then( data => {
					const {
						refund = { '1': 0 },
					} = data;
					
					const count = refund[ '1' ] || 0;
					setCount( {
						...getCount(),
						'退费待审核事项': count,
					} );
				} );
				break;
			}
			case '退费待支出事项': {
				dispatch( {
					type: 'workbench/getFinancePreview',
				} ).then( data => {
					const {
						refund = { '3': 0 },
					} = data;
					
					const count = refund[ '3' ] || 0;
					setCount( {
						...getCount(),
						'退费待支出事项': count,
					} );
				} );
				break;
			}
			case '校务调休待审批事项': {
				dispatch( {
					type: 'workbench/getTodoList',
				} ).then( data => {
					const {
						unProcessVacation = 0,
					} = data;
					
					setCount( {
						...getCount(),
						'校务调休待审批事项': unProcessVacation,
					} );
				} );
				break;
			}
		}
	} );
	return (
		<List.Item style={{ padding: '6px 0' }}>
			<a onClick={() => router.push( data[ index ].link )}>{`${index + 1}、${data[ index ].name} (${getCount()[ data[ index ].name ] || 0})`}</a>
		</List.Item>
	)
};

const TodoList = ( { dispatch, height } ) => {
	const data = [
		{
			name: '财务待收费事项',
			link: '/finance/charge/sign-up',
			priv: 'wait_pay_manage',
		},
		{
			name: '待建档事项',
			link: '/student/archive',
			priv: 'archivist_manage',
		},
		{
			name: '学员未签到待处理事项',
			link: '/student/reserve-class/log',
			priv: 'order_course_record',
		},
		{
			name: '教练未确认待处理事项',
			link: '/student/reserve-class/log',
			priv: 'order_course_record',
		},
		{
			name: '退费待提报事项',
			link: '/finance/refund/await',
			priv: 'return_fee_manage',
		},
		{
			name: '退费待审核事项',
			link: '/review/refund/await',
			priv: 'return_fee_examine',
		},
		{
			name: '退费待支出事项',
			link: '/finance/refund/await',
			priv: 'return_fee_manage',
		},
		{
			name: '校务调休待审批事项',
			link: '/school/vacation',
			priv: 'vacation_manage',
		},
	];
	const [ getCount, setCount ] = useGetSet( {} );
	
	const d = data.filter( r => hasPriv( [ r.priv ] ) );
	
	let total = 0;
	
	Object.keys( d ).forEach( o => {
		total += getCount()[ d[ o ].name ] || 0;
	} );
	
	return (
		<Card title={
			<Badge dot={total > 0}>
				<span>待办事项</span>
			</Badge>
		} style={{ height, }} bodyStyle={{ height: 138 }}>
			<List style={{ overflow: 'auto', height: '100%' }}>
				{d.map( ( d, index ) => {
					return <Item setCount={setCount} getCount={getCount} key={d.name} dispatch={dispatch} index={index}
					             data={data}/>
				} )}
			</List>
		</Card>
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
) )( TodoList );
