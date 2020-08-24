import React, { useCallback } from 'react';
import { Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import router from 'umi/router';


const tabList = [
	{
		priv: 'student_enter',
		key: 'formal',
		tab: '正式报名',
	},
	{
		priv: 'student_enter',
		key: 'expect',
		tab: '预报名',
	}
];

const Index = props => {
	const { match, children, location } = props;
	
	const handleTabChange = useCallback( key => {
		switch ( key ) {
			case 'formal':
				router.push( `${match.url}/formal` );
				break;
			case 'expect':
				router.push( `${match.url}/expect` );
				break;
			default:
				break;
		}
	}, [] );
	
	return (
		<PageHeaderWrapper
			title={<FormattedMessage id="menu.student.sign-up"/>}
			tabActiveKey={location.pathname.replace( `${match.path}/`, '' )}
			tabList={tabList}
			onTabChange={handleTabChange}
		>
			{children}
		</PageHeaderWrapper>
	);
};

export default Index;
