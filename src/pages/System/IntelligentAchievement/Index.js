import React, { useCallback } from 'react';
import { Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import router from 'umi/router';


const tabList = [
	{
		priv: 'group_buy',
		key: 'functionSettings',
		tab: '功能设置',
	},
	{
		priv: 'bargain',
		key: 'importLog',
		tab: '导入记录',
	}
];

const IntelligentAchievement = props => {
	const { match, children, location } = props;
	
	const handleTabChange = useCallback( key => {
		switch ( key ) {
			case 'functionSettings':
				router.push( `${match.url}/functionSettings` );
				break;
			case 'importLog':
				router.push( `${match.url}/importLog` );
				break;
			default:
				break;
		}
	}, [] );
	
	
	return (
		<PageHeaderWrapper
			title={<FormattedMessage id="menu.system.intelligent-achievement.functionSettings"/>}
			tabActiveKey={location.pathname.replace( `${match.path}/`, '' )}
			tabList={tabList}
			onTabChange={handleTabChange}
		>
			{children}
		</PageHeaderWrapper>
	);
};

export default IntelligentAchievement;
