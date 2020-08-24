import React, { useCallback, useEffect, useState, } from 'react';
import { Timeline, Empty, Input, Form, Divider, Button, } from 'antd';
import StudentInfoTimelineMemo from '@/components/StudentInfoTimelineMemo';
import { useGetSet } from 'react-use';

const { Item } = Timeline;
const { TextArea } = Input;

const InfoModal = props => {
	const { dispatch, studentId, loading } = props;
	const [ list, setList ] = useState( [] );
	const [ getTextarea, setTextArea ] = useGetSet( '' );
	
	const addLoading = loading.effects[ 'student/saveMemo' ] || false;
	
	const getList = useCallback( callback => {
		dispatch( {
			type: 'student/getMemoList',
			payload: studentId,
		} ).then( ( { list } ) => callback( list ) );
	}, [ studentId, dispatch ] );
	
	useEffect( () => {
		getList( ( list ) => setList( list ) )
	}, [] );
	
	const add = useCallback( () => {
		dispatch( {
			type: 'student/saveMemo',
			payload: {
				params: {
					studentId,
					memo: getTextarea(),
				}
			},
		} ).then( () => {
			setTextArea( '' );
			getList( list => setList( list ) );
		} );
	}, [ studentId, dispatch, getTextarea, getList, setList, setTextArea, studentId, ] );
	
	return (
		<div>
			<Form.Item label="添加备注" required>
				<TextArea onChange={e => setTextArea( e.target.value )} value={getTextarea()}/>
			</Form.Item>
			<div style={{ marginBottom: 24, }}>
				<Button
					type="primary"
					style={{ marginRight: 8, }}
					onClick={add}
					icon="plus-circle"
					disabled={!getTextarea()}
					loading={addLoading}
				>添加</Button>
				<Button onClick={() => setTextArea( '' )} icon="reload">清空</Button>
			</div>
			
			<Divider dashed>历史备注信息</Divider>
			
			{
				list.length === 0
					?
					<Empty/>
					:
					(
						<Timeline>
							{
								list.map( l => (
									<Item key={l.id}>
										<StudentInfoTimelineMemo dispatch={dispatch} data={l} getList={getList}
										                         setList={setList}/>
									</Item>
								) )
							}
						</Timeline>
					)
			}
		</div>
	)
};

export default InfoModal;
