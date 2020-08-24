import React from 'react';
import { Form, Modal, } from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import WithTableName from '@/components/HOC/WithTableName';
import { connect } from 'dva';

const tableName = 'studentCoachLocalList';

const ChangeCoachModal = props => {
	const { visible, setVisible, form, data, dispatch, afterClose, dictionary, } = props;
	
	const originColumns = [
		{
			title: '序号',
			key: 'key',
		},
		FIELDS.STUDENT.NAME,
		FIELDS.STUDENT.MOBILE,
		FIELDS.STUDENT.DEPART_ID,
		FIELDS.STUDENT.TEACH_KM,
		FIELDS.TEACHING.CLASS.BOOK_NUM,
		FIELDS.EMPLOYEE.COACH_INFO.CARS,
		{
			title: '现有学员',
			key: 'studentNum',
		},
		{
			title: '操作',
			key: 'action',
			customRender: ( text, record ) => <a onClick={
				() => {
					dispatch( {
						type: 'student/changeCoach',
						payload: {
							params: {
								// id: data.length > 1 ? data.map( v => v.id ).join( ',' ) : data[ 0 ].id,
								studentId: data.length > 1 ? data.map( v => v.studentId ).join( ',' ) : data[ 0 ].studentId,
								[ `${form.getFieldValue( FIELDS.STUDENT.KM.key )}CoachId` ]: record.employeeId,
							}
						}
					} ).then( () => {
						setVisible( false );
					} );
				}
			}>绑定</a>
		}
	];
	
	const currentClass = data[ 0 ] && dictionary[ FIELDS.STUDENT.CLASS_ID.dictionary ] && dictionary[ FIELDS.STUDENT.CLASS_ID.dictionary ].find( ( { dKey } ) => dKey === String( data[ 0 ][ FIELDS.STUDENT.CLASS_ID.key ] ) );
	
	return (
		<Modal
			afterClose={afterClose}
			title={`更换教练 - ${data.length >= 1 && data.map( d => `【${d[ FIELDS.STUDENT.NAME.key ]}】` ).join( ',' )}`}
			visible={visible}
			width="90%"
			destroyOnClose
			onCancel={() => setVisible( false )}
			closable={true}
			maskClosable={false}
			keyboard={false}
		>
			<WithTableName
				{...props}
				bodyStyle={{ padding: 0, }}
				tableName={tableName}
				columnSortable={false}
				originColumns={originColumns}
				tableSearchParams={
					data.length >= 1
						?
						{
							studentCount: 1,
							teachLicense: data[ 0 ][ FIELDS.STUDENT.LICENSE_TYPE.key ],
							bookNum: currentClass ? currentClass.bookNum : '',
						}
						:
						{}
				}
				formFields={[
					<WrapperComplexFormItem
						config={{
							...FIELDS.STUDENT.KM,
							title: '绑定科目',
						}}
						initialValue="km2"
						values={[
							{
								dKey: 'km2',
								dValue: '科目二',
							},
							{
								dKey: 'km3',
								dValue: '科目三',
							}
						]}
						rules={[ { required: true, } ]}
						form={form}
					/>,
					<WrapperComplexFormItem
						config={FIELDS.STUDENT.SITE_ID}
						form={form}
					/>,
					<WrapperComplexFormItem
						config={{
							...FIELDS.STUDENT.QUICK_SEARCH,
							title: '教练姓名',
							placeholder: '教练姓名/手机号'
						}}
						form={form}
					/>,
				]}
			/>
		</Modal>
	);
};

export default connect( (
	{
		[ tableName ]: data1,
		loading,
		global,
		dictionary,
	}
) => (
	{
		[ tableName ]: data1,
		loading,
		global,
		dictionary,
	}
) )( Form.create()( ChangeCoachModal ) );
