import React, { useCallback } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';


const tabList = [
	{
		priv: 'apply_charge',
		key: 'sign-up',
		tab: '报名交费',
	},
	{
		priv: 'after_apply_charge',
		key: 'make-up-tuition',
		tab: '补交学费',
	},
	{
		priv: 'apply_charge_change_classpattern',
		key: 'change-class',
		tab: '班型变更费',
	},
	{
		priv: 'charge_after_pay_exam',
		key: 'supplementary-fee',
		tab: '补考费',
	},
	{
		priv: 'charge_lesson',
		key: 'class-fee',
		tab: '课时费',
	},
	{
		priv: 'add_proxy_km_fee',
		key: 'add-proxy-fee',
		tab: '添加代培科目费',
	},
	{
		priv: 'other_charge',
		key: 'other-revenue',
		tab: '其它营收',
	},
	{
		priv: 'other_charge',
		key: 'other-cost',
		tab: '其它业务收入',
	},
	{
		priv: 'currency_fund',
		key: 'money-funds',
		tab: '货币资金',
	},
];

const IncomeIndex = props => {
	const { match, children, location } = props;
	
	const handleTabChange = useCallback( key => {
		router.push( `${match.url}/${key}` )
	}, [] );
	
	return (
		<PageHeaderWrapper
			title="收入管理"
			tabActiveKey={location.pathname.replace( `${match.path}/`, '' )}
			tabList={tabList}
			onTabChange={handleTabChange}
		>
			{children}
		</PageHeaderWrapper>
	);
};

export default IncomeIndex;
