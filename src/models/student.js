import {
	doChangeCoach,
	doDeleteStudent,
	doGetStudentInfo,
	doSaveMemo,
	doSaveStudentStatus,
	doChangeStudentClass,
	doSaveInfo,
	doAfterPayTuition,
	doAfterPayExam,
	doEntrust,
	doLeaveSchool,
	doBuyLessons,
	doChangeStudentMobile,
	doChangeEntrust,
	doGetDependCost,
	doIdentityInfo,
	doUpdateInfo, doAddProxyKm, doUpdateMemo, doDeleteMemo, addOtherCost,
	updClueStatus,
	updArchiveClueStatus,
	getStudentIdByMobile,
	updArchiveClueApply
} from '@/services/student';
import { doGetFinanceChargeOther } from '@/services/api';
import response from '@/services/response';

export default {
	namespace: 'student',

	state: {},

	effects: {
		* getStudentInfo( { payload }, { call, } ) {
			return response( yield call( doGetStudentInfo, payload ) )( '', '' );
		},
		* saveMemo( { payload }, { call, } ) {
			return response( yield call( doSaveMemo, payload ) )( '添加成功！', '' );
		},
		* deleteStudent( { payload, callback }, { call, } ) {
			return response( yield call( doDeleteStudent, payload ) )( '删除成功！', '' );
		},
		* saveStudentStatus( { payload, callback }, { call, } ) {
			return response( yield call( doSaveStudentStatus, payload ) )( '保存成功！', '' );
		},
		* changeCoach( { payload, callback }, { call, } ) {
			return response( yield call( doChangeCoach, payload ) )( '更换成功！', '' );
		},
		* changeStudentClass( { payload, callback }, { call, } ) {
			return response( yield call( doChangeStudentClass, payload ) )( '更换成功！', '' );
		},
		* afterPayTuition( { payload, callback }, { call, } ) {
			return response( yield call( doAfterPayTuition, payload ) )( '补交成功！', '' );
		},
		* afterPayExam( { payload, callback }, { call, } ) {
			return response( yield call( doAfterPayExam, payload ) )( '交费成功！', '' );
		},
		* entrust( { payload, callback }, { call, } ) {
			return response( yield call( doEntrust, payload ) )( '委培成功！', '' );
		},
		* leaveSchool( { payload, callback }, { call, } ) {
			return response( yield call( doLeaveSchool, payload ) )( '退学成功！', '' );
		},
		* buyLessons( { payload, callback }, { call, } ) {
			return response( yield call( doBuyLessons, payload ) )( '购买成功！', '' );
		},
		* changeMobile( { payload, callback }, { call, } ) {
			return response( yield call( doChangeStudentMobile, payload ) )( '修改成功！', '' );
		},
		* changeEntrust( { payload, callback }, { call, } ) {
			return response( yield call( doChangeEntrust, payload ) )( '修改成功！', '' );
		},
		* finishEntrust( { payload, callback }, { call, } ) {
			return response( yield call( doChangeEntrust, payload ) )( '委培结束成功！', '' );
		},
		* saveInfo( { payload }, { call, } ) {
			return response( yield call( doSaveInfo, payload ) )( '保存成功！', '' );
		},
		* updateInfo( { payload }, { call, } ) {
			return response( yield call( doUpdateInfo, payload ) )( '保存成功！', '' );
		},
		* getDependCost( { payload }, { call, } ) {
			return response( yield call( doGetDependCost, payload ) )( '', '' );
		},
		* IdentityInfo( { payload }, { call, } ) {
			return yield call( doIdentityInfo, payload );
		},
		* addProxyKm( { payload }, { call, } ) {
			return response( yield call( doAddProxyKm, payload ) )( '', '' );
		},
		* finishProxy( { payload }, { call, } ) {
			return response( yield call( doSaveStudentStatus, payload ) )( '代培结束成功！', '' );
		},
		* getMemoList( { payload }, { call, } ) {
			return response( yield call( doGetFinanceChargeOther, {
				params: {
					action: 'MEMO',
					studentId: payload,
				},
				pagination: {
					current: 1,
					pageSize: 100,
				},
			} ) )( '', '' );
		},
		// 更新备注
		* updateMemo( { payload }, { call, } ) {
			return response( yield call( doUpdateMemo, {
				params: payload,
			} ) )( '修改备注成功！', '' );
		},
		// 删除备注
		* deleteMemo( { payload }, { call, } ) {
			return response( yield call( doDeleteMemo, {
				params: payload,
			} ) )( '删除备注成功！', '' );
		},
		* addOtherCost( { payload, callback }, { call, } ) {
			return response( yield call( addOtherCost, payload ) )( '新增其它业务收入成功！', '' );
		},
		// 修改线索
		* updClueStatus( { payload, callback }, { call, } ) {
			return response( yield call( updClueStatus, payload ) )();
		},
		* updArchiveClueApply( { payload, callback }, { call, } ) {
			return response( yield call( updArchiveClueApply, payload ) )();
		},
		// 批量修改线索
		* updArchiveClueStatus( { payload, callback }, { call, } ) {
			return response( yield call( updArchiveClueStatus, payload ) )();
		},
		// 根据手机号获取学员id
		* getStudentIdByMobile( { payload, callback }, { call, } ) {
			return response( yield call( getStudentIdByMobile, payload ) )();
		},
	},

	reducers: {
		save( state, action ) {
			return {
				...state,
				...action.payload,
			};
		},
	},
};
