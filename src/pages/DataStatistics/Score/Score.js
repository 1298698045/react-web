import React,  {useState, useEffect} from 'react';
import { useEffectOnce, useGetSet, } from 'react-use';
import { Row, Col, Card, Divider, Tabs, Tag  } from 'antd';
import { connect } from 'dva';
import TopData from './TopData';
import SearchForm from './SearchForm';
import Coach from './Coach';
import Department from './Department';
import LicenseType from './LicenseType';
import Class from './Class';
import StudentType from './StudentType';
import ScoreSection from './ScoreSection';
import Site from './Site';
const { TabPane } = Tabs;
import Privilege from '@/components/Privilege';
import Search from 'antd/lib/input/Search';
import moment from 'moment';
import { getTimeDistance } from '@/utils/utils';
import { queryDictionary } from '@/utils/dictionaryUtil';
import style from "@/pages/DataStatistics/style.less";
import { hasPriv } from '@/utils/privilege';

const Score = props => {
	const { dispatch, dictionary } = props;
	const [tab, setTab] = useState('1')
	const [tabData, setTabData] = useState('0')
	const [params, setParams] = useState({
		startDate: moment(getTimeDistance('today')[0]).format( 'YYYY-MM-DD'),
		endDate: moment(getTimeDistance('today')[1]).format( 'YYYY-MM-DD')
	})
	
	useEffect( () => {
		queryDictionary( dispatch, 'introducer_id' );
		queryDictionary( dispatch, 'employee_id' );
	}, [] );
	useEffectOnce( () => {
		getTabData(tab, params);
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
			type: 'dataStatistics/getScoreTotal',
			payload:{
				params: {
					...sParams,
					tabType: key + ''
				}
			}
		} ).then( res => {
			setTabData( res );
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
			tabBarExtraContent={tab !== '7' ?[
			<Tag color="orange" key="k1">科一：{`${tabData.km1PassedCount ? tabData.km1PassedCount : 0}/${tabData.km1Total ? tabData.km1Total : 0}`}</Tag>,
			<Tag color="orange" key="k2">科二：{`${tabData.km2PassedCount ? tabData.km2PassedCount : 0}/${tabData.km2Total ? tabData.km2Total : 0}`}</Tag>,
			<Tag color="orange" key="k3">科三：{`${tabData.km3PassedCount ? tabData.km3PassedCount : 0}/${tabData.km3Total ? tabData.km3Total : 0}`}</Tag>,
			<Tag color="orange" key="k4">科四：{`${tabData.km4PassedCount ? tabData.km4PassedCount : 0}/${tabData.km4Total ? tabData.km4Total : 0}`}</Tag>,
		] : ''} 
			className={style.tableName}>
				{hasPriv('depart_score_report') && <TabPane tab="按教学机构统计" key="1">
					<Department
						params={params}
						tab={tab}
					/>
				</TabPane>}
				{hasPriv('license_type_score_report') && <TabPane tab="按申领类型统计" key="2">
					<LicenseType
						params={params}
						tab={tab}
					/>
				</TabPane>}
				{hasPriv('class_score_report') && <TabPane tab="按班型统计" key="3">
					<Class
						params={params}
						tab={tab}
					/>
				</TabPane>}
				{hasPriv('student_type_score_report') && <TabPane tab="按学员类型统计" key="4">
					<StudentType
						params={params}
						tab={tab}
					/>
				</TabPane>}
				{hasPriv('site_score_report') && <TabPane tab="按训练场地统计" key="5">
					<Site
						params={params}
						tab={tab}
					/>
				</TabPane>}
				{hasPriv('coach_score_report') && <TabPane tab="按教练员统计" key="6" >
					<Coach
						params={params}
						tab={tab}
						dictionary={dictionary}
					/>
				</TabPane>}
				{hasPriv('score_score_report') && <TabPane tab="按分数段统计" key="7" >
					<ScoreSection
						params={params}
						tab={tab}
						dictionary={dictionary}
					/>
				</TabPane>}
			</Tabs>
		</Card>
	</div>
};

export default connect( ( { dictionary } ) => ({ dictionary }) )( Score );
