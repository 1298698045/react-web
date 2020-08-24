import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { useEffectOnce } from 'react-use';
import { connect } from "dva";
import { Card, Table, Button, Form, Modal, Icon, Switch, message } from 'antd';
import FIELDS from "@/config/fields";
import EmployeeSelectModal from '@/pages/Common/EmployeeSelectModal';
import ServiceEditModal from './ServiceEditModal';
import ReceiptEditModal from './ReceiptEditModal';
import { getDictValue, queryDictionary } from '@/utils/dictionaryUtil';
import moment from "moment/moment";
import Privilege from '@/components/Privilege';

const OtherSetting = props => {
	const { dispatch, form, loading: { effects }, systemConfig: { other_setting }, dictionary, user: { currentUser } } = props;
	const { refund_approver = [], service_tel, receipt_title } = other_setting;
	const loading = effects[ 'systemConfig/queryOtherSetting' ];
	const [ departs, setDeparts ] = useState( [] );
	const [ employeeSelectVisible, setEmployeeSelectVisible ] = useState( false );
	const [ employeeSelectDepartId, setEmployeeSelectDepartId ] = useState( null );
	const [ serviceEditVisible, setServiceEditVisible ] = useState( false );
	const [ serviceEditLoading, setServiceEditLoading ] = useState( false );
	const [ serviceEditItem, setServiceEditItem ] = useState( {} );
	const [ receiptEditVisible, setReceiptEditVisible ] = useState( false );
	const [ receiptEditLoading, setReceiptEditLoading ] = useState( false );
	const [ receiptEditItem, setReceiptEditItem ] = useState( {} );

	useEffectOnce( () => {
		dispatch( {
			type: 'systemConfig/queryOtherSetting',
		} );
		queryDictionary( dispatch, 'depart_id_school' );
		queryDictionary( dispatch, 'employee_id' );
	}, [] );

	useEffect( () => {
		if (dictionary.depart_id_school) setDeparts( dictionary.depart_id_school );
	}, [ dictionary.depart_id_school ] );

	const columns_1 = [
		{
			title: '审核项目',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: '机构',
			dataIndex: 'depart',
			key: 'depart',
		},
		{
			title: '审核人',
			dataIndex: 'user',
			key: 'user',
		},
		{
			title: '操作',
			dataIndex: 'operation',
			key: 'operation',
		},
	];

	const dataSource_1 = departs.map( ( depart, index ) => {
		const employee = refund_approver.find( v => v.departId == depart.dKey ) || {};
		return {
			key: index,
			type: '退费审核',
			depart: getDictValue( dictionary, 'depart_id', depart.dKey ),
			user: getDictValue( dictionary, 'employee_id', employee.employeeId ),
			operation: [
				<Privilege privs={[ 'examiner_setting_edit' ]} key="examiner_setting_edit">
					<a key="select" onClick={() => {
						setEmployeeSelectDepartId( depart.dKey );
						setEmployeeSelectVisible( true );
					}} style={{ marginRight: 10 }}>设置</a>
				</Privilege>,
				<Privilege privs={[ 'delete_examiner_setting' ]} key="delete_examiner_setting">
					<a key="delete" onClick={() => Modal.confirm( {
						title: '确定要删除退费审核人吗？',
						okText: "确定",
						cancelText: "取消",
						onOk() {
							return setRefundApprover( {}, depart.dKey );
						},
						onCancel() {
						},
					} )}>删除</a>
				</Privilege>
			],
		};
	} );

	const columns_2 = [
		{
			...FIELDS.SYSTEM.SERVICE.TEL,
			dataIndex: FIELDS.SYSTEM.SERVICE.TEL.key,
		},
		{
			...FIELDS.SYSTEM.SERVICE.WORK_TIME,
			dataIndex: FIELDS.SYSTEM.SERVICE.WORK_TIME.key,
		},
		{
			...FIELDS.SYSTEM.SERVICE.OPERATOER,
			dataIndex: FIELDS.SYSTEM.SERVICE.OPERATOER.key,
		},
		{
			...FIELDS.SYSTEM.SERVICE.OPERATE_TIME,
			dataIndex: FIELDS.SYSTEM.SERVICE.OPERATE_TIME.key,
		},
		{
			title: '操作',
			dataIndex: 'operation',
			key: 'operation',
		},
	];

	const dataSource_2 = [
		service_tel[ FIELDS.SYSTEM.SERVICE.TEL.key ]
			? {
				key: '1',
				[ FIELDS.SYSTEM.SERVICE.TEL.key ]: service_tel[ FIELDS.SYSTEM.SERVICE.TEL.key ],
				[ FIELDS.SYSTEM.SERVICE.WORK_TIME.key ]: `${service_tel[ FIELDS.SYSTEM.SERVICE.ON_TIME.key ]}~${service_tel[ FIELDS.SYSTEM.SERVICE.OFF_TIME.key ]}`,
				[ FIELDS.SYSTEM.SERVICE.OPERATOER.key ]: service_tel[ FIELDS.SYSTEM.SERVICE.OPERATOER.key ],
				[ FIELDS.SYSTEM.SERVICE.OPERATE_TIME.key ]: service_tel[ FIELDS.SYSTEM.SERVICE.OPERATE_TIME.key ],
				operation:
					<Privilege privs={[ 'edit_custom_tel' ]} key="edit_custom_tel">
						<a onClick={() => {
							setServiceEditItem( service_tel );
							setServiceEditVisible( true );
						}}>修改</a>
					</Privilege>,
			} : {
				key: '1',
				operation:
					<Privilege privs={[ 'custom_tel_setting' ]} key="custom_tel_setting">
						<a onClick={() => {
							setServiceEditItem( service_tel );
							setServiceEditVisible( true );
						}}>设置</a>
					</Privilege>,
			},
	];

	const columns_3 = [
		{
			...FIELDS.SYSTEM.SERVICE.RECEIPT_TITLE,
			dataIndex: FIELDS.SYSTEM.SERVICE.RECEIPT_TITLE.key,
		},
		{
			...FIELDS.SYSTEM.SERVICE.OPERATOER,
			dataIndex: FIELDS.SYSTEM.SERVICE.OPERATOER.key,
		},
		{
			...FIELDS.SYSTEM.SERVICE.OPERATE_TIME,
			dataIndex: FIELDS.SYSTEM.SERVICE.OPERATE_TIME.key,
		},
		{
			title: '操作',
			dataIndex: 'operation',
			key: 'operation',
		},
	];
	const dataSource_3 = [
		receipt_title[ FIELDS.SYSTEM.SERVICE.RECEIPT_TITLE.key ]
			? {
				key: '1',
				[ FIELDS.SYSTEM.SERVICE.RECEIPT_TITLE.key ]: receipt_title[ FIELDS.SYSTEM.SERVICE.RECEIPT_TITLE.key ],
				[ FIELDS.SYSTEM.SERVICE.OPERATOER.key ]: receipt_title[ FIELDS.SYSTEM.SERVICE.OPERATOER.key ],
				[ FIELDS.SYSTEM.SERVICE.OPERATE_TIME.key ]: receipt_title[ FIELDS.SYSTEM.SERVICE.OPERATE_TIME.key ],
				operation:
					<Privilege privs={[ 'edit_custom_tel' ]} key="edit_custom_tel">
						<a onClick={() => {
							setReceiptEditItem( receipt_title );
							setReceiptEditVisible( true );
						}}>修改</a>
					</Privilege>,
			} : {
				key: '1',
				operation:
					<Privilege privs={[ 'custom_tel_setting' ]} key="custom_tel_setting">
						<a onClick={() => {
							setReceiptEditItem( receipt_title );
							setReceiptEditVisible( true );
						}}>设置</a>
					</Privilege>,
			},
	];

	const setRefundApprover = ( employee, departId ) => {
		const employeeId = employee[ FIELDS.EMPLOYEE.ID.key ] ? employee[ FIELDS.EMPLOYEE.ID.key ] + '' : '';
		// let employees = [];
		// if ( refund_approver.find( v => v.departId == employeeSelectDepartId ) ) {
		// 	employees = refund_approver.map( v => {
		// 		if ( v.departId == employeeSelectDepartId ) {
		// 			return {
		// 				departId: employeeSelectDepartId,
		// 				employeeId,
		// 			};
		// 		}
		// 		return v;
		// 	} );
		// } else {
		// 	employees = [ ...refund_approver, {
		// 		departId: employeeSelectDepartId,
		// 		employeeId,
		// 	} ];
		// }
		return dispatch( {
			type: 'systemConfig/setOtherSetting',
			payload: {
				key: 'refund_approver',
				value: JSON.stringify( [ {
					departId,
					employeeId,
				} ] ),
			},
		} ).then( () => {
			dispatch( {
				type: 'systemConfig/queryOtherSetting',
			} );
		} );
	};

	const setServiceTel = params => {
		return dispatch( {
			type: 'systemConfig/setOtherSetting',
			payload: {
				key: 'service_tel',
				value: JSON.stringify( {
					[ FIELDS.SYSTEM.SERVICE.TEL.key ]: params[ FIELDS.SYSTEM.SERVICE.TEL.key ],
					[ FIELDS.SYSTEM.SERVICE.ON_TIME.key ]: params[ FIELDS.SYSTEM.SERVICE.ON_TIME.key ].format( 'HH:mm' ),
					[ FIELDS.SYSTEM.SERVICE.OFF_TIME.key ]: params[ FIELDS.SYSTEM.SERVICE.OFF_TIME.key ].format( 'HH:mm' ),
					[ FIELDS.SYSTEM.SERVICE.OPERATOER.key ]: currentUser.realname,
					[ FIELDS.SYSTEM.SERVICE.OPERATE_TIME.key ]: moment().format( 'YYYY-MM-DD HH:mm:ss' ),
				} ),
			},
		} ).then( () => {
			dispatch( {
				type: 'systemConfig/queryOtherSetting',
			} );
		} );
	};

	const setReceiptTitle = params => {
		return dispatch( {
			type: 'systemConfig/setOtherSetting',
			payload: {
				key: 'receipt_title',
				value: JSON.stringify( {
					[ FIELDS.SYSTEM.SERVICE.RECEIPT_TITLE.key ]: params[ FIELDS.SYSTEM.SERVICE.RECEIPT_TITLE.key ],
					[ FIELDS.SYSTEM.SERVICE.OPERATOER.key ]: currentUser.realname,
					[ FIELDS.SYSTEM.SERVICE.OPERATE_TIME.key ]: moment().format( 'YYYY-MM-DD HH:mm:ss' ),
				} ),
			},
		} ).then( () => {
			dispatch( {
				type: 'systemConfig/queryOtherSetting',
			} );
		} );
	};

	return (
		<Fragment>
			<Card loading={loading} title="审核人设置" style={{ marginBottom: 24 }}>
				<Table dataSource={dataSource_1} columns={columns_1} pagination={false}/>
			</Card>

			<Card loading={loading} title="客服电话设置" style={{ marginBottom: 24 }}>
				<Table dataSource={dataSource_2} columns={columns_2} pagination={false}/>
			</Card>

			<Card loading={loading} title="收据设置" style={{ marginBottom: 24 }}>
				<Table dataSource={dataSource_3} columns={columns_3} pagination={false}/>
			</Card>

			<EmployeeSelectModal
				visible={employeeSelectVisible}
				setVisible={setEmployeeSelectVisible}
				tableSearchParams={{ [ FIELDS.EMPLOYEE.LEAVING.key ]: 0 }}
				onSelect={e => setRefundApprover( e, employeeSelectDepartId )}
			/>

			<ServiceEditModal
				selectedRow={serviceEditItem}
				visible={serviceEditVisible}
				setVisible={setServiceEditVisible}
				loading={serviceEditLoading}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					setServiceEditLoading( true );
					setServiceTel( fieldsValue ).then( data => {
						if ( data !== false ) {
							setServiceEditLoading( false );
							setServiceEditVisible( false );
						}
					} );
				}}
			/>

			<ReceiptEditModal
				selectedRow={receiptEditItem}
				visible={receiptEditVisible}
				setVisible={setReceiptEditVisible}
				loading={receiptEditLoading}
				onSubmit={fieldsValue => {
					console.log( fieldsValue );
					setReceiptEditLoading( true );
					setReceiptTitle( fieldsValue ).then( data => {
						if ( data !== false ) {
							setReceiptEditLoading( false );
							setReceiptEditVisible( false );
						}
					} );
				}}
			/>
		</Fragment>
	);
};

export default connect( (
	{
		systemConfig,
		user,
		dictionary,
		loading,
		global
	}
) => (
	{
		systemConfig,
		user,
		dictionary,
		loading,
		global,
	}
) )( Form.create()( OtherSetting ) );