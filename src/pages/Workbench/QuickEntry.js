import React from 'react';
import { Card, Typography, Icon, Modal, List, Button, Row, Col, Switch, message, Empty, } from 'antd';
import { connect } from 'dva';
import style from './index.less';
import { useToggle, useLocalStorage, useUpdate, } from 'react-use';
import { hasPriv } from '@/utils/privilege';

const { Grid } = Card;
const { Text } = Typography;

const uid = 'v7';

const quickEntryData = [
	{
		icon: 'team',
		name: '学员管理',
		privs: 'student_manage',
		children: [
			{
				name: '本校报名',
				parent: '学员管理',
				status: false,
				link: '/student/sign-up',
				params: 'local',
				privs: 'student_enter',
			},
			{
				name: '代培报名',
				parent: '学员管理',
				status: false,
				link: '/student/sign-up',
				params: 'proxy',
				privs: 'student_enter',
			},
			{
				name: '挂靠报名',
				parent: '学员管理',
				status: false,
				link: '/student/sign-up',
				params: 'depend',
				privs: 'student_enter',
			},
			{
				name: '建档管理',
				parent: '学员管理',
				status: false,
				link: '/student/archive',
				params: '',
				privs: 'archivist_manage',
			},
			{
				name: '约课管理',
				parent: '学员管理',
				status: false,
				link: '/student/reserve-class',
				params: '',
				privs: 'order_course',
			},
			{
				name: '录入约考信息',
				parent: '学员管理',
				status: false,
				link: '/student/exam/appointment',
				params: 'record',
				privs: 'order_exam_manage',
			},
			{
				name: '导入约考信息',
				parent: '学员管理',
				status: false,
				link: '/student/exam/appointment',
				params: 'import',
				privs: 'order_exam_manage',
			},
			{
				name: '录入考试成绩',
				parent: '学员管理',
				status: false,
				link: '/student/exam/score',
				params: 'record',
				privs: 'grade_manage',
			},
			{
				name: '导入考试成绩表',
				parent: '学员管理',
				status: false,
				link: '/student/exam/score',
				params: 'import',
				privs: 'grade_manage',
			},
		],
	},
	{
		icon: 'snippets',
		name: '教务管理',
		link: '/teaching/coach',
		privs: 'edu_manage',
		children: [
			{
				name: '教练管理',
				parent: '教务管理',
				status: false,
				link: '/teaching/coach',
				params: '',
				privs: 'coach_manage',
			},
			{
				name: '课表管理',
				parent: '教务管理',
				status: false,
				link: '/teaching/course',
				params: '',
				privs: 'course_record_manage',
			},
		],
	},
	{
		icon: 'apartment',
		name: '校务管理',
		link: '/school/org',
		privs: 'school_manage',
		children: [
			{
				name: '新增员工',
				parent: '校务管理',
				status: false,
				link: '/school/org/org',
				params: 'addEmployee',
				privs: 'department_manage',
			},
			{
				name: '调休管理',
				parent: '校务管理',
				status: false,
				link: '/school/vacation',
				params: '',
				privs: 'vacation_manage',
			},
		],
	},
	{
		icon: 'account-book',
		name: '资产管理',
		link: '/asset/car',
		privs: 'asset_manage',
		children: [
			{
				name: '录入车辆信息',
				parent: '资产管理',
				status: false,
				link: '/asset/car',
				params: 'record',
				privs: 'car_manage',
			},
			{
				name: '导入车辆信息',
				parent: '资产管理',
				status: false,
				link: '/asset/car',
				params: 'import',
				privs: 'car_manage',
			},
		],
	},
	{
		icon: 'dollar',
		name: '财务管理',
		link: '/finance/charge',
		privs: 'finance_manage',
		children: [
			{
				name: '待收费管理',
				parent: '财务管理',
				status: false,
				link: '/finance/charge',
				params: '',
				privs: 'wait_pay_manage',
			},
			{
				name: '支出管理',
				parent: '财务管理',
				status: false,
				link: '/finance/expenditure',
				params: '',
				privs: 'expend_manage',
			},
			{
				name: '退费管理',
				parent: '财务管理',
				status: false,
				link: '/finance/refund',
				params: '',
				privs: 'return_fee_manage',
			},
			{
				name: '工资管理',
				parent: '财务管理',
				status: false,
				link: '/finance/wage',
				params: '',
				privs: 'salary_manage',
			},
		],
	},
	{
		icon: 'carry-out',
		name: '审核管理',
		link: '/review/refund',
		privs: 'examine_manage',
		children: [
			{
				name: '退费审核',
				parent: '审核管理',
				status: false,
				link: '/review/refund',
				params: '',
				privs: 'return_fee_examine',
			},
		],
	},
];

