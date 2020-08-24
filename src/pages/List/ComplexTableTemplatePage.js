import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'dva';
import {
	Form,
	Input,
	Select,
	Badge,
	Divider, Button,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ComplexTable from '@/components/ComplexTable';

const FormItem = Form.Item;
const { Option } = Select;

const statusMap = [ 'default', 'error', 'success', 'processing' ];
const status = [ '待交费', '被驳回', '待建档', '暂缓建档' ];
const agency = [ '全部', '机构一', '机构二' ];
const type = [ '全部', '本校', '挂靠', '代培' ];
const classType = [ '全部', '班型1', '班型2', '班型3' ];
const payType = [ '全部', '首付', '全款' ];

const originColumns = [
	{
		title: '序号',
		dataIndex: 'index.less.less',
		key: 'index.less.less',
	},
	{
		title: '姓名',
		dataIndex: 'name',
		key: 'name',
		// render: record => <a onClick={ () => this.handleUpdateModalVisible( true, record ) }>{ record }</a>,
	},
	{
		title: '教学机构',
		dataIndex: 'agency',
		key: 'agency',
		render ( val ) {
			return agency[ Number( val ) ];
		},
	},
	{
		title: '报名类型',
		dataIndex: 'type',
		key: 'type',
		render ( val ) {
			return type[ Number( val ) ];
		},
	},
	{
		title: '状态',
		dataIndex: 'status',
		key: 'status',
		render ( val ) {
			return <Badge status={ statusMap[ Number( val ) ] } text={ status[ Number( val ) ] }/>;
		},
	},
	{
		title: '报名班型',
		dataIndex: 'classType',
		key: 'classType',
		render ( val ) {
			return classType[ Number( val ) ];
		},
	},
	{
		title: '交费类型',
		dataIndex: 'payType',
		key: 'payType',
		render ( val ) {
			return payType[ Number( val ) ];
		},
	},
	{
		title: '招生渠道',
		dataIndex: 'fromType',
		key: 'fromType',
		render ( val ) {
			return payType[ Number( val ) ];
		},
	},
	{
		title: '介绍人',
		dataIndex: 'intro',
		key: 'intro',
	},
	{
		title: '操作',
		key: '操作',
		render: ( text, record ) => (
			<Fragment>
				<a onClick={ () => this.handleUpdateModalVisible( true, record ) }>编辑</a>
				<Divider type="vertical"/>
				<a href="">备注</a>
				<Divider type="vertical"/>
				<a href="">删除</a>
			</Fragment>
		),
	},
];

const ComplexTableTemplatePage = props => {
	const {
		form: {
			getFieldDecorator,
			validateFields,
			resetFields,
		},
		dispatch,
		rule: {
			data,
		},
		loading,
	} = props;
	
	const handleSearch = e => {
		e.preventDefault();
		
		validateFields( ( err, fieldsValue ) => {
			if ( err ) return;
			
			const newFields = { ...fieldsValue };
			Object.keys( newFields ).filter( v => (newFields[ v ] === undefined || newFields[ v ] === '') ).forEach( i => {
				delete newFields[ i ];
			} );
			
			dispatch( {
				type: 'rule/fetch',
				payload: newFields,
			} );
		} );
	};
	
	const handleFormReset = () => {
		resetFields();
		
		dispatch( {
			type: 'rule/fetch',
		} );
	};
	
	// eslint-disable-next-line no-unused-vars
	const handleTableChange = pagination => {
		// eslint-disable-next-line no-console
		// console.log( pagination );
		// const params = {
		// 	currentPage: pagination.current,
		// 	pageSize: pagination.pageSize,
		// };
		// console.log( params );
		handleSearch();
	};
	
	const formFields = {
		normal: [
			{
				id: 'name',
				RenderFormItemComponent: () => (
					<FormItem label="关键字" style={ { marginBottom: 0 } }>
						{ getFieldDecorator( 'name' )( <Input placeholder="姓名/手机号/身份证号"/> ) }
					</FormItem>
				),
			},
			{
				id: 'agency',
				RenderFormItemComponent: () => (
					<FormItem label="教学机构" style={ { marginBottom: 0 } }>
						{
							getFieldDecorator( 'agency' )(
								<Select placeholder="请选择" style={ { width: '100%' } }>
									<Option value="0">全部</Option>
									<Option value="1">机构1</Option>
									<Option value="2">机构2</Option>
								</Select>,
							)
						}
					</FormItem>
				),
			},
			{
				id: 'type',
				RenderFormItemComponent: () => (
					<FormItem label="报名类型" style={ { marginBottom: 0 } }>
						{ getFieldDecorator( 'type' )(
							<Select placeholder="请选择" style={ { width: '100%' } }>
								<Option value="0">全部</Option>
								<Option value="1">本校</Option>
								<Option value="2">挂靠</Option>
								<Option value="3">代培</Option>
							</Select>,
						) }
					</FormItem>
				),
			},
		],
		expand: [
			{
				id: 'name',
				RenderFormItemComponent: () => (
					<FormItem label="关键字" style={ { marginBottom: 0 } }>
						{ getFieldDecorator( 'name' )( <Input placeholder="姓名/手机号/身份证号"/> ) }
					</FormItem>
				),
			},
			{
				id: 'agency',
				RenderFormItemComponent: () => (
					<FormItem label="教学机构" style={ { marginBottom: 0 } }>
						{
							getFieldDecorator( 'agency' )(
								<Select placeholder="请选择" style={ { width: '100%' } }>
									<Option value="0">全部</Option>
									<Option value="1">机构1</Option>
									<Option value="2">机构2</Option>
								</Select>,
							)
						}
					</FormItem>
				),
			},
			{
				id: 'type',
				RenderFormItemComponent: () => (
					<FormItem label="报名类型" style={ { marginBottom: 0 } }>
						{ getFieldDecorator( 'type' )(
							<Select placeholder="请选择" style={ { width: '100%' } }>
								<Option value="0">全部</Option>
								<Option value="1">本校</Option>
								<Option value="2">挂靠</Option>
								<Option value="3">代培</Option>
							</Select>,
						) }
					</FormItem>
				),
			},
			{
				id: 'status',
				RenderFormItemComponent: () => (
					<FormItem label="状态">
						{ getFieldDecorator( 'status' )(
							<Select placeholder="请选择" style={ { width: '100%' } }>
								<Option value="0">全部</Option>
								<Option value="1">代交费</Option>
								<Option value="2">被驳回</Option>
								<Option value="3">待建档</Option>
								<Option value="4">暂缓建档</Option>
							</Select>,
						) }
					</FormItem>
				),
			},
			{
				id: 'classType',
				RenderFormItemComponent: () => (
					<FormItem label="报名班型">
						{ getFieldDecorator( 'classType' )(
							<Select placeholder="请选择" style={ { width: '100%' } }>
								<Option value="0">全部</Option>
								<Option value="1">班型1</Option>
								<Option value="2">班型2</Option>
								<Option value="3">班型3</Option>
							</Select>,
						) }
					</FormItem>
				),
			},
			{
				id: 'payType',
				RenderFormItemComponent: () => (
					<FormItem label="交费类型">
						{ getFieldDecorator( 'payType' )(
							<Select placeholder="请选择" style={ { width: '100%' } }>
								<Option value="0">全部</Option>
								<Option value="1">全款</Option>
								<Option value="2">首付</Option>
							</Select>,
						) }
					</FormItem>
				),
			},
			{
				id: 'fromType',
				RenderFormItemComponent: () => (
					<FormItem label="招生渠道">
						{ getFieldDecorator( 'fromType' )(
							<Select placeholder="请选择" style={ { width: '100%' } }>
								<Option value="0">全部</Option>
								<Option value="1">全款</Option>
								<Option value="2">首付</Option>
							</Select>,
						) }
					</FormItem>
				),
			},
			{
				id: 'intro',
				RenderFormItemComponent: () => (
					<FormItem label="介绍人">
						{ getFieldDecorator( 'intro' )( <Input placeholder="姓名/手机号"/> ) }
					</FormItem>
				),
			},
		],
	};
	
	const [ selectedRows, setSelectedRows ] = useState( [] );
	const [ expand, setExpand ] = useState( false );
	const [ columns, setColumns ] = useState( originColumns );
	const [ targetKeys, setTargetKeys ] = useState( [
		{
			title: '序号',
			key: 'index.less.less',
		},
		{
			title: '姓名',
			key: 'name',
		},
	] );
	
	useEffect( () => {
		dispatch( {
			type: 'rule/fetch',
		} );
	}, [] );
	
	const rowMenuItems = [
		{
			key: 'remove',
			title: '删除',
		},
		{
			key: 'approval',
			title: '批量审批',
		},
	];
	
	const handleMenuClick = e => {
		if ( selectedRows.length === 0 ) return;
		if ( e.key === 'remove' ) {
			dispatch( {
				type: 'rule/remove',
				payload: {
					key: selectedRows.map( row => row.key ),
				},
				callback: () => {
					setSelectedRows( [] );
					handleSearch();
				},
			} );
		}
	};
	
	const TableActions = [
		<Button key="studentSignUp-new" icon="plus" type="primary" onClick={ () => {} }>
			新建
		</Button>,
	];
	
	return (
		<PageHeaderWrapper title="学员列表">
			<ComplexTable name="studentSignUp" // table唯一标识，用于记录用户展示列习惯。
			              data={ data } // table数据
			              loading={ loading } // table加载loading
			              columns={ columns } // table展示列
			              setColumns={ setColumns } // 设置table展示列
			              formFields={ formFields } // 搜索表单项
			              handleSearch={ handleSearch } // 搜索
			              handleFormReset={ handleFormReset } // 重置搜索表单
			              selectedRows={ selectedRows } // 多选行
			              setSelectedRows={ setSelectedRows } // 设置多选行
			              expand={ expand } // 搜索表单展开/收起
			              setExpand={ setExpand } // 设置搜索表单展开/收起
			              rowMenuItems={ rowMenuItems } // 多选行批量操作
			              handleMenuClick={ handleMenuClick } // 多选行批量操作事件
			              handleTableChange={ handleTableChange } // 切换页码
			              rowSetting // 是否需要自定义展示列
			              targetKeys={ targetKeys } // 默认展示列
			              setTargetKeys={ setTargetKeys } // 设置默认展示列
			              tableActions={ TableActions } // 表格操作
			/>
		</PageHeaderWrapper>
	);
};

export default connect( ( { rule, loading } ) => ({
	rule,
	loading: loading.models.table,
}) )( Form.create()( ComplexTableTemplatePage ) );
