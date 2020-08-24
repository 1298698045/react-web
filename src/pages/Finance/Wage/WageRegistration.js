import React from 'react';
import { useToggle, useGetSet, useEffectOnce } from 'react-use';
import numeral from 'numeral';
import router from 'umi/router';
import { connect } from 'dva';
import {
	Form,
	Button,
	Card,
	Typography,
} from 'antd';
import WithTableName from '@/components/HOC/WithTableName';
// import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import InfoModal from './InfoModal';
import moment from 'moment';
import UploadModal from './UploadModal';
import FIELDS from '@/config/fields';
import { queryDictionary } from '@/utils/dictionaryUtil';
import Privilege from '@/components/Privilege';

const { Text, } = Typography;

const tableName = 'financeWageRegistrationList';

const minYear = 2000;
const maxYear = moment().format( 'YYYY' );
const yearValues = [ { dKey: '-1', dValue: '全部' } ];
for ( let i = maxYear; i >= Number( minYear ); i -= 1 ) {
	yearValues.push( {
		dKey: String( i ),
		dValue: String( i ),
	} );
}

const minMonth = 1;
const maxMonth = 12;
const monthValues = [ { dKey: '-1', dValue: '全部' } ];
for ( let i = maxMonth; i >= Number( minMonth ); i -= 1 ) {
	monthValues.push( {
		dKey: String( i ),
		dValue: String( i ),
	} );
}

const WageRegistration = props => {
	const { form, dispatch, [ tableName ]: tableData, loading, dictionary } = props;
	
	const [ infoModalVisible, toggleInfoModalVisible ] = useToggle( false );
	const [ uploadModalVisible, toggleUploadModalVisible ] = useToggle( false );
	const [ needUpdate, setNeedUpdate ] = useToggle( false );
	const [ getInfo, setInfo ] = useGetSet( {} );
	
	// const deleteLoading = loading.effects[ `${tableName}/del` ] || false;
	// const getInfoLoading = loading.effects[ `${tableName}/getInfo` ] || false;
	
	useEffectOnce( () => {
		queryDictionary( dispatch, 'employee_id' );
	} );
	
	const originColumns = [
		{
			title: '序号',
			key: 'key',
		},
		{
			title: '归属月份',
			key: 'month',
			customRender: ( text, record, ) => {
				return `${record.year}-${record.month < 10 ? `0${record.month}` : record.month}`;
			}
		},
		{
			title: '登记时间',
			key: 'modifyTime',
		},
		{
			title: '登记人',
			key: 'creator',
			customRender: text => {
				if ( dictionary[ FIELDS.EMPLOYEE.ID.dictionary ] ) {
					const item = dictionary[ FIELDS.EMPLOYEE.ID.dictionary ].find( ( { uid } ) => {
						return String( uid ) === String( text )
					} );
					
					if ( item ) {
						return item.name;
					}
				}
				
				return '管理员';
			}
		},
		{
			title: '应发工资(元)',
			key: 'finalSalary',
			customRender: text => {
				return numeral( text ).format( '0,0' )
			}
		},
		{
			title: '操作',
			key: 'actions',
			customRender: ( text, record, ) => {
				const { year, month, } = record;
				// return [
				// 	<a
				// 		key="info"
				// 		onClick={() => {
				// 			setInfo({year,month,});
				// 			toggleInfoModalVisible( true );
				// 		}}
				// 	>详情</a>,
				// 	<Divider key="divider" type="vertical"/>,
				// 	<Popconfirm
				// 		key="delete"
				// 		title="确定删除此条记录么？"
				// 		onConfirm={() => {
				// 			dispatch( {
				// 				type: `${tableName}/del`,
				// 				payload: {
				// 					params: {
				// 						id,
				// 					}
				// 				},
				// 			} ).then( () => setNeedUpdate( true ) );
				// 		}}>
				// 		<a>{deleteLoading && <Spin size="small"/>} 删除</a>
				// 	</Popconfirm>
				// ]
				return (
					<Privilege privs={[ 'salary_check_detail' ]}  noMatch={'详情'}>
					<a
						key="info"
						onClick={() => {
							setInfo( { year, month, } );
							toggleInfoModalVisible( true );
						}}
					>详情</a></Privilege>
				)
			}
		}
	];
	
	const { total = 0 } = tableData;
	
	const tableActions = [
		<Text key="total" strong
		      style={{ marginRight: 10, }}>{`工资总额：${numeral( total ).format( '0,0' )}元`}</Text>,
		<Privilege privs={[ 'salary_check_import' ]} key="salary_check_import">
		<Button
			key="upload-button"
			icon="upload"
			htmlType="button"
			type="primary"
			onClick={() => toggleUploadModalVisible( true )}>导入Excel</Button></Privilege>,
		<Privilege privs={[ 'salary_check_download' ]} key="salary_check_download">
		<Button
			key="download-button"
			icon="download"
			htmlType="button"
			type="default"
			onClick={() => {
				// toggleReportModalVisible( true );
				router.push( '/user-center/template-download' );
			}}>下载模板</Button></Privilege>,
	];
	
	
	return (
		<Card>
			<WithTableName
				{...props}
				bodyStyle={{ padding: 0, }}
				tableName={tableName}
				originColumns={originColumns}
				tableActions={tableActions}
				needUpdate={needUpdate}
				setNeedUpdate={setNeedUpdate}
				multipleSelection={false}
				scroll={{ x: 'max-content' }}
				formFields={[
					<WrapperComplexFormItem
						config={{
							title: '归属年份',
							key: 'year',
							// type: 'inputNumber'
							type: 'select'
						}}
						form={form}
						values={yearValues}
						initialValue={maxYear}
						// min={2000}
						// max={Number( year )}
					/>,
					<WrapperComplexFormItem
						config={{
							title: '归属月份',
							key: 'month',
							// type: 'inputNumber'
							type: 'select'
						}}
						form={form}
						values={monthValues}
						initialValue="-1"
						// min={1}
						// max={12}
					/>,
				]}
			/>
			<UploadModal
				loading={loading}
				afterClose={() => setNeedUpdate( true )}
				visible={uploadModalVisible}
				setVisible={toggleUploadModalVisible}
				dispatch={dispatch}
			/>
			<InfoModal
				data={getInfo()}
				visible={infoModalVisible}
				setVisible={toggleInfoModalVisible}
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
) )( Form.create()( WageRegistration ) );
