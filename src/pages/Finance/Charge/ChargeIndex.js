import React, { useCallback } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';


const tabList = [
	{
		priv: 'apply_pay',
		key: 'sign-up',
		tab: '报名交费',
	},
	{
		priv: 'after_pay_tuition_manage',
		key: 'make-up-tuition',
		tab: '补交学费',
	},
	{
		priv: 'pay_change_classpattern',
		key: 'change-class',
		tab: '班型变更费',
	},
	{
		priv: 'wait_after_pay_exam',
		key: 'supplementary-fee',
		tab: '补考费',
	},
	{
		priv: 'buy_lesson',
		key: 'class-fee',
		tab: '课时费',
	},
	{
		priv: 'pay_proxy_lesson',
		key: 'add-proxy-fee',
		tab: '添加代培科目费',
	},
	{
		priv: 'pay_proxy_lesson',
		key: 'other-cost',
		tab: '其它业务收入',
	},
];

const ChargeIndex = props => {
	const { match, children, location } = props;
	
	const handleTabChange = useCallback( key => {
		router.push( `${match.url}/${key}` )
	}, [] );
	
	return (
		<PageHeaderWrapper
			title="待收费管理"
			tabActiveKey={location.pathname.replace( `${match.path}/`, '' )}
			tabList={tabList}
			onTabChange={handleTabChange}
		>
			{children}
		</PageHeaderWrapper>
	);
};

export default ChargeIndex;
