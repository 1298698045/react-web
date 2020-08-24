import React, { Fragment } from 'react';
import { Divider } from 'antd';

const Buttons = props => {
	const { children } = props;

	const arr = [];
	children.forEach( ( child, index ) => {
		arr.push( child );
		arr.push( <Divider key={`divider${index}`} type="vertical"/> );
	} );
	arr.pop();

	return <Fragment>{arr}</Fragment>;
};

export default Buttons;
