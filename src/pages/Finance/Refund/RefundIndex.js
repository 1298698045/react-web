import React, { useCallback } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';


const tabList = [
	{
		priv: 'wait_return_fee',
		key: 'await',
		tab: '待审核',
	},
	{
		priv: 'wait_return_fee_complete',
		key: 'done',
		tab: '已完成',
	},
];

const RefundIndex = props => {
	const { match, children, location } = props;
	
	const handleTabChange = useCallback( key => {
		router.push( `${match.url}/${key}` )
	}, [] );
	
	return (
		<PageHeaderWrapper
			title="退费管理"
			tabActiveKey={location.pathname.replace( `${match.path}/`, '' )}
			tabList={tabList}
			onTabChange={handleTabChange}
		>
			{children}
		</PageHeaderWrapper>
	);
};

export default RefundIndex;
