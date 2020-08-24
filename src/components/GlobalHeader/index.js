import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import Link from 'umi/link';
import Debounce from 'lodash-decorators/debounce';
import styles from './index.less';
import RightContent from './RightContent';
import { connect } from "dva/index";

@connect( ( { user } ) => ( {
	user
} ) )
export default class GlobalHeader extends PureComponent {
	componentDidMount() {
		const { dispatch, user } = this.props;
		dispatch( {
			type: 'user/queryUserSchool',
			uid: user.currentUser.userId,
		} );
	}

	componentWillUnmount() {
		this.triggerResizeEvent.cancel();
	}

	/* eslint-disable*/
	@Debounce( 600 )
	triggerResizeEvent() {
		// eslint-disable-line
		const event = document.createEvent( 'HTMLEvents' );
		event.initEvent( 'resize', true, false );
		window.dispatchEvent( event );
	}

	toggle = () => {
		const { collapsed, onCollapse } = this.props;
		onCollapse( !collapsed );
		this.triggerResizeEvent();
	};

	render() {
		const { collapsed, isMobile, logo, user } = this.props;
		return (
			<div className={styles.header}>
				{isMobile && (
					<Link to="/" className={styles.logo} key="logo">
						<img src={logo} alt="logo" width="32"/>
					</Link>
				)}
				<span className={styles.trigger} onClick={this.toggle}>
					<Icon type={collapsed ? 'menu-unfold' : 'menu-fold'}/>
				</span>
				<span className={styles.school}>{user.currentUserSchool.shortname}</span>
				<RightContent {...this.props} />
			</div>
		);
	}
}
