export default {
	/****** 员工基础信息 ******/
	ID: {
		key: 'id',
		title: '员工ID',
		type: 'select',
		dictionary: 'employee_id',
	},
	NAME: {
		key: 'name',
		title: '员工姓名',
		type: 'input',
	},
	MOBILE: {
		key: 'mobile',
		title: '手机号',
		type: 'input',
		validator: (rule, value, callback) => {
			let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
			if(typeof value !== 'undefined' && reg.test(value) === false){
				callback('手机号码格式不正确')
			}
			callback();
		}
	},
	IDCARD_NO: {
		key: 'idNo',
		title: '证件号码',
		type: 'input',
	},
	GENDER: {
		key: 'gender',
		title: '性别',
		type: 'radio',
		dictionary: 'gender',
	},
	BIRTHDAY: {
		key: 'birthday',
		title: '出生日期',
		type: 'date',
	},
	EDUCATION: {
		key: 'education',
		title: '学历',
		type: 'select',
		dictionary: 'education',
	},
	SALARY: {
		key: 'salary',
		title: '岗位薪资',
		type: 'input',
	},
	LABOR_RELATION: {
		key: 'laborRelation',
		title: '与司关系',
		type: 'select',
		dictionary: 'labor_relation',
	},
	ENTRY_TIME: {
		key: 'entryTime',
		title: '入职日期',
		type: 'date',
	},
	DEPART_ID: {
		key: 'departId',
		title: '部门',
		type: 'select',
		dictionary: 'depart_id',
	},
	DEPART_ID_SCHOOL: {
		key: 'departId',
		title: '机构',
		type: 'select',
		// dictionary: 'depart_id',
		dictionary: 'depart_id_school',
	},
	POSITION_ID: {
		key: 'positionId',
		title: '职务名称',
		type: 'select',
		dictionary: 'position_id',
	},
	POSITION_ID_ACTIVE: {
		key: 'positionId',
		title: '职务名称',
		type: 'select',
		dictionary: 'position_id',
		dictSwitch: 1,
	},
	POSITION_TYPE: {
		key: 'positionType',
		title: '职务类型',
		type: 'select',
		dictionary: 'position_type',
	},
	ROLE_ID: {
		key: 'roles',
		title: '角色',
		type: 'select',
		dictionary: 'role_id',
	},
	ROLE_ID_ACTIVE: {
		key: 'roles',
		title: '角色',
		type: 'select',
		dictionary: 'role_id',
		dictSwitch: 1,
	},
	BANK: {
		key: 'bank',
		title: '开户行',
		type: 'input',
	},
	BANK_ACCOUNT: {
		key: 'bankAccount',
		title: '银行帐号',
		type: 'input',
	},
	CAR_ID: {
		key: 'carIds',
		title: '绑定车辆',
		type: 'select',
		dictionary: 'car_id',
	},
	CAR_ID_ACTIVE: {
		key: 'carIds',
		title: '绑定车辆',
		type: 'select',
		dictionary: 'car_id',
		dictSwitch: 1,
	},
	QUICK_SEARCH: {
		key: 'keywords',
		title: '员工',
		type: 'input',
		placeholder: '姓名/手机号',
	},
	LEADER: {
		key: 'leader',
		title: '上级',
		type: 'input',
	},
	DOC_ACCEPTOR: {
		key: 'isDocAcceptor',
		title: '档案受理人',
		type: 'select',
	},
	LEAVING: {
		key: 'leaving',
		title: '状态',
		type: 'select',
		dictionary: 'leaving',
	},
	/****** 教练信息 ******/
	COACH_INFO: {
		LICENSE_TYPE: {
			key: 'licenseType',
			title: '准驾车型',
			type: 'select',
			dictionary: 'license_type',
			parent: 'coachInfo',
		},
		TEACH_LICENSE_TYPE: {
			key: 'teachLicense',
			title: '准教车型',
			type: 'select',
			dictionary: 'license_type',
			parent: 'coachInfo',
		},
		TEACH_KM: {
			key: 'teachKm',
			title: '教学科目',
			type: 'select',
			dictionary: 'coach_km',
			parent: 'coachInfo',
		},
		LESSON_ID: {
			key: 'planId',
			title: '教学时段',
			type: 'select',
			dictionary: 'lesson_id',
			parent: 'coachInfo',
		},
		LESSON_ID_ACTIVE: {
			key: 'planId',
			title: '教学时段',
			type: 'select',
			dictionary: 'lesson_id',
			dictSwitch: 1,
			parent: 'coachInfo',
		},
		BOOK_NUM: {
			key: 'bookNum',
			title: '学员上限/车',
			type: 'checkbox',
			dictionary: 'book_num',
			dictSwitch: 1,
			parent: 'coachInfo',
		},
		SITE_ID: {
			key: 'siteId',
			title: '所在场地',
			type: 'select',
			dictionary: 'site_id',
			dictSwitch: 1,
			parent: 'coachInfo',
		},
		COURSE_ARRANGE: {
			key: 'courseArrange',
			title: '排课方式',
			type: 'select',
			dictionary: 'course_arrange'
		},
		LICENSE_NO: {
			key: 'licenseNo',
			title: '驾驶证号',
			type: 'input',
			parent: 'coachInfo',
		},
		LICENSE_FIRST_DATE: {
			key: 'firstTimeDate',
			title: '初领日期',
			type: 'date',
			parent: 'coachInfo',
		},
		LICENSE_EXPIRE_DATE: {
			key: 'expireDate',
			title: '有效期限',
			type: 'date',
			parent: 'coachInfo',
		},
		COACH_NO: {
			key: 'coachNo',
			title: '教练证号',
			type: 'input',
			parent: 'coachInfo',
		},
		CARS: {
			key: 'cars',
			title: '绑定车辆',
			type: 'select',
			dictionary: 'car_id',
		},
		STUDENT_ACTIVE_DAYS: {
			key: 'active',
			title: '学员活跃/潜水天数',
			type: 'radio',
			dictionary: 'active_days'
		},
		STUDENT_TOTAL: {
			key: 'total',
			title: '学员总数',
		},
		STUDENT_KM: {
			key: 'km',
			title: '所属科目',
		},
		STUDENT_KM2: {
			key: 'km2Count',
			title: '科目2学员数',
		},
		STUDENT_KM3: {
			key: 'km3Count',
			title: '科目3学员数',
		},
		STUDENT_KM2_ACTIVE: {
			key: 'km2ActiveCount',
			title: '科目2活跃数',
		},
		STUDENT_KM3_ACTIVE: {
			key: 'km3ActiveCount',
			title: '科目3活跃数',
		},
		STUDENT_KM2_UNACTIVE: {
			key: 'km2UnactiveCount',
			title: '科目2潜水数',
		},
		STUDENT_KM3_UNACTIVE: {
			key: 'km3UnactiveCount',
			title: '科目3潜水数',
		},
		STUDENT_GRADUATED: {
			key: 'graduationCount',
			title: '毕业数',
		},
	},
};