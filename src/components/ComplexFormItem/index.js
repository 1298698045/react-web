import React from 'react';

import InputItem from './InputItem';
import SelectItem from './SelectItem';
import RadioItem from './RadioItem';
import DateItem from './DateItem';
import RangeDateItem from './RangeDateItem';
import TextareaItem from './TextareaItem';
import CheckboxItem from './CheckboxItem';
import SwitchItem from './SwitchItem';
import TimeItem from './TimeItem';
import LocationItem from './LocationItem';
import DateTime from './DateTime';
import DateTimeRange from './DateTimeRange';

const getInput = props => <InputItem {...props}/>;

const getRadio = props => <RadioItem {...props}/>;

const getSelect = props => <SelectItem {...props}/>;

const getDate = props => <DateItem {...props}/>;

const getRangeDate = props => <RangeDateItem {...props}/>;

const getTextarea = props => <TextareaItem {...props}/>;

const getCheckboxItem = props => <CheckboxItem {...props}/>;

const getSwitchItem = props => <SwitchItem {...props}/>;

const getTimeItem = props => <TimeItem {...props}/>;

const getLocationItem = props => <LocationItem {...props}/>;

const getDateTime = props => <DateTime {...props}/>;
const getDateTimeRange = props => <DateTimeRange {...props}/>;

const getItem = props => {
	const { type } = props;
	
	switch ( type ) {
		case 'input':
			return getInput( props );
		case 'inputNumber':
			return getInput( {
				...props,
				number: true,
			} );
		case 'select':
			return getSelect( props );
		case 'date':
			return getDate( props );
		case 'rangeDate':
			return getRangeDate( props );
		case 'radio':
			return getRadio( props );
		case 'textarea':
			return getTextarea( props );
		case 'checkbox':
			return getCheckboxItem( props );
		case 'switch':
			return getSwitchItem( props );
		case 'time':
			return getTimeItem( props );
		case 'location':
			return getLocationItem( props );
		case 'dateTime':
			return getDateTime( props );
		case 'rangeDateTime':
			return getDateTimeRange( props );
		default:
			return null;
	}
};

const ComplexFormItem = props => {
	return getItem( props );
};

export default ComplexFormItem;
