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
import Time from './Time';
import Site from './Site';
const { TabPane } = Tabs;
import Privilege from '@/components/Privilege';
import Search from 'antd/lib/input/Search';
import moment from 'moment';
import { getTimeDistance } from '@/utils/utils';
import { queryDictionary } from '@/utils/dictionaryUtil';
import style from "@/pages/DataStatistics/style.less";
import { hasPriv } from '@/utils/privilege';

const ReserveClass = props => {
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
			type: 'dataStatistics/getReserveClassTotal',
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
			tabBarExtraContent={[
			<Tag color="orange" key="recordTotal">预约量(人次)：{tabData.recordTotal ? tabData.recordTotal : 0}</Tag>,
			<Tag color="orange" key="courseTotal">课程量(课节)：{tabData.courseTotal ? tabData.courseTotal : 0}</Tag>]} 
			className={style.tableName}>
				{hasPriv('depart_course_record_report') && <TabPane tab="按教学机构统计" key="1">
					<Department
						params={params}
						tab={tab}
					/>
				</TabPane>}
				{hasPriv('license_type_course_record_report') && <TabPane tab="按申领类型统计" key="2">
					<LicenseType
						params={params}
						tab={tab}
					/>
				</TabPane>}
				{hasPriv('class_course_record_report') && <TabPane tab="按班型统计" key="3">
					<Class
						params={params}
						tab={tab}
					/>
				</TabPane>}
				{hasPriv('student_type_course_record_report') && <TabPane tab="按学员类型统计" key="4">
					<StudentType
						params={params}
						tab={tab}
					/>
				</TabPane>}
				{hasPriv('site_course_record_report') && <TabPane tab="按训练场地统计" key="5">
					<Site
						params={params}
						tab={tab}
					/>
				</TabPane>}
				{hasPriv('coach_course_record_report') && <TabPane tab="按教练员统计" key="6" >
					<Coach
						params={params}
						tab={tab}
						dictionary={dictionary}
					/>
				</TabPane>}
				{hasPriv('time_course_record_report') && <TabPane tab="按时段统计" key="7" >
					<Time
						params={params}
						tab={tab}
						dictionary={dictionary}
					/>
				</TabPane>}
			</Tabs>
		</Card>
	</div>
};

export default connect( ( { dictionary } ) => ({ dictionary }) )( ReserveClass );
