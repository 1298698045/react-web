import React, {useState} from 'react';
import { Row, Col, Card, Icon, Spin,Statistic, Form, DatePicker, Checkbox, Select  } from 'antd';
import { connect } from 'dva';
import { useEffectOnce, useGetSet, } from 'react-use';
import { Line } from '@/components/Charts';
import router from 'umi/router';
import moment from 'moment';
import { getTimeDistance } from '@/utils/utils';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import analysis_styles from '@/pages/Workbench/Analysis.less';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from '@/config/fields';
const Option = Select.Option
const { RangePicker } = DatePicker;

const SearchForm = props => {
	const { form, dispatch, loading,dictionary, onSearch } = props;
	const [ getLicenseType, setLicenseType ] = useGetSet( '-1' );
	const [ getIntroducerType, setIntroducerType ] = useGetSet( '-1' );
	const [ getIncludeWaitPay, setIncludeWaitPay ] = useGetSet( '-1' );
	const [ getIncludeLeaveSchool, setIncludeLeaveSchool ] = useGetSet( '-1' );
	const [rangePickerValue, setRangePickerValue] = useState(getTimeDistance('today'))

	const search = ( key, value ) => {
		const params = {};
		if ( key === 'licenseType' ) {
			setLicenseType( value );
		}
		if ( key === 'introducerType' ) {
			setIntroducerType( value );
		}
		if ( key === 'includeWaitPay' ) {
			setIncludeWaitPay( value );
		}
		if ( key === 'includeLeaveSchool' ) {
			setIncludeLeaveSchool( value );
		}
		if ( key === 'rangePickerValue' ) {
			setRangePickerValue( value );
			params.startDate = moment( value[0] ).format( 'YYYY-MM-DD')
			params.endDate = moment( value[1] ).format( 'YYYY-MM-DD')
		} else {
			params.startDate = moment( rangePickerValue[0] ).format( 'YYYY-MM-DD')
			params.endDate = moment( rangePickerValue[1] ).format( 'YYYY-MM-DD')
		}
		if ( getLicenseType() !== '-1' ) params.licenseType = getLicenseType();
		if ( getIntroducerType() !== '-1' ) params.introducerType = getIntroducerType();
		if ( getIncludeWaitPay() !== '-1' ) params.includeWaitPay = getIncludeWaitPay();
		if ( getIncludeLeaveSchool() !== '-1' ) params.includeLeaveSchool = getIncludeLeaveSchool();
		onSearch(params)
	};
	/**** */
	const selectDate = type => {
		search('rangePickerValue', getTimeDistance(type))
	};
	const isActive = type => {
		const value = getTimeDistance(type);
		if (!rangePickerValue[0] || !rangePickerValue[1]) {
			return '';
		}
		if (
			rangePickerValue[0].isSame(value[0], 'day') &&
			rangePickerValue[1].isSame(value[1], 'day')
		) {
			return analysis_styles.currentDate;
		}
		return '';
	};
	const handleRangePickerChange = rangePickerValue => {
		search('rangePickerValue', rangePickerValue)
	};
	/****/
	return (
		<Form>
			<Row>
				<Col span={11}>
					<Form.Item label="时间刻度" style={{display: 'flex', marginBottom: 0}}>
					<div className={analysis_styles.salesExtraWrap}>
						<div className={analysis_styles.salesExtra}>
							<a className={isActive('lastMonth')} onClick={() => selectDate('lastMonth')}>
							<FormattedMessage id="app.analysis.last-month" defaultMessage="Last Month" />
							</a>
							<a className={isActive('yesterday')} onClick={() => selectDate('yesterday')}>
							<FormattedMessage id="app.analysis.yesterday" defaultMessage="Yesterday" />
							</a>
							<a className={isActive('today')} onClick={() => selectDate('today')}>
							<FormattedMessage id="app.analysis.all-day" defaultMessage="All Day" />
							</a>
							<a className={isActive('month')} onClick={() => selectDate('month')}>
							<FormattedMessage id="app.analysis.all-month" defaultMessage="All Month" />
							</a>
							<a className={isActive('day_7')} onClick={() => selectDate('day_7')}>
							<FormattedMessage id="app.analysis.day-7" defaultMessage="day_7" />
							</a>
							<a className={isActive('day_30')} onClick={() => selectDate('day_30')}>
							<FormattedMessage id="app.analysis.day-30" defaultMessage="day_30" />
							</a>
						</div>
						<RangePicker
							value={rangePickerValue}
							onChange={handleRangePickerChange}
							style={{ width: 210 }}
						/>
					</div>
					</Form.Item>
				</Col>
			</Row>
		</Form>);
};
export default connect( (
	{
		loading,
		global
	}
) => (
	{
		loading,
		global
	}
) )( Form.create()( SearchForm ) );
