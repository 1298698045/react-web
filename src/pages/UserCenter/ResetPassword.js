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
class ResetPassword extends Component {
	state = {};

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
				type: 'userCenter/resetPassword',
				payload: {
					password: values.password,
					oldPassword: values.oldpassword,
				},
			} ).then( data => {
				if ( data !== false ) form.resetFields();
			} );
		} );
	};

	compareToFirstPassword = ( rule, value, callback ) => {
		const { form } = this.props;
		if ( value && value !== form.getFieldValue( 'password' ) ) {
			callback( '密码两次输入不一致！' );
		} else {
			callback();
		}
	};

	validateToNextPassword = ( rule, value, callback ) => {
		const { form } = this.props;
		if ( value ) {
			form.validateFields( [ 'repeatPassword' ], { force: true } );
		}
		callback();
	};

	render() {
		const { form } = this.props;
		const { getFieldDecorator } = form;
		return (
			<PageHeaderWrapper
				title={<FormattedMessage id="menu.user-center.reset-password"/>}
			>
				<GridContent>
					<Card>
						<Form style={{ width: '50%' }} onSubmit={this.onSubmit}>
							<WrapperComplexFormItem
								config={{
									key: 'oldpassword',
									title: '当前密码',
									type: 'input',
								}}
								mode="pwd"
								form={form}
								rules={[ { required: true, message: '该项为必填' } ]}
							/>
							<WrapperComplexFormItem
								config={{
									key: 'password',
									title: '新的密码',
									type: 'input',
								}}
								mode="pwd"
								form={form}
								rules={[
									{ required: true, message: '该项为必填', },
									{ validator: this.validateToNextPassword, },
								]}
							/>
							<WrapperComplexFormItem
								config={{
									key: 'repeatPassword',
									title: '重复新的密码',
									type: 'input',
								}}
								mode="pwd"
								form={form}
								rules={[
									{ required: true, message: '该项为必填', },
									{ validator: this.compareToFirstPassword, },
								]}
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

export default ResetPassword;
