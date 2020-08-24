import React, { PureComponent, } from 'react';
import { Card, Col, Row, } from 'antd';
// import ReactQMap from 'react-qmap';
import WrapperComplexFormItem from '@/components/HOC/WrapperComplexFormItem';
import FIELDS from '@/config/fields';

// const { Search } = Input;
//
// let classMap, windowMap;
//
// let geocoder;


class AssetMap extends PureComponent {
	componentDidMount (){
		window.addEventListener( 'message', ( event ) => this.changeLocationHandler( event ), false );
	}
	
	componentWillUnmount (){
		window.removeEventListener( 'message', ( event ) => this.changeLocationHandler( event ), false );
	}
	
	changeLocationHandler ( event ){
		const { form } = this.props;
		// 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
		let loc = event.data;
		if ( loc && loc.module === 'locationPicker' ) {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
			form.setFieldsValue( {
				[ FIELDS.ASSET.LNG.key ]: loc.latlng.lng,
				[ FIELDS.ASSET.LAT.key ]: loc.latlng.lat,
			} );
		}
	};
	
	// _setMarker = () => {
	// 	geocoder = new windowMap.Geocoder( {
	// 		complete: function ( result ){
	// 			console.log( result );
	// 			// if ( result.detail && result.detail.errmsg ) {
	// 			// 	message.error( result.detail.errmsg );
	// 			// 	return false;
	// 			// }
	// 			classMap.setCenter( result.detail.location );
	// 			let marker = new windowMap.Marker( {
	// 				map: classMap,
	// 				position: result.detail.location,
	// 			} );
	// 			// console.log( marker, result )
	// 		}
	// 	} );
	// };
	
	// search = text => {
	// 	geocoder.getLocation( text );
	// };
	
	// _getMap = ( map, wMap ) => {
	// 	classMap = map;
	// 	windowMap = wMap;
	// 	this._setMarker();
	// };
	
	render (){
		const { form, data } = this.props;
		
		return (
			<Card style={{ marginBottom: 24, }}>
				{/*<Search*/}
				{/*	placeholder="请输入地址"*/}
				{/*	onSearch={value => this.search( value )}*/}
				{/*	style={{ width: 200 }}*/}
				{/*/>*/}
				{/*<ReactQMap*/}
				{/*	center={{ latitude: 30.53786, longitude: 104.07265 }}*/}
				{/*	getMap={( map, wMap ) => this._getMap( map, wMap )}*/}
				{/*	apiKey="UN6BZ-MP2W6-XWCSX-M2ATU-QORGZ-OWFOE"*/}
				{/*/>*/}
				<Row>
					<Col xs={4}>
						<WrapperComplexFormItem
							config={FIELDS.ASSET.LAT}
							rules={[ { required: true, } ]}
							initialValue={data[ FIELDS.ASSET.LAT.key ]}
							form={form}
							status="disabled"
						/>
						<WrapperComplexFormItem
							config={FIELDS.ASSET.LNG}
							rules={[ { required: true, } ]}
							initialValue={data[ FIELDS.ASSET.LNG.key ]}
							form={form}
							status="disabled"
						/>
					</Col>
					<Col xs={20}>
						<iframe
							style={{ paddingLeft: 50, }}
							id="mapPage"
							width="100%"
							height={800}
							frameBorder="0"
							src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=OWLBZ-2QVKJ-U7EFA-F7P76-KZLM3-BZBHD&referer=myapp">
						</iframe>
					</Col>
				</Row>
			
			</Card>
		)
	}
}

export default AssetMap;
