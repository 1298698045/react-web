import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import ComplexTable from '@/components/ComplexTable';
import transformRequestParams from '@/utils/transformRequestParams';
import { useToggle } from 'react-use';

const withDictionary = ( loading, dispatch, data ) => originColumns => dictionary => {
	const { list } = data;
	if ( list.length === 0 ) return originColumns;

	return originColumns.map( o => {
		const { customRender } = o;

		if ( o.dictionary ) {
			const dic = dictionary[ o.dictionary ];
			if ( !dic && !loading.effects[ `dictionary/${o.dictionary}` ] ) {
				dispatch( {
					type: `dictionary/get`,
					dictKey: o.dictionary,
					dispatch,
				} );
			}
			if ( dic ) {
				// noinspection JSAnnotator
				function __showValue( _value ) {
					const showItem = dic.find( d => String( d.dKey ) === String( _value ) );
					return showItem ? showItem.dValue : ( _value || '暂无' );
				}

				return {
					...o,
					render: ( text, record, index ) => {
						let value = text;

						if ( o.type === 'checkbox' || o.type === 'select' ) {
							if ( typeof value === 'string' ) {
								value = value.split( ',' );
							}
						}

						let showValue;

						if ( Array.isArray( value ) ) {
							showValue = value.map( __showValue ).join( ',' );
						} else {
							showValue = __showValue( value );
						}

						return customRender ? customRender( text, record, index, showValue ) : showValue;
					}
				};
			}
		}

		if ( customRender ) {
			return {
				...o,
				render: ( text, record, index ) => {
					return customRender( text, record, index );
				}
			}
		}

		return {
			...o,
			render: text => {
				if ( typeof text === 'string' ) {
					return text || '暂无';
				}

				return text;
			}
		};
	} );
};

/**
 * ComplexTable高阶组件
 * @param dispatch 派发函数
 * @param form 由Form.create生成的props对象，内部包含关于表单相关的功能是函数，具体请查看{@link https://ant.design/components/form-cn/}
 * @param originColumns table列
 * @param formFields table搜索字段
 * @param tableName table名称，用于本地存储table列
 * @param data table数据
 * @param loading table加载状态
 * @param tableActions table附加操作（新增等）。
 * @param columnSortable 是否需要多行选中
 * @param selectedRows 多选行
 * @param handleMenuClick 批量操作回调函数
 * @param setSelectedRows 设置多选行函数
 * @param rowMenuItems table多行批量操作
 * @param rowKey table 行key antd要求
 * @param bodyStyle card body 样式
 * @param restProps 剩余props
 * @param dictionary 字典
 * @param dictionaryLoading 字典加载状态
 * @param tableSearchParams table附加字段
 * @param title table名字
 * @returns {*}
 * @constructor
 */
