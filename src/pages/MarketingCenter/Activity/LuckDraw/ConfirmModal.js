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
import useGetInitialValue from '@/hooks/useGetInitialValue';
import GroupViewModal from './GroupViewModal';
import { STATUS_LIST } from '@/contsant'

const { Panel } = Collapse;
const ConfirmModal = props => {
	const {  visible, setVisible, data, signSubmit, afterClose} = props;
	const sumbit = () => {
		signSubmit({
			id: data.id,
			signStatus: 1,
			prizeType: data.method === '1' ?  '0' : '1',
			belongTo: data.method === '1' ? 0 : data.employeeId
		})
	};
	return (
		<Modal
			title="确定要签到该名额吗？"
			visible={visible}
			afterClose={afterClose}
			closable={false}
			maskClosable={false}
			onCancel={() => setVisible( false )}
			onOk={sumbit}
		>
			<Form>
				<Row gutter={{ xs: 8, sm: 16, md: 20, }}>	
					<Col md={12} sm={24} >
						<Form.Item label={'姓名'} style={{display: 'flex'}}>
							<span className="ant-form-text">{data.userName}</span>
						</Form.Item>
					</Col>
					<Col md={12} sm={24}>
						<Form.Item label={'手机号'} style={{display: 'flex'}}>
							<span className="ant-form-text">{data.phone}</span>
						</Form.Item>
					</Col>
					<Col md={12} sm={24} >
						<Form.Item label={'归属人'} style={{display: 'flex'}}>
							<span className="ant-form-text">{data.employeeName}</span>
						</Form.Item>
					</Col>
					<Col md={12} sm={24}>
						<Form.Item label={'开奖方式'} style={{display: 'flex'}}>
							<span className="ant-form-text">{data.method === '1' ? '驾校统一开奖' : '按员工批次开奖'}</span>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
}
export default connect( (
	{
		loading,
		global,
		user
	}
) => (
	{
		loading,
		global,
		user
	}
) )( Form.create()( ConfirmModal ) );
