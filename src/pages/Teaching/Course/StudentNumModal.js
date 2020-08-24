import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from "dva";
import { Card, Menu, Button, Form, Modal, Icon, Switch, message, Descriptions } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
const tableName = 'studentNumList';
const { Item } = Descriptions;

const StudentNumModal = props => {
	const { currCoachInfo, selectItem, visible,form, setVisible, data, loading, afterClose, user} = props;
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );
	// 表格-字段
	let tableColumns = [
		{
			title: '序号',
			key: 'key',
		},
		FIELDS.STUDENT.NAME,
		FIELDS.STUDENT.MOBILE,
		{
			key: 'bookTime',
			title: '预约时间',
			customRender: ( text, record ) => record.createTime,
		},
		{
			...FIELDS.STUDENT.CLASS_ID_ACTIVE,
			title: '当前班型',
		},
		FIELDS.TEACHING.COURSE.LOGIC_STATUS
	]

	return (
		visible && <Modal
			width="80%"
			title={currCoachInfo.name}
			visible={visible}
			afterClose={afterClose}
			destroyOnClose
			onCancel={() => setVisible( false )}
			footer={null}
		>
			<Descriptions column={3} bordered>
				<Item label="课程日期">{selectItem.courseDate}</Item> 
				<Item label="培训时段">{selectItem.startTime + '~' +  selectItem.endTime}</Item> 
				<Item label="预约人数">{selectItem.studentNum}</Item> 
			</Descriptions>
			<WithTableName
				{...props}
				scroll={{ x: 'max-content' }}
				bodyStyle={{ padding: 0, }}
				tableName={tableName}
				originColumns={tableColumns}
				columnSortable={false}
				needUpdate={tableNeedUpdate}
				setNeedUpdate={setTableNeedUpdate}
				// formFields={searchFormFields}
				tableSearchParams={{
					courseId: selectItem.id
				}}
			/>
		</Modal>
	);
}
export default connect( (
	{
		[ tableName ]: data,
		loading,
		global,
		user
	}
) => (
	{
		[ tableName ]: data,
		loading,
		global,
		user
	}
) )( Form.create()( StudentNumModal ) );
