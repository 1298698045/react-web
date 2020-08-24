export default [
	// user
	{
		path: '/user',
		component: '../layouts/UserLayout',
		routes: [
			{ path: '/user', redirect: '/user/login' },
			{ path: '/user/login', name: 'login', component: './User/Login' },
			{ path: '/user/register', name: 'register', component: './User/Register' },
			{
				path: '/user/register-result',
				name: 'register.result',
				component: './User/RegisterResult',
			},
			{
				component: '404',
			},
		],
	},
	// app
	{
		path: '/',
		component: '../layouts/BasicLayout',
		// Routes: [ 'src/pages/Authorized' ],
		Routes: [ 'src/pages/Privileged' ],
		routes: [
			// dashboard
			{
				path: '/',
				redirect: '/workbench',
				authority: [ 'admin', 'user' ],
				privs: []
			},
			{
				path: '/workbench',
				name: 'workbench',
				icon: 'line-chart',
				component: './Workbench',
			},
			{
				path: '/student',
				name: 'student',
				icon: 'team',
				privs: [ 'student_manage' ],
				routes: [
					{
						path: '/student/sign-up',
						name: 'sign-up',
						component: './Student/SignUp/Index',
						privs: [ 'student_enter' ],
						hideChildrenInMenu: true,
						routes: [
							{
								path: '/student/sign-up',
								component: './Common/RouterRedirect',
								// redirect: '/student/reserve-class/reserve',
							},
							{
								path: '/student/sign-up/formal',
								name: 'formal',
								component: './Student/SignUp/SignUp',
								privs: [ 'student_enter' ],
								// privs: [ 'order_course' ],
							},
							{
								path: '/student/sign-up/expect',
								name: 'expect',
								component: './Student/SignUp/ExpectSignUp',
								privs: [ 'student_enter' ],
								// component: './Student/SignUp/ExpectSignUp',
								// privs: [ 'order_course' ],
							},
						],
					},
					// {
					// 	path: '/student/sign-up',
					// 	name: 'sign-up',
					// 	component: './Student/SignUp/SignUp',
					// 	privs: [ 'student_enter' ],
					// },
					{
						path: '/student/archive',
						name: 'archive',
						component: './Student/Archive/Archive',
						privs: [ 'archivist_manage' ],
					},
					{
						path: '/student/reserve-class',
						name: 'reserve-class',
						component: './Student/ReserveClass/Index',
						hideChildrenInMenu: true,
						privs: [ 'order_course_manage' ],
						routes: [
							{
								path: '/student/reserve-class',
								component: './Common/RouterRedirect',
								// redirect: '/student/reserve-class/reserve',
							},
							{
								path: '/student/reserve-class/reserve',
								name: 'reserve',
								component: './Student/ReserveClass/Reserve',
								privs: [ 'order_course' ],
							},
							{
								path: '/student/reserve-class/log',
								name: 'log',
								component: './Student/ReserveClass/Log',
								privs: [ 'order_course_record' ],
							},
						],
					},
					{
						path: '/student/exam',
						name: 'exam',
						component: './Student/Exam/Exam',
						hideChildrenInMenu: true,
						privs: [ 'exam_manage' ],
						routes: [
							{
								path: '/student/exam',
								component: './Common/RouterRedirect',
								// redirect: '/student/exam/appointment',
							},
							{
								path: '/student/exam/appointment',
								name: 'appointment',
								component: './Student/Exam/Appointment',
								privs: [ 'order_exam_manage' ],
							},
							{
								path: '/student/exam/score',
								name: 'score',
								component: './Student/Exam/Score',
								privs: [ 'grade_manage' ],
							},
						],
					},
					{
						path: '/student/student-list',
						name: 'student-list',
						component: './Student/StudentList/StudentList',
						hideChildrenInMenu: true,
						privs: [ 'student_list' ],
						routes: [
							{
								path: '/student/student-list',
								component: './Common/RouterRedirect',
								// redirect: '/student/student-list/local',
							},
							{
								path: '/student/student-list/local',
								name: 'student-list-local',
								component: './Student/StudentList/Local',
								privs: [ 'localshool_student' ],
							},
							{
								path: '/student/student-list/help',
								name: 'student-list-help',
								component: './Student/StudentList/Help',
							},
							{
								path: '/student/student-list/proxy',
								name: 'student-list-proxy',
								component: './Student/StudentList/Proxy',
							},
							{
								path: '/student/student-list/depend',
								name: 'student-list-depend',
								component: './Student/StudentList/Depend',
							},
						],
					},
				],
			},
			{
				path: '/teaching',
				name: 'teaching',
				icon: 'snippets',
				privs: [ 'edu_manage' ],
				routes: [
					{
						path: '/teaching/coach',
						name: 'coach',
						component: './Teaching/Coach/Coach',
						hideChildrenInMenu: true,
						privs: [ 'coach_manage' ],
						routes: [
							{
								path: '/teaching/coach',
								component: './Common/RouterRedirect',
								// redirect: '/teaching/coach/list',
							},
							{
								path: '/teaching/coach/list',
								name: 'list',
								component: './Teaching/Coach/CoachList',
								privs: [ 'coach_list' ],
							},
							{
								path: '/teaching/coach/student',
								name: 'student',
								component: './Teaching/Coach/CoachStudent',
								privs: [ 'student_info' ],
							},
						],
					},
					{
						path: '/teaching/course',
						name: 'course',
						component: './Teaching/Course/Course',
						privs: [ 'course_record_manage' ],
					},
					{
						path: '/teaching/lesson',
						name: 'lesson',
						component: './Teaching/Lesson/Index',
						privs: [ 'lession_manage' ],
					},
					{
						path: '/teaching/class',
						name: 'class',
						component: './Teaching/Class/Class',
						privs: [ 'class_pattern_manage' ],
					},
					{
						path: '/teaching/log',
						name: 'log',
						component: './Teaching/TeachingLog/TeachingLog',
						privs: [ 'education_log' ],
					},
				],
			},
			{
				path: '/school',
				name: 'school',
				icon: 'apartment',
				privs: [ 'school_manage' ],
				routes: [
					{
						path: '/school/org',
						name: 'organization',
						component: './School/Org/Index',
						hideChildrenInMenu: true,
						privs: [ 'orgnize_manage' ],
						routes: [
							{
								path: '/school/org',
								component: './Common/RouterRedirect',
								// redirect: '/school/org/org',
							},
							{
								path: '/school/org/org',
								name: 'org',
								component: './School/Org/Org',
								// privs: [ 'department_manage' ],
								privs: [ 'orgnize_manage' ],
							},
							{
								path: '/school/org/position',
								name: 'position',
								component: './School/Org/Position',
								privs: [ 'position_manage' ],
							},
						],
					},
					{
						path: '/school/vacation',
						name: 'vacation',
						component: './School/Vacation',
						privs: [ 'vacation_manage' ],
					},
					{
						path: '/school/archivist',
						name: 'archivist',
						component: './School/Archivist/Archivist',
						privs: [ 'archivist_receiver' ],
					},
					{
						path: '/school/collaborate',
						name: 'collaborate',
						component: './School/Collaborate/Collaborate',
						privs: [ 'cooperationunit_manage' ],
					},
					{
						path: '/school/introducer',
						name: 'introducer',
						component: './School/Introducer/Introducer',
						privs: [ 'outside_school_introducer' ],
					},
					{
						path: '/school/goal',
						name: 'goal',
						component: './School/Goal/Goal',
						privs: [ 'salesgoal_manage' ],
					},
				],
			},
			{
				path: '/asset',
				name: 'asset',
				icon: 'account-book',
				privs: [ 'asset_manage' ],
				routes: [
					{
						path: '/asset/car',
						name: 'car',
						component: './Asset/Car/index',
						privs: [ 'car_manage' ],
					},
					{
						path: '/asset/site',
						name: 'site',
						component: './Asset/Site/index',
						privs: [ 'site_manage' ],
					},
				],
			},
			{
				path: '/finance',
				name: 'finance',
				icon: 'dollar',
				privs: [ 'finance_manage' ],
				routes: [
					{
						path: '/finance/charge',
						name: 'charge',
						component: './Finance/Charge/ChargeIndex',
						hideChildrenInMenu: true,
						privs: [ 'wait_pay_manage' ],
						routes: [
							{
								path: '/finance/charge',
								component: './Common/RouterRedirect',
								// redirect: '/finance/charge/sign-up',
							},
							{
								path: '/finance/charge/sign-up',
								name: 'finance-charge-sign-up',
								component: './Finance/Charge/SignUp',
								privs: [ 'apply_pay' ],
							},
							{
								path: '/finance/charge/make-up-tuition',
								name: 'finance-charge-make-up-tuition',
								component: './Finance/Charge/MakeUpTuition',
								privs: [ 'after_pay_tuition_manage' ],
							},
							{
								path: '/finance/charge/change-class',
								name: 'finance-charge-change-class',
								component: './Finance/Charge/ChangeClass',
								privs: [ 'pay_change_classpattern' ],
							},
							{
								path: '/finance/charge/supplementary-fee',
								name: 'finance-charge-supplementary-fee',
								component: './Finance/Charge/SupplementaryFee',
								privs: [ 'wait_after_pay_exam' ],
							},
							{
								path: '/finance/charge/class-fee',
								name: 'finance-charge-class-fee',
								component: './Finance/Charge/ClassFee',
								privs: [ 'buy_lesson' ],
							},
							{
								path: '/finance/charge/add-proxy-fee',
								name: 'finance-charge-add-proxy-fee',
								component: './Finance/Charge/AddProxyFee',
								privs: [ 'pay_proxy_lesson' ],
							},
							{
								path: '/finance/charge/other-cost',
								name: 'finance-charge-other-cost',
								component: './Finance/Charge/OtherCost',
								privs: [ 'other_bus_fee_wait_pay_manage' ],
							},
						],
					},
					{
						path: '/finance/income',
						name: 'income',
						component: './Finance/Income/IncomeIndex',
						hideChildrenInMenu: true,
						privs: [ 'charge_manage' ],
						routes: [
							{
								path: '/finance/income',
								component: './Common/RouterRedirect',
								// redirect: '/finance/income/sign-up',
							},
							{
								path: '/finance/income/sign-up',
								name: 'finance-income-sign-up',
								component: './Finance/Income/SignUp',
								privs: [ 'apply_charge' ],
							},
							{
								path: '/finance/income/make-up-tuition',
								name: 'finance-income-make-up-tuition',
								component: './Finance/Income/MakeUpTuition',
								privs: [ 'after_apply_charge' ],
							},
							{
								path: '/finance/income/change-class',
								name: 'finance-income-change-class',
								component: './Finance/Income/ChangeClass',
								privs: [ 'apply_charge_change_classpattern' ],
							},
							{
								path: '/finance/income/supplementary-fee',
								name: 'finance-income-supplementary-fee',
								component: './Finance/Income/SupplementaryFee',
								privs: [ 'charge_after_pay_exam' ],
							},
							{
								path: '/finance/income/class-fee',
								name: 'finance-income-class-fee',
								component: './Finance/Income/ClassFee',
								privs: [ 'charge_lesson' ],
							},
							{
								path: '/finance/income/add-proxy-fee',
								name: 'finance-income-add-proxy-fee',
								component: './Finance/Income/AddProxyFee',
								privs: [ 'add_proxy_km_fee' ],
							},
							{
								path: '/finance/income/other-revenue',
								name: 'finance-income-other-revenue',
								component: './Finance/Income/OtherRevenue',
								privs: [ 'other_charge' ],
							},
							{
								path: '/finance/income/other-cost',
								name: 'finance-income-other-cost',
								component: './Finance/Income/OtherCost',
								privs: [ 'other_bus_fee_charge_manage' ],
							},
							{
								path: '/finance/income/money-funds',
								name: 'finance-income-money-funds',
								component: './Finance/Income/MoneyFunds',
								privs: [ 'currency_fund' ],
							},
						],
					},
					{
						path: '/finance/expenditure',
						name: 'expenditure',
						component: './Finance/Expenditure/ExpenditureIndex',
						hideChildrenInMenu: true,
						privs: [ 'expend_manage' ],
						routes: [
							{
								path: '/finance/expenditure',
								component: './Common/RouterRedirect',
								// redirect: '/finance/expenditure/main-business',
							},
							{
								path: '/finance/expenditure/main-business',
								name: 'finance-expenditure-main-business',
								component: './Finance/Expenditure/MainBusiness',
								privs: [ 'bussiness_expend' ],
							},
							{
								path: '/finance/expenditure/management-fee',
								name: 'finance-expenditure-management-fee',
								component: './Finance/Expenditure/ManagementFee',
								privs: [ 'management_fee' ],
							},
							{
								path: '/finance/expenditure/other-business',
								name: 'finance-expenditure-other-business',
								component: './Finance/Expenditure/OtherBusiness',
								privs: [ 'other_bussiness_expend' ],
							},
							{
								path: '/finance/expenditure/capital',
								name: 'finance-expenditure-capital',
								component: './Finance/Expenditure/Capital',
								privs: [ 'fund_expend' ],
							},
							{
								path: '/finance/expenditure/income-tax',
								name: 'finance-expenditure-income-tax',
								component: './Finance/Expenditure/IncomeTax',
								privs: [ 'tax_manage' ],
							},
						],
					},
					{
						path: '/finance/refund',
						name: 'refund',
						component: './Finance/Refund/RefundIndex',
						hideChildrenInMenu: true,
						privs: [ 'return_fee_manage' ],
						routes: [
							{
								path: '/finance/refund',
								component: './Common/RouterRedirect',
								// redirect: '/finance/refund/await',
							},
							{
								path: '/finance/refund/await',
								name: 'finance-refund-await',
								component: './Finance/Refund/Await',
								privs: [ 'wait_return_fee' ],
							},
							{
								path: '/finance/refund/done',
								name: 'finance-refund-done',
								component: './Finance/Refund/Done',
								privs: [ 'wait_return_fee_complete' ],
							},
						],
					},
					{
						path: '/finance/wage',
						name: 'wage',
						component: './Finance/Wage/WageIndex',
						hideChildrenInMenu: true,
						privs: [ 'salary_manage' ],
						routes: [
							{
								path: '/finance/wage',
								component: './Common/RouterRedirect',
								// redirect: '/finance/wage/performance-data-report',
							},
							{
								path: '/finance/wage/performance-data-report',
								name: 'finance-wage-performance-data-report',
								component: './Finance/Wage/PerformanceDataReport',
								privs: [ 'performance_data_report' ],
							},
							{
								path: '/finance/wage/wage-registration',
								name: 'finance-wage-wage-registration',
								component: './Finance/Wage/WageRegistration',
								privs: [ 'salary_check' ],
							},
						],
					},
				],
			},
			{
				path: '/review',
				name: 'review',
				icon: 'carry-out',
				privs: [ 'examine_manage' ],
				routes: [
					{
						path: '/review/refund',
						name: 'refund',
						component: './Review/Refund/ReviewIndex',
						hideChildrenInMenu: true,
						privs: [ 'return_fee_examine' ],
						routes: [
							{
								path: '/review/refund',
								component: './Common/RouterRedirect',
								// redirect: '/review/refund/await',
							},
							{
								path: '/review/refund/await',
								name: 'review-refund-await',
								component: './Review/Refund/Await',
								privs: [ 'wait_examine' ],
							},
							{
								path: '/review/refund/done',
								name: 'review-refund-done',
								component: './Review/Refund/Done',
								privs: [ 'return_fee_complete' ],
							},
						],
					},
				],
			},
			{
				path: '/data-statistics',
				name: 'data-statistics',
				icon: 'bar-chart',
				privs: [ 'data_report' ],
				routes: [
					{
						path: '/data-statistics/sign-up',
						name: 'sign-up',
						// component: 'dev',
						component:  './DataStatistics/Signup/Signup',
						privs: [ 'apply_report' ]
					},
					{
						path: '/data-statistics/reserve-class',
						name: 'reserve-class',
						// component: 'dev',
						component:  './DataStatistics/ReserveClass/ReserveClass',
						privs: [ 'course_record_report' ],
					},
					{
						path: '/data-statistics/score',
						name: 'score',
						// component: 'dev',
						component:  './DataStatistics/Score/Score',
						privs: [ 'score_report' ],
					},
					{
						path: '/data-statistics/finance',
						name: 'finance',
						// component: 'dev',
						component:  './DataStatistics/Finance/Finance',
						privs: [ 'finance_report' ],
					},
				],
			},
			{
				path: '/marketing-center',
				name: 'marketing-center',
				icon: 'share-alt',
				privs: [ 'business_center' ],
				routes: [
					{
						path: '/marketing-center/activity',
						name: 'activity',
						component: './MarketingCenter/Activity/Index',
						privs: [ 'promotion_check' ],
						hideChildrenInMenu: true,
						routes: [
							{
								path: '/marketing-center/activity',
								component: './Common/RouterRedirect',
							},
							{
								path: '/marketing-center/activity/assemble',
								name: 'assemble',
								component: './MarketingCenter/Activity/Assemble/Index',
								privs: [ 'group_buy' ],
							},
							{
								path: '/marketing-center/activity/bargain',
								name: 'bargain',
								component: './MarketingCenter/Activity/Bargain/Index',
								privs: [ 'bargain' ],
							},
							{
								path: '/marketing-center/activity/luckDraw',
								name: 'luckDraw',
								component: './MarketingCenter/Activity/LuckDraw/Index',
								privs: [ 'activity_prize' ],
							}
						]
					}
				],
			},
			{
				path: '/value-added-services',
				name: 'value-added-services',
				icon: 'rise',
				privs: [ 'valueadded_service_manage' ],
				routes: [
					{
						path: '/value-added-services/value-added',
						name: 'value-added',
						component: './ValueAddedService/ValueAdded/Index',
						privs: [ 'valueadded_service' ],
					},
				],
			},
			{
				path: '/system',
				name: 'system',
				icon: 'setting',
				privs: [ 'system_setting' ],
				routes: [
					{
						path: '/system/privilege',
						name: 'privilege',
						component: './System/Privilege/Role',
						privs: [ 'privs_setting' ],
					},
					{
						path: '/system/operation-log',
						name: 'operation-log',
						component: './System/OperationLog',
						privs: [ 'operation_log' ],
					},
					{
						path: '/system/config',
						name: 'config',
						component: './System/Config/Index',
						hideChildrenInMenu: true,
						privs: [ 'base_config' ],
						routes: [
							{
								path: '/system/config',
								component: './Common/RouterRedirect',
								// redirect: '/system/config/license',
							},
							{
								path: '/system/config/license',
								name: 'license',
								component: './System/Config/License',
								privs: [ 'licence_type' ],
							},
							{
								path: '/system/config/status',
								name: 'status',
								component: './System/Config/Status',
								privs: [ 'status_setting' ],
							},
							{
								path: '/system/config/bookCourse',
								name: 'bookCourse',
								component: './System/Config/BookCourse',
								privs: [ 'order_class_rule' ],
							},
							{
								path: '/system/config/cost',
								name: 'cost',
								component: './System/Config/Cost',
								privs: [ 'fee_setting' ],
							},
							{
								path: '/system/config/reason',
								name: 'reason',
								component: './System/Config/Reason',
								privs: [ 'reason_setting' ],
							},
							{
								path: '/system/config/other',
								name: 'other',
								component: './System/Config/Other',
								privs: [ 'other_setting' ],
							},
							{
								path: '/system/config/init-student',
								name: 'init-student',
								component: './System/Config/InitStudent',
								// privs: [ 'init_student' ],
							},
						],
					},
					// {
					// 	path: '/system/intelligent-achievement',
					// 	name: 'intelligent-achievement',
					// 	component: 'dev',
						// component: './System/IntelligentAchievement/Index',
						// hideChildrenInMenu: true,
						// // privs: [ 'base_config' ],
						// routes: [
						// 	{
						// 		path: '/system/intelligent-achievement',
						// 		component: './Common/RouterRedirect',
						// 		// redirect: '/system/config/license',
						// 	},
						// 	{
						// 		path: '/system/intelligent-achievement/functionSettings',
						// 		name: 'functionSettings',
						// 		component: './System/IntelligentAchievement/FunctionSettings/FunctionSettings',
						// 		// privs: [ 'licence_type' ],
						// 	},
						// 	{
						// 		path: '/system/intelligent-achievement/importLog',
						// 		name: 'importLog',
						// 		component: './System/IntelligentAchievement/ImportLog',
						// 		// privs: [ 'status_setting' ],
						// 	},
						// ],
					// },
				],
			},
			{
				hidden: true,
				path: '/user-center',
				name: 'user-center',
				icon: 'user',
				routes: [
					{
						path: '/user-center/template-download',
						name: 'template-download',
						component: './UserCenter/TemplateDownload',
					},
					{
						path: '/user-center/reset-password',
						name: 'reset-password',
						component: './UserCenter/ResetPassword',
					},
					{
						path: '/user-center/feedback',
						name: 'feedback',
						component: './UserCenter/Feedback',
					},
				],
			},
			// {
			// 	path: '/separator',
			// 	name: 'separator',
			// },
			// // forms
			// {
			// 	path: '/form',
			// 	icon: 'form',
			// 	name: 'form',
			// 	routes: [
			// 		{
			// 			path: '/form/basic-form',
			// 			name: 'basicform',
			// 			component: './Forms/BasicForm',
			// 		},
			// 		{
			// 			path: '/form/step-form',
			// 			name: 'stepform',
			// 			component: './Forms/StepForm',
			// 			hideChildrenInMenu: true,
			// 			routes: [
			// 				{
			// 					path: '/form/step-form',
			// 					redirect: '/form/step-form/info',
			// 				},
			// 				{
			// 					path: '/form/step-form/info',
			// 					name: 'info',
			// 					component: './Forms/StepForm/Step1',
			// 				},
			// 				{
			// 					path: '/form/step-form/confirm',
			// 					name: 'confirm',
			// 					component: './Forms/StepForm/Step2',
			// 				},
			// 				{
			// 					path: '/form/step-form/result',
			// 					name: 'result',
			// 					component: './Forms/StepForm/Step3',
			// 				},
			// 			],
			// 		},
			// 		{
			// 			path: '/form/advanced-form',
			// 			name: 'advancedform',
			// 			authority: [ 'admin' ],
			// 			component: './Forms/AdvancedForm',
			// 		},
			// 	],
			// },
			// // list
			// {
			// 	path: '/list',
			// 	icon: 'table',
			// 	name: 'list',
			// 	routes: [
			// 		{
			// 			path: '/list/table-list',
			// 			name: 'searchtable',
			// 			component: './List/TableList',
			// 		},
			// 		{
			// 			path: '/list/basic-list',
			// 			name: 'basiclist',
			// 			component: './List/BasicList',
			// 		},
			// 		{
			// 			path: '/list/card-list',
			// 			name: 'cardlist',
			// 			component: './List/CardList',
			// 		},
			// 		{
			// 			path: '/list/search',
			// 			name: 'searchlist',
			// 			component: './List/List',
			// 			routes: [
			// 				{
			// 					path: '/list/search',
			// 					redirect: '/list/search/articles',
			// 				},
			// 				{
			// 					path: '/list/search/articles',
			// 					name: 'articles',
			// 					component: './List/Articles',
			// 				},
			// 				{
			// 					path: '/list/search/projects',
			// 					name: 'projects',
			// 					component: './List/Projects',
			// 				},
			// 				{
			// 					path: '/list/search/applications',
			// 					name: 'applications',
			// 					component: './List/Applications',
			// 				},
			// 			],
			// 		},
			// 	],
			// },
			// {
			// 	path: '/profile',
			// 	name: 'profile',
			// 	icon: 'profile',
			// 	routes: [
			// 		// profile
			// 		{
			// 			path: '/profile/basic',
			// 			name: 'basic',
			// 			component: './Profile/BasicProfile',
			// 		},
			// 		{
			// 			path: '/profile/basic/:id',
			// 			name: 'basic',
			// 			hideInMenu: true,
			// 			component: './Profile/BasicProfile',
			// 		},
			// 		{
			// 			path: '/profile/advanced',
			// 			name: 'advanced',
			// 			authority: [ 'admin' ],
			// 			component: './Profile/AdvancedProfile',
			// 		},
			// 	],
			// },
			// {
			// 	name: 'result',
			// 	icon: 'check-circle-o',
			// 	path: '/result',
			// 	routes: [
			// 		// result
			// 		{
			// 			path: '/result/success',
			// 			name: 'success',
			// 			component: './Result/Success',
			// 		},
			// 		{ path: '/result/fail', name: 'fail', component: './Result/Error' },
			// 	],
			// },
			// {
			// 	name: 'exception',
			// 	icon: 'warning',
			// 	path: '/exception',
			// 	routes: [
			// 		// exception
			// 		{
			// 			path: '/exception/403',
			// 			name: 'not-permission',
			// 			component: './Exception/403',
			// 		},
			// 		{
			// 			path: '/exception/404',
			// 			name: 'not-find',
			// 			component: './Exception/404',
			// 		},
			// 		{
			// 			path: '/exception/500',
			// 			name: 'server-error',
			// 			component: './Exception/500',
			// 		},
			// 		{
			// 			path: '/exception/trigger',
			// 			name: 'trigger',
			// 			hideInMenu: true,
			// 			component: './Exception/TriggerException',
			// 		},
			// 	],
			// },
			// {
			// 	name: 'account',
			// 	icon: 'user',
			// 	path: '/account',
			// 	routes: [
			// 		{
			// 			path: '/account/center',
			// 			name: 'center',
			// 			component: './Account/Center/Center',
			// 			routes: [
			// 				{
			// 					path: '/account/center',
			// 					redirect: '/account/center/articles',
			// 				},
			// 				{
			// 					path: '/account/center/articles',
			// 					component: './Account/Center/Articles',
			// 				},
			// 				{
			// 					path: '/account/center/applications',
			// 					component: './Account/Center/Applications',
			// 				},
			// 				{
			// 					path: '/account/center/projects',
			// 					component: './Account/Center/Projects',
			// 				},
			// 			],
			// 		},
			// 		{
			// 			path: '/account/settings',
			// 			name: 'settings',
			// 			component: './Account/Settings/Info',
			// 			routes: [
			// 				{
			// 					path: '/account/settings',
			// 					redirect: '/account/settings/base',
			// 				},
			// 				{
			// 					path: '/account/settings/base',
			// 					component: './Account/Settings/BaseView',
			// 				},
			// 				{
			// 					path: '/account/settings/security',
			// 					component: './Account/Settings/SecurityView',
			// 				},
			// 				{
			// 					path: '/account/settings/binding',
			// 					component: './Account/Settings/BindingView',
			// 				},
			// 				{
			// 					path: '/account/settings/notification',
			// 					component: './Account/Settings/NotificationView',
			// 				},
			// 			],
			// 		},
			// 	],
			// },
			// //  editor
			// {
			// 	name: 'editor',
			// 	icon: 'highlight',
			// 	path: '/editor',
			// 	routes: [
			// 		{
			// 			path: '/editor/flow',
			// 			name: 'flow',
			// 			component: './Editor/GGEditor/Flow',
			// 		},
			// 		{
			// 			path: '/editor/mind',
			// 			name: 'mind',
			// 			component: './Editor/GGEditor/Mind',
			// 		},
			// 		{
			// 			path: '/editor/koni',
			// 			name: 'koni',
			// 			component: './Editor/GGEditor/Koni',
			// 		},
			// 	],
			// },
			// {
			// 	component: '404',
			// },
		],
	},
];
