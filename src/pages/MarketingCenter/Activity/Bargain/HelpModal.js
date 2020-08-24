import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { connect } from "dva";
import { Card, Menu, Button, Form, Modal, Icon, Switch, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
const tableName = 'bargainHelp';

const HelpModal = props => {
	const {  selectInfo, visible,form, setVisible, data, loading, afterClose, user } = props;
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );
	const getHelpLoading = loading.effects[ `bargainHelp/fetch` ] || false;
	// 表格-字段
	let tableColumns = [...FIELDS.ACTIVITY.BARGAIN_HELP_TABLE_HEAD]
	
	return (
		<Modal
			width="80%"
			title={"帮砍详情 - " + selectInfo.activityName}
			visible={visible}
			afterClose={afterClose}
			destroyOnClose
			onCancel={() => setVisible( false )}
			footer={null}
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
				tableSearchParams={{
					id: selectInfo.id
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
) )( Form.create()( HelpModal ) );
