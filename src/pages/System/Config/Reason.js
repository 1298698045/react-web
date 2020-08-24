import React, { useState, useEffect, useMemo } from 'react';
import { Menu } from 'antd';
import Reason_1 from './Reason_1';
import Reason_2 from './Reason_2';
import Reason_3 from './Reason_3';

import styles from './Index.less';

const { Item } = Menu;

const Reason = props => {
	const [ menuSelected, selectMenu ] = useState( '0' );

	// 左侧标签页
	const menus = [
		{
			priv: "delay_archivist_reason",
			title: "暂缓建档原因",
			table: <Reason_1/>,
		},
		{
			priv: "pause_archivist_reason",
			title: "终止建档原因",
			table: <Reason_2/>,
		},
		{
			priv: "student_leave_reason",
			title: "学员退学原因",
			table: <Reason_3/>,
		},
	];

	return (
		<div className={styles.main}>
			<div className={styles.leftmenu}>
				<Menu mode="inline" onClick={e => selectMenu( e.key )} selectedKeys={[ menuSelected ]}>
					{menus.map( ( menu, i ) => <Item key={i}>{menu.title}</Item> )}
				</Menu>
			</div>
			<div className={styles.right}>
				{menus[ menuSelected ].table}
			</div>
		</div>
	);
};

export default Reason;