import React, { useCallback, useEffect, } from 'react';
import { Typography, Popconfirm, Input, Button, } from 'antd';
import FIELDS from '@/config/fields';

import { useGetSet } from 'react-use';

const { Text } = Typography;

const { TextArea } = Input;

const InfoModal = props => {
	const { dispatch, data, setList, getList } = props;
	const [ getEditStatus, setEditStatus ] = useGetSet( false );
	const [ getContent, setContent ] = useGetSet( data[ FIELDS.STUDENT.MEMO.key ] || '' );
	
	useEffect( () => {
		setContent( data[ FIELDS.STUDENT.MEMO.key ] );
	}, [ setContent, data ] );
	
	const save = useCallback( () => {
		const memo = getContent();
		const { id } = data;
		
		dispatch( {
			type: 'student/updateMemo',
			payload: {
				id,
				memo,
			}
		} ).then( () => {
			setEditStatus( false );
			getList( list => setList( list ) )
		} );
		
	}, [ dispatch, getContent, setContent, setEditStatus, data, getList, setList, ] );
	
	const del = useCallback( () => {
		const { id } = data;
		
		dispatch( {
			type: 'student/deleteMemo',
			payload: {
				id,
			}
		} ).then( () => {
			setEditStatus( false );
			getList( list => setList( list ) );
		} );
		
	}, [ dispatch, setEditStatus, data, getList, setList, ] );
	
	return (
		<div>
			{
				getEditStatus()
					?
					(
						<div>
							<div>
								<TextArea
									style={{ maxWidth: 800, }}
									autosize
									value={getContent()}
									onChange={e => setContent( e.target.value )}
								/>
							</div>
							<div>
								<Button type="link" icon="check-circle" onClick={save}/>
								<Button type="link" icon="close-circle" onClick={() => setEditStatus( false )}/>
							</div>
						</div>
					)
					:
					(
						<div>
							<div>
								<Text strong>{getContent()}</Text>
							</div>
							<div>
								<Button type="link" icon="edit" onClick={() => setEditStatus( true )}/>
								<Popconfirm
									title="确定要删除此条备注吗？"
									onConfirm={del}
									onCancel={() => {}}
									okText="确定"
									cancelText="取消"
								>
									<Button type="link" icon="delete"/>
								</Popconfirm>
							</div>
						</div>
					)
			}
			<br/>
			<Text disabled>{data[ FIELDS.FINANCE.CREATE_TIME.key ]}</Text>
		</div>
	)
	
	// return (
	// 	<div>
	// 		<Text strong>{data[ FIELDS.STUDENT.MEMO.key ]}</Text>
	// 		<br/>
	// 		<Text disabled>{data[ FIELDS.FINANCE.CREATE_TIME.key ]}</Text>
	// 	</div>
	// )
};

export default InfoModal;
