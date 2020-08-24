import React,  {useState, useEffect} from 'react';
import { Row, Col, Card, Divider, Tabs, Tag  } from 'antd';
import { connect } from 'dva';
import TopData from './TopData';
import SearchForm from './SearchForm';
import FinanceList from './FinanceList';
const { TabPane } = Tabs;
import Privilege from '@/components/Privilege';
import Search from 'antd/lib/input/Search';
import moment from 'moment';
import { getTimeDistance } from '@/utils/utils';
import { queryDictionary } from '@/utils/dictionaryUtil';
import style from "@/pages/DataStatistics/style.less";

const Score = props => {
	const { dispatch, dictionary } = props;
	useEffect( () => {
		queryDictionary( dispatch, 'introducer_id' );
		queryDictionary( dispatch, 'employee_id' );
	}, [] );

	const [params, setParams] = useState({
		startDate: moment(getTimeDistance('today')[0]).format( 'YYYY-MM-DD'),
		endDate: moment(getTimeDistance('today')[1]).format( 'YYYY-MM-DD')
	})
	const onSearch = (params) => {
		setParams(params)
	}

	return <div>
		<TopData />
		{/* <Card style={{marginTop: '15px'}}>
			<SearchForm
				dictionary={dictionary}
				onSearch={onSearch}
			/>
 			<Divider dashed />
			<FinanceList
				params={params}
			/>
		</Card> */}
	</div>
};

export default connect( ( { dictionary } ) => ({ dictionary }) )( Score );
