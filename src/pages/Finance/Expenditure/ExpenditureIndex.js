import React, { useCallback } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';


const tabList = [
	{
		priv: 'bussiness_expend', 
		key: 'main-business',
		tab: '主营业务支出',
	},
	{
		priv: 'management_fee', 
		key: 'management-fee',
		tab: '管理费',
	},
	{
		priv: 'other_bussiness_expend', 
		key: 'other-business',
		tab: '其它业务支出',
	},
	{
		priv: 'fund_expend', 
		key: 'capital',
		tab: '资本支出',
	},
	{
		priv: 'tax_manage', 
		key: 'income-tax',
		tab: '所得税',
	},
];

const ExpenditureIndex = props => {
	const { match, children, location } = props;
	
	const handleTabChange = useCallback( key => {
		router.push( `${match.url}/${key}` )
	}, [] );
	
	return (
		<PageHeaderWrapper
			title="支出管理"
			tabActiveKey={location.pathname.replace( `${match.path}/`, '' )}
			tabList={tabList}
			onTabChange={handleTabChange}
		>
			{children}
		</PageHeaderWrapper>
	);
};

export default ExpenditureIndex;
