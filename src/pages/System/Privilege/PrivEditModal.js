import React, { useState, useEffect, useMemo } from 'react';
import { Form, Modal, Tree, Row, Col, Card } from 'antd';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";

const { DirectoryTree, TreeNode } = Tree;

const RoleEditModal = props => {
	const { privEditItem, onSubmit, visible, setVisible, role, loading } = props;
	const { privilegeTree } = role;
	const privs = privEditItem.privsList || [];

	const findChildren = ( list, privName ) => {
		const found = list.find( p => p.privName === privName );
		if ( found ) return found.childList && found.childList.length;
		return list.find( p => findChildren( p.childList, privName ) );
	};
	let checkedKeys = [ ...privs ];
	let defaultCheckedKeys = privs.filter( privName => !findChildren( privilegeTree, privName ) );

	const onOk = e => {
		e.preventDefault();

		onSubmit( {
			roleId: privEditItem.id,
			privNameArray: checkedKeys,
		} );
	};

	const onCancel = e => {
		e.preventDefault();

		setVisible( false );
	};

	const onCheck = ( keys, { halfCheckedKeys } ) => {
		checkedKeys = keys.concat( halfCheckedKeys );
	};

	const memoTree = useMemo( () => {
		const renderTreeNodes = data =>
			data.map( item => <TreeNode selectable={false} title={item.title} key={item.privName} dataRef={item}>
				{item.childList && renderTreeNodes( item.childList )}
			</TreeNode> );
		return renderTreeNodes( privilegeTree );
	}, [ privilegeTree ] );

	return (
		<Modal
			destroyOnClose
			title={"角色权限 - 【" + privEditItem[ FIELDS.SYSTEM.ROLE.NAME.key ] + "】"}
			visible={visible}
			onOk={onOk}
			onCancel={onCancel}
			closable={true}
			maskClosable={false}
			keyboard={false}
			confirmLoading={loading}
			okText="提交"
			cancelText="取消"
		>
			<Row gutter={24}>
				<Col xs={24} md={24}>
					<Card title="页面权限">
						<Tree
							// defaultExpandAll
							checkable
							checkStrictly={false}
							showLine
							// onExpand={this.onExpand}
							// expandedKeys={this.state.expandedKeys}
							// autoExpandParent={this.state.autoExpandParent}
							onCheck={onCheck}
							defaultCheckedKeys={defaultCheckedKeys}
							// onSelect={this.onSelect}
							// selectedKeys={this.state.selectedKeys}
						>
							{memoTree}
						</Tree>
					</Card>
				</Col>
				{/*<Col xs={24} md={12}>*/}
				{/*<Card title="数据权限（暂无）">*/}
				{/*<Tree*/}
				{/*// defaultExpandAll*/}
				{/*checkable*/}
				{/*showLine*/}
				{/*// onExpand={this.onExpand}*/}
				{/*// expandedKeys={this.state.expandedKeys}*/}
				{/*// autoExpandParent={this.state.autoExpandParent}*/}
				{/*onCheck={onCheck}*/}
				{/*defaultCheckedKeys={privEditItem.privsList}*/}
				{/*// onSelect={this.onSelect}*/}
				{/*// selectedKeys={this.state.selectedKeys}*/}
				{/*>*/}
				{/*/!*{memoTree[ 1 ]}*!/*/}
				{/*</Tree>*/}
				{/*</Card>*/}
				{/*</Col>*/}
			</Row>
		</Modal>
	);
};

export default Form.create()( RoleEditModal );
