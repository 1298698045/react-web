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
const tableName = 'openLuckDetail';
import useGetInitialValue from '@/hooks/useGetInitialValue';
import GroupViewModal from './GroupViewModal';
import { OPEN_PRIZE_METHOD_LIST } from '@/contsant'
import { getDictValue} from "@/utils/dictionaryUtil";

const { Panel } = Collapse;
const ActivityViewModal = props => {
	const {  dictionary, visible, setVisible, data, loading, afterClose} = props;
	const [ tableNeedUpdate, setTableNeedUpdate ] = useState( false );

	// 表格-字段
	let tableColumns = [
		{ title: '序号', key: 'key',  align: 'center'},
		{ title: '姓名', key: 'name',width: 150},
		{ title: '手机号', key: 'mobile',},
		{ title: '归属', key: 'activityBelongTo', 
			customRender: ( text, record ) => {
				if (text === 0) {
					return '驾校'
				}
				console.log(dictionary.employee_id,text)
				return getDictValue( dictionary, 'employee_id', text )
			}
		},
		{ title: '活动名称', key: 'activityName'},
		{ title: '奖项说明', key: 'prizeExplain'},
		{ title: '中奖时间', key: 'confirmTime'},
		{ title: '参加时间', key: 'reportTime'},
		{ title: '是否中奖', key: 'isPrize', customRender: ( text, record ) => text === 0 ? '未中奖' : '已中奖'}
	]
	const searchFormFields = []
	const getValue = useGetInitialValue( data );
	
	return (
		<Modal
			width="80%"
			title="开奖详情"
			visible={visible}
			afterClose={afterClose}
			destroyOnClose
			onCancel={() => setVisible( false )}
			footer={null}
		>
			<Form>
				<Row gutter={{ xs: 8, sm: 16, md: 20, }}>	
					<Col md={8} sm={24} >
						<Form.Item label={'开奖方式'} style={{display: 'flex'}}>
							<span className="ant-form-text">{OPEN_PRIZE_METHOD_LIST.filter(one => one.dKey === data.activityPrizeType + '').map(one=>one.dValue).join(',')}</span>
						</Form.Item>
					</Col>
					<Col md={8} sm={24}>
						<Form.Item label={'奖池人数'} style={{display: 'flex'}}>
						<span className="ant-form-text">{data.poolSize}</span>
						</Form.Item>
					</Col>
					<Col md={8} sm={24}>
						<Form.Item label={'中奖人数'} style={{display: 'flex'}}>
						<span className="ant-form-text">{data.prizedCount}</span>
						</Form.Item>
					</Col>
				</Row>
			</Form>
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
					activityBelongTo: data.activityBelongTo + '',
					activityPrizeType: data.activityPrizeType + '',
					activityId: data.activityId
				}}
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
