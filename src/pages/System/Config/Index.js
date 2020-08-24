import React from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';

import router from "umi/router";

const Index = props => {
	const { match, children, location, dispatch } = props;

	// 顶部菜单
	const tabList = [
		{
			priv: 'licence_type',
			key: 'license',
			tab: '驾照类型',
		},
		{
			priv: 'status_setting',
			key: 'status',
			tab: '状态设置',
		},
		{
			priv: 'order_class_rule',
			key: 'bookCourse',
			tab: '约课规则',
		},
		{
			priv: 'fee_setting',
			key: 'cost',
			tab: '费用设置',
		},
		{
			priv: 'reason_setting',
			key: 'reason',
			tab: '原因设置',
		},
		{
			priv: 'other_setting',
			key: 'other',
			tab: '其它设置',
		},
		{
			priv: 'init_student',
			key: 'init-student',
			tab: '初始化学员',
		},
	];
	const handleTabChange = key => {
		router.push( `${match.url}/${key}` );
	};

	return (
		<PageHeaderWrapper
			title={<FormattedMessage id="menu.system.config" />}
			// content={mainSearch}
			tabList={tabList}
			tabActiveKey={location.pathname.replace( `${match.path}/`, '' )}
			onTabChange={handleTabChange}
		>
			{children}
		</PageHeaderWrapper>
	);
};

export default Index;
