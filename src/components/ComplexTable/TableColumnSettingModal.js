import React, { Fragment, useState, useCallback } from 'react';
import arrayMove from 'array-move';
import { Alert, Button, Col, Icon, message, Modal, Row, Tag, Transfer, Typography } from 'antd';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import style from './index.less';

const { Text } = Typography;

/**
 * 拖拽热区元素
 */
const DragHandle = sortableHandle( () => <Icon className={style.gestureDrag} style={{ paddingLeft: 6 }}
                                               type="drag"/> );

/**
 * 拖拽子元素
 */
const SortableItem = sortableElement( ( { value, key, handleClick } ) => (
	<div className={`${style.sortableZIndex} ${style.tagBottom}`}>
		<Tag key={key} onClick={handleClick}>
			<span className={style.gesturePointer}>{value}</span>
			<DragHandle/>
		</Tag>
	</div>
) );

/**
 * 拖拽容器
 */
const SortableContainer = sortableContainer( ( { children } ) => {
	return <div>{children}</div>;
} );

/**
 * 设置展示列弹层
 * @param props
 * @returns {*}
 * @constructor
 */
const ColumnsSettingModal = props => {
	const { modalVisible, columnKeys, targetKeys, sort, setTargetKeys, handleModalVisible } = props;
	
	/**
	 * 初始化提示信息
	 */
	const [ showAlert, setShowAlert ] = useState( false );
	
	/**
	 * 拖拽完成回调函数
	 * @param oldIndex 旧索引
	 * @param newIndex 新索引
	 */
	const handleSortEnd = ( { oldIndex, newIndex } ) => {
		setTargetKeys( arrayMove( targetKeys, oldIndex, newIndex ) );
	};
	
	/**
	 * 点击交换展示列函数
	 */
		// eslint-disable-next-line consistent-return
	const handleClick = useCallback( key => transferType => {
			if ( key === sort ) {
				message.info( '该列排序中，不可隐藏' );
				return false;
			}
			if ( transferType === 'toRight' ) {
				setShowAlert( false );
				setTargetKeys( [ ...targetKeys, key ] );
			} else if ( transferType === 'toLeft' ) {
				if ( targetKeys.length <= 1 ) {
					setShowAlert( true );
					return false;
				}
				const newTargetKeys = [ ...targetKeys ].filter( v => v !== key );
				setTargetKeys( newTargetKeys );
			}
		}, [ setTargetKeys, targetKeys, sort ] );
	
	return (
		<Modal
			destroyOnClose
			title="设置展示列"
			visible={modalVisible}
			footer={(
				<Button icon="close" type="default" onClick={() => handleModalVisible()}>
					关闭
				</Button>
			)}
			afterClose={() => setShowAlert( false )}
			onCancel={() => handleModalVisible()}
		>
			{
				showAlert === true && (
					<Alert message="您至少需要保留一列来展示表格。" className={style.alertBottom} type="warning" showIcon/>
				)
			}
			<Transfer
				className={style.transfer}
				dataSource={columnKeys}
				titles={[ '隐藏列', '展示列' ]}
				showSelectAll={false}
				targetKeys={targetKeys}
			>
				{
					transferProps => {
						return transferProps.direction === 'right'
							?
							(
								<SortableContainer useDragHandle
								                   lockAxis="y"
								                   onSortEnd={handleSortEnd}>
									{
										targetKeys.map( ( key, i ) => (
											<SortableItem key={key} index={i}
											              value={columnKeys.find( c => c.key === key ).title}
											              handleClick={() => handleClick( key )( 'toLeft' )}/>
										) )
									}
								</SortableContainer>
							)
							:
							(
								<Fragment>
									{
										columnKeys.filter( ( { key } ) => {
											// return targetKeys.filter( i => v.title === i.title ).length === 0;
											return targetKeys.indexOf( key ) === -1;
										} ).map( j => {
											return (
												<div key={j.key}
												     className={style.tagBottom}>
													<Tag className={style.gesturePointer}
													     onClick={() => handleClick( j.key )( 'toRight' )}>
														{j.title}
													</Tag>
												</div>
											);
										} )
									}
								</Fragment>
							);
					}
				}
			</Transfer>
			<Text type="secondary" className={style.tipsTop}>
				<Row type="flex">
					<Col>
						<Icon className={style.infoRight} type="info-circle"/>
					</Col>
					<Col>
						<div>点击左侧【列名】可将该列<Text strong>显示</Text>；点击右侧【列名】可将该列<Text strong>隐藏</Text>。</div>
						<div>按住并拖拽右侧【加号】可将该列<Text strong>移动顺序</Text>。</div>
					</Col>
				</Row>
			</Text>
		</Modal>
	);
};

export default ColumnsSettingModal;