const EditModal = ( { visible, setVisible, value, switchStatus } ) => {
	const arr = quickEntryData.filter( r => hasPriv( [ r.privs ] ) );
	
	return (
		<Modal
			title="编辑快捷入口"
			destroyOnClose
			visible={visible}
			closable={true}
			maskClosable={false}
			keyboard={false}
			footer={
				<Button
					icon="close-circle"
					htmlType="button"
					onClick={() => {
						setVisible( false );
					}}>关闭</Button>
			}
			onCancel={() => setVisible( false )}
		>
			<Row gutter={24}>
				{
					arr.length > 0
						?
						arr.map( q => {
							const { name, icon, link, children = [] } = q;
							
							const hasP = children.filter( r => hasPriv( [ r.privs ] ) );
							
							return (
								<Col key={name} xs={24} style={{ marginBottom: 24, }}>
									<List
										header={<Text strong>
											<Icon type={icon}/> {name}
										</Text>}
										bordered
										dataSource={hasP}
										renderItem={item => {
											const { name } = item;
											return (
												<List.Item actions={[ <Switch checked={value[ name ].status}
												                              onChange={e => {switchStatus( name, e )}}/> ]}>{name}</List.Item>
											)
										}}
									/>
								</Col>
							)
						} )
						:
						<Empty style={{ margin: '10px 0' }} image={Empty.PRESENTED_IMAGE_SIMPLE}/>
				}
			</Row>
		</Modal>
	);
};

let initialLocalStorageData = {};
quickEntryData.forEach( q => {
	const { children } = q;
	if ( children && children.length > 0 ) {
		children.forEach( ( { name, parent, status, privs, } ) => {
			initialLocalStorageData[ name ] = {
				status,
				parent,
				name,
				privs,
			};
		} );
	}
} );

const QuickEntry = ( { dispatch, height, } ) => {
	const update = useUpdate();
	const [ modalVisible, setModalVisible ] = useToggle( false );
	const [ value, setValue ] = useLocalStorage( 'workbench', {} );
	
	const linkTo = item => {
		if ( item.link ) {
			dispatch( {
				type: 'quickEntryParams/linkTo',
				payload: {
					url: item.link,
					params: item.params,
				}
			} );
		}
	};
	
	if ( !value[ uid ] ) {
		setValue( Object.assign( {}, { ...value, }, { [ uid ]: initialLocalStorageData } ) );
	}
	
	const valueData = value[ uid ] || initialLocalStorageData;
	
	const switchStatus = ( name, status ) => {
		
		const l = Object.keys( valueData ).filter( o => valueData[ o ].status === true );
		
		if ( l.length >= 6 && status ) {
			message.info( '快捷入口最多为6个！' );
			return false;
		}
		
		valueData[ name ].status = status;
		setValue( Object.assign( {}, { ...value, }, { [ uid ]: valueData } ) );
		update();
	};
	
	let arr = [];
	
	if ( value[ uid ] ) {
		arr = Object.keys( value[ uid ] ).filter( val => {
			return value[ uid ][ val ].status === true && hasPriv( [ value[ uid ][ val ].privs ] );
		} );
	}
	
	return (
		<>
			<Card title="快捷入口" style={{ height, }} extra={<a onClick={() => setModalVisible( true )}>编辑</a>}>
				{
					arr.length > 0
						?
						arr.map( sub => {
							const { children } = quickEntryData.find( ( { name } ) => {
								return name === value[ uid ][ sub ].parent;
							} );
							const c = children.find( ( { name } ) => name === sub );
							return (
								<Grid key={c.name} className={style.quickEntry} onClick={() => linkTo( c )}>
									<Text strong>
										<a>
											{c.icon && <Icon type={c.icon}/>} {c.name}
										</a>
									</Text>
								</Grid>
							)
						} )
						:
						<Empty style={{ margin: '10px 0' }} image={Empty.PRESENTED_IMAGE_SIMPLE}/>
				}
			</Card>
			<EditModal
				value={value[ uid ]}
				visible={modalVisible}
				setVisible={setModalVisible}
				switchStatus={switchStatus}
			/>
		</>
	);
};

export default connect( ( { quickEntryParams } ) => ({ quickEntryParams }) )( QuickEntry );
