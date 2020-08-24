import React, { useCallback } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';


const tabList = [
	{
		priv: 'performance_data_report',
		key: 'performance-data-report',
		tab: '绩效数据报表',
	},
	{
		priv: 'salary_check',
		key: 'wage-registration',
		tab: '工资登记',
	},
];

const WageIndex = props => {
	const { match, children, location } = props;
	
	const handleTabChange = useCallback( key => {
		router.push( `${match.url}/${key}` )
	}, [] );
	
	return (
		<PageHeaderWrapper
			title="工资管理"
			tabActiveKey={location.pathname.replace( `${match.path}/`, '' )}
			tabList={tabList}
			onTabChange={handleTabChange}
		>
			{children}
		</PageHeaderWrapper>
	);
};

export default WageIndex;
