import React, { memo } from 'react';
import { Card, Radio } from 'antd';
import styles from './Analysis.less';
import { Bar, Pie } from '@/components/Charts';

const ProportionSales = memo(
	( { dropdownGroup, salesType, loading, salesData, handleChangeSalesType } ) => (
		<Card
			style={{ height: 385 }}
			loading={loading}
			className={styles.salesCard}
			title="约课情况"
			bodyStyle={{ padding: 24 }}
			extra={
				<div className={styles.salesCardExtra}>
					{dropdownGroup}
					<div className={styles.salesTypeRadio}>
						<Radio.Group value={salesType} onChange={handleChangeSalesType}>
							<Radio.Button value="all">昨天</Radio.Button>
							<Radio.Button value="online">
								今天
							</Radio.Button>
							<Radio.Button value="stores">
								近7天
							</Radio.Button>
						</Radio.Group>
					</div>
				</div>
			}
		>
			<Bar
				height={280}
				data={salesData}
			/>
		</Card>
	)
);

export default ProportionSales;
