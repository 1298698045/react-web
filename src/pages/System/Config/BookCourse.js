import React, { useState, useEffect, useMemo } from 'react';
import { Menu } from 'antd';
import Privilege from '@/components/Privilege';
import BookCourse_1 from './BookCourse_1';
import BookCourse_2 from './BookCourse_2';
import BookCourse_3 from './BookCourse_3';

import styles from './Index.less';

const { Item } = Menu;

const BookCourse = props => {
	const [ menuSelected, selectMenu ] = useState( '0' );

	// 左侧标签页
	const menus = [
		{
			priv: 'match_mode',
			title: "分配模式",
			table: <BookCourse_1/>,
		},
		{
			priv: 'allow_order_date',
			title: "允许预约日",
			table: <BookCourse_2/>,
		},
		{
			priv: 'booknum',
			title: "学员上限/车",
			table: <BookCourse_3/>,
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

export default BookCourse;