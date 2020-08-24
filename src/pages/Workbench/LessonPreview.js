import React from 'react';
import { Card, Col, Row, Select, Form, Icon, } from 'antd';
import style from './index.less';
import FIELDS from '@/config/fields';
import { connect } from 'dva';
import router from 'umi/router';

const { Meta } = Card;
const { Option } = Select;

const LessonPreview = ( { form, dispatch, dictionary, } ) => {
	const { getFieldDecorator } = form;
	
	const licenseDic = dictionary[ FIELDS.STUDENT.LICENSE_TYPE_ACTIVE.dictionary ] ? dictionary[ FIELDS.STUDENT.LICENSE_TYPE_ACTIVE.dictionary ].filter(one => one.dictSwitch === 1) : [];
	
	const licenseValues = [ { dKey: '-1', dValue: '全部申领类型' }, ...licenseDic ];
	return (
		<Card title={<a onClick={() => router.push( '/teaching/course' )}><Icon type="link"/> 课表概览</a>}
		      extra={
			      <Row type="flex" gutter={4}>
				      <Col style={{ lineHeight: '40px', marginRight: 20, }}>已约：2019-06-05 至2019-06-15 共计 11 天；
					      科目二：5390/5500节 科目三：2068/2200节</Col>
				      <Col>
					      <Form.Item className={style.formItem}>
						      {getFieldDecorator( 'license_id', {
							      initialValue: '-1',
						      } )(
							      <Select className={style.w100}>
								      {
									      licenseValues.map( v => {
										      return <Option value={v.dKey} key={v.dKey}>{v.dValue}</Option>
									      } )
								      }
							      </Select>
						      )}
					      </Form.Item>
				      </Col>
			      </Row>
			
		      }
		>
			<Col sm={6} className={style.col}>
				<Card type="inner" title="2019-06-05" extra="星期三">
					<Meta
						description={<div>科目二：388人·490/500节<br/>科目三：120人·188/200节<br/>科二集训：20人·20/20节<br/>科三集训：9人·9/10节
						</div>}
					/>
				</Card>
			</Col>
			<Col sm={6} className={style.col}>
				<Card type="inner" title="2019-06-06" extra="星期四">
					<Meta
						description={<div>科目二：388人·490/500节<br/>科目三：120人·188/200节<br/>科二集训：20人·20/20节<br/>科三集训：9人·9/10节
						</div>}
					/>
				</Card>
			</Col>
			<Col sm={6} className={style.col}>
				<Card type="inner" title="2019-06-07" extra="星期五">
					<Meta
						description={<div>科目二：388人·490/500节<br/>科目三：120人·188/200节<br/>科二集训：20人·20/20节<br/>科三集训：9人·9/10节
						</div>}
					/>
				</Card>
			</Col>
			<Col sm={6} className={style.col}>
				<Card type="inner" title="2019-06-08" extra="星期六">
					<Meta
						description={<div>科目二：388人·490/500节<br/>科目三：120人·188/200节<br/>科二集训：20人·20/20节<br/>科三集训：9人·9/10节
						</div>}
					/>
				</Card>
			</Col>
			<Col sm={6} className={style.col}>
				<Card type="inner" title="2019-06-09" extra="星期日">
					<Meta
						description={<div>科目二：388人·490/500节<br/>科目三：120人·188/200节<br/>科二集训：20人·20/20节<br/>科三集训：9人·9/10节
						</div>}
					/>
				</Card>
			</Col>
			<Col sm={6} className={style.col}>
				<Card type="inner" title="2019-06-10" extra="星期一">
					<Meta
						description={<div>科目二：388人·490/500节<br/>科目三：120人·188/200节<br/>科二集训：20人·20/20节<br/>科三集训：9人·9/10节
						</div>}
					/>
				</Card>
			</Col>
			<Col sm={6} className={style.col}>
				<Card type="inner" title="2019-06-11" extra="星期二">
					<Meta
						description={<div>科目二：388人·490/500节<br/>科目三：120人·188/200节<br/>科二集训：20人·20/20节<br/>科三集训：9人·9/10节
						</div>}
					/>
				</Card>
			</Col>
			<Col sm={6} className={style.col}>
				<Card type="inner" title="2019-06-12" extra="星期三">
					<Meta
						description={<div>科目二：388人·490/500节<br/>科目三：120人·188/200节<br/>科二集训：20人·20/20节<br/>科三集训：9人·9/10节
						</div>}
					/>
				</Card>
			</Col>
		</Card>
	);
};

export default connect( (
	{
		dictionary,
	}
) => (
	{
		dictionary,
	}
) )( Form.create()( LessonPreview ) );
