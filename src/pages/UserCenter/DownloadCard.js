import { Row, Col, Card, Button, Icon, Avatar } from 'antd';
import numeral from "numeral";
import styles from './DownloadCard.less';

import excel from '@/assets/icons/excel.png';

const icons = {excel};

const DownloadCard = props => {
	const { fileType = 'excel', filePath, title, times = 0 } = props;
	return (
		<Card
			className={styles.downloadCard}
			actions={[ <a href={filePath} target="_blank"><Icon type="download"/> 下载</a> ]}
		>
			<Card.Meta
				avatar={
					<Avatar src={icons[fileType]}/>
				}
				title={title}
				// description={"下载次数：" + numeral( times ).format( '0,0' )}
			/>
		</Card>
	);
};

export default DownloadCard;