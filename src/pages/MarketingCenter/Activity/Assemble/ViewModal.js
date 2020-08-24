import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { useToggle, } from 'react-use';
import { connect } from "dva";
import { Form, Modal, Col, Row, Card, Upload, Button, message, Collapse, Spin } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import WithTableName from '@/components/HOC/WithTableName';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";
const tableName = 'assembleView';
import useGetInitialValue from '@/hooks/useGetInitialValue';
import GroupViewModal from './GroupViewModal';

const { Panel } = Collapse;
const ActivityViewModal = props => {
	const {  visible,form, setVisible, data, loading, afterClose, selectedItem, user} = props;
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );
	const [ selectItem, setSelectItem] = useState( {} );
	const [ activityView, setActivityView] = useState( {} );
	const [ groupViewModalVisible,toggleGroupViewModalVisible ] = useToggle( false );
	const [ getInfoLoadingId, setInfoLoadingId ] = useState( undefined );
	const groupLoading = loading.effects[ `group/fetch` ] || false;

	// 表格-字段
	let tableColumns = [...FIELDS.ACTIVITY.ASSEMBLE_VIEW_TABLE_HEAD]
	const formFields = [FIELDS.ACTIVITY.COMMON_SEARCH_FORM.EMPLOYEE_NAME]
	const searchFormFields = useMemo( () => {
		return formFields.map( props => <WrapperComplexFormItem
			{...props}
			form={form}
		/> );
	}, [ form ] );
	let FORM = FIELDS.ACTIVITY.FORM
	const getValue = useGetInitialValue( data );
	tableColumns.push({
		title: '操作',
		key: 'activity_view_action',
		width: '100',
		customRender: ( text, record, ) => {
			return  (
				<a key="a2" onClick={e => {
					e.stopPropagation();
					setSelectItem(record)
					setInfoLoadingId(record.id)
					toggleGroupViewModalVisible( true ) ;
				}}>{(getInfoLoadingId === record.id && groupLoading) && <Spin size="small"/>} 参团详情</a>
			)
		}
	})
	const hexiaoSubmit = data => {
		setNeedUpdate( true );
	};
	return (
		<Modal
			width="80%"
			title="活动详情"
			visible={visible}
			afterClose={afterClose}
			destroyOnClose
			onCancel={() => setVisible( false )}
			footer={null}
		>
			<Card title='活动详情' style={{marginBottom: '20px'}}>
				<Form>
					<Row gutter={{ xs: 8, sm: 16, md: 20, }}>	
						<Col md={8} sm={24} >
							<Form.Item label={FORM.NAME.title} style={{display: 'flex'}}>
								<span className="ant-form-text">{getValue(FORM.NAME)}</span>
							</Form.Item>
						</Col>
						<Col md={8} sm={24}>
							<Form.Item label={FORM.TYPE.title} style={{display: 'flex'}}>
							<span className="ant-form-text">{getValue(FORM.TYPE) === 'REDUCTION' ? '减价团' : '普通团'}</span>
							</Form.Item>
						</Col>
						<Col md={8} sm={24}>
							<Form.Item label={FORM.PRICE.title} style={{display: 'flex'}}>
							<span className="ant-form-text">{getValue(FORM.PRICE)}元</span>
							</Form.Item>
						</Col>
						<Col md={8} sm={24}>
							<Form.Item label={FORM.PEOPLE_RESTRICTIONS.title} style={{display: 'flex'}}>
							<span className="ant-form-text">{getValue(FORM.TYPE) === 'REDUCTION' ? `参团人数上限${getValue(FORM.PEOPLE_RESTRICTIONS)}人` : `成团人数${getValue(FORM.PEOPLE_RESTRICTIONS)}人`}</span>
							</Form.Item>
						</Col>
						<Col md={8} sm={24}>
							<Form.Item label={getValue(FORM.TYPE) === 'REDUCTION' ? FORM.DIS_MONEY.title : '团购价格'} style={{display: 'flex'}}>
							<span className="ant-form-text">{getValue(FORM.TYPE) === 'REDUCTION' ? `每增加一人减${getValue(FORM.DIS_MONEY)}元,减价优惠上限${getValue(FORM.DIS_RESTRICTIONS)}元` : `${getValue(FORM.DIS_RESTRICTIONS)}元`}</span>
							</Form.Item>
						</Col>
						<Col md={8} sm={24}>
							<Form.Item label={FORM.VALID_QUANTITY.title} style={{display: 'flex'}}>
							<span className="ant-form-text">{getValue(FORM.VALID_QUANTITY)}份</span>
							</Form.Item>
						</Col>
						<Col md={8} sm={24}>
							<Form.Item label={FORM.VALID_TIME.title} style={{display: 'flex'}}>
							<span className="ant-form-text">{getValue(FORM.VALID_TIME)}小时</span>
							</Form.Item>
						</Col>
						<Col md={8} sm={24}>
							<Form.Item label={FORM.BEGIN_DATE.title} style={{display: 'flex'}}>
							<span className="ant-form-text">{getValue(FORM.BEGIN_DATE)}</span>
							</Form.Item>
						</Col>
						<Col md={8} sm={24}>
							<Form.Item label={FORM.END_DATE.title} style={{display: 'flex'}}>
							<span className="ant-form-text">{getValue(FORM.END_DATE)}</span>
							</Form.Item>
						</Col>
					</Row>
					<Collapse>
						<Panel header="活动说明">
							<p dangerouslySetInnerHTML={{__html:getValue(FORM.PROFILE)}}></p>
						</Panel>
					</Collapse>
				</Form>
			</Card>
			<WithTableName
				scroll={{ x: 'max-content' }}
				{...props}
				bodyStyle={{ padding: 0, }}
				tableName={tableName}
				originColumns={tableColumns}
				columnSortable={false}
				needUpdate={tableNeedUpdate}
				setNeedUpdate={setTableNeedUpdate}
				formFields={searchFormFields}
				tableSearchParams={{
					configId: data.id,
					schoolId: user.currentUserSchool.id
				}}
			/>
			<GroupViewModal
				handleSubmit={fieldsValue => hexiaoSubmit(fieldsValue)}
				data={data}
				selectItem={selectItem}
				visible={groupViewModalVisible}
				setVisible={toggleGroupViewModalVisible}
			/>
		</Modal>
	);
}
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
) )( Form.create()( ActivityViewModal ) );
