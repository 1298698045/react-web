import React, { useState, Fragment, useEffect, useMemo } from 'react';
import {
	Card,
	Icon,
	Button,
	Dropdown,
	Alert,
	Divider,
} from 'antd';
import _ from 'lodash';
import { useLocalStorage } from 'react-use';
import StandardTable from './StandardTable';
import TableSearchForm from './TableSearchForm';
import TableRowMenu from './TableRowMenu';
import TableColumnSettingModal from './TableColumnSettingModal';
import styles from './index.less';

/**
 * 复合表格组件，此组件与业务强耦合，不适用与其他系统。
 * @param props
 * @returns {*}
 * @constructor
 */
const ComplexTable = props => {
	const {
		name, // table唯一标识，用于记录用户展示列习惯。
		data, // table数据
		loading, // table加载loading
		columns, // table展示列
		setColumns, // 设置table展示列
		formFields = [], // 搜索表单项
		selectedRows, // 多选行
		setSelectedRows, // 设置多选行
		rowMenuItems = [], // 多选行批量操作
		handleMenuClick, // 多选行批量操作事件
		columnSortable, // 是否需要自定义展示列
		handleTableChange, // 切换页码
		targetKeys, // 默认展示列
		setTargetKeys, // 设置默认展示列
		tableActions = [], // 表格操作
		handleSearch, // 搜索
		handleFormReset, // 重置搜索表单
		expand, // 搜索表单展开/收起
		setExpand, // 设置搜索表单展开/收起
		rowKey, // rowKey table 行key antd要求
		sort, // 当前排序列
		bodyStyle = {},
		scroll,
		multipleSelection,
		title,
		pagination,
		tableTags
	} = props;
	
	/**
	 * 初始化【设置展示列功能】弹层状态
	 */
	const [ modalVisible, setModalVisible ] = useState( false );
	
	/**
	 * 初始化【设置展示列功能】弹层内容
	 */
	const [ columnKeys, setColumnKeys ] = useState( [] );
	
	const [ selectedRowKeys, setSelectedRowKeys ] = useState( [] );
	
	// 所有列
	const col = useMemo( () => columns.map( ( { title, key } ) => ({ title, key, }) ), [ columns ] );
	
	const [ lastTargetKeys, setLastTargetKeys ] = useLocalStorage( name );
	const [ totalColumns, setTotalColumns ] = useLocalStorage( `${name}TotalColumns` );
	
	useEffect( () => {
		setColumnKeys( col );
		if ( selectedRows ) setSelectedRowKeys( selectedRows.map( ( { key } ) => key ) );
	}, [ col, selectedRows ] );
	
	/**
	 * 设置展示列逻辑
	 */
	useEffect( () => {
		if ( columnSortable ) {
			// 取所有列的key
			const c = col.map( ( { key } ) => key );
			// 存储所有列的key
			setTotalColumns( c );
			
			// 如果之前有显示过table
			if ( lastTargetKeys ) {
				// totalColumns 之前的所有列的key
				// c 当前所有列的key
				
				let addC = []; // 新增列的key
				let delC = []; // 需要删除掉的列的key
				
				// 如果表格的列有变化
				if ( !_.isEqual( c, totalColumns ) ) {
					delC = _.difference( totalColumns, c );
					addC = _.difference( c, totalColumns );
				}
				
				// 当前需要展示出来的列
				const coincidence = columns.filter( ( { key } ) => targetKeys.includes( key ) );
				
				
				let newTargetKeys = coincidence.map( ( { key } ) => key );
				let lastKeys = [ ...lastTargetKeys ];
				
				// 把新增的列放到展示列内
				if ( addC.length > 0 ) {
					addC.forEach( a => {
						// 如果已经存在，不要新增
						if ( !newTargetKeys.includes( a ) ) newTargetKeys.push( a );
						if ( !lastKeys.includes( a ) ) lastKeys.push( a );
					} );
				}
				
				// 如果有需要删掉的列
				if ( delC.length > 0 ) {
					newTargetKeys = newTargetKeys.filter( n => {
						return !delC.includes( n );
					} );
					lastKeys = lastKeys.filter( n => {
						return !delC.includes( n );
					} );
				}
				
				// 是否需要更新
				const needUpdate = lastTargetKeys.some( i => columns.filter( j => j.key === i ).length === 0 ) || addC.length > 0 || delC.length > 0;
				
				if ( needUpdate ) {
					setTargetKeys( newTargetKeys );
					setLastTargetKeys( newTargetKeys );
				}
				
				if ( !_.isEqual( lastKeys, targetKeys ) ) {
					
					if ( modalVisible ) {
						setTargetKeys( targetKeys );
						setLastTargetKeys( targetKeys );
					} else {
						setTargetKeys( lastKeys );
						setLastTargetKeys( lastKeys );
					}
				}
			} else {
				setLastTargetKeys( targetKeys );
			}
		}
	}, [ targetKeys, modalVisible, columnSortable, ] );
	
	/**
	 * 渲染table
	 */
	const renderStandardTable = () => {
		const tableProps = {
			title: title ? () => title : null,
			rowKey,
			loading,
			data,
			// columns: getColumns,
			columns: targetKeys.map( v => columns.find( i => i.key === v ) ).filter( t => t ),
			onChange: ( pagination, filters, sorter, e ) => handleTableChange( pagination, filters, sorter, e ),
			scroll,
		};
		
		const selectedRowsTableProps = {
			title: title ? () => title : null,
			rowKey,
			rowClassName: styles.pointer,
			selectedRows,
			selectedRowKeys,
			setSelectedRowKeys,
			loading,
			data,
			// columns: getColumns,
			columns: targetKeys.map( v => columns.find( i => i.key === v ) ).filter( t => t ),
			onSelectRow: rows => setSelectedRows( rows ),
			onChange: ( pagination, filters, sorter, e ) => handleTableChange( pagination, filters, sorter, e ),
			scroll,
			multipleSelection,
		};
		
		const renderProps = selectedRows ? selectedRowsTableProps : tableProps;
		
		if ( pagination === false ) {
			renderProps.pagination = pagination;
		}
		
		return <StandardTable {...renderProps}/>;
	};
	
	return (
		<Card bordered={false} bodyStyle={bodyStyle}>
			<div className={styles.tableList}>
				{
					formFields && formFields.length > 0 && <TableSearchForm handleSearch={handleSearch}
					                                                        handleFormReset={handleFormReset}
					                                                        formFields={formFields}
					                                                        expand={expand}
					                                                        setExpand={setExpand}
					/>
				}
				<div className={styles.tableListOperator}>
					{[ ...tableActions ]}
					{
						(selectedRows && selectedRows.length > 0) && (
							<Fragment>
								<Alert
									className={styles.checkBoxAlert}
									message={
										<Fragment>
											已选择 <a
											style={{ fontWeight: 600 }}>{selectedRows.length}</a> 项&nbsp;&nbsp;
											<a onClick={() => {
												setSelectedRows( [] );
												setSelectedRowKeys( [] );
											}}
											   style={{ marginLeft: 24 }}>
												清空
											</a>
										</Fragment>
									}
									type="info"
									showIcon
								/>
								{
									rowMenuItems.length > 0 && (
										<Dropdown
											overlay={() => TableRowMenu( { rowMenuItems, handleMenuClick } )}>
											<Button>
												更多操作 <Icon type="down"/>
											</Button>
										</Dropdown>
									)
								}
							</Fragment>
						)
					}
					{
						columnSortable && (
							<Fragment>
								<Button icon="table" type="dashed" onClick={() => {setModalVisible( true );}}>
									设置展示列
								</Button>
								<TableColumnSettingModal
									dropdownRender={
										menu => (
											<div>
												{menu}
												<Divider style={{ margin: '4px 0' }}/>
												<div style={{ padding: '8px', cursor: 'pointer' }}>
													<Icon type="plus"/> Add item
												</div>
											</div>
										)
									}
									targetKeys={targetKeys}
									sort={sort}
									setTargetKeys={setTargetKeys}
									setColumns={setColumns}
									columnKeys={columnKeys}
									modalVisible={modalVisible}
									handleModalVisible={() => setModalVisible( false )}
								/>
							</Fragment>
						)
					}
				</div>
				<div style={{ width: '100%',position: 'relative' , zIndex: 0}}>
					{
						tableTags && tableTags.length > 0 ? <div className='color_tag'>
							{tableTags.map(one => {
								return (<span key={one}>{one}</span>)
							})}
						</div> : ''
					}
					{renderStandardTable()}
				</div>
			</div>
		</Card>
	);
};

export default ComplexTable;
