import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './index.less';

class StandardTable extends PureComponent {
	constructor ( props ){
		super( props );
	}
	
	handleRowSelectChange = ( selectedRowKeys, selectedRows ) => {
		const { onSelectRow, setSelectedRowKeys } = this.props;
		setSelectedRowKeys( selectedRowKeys );
		
		onSelectRow( selectedRows );
	};
	
	handleTableChange = ( pagination, filters, sorter ) => {
		const { onChange } = this.props;
		if ( onChange ) {
			onChange( pagination, filters, sorter );
		}
	};
	
	selectRow = ( record ) => {
		if ( record.disabled ) return false;
		const { onSelectRow, selectedRows, selectedRowKeys, setSelectedRowKeys, multipleSelection, } = this.props;
		if ( !selectedRows ) return false;
		const newSelectedRowKeys = [ ...selectedRowKeys ];
		const newSelectedRows = [ ...selectedRows ];
		if ( newSelectedRowKeys.indexOf( record.key ) >= 0 ) {
			newSelectedRowKeys.splice( newSelectedRowKeys.indexOf( record.key ), 1 );
			newSelectedRows.splice( newSelectedRows.indexOf( record ), 1 );
		} else {
			if ( !multipleSelection ) {
				newSelectedRowKeys[ 0 ] = record.key;
				newSelectedRows[ 0 ] = record;
			} else {
				newSelectedRowKeys.push( record.key );
				newSelectedRows.push( record );
			}
		}
		
		setSelectedRowKeys( newSelectedRowKeys );
		
		onSelectRow( newSelectedRows );
	};
	
	render (){
		const { data = {}, rowKey, selectedRows, selectedRowKeys, onSelectRow, multipleSelection, ...rest } = this.props;
		const { list = [], pagination } = data;
		
		const paginationProps = {
			showSizeChanger: true,
			showQuickJumper: true,
			pageSizeOptions: [ '10', '20', '50', '100' ],
			showTotal: (total, range) => `共${total}条记录`,
			...pagination,
		};
		
		const rowSelection = {
			selectedRowKeys,
			type: multipleSelection ? 'checkbox' : 'radio',
			onChange: this.handleRowSelectChange,
			getCheckboxProps: record => ({
				disabled: record.disabled,
			}),
		};
		
		return (
			<div className={styles.standardTable}>
				<Table
					rowKey={rowKey || 'key'}
					rowSelection={selectedRows ? rowSelection : null}
					dataSource={list}
					pagination={paginationProps}
					onChange={this.handleTableChange}
					{...rest}
					onRow={( record ) => ({
						onClick: () => {
							this.selectRow( record );
						},
					})}
				/>
			</div>
		);
	}
}

export default StandardTable;
