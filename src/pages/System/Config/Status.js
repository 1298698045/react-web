import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { connect } from "dva";
import { Form, Card, Switch, Radio, message, Input, Row, Col, Spin } from 'antd';
import FIELDS from "@/config/fields";
import Privilege from '@/components/Privilege';

import styles from './Index.less';

const tableName = 'systemConfig';
const settingType = 'status_setting';
const dispatchType = `${tableName}/querySetting`;

const Status = props => {
	const { dispatch, form, loading: { effects }, [ tableName ]: { [ settingType ]: settings } } = props;
	const { getFieldDecorator } = form;
	const loading = effects[ dispatchType ] || false;

	const formItemLayout = {
		labelCol: {
			xs: { span: 24 },
			sm: { span: 8 },
		},
		wrapperCol: {
			xs: { span: 24 },
			sm: { span: 16 },
		},
	};
	const gpsformItemLayout = {
		labelCol: {
			xs: { span: 0 },
			sm: { span: 0 },
		},
		wrapperCol: {
			xs: { span: 24 },
			sm: { span: 24 },
		},
	};

	useEffect( () => {
		dispatch( {
			type: dispatchType,
			params: { type: settingType, },
		} );
	}, [] );

	useEffect( () => {
		form.setFieldsValue( settings );
		form.setFieldsValue( {
			gps_student_km3_distance: settings.gps_student_km3_distance ? settings.gps_student_km3_distance : 1000,
			gps_student_km2_distance: settings.gps_student_km2_distance ? settings.gps_student_km2_distance : 1000,
			intensive_course: settings.intensive_course ? settings.intensive_course : 'on',
		});
	}, [ settings ] );

	const onFieldChange = ( key, value ) => {
		if ( key === 'gps_coach' && value === 'off' ) {
			setOtherRepartSetting( 'gps_student_km3', value )
			setOtherRepartSetting( 'gps_student_km2', value )
		}
		if (key === 'intensive_course' && value === 'off') {
			setOtherRepartSetting('intensive', value)
		}
		if (key === 'intensive' && value === 'on') {
			setOtherRepartSetting('intensive_course', value)
		}
		if ( ( key === 'gps_student_km3' && value === 'on' ) || ( key === 'gps_student_km2' && value === 'on' ) ) {
			setOtherRepartSetting( 'gps_coach', value )
		}
		value = key === 'gps_student_km3_distance' || key === 'gps_student_km2_distance' ? form.getFieldValue( key ) : value
		dispatch( {
			type: `${tableName}/setSetting`,
			params: { type: settingType, key, value },
		} ).then( () => {
			dispatch( {
				type: dispatchType,
				params: { type: settingType, },
			} );
		} );
	};
	const setOtherRepartSetting = ( key, value ) => {
		dispatch( {
			type: `${tableName}/setOtherRepartSetting`,
			params: { type: settingType, key, value },
		} );
	};
	return (
		<Form className={styles.form}>
			<Card loading={loading}>

				<Privilege privs={[ 'status_setting_swtich' ]}>
					<Form.Item {...formItemLayout} label="教练自主管理加班时段">
					{getFieldDecorator( 'overtime' )(
						<Switch
							checkedChildren="打开"
							unCheckedChildren="关闭"
							defaultChecked={settings.overtime}
							onChange={checked => onFieldChange( 'overtime', checked ? 'on' : 'off' )}
						/>
					)}
					<div className={styles.comment}>
						<span className={styles.span}>注：</span>
						<span className={styles.span}>
								1. 打开状态时，教练通过教练宝可以自主管理加班时段；<br/>
								2. 关闭状态时，教练不可以自主管理加班时段。
							</span>
						</div>
					</Form.Item>
					<Form.Item {...formItemLayout} label="是否开启集训课程">
						{getFieldDecorator( 'intensive_course' )(
							<Switch
								checkedChildren="打开"
								unCheckedChildren="关闭"
								defaultChecked={settings.intensive_course}
								onChange={checked => onFieldChange( 'intensive_course', checked ? 'on' : 'off' )}
							/>
						)}
						<div className={styles.comment}>
							<span className={styles.span}>注：</span>
							<span className={styles.span}>
								1. 打开状态时，学员科目状态、课程可以调整为“集训中”状态；<br/>
								2. 关闭状态时，学员科目状态、课程不可以调整为“集训中”状态；
							</span>
						</div>
					</Form.Item>
					<Form.Item {...formItemLayout} label="教练调整学员为集训状态">
						{getFieldDecorator( 'intensive' )(
							<Switch
								checkedChildren="打开"
								unCheckedChildren="关闭"
								defaultChecked={settings.intensive}
								onChange={checked => onFieldChange( 'intensive', checked ? 'on' : 'off' )}
							/>
						)}
						<div className={styles.comment}>
							<span className={styles.span}>注：</span>
							<span className={styles.span}>
								1. 打开状态时，教练通过教练宝可以将学员状态调整为“集训中”；<br/>
								2. 关闭状态时，教练不可以将学员状态调整为“集训中”。
							</span>
					</div>
				</Form.Item>
					<Form.Item {...formItemLayout} label="后台可以跨分配模式约课">
						{getFieldDecorator( 'freedom' )(
							<Switch
								checkedChildren="打开"
								unCheckedChildren="关闭"
								defaultChecked={settings.freedom}
								onChange={checked => onFieldChange( 'freedom', checked ? 'on' : 'off' )}
							/>
						)}
						<div className={styles.comment}>
							<span className={styles.span}>注：</span>
							<span className={styles.span}>
									1. 打开状态时，后台可以给所有学员预约所有教练的课；<br/>
									2. 关闭状态时，后台只能按照学员的分配模式约课。
								</span>
						</div>
					</Form.Item>
					<Form.Item {...formItemLayout} label="是否允许财务编辑金额">
						{getFieldDecorator( 'isFinaceMoneyEdit' )(
							<Switch
								checkedChildren="打开"
								unCheckedChildren="关闭"
								defaultChecked={settings.isFinaceMoneyEdit}
								onChange={checked => onFieldChange( 'isFinaceMoneyEdit', checked ? 'on' : 'off' )}
							/>
						)}
						<div className={styles.comment}>
							<span className={styles.span}>注：</span>
							<span className={styles.span}>
								1. 默认为关闭，关闭状态不可编辑，开启状态可以编辑；<br/>
								2. 有些特殊功能，关闭状态下也是由财务确定金额；
							</span>
						</div>
					</Form.Item>
				</Privilege>
				<Privilege privs={[ 'status_setting_option' ]}>
					<Form.Item {...formItemLayout} label="本校学员可学习科目二时间点">
						{getFieldDecorator( 'km2' )(
							<Radio.Group initialValue={settings.km2}
							             onChange={e => onFieldChange( 'km2', e.target.value )}>
								<Radio value="document">建档成功即可学</Radio>
								<Radio value="km1">科目一通过可学</Radio>
							</Radio.Group>
						)}
						<div className={styles.comment}>
							<span className={styles.span}>注：</span>
							<span className={styles.span}>
									1. 建档成功即可学：建档成功后学员科目二状态默认为“进行中”，可以预约科目二课程；<br/>
									2. 科目一通过可学：只有科目一考试通过后才可以预约科目二课程；<br/>
									3. 任何情况手动调整状态均有效。
								</span>
						</div>
					</Form.Item>
					<Form.Item {...formItemLayout} label="代培学员报名成功后默认状态 - 科目二">
						{getFieldDecorator( 'daipei_km2' )(
							<Radio.Group initialValue={settings.daipei_km2}
							             onChange={e => onFieldChange( 'daipei_km2', e.target.value )}>
								<Radio value="0">待激活</Radio>
								<Radio value="1">进行中</Radio>
							</Radio.Group>
						)}
						<div className={styles.comment}>
							<span className={styles.span}>注：</span>
							<span className={styles.span}>
									代培学员报名成功 或 添加科目后，科目二、科目三的默认状态分别是什么；
								</span>
						</div>
					</Form.Item>
					<Form.Item {...formItemLayout} label="- 科目三">
						{getFieldDecorator( 'daipei_km3' )(
							<Radio.Group initialValue={settings.daipei_km3}
							             onChange={e => onFieldChange( 'daipei_km3', e.target.value )}>
								<Radio value="0">待激活</Radio>
								<Radio value="1">进行中</Radio>
							</Radio.Group>
						)}
					</Form.Item>
				</Privilege>
			</Card>

			{/* 新增gps状态定位 */}
			<Card loading={loading} style={{ marginTop: '10px' }}>
				<Form.Item {...formItemLayout} label="学员端【签到】实时定位 - 科目二">
					{getFieldDecorator( 'gps_student_km2' )(
						<Switch
							checkedChildren="打开"
							unCheckedChildren="关闭"
							defaultChecked={settings.gps_student_km2}
							onChange={checked => onFieldChange( 'gps_student_km2', checked ? 'on' : 'off' )}
						/>
					)}	
					<div className={styles.comment}>
						<Form.Item {...formItemLayout} >
							{getFieldDecorator( 'gps_student_km2_distance' )(
								<Input addonBefore="签到距离教练"
										addonAfter="米以内"
										style={{ width: 235 }}
										onBlur={value => onFieldChange( 'gps_student_km2_distance' )}/>
							)}
							
						</Form.Item>
					</div>
					<div className={styles.comment}>
						<span className={styles.span}>注：</span>
						<span className={styles.span}>
							1. 打开状态时，学员端签到时，位置必须在设置范围内才能进行；<br/>
							2. 关闭状态时，学员端签到位置不受限制。
						</span>
					</div>
				</Form.Item>
				<Form.Item {...formItemLayout} label=" - 科目三">
					{getFieldDecorator( 'gps_student_km3' )(
						<Switch
							checkedChildren="打开"
							unCheckedChildren="关闭"
							defaultChecked={settings.gps_student_km3}
							onChange={checked => onFieldChange( 'gps_student_km3', checked ? 'on' : 'off' )}
						/>
					)}
					<div className={styles.comment}>
						<Form.Item {...formItemLayout}>
							{getFieldDecorator( 'gps_student_km3_distance' )(
								<Input addonBefore="签到距离教练"
										addonAfter="米以内"
										style={{ minWidth: 235 }}
										onBlur={value => onFieldChange( 'gps_student_km3_distance' )}/>
							)}
						</Form.Item>
					</div>
				</Form.Item>
				<Form.Item {...formItemLayout} label="教练端【确认课程】实时定位">
					{getFieldDecorator( 'gps_coach' )(
						<Switch  style={{ marginRight: '20px' }}
							checkedChildren="打开"
							unCheckedChildren="关闭"
							defaultChecked={settings.gps_coach}
							onChange={checked => onFieldChange( 'gps_coach', checked ? 'on' : 'off' )}
						/>
					)}
					<div className={styles.comment}>
						<span className={styles.span}>注：</span>
						<span className={styles.span}>
								1. 打开状态时，可以获取到教练的行车轨迹； <br/>
								2. 关闭状态时，不可以获取教练的行车轨迹； <br/>
								3. 学员签到定位打开时，教练端定位必须打开；
							</span>
					</div>
				</Form.Item>
			</Card>
		</Form>
	);
};

export default connect( (
	{
		[ tableName ]: data,
		loading,
		global
	}
) => (
	{
		[ tableName ]: data,
		loading,
		global,
	}
) )( Form.create()( Status ) );