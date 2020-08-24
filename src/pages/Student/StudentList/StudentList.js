import React, { useCallback } from 'react';
import { Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import Privilege from '@/components/Privilege';


const tabList = [
	{
		privName: 'localshool_student',
		key: 'local',
		tab: '本校学员',
	},
	{
		privName: 'help',
		key: 'help',
		tab: '委培学员',
	},
	{
		privName: 'proxy',
		key: 'proxy',
		tab: '代培学员',
	},
	{
		privName: 'depend',
		key: 'depend',
		tab: '挂靠学员',
	},
];

const StudentList = props => {
	const { match, children, location } = props;
	
	const handleTabChange = useCallback( key => {
		switch ( key ) {
			case 'local':
				router.push( `${match.url}/local` );
				break;
			case 'help':
				router.push( `${match.url}/help` );
				break;
			case 'proxy':
				router.push( `${match.url}/proxy` );
				break;
			case 'depend':
				router.push( `${match.url}/depend` );
				break;
			default:
				break;
		}
	}, [] );
	
	const goToUpload = () => {
		router.push( `/system/config/init-student` );
	};
	
	return (
		<PageHeaderWrapper
			title={<>
				<span>学员列表</span>
				<Privilege privs={[ 'batch_import_student' ]}>
				<Button style={{ marginLeft: 10, }} size="small" type="dashed"
				        icon="upload" onClick={goToUpload}>批量导入学员</Button></Privilege></>}
			tabActiveKey={location.pathname.replace( `${match.path}/`, '' )}
			tabList={tabList}
			onTabChange={handleTabChange}
		>
			{children}
		</PageHeaderWrapper>
	);
};

export default StudentList;
