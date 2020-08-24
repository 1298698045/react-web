import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from 'dva';
import { Card, Menu, Button, Form, Modal, Icon, Divider, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from '@/config/fields';
import dictionary from '@/models/dictionary';
import Privilege from '@/components/Privilege';

const tableName = 'orgVacation';

const Vacation = props => {
	const { dispatch, form, dictionary } = props;
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );

	const confirmVacation = record => {
		return dispatch( {
			type: `${tableName}/confirmVacation`,
			params: {
				vacationId: record[ FIELDS.ORG.VACATION.ID.key ],
			},
		} ).then( () => {
			setTableNeedUpdate( true );
		} );
	};
	const rejectVacation = record => {
		return dispatch( {
			type: `${tableName}/rejectVacation`,
			params: {
				vacationId: record[ FIELDS.ORG.VACATION.ID.key ],
			},
		} ).then( () => {
			setTableNeedUpdate( true );
		} );
	};

	const getOperationButton = ( text, record, index ) => {
		return [
			<Privilege privs={[ 'vacation_comfrim' ]} key="vacation_comfrim" noMatch={'批准'}>
				<a key="enable" disabled={record[ FIELDS.ORG.VACATION.AUDIT_STATUS.key ] !== 0}
				onClick={() => Modal.confirm( {
					title: '是否批准【' + record[ FIELDS.ORG.VACATION.NAME.key ] + '】的休假申请？',
					okText: '确定',
					cancelText: '取消',
					onOk() {
						return confirmVacation( record );
					},
				} )}><Icon type="check-circle"/> 批准 </a>
			</Privilege>,
			<Divider key="divider0" type="vertical"/>,
			<Privilege privs={[ 'vacation_reject' ]} key="vacation_reject" noMatch={'驳回'}>
				<a key="disable" disabled={record[ FIELDS.ORG.VACATION.AUDIT_STATUS.key ] !== 0}
				onClick={() => Modal.confirm( {
					title: '是否驳回【' + record[ FIELDS.ORG.VACATION.NAME.key ] + '】的休假申请？',
					okText: '确定',
					cancelText: '取消',
					onOk() {
						return rejectVacation( record );
					},
				} )}><Icon type="close-circle"/> 驳回</a>
			</Privilege>,
		]
	};

	// 表格-字段
	const tableColumns = [
		FIELDS.ORG.VACATION.NAME,
		FIELDS.ORG.VACATION.MOBILE,
		FIELDS.ORG.VACATION.DEPART_ID_TABLE,
		FIELDS.ORG.VACATION.POSITION_ID,
		{
			...FIELDS.ORG.VACATION.TIME,
			customRender: ( text, record, index ) => `${record[ FIELDS.ORG.VACATION.START_DATE.key ]} ${record[ FIELDS.ORG.VACATION.START_TIME.key ]} ~ ${record[ FIELDS.ORG.VACATION.END_DATE.key ]} ${record[ FIELDS.ORG.VACATION.END_TIME.key ]}`,
		},
		FIELDS.ORG.VACATION.REASON,
		FIELDS.ORG.VACATION.CREATE_TIME,
		FIELDS.ORG.VACATION.AUDIT_STATUS,
		{
			...FIELDS.ORG.VACATION.AUDITOR,
			customRender: ( text, record ) => {
				const { auditor } = record;
				if ( auditor && dictionary[ FIELDS.ORG.VACATION.AUDITOR.dictionary ] ) {
					
					const employee = dictionary[ FIELDS.ORG.VACATION.AUDITOR.dictionary ].find( ( { id } ) => String( id ) === String( auditor ) );
					
					if ( employee ) {
						return employee.name;
					}
				}
				return '暂无';
			},
		},
		FIELDS.ORG.VACATION.AUDIT_TIME,
		{
			key: 'operation',
			title: '操作',
			customRender: getOperationButton,
			fixed: 'right',
		},
	];
	// 筛选表单-字段
	const tableFilterFields = [
		{
			config: FIELDS.ORG.VACATION.DEPART_ID,
		},
		{
			config: FIELDS.ORG.VACATION.AUDIT_STATUS,
		},
		{
			config: FIELDS.ORG.VACATION.QUICK_SEARCH,
		},
		{
			config: FIELDS.ORG.VACATION.DATE_RANGE,
			col: 9,
		},
	];
	// 操作按钮
	const tableActions = [];
	// 更多操作菜单
	const tableMenuItems = [];

	const memoFilterFields = useMemo( () => {
		return tableFilterFields.map( props => <WrapperComplexFormItem
			{...props}
			form={form}
		/> );
	}, [ form ] );

	return (
		<PageHeaderWrapper title={<FormattedMessage id="menu.school.vacation"/>}>
			<GridContent>
				<WithTableName
					{...props}
					tableName={tableName}
					originColumns={tableColumns}
					formFields={memoFilterFields}
					// tableActions={tableActions}
					// selectedRows={selectedRows}
					// setSelectedRows={setSelectedRows}
					// rowMenuItems={tableMenuItems}
					// handleMenuClick={handleMenuClick}
					columnSortable={false}
					scroll={{ x: 'max-content' }}
					tableSearchParams={{ includeSubDepart: true }}
					needUpdate={tableNeedUpdate}
					setNeedUpdate={setTableNeedUpdate}
				/>
			</GridContent>
		</PageHeaderWrapper>
	);
};

export default connect( (
	{
		[ tableName ]: data,
		dictionary,
		loading,
		global
	}
) => (
	{
		[ tableName ]: data,
		dictionary,
		loading,
		global,
	}
) )( Form.create()( Vacation ) );
