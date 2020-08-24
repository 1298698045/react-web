import React from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';

import router from "umi/router";

const Coach = props => {
	const { match, children, location, dispatch } = props;

	// 顶部菜单
	const tabList = [
		{
			priv: 'coach_list',
			key: 'list',
			tab: '教练列表',
		},
		{
			priv: 'student_info',
			key: 'student',
			tab: '学员情况',
		},
	];
	const handleTabChange = key => {
		router.push( `${match.url}/${key}` );
	};

	return (
		<PageHeaderWrapper
			title={<FormattedMessage id="menu.teaching.coach" />}
			// content={mainSearch}
			tabList={tabList}
			tabActiveKey={location.pathname.replace( `${match.path}/`, '' )}
			onTabChange={handleTabChange}
		>
			{children}
		</PageHeaderWrapper>
	);
};

export default Coach;