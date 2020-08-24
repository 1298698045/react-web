import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { connect } from 'dva';
import { Tree, Button, Card, Modal, Spin, Icon, message } from 'antd';
import OrgDepartmentEditModal from './OrgDepartmentEditModal';
import OrgEmployee from './OrgEmployee';
import FIELDS from '@/config/fields';
import { refreshDictionary } from '@/utils/dictionaryUtil';
import Privilege from '@/components/Privilege';

const { TreeNode } = Tree;

import styles from './Org.less'

const Org = props => {
	const { dispatch, loading, organization } = props;
	const { departments } = organization;
	const [ departmentSelected, setDepartmentSelected ] = useState( {} );
	const [ departmentEditVisible, setDepartmentEditVisible ] = useState( false );
	const [ departmentEditItem, setDepartmentEditItem ] = useState( {} );
	
	const refreshDepartments = () => {
		dispatch( {
			type: 'organization/queryDepartmentList',
		} ).then( () => {
			setDepartmentSelected( {} );
			refreshDictionary( dispatch, 'depart_id' );
		} );
	};
	
	useEffect( refreshDepartments, [] );
	
	const memoDepartments = useMemo( () => {
		let dict = {};
		(function __forEach ( ds ){
			ds.forEach( d => {
				dict[ d[ FIELDS.ORG.DEPART_ID.key ] ] = d;
				d.children && __forEach( d.children );
			} );
		})( departments );
		return dict;
	}, [ departments ] );
	
	const memoTree = useMemo( () => {
		function __tree ( d ){
			return d && d.map( d2 =>
				<TreeNode
					title={d2[ FIELDS.ORG.DEPART_NAME.key ]}
					key={d2[ FIELDS.ORG.DEPART_ID.key ]}
				>
					{__tree( d2.children )}
				</TreeNode> );
		}
		
		return departments.length
			?
			<Tree showLine defaultExpandAll
			      onSelect={keys => setDepartmentSelected( memoDepartments[ keys[ 0 ] ] || {} )}
			>
				{__tree( departments )}
			</Tree>
			:
			<div>暂无数据</div>;
	}, [ departments ] );
	
	const saveDepartment = params => {
		return dispatch( {
			type: 'organization/saveDepartment',
			params,
		} ).then( refreshDepartments );
	};
	
	const confirmDeleteDepartment = () => {
		Modal.confirm( {
			title: '删除组织架构',
			content: '确定要删除【' + departmentSelected[ FIELDS.ORG.DEPART_NAME.key ] + '】吗？',
			okText: '确定',
			cancelText: '取消',
			onOk (){
				return deleteDepartment( departmentSelected );
			},
			onCancel (){
			},
		} );
	};
	
	const deleteDepartment = depart => {
		return dispatch( {
			type: 'organization/deleteDepartment',
			params: {
				departId: depart[ FIELDS.ORG.DEPART_ID.key ],
			},
		} ).then( refreshDepartments );
	};
	
	return (
		<Fragment>
			<div className={styles.main}>
				<Card style={{width: '309px'}}
					className={styles.leftSchool}
					size="middle"
					bordered={false}
					title={[
						<Privilege privs={[ 'department_add' ]} key="department_add">
						<Button type="primary" icon="plus-circle" key="add"
						        onClick={e => {
							        setDepartmentEditItem( {} );
							        setDepartmentEditVisible( true );
						        }}>新增</Button></Privilege>,
						<Privilege privs={[ 'department_edit' ]} key="department_edit">
							<Button type="primary" icon="edit" key="edit"
							disabled={!departmentSelected[ FIELDS.ORG.DEPART_ID.key ]}
							onClick={e => {
								setDepartmentEditItem( departmentSelected );
								setDepartmentEditVisible( true );
							}}>编辑</Button></Privilege>,
						<Privilege privs={[ 'department_delete' ]} key="department_delete">
						<Button type="primary" icon="delete" key="delete"
						        disabled={!departmentSelected[ FIELDS.ORG.DEPART_ID.key ]}
						        onClick={confirmDeleteDepartment}>删除</Button></Privilege>,
					]}
				>
					<Spin spinning={loading.effects[ 'organization/queryDepartmentList' ] || false}>{memoTree}</Spin>
				</Card>
				<div className={styles.right}>
					<OrgEmployee departmentSelected={departmentSelected}/>
				</div>
			</div>
			
			<OrgDepartmentEditModal
				dispatch={dispatch}
				selectedRow={departmentEditItem}
				visible={departmentEditVisible}
				setVisible={setDepartmentEditVisible}
				loading={loading.effects[ 'organization/saveDepartment' ]}
				onSubmit={fieldsValue => {
					saveDepartment( fieldsValue ).then( data => {
						if ( data !== false ){
							setDepartmentEditVisible( false );
						}
					} );
				}}
			/>
		</Fragment>
	);
};

export default connect( (
	{
		organization,
		loading,
		global
	}
) => (
	{
		organization,
		loading,
		global,
	}
) )( Org );
