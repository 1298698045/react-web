import React, { useCallback } from 'react';
import { Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import router from 'umi/router';


const tabList = [
	{
		priv: 'group_buy',
		key: 'assemble',
		tab: '拼团活动',
	},
	{
		priv: 'bargain',
		key: 'bargain',
		tab: '砍价活动',
	}
	,
	{
		priv: 'activity_prize',
		key: 'luckDraw',
		tab: '抽奖活动',
	}
];

const ActivityList = props => {
	const { match, children, location } = props;
	
	const handleTabChange = useCallback( key => {
		switch ( key ) {
			case 'assemble':
				router.push( `${match.url}/assemble` );
				break;
			case 'bargain':
				router.push( `${match.url}/bargain` );
				break;
			case 'luckDraw':
				router.push( `${match.url}/luckDraw` );
				break;
			default:
				break;
		}
	}, [] );
	
	return (
		<PageHeaderWrapper
			title={<FormattedMessage id="menu.marketing-center.activity"/>}
			tabActiveKey={location.pathname.replace( `${match.path}/`, '' )}
			tabList={tabList}
			onTabChange={handleTabChange}
		>
			{children}
		</PageHeaderWrapper>
	);
};

export default ActivityList;
