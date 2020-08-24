export default {
	/****** 部门相关 ******/
	DEPART_ID: {
		key: 'id',
	},
	DEPART_TYPE: {
		key: 'departType',
		title: '类型',
		type: 'radio',
		dictionary: 'depart_type',
	},
	DEPART_NAME: {
		key: 'departName',
		title: '名称',
		type: 'input',
	},
	DEPART_PARENT: {
		key: 'parent',
		title: '上级所属',
		type: 'select',
		dictionary: 'depart_id',
	},
	DEPART_ORDER: {
		key: 'order',
		title: '排序',
		type: 'inputNumber',
	},
	DEPART_MEMO: {
		key: 'memo',
		title: '备注',
		type: 'textarea',
	},
	/****** 职务相关 ******/
	POSITION_ID: {
		key: 'positionId',
		title: '职务名称',
		type: 'select',
		dictionary: 'position_id',
	},
	POSITION_NAME: {
		key: 'title',
		title: '职务名称',
		type: 'input',
		dictionary: 'position_id',
	},
	POSITION_TYPE: {
		key: 'positionType',
		title: '职务类型',
		type: 'select',
		dictionary: 'position_type',
	},
	POSITION_LEVEL: {
		key: 'positionLevel',
		title: '职务级别',
		type: 'select',
		dictionary: 'position_level',
	},
	POSITION_MEMO: {
		key: 'memo',
		title: '备注',
		type: 'textarea',
	},
	POSITION_STATUS: {
		key: 'status',
		title: '状态',
		type: 'select',
		dictionary: 'status',
	},
	/****** 调休相关 ******/
	VACATION: {
		ID: {
			key: 'id',
			title: 'ID',
		},
		NAME: {
			key: 'name',
			title: '员工姓名',
		},
		MOBILE: {
			key: 'mobile',
			title: '手机号',
		},
		DEPART_ID: {
			key: 'departId',
			title: '教学机构',
			type: 'select',
			dictionary: 'depart_id_school',
		},
		DEPART_ID_TABLE: {
			key: 'departId',
			title: '教学机构',
			type: 'select',
			dictionary: 'depart_id',
		},
		POSITION_ID: {
			key: 'positionId',
			title: '职务',
			type: 'select',
			dictionary: 'position_id',
		},
		TIME: {
			key: 'time',
			title: '休假时间',
		},
		START_DATE: {
			key: 'vacationStartDate',
			title: '起始日期',
		},
		START_TIME: {
			key: 'vacationStartTime',
			title: '起始时间',
		},
		END_DATE: {
			key: 'vacationEndDate',
			title: '结束日期',
		},
		END_TIME: {
			key: 'vacationEndTime',
			title: '结束时间',
		},
		REASON: {
			key: 'reason',
			title: '调休原因',
		},
		CREATE_TIME: {
			key: 'createTime',
			title: '申请时间',
		},
		AUDIT_STATUS: {
			key: 'auditStatus',
			title: '休假状态',
			type: 'select',
			dictionary: 'audit_status',
		},
		AUDITOR: {
			key: 'auditor',
			title: '审批人',
			dictionary: 'employee_id',
		},
		AUDIT_TIME: {
			key: 'auditTime',
			title: '审批时间',
		},
		DATE_RANGE: {
			key: 'rangeDate',
			title: '休假日期',
			type: 'rangeDate',
		},
		QUICK_SEARCH: {
			key: 'keywords',
			title: '员工',
			type: 'input',
			placeholder: '姓名/手机号',
		},
	},
	/****** 档案受理人相关 ******/
	ARCHIVIST: {
		ID: {
			key: 'id',
			title: '序号',
		},
		DEFAULT: {
			key: 'isDocAcceptor',
			title: '是否默认',
		},
	},
	/****** 外协机构相关 ******/
	COLLA_ID: {
		key: 'id',
		title: 'ID',
		dictionary: 'colla_id',
	},
	// COLLA_NO: {
	// 	key: 'NO',
	// },
	COLLA_NAME: {
		key: 'title',
		title: '机构名称',
		type: 'input',
	},
	COLLA_LOCATION: {
		key: 'location',
		title: '省市区',
		type: 'location',
	},
	COLLA_PROVINCE_CODE: {
		key: 'province',
		title: '所在省',
		type: 'select',
	},
	COLLA_CITY_CODE: {
		key: 'city',
		title: '所在市',
		type: 'select',
	},
	COLLA_DISTRICT_CODE: {
		key: 'district',
		title: '所在区',
		type: 'select',
	},
	COLLA_ADDRESS: {
		key: 'address',
		title: '详细地址',
		type: 'input',
	},
	COLLA_TYPE: {
		key: 'coopType',
		title: '机构类型',
		type: 'checkbox',
		dictionary: 'coop_uint_type',
	},
	COLLA_CONTACT_NAME: {
		key: 'contact',
		title: '联系人',
		type: 'input',
	},
	COLLA_CONTACT_MOBILE: {
		key: 'mobile',
		title: '手机号',
		type: 'inputNumber',
	},
	/****** 校外介绍人 ******/
	INTRODUCER_ID: {
		key: 'id',
		title: 'ID',
		dictionary: 'introducer_id',
	},
	INTRODUCER_NAME: {
		key: 'name',
		title: '姓名',
		type: 'input',
		required: true
	},
	INTRODUCER_SEX: {
		key: 'gender',
		title: '性别',
		type: 'radio',
		dictionary: 'gender',
		required: true
	},
	INTRODUCER_MOBILE: {
		key: 'mobile',
		title: '手机号',
		type: 'inputNumber',
		required: true
	},
	INTRODUCER_ADDRESS: {
		key: 'address',
		title: '联系地址',
		type: 'input',
		required: false
	},
	INTRODUCER_MEMO: {
		key: 'memo',
		title: '备注',
		type: 'textarea',
		required: false
	},
	INTRODUCER_CONTACT_NAME: {
		key: 'createTime',
		title: '创建/编辑时间',
		type: 'date',
	},
	INTRODUCER_QUICK_SEARCH: {
		key: 'key',
		title: '介绍人',
		type: 'input',
		placeholder: '姓名/手机号',
	},
};