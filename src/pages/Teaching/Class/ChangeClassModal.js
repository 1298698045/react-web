import React, { useState, useEffect } from 'react';
import { Form, Modal, Col, Row, Divider, Checkbox, Tag } from 'antd';
import numeral from 'numeral';
import { connect } from 'dva';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import { useGetSet, useToggle } from 'react-use';
import { getDictValue, queryDictionary } from '@/utils/dictionaryUtil';
import WithTableName from '@/components/HOC/WithTableName';
import style from './index.less';

const tableName = 'changeClassStudents'

const ChangeClassModal = props => {
	const { handleSubmit, visible, setVisible, form, selectItem = {}, dictionary, afterClose, loading, } = props;
	const [ getClassValues, setClassValues ] = useGetSet( [] );
	const [ selectedRows, setSelectedRows ] = useState( [] );
	const [ changeAll, setChangeAll ] = useState( '2' );
	const [ tableNeedUpdate, setTableNeedUpdate ] = useToggle( false );
	const [ rowSelection, setRowSelection ] = useToggle( false );
	useEffect( () => {
		if ( visible ) {
			let classList = dictionary[ FIELDS.STUDENT.CLASS_ID_ACTIVE.dictionary ].filter( one => {
				return one.dKey * 1 !== selectItem.id * 1
					&& one.licenseType === selectItem.licenseType
					&& one.payType === selectItem.payType
					&& one.status * 1 === 1;
			} );
			setClassValues( classList );
		}
	}, [ visible, dictionary[ FIELDS.STUDENT.CLASS_ID_ACTIVE.dictionary ] ] );
	// 学习中
	const tableColumns = [
		FIELDS.STUDENT.NAME,
		FIELDS.STUDENT.MOBILE,
		FIELDS.STUDENT.KM1_STATUS,
		FIELDS.STUDENT.KM2_STATUS,
		FIELDS.STUDENT.KM3_STATUS,
		FIELDS.STUDENT.KM4_STATUS,
		{
			...FIELDS.STUDENT.COACH_ID,
			title: '当前教练',
			customRender: ( text, record ) => {
				const { km2CoachId, km3CoachId } = record;
				return <>
					{km2CoachId !== 0 &&
					<Tag
						className={style.tag}>{`科目二：${getDictValue( dictionary, FIELDS.ASSET.EMPLOYEE_ID.dictionary, String( km2CoachId ) )}`}</Tag>}
					{km3CoachId !== 0 &&
					<Tag
						className={style.tag}>{`科目三：${getDictValue( dictionary, FIELDS.ASSET.EMPLOYEE_ID.dictionary, String( km3CoachId ) )}`}</Tag>}
					{km2CoachId === 0 && km3CoachId === 0 && '暂无'}
				</>
			}
		},
		FIELDS.STUDENT.DEPART_ID
	];
	const submit = e => {
		e.preventDefault();

		form.validateFields( ( err, fieldsValue ) => {
			if ( err ) {
				return false;
			}
			console.log( selectItem )
			let p = {
				changeAll: changeAll,
				studentIds: selectedRows ? selectedRows.map( one => one.studentId ).join( ',' ) : '',
				isCancel: fieldsValue[ FIELDS.STUDENT.IS_CANCEL.key ],
				destClassId: fieldsValue.destClassId,
				originalClassId: selectItem.id,
			}
			if ( !selectedRows && changeAll === '2' ) {
				Modal.confirm( {
					title: '提示',
					content: '确定原有班型得学员不更换到新班型下吗?',
					okText: '确认',
					cancelText: '取消',
					onOk: () => {
						handleSubmit( p );
					},
				} );
			} else {
				handleSubmit( p );
			}
		} );
	};
	const onChange = ( e ) => {
		setChangeAll( e.target.checked ? '1' : '2' )
		if ( changeAll === '2' ) {
			setSelectedRows( undefined )
		} else {
			setSelectedRows( [] )
		}

	}
	// 操作按钮
	const tableActions = [
		<Checkbox key="onChange" onChange={onChange}>全部更换</Checkbox>
	];
	return (
		<Modal
			title={`学员变更班型`}
			visible={visible}
			afterClose={afterClose}
			width={'90%'}
			onOk={submit}
			destroyOnClose
			onCancel={() => setVisible( false )}
			closable={true}
			maskClosable={false}
			keyboard={false}
		>
			<p style={{ color: '#fc541b' }}>注：这里给学员变更班型不走财务流程，确认更换后新班型将立即生效，不影响历史数据；</p>
			<Form onSubmit={submit}>
				{
					visible && <Row gutter={{ xs: 8, sm: 16, md: 20, }}>
						<Col md={8} sm={24}>
							<Form.Item label="当前班型">
								<span className="ant-form-text">{selectItem.title}</span>
							</Form.Item>
						</Col>
						<Col md={8} sm={24}>
							<WrapperComplexFormItem
								config={{
									...FIELDS.STUDENT.CLASS_ID_ACTIVE,
									key: 'destClassId',
									title: '新班型',
								}}
								form={form}
								rules={[ { required: true, } ]}
								values={getClassValues()}
							/>
						</Col>
						<Col md={8} sm={24}>
							<WrapperComplexFormItem
								config={FIELDS.STUDENT.IS_CANCEL}
								rules={[ { required: true, } ]}
								form={form}
								initialValue="0"
								values={[
									{
										dKey: '1',
										dValue: '是',
									},
									{
										dKey: '0',
										dValue: '否',
									},
								]}
							/>
						</Col>
					</Row>
				}
			</Form>
			<Divider dashed/>
			<WithTableName bodyStyle={{ padding: 0 }}
			               tableActions={tableActions}
			               {...props}
			               tableName={tableName}
			               originColumns={tableColumns}
			               tableSearchParams={
				               {
					               studentStatus: 4,
					               classId: selectItem.id
				               }
			               }
			               scroll={{ x: 'max-content' }}
			               selectedRows={changeAll === '2' ? selectedRows : undefined}
			               setSelectedRows={setSelectedRows}
			               columnSortable={false}
			               needUpdate={tableNeedUpdate}
			               setNeedUpdate={setTableNeedUpdate}
			/>

		</Modal>
	);
};
export default connect( (
	{
		[ tableName ]: data,
		loading,
		global,
		user
	}
) => (
	{
		[ tableName ]: data,
		loading,
		global,
		user
	}
) )( Form.create()( ChangeClassModal ) );
