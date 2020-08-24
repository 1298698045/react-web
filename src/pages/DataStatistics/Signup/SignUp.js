import React,  {useState, useEffect} from 'react';
import { Row, Col, Card, Divider, Tabs, Tag  } from 'antd';
import { useEffectOnce, useGetSet, } from 'react-use';
import { connect } from 'dva';
import TopData from './TopData';
import SearchForm from './SearchForm';
import Introducer from './Introducer';
import Department from './Department';
import LicenseType from './LicenseType';
import Class from './Class';
import StudentType from './StudentType';
const { TabPane } = Tabs;
import Privilege from '@/components/Privilege';
import Search from 'antd/lib/input/Search';
import moment from 'moment';
import { getTimeDistance } from '@/utils/utils';
import { queryDictionary } from '@/utils/dictionaryUtil';
import style from "@/pages/DataStatistics/style.less";
import { hasPriv } from '@/utils/privilege';

const SignUp = props => {
	const { dispatch, dictionary } = props;
	const [tab, setTab] = useState('1')
	const [tabData, setTabData] = useState('0')
	useEffect( () => {
		queryDictionary( dispatch, 'introducer_id' );
		queryDictionary( dispatch, 'employee_id' );
	}, [] );
	
	const [params, setParams] = useState({
		startDate: moment(getTimeDistance('today')[0]).format( 'YYYY-MM-DD'),
		endDate: moment(getTimeDistance('today')[1]).format( 'YYYY-MM-DD'),
		includeWaitPay: '0',
		includeLeaveSchool: '0'
	})
	useEffectOnce( () => {
		getTabData(tab , params);
	} );
	const onSearch = (params) => {
		setParams(params)
		getTabData(tab, params)
	}
	const onTab = (key) => {
		setTab(key)
		getTabData(key, params)
	}
	const getTabData = (key, sParams) => {
		dispatch( {
			type: 'dataStatistics/getSignUpTotal',
			payload:{
				params: {
					...sParams,
					tabType: key + ''
				}
			}
		} ).then( res => {
			setTabData( res.total );
		} );
	}
	return <div>
		<TopData />
		<Card style={{marginTop: '15px'}}>
			<SearchForm
				dictionary={dictionary}
				onSearch={onSearch}
				tab={tab}
			/>
 			<Divider dashed />
			<Tabs defaultActiveKey="1" onChange={onTab} 
			tabBarExtraContent={<Tag color="orange">报名量：{tabData ? tabData : 0}</Tag>} 
			className={style.tableName}>
				{hasPriv('introducer_apply_report') && <TabPane tab="按介绍人统计" key="1" >
					<Introducer
						params={params}
						tab={tab}
						dictionary={dictionary}
					/>
				</TabPane>}
				{hasPriv('depart_apply_report') && <TabPane tab="按教学机构统计" key="2">
					<Department
						params={params}
						tab={tab}
					/>
				</TabPane>}
				{hasPriv('license_type_apply_report') && <TabPane tab="按申领类型统计" key="3">
					<LicenseType
						params={params}
						tab={tab}
					/>
				</TabPane>}
				{hasPriv('class_apply_report') && <TabPane tab="按报名班型统计" key="4">
					<Class
						params={params}
						tab={tab}
					/>
				</TabPane>}
				{hasPriv('student_type_apply_report') && <TabPane tab="按学员类型统计" key="5">
					<StudentType
						params={params}
						tab={tab}
					/>
				</TabPane>}
			</Tabs>
		</Card>
	</div>
};

export default connect( ( { dictionary } ) => ({ dictionary }) )( SignUp );
