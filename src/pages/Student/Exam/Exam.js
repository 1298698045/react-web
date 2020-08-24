import React from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';

import router from "umi/router";

const Exam = props => {
	const { match, children, location, dispatch } = props;

	// 顶部菜单
	const tabList = [
		{
			privName: 'order_exam_manage',
			key: 'appointment',
			tab: '约考管理',
		},
		{
			privName: 'grade_manage',
			key: 'score',
			tab: '成绩管理',
		},
	];
	const handleTabChange = key => {
		router.push( `${match.url}/${key}` );
	};

	return (
		<PageHeaderWrapper
			title={<FormattedMessage id="menu.student.exam" />}
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
