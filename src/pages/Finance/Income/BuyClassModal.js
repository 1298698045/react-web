import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { Form, Modal, Col, Row, AutoComplete, } from 'antd';
import FIELDS from '@/config/fields';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import { getDictItem, queryDictionary } from '@/utils/dictionaryUtil';
const { Option } = AutoComplete;

const BuyClassModal = props => {
	const { handleSubmit, visible, setVisible, form, loading, dispatch, tableName, dictionary, afterClose, } = props;
	const [ dataSource, setDataSource ] = useState( [] );
	const [ studentId, setStudentId ] = useState( [] );
	const [ classId, setClassId ] = useState( undefined );
	const [ fee, setFee ] = useState( {
		k2Fee: 0,
		k3Fee: 0,
	} );
	
	
	useEffect( () => {
		queryDictionary( dispatch, 'class_id' );
	}, [] );
	
	useEffect( () => {
		const item = getDictItem( dictionary, 'class_id', classId );
		if ( item ) {
			setFee( {
				k2Fee: item[ FIELDS.TEACHING.CLASS.FEE_KM2.key ],
				k3Fee: item[ FIELDS.TEACHING.CLASS.FEE_KM3.key ],
			} )
		}
	}, [ classId ] );
	
	const submit = e => {
		e.preventDefault();
		
		form.validateFields( ( err, fieldsValue ) => {
			// if ( err ) {
			// 	return false;
			// }
			
			const km2LessonAmount = fee.k2Fee * form.getFieldValue( FIELDS.FINANCE.KM2_LESSON.key ) || 0;
			const km3LessonAmount = fee.k3Fee * form.getFieldValue( FIELDS.FINANCE.KM3_LESSON.key ) || 0;
			const total = km2LessonAmount + km3LessonAmount;
			handleSubmit( {
				...fieldsValue,
				studentId: studentId,
				km2LessonAmount,
				km3LessonAmount,
				total,
			} );
		} );
	};
	
	function onSelect ( value ){
		let arr = value.split('_')
		setClassId(arr[1] * 1)
		setStudentId( arr[0] );
	}
	
	//todo 购买课时对接口，从字段中拿课时单价。
	const handleSearch = debounce( value => {
		dispatch( {
			type: `${tableName}/search`,
			payload: value,
		} ).then( res => {
			const { list } = res;
			console.log(list)
			setDataSource( list );
		} );
	}, 500 );
	
	const renderOption = (item) => {
		return (
		  <Option key={item.id} text={item.name} value={item.studentId + '_' + item.classId}>{item.name}</Option>
		); 
	  }
	return (
		<Modal
			title="购买课时"
			visible={visible}
			onOk={submit}
			afterClose={afterClose}
			destroyOnClose
			confirmLoading={loading}
			onCancel={() => setVisible( false )}
			closable={true}
			maskClosable={false}
			keyboard={false}
		>
			<Form onSubmit={submit}>
				<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
					<Col sm={24}>
						<Form.Item label="查找学员" required>
							<AutoComplete
								dataSource={dataSource.map(renderOption)}
								onSelect={onSelect}
								onSearch={handleSearch}
								placeholder="请输入学员姓名/手机号"
								optionLabelProp="text"
							/>
						</Form.Item>
					</Col>
					<Col sm={12}>
						<WrapperComplexFormItem
							config={FIELDS.FINANCE.KM2_LESSON}
							addonAfter={`课时 ${fee.k2Fee * form.getFieldValue( FIELDS.FINANCE.KM2_LESSON.key ) || 0}元`}
							form={form}
							initialValue={0}
							rules={[ { required: true, } ]}
							{...props}
						/>
					</Col>
					<Col sm={12}>
						<WrapperComplexFormItem
							config={FIELDS.FINANCE.KM3_LESSON}
							addonAfter={`课时 ${fee.k3Fee * form.getFieldValue( FIELDS.FINANCE.KM3_LESSON.key ) || 0}元`}
							initialValue={0}
							form={form}
							rules={[ { required: true, } ]}
							{...props}
						/>
					</Col>
				</Row>
				<Row gutter={{ xs: 8, sm: 16, md: 20, }}>
					<Col
						sm={24}>总费用：{(fee.k2Fee * form.getFieldValue( FIELDS.FINANCE.KM2_LESSON.key ) || 0) + (fee.k3Fee * form.getFieldValue( FIELDS.FINANCE.KM3_LESSON.key ) || 0)}元</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default Form.create()( BuyClassModal );
