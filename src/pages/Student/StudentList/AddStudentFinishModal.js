import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from "dva";
import { Card, Menu, Button, Form, Modal, Icon, Switch, message, Tag, Popconfirm } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
import { getDictValue } from '@/utils/dictionaryUtil';
import style from './index.less';
const { confirm } = Modal;
const tableName = 'studentFinishList';

const AddStudentFinishModal = props => {
	const { dispatch, handleSubmit, studentType, visible,form, setVisible, dictionary, data, loading, afterClose, handleModalVisible} = props;
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );
	const [ selectedRows, setSelectedRows ] = useState( [] );
	// 表格-字段
	let tableColumns = [
		{
			...FIELDS.STUDENT.NAME
		},
		{
			...FIELDS.STUDENT.GENDER,
			customRender: ( text, record, ) => {
				const { baseInfo: { gender } } = record;
				return getDictValue( dictionary, FIELDS.STUDENT.GENDER.dictionary, String( gender ) )
			}
		},
		FIELDS.STUDENT.MOBILE,
		FIELDS.STUDENT.DEPART_ID_SCHOOL,
		FIELDS.STUDENT.LICENSE_TYPE,
		FIELDS.STUDENT.CLASS_ID,
		{
			...FIELDS.STUDENT.COACH_ID,
			title: '归属教练',
			customRender: ( text, record ) => {
				const { km2CoachId, km3CoachId } = record;
				return <>
					{km2CoachId !== 0 &&
					<Tag
						className={style.tag}>{`科目二：${getDictValue( dictionary, FIELDS.ASSET.EMPLOYEE_ID.dictionary, String( km2CoachId ) )}`}</Tag>}
					{km3CoachId !== 0 &&
					<Tag
						className={style.tag}>{`科目三：${getDictValue( dictionary, FIELDS.ASSET.EMPLOYEE_ID.dictionary, String( km3CoachId ) )}`}</Tag>}
					{km2CoachId === 0 && km3CoachId === 0 && '暂无'}
				</>
			}
		},
		{
			title: '操作',
			key: 'action',
			customRender: ( text, record, ) => {
				return (
					<Popconfirm
						title="请确认该学员的正确性，确认毕业后将不能退回！"
						onConfirm={() => submit(record.id)}
						onCancel={e => e.stopPropagation()}
					>
						<a onClick={e => e.stopPropagation()}>确认毕业</a>
					</Popconfirm>
				)
			}
		}
	]
	const submit = id => {
		dispatch( {
			type: 'studentFinishList/graduateStudent',
			payload: { studentIds: id },
		} ).then( data => {
			if ( data !== false ) {
				setTableNeedUpdate(true)
				handleSubmit();
				// 线索
				dispatch( {
					type: 'student/updClueStatus',
					payload: {
						params: {
							speedStatus: 5,
							studentId: id
						},
					}
				} );
			}
		} );
	};
	
	return (
		<Modal
			width="80%"
			title="新增毕业学员"
			visible={visible}
			afterClose={afterClose}
			destroyOnClose
			footer={[
				<Button key="cancel"
				htmlType="button"
				type="default"
				onClick={() => handleModalVisible()}>取消</Button>
			]}
			onCancel={() => handleModalVisible()}
		>
			<WithTableName
				{...props}
				scroll={{ x: 'max-content' }}
				bodyStyle={{ padding: 0, }}
				tableName={tableName}
				originColumns={tableColumns}
				columnSortable={false}
				needUpdate={tableNeedUpdate}
				setNeedUpdate={setTableNeedUpdate}
				formFields={[<WrapperComplexFormItem
					config={FIELDS.STUDENT.QUICK_SEARCH}
					key={FIELDS.STUDENT.QUICK_SEARCH.title}
					form={form}
				/>]}
				// selectedRows={selectedRows}
				// setSelectedRows={setSelectedRows}
				tableSearchParams={{
					studentType: studentType,
					studentStatus: 4
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
		dictionary
	}
) => (
	{
		[ tableName ]: data,
		loading,
		global,
		dictionary
	}
) )( Form.create()( AddStudentFinishModal ) );
