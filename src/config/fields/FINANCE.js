export default {
	NAME: {
		key: 'name',
		title: '姓名',
		type: 'input',
	},
	STUDENT_ID: {
		key: 'studentId',
		title: '学员ID',
		type: 'input',
	},
	MOBILE: {
		key: 'mobile',
		title: '手机号',
		type: 'input',
	},
	CLASS_TITLE: {
		key: 'classTitle',
		title: '班型名称',
		type: 'input',
	},
	CLASS_PRICE: {
		key: 'classPrice',
		title: '班型价格',
		type: 'input',
	},
	FEE_TYPE: {
		key: 'payType',
		title: '交费类型',
		type: 'input',
		dictionary: 'pay_type',
	},
	REDUCE_AMOUNT: {
		key: 'reducedAmount',
		title: '下调金额',
		type: 'inputNumber',
	},
	AMOUNT: {
		key: 'amount',
		title: '余额款',
		type: 'inputNumber',
	},
	PAY_MODE: {
		key: 'payMode',
		title: '支付方式',
		type: 'select',
		dictionary: 'pay_mode',
	},
	REDUCE_REASON: {
		key: 'reducedReason',
		title: '下调原因',
		type: 'input',
	},
	DISCOUNT: {
		key: 'discount',
		title: '优惠金额',
		type: 'input',
	},
	RECEIPTS: {
		key: 'receipts',
		title: '报名交费',
		type: 'input',
	},
	ORIGINAL_VALUE: {
		key: 'originalValue',
		title: '变更前班型',
		type: 'input',
		dictionary: 'class_id',
	},
	NEW_VALUE: {
		key: 'newValue',
		title: '变更后班型',
		type: 'input',
		dictionary: 'class_id',
	},
	VALUE_ADDED: {
		key: 'valueAdded',
		title: '增值服务金额',
		type: 'input',
		dictionary: 'value_added'
	},
	VALUE_ADD_INFO: {
		key: 'valueAddInfo',
		title: '增值服务',
		type: 'input',
	},
	TOTAL: {
		key: 'total',
		title: '合计',
		type: 'input',
	},
	REFUND_TYPE: {
		key: 'refundType',
		title: '退费类型',
		type: 'select',
		dictionary: 'refund_type',
	},
	REFUND_REASON: {
		key: 'reason',
		title: '退费原因',
		type: 'select',
	},
	OPERATOR_NAME: {
		key: 'operatorName',
		title: '申请人',
		type: 'input',
	},
	CREATE_TIME: {
		key: 'createTime',
		title: '申请时间',
		type: 'date',
	},
	OP_STATUS: {
		key: 'opStatus',
		title: '退费状态',
		type: 'select',
		dictionary: 'refund_status',
	},
	OP_RESULT: {
		key: 'opStatus',
		title: '审核结果',
		type: 'select',
		dictionary: 'refund_status',
	},
	SEARCH_DATE: {
		key: 'date',
		title: '提交日期',
		type: 'rangeDate',
	},
	QUICK_SEARCH: {
		key: 'keywords',
		title: '关键字',
		type: 'input',
		placeholder: '学员姓名/手机号/身份证号',
	},
	// 新增筛选条件 start
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
	STUDENT_TYPE: {
		key: 'studentType',
		title: '学员类型',
		type: 'select',
		dictionary: 'student_type',
	},
	CLASS_ID: {
		key: 'classId',
		title: '班型',
		type: 'select',
		dictionary: 'class_id',
	},
	INTRO: {
		key: 'intro',
		title: '介绍人',
		type: 'select',
		dictionary: 'employee_id',
	},
	INTRO_TYPE: {
		key: 'introducerType',
		title: '介绍人类型',
		type: 'select',
	},
	// end
	KM2_LESSONS: {
		key: 'km2Lessons',
		title: '科目二已学',
		type: 'input',
	},
	KM3_LESSONS: {
		key: 'km3Lessons',
		title: '科目三已学',
		type: 'input',
	},
	KM2_SURPLUS: {
		key: 'km2Surplus',
		title: '科目二剩余',
		type: 'input',
	},
	KM3_SURPLUS: {
		key: 'km3Surplus',
		title: '科目三剩余',
		type: 'input',
	},
	SUPPLEMENTARY_KM: {
		key: 'memo',
		title: '补考科目',
		type: 'input',
		dictionary: 'km'
	},
	JOURNAL_TARGET: {
		key: 'target',
		title: '营收名称',
		type: 'input',
	},
	JOURNAL_DATE: {
		key: 'journalDate',
		title: '归属时间',
		type: 'date',
	},
	JOURNAL_AMOUNT: {
		key: 'amount',
		title: '营收金额',
		type: 'inputNumber',
	},
	JOURNAL_CREATE_TIME: {
		key: 'createTime',
		title: '登记时间',
		type: 'date',
	},
	JOURNAL_CREATOR: {
		key: 'creator',
		title: '登记人',
		type: 'input',
		dictionary: 'employee_id',
	},
	JOURNAL_SEARCH_MONTH: {
		key: 'journalSearchMonth',
		title: '归属月份',
		type: 'inputNumber',
	},
	JOURNAL_SEARCH_YEAR: {
		key: 'journalSearchYear',
		title: '归属年份',
		type: 'inputNumber',
	},
	KM2_LESSON: {
		key: 'km2Lesson',
		title: '科目二',
		type: 'input',
	},
	KM2_LESSON_AMOUNT: {
		key: 'km2LessonAmount',
		title: '科目二总金额',
		type: 'input',
	},
	KM3_LESSON: {
		key: 'km3Lesson',
		title: '科目三',
		type: 'input',
	},
	KM3_LESSON_AMOUNT: {
		key: 'km3LessonAmount',
		title: '科目三总金额',
		type: 'input',
	},
	APPROVER: {
		key: 'approver',
		title: '审核人',
		type: 'input',
	},
	EX_JOURNAL_TYPE: {
		key: 'journalType',
		title: '费用类型',
		type: 'select',
	},
	EX_JOURNAL_SUBTYPE: {
		key: 'subtype',
		title: '费用科目',
		type: 'select',
	},
	EX_JOURNAL_GS: {
		key: 'gsId',
		title: '',
		type: 'select',
	},
	EX_JOURNAL_CAR_ID: {
		key: 'carId',
		title: '使用车辆',
		type: 'select',
		dictionary: 'car_id',
	},
	EX_JOURNAL_SITE_ID: {
		key: 'siteId',
		title: '使用场地',
		type: 'select',
		dictionary: 'site_id',
		dictSwitch: 1,
	},
	EX_JOURNAL_GAS: {
		key: 'gas',
		title: '本次用量',
		type: 'inputNumber',
	},
	EX_JOURNAL_REPORTER: {
		key: 'reporter',
		title: '提报人',
		type: 'select',
		dictionary: 'employee_id',
	},
	EX_JOURNAL_NUM: {
		key: 'num',
		title: '学员数量',
		type: 'inputNumber',
	},
	EX_JOURNAL_TARGET: {
		key: 'target',
		title: '支付对象',
		type: 'input',
	},
	EX_JOURNAL_INSURANCE: {
		key: 'insuranceDate',
		title: '保险期限',
		type: 'rangeDate',
	},
	EX_JOURNAL_INSURANCE_START: {
		key: 'insuranceStartDate',
		title: '保险期限',
		type: 'rangeDate',
	},
	EX_JOURNAL_INSURANCE_END: {
		key: 'insuranceEndDate',
		title: '保险期限',
		type: 'rangeDate',
	},
	EX_JOURNAL_INSPECTION: {
		key: 'inspectionDate',
		title: '年检时间',
		type: 'date',
	},
	EX_JOURNAL_CAR_LEASE: {
		key: 'carLeaseDate',
		title: '租赁期限',
		type: 'rangeDate',
	},
	EX_JOURNAL_CAR_LEASE_START: {
		key: 'carLeaseStartDate',
		title: '租赁期限',
		type: 'rangeDate',
	},
	EX_JOURNAL_CAR_LEASE_END: {
		key: 'carLeaseEndDate',
		title: '租赁期限',
		type: 'rangeDate',
	},
	EX_JOURNAL_SITE_LEASE: {
		key: 'siteLeaseDate',
		title: '租赁期限',
		type: 'rangeDate',
	},
	EX_JOURNAL_SITE_LEASE_START: {
		key: 'siteLeaseStartDate',
		title: '租赁期限',
		type: 'rangeDate',
	},
	EX_JOURNAL_SITE_LEASE_END: {
		key: 'siteLeaseEndDate',
		title: '租赁期限',
		type: 'rangeDate',
	},
	EX_JOURNAL_CAR_PART: {
		key: 'carPart',
		title: '维修部位',
		type: 'input',
	},
	WAGE_TIME: {
		key: 'createTime',
		title: '生成时间',
		type: 'rangeDate',
	},
	WAGE_ID_NO: {
		key: 'idNo',
		title: '员工编号',
	},
	WAGE_EMPLOYEE_NAME: {
		key: 'employeeName',
		title: '员工姓名',
	},
	WAGE_DEPART_ID: {
		key: 'departId',
		title: '部门',
		dictionary: 'depart_id',
	},
	WAGE_BASE_SALARY: {
		key: 'baseSalary',
		title: '岗位工资',
	},
	WAGE_B_KM2: {
		key: 'bKm2',
		title: '科二提成',
	},
	WAGE_B_KM3: {
		key: 'bKm3',
		title: '科三提成',
	},
	WAGE_B_RECRUIT: {
		key: 'bRecruit',
		title: '招生提成',
	},
	WAGE_B_DOCUMENT: {
		key: 'bDocument',
		title: '档案提成',
	},
	WAGE_B_OVERTIME: {
		key: 'bOvertime',
		title: '加班费',
	},
	WAGE_B_POSITION: {
		key: 'bPosition',
		title: '岗位补助',
	},
	WAGE_B_BONUS: {
		key: 'bBonus',
		title: '奖金',
	},
	WAGE_B_OTHERS: {
		key: 'bOthers',
		title: '其它福利',
	},
	WAGE_DEDUCT: {
		key: 'deduct',
		title: '扣款',
	},
	WAGE_TEX: {
		key: 'tex',
		title: '个税',
	},
	WAGE_FINAL_SALARY: {
		key: 'finalSalary',
		title: '应发工资',
	},
	WAGE_CREATE_TIME: {
		key: 'createTime',
		title: '登记时间',
	},
	RECEIPT_NUMBER: {
		key: 'journalId',
		title: '收据编号',
	},
	MEMO: {
		key: 'memo',
		title: '备注',
	},
};
