import React, { Component } from 'react';
import { Axis, Chart, Geom, Label, Legend, Tooltip } from 'bizcharts';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import autoHeight from '../autoHeight';
import styles from '../index.less';

@autoHeight()
class Line extends Component {
	state = {
		autoHideXLabels: false,
	};
	
	componentDidMount () {
		window.addEventListener( 'resize', this.resize, { passive: true } );
	}
	
	componentWillUnmount () {
		window.removeEventListener( 'resize', this.resize );
	}
	
	handleRoot = n => {
		this.root = n;
	};
	
	handleRef = n => {
		this.node = n;
	};
	
	@Bind()
	@Debounce( 400 )
	resize () {
		if ( !this.node ) {
			return;
		}
		const canvasWidth = this.node.parentNode.clientWidth;
		const { data = [], autoLabel = true } = this.props;
		if ( !autoLabel ) {
			return;
		}
		const minWidth = data.length * 30;
		const { autoHideXLabels } = this.state;
		
		if ( canvasWidth <= minWidth ) {
			if ( !autoHideXLabels ) {
				this.setState( {
					autoHideXLabels: true,
				} );
			}
		} else if ( autoHideXLabels ) {
			this.setState( {
				autoHideXLabels: false,
			} );
		}
	}
	
	render () {
		const {
			height,
			title,
			forceFit = true,
			data,
			color,
			padding,
			label = false,
			legend = false,
			lineSize = 4,
			pointSize = 4,
			min = 0,
			max,
			unit = '',
			formatter = val => val,
		} = this.props;
		
		const { autoHideXLabels } = this.state;
		
		const scale = {
			x: {
				type: 'cat',
			},
			y: {
				min,
				max,
			},
		};
		
		const tooltip = [
			'x*y*name',
			( x, y, name ) => ( {
				name,
				value: `${ formatter( y ) }${ unit }`,
			} ),
		];
		
		return (
			<div className={ styles.chart } style={ { height } } ref={ this.handleRoot }>
				<div ref={ this.handleRef }>
					{ title && <h4 style={ { marginBottom: 20 } }>{ title }</h4> }
					<Chart
						scale={ scale }
						height={ title ? height - 41 : height }
						forceFit={ forceFit }
						data={ data }
						padding={ padding || ( label ? [ 30, 'auto', 'auto', 'auto' ] : 'auto' ) }
					>
						<Axis name="x"/>
						<Axis name="y" label={ {
							formatter: y => `${ formatter( y ) }${ unit }`,
						} }/>
						{ legend && <Legend/> }
						<Tooltip/>
						<Geom
							type="line" position="x*y" shape="smooth" color={ color || 'name' } tooltip={ tooltip }
							size={ lineSize }/>
						<Geom
							type="point" position="x*y" shape="circle" color={ color || 'name' } tooltip={ tooltip }
							size={ pointSize }>
							{ label && <Label content={ [ 'y', y => `${ formatter( y ) }${ unit }` ] } offset="15"/> }
						</Geom>
					</Chart>
				</div>
			</div>
		);
	}
}

export default Line;
