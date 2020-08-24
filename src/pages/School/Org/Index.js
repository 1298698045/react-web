import React from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';

import router from 'umi/router';

const Exam = props => {
	const { match, children, location, dispatch } = props;
	
	// 顶部菜单
	const tabList = [
		{
			priv: 'employee_manage',
			key: 'org',
			tab: '组织架构',
		},
		{
			priv: 'position_manage',
			key: 'position',
			tab: '职务管理',
		},
	];
	const handleTabChange = key => {
		router.push( `${match.url}/${key}` );
	};
	
	return (
		<PageHeaderWrapper
			title={<FormattedMessage id="menu.school.organization"/>}
			// content={mainSearch}
			tabList={tabList}
			tabActiveKey={location.pathname.replace( `${match.path}/`, '' )}
			onTabChange={handleTabChange}
		>
			{children}
		</PageHeaderWrapper>
	);
};

export default Exam;
