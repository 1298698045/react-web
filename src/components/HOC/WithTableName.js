import React, { useMemo } from 'react';
import WrapperComplexTable from '@/components/HOC/WrapperComplexTable';
import getOriginColumns from '@/utils/getOriginColumns';

/**
 * 业务强相关组件，通过tableName拉取指定数据。
 * @param props
 * @constructor
 */
const WithTableName = props => {
	const {
		form,
		dispatch,
		tableName,
		tableActions,
		selectedRows,
		setSelectedRows,
		rowMenuItems,
		handleMenuClick,
		originColumns,
		formFields = [],
		tableSearchParams = {},
		columnSortable = true,
		[ tableName ]: {
			[ `${tableName}TableData` ]: tableData,
		},
		loading,
		bodyStyle,
		scroll,
		title = null,
		multipleSelection = true,
		pagination,
		needUpdate,
		setNeedUpdate,
		tableTags,
		handleFormReset
	} = props;
	
	const tableSearchParamsString = JSON.stringify( tableSearchParams );
	
	const targetKeys = useMemo( () => {
		return originColumns.filter( v => v.default !== false ).map( ( { key } ) => key );
	}, [ tableName, originColumns, tableSearchParamsString ] );
	
	const columns = getOriginColumns( originColumns );
	const tableLoading = loading.effects[ `${tableName}/fetch` ] || false;
	return (
		<WrapperComplexTable
			form={form}
			title={title}
			dispatch={dispatch}
			data={tableData}
			loading={tableLoading}
			tableActions={tableActions}
			selectedRows={selectedRows}
			targetKeys={targetKeys}
			setSelectedRows={setSelectedRows}
			rowMenuItems={rowMenuItems}
			handleMenuClick={handleMenuClick}
			columnSortable={columnSortable}
			formFields={formFields}
			originColumns={columns}
			tableName={tableName}
			bodyStyle={bodyStyle}
			scroll={scroll}
			multipleSelection={multipleSelection}
			tableSearchParams={tableSearchParamsString}
			pagination={pagination}
			needUpdate={needUpdate}
			setNeedUpdate={setNeedUpdate}
			tableTags={tableTags}
			handleFormReset={handleFormReset}
		/>
	)
};

export default WithTableName;
