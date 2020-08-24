import React from 'react';
import { useToggle, useEffectOnce } from 'react-use';
import { connect } from 'dva';
import {
	Form,
	Button,
	Card,
} from 'antd';
import WithTableName from '@/components/HOC/WithTableName';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import SettingModal from './SettingModal';
import { queryDictionary } from '@/utils/dictionaryUtil';
import moment from 'moment';
import Privilege from '@/components/Privilege';

const tableName = 'financeWagePerformanceDataReportList';

const PerformanceDataReport = props => {
	const { form, dispatch, dictionary, loading, } = props;
	const [ settingModalVisible, toggleSettingModalVisible ] = useToggle( false );
	const [ needUpdate, setNeedUpdate ] = useToggle( false );
	
	useEffectOnce( () => {
		queryDictionary( dispatch, 'employee_id' );
	} );
	
	const originColumns = [
		{
			title: '序号',
			key: 'key',
		},
		FIELDS.FINANCE.WAGE_TIME,
		{
			title: '时间范围',
			key: 'timeRage',
			customRender: ( text, record, ) => {
				return `${record.startDate} ~ ${record.endDate}`
			}
		},
		{
			title: '员工人数',
			key: 'total',
		},
		{
			title: '导出人',
			key: 'creator',
			customRender: text => {
				if ( text && dictionary[ FIELDS.EMPLOYEE.ID.dictionary ] ) {
					const employee = dictionary[ FIELDS.EMPLOYEE.ID.dictionary ].find( ( { uid } ) => String( uid ) === String( text ) );
					
					if ( employee ) {
						return employee.name;
					}
				}
				return '管理员';
			}
		},
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record, ) => {
				return (
					<Privilege privs={[ 'performance_data_report_download' ]}  noMatch={'下载'}>
					<a href={record.excel}>下载</a></Privilege>
				)
			},
		},
	];
	
	const tableActions = [
		<Privilege privs={[ 'performance_data_report_generate' ]} key="performance_data_report_generate">
		<Button
			key="add-button"
			icon="download"
			htmlType="button"
			type="primary"
			onClick={() => {
				toggleSettingModalVisible( true );
			}}>生成绩效报表</Button></Privilege>,
	];
	
	const exportLoading = loading.effects[ `${tableName}/exportList` ];
	
	const onChange = ( key, value ) => {
		if ( key === 'dateRadio' ) {
			let range;
			if ( value === '0' ) {
				// 上月
				range = [ moment().subtract( 1, 'month' ).startOf( 'month' ), moment().subtract( 1, 'month' ).endOf( 'month' ) ];
			} else if ( value === '1' ) {
				// 今天
				range = [ moment(), moment() ];
			} else if ( value === '2' ) {
				// 今天
				range = [ moment().subtract( 6, 'days' ), moment() ];
			} else if ( value === '3' ) {
				// 今天
				range = [ moment().subtract( 29, 'days' ), moment() ];
			}
			
			form.setFieldsValue( {
				[ FIELDS.FINANCE.WAGE_TIME.key ]: range,
			} );
		} else if ( key === FIELDS.FINANCE.WAGE_TIME.key ) {
			if ( value && value.length === 2 ) {
				const startDate = value[ 0 ].format( 'YYYY-MM-DD' );
				const endDate = value[ 1 ].format( 'YYYY-MM-DD' );
				if ( startDate === moment().subtract( 1, 'month' ).startOf( 'month' ).format( 'YYYY-MM-DD' ) && endDate === moment().subtract( 1, 'month' ).endOf( 'month' ).format( 'YYYY-MM-DD' ) ) {
					// 上月
					form.setFieldsValue( {
						dateRadio: '0'
					} );
				} else if ( startDate === moment().format( 'YYYY-MM-DD' ) && endDate === moment().format( 'YYYY-MM-DD' ) ) {
					// 今天
					form.setFieldsValue( {
						dateRadio: '1'
					} );
				} else if ( startDate === moment().subtract( 6, 'days' ).format( 'YYYY-MM-DD' ) && endDate === moment().format( 'YYYY-MM-DD' ) ) {
					// 7天
					form.setFieldsValue( {
						dateRadio: '2'
					} );
				} else if ( startDate === moment().subtract( 29, 'days' ).format( 'YYYY-MM-DD' ) && endDate === moment().format( 'YYYY-MM-DD' ) ) {
					// 30天
					form.setFieldsValue( {
						dateRadio: '3'
					} );
				}
			}
		}
	};
	
	return (
		<Card>
			<WithTableName
				{...props}
				bodyStyle={{ padding: 0, }}
				tableName={tableName}
				tableActions={tableActions}
				originColumns={originColumns}
				scroll={{ x: 'max-content' }}
				needUpdate={needUpdate}
				setNeedUpdate={setNeedUpdate}
				formFields={[
					<WrapperComplexFormItem
						config={FIELDS.FINANCE.WAGE_TIME}
						form={form}
						onChange={onChange}
						col={9}
					/>,
					<WrapperComplexFormItem
						config={{
							key: 'dateRadio',
							type: 'radio'
						}}
						mode="button"
						values={[
							{ dKey: '0', dValue: '上月' },
							{ dKey: '1', dValue: '今天' },
							{ dKey: '2', dValue: '7天' },
							{ dKey: '3', dValue: '30天' },
						]}
						onChange={onChange}
						form={form}
					/>
				]}
			/>
			<SettingModal
				afterClose={() => setNeedUpdate( true )}
				handleSubmit={fieldsValue => {
					dispatch( {
						type: `${tableName}/exportList`,
						payload: {
							params: {
								...fieldsValue,
							},
						},
					} ).then( data => {
						if ( data !== false ) toggleSettingModalVisible( false );
					} );
				}}
				visible={settingModalVisible}
				setVisible={toggleSettingModalVisible}
				loading={exportLoading}
			/>
		</Card>
	);
};

export default connect( (
	{
		[ tableName ]: data1,
		loading,
		global,
		signUp,
		dictionary,
	}
) => (
	{
		[ tableName ]: data1,
		loading,
		global,
		signUp,
		dictionary,
	}
) )( Form.create()( PerformanceDataReport ) );
