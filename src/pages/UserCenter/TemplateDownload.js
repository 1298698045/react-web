import React from 'react';
import { Row, Col } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DownloadCard from './DownloadCard';

import examAppointment from '@/assets/download/约考导入-模板.20191009.xls';
import examScore from '@/assets/download/考试成绩导入-模板.20191009.xls';
import wage from '@/assets/download/员工工资导入.20190909.xls';
import student1 from '@/assets/download/学员数据-本校.20191009.xls';
import student2 from '@/assets/download/学员数据-挂靠.20191009.xls';
import student3 from '@/assets/download/学员数据-代培.20191009.xls';
// import carPurchase from '@/assets/download/车辆采购.20190909.xls';
import carPurchase from '@/assets/download/车辆导入-模板.20191009.xlsx';
// import carLease from '@/assets/download/车辆租赁.20190909.xls';
import initStudent from '@/assets/download/学员初始化数据-规则.20190923.xls';

const templates = [
	{
		fileType: 'excel',
		filePath: student1,
		title: '学员数据表-本校',
		times: 1234,
	},
	{
		fileType: 'excel',
		filePath: student2,
		title: '学员数据表-挂靠',
		times: 1234,
	},
	{
		fileType: 'excel',
		filePath: student3,
		title: '学员数据表-代培',
		times: 1234,
	},
	{
		fileType: 'excel',
		filePath: examAppointment,
		title: '约考信息导入',
		times: 1234,
	},
	{
		fileType: 'excel',
		filePath: examScore,
		title: '考试成绩导入',
		times: 1234,
	},
	{
		fileType: 'excel',
		filePath: wage,
		title: '员工工资导入',
		times: 1234,
	},
	{
		fileType: 'excel',
		filePath: carPurchase,
		title: '车辆采购',
		times: 1234,
	},
	{
		fileType: 'excel',
		filePath: initStudent,
		title: '学员初始化规则',
		times: 1234,
	},
	// {
	// 	fileType: 'excel',
	// 	filePath: carLease,
	// 	title: '车辆租赁',
	// 	times: 1234,
	// },
];
const TemplateDownload = props => {
	return (
		<PageHeaderWrapper
			title={<FormattedMessage id="menu.user-center.template-download"/>}
		>
			<GridContent>
				<Row gutter={24}>
					{templates.map( (template, i) =>
						<Col xl={6} lg={12} md={12} sm={24} xs={24} key={i} style={{ marginBottom: 24 }}>
							<DownloadCard {...template} />
						</Col>
					)}
				</Row>
			</GridContent>
		</PageHeaderWrapper>
	);
};


export default TemplateDownload;
