import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from '@/components/Exception/index.less';
import config from '@/components/Exception/typeConfig';
import { Button } from 'antd';

const Ex = () => {
	return (
		<div className={styles.exception}>
			<div className={styles.imgBlock}>
				<div
					className={styles.imgEle}
					style={{ backgroundImage: `url(${config[ '404' ].img})` }}
				/>
			</div>
			<div className={styles.content}>
				<h1>敬请期待</h1>
				<div className={styles.actions}>
					<Button type="primary" href="/">{formatMessage( { id: 'app.exception.back' } )}</Button>
				</div>
			</div>
		</div>
	)
};

export default Ex;
