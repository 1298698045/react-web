import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from "dva";
import { Form, Input, InputNumber, Modal, Icon, message } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
import { getDictValue, refreshDictionary } from '@/utils/dictionaryUtil';
import Privilege from '@/components/Privilege';

const tableName = 'cfgCost_1';

const Cost = props => {
	const { dispatch, form, dictionary } = props;
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );

	const saveCost = ( index, amount ) => {
		return dispatch( {
			type: `${tableName}/setCostSetting`,
			index,
			amount,
		} ).then( () => {
			setTableNeedUpdate( true );
			refreshDictionary( dispatch, 'fetch' );
		} );
	};

	// 表格-字段
	const tableColumns = [
		{
			key: 'feeType',
			title: '费用类型',
			customRender: text => '挂靠费',
		},
		{
			key: 'licenseType',
			title: '申领类型',
			dictionary: 'license_type',
		},
		{
			key: 'amount',
			title: '费用标准',
			customRender: text => text + '元/人',
		},
		{
			key: 'type',
			title: '类型',
			customRender: text => '驾校自定义',
		},
		{
			key: 'modifyTime',
			title: '设置时间',
		},
		{
			key: 'operation',
			title: '操作',
			customRender: ( text, record, index ) =>(
				<Privilege privs={[ 'rely_fee_setting' ]} noMatch={'设置'}>
				<a key="setting" onClick={() => {
					let costEdited = record.amount;
					Modal.confirm( {
						title: '挂靠费标准 - ' + getDictValue(dictionary, 'license_type', record.licenseType),
						content: <Input placeholder="挂靠费" defaultValue={costEdited}
										onChange={e => costEdited = e.target.value}
										suffix={<span>元/人</span>}/>,
						okText: "确定",
						cancelText: "取消",
						onOk() {
							return saveCost( index, costEdited );
						},
					} );
				}}><Icon type="setting"/> 设置</a></Privilege>
			) ,
		},
	];

	return (
		<Fragment>
			<GridContent>
				<WithTableName
					{...props}
					tableName={tableName}
					originColumns={tableColumns}
					// formFields={memoFilterFields}
					// tableActions={tableActions}
					// selectedRows={selectedRows}
					// setSelectedRows={setSelectedRows}
					// rowMenuItems={tableMenuItems}
					// handleMenuClick={handleMenuClick}
					columnSortable={false}
					// scroll={{ x: 1600 }}
					pagination={false}
					needUpdate={tableNeedUpdate}
					setNeedUpdate={setTableNeedUpdate}
				/>
			</GridContent>
		</Fragment>
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
) )( Form.create()( Cost ) );