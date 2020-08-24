import React from 'react';
import { Row, Col, Card, } from 'antd';
import { connect } from 'dva';
import QuickEntry from './QuickEntry';
import TodoList from './TodoList';
import StudentPreview from './StudentPreview';
import SignUpChart from './SignUpChart';
import FinancePreview from './FinancePreview';
import ArchivePreview from './ArchivePreview';
// import LessonPreview from './LessonPreview';
import ExamPreview from './ExamPreview';
import StudentActivePreview from './StudentActivePreview';
import ReserveChart from './ReserveChart';

import style from './index.less';
import Privilege from '@/components/Privilege';

const Index = ( { user } ) => {
	const { currentUser } = user;
	const { userId } = currentUser;
	return (
		<Row type="flex" gutter={24}>
			<Col sm={24} md={12} className={style.col}>
				<QuickEntry height={196} uid={String( userId )}/>
			</Col>
			<Col sm={24} md={12} className={style.col}>
				<TodoList height={196}/>
			</Col>
			<Privilege privs={[ 'student_list' ]}>
				<Col sm={24} md={12} className={style.col}>
					<StudentPreview height={486}/>
				</Col>
			</Privilege>
			<Privilege privs={[ 'student_enter' ]}>
				<Col sm={24} md={12} className={style.col}>
					<SignUpChart height={486}/>
				</Col>
			</Privilege>
			<Privilege privs={[ 'wait_pay_manage' ]}>
				<Col sm={24} md={12} className={style.col}>
					<FinancePreview height={486}/>
				</Col>
			</Privilege>
			<Privilege privs={[ 'archivist_manage' ]}>
				<Col sm={24} md={12} className={style.col}>
					<ArchivePreview height={486}/>
				</Col>
			</Privilege>
			{/*<Col sm={24} className={style.col}>*/}
			{/*	<LessonPreview/>*/}
			{/*</Col>*/}
			<Privilege privs={[ 'exam_manage' ]}>
				<Col sm={24} md={12} className={style.col}>
					<ExamPreview height={486}/>
				</Col>
			</Privilege>
			<Privilege privs={[ 'student_list' ]}>
				<Col sm={24} md={12} className={style.col}>
					<StudentActivePreview height={486}/>
				</Col>
			</Privilege>
			<Privilege privs={[ 'order_course_manage' ]}>
				<Col sm={24} className={style.col}>
					<ReserveChart/>
				</Col>
			</Privilege>
		</Row>
	);
};

export default connect( ( { user } ) => ({ user }) )( Index );
