import React, { Fragment, useState, useEffect, } from 'react';
import { Button, Col, Divider, Form, Icon, Row } from 'antd';
import styles from './index.less';

/**
 * ComplexTable 搜索表单
 * @param props
 * @returns {*}
 * @constructor
 */
const TableSearchForm = props => {
	const {
		handleSearch,
		handleFormReset,
		formFields,
		expand,
		setExpand,
	} = props;
	
	const [ splitIndex, setSplitIndex ] = useState( 0 );
	
	useEffect( () => {
		if ( formFields.length !== 0 ) {
			let index = 0;
			const split = formFields.filter( Item => {
				if ( !Item.props.col || Number.isInteger( Item.props.col ) ) {
					index = index + (Item.props.col || 6);
				} else {
					index += Item.props.col[ 'md' ];
				}
				
				return index <= (24 - 6);
			} );
			
			if ( split.length === 0 ) {
				setSplitIndex( 1 );
			} else {
				setSplitIndex( split.length );
			}
			
			if ( split.length < formFields.length ) setExpand( false );
		}
	}, [] );
	
	return (
		<div className={styles.tableListForm}>
			<Form onSubmit={handleSearch} layout="inline">
				<Row gutter={{ sm: 8 }} type="flex">
					{
						expand !== true
							?
							(
								<Fragment>
									{
										formFields.filter( ( Item, j ) => j < splitIndex ).map( ( Item ) => {
											if ( !Item.props.col || Number.isInteger( Item.props.col ) ) {
												return (
													<Col md={Item.props.col || 6}
													     sm={24}
													     key={Item.props.config.key}>
														{Item}
													</Col>
												)
											}
											return (
												<Col sm={24}
												     md={6}
												     {...Item.props.col}
												     key={Item.props.config.key}>
													{Item}
												</Col>
											)
										} )
									}
									<Col md={6} sm={24}>
										<div className={styles.submitButtons}>
											<Button type="primary" icon="search" htmlType="submit">
												查询
											</Button>
											<Button style={{ marginLeft: 8 }} icon="reload"
											        onClick={handleFormReset}>
												重置
											</Button>
											{
												expand === false && (
													<a style={{ marginLeft: 8 }}
													   onClick={() => setExpand( true )}>
														展开 <Icon type="down"/>
													</a>
												)
											}
										</div>
									</Col>
								</Fragment>
							)
							:
							(
								<Fragment>
									{
										formFields.map( ( Item ) => {
											if ( !Item.props.col || Number.isInteger( Item.props.col ) ) {
												return (
													<Col md={Item.props.col || 6}
													     sm={24}
													     key={Item.props.config.key}>
														{Item}
													</Col>
												)
											}
											return (
												<Col sm={24}
												     md={6}
												     {...Item.props.col}
												     key={Item.props.config.key}>
													{Item}
												</Col>
											)
											
										} )
									}
									<Col md={6} sm={24}>
										<div className={styles.submitButtons}>
											<Button type="primary" icon="search" htmlType="submit">
												查询
											</Button>
											<Button style={{ marginLeft: 8 }} icon="reload"
											        onClick={handleFormReset}>
												重置
											</Button>
											<a style={{ marginLeft: 8 }} onClick={() => setExpand( false )}>
												收起 <Icon type="up"/>
											</a>
										</div>
									</Col>
								</Fragment>
							)
					}
				</Row>
			</Form>
			<Divider dashed/>
		</div>
	);
};

export default TableSearchForm;
