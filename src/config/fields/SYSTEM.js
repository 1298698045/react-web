export default {
	/****** 字典相关 ******/
	DICT: {
		KEY: {
			key: 'dKey',
		},
		VALUE: {
			key: 'dValue',
			title: '值',
			type: 'input',
		},
		STATUS: {
			key: 'dictSwitch',
			title: '开启状态',
			type: 'select',
			dictionary: 'status',
		},
		DEFAULT: {
			key: 'isDefault',
			title: '是否默认',
			type: 'switch',
		},
		READONLY: {
			key: 'readonly',
			title: '类型',
		},
		MEMO: {
			key: 'memo',
			title: '说明',
			type: 'textarea',
		},
	},
	/****** 操作记录相关 ******/
	OPERATION: {
		ID: {
			key: 'id',
			title: 'ID',
		},
		ACCOUNT: {
			key: 'account',
			title: '账号',
			type: 'input',
		},
		NAME: {
			key: 'name',
			title: '姓名',
			type: 'input',
		},
		CLIENT: {
			key: 'platform',
			title: '操作端',
			type: 'select',
		},
		TYPE: {
			key: 'target',
			title: '操作类型',
			type: 'select',
		},
		CONTENT: {
			key: 'data',
			title: '操作内容',
		},
		IP: {
			key: 'createIp',
			title: 'IP',
		},
		TIME: {
			key: 'createTime',
			title: '操作时间',
		},
		DATE_RANGE: {
			key: 'rangeDate',
			title: '操作时间范围',
			type: 'rangeDate',
		},
	},
	/****** 角色相关 ******/
	ROLE: {
		ID: {
			key: 'id',
			title: 'ID',
		},
		NAME: {
			key: 'title',
			title: '角色名称',
			type: 'input',
		},
		DESC: {
			key: 'description',
			title: '角色描述',
			type: 'textarea',
		},
		STATUS: {
			key: 'status',
			title: '当前状态',
			type: 'select',
			dictionary: 'status',
		},
		DATE: {
			key: 'date',
			title: '创建日期',
			type: 'date',
		},
	},
	/****** 权限相关 ******/
	PRIVILEGE: {},
	/****** 申领类型相关 ******/
	LICENSE: {
		VALUE: {
			key: 'dValue',
			title: '驾照类型',
			// dictionary: 'license_type',
		},
		MEMO: {
			key: 'memo',
			title: '说明',
		},
	},
	/****** 分配模式相关 ******/
	MATCH_MODE: {
		VALUE: {
			key: 'dValue',
			title: '分配模式',
		},
	},
	/****** 允许预约日相关 ******/
	WEEKDAY: {
		VALUE: {
			key: 'dValue',
			title: '名称',
			type: 'input',
			dictionary: 'week_day',
		},
		MEMO: {
			key: 'memo',
			title: '允许预约日',
			type: 'checkbox',
			dictionary: 'week',
		},
	},
	/****** 允许预约日相关 ******/
	BOOK_NUM: {
		VALUE: {
			key: 'dValue',
			title: '学员上限/车',
			type: 'inputNumber',
			dictionary: 'book_num',
		},
	},
	/****** 暂缓建档原因相关 ******/
	DELAY_REASON: {
		VALUE: {
			key: 'dValue',
			title: '暂缓建档原因',
			type: 'input',
			dictionary: 'delay_reason',
		},
	},
	/****** 终止建档原因相关 ******/
	STOP_REASON: {
		VALUE: {
			key: 'dValue',
			title: '终止建档原因',
			type: 'input',
			dictionary: 'stop_reason',
		},
	},
	/****** 学员退学原因相关 ******/
	QUIT_REASON: {
		VALUE: {
			key: 'dValue',
			title: '学员退学原因',
			type: 'input',
			dictionary: 'quit_reason',
		},
	},
	/****** 其他配置 ******/
	SERVICE: {
		TEL: {
			key: 'tel',
			title: '客服电话',
			type: 'input',
		},
		ON_TIME: {
			key: 'onTime',
			title: '上班时间',
			type: 'time',
		},
		OFF_TIME: {
			key: 'offTime',
			title: '下班时间',
			type: 'time',
		},
		WORK_TIME: {
			key: 'wordTime',
			title: '在线时间',
		},
		OPERATOER: {
			key: 'operator',
			title: '修改人',
		},
		OPERATE_TIME: {
			key: 'operateTime',
			title: '修改时间',
		},
		RECEIPT_TITLE: {
			key: 'receipt_title',
			title: '收据抬头',
			type: 'input',
		},
	},
	FUNCTION_SETTINGS: {
		DEPART_ID_SCHOOL: {
			key: 'departId',
			title: '机构',
			type: 'select',
			dictionary: 'depart_id_school',
		},
		USERNAME_122:{
			key: 'username_122',
			title: '122账号',
			type: 'input'
		},
		PWD_122:{
			key: 'PWD_122',
			title: '122密码',
			type: 'input'
		}
	}
};