import React, { Component, Fragment } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Card, Form, Input, Upload, Select, Button } from 'antd';
import { connect } from 'dva';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from "@/config/fields";

const FormItem = Form.Item;
const { Option } = Select;

@connect( ( { user } ) => ( {
	currentUser: user.currentUser,
} ) )
@Form.create()
class Feedback extends Component {
	componentDidMount() {
	}

	onSubmit = e => {
		e.preventDefault();
		const { dispatch, form } = this.props;
		form.validateFields( ( err, values ) => {
			console.log( 'Received values of form: ', values );
			if ( err ) {
				return false;
			}
			dispatch( {
				type: 'userCenter/feedback',
				payload: form.getFieldsValue(),
			} ).then(data => {
				if (data !== false) form.resetFields();
			});
		} );
	};

	render() {
		const { form } = this.props;
		const { getFieldDecorator } = form;
		return (
			<PageHeaderWrapper
				title={<FormattedMessage id="menu.user-center.feedback"/>}
			>
				<GridContent>
					<Card>
						<Form style={{ width: '50%' }} onSubmit={this.onSubmit}>
							<WrapperComplexFormItem
								config={{
									key: 'message',
									title: '您对我们的建议',
									type: 'textarea',
								}}
								form={form}
								rules={[ { required: true, message: '该项为必填' } ]}
							/>
							<Form.Item>
								<Button type="primary" htmlType="submit">提交</Button>
							</Form.Item>
						</Form>
					</Card>
				</GridContent>
			</PageHeaderWrapper>
		);
	}
}

export default Feedback;
