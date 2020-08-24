export default {
	PLATE_NO: {
		key: 'plateNo',
		title: '车牌号',
		type: 'input',
	},
	BRAND: {
		key: 'brand',
		title: '品牌',
		type: 'input',
	},
	MODEL: {
		key: 'model',
		title: '型号',
		type: 'input',
	},
	COLOR: {
		key: 'color',
		title: '颜色',
		type: 'input',
	},
	ENGINE_NO: {
		key: 'engineNo',
		title: '发动机号',
		type: 'input',
	},
	VIN: {
		key: 'vin',
		title: '车架号',
		type: 'input',
	},
	MANUFACTURE: {
		key: 'manufacture',
		title: '采购厂商',
		type: 'input',
	},
	PURCHASE_TYPE: {
		key: 'purchaseType',
		title: '采购方式',
		type: 'select',
		dictionary: 'purchase_type',
	},
	PURCHASE_DATE: {
		key: 'purchaseDate',
		title: '采购日期',
		type: 'date',
	},
	PURCHASE_AMOUNT: {
		key: 'purchaseAmount',
		title: '采购金额',
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
	SITE_ID: {
		key: 'siteId',
		title: '场地',
		type: 'select',
		dictionary: 'site_id',
	},
	SITE_ID_ACTIVE: {
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
	CAR_STATUS: {
		key: 'carStatus',
		title: '车辆状态',
		type: 'radio',
		dictionary: 'car_status',
	},
	PURPOSE: {
		key: 'purpose',
		title: '车辆用途',
		type: 'select',
		dictionary: 'purpose',
	},
	MEMO: {
		key: 'memo',
		title: '备注',
		type: 'textarea',
	},
	TITLE: {
		key: 'title',
		title: '名称',
		type: 'input',
	},
	AREA: {
		key: 'area',
		title: '面积',
		type: 'input',
	},
	IS_EXAM: {
		key: 'isExam',
		title: '是否考场',
		type: 'select',
		dictionary: 'switch',
	},
	STATUS: {
		key: 'status',
		title: '场地状态',
		type: 'select',
		dictionary: 'status',
	},
	FIRST_PARTY: {
		key: 'firstParty',
		title: '甲方',
		type: 'input',
	},
	PAY_MODE: {
		key: 'payMode',
		title: '支付方式',
		type: 'select',
		dictionary: 'pay_mode',
	},
	BEGIN_DATE: {
		key: 'beginDate',
		title: '生效日期',
		type: 'date',
	},
	END_DATE: {
		key: 'endDate',
		title: '结束日期',
		type: 'date',
	},
	LOCATION: {
		key: 'location',
		title: '省市区',
		type: 'location',
		
	},
	PROVINCE: {
		key: 'province',
		title: '省份',
		type: 'select',
	},
	CITY: {
		key: 'city',
		title: '城市',
		type: 'select',
	},
	DISTRICT: {
		key: 'district',
		title: '区县',
		type: 'select',
	},
	ADDRESS: {
		key: 'address',
		title: '详细地址',
		type: 'input',
	},
	LAT: {
		key: 'lat',
		title: '纬度',
		type: 'input',
	},
	LNG: {
		key: 'lng',
		title: '经度',
		type: 'input',
	},
	CREATOR: {
		key: 'creator',
		title: '创建人',
		type: 'input',
	},
	EMPLOYEE_ID: {
		key: 'employeeId',
		title: '绑定员工',
		type: 'select',
		dictionary: 'employee_id',
	},
	COACH_ID: {
		key: 'coachId',
		title: '教练姓名',
		type: 'select',
		dictionary: 'employee_id',
	},
}
