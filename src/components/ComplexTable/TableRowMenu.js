import React from 'react';
import { Menu } from 'antd';

const { Item } = Menu;

/**
 * 批量操作下拉列表
 * @param props
 * @returns {*}
 * @constructor
 */
const TableRowMenu = props => {
	const { handleMenuClick, rowMenuItems } = props;
	
	return (
		<Menu onClick={ handleMenuClick } selectedKeys={ [] }>
			{
				rowMenuItems.map( v => (<Item key={ v.key }>{ v.title }</Item>) )
			}
		</Menu>
	);
};

export default TableRowMenu;
