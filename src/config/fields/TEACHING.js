export default {
	CLASS: {
		ID: {
			key: 'id',
		},
		NAME: {
			key: 'title',
			title: '班型名称',
			type: 'input',
		},
		LICENSE_TYPE: {
			key: 'licenseType',
			title: '申领类型',
			type: 'select',
			dictionary: 'license_type',
		},
		LICENSE_TYPE_ACTIVE: {
			key: 'licenseType',
			title: '申领类型',
			type: 'select',
			dictionary: 'license_type',
			dictSwitch: 1,
		},
		DEPART_ID: {
			key: 'departId',
			title: '教学机构',
			type: 'select',
			dictionary: 'depart_id',
		},
		DEPART_ID_SCHOOL: {
			key: 'departId',
			title: '教学机构',
			type: 'select',
			dictionary: 'depart_id_school',
		},
		MATCH_MODE: {
			key: 'matchMode',
			title: '分配模式',
			type: 'select',
			dictionary: 'match_mode',
		},
		BOOK_NUM: {
			key: 'bookNum',
			title: '学员上限/车',
			type: 'select',
			dictionary: 'book_num',
		},
		WEEKDAY: {
			key: 'allowDays',
			title: '允许预约日',
			type: 'select',
			dictionary: 'week_day',
		},
		PRE_DAYS: {
			key: 'preDays',
			title: '提前预约天数',
			type: 'inputNumber',
		},
		LESSONS_PER_DAY: {
			key: 'lessonsPerDay',
			title: '单日可约最多课节',
			type: 'inputNumber',
		},
		NONCANCELABLE_IN: {
			key: 'noncancelableIn',
			title: '预约成功后多少小时内禁止取消',
			type: 'inputNumber',
		},
		NONCANCELABLE_BEFORE: {
			key: 'noncancelableBefore',
			title: '课程开始前多少小时内禁止取消',
			type: 'inputNumber',
		},
		VALUE_ADDED: {
			key: 'valueAdded',
			title: '增值服务',
			type: 'checkbox',
			dictionary: 'value_added',
		},
		MONEY: {
			key: 'money',
			title: '班型学费',
			type: 'inputNumber',
		},
		PAY_TYPE: {
			key: 'payType',
			title: '交费类型',
			type: 'select',
			dictionary: 'pay_type',
		},
		BALANCE: {
			key: 'balance',
			title: '余额款',
			type: 'inputNumber',
		},
		INCLUDE_KM2: {
			key: 'includeKm2',
			title: '是否含科目二',
			type: 'switch',
		},
		LESSONS_KM2: {
			key: 'km2Lessons',
			title: '含科目二课节',
			type: 'inputNumber',
		},
		LESSONS_KM3: {
			key: 'km3Lessons',
			title: '含科目三课节',
			type: 'inputNumber',
		},
		FEE_KM2: {
			key: 'km2Fee',
			title: '科目二课时费',
			type: 'inputNumber',
		},
		FEE_KM3: {
			key: 'km3Fee',
			title: '科目三课时费',
			type: 'inputNumber',
		},
		MEMO: {
			key: 'description',
			title: '班型简介',
			type: 'textarea',
		},
		STATUS: {
			key: 'status',
			title: '状态',
			type: 'switch',
			dictionary: 'status',
		},
	},
	LESSON: {
		ID: {
			key: 'id',
			title: 'ID',
			type: 'input'
		},
		TITLE: {
			key: 'title',
			title: '名称',
			type: 'input'
		},
		PERIOD_LIST: {
			key: 'periodList',
			title: '周期范围',
			type: 'rageDate'
		},
		TIME_RANGE: {
			key: 'timeRange',
			title: '正常时段',
			type: 'time'
		},
		EXT_TIME_RANGE: {
			key: 'extTimeRange',
			title: '加班时段',
			type: 'time'
		},
		STATUS: {
			key: 'status',
			title: '是否启用',
			type: 'switch',
			dictionary: 'status',
		},
		COURSE_DATE: {
			key: 'courseDate',
			title: '课程日期',
			type: 'rangeDate'
		},
		START_TIME: {
			key: 'startTime',
			title: '开始时间',
			type: 'time'
		},
		END_TIME: {
			key: 'endTime',
			title: '结束时间',
			type: 'time'
		},
		COACH_ID: {
			key: 'coachId',
			title: '教练姓名',
			type: 'input',
			dictionary: 'employee_id',
		},
		COACH_GENDER: {
			key: 'coachGender',
			title: '教练性别',
			type: 'select'
		},
		COACH_MOBILE: {
			key: 'coachMobile',
			title: '教练手机号',
			type: 'input'
		},
		CURRENT_COACH: {
			key: 'isCurrentCoach',
			title: '课程范围',
			type: 'select',
		},
	},
	COURSE: {
		ID: {
			key: 'id',
		},
		COACH_ID: {
			key: 'coachId',
			title: '教练',
			type: 'select',
			dictionary: 'employee_id_coach',
		},
		SEARCH_COACH_ID: {
			key: 'coachId',
			title: '教练',
			type: 'select',
			dictionary: 'coach_id',
		},
		DATE: {
			key: 'courseDate',
			title: '课程日期',
			type: 'date',
		},
		RANGE_DATE: {
			key: 'rangeDate',
			title: '课程日期范围',
			type: 'rangeDate',
		},
		START_DATE: {
			key: 'startDate',
			type: 'date',
		},
		END_DATE: {
			key: 'endDate',
			type: 'date',
		},
		RANGE_TIME: {
			key: 'rangeTime',
			title: '培训时段',
		},
		START_TIME: {
			key: 'startTime',
			title: '起始时间',
			type: 'time',
		},
		END_TIME: {
			key: 'endTime',
			title: '结束时间',
			type: 'time',
		},
		LICENSE_TYPE: {
			key: 'licenseType',
			title: '申领类型',
			type: 'select',
			dictionary: 'license_type',
		},
		LICENSE_TYPE_ACTIVE: {
			key: 'licenseType',
			title: '申领类型',
			type: 'select',
			dictionary: 'license_type',
			dictSwitch: 1,
		},
		STUDENT_NUM: {
			key: 'studentNum',
			title: '预约人数',
			type: 'input'
		},
		PLACE_NUM: {
			key: 'placeNum',
			title: '占位人数',
			type: 'input'
		},
		CREATE_TIME: {
			key: 'createTime',
			title: '预约时间',
			type: 'date'
		},
		LESSON_STATUS: {
			key: 'status',
			title: '课程状态',
			type: 'check',
			dictionary: 'status',
		},
		KM: {
			key: 'kmCode',
			title: '培训科目',
			type: 'select',
			dictionary: 'km',
		},
		TEACH_KM: {
			key: 'kmCode',
			title: '培训科目',
			type: 'select',
			dictionary: 'coach_km',
		},
		BOOK_NUM: {
			key: 'bookNum',
			title: '人/车上限',
			type: 'select',
			dictionary: 'book_num',
		},
		STATUS: {
			key: 'status',
			title: '课程状态',
			type: 'select',
			dictionary: 'status',
		},
		SIGN_STATUS: {
			key: 'signStatus',
			title: '签到状态',
			type: 'select',
			dictionary: 'sign_status',
		},
		CONFIRM_STATUS: {
			key: 'confirmStatus',
			title: '教练确认状态',
			type: 'select',
			dictionary: 'confirm_status',
		},
		RECORD_STATUS: {
			key: 'recordStatus',
			title: '课程状态',
			type: 'select',
			dictionary: 'record_status',
		},
		LOGIC_STATUS: {
			key: 'logicStatus',
			title: '课程状态',
			type: 'select',
			dictionary: 'logic_status',
		},
		QUICK_SEARCH: {
			key: 'coachName',
			title: '教练',
			type: 'input',
			placeholder: '姓名',
		},
		BOOK_TIME_RANGE: {
			key: 'bookTimeRange',
			title: '预约日期',
			type: 'rangeDate',
			startDate: 'bookTimeBegin',
			endDate: 'bookTimeEnd'
		},
		BOOK_DATE_RANGE: {
			key: 'bookDateRange',
			title: '课程日期',
			type: 'rangeDate'
		},
		QUICK_SEARCH2: {
			key: 'keywords',
			title: '学员',
			type: 'input',
			placeholder: '姓名/手机号/身份证',
		},
		MEMO: {
			key: 'memo',
			title: '备注',
			type: 'textarea',
		},
		SITE_ID: {
			key: 'siteId',
			title: '场地',
			type: 'select',
			dictionary: 'site_id',
			dictSwitch: 1,
		},
		DEPART_ID: {
			key: 'departId',
			title: '教学机构',
			type: 'select',
			dictionary: 'depart_id_school',
		},
	},
	LOG: {
		CONTENT: {
			key: 'content',
			title: '',
			type: 'textarea',
		},
		COURSE_DATE: {
			key: 'courseDate',
			title: '课程日期',
			type: 'rangeDate',
			startDate: 'courseDateStart',
			endDate: 'courseDateEnd'
		},
		STUDENT_NAME: {
			key: 'studentName',
			title: '学生姓名',
			type: 'select',
			dictionary: 'employee_id_coach',
		},
		COACH_NAME: {
			key: 'employeeName',
			title: '责任教练',
			type: 'select',
			dictionary: 'employee_id_coach',
		},
		STUDENT_MOBILE: {
			key: 'studentMobile',
			title: '学员手机号',
			type: 'input'
		},
		EVALUATION_STATUS: {
			key: 'evaluationStatus',
			title: '评价状态',
			type: 'select',
			dictionary: 'evaluation_status',
		},
		REVIEW_STATUS: {
			key: 'reviewStatus',
			title: '点评状态',
			type: 'select',
			dictionary: 'review_status',
		},
		SEARCH_KEY: {
			key: 'key',
			title: '关键字',
			type: 'input',
			placeholder: '教练/学员姓名、手机号'
		}
		
	}
}
