import React, { memo, useState, useMemo, } from 'react';
import { useToggle, } from 'react-use';
import { connect } from 'dva';
import {
	Form,
	Button,
	Card,
	message,
	Switch,
} from 'antd';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { refreshDictionary } from '@/utils/dictionaryUtil';
import Privilege from '@/components/Privilege';
import EditModal from './EditModal';

const tableName = 'valueAddedList';

const fields = [
	FIELDS.VALUE_ADDED.STATUS,
	FIELDS.VALUE_ADDED.KEYWORD,
];

const Index = props => {
	const { form, dispatch, loading, } = props;
	const [ editModalVisible, toggleEditModalVisible ] = useToggle( false );
	const [ valueAddedInfo, setValueAddedInfo ] = useState( {} );
	const [ needUpdate, setNeedUpdate ] = useToggle( false );
	
	const switchLoading = loading.effects[ `${tableName}/switchValueAdded` ] || false;
	const saveLoading = loading.effects[ `${tableName}/saveValueAdded` ] || false;
	
	const changeValueAdd = ( { id, status, } ) => {
		dispatch( {
			type: `${tableName}/switchValueAdded`,
			payload: {
				id,
				status: String( status ) === '1' ? '0' : '1',
			},
		} ).then( () => {
			refreshDictionary( dispatch, 'value_added' );
			dispatch( {
				type: `${tableName}/refresh`,
			} );
		} );
	};
	
	const saveValueAdd = data => {
		dispatch( {
			type: `${tableName}/saveValueAdded`,
			payload: {
				...data
			},
		} ).then( data => {
			if ( data !== false ) {
				refreshDictionary( dispatch, 'value_added' );
				toggleEditModalVisible( false );
			}
		} );
	};
	
	const originColumns = [
		{
			title: '序号',
			key: 'key',
		},
		FIELDS.VALUE_ADDED.TITLE,
		FIELDS.VALUE_ADDED.DESCRIPTION,
		{
			...FIELDS.VALUE_ADDED.AMOUNT,
			title: `${FIELDS.VALUE_ADDED.AMOUNT.title}（元）`
		},
		FIELDS.VALUE_ADDED.CREATE_TIME,
		{
			...FIELDS.VALUE_ADDED.STATUS,
			customRender: ( text, record ) => {
				const status = String( text ) === '1';
				return (
					<Privilege privs={[ 'valueadded_service_swtich' ]} noMatch={text === 1 ? '启用' : '关闭'}>
						<Switch
							checked={status}
							loading={switchLoading}
							onChange={() => changeValueAdd( record )}
						/>
					</Privilege>
				)
			}
		},
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record, ) => {
				return (
					<Privilege privs={[ 'valueadded_service_edit' ]} noMatch={'编辑'}>
						<a
							key="edit"
							onClick={() => {
								if ( record.using === 1 || record.status === 1 ) {
									message.info( '只有停用状态且未被占用的增值服务才可以编辑修改' );
									return false;
								}
								setValueAddedInfo( record );
								toggleEditModalVisible( true )
							}}
						>编辑</a>
					</Privilege>
				)
			}
		},
	];
	
	const tableActions = [
		<Privilege privs={[ 'valueadded_service_add' ]} key="valueadded_service_add" noMatch={'新增'}>
		<Button
			key="plus-button"
			icon="plus"
			htmlType="button"
			type="primary"
			onClick={() => {
				setValueAddedInfo( {} );
				toggleEditModalVisible( true )
			}}>新增</Button></Privilege>,
	];
	
	const formFields = useMemo( () => {
		return fields.map( f => (
			<WrapperComplexFormItem
				config={f}
				form={form}
			/>
		) );
	}, [ form ] );
	
	const p = {
		[ tableName ]: props[ tableName ],
	};
	
	return (
		<PageHeaderWrapper
			title="增值服务管理"
		>
			<Card>
				<WithTableName
					{...p}
					form={form}
					dispatch={dispatch}
					loading={loading}
					needUpdate={needUpdate}
					setNeedUpdate={setNeedUpdate}
					bodyStyle={{ padding: 0, }}
					tableName={tableName}
					tableActions={tableActions}
					originColumns={originColumns}
					columnSortable={false}
					scroll={{ x: 'max-content' }}
					formFields={formFields}
				/>
				<EditModal
					afterClose={() => {
						dispatch( {
							type: `${tableName}/refresh`,
						} );
					}}
					handleSubmit={fieldsValue => saveValueAdd( fieldsValue )}
					loading={saveLoading}
					data={valueAddedInfo}
					visible={editModalVisible}
					setVisible={toggleEditModalVisible}
				/>
			</Card>
		</PageHeaderWrapper>
	);
};

export default connect( (
	{
		[ tableName ]: data1,
		loading,
		dictionary,
	}
) => (
	{
		[ tableName ]: data1,
		loading,
		dictionary,
	}
) )( Form.create()( memo( Index ) ) );