const WrapperComplexTable = ( {
								  dispatch, loading, form, originColumns, formFields, tableName, data, tableActions, columnSortable, selectedRows, setSelectedRows, handleFormReset, tableTags = 
								  () => {
	}, rowMenuItems, rowKey, handleMenuClick, bodyStyle, dictionary, dictionaryLoading, title, tableSearchParams, ...restProps
							  } ) => {
	const { resetFields, } = form;

	const originTargetKeys = restProps.targetKeys;
	const { multipleSelection } = restProps;
	const { pagination, needUpdate, setNeedUpdate } = restProps;

	const [ columns, setColumns ] = useState( [ ...originColumns ] );
	const [ first, setFirst ] = useToggle( true );
	const [ targetKeys, setTargetKeys ] = useState( [ ...originTargetKeys ] );
	const [ sort, setSort ] = useState( undefined );

	/**
	 * 根据字典显示对应值
	 */
	useEffect( () => {
		if ( dictionaryLoading === false ) {
			const newOriginColumns = withDictionary( loading, dispatch, data )( originColumns )( dictionary );
			setColumns( newOriginColumns );
		}
	}, [ dictionary, data, originColumns, tableSearchParams, ] );

	useEffect( () => {
		if ( needUpdate ) {
			setNeedUpdate( false );
			doSearch( data.pagination );
		}
	}, [ needUpdate ] );

	/**
	 * 重置函数
	 */
	const handleFormReset1 = () => {
		resetFields();
		// zhouyan - 将重置按钮暴露出来，控制重置筛选项
		if (typeof handleFormReset !== 'undefined') {
			handleFormReset();
		} else {
			doSearch();
		}
	};

	const doSearch = ( pagination = { current: 1, pageSize: 10, } ) => {
		const { current, pageSize } = pagination;
		// 如果搜索字段的值为undefined或空字符串，则去掉这个字段提交。
		const newFields = transformRequestParams( { ...form.getFieldsValue() } );

		// 如果是第一次搜索，判断搜索条件是否含有默认值，如果有则手动加在参数中。
		if ( first ) {
			formFields.forEach( f => {
				if ( f.props.initialValue ) {
					newFields[ f.props.config.key ] = f.props.initialValue;
				}
			} );
			setFirst( false );
		}

		// 如果搜索字段是日期/时间类型，则转成字符串。
		formFields.filter( v => v.props.config.type === 'date' ).forEach( v => {
			const key = v.props.config.key;
			if ( newFields[ key ] ) newFields[ key ] = newFields[ key ].format( 'YYYY-MM-DD' );
		} );
		formFields.filter( v => v.props.config.type === 'dateTime' ).forEach( v => {
			const key = v.props.config.key;
			if ( newFields[ key ] ) newFields[ key ] = newFields[ key ].format( 'YYYY-MM-DD HH:mm:ss' );
		} );
		formFields.filter( v => v.props.config.type === 'rangeDate' ).forEach( v => {
			const key = v.props.config.key;
			const startDate = v.props.config.startDate || 'startDate';
			const endDate = v.props.config.endDate || 'endDate';
			if ( newFields[ key ] ) {
				// 如果选了日期，新增startDate和endDate两个字段传给后端。
				if ( newFields[ key ].length === 2 ) {
					newFields[ startDate ] = newFields[ key ][ 0 ].format( 'YYYY-MM-DD' );
					newFields[ endDate ] = newFields[ key ][ 1 ].format( 'YYYY-MM-DD' );
				}

				// 把rangeDate的formFields重置为undefined，便于提交接口前过滤掉。
				newFields[ key ] = undefined;
			}
		} );
		formFields.filter( v => v.props.config.type === 'rangeDateTime' ).forEach( v => {
			const key = v.props.config.key;
			const startDate = v.props.config.startDate || 'startDate';
			const endDate = v.props.config.endDate || 'endDate';
			if ( newFields[ key ] ) {
				// 如果选了日期，新增startDate和endDate两个字段传给后端。
				if ( newFields[ key ].length === 2 ) {
					newFields[ startDate ] = newFields[ key ][ 0 ].format( 'YYYY-MM-DD HH:mm:ss' );
					newFields[ endDate ] = newFields[ key ][ 1 ].format( 'YYYY-MM-DD HH:mm:ss' );
				}

				// 把rangeDate的formFields重置为undefined，便于提交接口前过滤掉。
				newFields[ key ] = undefined;
			}
		} );
		formFields.filter( v => v.props.config.type === 'time' ).forEach( v => {
			const key = v.props.config.key;
			if ( newFields[ key ] ) newFields[ key ] = newFields[ key ].format( 'HH:mm:00' );
		} );

		const moreParams = JSON.parse( tableSearchParams );

		dispatch( {
			type: `${tableName}/fetch`,
			payload: {
				params: {
					...moreParams,
					...newFields,
				},
				pagination: {
					current,
					pageSize,
				}
			},
		} );

		// 执行搜索清空选中行
		setSelectedRows && setSelectedRows( [] );
	};

	/**
	 * 搜索函数
	 * @param e
	 */
	const handleSearch = e => {
		e.preventDefault();

		const pagination = { current: 1, pageSize: 10, };

		doSearch( pagination );
	};

	/**
	 * 切换页码函数
	 * @param pagination 页码
	 * @param filters 过滤项
	 * @param sorter 排序项
	 */
		// eslint-disable-next-line no-unused-vars
	const handleTableChange = ( pagination, filters, sorter ) => {
			const { order } = sorter;

			if ( order ) {
				// setSort( sorter.column.title );
				setSort( sorter.column.key );
			} else {
				setSort( undefined );
			}

			const params = {
				current: pagination.current,
				pageSize: pagination.pageSize,
			};

			doSearch( params )
		};

	/**
	 * 组件渲染拉取数据
	 */
	useEffect( () => {
		resetFields();
	}, [ tableName, ] );

	useEffect( () => {
		doSearch();
	}, [ tableName, tableSearchParams, ] );

	/**
	 * 初始化是否需要展开功能
	 */
	const [ expand, setExpand ] = useState( () => {
		if ( formFields.length > 3 ) {
			return false;
		}

		return undefined;
	} );

	const tableLoading = loading.effects[ `${tableName}/fetch` ];

	return (
		<ComplexTable
			title={title}
			rowKey={rowKey}
			name={tableName} // table唯一标识，用于记录用户展示列习惯。
			data={data} // table数据
			loading={tableLoading || dictionaryLoading} // table加载loading
			columns={columns} // table展示列
			setColumns={setColumns} // 设置table展示列
			sort={sort}
			formFields={formFields} // 搜索表单项
			selectedRows={selectedRows}
			setSelectedRows={setSelectedRows}
			rowMenuItems={rowMenuItems}
			handleMenuClick={handleMenuClick}
			handleSearch={handleSearch} // 搜索
			handleFormReset={handleFormReset1} // 重置搜索表单
			expand={expand} // 搜索表单展开/收起
			setExpand={setExpand} // 设置搜索表单展开/收起
			handleTableChange={handleTableChange} // 切换页码
			columnSortable={columnSortable} // 是否需要自定义展示列
			targetKeys={targetKeys} // 默认展示列
			setTargetKeys={setTargetKeys} // 设置默认展示列
			tableActions={tableActions} // 表格操作
			bodyStyle={bodyStyle} // card body 样式
			scroll={restProps.scroll}
			multipleSelection={multipleSelection}
			pagination={pagination}
			tableTags={tableTags}
		/>
	);
};

export default connect( ( { global, dictionary, loading, } ) => ( {
	loading,
	global,
	dictionary,
	dictionaryLoading: loading.models.dictionary || false,
} ) )( WrapperComplexTable );
