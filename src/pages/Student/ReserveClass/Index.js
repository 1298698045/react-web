import React, { Fragment, useState, useEffect } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import router from 'umi/router';

const Index = props => {
	const { match, children, location, dispatch, reserve, loading, dictionary } = props;

	// 顶部菜单
	const tabList = [
		{
			priv: 'order_course',
			key: 'reserve',
			tab: '约课',
		},
		{
			priv: 'order_course_record',
			key: 'log',
			tab: '记录',
		},
	];
	const handleTabChange = key => {
		router.push( `${match.url}/${key}` );
	};

	return (
		<PageHeaderWrapper
			title={<FormattedMessage id="menu.student.reserve-class"/>}
			tabList={tabList}
			tabActiveKey={location.pathname.replace( `${match.path}/`, '' )}
			onTabChange={handleTabChange}
		>
			{children}
		</PageHeaderWrapper>
	);
};

export default connect( (
	{
		loading,
		global,
		reserve,
		dictionary,
	}
) => (
	{
		loading,
		global,
		reserve,
		dictionary,
	}
) )( Index );
