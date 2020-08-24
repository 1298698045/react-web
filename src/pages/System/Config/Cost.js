import React, { useState, useEffect, useMemo } from 'react';
import { Menu } from 'antd';
import Cost_1 from './Cost_1';
import Cost_2 from './Cost_2';

import styles from './Index.less';

const { Item } = Menu;

const Cost = props => {
	const [ menuSelected, selectMenu ] = useState( '0' );

	// 左侧标签页
	const menus = [
		{
			priv: 'rely_fee',
			title: "挂靠费",
		},
		{
			priv: 'supply_fee',
			title: "补考费",
		},
		// {
		// 	title: "课时费",
		// },
	];

	return (
		<div className={styles.main}>
			<div className={styles.leftmenu}>
				<Menu mode="inline" onClick={e => selectMenu( e.key )} selectedKeys={[ menuSelected ]}>
					{menus.map( ( menu, i ) => <Item key={i}>{menu.title}</Item> )}
				</Menu>
			</div>
			<div className={styles.right}>
				{menuSelected == 0 ? <Cost_1/> : <Cost_2/>}
			</div>
		</div>
	);
};

export default Cost;