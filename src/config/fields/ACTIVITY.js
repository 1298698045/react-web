import { ASSEMBLE_LIST, 
	STATUS_LIST, STATUS_HD_LIST, STATUS_CT_LIST, SIGN_STATUS_LIST,PRIZE_TYPE_LIST,PRIZE_METHOD_LIST,
	OPEN_PRIZE_METHOD_LIST,
	OPEN_PRIZE_STATUS_LIST
} from '@/contsant'
import { Tooltip, Tag } from 'antd';
export default {
	FORM: {
		SCHOOL_NAME: {
			key: 'schoolName',
			title: '活动归属',
			type: 'input'
		},
		NAME: {
			key: 'name',
			title: '活动名称',
			type: 'input'
		},
		PRICE: {
			key: 'price',
			title: '原始价格',
			type: 'input'
		},
		VALID_QUANTITY: {
			key: 'validQuantity',
			title: '活动份数',
			type: 'input',

		},
		VALID_TIME: {
			key: 'validTime',
			title: '活动时效',
			type: 'input',
		},
		BEGIN_DATE: {
			key: 'startTime',
			title: '开始时间',
			type: 'dateTime',
		},
		END_DATE: {
			key: 'endTime',
			title: '结束时间',
			type: 'dateTime',
		},
		TYPE: {
			key: 'type',
			title: '拼团类型',
			type: 'select',
			values: ASSEMBLE_LIST
		},
		DIS_MONEY: {
			key: 'discountsMoney',
			title: '团价规则',
			type: 'input',
		},
		DIS_RESTRICTIONS: {
			key: 'discountsRestrictions',
			type: 'input',
			min: 0,
		},
		PEOPLE_RESTRICTIONS: {
			key: 'peopleRestrictions',
			title: '成团规则',
			type: 'input',
		},
		SORT: {
			key: 'sort',
			title: '活动排序',
			type: 'input',
			min: 0,
		},
		PROFILE:  {
			key: 'profile',
			type: 'textarea',
		},
		ADD_NUM: {
			key: 'addNum',
			title: '追加份数',
			type: 'input',
		},
		LOWEST_PRICE: {
			key: 'minPrice',
			title: '最低价格',
			type: 'input',
		},
		LOWEST_PRICE_NUM: {
			key: 'minNumber',
			title: '达到最低价至少砍',
			type: 'input',
		}
	 },
	LUCK_DRAW_FORM: {
		PRIZE_LOTTERY_TIME: {
			key: 'prizeLotteryTime',
			title: '开奖时间',
			type: 'dateTime',
		},
		PRIZE_EXPLAIN: {
			key: 'prizeExplain',
			title: '奖项说明',
			type: 'textarea',
		},
		PRIZE_TYPE: {
			key: 'prizeType',
			title: '抽奖类型',
			type: 'select',
			values: PRIZE_TYPE_LIST
		},
		PRIZE_METHOD: {
			key: 'prizeMethod',
			title: '开奖方式',
			type: 'radio',
			values: PRIZE_METHOD_LIST
		}
	},
	SEARCH_FORM: [
		{
			config: {
				key: 'type',
				title: '拼团类型',
				dictionary: 'pay_type',
				type: 'select',
			},
			values: ASSEMBLE_LIST
		},
		{
			config: {
				key: 'name',
				title: '活动名称',
				type: 'input'
			}
		},
		{
			config: {
				key: 'status',
				title: '当前状态',
				type: 'select',
			},
			values: STATUS_LIST
		},
		{
			config: {
				key: 'startTime',
				title: '开始时间',
				type: 'rangeDateTime',
				startDate: 'startTimeBegin',
				endDate: 'startTimeEnd'
			}
		},
		{
			config: {
				key: 'endTime',
				title: '结束时间',
				type: 'rangeDateTime',
				startDate: 'endTimeBegin',
				endDate: 'endTimeEnd'
			}
		},
	],
	LUCK_DRAW_SEARCH_FORM: [
		{
			config: {
				key: 'name',
				title: '活动名称',
				type: 'input'
			}
		},
		{
			config: {
				key: 'status',
				title: '当前状态',
				type: 'select',
			},
			values: STATUS_LIST
		},
		{
			config: {
				key: 'startTime',
				title: '开始时间',
				type: 'rangeDateTime',
				startDate: 'startTimeBegin',
				endDate: 'startTimeEnd'
			}
		},
		{
			config: {
				key: 'endTime',
				title: '结束时间',
				type: 'rangeDateTime',
				startDate: 'endTimeBegin',
				endDate: 'endTimeEnd'
			}
		},
	],
	COMMON_SEARCH_FORM: {
		EMPLOYEE_NAME: {
			config: {
				key: 'employeeName',
				title: '归属人',
				type: 'input',
				col: 5
			}
		},
		PHONE: {
			config: {
				key: 'phone',
				title: '手机号',
				type: 'input',
				col: 5
			}
		}
	},
	ASSEMBLE_TABLE_HEAD: [
		{ title: '序号', key: 'key',  align: 'center'},
		{ title: '活动名称', key: 'name'},
		{ title: '拼团类型', key: 'type',
		customRender: ( text, record ) => {
			let strs = ASSEMBLE_LIST.filter(one => one.dKey === record.type).map(one=>one.dValue).join(',')
			return strs;
		}},
		{ title: '原价', key: 'price',},
		{ title: '团价', key: 'discountsMoney',
		customRender: ( text, record ) => {
			let strs = `${record.discountsMoney}/${record.discountsRestrictions}`
			if (record.type === 'COMMON') {
				strs = `${record.discountsRestrictions}元`
			}
			return  strs
		}},
		{ title: '成团规则', key: 'peopleRestrictions',
		customRender: ( text, record ) => {
			let strs = `1-${record.peopleRestrictions}人`
			if (record.type === 'COMMON') {
				strs = `${record.peopleRestrictions}人`
			}
			return  strs
		}},
		{ title: '活动时效', key: 'validTime',
		customRender: ( text, record ) => {
			return  `${record.validTime}小时`
		}},
		{ title: '开始时间', key: 'startTime'},
		{ title: '结束时间', key: 'endTime'},
		{ title: '开团/份数', key: 'startGroupNum',
		customRender: ( text, record ) => {
			let strs = `${record.startGroupNum}/${record.validQuantity}`
			return  strs
		}},
		{ title: '成功团数', key: 'successGroupNum'},
		{ title: '创建人', key: 'createEmployeeName'},
		{ title: '创建时间', key: 'createTime'},
		{ title: '当前状态', key: 'status',
			customRender: ( text, record ) => {
				let strs = STATUS_LIST.filter(one => one.dKey === record.status).map(one=>one.dValue).join(',')
				return strs;
			}
		},
		{ title: '排序', key: 'sort'}
	],
	ASSEMBLE_STATISTICS_TABLE_HEAD: [
		{ title: '序号', key: 'key',  align: 'center'},
		{ title: '归属人', key: 'employeeName'},
		{ title: '员工转发量', key: 'employeeForwardNum'},
		{ title: '其他转发量', key: 'otherForwardNum'},
		{ title: '浏览量 PV', key: 'browseNum'},
		{ title: '访客量 UV', key: 'visitorNum'},
		{ title: '开团数', key: 'startGroupNum'},
		{ title: '成团数', key: 'successGroupNum'},
		{ title: '参团人数', key: 'joinGroupNum'},
		{ title: '核销人数', key: 'finishedNum'}
	],
	
	ASSEMBLE_VIEW_TABLE_HEAD: [
		{ title: '序号', key: 'key',  align: 'center'},
		{ title: '归属人', key: 'employeeName'},
		{ title: '参团人数', key: 'total'},
		{ title: '核销人数', key: 'verificationNum'},
		{ title: '优惠价格', key: 'discountsMoney'},
		{ title: '团购价', key: 'groupPrice',
			customRender: ( text, record ) => {
				let strs = record.groupPrice
				if (record.type === 'COMMON') {
					strs = record.discountsRestrictions
				}
				return strs;
			}
		},
		{ title: '开团时间', key: 'createTime'},
		{ title: '完成时间', key: 'finishTime'},
		{ title: '当前状态', key: 'status',
		customRender: ( text, record ) => {
			let strs = STATUS_HD_LIST.filter(one => one.dKey === record.status).map(one=>one.dValue).join(',')
			return strs;
		}}
	],
	ASSEMBLE_GROUP_TABLE_HEAD:[
		{ title: '序号', key: 'key',  align: 'center'},
		{ title: '姓名', key: 'userName',width: 150},
		{ title: '手机号', key: 'phone',},
		{ title: '归属人', key: 'employeeName',width: 150},
		{ title: '参团人数', key: 'total',},
		{ title: '优惠价格', key: 'discountsMoney',},
		{ title: '团购价', key: 'groupPrice',
			customRender: ( text, record ) => {
				let strs = record.groupPrice
				if (record.type === 'COMMON') {
					strs = record.discountsRestrictions
				}
			return strs;
		}},
		{ title: '拼团名称', key: 'configName'},
		{ title: '拼团类型', key: 'groupType', 
		customRender: ( text, record ) => {
			let strs = ASSEMBLE_LIST.filter(one => one.dKey === record.type).map(one=>one.dValue).join(',')
			return strs;
		}},
		{ title: '参团时间', key: 'createTime'},
		{ title: '核销时间', key: 'verificationTime'},
		{ title: '当前状态', key: 'status', 
		customRender: ( text, record ) => {
			let strs = STATUS_CT_LIST.filter(one => one.dKey === record.status).map(one=>one.dValue).join(',')
			return strs;
		}}
	],
	BARGAIN_TABLE_HEAD: [
		{ title: '序号', key: 'key',  align: 'center'},
		{ title: '活动名称', key: 'name'},
		{ title: '原价', key: 'price',},
		{ title: '最低价格', key: 'minPrice',
		customRender: ( text, record ) => {
			return  `${record.minPrice}元`
		}},
		{ title: '砍价时效', key: 'validTime',
		customRender: ( text, record ) => {
			return  `${record.validTime}小时`
		}},
		{ title: '开始时间', key: 'startTime'},
		{ title: '结束时间', key: 'endTime'},
		{ title: '参加人数', key: 'successGroupNum'},
		{ title: '创建人', key: 'createEmployeeName'},
		{ title: '创建时间', key: 'createTime'},
		{ title: '当前状态', key: 'status',
			customRender: ( text, record ) => {
				let strs = STATUS_LIST.filter(one => one.dKey === record.status).map(one=>one.dValue).join(',')
				return strs;
			}
		},
		{ title: '排序', key: 'sort'}
	],
	BARGAIN_VIEW_TABLE_HEAD: [
		{ title: '序号', key: 'key',  align: 'center'},
		{ title: '姓名', key: 'studentName',width: 150},
		{ title: '手机号', key: 'studentPhone',},
		{ title: '归属人', key: 'employeeName',width: 150},
		{ title: '优惠价格', key: 'hagglePrice'},
		{ title: '报名价格', key: 'enroolPrice'},
		{ title: '活动名称', key: 'groupName'},
		{ title: '参团时间', key: 'joinTime'},
		{ title: '核销时间', key: 'verificationTime'},
		{ title: '当前状态', key: 'status', 
		customRender: ( text, record ) => {
			let strs = STATUS_CT_LIST.filter(one => one.dKey === record.status).map(one=>one.dValue).join(',')
			return strs;
		}}
	],
	BARGAIN_STATISTICS_TABLE_HEAD: [
		{ title: '序号', key: 'key',  align: 'center'},
		{ title: '归属人', key: 'employeeName'},
		{ title: '员工转发量', key: 'employeeForwardNum'},
		{ title: '其他转发量', key: 'otherForwardNum'},
		{ title: '浏览量 PV', key: 'browseNum'},
		{ title: '访客量 UV', key: 'visitorNum'},
		{ title: '参加人数', key: 'joinUserNum'},
		{ title: '砍价人数', key: 'haggleUserNum'},
		{ title: '砍价次数', key: 'haggleNum'},
		{ title: '核销人数', key: 'finishedNum'}
	],
	BARGAIN_HELP_TABLE_HEAD: [
		{ title: '微信昵称', key: 'name'},
		{ title: '砍价金额', key: 'haggleMoney'},
		{ title: '帮砍时间', key: 'createTime'}
	],

	LCUK_DRAW_TABLE_HEAD: [
		{ title: '序号', key: 'key',  align: 'center'},
		{ title: '活动名称', key: 'name'},
		{ title: '奖项说明', key: 'prizeExplain',
		customRender: ( text, record, ) => {
			return text.length > 10
				? <Tooltip title={text}>
					<a>{text.substring(0, 10)}...</a>
				</Tooltip> : text;
		}},
		{ title: '开始时间', key: 'startTime'},
		{ title: '结束时间', key: 'endTime'},
		{ title: '开奖时间', key: 'prizeLotteryTime'},
		{ title: '发起份数', key: 'startGroupNum'},
		{ title: '参加人数', key: 'joinGroupUserNum'},
		{ title: '创建人', key: 'createEmployeeName'},
		{ title: '创建时间', key: 'createTime'},
		{ title: '当前状态', key: 'status',
			customRender: ( text, record ) => {
				let strs = STATUS_LIST.filter(one => one.dKey === record.status).map(one=>one.dValue).join(',')
				return strs;
			}
		},
		{ title: '排序', key: 'sort'}
	],
	LCUK_DRAW_STATISTICS_TABLE_HEAD: [
		{ title: '序号', key: 'key',  align: 'center'},
		{ title: '归属人', key: 'employeeName'},
		{ title: '教练转发量', key: 'employeeForwardNum'},
		{ title: '其他转发量', key: 'otherForwardNum'},
		{ title: '浏览量 PV', key: 'browseNum'},
		{ title: '访客量 UV', key: 'visitorNum'},
		{ title: '参加人数', key: 'joinGroupNum'},
		{ title: '签到人数', key: 'signNum'},
		// { title: '中奖人数', key: 'joinGroupNum'},
		{ title: '核销人数', key: 'finishedNum'}
	],
	LCUK_DRAW_GROUP_TABLE_HEAD:[
		{ title: '序号', key: 'key',  align: 'center'},
		{ title: '姓名', key: 'userName',width: 150,
		customRender: ( text, record ) => {
			let prizeStatus = record.prizeStatus
		return prizeStatus * 1 === 1 ? <span><Tag color="#f50" key="f50">无效</Tag>{text}</span> : text;
		}},
		{ title: '手机号', key: 'phone',},
		{ title: '归属人', key: 'employeeName',width: 150},
		{ title: '活动名称', key: 'configName'},
		{ title: '优惠价格', key: 'discountsMoney',},
		{ title: '参加时间', key: 'createTime'},
		{ title: '核销时间', key: 'verificationTime'},
		{ title: '签到时间', key: 'signTime'},
		{ title: '核销状态', key: 'status', 
		customRender: ( text, record ) => {
			let strs = STATUS_CT_LIST.filter(one => one.dKey === text).map(one=>one.dValue).join(',')
			return strs;
		}},
		{ title: '签到状态', key: 'signStatus', 
		customRender: ( text, record ) => {
			let strs = SIGN_STATUS_LIST.filter(one => one.dKey === text).map(one=>one.dValue).join(',')
			return strs;
		}}
	],
	LCUK_DRAW_VIEW_TABLE_HEAD: [
		{ title: '序号', key: 'key',  align: 'center'},
		{ title: '归属人', key: 'employeeName'},
		{ title: '参加人数', key: 'total'},
		{ title: '核销人数', key: 'verificationNum'}
	],
	LCUK_DRAW_GROUP_SEARCH_FORM: [
		{
			config: {
				key: 'status',
				title: '核销状态',
				type: 'select',
			},
			values: STATUS_CT_LIST
		},
		{
			config: {
				key: 'signStatus',
				title: '签到状态',
				type: 'select',
			},
			values: SIGN_STATUS_LIST
		},
		{
			config: {
				key: 'phone',
				title: '手机号',
				type: 'input',
				col: 5
			}
		}
	],
	OPEN_LCUK_SEARCH_FORM:[
		{
			config: {
				key: 'activityPrizeType',
				title: '开奖方式',
				type: 'select',
			},
			values: OPEN_PRIZE_METHOD_LIST
		},
		{
			config: {
				key: 'activityPrizeComplateStatus',
				title: '开奖状态',
				type: 'select',
			},
			values: OPEN_PRIZE_STATUS_LIST
		},
		{
			config: {
				key: 'keywords',
				title: '关键字',
				type: 'input',
				placeholder: '请输入活动名称或活动归属',
				col: 5
			}
		}
	],
	OPEN_LCUK_TABLE_HEAD: [
		{ title: '序号', key: 'key',  align: 'center'},
		{ title: '活动名称', key: 'activityName'},
		{ title: '开奖方式', key: 'activityPrizeType', 
		customRender: ( text, record ) => {
			let strs = OPEN_PRIZE_METHOD_LIST.filter(one => one.dKey === text + '').map(one=>one.dValue).join(',')
			return strs;
		}},
		{ title: '归属', key: 'activityBelongTo',width: 150, dictionary: 'employee_id'},
		{ title: '活动开奖时间', key: 'prizeLotteryTime'},
		{ title: '完成开奖时间', key: 'activityPrizeComplateTime'},
		{ title: '奖池人数', key: 'poolSize'},
		{ title: '中奖人数', key: 'prizedCount'},
		{ title: '开奖状态', key: 'activityPrizeComplateStatus', 
		customRender: ( text, record ) => {
			let strs = OPEN_PRIZE_STATUS_LIST.filter(one => one.dKey ===  text + '').map(one=>one.dValue).join(',')
			return strs;
		}}
	]
}
