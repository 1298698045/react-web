export default {
	/****** 学员报名相关 ******/
	TENANT_ID: {
		key: 'tenantId',
		title: '租户id',
		type: 'input',
	},
	NAME: {
		key: 'name',
		title: '姓名',
		type: 'input',
	},
	STUDENT_TYPE: {
		key: 'studentType',
		title: '学员类型',
		type: 'select',
		dictionary: 'student_type',
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
	PAY_TIME: {
		key: 'payTime',
		title: '交费日期',
		type: 'rangeDate',
		startDate: 'payTimeBegin',
		endDate: 'payTimeEnd'
	},
	CLASS_ID: {
		key: 'classId',
		title: '班型',
		type: 'select',
		dictionary: 'class_id',
	},
	CLASS_ID_ACTIVE: {
		key: 'classId',
		title: '班型',
		type: 'select',
		dictionary: 'class_id',
		dictSwitch: 1,
	},
	PROXY_KM: {
		key: 'proxy_km',
		title: '代培科目',
		type: 'select',
	},
	DEPEND_COST: {
		key: 'dependCost',
		title: '班型',
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
		type: 'select',
	},
	SOURCE_TYPE: {
		key: 'sourceType',
		title: '驾驶人来源',
		type: 'select',
		dictionary: 'source_type',
	},
	COOPERATION_UNIT: {
		key: 'cooperationUnit',
		title: '外协机构',
		type: 'select',
		dictionary: 'colla_id',
	},
	COOPERATION_UNIT_CONCAT_PEOPLE: {
		key: 'cooperationUnitConcatPeople',
		title: '联系人',
		type: 'input',
	},
	COOPERATION_UNIT_CONCAT_MOBILE: {
		key: 'cooperationUnitConcatMobile',
		title: '手机号',
		type: 'input',
	},
	COOPERATION_UNIT_CONCAT_ADDRESS: {
		key: 'cooperationUnitConcatAddress',
		title: '地址',
		type: 'input',
	},
	TEMP_RESIDENCE_PERMIT: {
		key: 'tempResidencePermit',
		title: '暂住证号',
		type: 'input',
	},
	BACKUP_TEL_PHONE: {
		key: 'backupTelphone',
		title: '备用电话',
		type: 'input',
	},
	CAREER: {
		key: 'career',
		title: '职业',
		type: 'select',
		dictionary: 'career',
	},
	CHANNEL: {
		key: 'channel',
		title: '招生渠道',
		type: 'select',
		dictionary: 'apply_channel',
	},
	OPERATOR_ID: {
		key: 'operatorId',
		title: '介绍人',
		type: 'select',
		dictionary: 'employee_id',
	},
	OPERATOR_TYPE: {
		key: 'introducerType',
		title: '介绍人类型',
		type: 'select'
	},
	CONTRACT_NO: {
		key: 'contractNo',
		title: '合同编号',
		type: 'input',
	},
	REPORT_TIME: {
		key: 'reportTime',
		title: '报名日期',
		type: 'date',
	},
	MATERIAL: {
		key: 'material',
		title: '报名材料',
		type: 'checkbox',
		dictionary: 'apply_material',
	},
	VALUE_ADDED: {
		key: 'valueAdded',
		title: '增值服务内容',
		type: 'checkbox',
		dictionary: 'value_added',
	},
	INSTEAD_SUBJECT2: {
		key: 'insteadSubject2',
		title: '是否代培科二',
		type: 'checkbox',
	},
	INSTEAD_SUBJECT3: {
		key: 'insteadSubject3',
		title: '是否代培科三',
		type: 'checkbox',
	},
	APPLY_TYPE: {
		key: 'applyType',
		title: '申领业务类型',
		type: 'select',
		dictionary: 'apply_type',
	},
	APPLY_TYPE_FIRST: {
		key: 'applyTypeFirst',
		title: '申领业务子类型',
		type: 'select',
		dictionary: 'apply_type_first',
	},
	APPLY_TYPE_ADD: {
		key: 'applyTypeAdd',
		title: '申领业务子类型',
		type: 'select',
		dictionary: 'apply_type_add',
	},
	APPLY_TYPE_MILITARY: {
		key: 'applyTypeMilitary',
		title: '申领业务子类型',
		type: 'select',
		dictionary: 'apply_type_military',
	},
	APPLY_TYPE_OVERSEA: {
		key: 'applyTypeOversea',
		title: '申领业务子类型',
		type: 'select',
		dictionary: 'apply_type_oversea',
	},
	APPLY_TYPE_RECOVER: {
		key: 'applyTypeRecover',
		title: '申领业务子类型',
		type: 'select',
		dictionary: 'apply_type_recover',
	},
	APPLY_SUB_TYPE: {
		key: 'applySubType',
		title: '申领业务子类型',
		type: 'radio',
	},
	OLD_LICENCE_TYPE: {
		key: 'oldLicenseType',
		title: '原驾车型',
		type: 'select',
		dictionary: 'license_type',
	},
	CHANGE_LICENCE_TIME: {
		key: 'changeLicenseTime',
		title: '换证时间',
		type: 'date',
	},
	APPLY_WAY: {
		key: 'applyWay',
		title: '申请方式',
		type: 'radio',
		dictionary: 'apply_way',
	},
	PROXY_NAME: {
		key: 'proxyName',
		title: '代理人、监护人姓名',
		type: 'input',
	},
	PROXY_CARD_TYPE: {
		key: 'proxyCardType',
		title: '代理人、监护人证件类型',
		type: 'select',
		dictionary: 'card_type',
	},
	PROXY_CARD_NO: {
		key: 'proxyCardNo',
		title: '代理人、监护人证件号码',
		type: 'input',
	},
	PROXY_TEL_PHONE: {
		key: 'proxyTelphone',
		title: '代理人、监护人电话',
		type: 'input',
	},
	PROXY_LOCATION: {
		key: 'proxyLocation',
		title: '代理人、监护人省市区',
		type: 'location',
	},
	PROXY_ADDRESS: {
		key: 'proxyAddress',
		title: '代理人、监护人详细地址',
		type: 'input',
	},
	PROXY_PROVINCE: {
		key: 'proxyProvince',
		title: '代理人、监护人省',
		type: 'select',
	},
	PROXY_CITY: {
		key: 'proxyCity',
		title: '代理人、监护人市',
		type: 'select',
	},
	PROXY_DISTRICT: {
		key: 'proxyDistrict',
		title: '代理人、监护人区',
		type: 'select',
	},
	PROXIES: {
		key: 'proxies',
		title: '被委托人',
		type: 'input',
	},
	IDCARD_NO: {
		key: 'idNo',
		title: '证件号码',
		type: 'input',
	},
	MAJOR_CARD_TYPE: {
		key: 'majorCardType',
		title: '身份证明名称',
		type: 'select',
		dictionary: 'card_type',
	},
	MAJOR_CARD_CODE: {
		key: 'majorCardCode',
		title: '证件号',
		type: 'input',
	},
	MINOR_CARD_TYPE: {
		key: 'minorCardType',
		title: '次要证件类型',
		type: 'select',
	},
	MINOR_CARD_CODE: {
		key: 'minorCardCode',
		title: '次要证件号',
		type: 'input',
	},
	CARD_PICTURE: {
		key: 'cardPicture',
		title: '证件照片',
		type: 'input',
	},
	PICTURE: {
		key: 'picture',
		title: '现场照片',
		type: 'input',
	},
	TEL: {
		key: 'tel',
		title: '固定电话',
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
	NATIONALITY: {
		key: 'nationality',
		title: '国籍',
		type: 'select',
		dictionary: 'nationality',
	},
	EMAIL: {
		key: 'email',
		title: '邮箱',
		type: 'input',
	},
	ZIP: {
		key: 'zip',
		title: '邮政编码',
		type: 'input',
	},
	REG_ADDRESS: {
		key: 'regAddress',
		title: '登记住所',
		type: 'input',
	},
	REG_PROVINCE_CODE: {
		key: 'regProvinceCode',
		title: '注册省',
		type: 'select',
	},
	REG_CITY_CODE: {
		key: 'regCityCode',
		title: '注册市',
		type: 'select',
	},
	REG_DISTRICT_CODE: {
		key: 'regDistrictCode',
		title: '注册区',
		type: 'select',
	},
	CON_ADDRESS: {
		key: 'conAddress',
		title: '联系住所',
		type: 'input',
	},
	CON_PROVINCE_CODE: {
		key: 'conProvinceCode',
		title: '联系省',
		type: 'select',
	},
	CON_CITY_CODE: {
		key: 'conCityCode',
		title: '联系市',
		type: 'select',
	},
	CON_DISTRICT_CODE: {
		key: 'conDistrictCode',
		title: '联系区',
		type: 'select',
	},
	MEMO: {
		key: 'memo',
		title: '备注',
		type: 'textarea',
	},
	RECEIVABLE: {
		key: 'receivable',
		title: '应收',
		type: 'input',
		// dictionary: 'pay_type',
	},
	REDUCE_AMOUNT: {
		key: 'reducedAmount',
		title: '下调金额',
		type: 'input',
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
	DEPOSIT: {
		key: 'deposit',
		title: '订金',
		type: 'input',
	},
	RECEIPTS: {
		key: 'receipts',
		title: '实收',
		type: 'input',
	},
	OWED: {
		key: 'owed',
		title: '欠款',
		type: 'input',
	},
	FEE_TYPE: {
		key: 'payType',
		title: '交费类型',
		type: 'select',
		dictionary: 'pay_type',
	},
	PAY_MODE: {
		key: 'payMode',
		title: '支付方式',
		type: 'select',
		dictionary: 'pay_mode',
	},
	PAY_STATUS: {
		key: 'payStatus',
		title: '财务状态',
		type: 'select',
	},
	REJECTION_REASON: {
		key: 'rejectionReason',
		title: '驳回原因',
		type: 'input',
	},
	STUDENT_STATUS: {
		key: 'studentStatus',
		title: '学员状态',
		type: 'select',
		dictionary: 'student_status',
	},
	QUICK_SEARCH: {
		key: 'keywords',
		title: '学员',
		type: 'input',
		placeholder: '姓名/手机号/身份证',
	},
	SITE_ID: {
		key: 'siteId',
		title: '场地',
		type: 'select',
		dictionary: 'site_id',
		dictSwitch: 1,
	},
	/****** 学员档案相关 ******/
	ARCHIVE_ID: {
		key: 'documentNo',
		title: '档案编号',
		type: 'input',
	},
	ARCHIVE_STATUS: {
		key: 'studentStatus',
		title: '档案状态',
		type: 'select',
		dictionary: 'student_status',
	},
	ARCHIVE_DELAY_REASON: {
		key: 'reason',
		title: '暂缓建档原因',
		type: 'checkbox',
		dictionary: 'delay_reason',
	},
	ARCHIVE_STOP_REASON: {
		key: 'reason',
		title: '终止建档原因',
		type: 'select',
		dictionary: 'stop_reason',
	},
	ARCHIVE_STOP_MEMO: {
		key: 'memo',
		title: '备注',
		type: 'textarea',
	},
	ARCHIVE_FINISH_OPERATOR: {
		key: 'documentAccepter',
		title: '建档受理人',
		type: 'select',
		dictionary: 'archivist_id',
	},
	ARCHIVE_FINISH_DATE: {
		key: 'documentedTime',
		title: '受理日期',
		type: 'date',
	},
	/****** 学员考试相关 ******/
	EXAM_ID: {
		key: 'examID',
		title: '序号',
		type: 'input',
	},
	EXAM_STUDY_ID: {
		key: 'studyLicenseNo',
		title: '学习驾驶证编号',
		type: 'input',
	},
	EXAM_COACH_ID: {
		key: 'coachId',
		title: '归属教练',
		type: 'input',
		dictionary: 'employee_id',
	},
	EXAM_KM: {
		key: 'kmCode',
		title: '考试科目',
		type: 'select',
		dictionary: 'km',
		// values: [
		// 	{ dKey: '科目一', dValue: '科目一', },
		// 	{ dKey: '科目二', dValue: '科目二', },
		// 	{ dKey: '科目三', dValue: '科目三', },
		// 	{ dKey: '科目四', dValue: '科目四', },
		// ],
	},
	EXAM_CAR_TYPE: {
		key: 'licenseType',
		title: '考试车型',
		type: 'select',
		dictionary: 'license_type',
		dictSwitch: 1,
	},
	EXAM_APPOINT_DATE: {
		key: 'bookDate',
		title: '预约日期',
		type: 'date',
	},
	EXAM_APPOINT_DATE_RANGE: {
		key: 'bookDate',
		title: '预约日期',
		type: 'rangeDate',
	},
	EXAM_DATE: {
		key: 'examDate',
		title: '考试日期',
		type: 'date',
	},
	EXAM_DATE_RANGE: {
		key: 'examDate',
		title: '考试日期',
		type: 'rangeDate',
	},
	EXAM_PLACE: {
		key: 'examPlace',
		title: '考试场地',
		type: 'input',
	},
	// EXAM_TIME: {
	// 	key: 'examRound',
	// 	title: '考试场次',
	// 	type: 'select',
	// },
	EXAM_TIME: {
		key: 'examRound',
		title: '考试场次',
		type: 'input',
	},
	EXAM_SCORE: {
		key: 'examScore',
		title: '考试成绩',
		type: 'inputNumber',
	},
	EXAM_RESULT: {
		key: 'examResult',
		title: '考试结果',
		type: 'select',
		dictionary: 'exam_result',
	},
	EXAM_FAIL_ITEM: {
		key: 'failItems',
		title: '减分项',
		type: 'input',
		// TODO: dictionary: 'exam_fail_items',
	},
	EXAM_TIMES: {
		key: 'times',
		title: '考试次数',
	},
	/****** 科目相关 ******/
	KM: {
		key: 'km',
		title: '科目',
		type: 'select',
		dictionary: 'km',
	},
	KM_CODE: {
		key: 'kmCode',
		title: '科目',
		type: 'select',
		dictionary: 'km',
	},
	TEACH_KM: {
		key: 'teachKm',
		title: '科目',
		type: 'select',
		dictionary: 'km',
	},
	KM1_STATUS: {
		key: 'km1Status',
		title: '科目一状态',
		type: 'select',
		dictionary: 'km_status',
	},
	KM2_STATUS: {
		key: 'km2Status',
		title: '科目二状态',
		type: 'select',
		dictionary: 'km_status',
	},
	KM3_STATUS: {
		key: 'km3Status',
		title: '科目三状态',
		type: 'select',
		dictionary: 'km_status',
	},
	KM4_STATUS: {
		key: 'km4Status',
		title: '科目四状态',
		type: 'select',
		dictionary: 'km_status',
	},
	COACH_ID: {
		key: 'coachId',
		title: '教练',
		type: 'select',
		dictionary: 'employee_id_coach',
	},
	KM2_COACH_ID: {
		key: 'km2CoachId',
		title: '科目二教练',
		type: 'select',
		dictionary: 'employee_id_coach',
	},
	KM3_COACH_ID: {
		key: 'km3CoachId',
		title: '科目三教练',
		type: 'select',
		dictionary: 'employee_id_coach',
	},
	RANGE: {
		key: 'abc',
		title: '范围',
		type: 'rangeDate',
	},
	/****** 学员列表相关 ******/
	KM_STATUS: {
		key: 'kmStatus',
		title: '学习状态',
		type: 'select',
		dictionary: 'km_status',
	},
	KM_STATUS_NO_DICTIONARY: {
		key: 'km_status',
		title: '学习状态',
		type: 'select',
	},
	IS_CANCEL: {
		key: 'isCancel',
		title: '是否取消未学课程',
		type: 'radio',
	},
	REASON: {
		key: 'reason',
		title: '取消原因',
		type: 'textarea',
	},
	ORIGINAL_CLASS_ID: {
		key: 'originalClassId',
		title: '原班型',
	},
	END_TYPE: {
		key: 'endType',
		title: '结束方式',
		dictionary: 'end_type'
	},
	GRADUATION_TIME: {
		key: 'graduationTime',
		title: '毕业日期',
		type: 'date',
	},
	// 其它业务收入
	OTHER_COST_TYPE: {
		key: 'originalValue',
		title: '费用类型',
		type: 'select',
		dictionary: 'other_income_type_manage',
	},
	OTHER_COST_KM: {
		key: 'newValue',
		title: '费用科目',
		type: 'select',
	},
	OTHER_COST_DATE: {
		key: 'reason',
		title: '归属时间',
		type: 'date',
	},
	OTHER_COST_AMOUNT: {
		key: 'amount',
		title: '费用金额',
		type: 'input',
	},
	OTHER_COST_MEMO: {
		key: 'memo',
		title: '备注',
		type: 'textarea',
	},

	ACTIVE_DAYS: {
		key: 'activityDays',
		title: '天数',
		type: 'radio',
		dictionary: 'active_days'
	},
};
