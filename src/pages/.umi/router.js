import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__UserLayout" */ '../../layouts/UserLayout'),
          LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/UserLayout').default,
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
        exact: true,
      },
      {
        path: '/user/login',
        name: 'login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__User__models__register.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/User/models/register.js').then(
                  m => {
                    return { namespace: 'register', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__User__Login" */ '../User/Login'),
              LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                .default,
            })
          : require('../User/Login').default,
        exact: true,
      },
      {
        path: '/user/register',
        name: 'register',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__User__models__register.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/User/models/register.js').then(
                  m => {
                    return { namespace: 'register', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__User__Register" */ '../User/Register'),
              LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                .default,
            })
          : require('../User/Register').default,
        exact: true,
      },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__User__models__register.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/User/models/register.js').then(
                  m => {
                    return { namespace: 'register', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__User__RegisterResult" */ '../User/RegisterResult'),
              LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                .default,
            })
          : require('../User/RegisterResult').default,
        exact: true,
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404'),
              LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
          LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BasicLayout').default,
    Routes: [require('../Privileged').default],
    routes: [
      {
        path: '/',
        redirect: '/workbench',
        authority: ['admin', 'user'],
        privs: [],
        exact: true,
      },
      {
        path: '/workbench',
        name: 'workbench',
        icon: 'line-chart',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__Workbench__models__activities.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Workbench/models/activities.js').then(
                  m => {
                    return { namespace: 'activities', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__Workbench__models__chart.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Workbench/models/chart.js').then(
                  m => {
                    return { namespace: 'chart', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__Workbench__models__monitor.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Workbench/models/monitor.js').then(
                  m => {
                    return { namespace: 'monitor', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__Workbench__models__studentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Workbench/models/studentList.js').then(
                  m => {
                    return { namespace: 'studentList', ...m.default };
                  },
                ),
                import(/* webpackChunkName: 'p__Workbench__models__workbench.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Workbench/models/workbench.js').then(
                  m => {
                    return { namespace: 'workbench', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__Workbench" */ '../Workbench'),
              LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                .default,
            })
          : require('../Workbench').default,
        exact: true,
      },
      {
        path: '/student',
        name: 'student',
        icon: 'team',
        privs: ['student_manage'],
        routes: [
          {
            path: '/student/sign-up',
            name: 'sign-up',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Student__models__archive.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/archive.js').then(
                      m => {
                        return { namespace: 'archive', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__coachListTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/coachListTable.js').then(
                      m => {
                        return { namespace: 'coachListTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__exam.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/exam.js').then(
                      m => {
                        return { namespace: 'exam', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examAppointment_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_1.js').then(
                      m => {
                        return { namespace: 'examAppointment_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examAppointment_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_2.js').then(
                      m => {
                        return { namespace: 'examAppointment_2', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examAppointment_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_3.js').then(
                      m => {
                        return { namespace: 'examAppointment_3', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_1.js').then(
                      m => {
                        return { namespace: 'examScore_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_2.js').then(
                      m => {
                        return { namespace: 'examScore_2', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_3.js').then(
                      m => {
                        return { namespace: 'examScore_3', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_4.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_4.js').then(
                      m => {
                        return { namespace: 'examScore_4', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_5.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_5.js').then(
                      m => {
                        return { namespace: 'examScore_5', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__log.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/log.js').then(
                      m => {
                        return { namespace: 'log', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__reserve_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve_1.js').then(
                      m => {
                        return { namespace: 'reserve_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__reserve.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve.js').then(
                      m => {
                        return { namespace: 'reserve', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__reserveStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserveStudentList.js').then(
                      m => {
                        return {
                          namespace: 'reserveStudentList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__signUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/signUpTable.js').then(
                      m => {
                        return { namespace: 'signUpTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentCoachLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentCoachLocalList.js').then(
                      m => {
                        return {
                          namespace: 'studentCoachLocalList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalAwaitList.js').then(
                      m => {
                        return {
                          namespace: 'studentDropOutLocalAwaitList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalList.js').then(
                      m => {
                        return {
                          namespace: 'studentDropOutLocalList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentExpectSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentExpectSignUp.js').then(
                      m => {
                        return {
                          namespace: 'studentExpectSignUp',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentFinishDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishDependList.js').then(
                      m => {
                        return {
                          namespace: 'studentFinishDependList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentFinishHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishHelpList.js').then(
                      m => {
                        return {
                          namespace: 'studentFinishHelpList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentFinishList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishList.js').then(
                      m => {
                        return { namespace: 'studentFinishList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentFinishProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishProxyList.js').then(
                      m => {
                        return {
                          namespace: 'studentFinishProxyList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentGraduationDependAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependAwaitList.js').then(
                      m => {
                        return {
                          namespace: 'studentGraduationDependAwaitList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentGraduationDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependList.js').then(
                      m => {
                        return {
                          namespace: 'studentGraduationDependList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentGraduationLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationLocalList.js').then(
                      m => {
                        return {
                          namespace: 'studentGraduationLocalList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentStudyingDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingDependList.js').then(
                      m => {
                        return {
                          namespace: 'studentStudyingDependList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentStudyingHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingHelpList.js').then(
                      m => {
                        return {
                          namespace: 'studentStudyingHelpList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentStudyingProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingProxyList.js').then(
                      m => {
                        return {
                          namespace: 'studentStudyingProxyList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentStudyLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyLocalList.js').then(
                      m => {
                        return {
                          namespace: 'studentStudyLocalList',
                          ...m.default,
                        };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Student__SignUp__Index" */ '../Student/SignUp/Index'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../Student/SignUp/Index').default,
            privs: ['student_enter'],
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/student/sign-up',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Student__SignUp__Index" */ '../Common/RouterRedirect'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Common/RouterRedirect').default,
                exact: true,
              },
              {
                path: '/student/sign-up/formal',
                name: 'formal',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Student__models__archive.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/archive.js').then(
                          m => {
                            return { namespace: 'archive', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__coachListTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/coachListTable.js').then(
                          m => {
                            return {
                              namespace: 'coachListTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__exam.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/exam.js').then(
                          m => {
                            return { namespace: 'exam', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_1.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_1',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_2.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_2',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_3.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_3',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_1.js').then(
                          m => {
                            return { namespace: 'examScore_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_2.js').then(
                          m => {
                            return { namespace: 'examScore_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_3.js').then(
                          m => {
                            return { namespace: 'examScore_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_4.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_4.js').then(
                          m => {
                            return { namespace: 'examScore_4', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_5.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_5.js').then(
                          m => {
                            return { namespace: 'examScore_5', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__log.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/log.js').then(
                          m => {
                            return { namespace: 'log', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserve_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve_1.js').then(
                          m => {
                            return { namespace: 'reserve_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserve.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve.js').then(
                          m => {
                            return { namespace: 'reserve', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserveStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserveStudentList.js').then(
                          m => {
                            return {
                              namespace: 'reserveStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__signUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/signUpTable.js').then(
                          m => {
                            return { namespace: 'signUpTable', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentCoachLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentCoachLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentCoachLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalAwaitList.js').then(
                          m => {
                            return {
                              namespace: 'studentDropOutLocalAwaitList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentDropOutLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentExpectSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentExpectSignUp.js').then(
                          m => {
                            return {
                              namespace: 'studentExpectSignUp',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishHelpList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishHelpList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishProxyList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishProxyList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationDependAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependAwaitList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationDependAwaitList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingHelpList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingHelpList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingProxyList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingProxyList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyLocalList',
                              ...m.default,
                            };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Student__SignUp__Index" */ '../Student/SignUp/SignUp'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Student/SignUp/SignUp').default,
                privs: ['student_enter'],
                exact: true,
              },
              {
                path: '/student/sign-up/expect',
                name: 'expect',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Student__models__archive.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/archive.js').then(
                          m => {
                            return { namespace: 'archive', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__coachListTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/coachListTable.js').then(
                          m => {
                            return {
                              namespace: 'coachListTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__exam.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/exam.js').then(
                          m => {
                            return { namespace: 'exam', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_1.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_1',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_2.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_2',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_3.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_3',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_1.js').then(
                          m => {
                            return { namespace: 'examScore_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_2.js').then(
                          m => {
                            return { namespace: 'examScore_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_3.js').then(
                          m => {
                            return { namespace: 'examScore_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_4.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_4.js').then(
                          m => {
                            return { namespace: 'examScore_4', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_5.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_5.js').then(
                          m => {
                            return { namespace: 'examScore_5', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__log.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/log.js').then(
                          m => {
                            return { namespace: 'log', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserve_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve_1.js').then(
                          m => {
                            return { namespace: 'reserve_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserve.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve.js').then(
                          m => {
                            return { namespace: 'reserve', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserveStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserveStudentList.js').then(
                          m => {
                            return {
                              namespace: 'reserveStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__signUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/signUpTable.js').then(
                          m => {
                            return { namespace: 'signUpTable', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentCoachLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentCoachLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentCoachLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalAwaitList.js').then(
                          m => {
                            return {
                              namespace: 'studentDropOutLocalAwaitList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentDropOutLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentExpectSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentExpectSignUp.js').then(
                          m => {
                            return {
                              namespace: 'studentExpectSignUp',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishHelpList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishHelpList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishProxyList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishProxyList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationDependAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependAwaitList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationDependAwaitList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingHelpList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingHelpList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingProxyList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingProxyList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyLocalList',
                              ...m.default,
                            };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Student__SignUp__Index" */ '../Student/SignUp/ExpectSignUp'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Student/SignUp/ExpectSignUp').default,
                privs: ['student_enter'],
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/student/archive',
            name: 'archive',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Student__models__archive.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/archive.js').then(
                      m => {
                        return { namespace: 'archive', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__coachListTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/coachListTable.js').then(
                      m => {
                        return { namespace: 'coachListTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__exam.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/exam.js').then(
                      m => {
                        return { namespace: 'exam', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examAppointment_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_1.js').then(
                      m => {
                        return { namespace: 'examAppointment_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examAppointment_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_2.js').then(
                      m => {
                        return { namespace: 'examAppointment_2', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examAppointment_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_3.js').then(
                      m => {
                        return { namespace: 'examAppointment_3', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_1.js').then(
                      m => {
                        return { namespace: 'examScore_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_2.js').then(
                      m => {
                        return { namespace: 'examScore_2', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_3.js').then(
                      m => {
                        return { namespace: 'examScore_3', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_4.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_4.js').then(
                      m => {
                        return { namespace: 'examScore_4', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_5.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_5.js').then(
                      m => {
                        return { namespace: 'examScore_5', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__log.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/log.js').then(
                      m => {
                        return { namespace: 'log', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__reserve_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve_1.js').then(
                      m => {
                        return { namespace: 'reserve_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__reserve.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve.js').then(
                      m => {
                        return { namespace: 'reserve', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__reserveStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserveStudentList.js').then(
                      m => {
                        return {
                          namespace: 'reserveStudentList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__signUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/signUpTable.js').then(
                      m => {
                        return { namespace: 'signUpTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentCoachLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentCoachLocalList.js').then(
                      m => {
                        return {
                          namespace: 'studentCoachLocalList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalAwaitList.js').then(
                      m => {
                        return {
                          namespace: 'studentDropOutLocalAwaitList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalList.js').then(
                      m => {
                        return {
                          namespace: 'studentDropOutLocalList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentExpectSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentExpectSignUp.js').then(
                      m => {
                        return {
                          namespace: 'studentExpectSignUp',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentFinishDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishDependList.js').then(
                      m => {
                        return {
                          namespace: 'studentFinishDependList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentFinishHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishHelpList.js').then(
                      m => {
                        return {
                          namespace: 'studentFinishHelpList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentFinishList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishList.js').then(
                      m => {
                        return { namespace: 'studentFinishList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentFinishProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishProxyList.js').then(
                      m => {
                        return {
                          namespace: 'studentFinishProxyList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentGraduationDependAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependAwaitList.js').then(
                      m => {
                        return {
                          namespace: 'studentGraduationDependAwaitList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentGraduationDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependList.js').then(
                      m => {
                        return {
                          namespace: 'studentGraduationDependList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentGraduationLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationLocalList.js').then(
                      m => {
                        return {
                          namespace: 'studentGraduationLocalList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentStudyingDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingDependList.js').then(
                      m => {
                        return {
                          namespace: 'studentStudyingDependList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentStudyingHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingHelpList.js').then(
                      m => {
                        return {
                          namespace: 'studentStudyingHelpList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentStudyingProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingProxyList.js').then(
                      m => {
                        return {
                          namespace: 'studentStudyingProxyList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentStudyLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyLocalList.js').then(
                      m => {
                        return {
                          namespace: 'studentStudyLocalList',
                          ...m.default,
                        };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Student__Archive__Archive" */ '../Student/Archive/Archive'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../Student/Archive/Archive').default,
            privs: ['archivist_manage'],
            exact: true,
          },
          {
            path: '/student/reserve-class',
            name: 'reserve-class',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Student__models__archive.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/archive.js').then(
                      m => {
                        return { namespace: 'archive', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__coachListTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/coachListTable.js').then(
                      m => {
                        return { namespace: 'coachListTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__exam.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/exam.js').then(
                      m => {
                        return { namespace: 'exam', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examAppointment_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_1.js').then(
                      m => {
                        return { namespace: 'examAppointment_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examAppointment_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_2.js').then(
                      m => {
                        return { namespace: 'examAppointment_2', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examAppointment_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_3.js').then(
                      m => {
                        return { namespace: 'examAppointment_3', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_1.js').then(
                      m => {
                        return { namespace: 'examScore_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_2.js').then(
                      m => {
                        return { namespace: 'examScore_2', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_3.js').then(
                      m => {
                        return { namespace: 'examScore_3', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_4.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_4.js').then(
                      m => {
                        return { namespace: 'examScore_4', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_5.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_5.js').then(
                      m => {
                        return { namespace: 'examScore_5', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__log.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/log.js').then(
                      m => {
                        return { namespace: 'log', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__reserve_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve_1.js').then(
                      m => {
                        return { namespace: 'reserve_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__reserve.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve.js').then(
                      m => {
                        return { namespace: 'reserve', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__reserveStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserveStudentList.js').then(
                      m => {
                        return {
                          namespace: 'reserveStudentList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__signUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/signUpTable.js').then(
                      m => {
                        return { namespace: 'signUpTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentCoachLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentCoachLocalList.js').then(
                      m => {
                        return {
                          namespace: 'studentCoachLocalList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalAwaitList.js').then(
                      m => {
                        return {
                          namespace: 'studentDropOutLocalAwaitList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalList.js').then(
                      m => {
                        return {
                          namespace: 'studentDropOutLocalList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentExpectSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentExpectSignUp.js').then(
                      m => {
                        return {
                          namespace: 'studentExpectSignUp',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentFinishDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishDependList.js').then(
                      m => {
                        return {
                          namespace: 'studentFinishDependList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentFinishHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishHelpList.js').then(
                      m => {
                        return {
                          namespace: 'studentFinishHelpList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentFinishList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishList.js').then(
                      m => {
                        return { namespace: 'studentFinishList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentFinishProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishProxyList.js').then(
                      m => {
                        return {
                          namespace: 'studentFinishProxyList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentGraduationDependAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependAwaitList.js').then(
                      m => {
                        return {
                          namespace: 'studentGraduationDependAwaitList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentGraduationDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependList.js').then(
                      m => {
                        return {
                          namespace: 'studentGraduationDependList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentGraduationLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationLocalList.js').then(
                      m => {
                        return {
                          namespace: 'studentGraduationLocalList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentStudyingDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingDependList.js').then(
                      m => {
                        return {
                          namespace: 'studentStudyingDependList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentStudyingHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingHelpList.js').then(
                      m => {
                        return {
                          namespace: 'studentStudyingHelpList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentStudyingProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingProxyList.js').then(
                      m => {
                        return {
                          namespace: 'studentStudyingProxyList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentStudyLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyLocalList.js').then(
                      m => {
                        return {
                          namespace: 'studentStudyLocalList',
                          ...m.default,
                        };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Student__ReserveClass__Index" */ '../Student/ReserveClass/Index'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../Student/ReserveClass/Index').default,
            hideChildrenInMenu: true,
            privs: ['order_course_manage'],
            routes: [
              {
                path: '/student/reserve-class',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Student__ReserveClass__Index" */ '../Common/RouterRedirect'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Common/RouterRedirect').default,
                exact: true,
              },
              {
                path: '/student/reserve-class/reserve',
                name: 'reserve',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Student__models__archive.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/archive.js').then(
                          m => {
                            return { namespace: 'archive', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__coachListTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/coachListTable.js').then(
                          m => {
                            return {
                              namespace: 'coachListTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__exam.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/exam.js').then(
                          m => {
                            return { namespace: 'exam', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_1.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_1',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_2.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_2',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_3.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_3',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_1.js').then(
                          m => {
                            return { namespace: 'examScore_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_2.js').then(
                          m => {
                            return { namespace: 'examScore_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_3.js').then(
                          m => {
                            return { namespace: 'examScore_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_4.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_4.js').then(
                          m => {
                            return { namespace: 'examScore_4', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_5.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_5.js').then(
                          m => {
                            return { namespace: 'examScore_5', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__log.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/log.js').then(
                          m => {
                            return { namespace: 'log', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserve_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve_1.js').then(
                          m => {
                            return { namespace: 'reserve_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserve.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve.js').then(
                          m => {
                            return { namespace: 'reserve', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserveStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserveStudentList.js').then(
                          m => {
                            return {
                              namespace: 'reserveStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__signUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/signUpTable.js').then(
                          m => {
                            return { namespace: 'signUpTable', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentCoachLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentCoachLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentCoachLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalAwaitList.js').then(
                          m => {
                            return {
                              namespace: 'studentDropOutLocalAwaitList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentDropOutLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentExpectSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentExpectSignUp.js').then(
                          m => {
                            return {
                              namespace: 'studentExpectSignUp',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishHelpList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishHelpList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishProxyList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishProxyList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationDependAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependAwaitList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationDependAwaitList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingHelpList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingHelpList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingProxyList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingProxyList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyLocalList',
                              ...m.default,
                            };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Student__ReserveClass__Index" */ '../Student/ReserveClass/Reserve'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Student/ReserveClass/Reserve').default,
                privs: ['order_course'],
                exact: true,
              },
              {
                path: '/student/reserve-class/log',
                name: 'log',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Student__models__archive.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/archive.js').then(
                          m => {
                            return { namespace: 'archive', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__coachListTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/coachListTable.js').then(
                          m => {
                            return {
                              namespace: 'coachListTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__exam.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/exam.js').then(
                          m => {
                            return { namespace: 'exam', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_1.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_1',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_2.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_2',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_3.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_3',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_1.js').then(
                          m => {
                            return { namespace: 'examScore_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_2.js').then(
                          m => {
                            return { namespace: 'examScore_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_3.js').then(
                          m => {
                            return { namespace: 'examScore_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_4.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_4.js').then(
                          m => {
                            return { namespace: 'examScore_4', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_5.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_5.js').then(
                          m => {
                            return { namespace: 'examScore_5', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__log.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/log.js').then(
                          m => {
                            return { namespace: 'log', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserve_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve_1.js').then(
                          m => {
                            return { namespace: 'reserve_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserve.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve.js').then(
                          m => {
                            return { namespace: 'reserve', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserveStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserveStudentList.js').then(
                          m => {
                            return {
                              namespace: 'reserveStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__signUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/signUpTable.js').then(
                          m => {
                            return { namespace: 'signUpTable', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentCoachLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentCoachLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentCoachLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalAwaitList.js').then(
                          m => {
                            return {
                              namespace: 'studentDropOutLocalAwaitList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentDropOutLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentExpectSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentExpectSignUp.js').then(
                          m => {
                            return {
                              namespace: 'studentExpectSignUp',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishHelpList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishHelpList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishProxyList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishProxyList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationDependAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependAwaitList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationDependAwaitList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingHelpList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingHelpList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingProxyList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingProxyList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyLocalList',
                              ...m.default,
                            };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Student__ReserveClass__Index" */ '../Student/ReserveClass/Log'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Student/ReserveClass/Log').default,
                privs: ['order_course_record'],
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/student/exam',
            name: 'exam',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Student__models__archive.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/archive.js').then(
                      m => {
                        return { namespace: 'archive', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__coachListTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/coachListTable.js').then(
                      m => {
                        return { namespace: 'coachListTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__exam.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/exam.js').then(
                      m => {
                        return { namespace: 'exam', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examAppointment_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_1.js').then(
                      m => {
                        return { namespace: 'examAppointment_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examAppointment_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_2.js').then(
                      m => {
                        return { namespace: 'examAppointment_2', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examAppointment_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_3.js').then(
                      m => {
                        return { namespace: 'examAppointment_3', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_1.js').then(
                      m => {
                        return { namespace: 'examScore_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_2.js').then(
                      m => {
                        return { namespace: 'examScore_2', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_3.js').then(
                      m => {
                        return { namespace: 'examScore_3', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_4.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_4.js').then(
                      m => {
                        return { namespace: 'examScore_4', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_5.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_5.js').then(
                      m => {
                        return { namespace: 'examScore_5', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__log.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/log.js').then(
                      m => {
                        return { namespace: 'log', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__reserve_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve_1.js').then(
                      m => {
                        return { namespace: 'reserve_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__reserve.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve.js').then(
                      m => {
                        return { namespace: 'reserve', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__reserveStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserveStudentList.js').then(
                      m => {
                        return {
                          namespace: 'reserveStudentList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__signUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/signUpTable.js').then(
                      m => {
                        return { namespace: 'signUpTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentCoachLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentCoachLocalList.js').then(
                      m => {
                        return {
                          namespace: 'studentCoachLocalList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalAwaitList.js').then(
                      m => {
                        return {
                          namespace: 'studentDropOutLocalAwaitList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalList.js').then(
                      m => {
                        return {
                          namespace: 'studentDropOutLocalList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentExpectSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentExpectSignUp.js').then(
                      m => {
                        return {
                          namespace: 'studentExpectSignUp',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentFinishDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishDependList.js').then(
                      m => {
                        return {
                          namespace: 'studentFinishDependList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentFinishHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishHelpList.js').then(
                      m => {
                        return {
                          namespace: 'studentFinishHelpList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentFinishList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishList.js').then(
                      m => {
                        return { namespace: 'studentFinishList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentFinishProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishProxyList.js').then(
                      m => {
                        return {
                          namespace: 'studentFinishProxyList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentGraduationDependAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependAwaitList.js').then(
                      m => {
                        return {
                          namespace: 'studentGraduationDependAwaitList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentGraduationDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependList.js').then(
                      m => {
                        return {
                          namespace: 'studentGraduationDependList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentGraduationLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationLocalList.js').then(
                      m => {
                        return {
                          namespace: 'studentGraduationLocalList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentStudyingDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingDependList.js').then(
                      m => {
                        return {
                          namespace: 'studentStudyingDependList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentStudyingHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingHelpList.js').then(
                      m => {
                        return {
                          namespace: 'studentStudyingHelpList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentStudyingProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingProxyList.js').then(
                      m => {
                        return {
                          namespace: 'studentStudyingProxyList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentStudyLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyLocalList.js').then(
                      m => {
                        return {
                          namespace: 'studentStudyLocalList',
                          ...m.default,
                        };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Student__Exam__Exam" */ '../Student/Exam/Exam'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../Student/Exam/Exam').default,
            hideChildrenInMenu: true,
            privs: ['exam_manage'],
            routes: [
              {
                path: '/student/exam',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Student__Exam__Exam" */ '../Common/RouterRedirect'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Common/RouterRedirect').default,
                exact: true,
              },
              {
                path: '/student/exam/appointment',
                name: 'appointment',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Student__models__archive.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/archive.js').then(
                          m => {
                            return { namespace: 'archive', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__coachListTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/coachListTable.js').then(
                          m => {
                            return {
                              namespace: 'coachListTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__exam.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/exam.js').then(
                          m => {
                            return { namespace: 'exam', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_1.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_1',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_2.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_2',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_3.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_3',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_1.js').then(
                          m => {
                            return { namespace: 'examScore_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_2.js').then(
                          m => {
                            return { namespace: 'examScore_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_3.js').then(
                          m => {
                            return { namespace: 'examScore_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_4.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_4.js').then(
                          m => {
                            return { namespace: 'examScore_4', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_5.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_5.js').then(
                          m => {
                            return { namespace: 'examScore_5', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__log.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/log.js').then(
                          m => {
                            return { namespace: 'log', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserve_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve_1.js').then(
                          m => {
                            return { namespace: 'reserve_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserve.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve.js').then(
                          m => {
                            return { namespace: 'reserve', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserveStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserveStudentList.js').then(
                          m => {
                            return {
                              namespace: 'reserveStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__signUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/signUpTable.js').then(
                          m => {
                            return { namespace: 'signUpTable', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentCoachLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentCoachLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentCoachLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalAwaitList.js').then(
                          m => {
                            return {
                              namespace: 'studentDropOutLocalAwaitList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentDropOutLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentExpectSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentExpectSignUp.js').then(
                          m => {
                            return {
                              namespace: 'studentExpectSignUp',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishHelpList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishHelpList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishProxyList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishProxyList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationDependAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependAwaitList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationDependAwaitList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingHelpList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingHelpList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingProxyList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingProxyList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyLocalList',
                              ...m.default,
                            };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Student__Exam__Exam" */ '../Student/Exam/Appointment'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Student/Exam/Appointment').default,
                privs: ['order_exam_manage'],
                exact: true,
              },
              {
                path: '/student/exam/score',
                name: 'score',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Student__models__archive.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/archive.js').then(
                          m => {
                            return { namespace: 'archive', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__coachListTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/coachListTable.js').then(
                          m => {
                            return {
                              namespace: 'coachListTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__exam.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/exam.js').then(
                          m => {
                            return { namespace: 'exam', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_1.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_1',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_2.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_2',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_3.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_3',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_1.js').then(
                          m => {
                            return { namespace: 'examScore_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_2.js').then(
                          m => {
                            return { namespace: 'examScore_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_3.js').then(
                          m => {
                            return { namespace: 'examScore_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_4.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_4.js').then(
                          m => {
                            return { namespace: 'examScore_4', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_5.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_5.js').then(
                          m => {
                            return { namespace: 'examScore_5', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__log.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/log.js').then(
                          m => {
                            return { namespace: 'log', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserve_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve_1.js').then(
                          m => {
                            return { namespace: 'reserve_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserve.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve.js').then(
                          m => {
                            return { namespace: 'reserve', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserveStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserveStudentList.js').then(
                          m => {
                            return {
                              namespace: 'reserveStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__signUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/signUpTable.js').then(
                          m => {
                            return { namespace: 'signUpTable', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentCoachLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentCoachLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentCoachLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalAwaitList.js').then(
                          m => {
                            return {
                              namespace: 'studentDropOutLocalAwaitList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentDropOutLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentExpectSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentExpectSignUp.js').then(
                          m => {
                            return {
                              namespace: 'studentExpectSignUp',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishHelpList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishHelpList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishProxyList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishProxyList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationDependAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependAwaitList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationDependAwaitList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingHelpList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingHelpList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingProxyList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingProxyList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyLocalList',
                              ...m.default,
                            };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Student__Exam__Exam" */ '../Student/Exam/Score'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Student/Exam/Score').default,
                privs: ['grade_manage'],
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/student/student-list',
            name: 'student-list',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Student__models__archive.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/archive.js').then(
                      m => {
                        return { namespace: 'archive', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__coachListTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/coachListTable.js').then(
                      m => {
                        return { namespace: 'coachListTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__exam.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/exam.js').then(
                      m => {
                        return { namespace: 'exam', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examAppointment_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_1.js').then(
                      m => {
                        return { namespace: 'examAppointment_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examAppointment_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_2.js').then(
                      m => {
                        return { namespace: 'examAppointment_2', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examAppointment_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_3.js').then(
                      m => {
                        return { namespace: 'examAppointment_3', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_1.js').then(
                      m => {
                        return { namespace: 'examScore_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_2.js').then(
                      m => {
                        return { namespace: 'examScore_2', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_3.js').then(
                      m => {
                        return { namespace: 'examScore_3', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_4.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_4.js').then(
                      m => {
                        return { namespace: 'examScore_4', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__examScore_5.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_5.js').then(
                      m => {
                        return { namespace: 'examScore_5', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__log.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/log.js').then(
                      m => {
                        return { namespace: 'log', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__reserve_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve_1.js').then(
                      m => {
                        return { namespace: 'reserve_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__reserve.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve.js').then(
                      m => {
                        return { namespace: 'reserve', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__reserveStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserveStudentList.js').then(
                      m => {
                        return {
                          namespace: 'reserveStudentList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__signUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/signUpTable.js').then(
                      m => {
                        return { namespace: 'signUpTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentCoachLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentCoachLocalList.js').then(
                      m => {
                        return {
                          namespace: 'studentCoachLocalList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalAwaitList.js').then(
                      m => {
                        return {
                          namespace: 'studentDropOutLocalAwaitList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalList.js').then(
                      m => {
                        return {
                          namespace: 'studentDropOutLocalList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentExpectSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentExpectSignUp.js').then(
                      m => {
                        return {
                          namespace: 'studentExpectSignUp',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentFinishDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishDependList.js').then(
                      m => {
                        return {
                          namespace: 'studentFinishDependList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentFinishHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishHelpList.js').then(
                      m => {
                        return {
                          namespace: 'studentFinishHelpList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentFinishList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishList.js').then(
                      m => {
                        return { namespace: 'studentFinishList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentFinishProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishProxyList.js').then(
                      m => {
                        return {
                          namespace: 'studentFinishProxyList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentGraduationDependAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependAwaitList.js').then(
                      m => {
                        return {
                          namespace: 'studentGraduationDependAwaitList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentGraduationDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependList.js').then(
                      m => {
                        return {
                          namespace: 'studentGraduationDependList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentGraduationLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationLocalList.js').then(
                      m => {
                        return {
                          namespace: 'studentGraduationLocalList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentStudyingDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingDependList.js').then(
                      m => {
                        return {
                          namespace: 'studentStudyingDependList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentStudyingHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingHelpList.js').then(
                      m => {
                        return {
                          namespace: 'studentStudyingHelpList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentStudyingProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingProxyList.js').then(
                      m => {
                        return {
                          namespace: 'studentStudyingProxyList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Student__models__studentStudyLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyLocalList.js').then(
                      m => {
                        return {
                          namespace: 'studentStudyLocalList',
                          ...m.default,
                        };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Student__StudentList__StudentList" */ '../Student/StudentList/StudentList'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../Student/StudentList/StudentList').default,
            hideChildrenInMenu: true,
            privs: ['student_list'],
            routes: [
              {
                path: '/student/student-list',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Student__StudentList__StudentList" */ '../Common/RouterRedirect'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Common/RouterRedirect').default,
                exact: true,
              },
              {
                path: '/student/student-list/local',
                name: 'student-list-local',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Student__models__archive.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/archive.js').then(
                          m => {
                            return { namespace: 'archive', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__coachListTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/coachListTable.js').then(
                          m => {
                            return {
                              namespace: 'coachListTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__exam.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/exam.js').then(
                          m => {
                            return { namespace: 'exam', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_1.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_1',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_2.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_2',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_3.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_3',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_1.js').then(
                          m => {
                            return { namespace: 'examScore_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_2.js').then(
                          m => {
                            return { namespace: 'examScore_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_3.js').then(
                          m => {
                            return { namespace: 'examScore_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_4.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_4.js').then(
                          m => {
                            return { namespace: 'examScore_4', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_5.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_5.js').then(
                          m => {
                            return { namespace: 'examScore_5', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__log.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/log.js').then(
                          m => {
                            return { namespace: 'log', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserve_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve_1.js').then(
                          m => {
                            return { namespace: 'reserve_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserve.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve.js').then(
                          m => {
                            return { namespace: 'reserve', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserveStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserveStudentList.js').then(
                          m => {
                            return {
                              namespace: 'reserveStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__signUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/signUpTable.js').then(
                          m => {
                            return { namespace: 'signUpTable', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentCoachLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentCoachLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentCoachLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalAwaitList.js').then(
                          m => {
                            return {
                              namespace: 'studentDropOutLocalAwaitList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentDropOutLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentExpectSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentExpectSignUp.js').then(
                          m => {
                            return {
                              namespace: 'studentExpectSignUp',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishHelpList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishHelpList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishProxyList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishProxyList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationDependAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependAwaitList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationDependAwaitList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingHelpList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingHelpList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingProxyList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingProxyList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyLocalList',
                              ...m.default,
                            };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Student__StudentList__StudentList" */ '../Student/StudentList/Local'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Student/StudentList/Local').default,
                privs: ['localshool_student'],
                exact: true,
              },
              {
                path: '/student/student-list/help',
                name: 'student-list-help',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Student__models__archive.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/archive.js').then(
                          m => {
                            return { namespace: 'archive', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__coachListTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/coachListTable.js').then(
                          m => {
                            return {
                              namespace: 'coachListTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__exam.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/exam.js').then(
                          m => {
                            return { namespace: 'exam', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_1.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_1',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_2.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_2',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_3.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_3',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_1.js').then(
                          m => {
                            return { namespace: 'examScore_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_2.js').then(
                          m => {
                            return { namespace: 'examScore_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_3.js').then(
                          m => {
                            return { namespace: 'examScore_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_4.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_4.js').then(
                          m => {
                            return { namespace: 'examScore_4', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_5.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_5.js').then(
                          m => {
                            return { namespace: 'examScore_5', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__log.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/log.js').then(
                          m => {
                            return { namespace: 'log', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserve_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve_1.js').then(
                          m => {
                            return { namespace: 'reserve_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserve.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve.js').then(
                          m => {
                            return { namespace: 'reserve', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserveStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserveStudentList.js').then(
                          m => {
                            return {
                              namespace: 'reserveStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__signUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/signUpTable.js').then(
                          m => {
                            return { namespace: 'signUpTable', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentCoachLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentCoachLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentCoachLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalAwaitList.js').then(
                          m => {
                            return {
                              namespace: 'studentDropOutLocalAwaitList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentDropOutLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentExpectSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentExpectSignUp.js').then(
                          m => {
                            return {
                              namespace: 'studentExpectSignUp',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishHelpList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishHelpList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishProxyList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishProxyList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationDependAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependAwaitList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationDependAwaitList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingHelpList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingHelpList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingProxyList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingProxyList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyLocalList',
                              ...m.default,
                            };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Student__StudentList__StudentList" */ '../Student/StudentList/Help'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Student/StudentList/Help').default,
                exact: true,
              },
              {
                path: '/student/student-list/proxy',
                name: 'student-list-proxy',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Student__models__archive.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/archive.js').then(
                          m => {
                            return { namespace: 'archive', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__coachListTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/coachListTable.js').then(
                          m => {
                            return {
                              namespace: 'coachListTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__exam.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/exam.js').then(
                          m => {
                            return { namespace: 'exam', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_1.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_1',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_2.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_2',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_3.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_3',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_1.js').then(
                          m => {
                            return { namespace: 'examScore_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_2.js').then(
                          m => {
                            return { namespace: 'examScore_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_3.js').then(
                          m => {
                            return { namespace: 'examScore_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_4.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_4.js').then(
                          m => {
                            return { namespace: 'examScore_4', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_5.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_5.js').then(
                          m => {
                            return { namespace: 'examScore_5', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__log.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/log.js').then(
                          m => {
                            return { namespace: 'log', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserve_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve_1.js').then(
                          m => {
                            return { namespace: 'reserve_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserve.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve.js').then(
                          m => {
                            return { namespace: 'reserve', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserveStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserveStudentList.js').then(
                          m => {
                            return {
                              namespace: 'reserveStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__signUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/signUpTable.js').then(
                          m => {
                            return { namespace: 'signUpTable', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentCoachLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentCoachLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentCoachLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalAwaitList.js').then(
                          m => {
                            return {
                              namespace: 'studentDropOutLocalAwaitList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentDropOutLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentExpectSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentExpectSignUp.js').then(
                          m => {
                            return {
                              namespace: 'studentExpectSignUp',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishHelpList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishHelpList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishProxyList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishProxyList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationDependAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependAwaitList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationDependAwaitList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingHelpList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingHelpList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingProxyList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingProxyList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyLocalList',
                              ...m.default,
                            };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Student__StudentList__StudentList" */ '../Student/StudentList/Proxy'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Student/StudentList/Proxy').default,
                exact: true,
              },
              {
                path: '/student/student-list/depend',
                name: 'student-list-depend',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Student__models__archive.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/archive.js').then(
                          m => {
                            return { namespace: 'archive', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__coachListTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/coachListTable.js').then(
                          m => {
                            return {
                              namespace: 'coachListTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__exam.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/exam.js').then(
                          m => {
                            return { namespace: 'exam', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_1.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_1',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_2.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_2',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examAppointment_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examAppointment_3.js').then(
                          m => {
                            return {
                              namespace: 'examAppointment_3',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_1.js').then(
                          m => {
                            return { namespace: 'examScore_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_2.js').then(
                          m => {
                            return { namespace: 'examScore_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_3.js').then(
                          m => {
                            return { namespace: 'examScore_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_4.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_4.js').then(
                          m => {
                            return { namespace: 'examScore_4', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__examScore_5.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/examScore_5.js').then(
                          m => {
                            return { namespace: 'examScore_5', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__log.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/log.js').then(
                          m => {
                            return { namespace: 'log', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserve_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve_1.js').then(
                          m => {
                            return { namespace: 'reserve_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserve.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserve.js').then(
                          m => {
                            return { namespace: 'reserve', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__reserveStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/reserveStudentList.js').then(
                          m => {
                            return {
                              namespace: 'reserveStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__signUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/signUpTable.js').then(
                          m => {
                            return { namespace: 'signUpTable', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentCoachLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentCoachLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentCoachLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalAwaitList.js').then(
                          m => {
                            return {
                              namespace: 'studentDropOutLocalAwaitList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentDropOutLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentDropOutLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentDropOutLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentExpectSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentExpectSignUp.js').then(
                          m => {
                            return {
                              namespace: 'studentExpectSignUp',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishHelpList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishHelpList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentFinishProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentFinishProxyList.js').then(
                          m => {
                            return {
                              namespace: 'studentFinishProxyList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationDependAwaitList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependAwaitList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationDependAwaitList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentGraduationLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentGraduationLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentGraduationLocalList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingDependList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingDependList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingDependList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingHelpList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingHelpList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingHelpList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyingProxyList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyingProxyList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyingProxyList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Student__models__studentStudyLocalList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Student/models/studentStudyLocalList.js').then(
                          m => {
                            return {
                              namespace: 'studentStudyLocalList',
                              ...m.default,
                            };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Student__StudentList__StudentList" */ '../Student/StudentList/Depend'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Student/StudentList/Depend').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            component: () =>
              React.createElement(
                require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/teaching',
        name: 'teaching',
        icon: 'snippets',
        privs: ['edu_manage'],
        routes: [
          {
            path: '/teaching/coach',
            name: 'coach',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Teaching__models__changeClassStudents.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/changeClassStudents.js').then(
                      m => {
                        return {
                          namespace: 'changeClassStudents',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__class.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/class.js').then(
                      m => {
                        return { namespace: 'class', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__coach.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/coach.js').then(
                      m => {
                        return { namespace: 'coach', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__coachStudent.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/coachStudent.js').then(
                      m => {
                        return { namespace: 'coachStudent', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__course.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/course.js').then(
                      m => {
                        return { namespace: 'course', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__lesson.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/lesson.js').then(
                      m => {
                        return { namespace: 'lesson', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__studentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/studentList.js').then(
                      m => {
                        return { namespace: 'studentList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__studentNumList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/studentNumList.js').then(
                      m => {
                        return { namespace: 'studentNumList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__TeachingLog.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/TeachingLog.js').then(
                      m => {
                        return { namespace: 'TeachingLog', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Teaching__Coach__Coach" */ '../Teaching/Coach/Coach'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../Teaching/Coach/Coach').default,
            hideChildrenInMenu: true,
            privs: ['coach_manage'],
            routes: [
              {
                path: '/teaching/coach',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Teaching__Coach__Coach" */ '../Common/RouterRedirect'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Common/RouterRedirect').default,
                exact: true,
              },
              {
                path: '/teaching/coach/list',
                name: 'list',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Teaching__models__changeClassStudents.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/changeClassStudents.js').then(
                          m => {
                            return {
                              namespace: 'changeClassStudents',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Teaching__models__class.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/class.js').then(
                          m => {
                            return { namespace: 'class', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Teaching__models__coach.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/coach.js').then(
                          m => {
                            return { namespace: 'coach', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Teaching__models__coachStudent.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/coachStudent.js').then(
                          m => {
                            return { namespace: 'coachStudent', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Teaching__models__course.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/course.js').then(
                          m => {
                            return { namespace: 'course', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Teaching__models__lesson.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/lesson.js').then(
                          m => {
                            return { namespace: 'lesson', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Teaching__models__studentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/studentList.js').then(
                          m => {
                            return { namespace: 'studentList', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Teaching__models__studentNumList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/studentNumList.js').then(
                          m => {
                            return {
                              namespace: 'studentNumList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Teaching__models__TeachingLog.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/TeachingLog.js').then(
                          m => {
                            return { namespace: 'TeachingLog', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Teaching__Coach__Coach" */ '../Teaching/Coach/CoachList'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Teaching/Coach/CoachList').default,
                privs: ['coach_list'],
                exact: true,
              },
              {
                path: '/teaching/coach/student',
                name: 'student',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Teaching__models__changeClassStudents.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/changeClassStudents.js').then(
                          m => {
                            return {
                              namespace: 'changeClassStudents',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Teaching__models__class.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/class.js').then(
                          m => {
                            return { namespace: 'class', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Teaching__models__coach.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/coach.js').then(
                          m => {
                            return { namespace: 'coach', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Teaching__models__coachStudent.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/coachStudent.js').then(
                          m => {
                            return { namespace: 'coachStudent', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Teaching__models__course.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/course.js').then(
                          m => {
                            return { namespace: 'course', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Teaching__models__lesson.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/lesson.js').then(
                          m => {
                            return { namespace: 'lesson', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Teaching__models__studentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/studentList.js').then(
                          m => {
                            return { namespace: 'studentList', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Teaching__models__studentNumList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/studentNumList.js').then(
                          m => {
                            return {
                              namespace: 'studentNumList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Teaching__models__TeachingLog.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/TeachingLog.js').then(
                          m => {
                            return { namespace: 'TeachingLog', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Teaching__Coach__Coach" */ '../Teaching/Coach/CoachStudent'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Teaching/Coach/CoachStudent').default,
                privs: ['student_info'],
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/teaching/course',
            name: 'course',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Teaching__models__changeClassStudents.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/changeClassStudents.js').then(
                      m => {
                        return {
                          namespace: 'changeClassStudents',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__class.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/class.js').then(
                      m => {
                        return { namespace: 'class', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__coach.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/coach.js').then(
                      m => {
                        return { namespace: 'coach', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__coachStudent.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/coachStudent.js').then(
                      m => {
                        return { namespace: 'coachStudent', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__course.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/course.js').then(
                      m => {
                        return { namespace: 'course', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__lesson.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/lesson.js').then(
                      m => {
                        return { namespace: 'lesson', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__studentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/studentList.js').then(
                      m => {
                        return { namespace: 'studentList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__studentNumList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/studentNumList.js').then(
                      m => {
                        return { namespace: 'studentNumList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__TeachingLog.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/TeachingLog.js').then(
                      m => {
                        return { namespace: 'TeachingLog', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Teaching__Course__Course" */ '../Teaching/Course/Course'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../Teaching/Course/Course').default,
            privs: ['course_record_manage'],
            exact: true,
          },
          {
            path: '/teaching/lesson',
            name: 'lesson',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Teaching__models__changeClassStudents.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/changeClassStudents.js').then(
                      m => {
                        return {
                          namespace: 'changeClassStudents',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__class.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/class.js').then(
                      m => {
                        return { namespace: 'class', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__coach.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/coach.js').then(
                      m => {
                        return { namespace: 'coach', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__coachStudent.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/coachStudent.js').then(
                      m => {
                        return { namespace: 'coachStudent', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__course.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/course.js').then(
                      m => {
                        return { namespace: 'course', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__lesson.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/lesson.js').then(
                      m => {
                        return { namespace: 'lesson', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__studentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/studentList.js').then(
                      m => {
                        return { namespace: 'studentList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__studentNumList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/studentNumList.js').then(
                      m => {
                        return { namespace: 'studentNumList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__TeachingLog.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/TeachingLog.js').then(
                      m => {
                        return { namespace: 'TeachingLog', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Teaching__Lesson__Index" */ '../Teaching/Lesson/Index'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../Teaching/Lesson/Index').default,
            privs: ['lession_manage'],
            exact: true,
          },
          {
            path: '/teaching/class',
            name: 'class',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Teaching__models__changeClassStudents.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/changeClassStudents.js').then(
                      m => {
                        return {
                          namespace: 'changeClassStudents',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__class.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/class.js').then(
                      m => {
                        return { namespace: 'class', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__coach.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/coach.js').then(
                      m => {
                        return { namespace: 'coach', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__coachStudent.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/coachStudent.js').then(
                      m => {
                        return { namespace: 'coachStudent', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__course.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/course.js').then(
                      m => {
                        return { namespace: 'course', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__lesson.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/lesson.js').then(
                      m => {
                        return { namespace: 'lesson', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__studentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/studentList.js').then(
                      m => {
                        return { namespace: 'studentList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__studentNumList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/studentNumList.js').then(
                      m => {
                        return { namespace: 'studentNumList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__TeachingLog.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/TeachingLog.js').then(
                      m => {
                        return { namespace: 'TeachingLog', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Teaching__Class__Class" */ '../Teaching/Class/Class'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../Teaching/Class/Class').default,
            privs: ['class_pattern_manage'],
            exact: true,
          },
          {
            path: '/teaching/log',
            name: 'log',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Teaching__models__changeClassStudents.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/changeClassStudents.js').then(
                      m => {
                        return {
                          namespace: 'changeClassStudents',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__class.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/class.js').then(
                      m => {
                        return { namespace: 'class', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__coach.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/coach.js').then(
                      m => {
                        return { namespace: 'coach', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__coachStudent.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/coachStudent.js').then(
                      m => {
                        return { namespace: 'coachStudent', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__course.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/course.js').then(
                      m => {
                        return { namespace: 'course', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__lesson.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/lesson.js').then(
                      m => {
                        return { namespace: 'lesson', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__studentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/studentList.js').then(
                      m => {
                        return { namespace: 'studentList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__studentNumList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/studentNumList.js').then(
                      m => {
                        return { namespace: 'studentNumList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Teaching__models__TeachingLog.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Teaching/models/TeachingLog.js').then(
                      m => {
                        return { namespace: 'TeachingLog', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Teaching__TeachingLog__TeachingLog" */ '../Teaching/TeachingLog/TeachingLog'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../Teaching/TeachingLog/TeachingLog').default,
            privs: ['education_log'],
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/school',
        name: 'school',
        icon: 'apartment',
        privs: ['school_manage'],
        routes: [
          {
            path: '/school/org',
            name: 'organization',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__School__models__archivist.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/archivist.js').then(
                      m => {
                        return { namespace: 'archivist', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__collaborate.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/collaborate.js').then(
                      m => {
                        return { namespace: 'collaborate', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__goal.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/goal.js').then(
                      m => {
                        return { namespace: 'goal', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__Introducer.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/Introducer.js').then(
                      m => {
                        return { namespace: 'Introducer', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__position.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/position.js').then(
                      m => {
                        return { namespace: 'position', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__vacation.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/vacation.js').then(
                      m => {
                        return { namespace: 'vacation', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__School__Org__Index" */ '../School/Org/Index'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../School/Org/Index').default,
            hideChildrenInMenu: true,
            privs: ['orgnize_manage'],
            routes: [
              {
                path: '/school/org',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__School__Org__Index" */ '../Common/RouterRedirect'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Common/RouterRedirect').default,
                exact: true,
              },
              {
                path: '/school/org/org',
                name: 'org',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__School__models__archivist.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/archivist.js').then(
                          m => {
                            return { namespace: 'archivist', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__School__models__collaborate.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/collaborate.js').then(
                          m => {
                            return { namespace: 'collaborate', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__School__models__goal.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/goal.js').then(
                          m => {
                            return { namespace: 'goal', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__School__models__Introducer.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/Introducer.js').then(
                          m => {
                            return { namespace: 'Introducer', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__School__models__position.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/position.js').then(
                          m => {
                            return { namespace: 'position', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__School__models__vacation.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/vacation.js').then(
                          m => {
                            return { namespace: 'vacation', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__School__Org__Index" */ '../School/Org/Org'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../School/Org/Org').default,
                privs: ['orgnize_manage'],
                exact: true,
              },
              {
                path: '/school/org/position',
                name: 'position',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__School__models__archivist.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/archivist.js').then(
                          m => {
                            return { namespace: 'archivist', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__School__models__collaborate.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/collaborate.js').then(
                          m => {
                            return { namespace: 'collaborate', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__School__models__goal.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/goal.js').then(
                          m => {
                            return { namespace: 'goal', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__School__models__Introducer.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/Introducer.js').then(
                          m => {
                            return { namespace: 'Introducer', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__School__models__position.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/position.js').then(
                          m => {
                            return { namespace: 'position', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__School__models__vacation.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/vacation.js').then(
                          m => {
                            return { namespace: 'vacation', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__School__Org__Index" */ '../School/Org/Position'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../School/Org/Position').default,
                privs: ['position_manage'],
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/school/vacation',
            name: 'vacation',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__School__models__archivist.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/archivist.js').then(
                      m => {
                        return { namespace: 'archivist', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__collaborate.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/collaborate.js').then(
                      m => {
                        return { namespace: 'collaborate', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__goal.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/goal.js').then(
                      m => {
                        return { namespace: 'goal', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__Introducer.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/Introducer.js').then(
                      m => {
                        return { namespace: 'Introducer', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__position.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/position.js').then(
                      m => {
                        return { namespace: 'position', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__vacation.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/vacation.js').then(
                      m => {
                        return { namespace: 'vacation', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__School__Vacation" */ '../School/Vacation'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../School/Vacation').default,
            privs: ['vacation_manage'],
            exact: true,
          },
          {
            path: '/school/archivist',
            name: 'archivist',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__School__models__archivist.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/archivist.js').then(
                      m => {
                        return { namespace: 'archivist', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__collaborate.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/collaborate.js').then(
                      m => {
                        return { namespace: 'collaborate', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__goal.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/goal.js').then(
                      m => {
                        return { namespace: 'goal', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__Introducer.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/Introducer.js').then(
                      m => {
                        return { namespace: 'Introducer', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__position.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/position.js').then(
                      m => {
                        return { namespace: 'position', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__vacation.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/vacation.js').then(
                      m => {
                        return { namespace: 'vacation', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__School__Archivist__Archivist" */ '../School/Archivist/Archivist'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../School/Archivist/Archivist').default,
            privs: ['archivist_receiver'],
            exact: true,
          },
          {
            path: '/school/collaborate',
            name: 'collaborate',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__School__models__archivist.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/archivist.js').then(
                      m => {
                        return { namespace: 'archivist', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__collaborate.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/collaborate.js').then(
                      m => {
                        return { namespace: 'collaborate', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__goal.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/goal.js').then(
                      m => {
                        return { namespace: 'goal', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__Introducer.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/Introducer.js').then(
                      m => {
                        return { namespace: 'Introducer', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__position.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/position.js').then(
                      m => {
                        return { namespace: 'position', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__vacation.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/vacation.js').then(
                      m => {
                        return { namespace: 'vacation', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__School__Collaborate__Collaborate" */ '../School/Collaborate/Collaborate'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../School/Collaborate/Collaborate').default,
            privs: ['cooperationunit_manage'],
            exact: true,
          },
          {
            path: '/school/introducer',
            name: 'introducer',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__School__models__archivist.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/archivist.js').then(
                      m => {
                        return { namespace: 'archivist', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__collaborate.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/collaborate.js').then(
                      m => {
                        return { namespace: 'collaborate', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__goal.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/goal.js').then(
                      m => {
                        return { namespace: 'goal', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__Introducer.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/Introducer.js').then(
                      m => {
                        return { namespace: 'Introducer', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__position.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/position.js').then(
                      m => {
                        return { namespace: 'position', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__vacation.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/vacation.js').then(
                      m => {
                        return { namespace: 'vacation', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__School__Introducer__Introducer" */ '../School/Introducer/Introducer'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../School/Introducer/Introducer').default,
            privs: ['outside_school_introducer'],
            exact: true,
          },
          {
            path: '/school/goal',
            name: 'goal',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__School__models__archivist.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/archivist.js').then(
                      m => {
                        return { namespace: 'archivist', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__collaborate.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/collaborate.js').then(
                      m => {
                        return { namespace: 'collaborate', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__goal.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/goal.js').then(
                      m => {
                        return { namespace: 'goal', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__Introducer.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/Introducer.js').then(
                      m => {
                        return { namespace: 'Introducer', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__position.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/position.js').then(
                      m => {
                        return { namespace: 'position', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__School__models__vacation.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/School/models/vacation.js').then(
                      m => {
                        return { namespace: 'vacation', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__School__Goal__Goal" */ '../School/Goal/Goal'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../School/Goal/Goal').default,
            privs: ['salesgoal_manage'],
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/asset',
        name: 'asset',
        icon: 'account-book',
        privs: ['asset_manage'],
        routes: [
          {
            path: '/asset/car',
            name: 'car',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Asset__models__assetCarTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Asset/models/assetCarTable.js').then(
                      m => {
                        return { namespace: 'assetCarTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Asset__models__assetSiteTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Asset/models/assetSiteTable.js').then(
                      m => {
                        return { namespace: 'assetSiteTable', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Asset__Car__index" */ '../Asset/Car/index'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../Asset/Car/index').default,
            privs: ['car_manage'],
            exact: true,
          },
          {
            path: '/asset/site',
            name: 'site',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Asset__models__assetCarTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Asset/models/assetCarTable.js').then(
                      m => {
                        return { namespace: 'assetCarTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Asset__models__assetSiteTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Asset/models/assetSiteTable.js').then(
                      m => {
                        return { namespace: 'assetSiteTable', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Asset__Site__index" */ '../Asset/Site/index'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../Asset/Site/index').default,
            privs: ['site_manage'],
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/finance',
        name: 'finance',
        icon: 'dollar',
        privs: ['finance_manage'],
        routes: [
          {
            path: '/finance/charge',
            name: 'charge',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                      m => {
                        return { namespace: 'charge', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeAddProxyFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeChangeClassTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeClassFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeMakeUpTuitionTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                      m => {
                        return { namespace: 'chargeSignUpTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeSupplementaryFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureIncomeTaxTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureMainBusinessTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureManagementFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureOtherBusinessTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureOtherCapitalTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                      m => {
                        return { namespace: 'income', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeAddProxyFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeChangeClassTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeClassFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeMakeUpTuitionTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeMoneyFundsTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeOtherRevenueTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                      m => {
                        return { namespace: 'incomeSignUp', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                      m => {
                        return { namespace: 'incomeSignUpTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeSupplementaryFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                      m => {
                        return { namespace: 'makeUpTuition', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                      m => {
                        return { namespace: 'refundAwaitTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                      m => {
                        return { namespace: 'refundDoneTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                      m => {
                        return { namespace: 'selectStudentList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                      m => {
                        return { namespace: 'signUp', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                      m => {
                        return { namespace: 'supplementaryFee', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                      m => {
                        return {
                          namespace: 'wagePerformanceDataReportTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                      m => {
                        return {
                          namespace: 'wageRegistrationMonthTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                      m => {
                        return {
                          namespace: 'wageRegistrationTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                      m => {
                        return {
                          namespace: 'wageRegistrationYearTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                      m => {
                        return { namespace: 'wageUpload', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Finance__Charge__ChargeIndex" */ '../Finance/Charge/ChargeIndex'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../Finance/Charge/ChargeIndex').default,
            hideChildrenInMenu: true,
            privs: ['wait_pay_manage'],
            routes: [
              {
                path: '/finance/charge',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Charge__ChargeIndex" */ '../Common/RouterRedirect'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Common/RouterRedirect').default,
                exact: true,
              },
              {
                path: '/finance/charge/sign-up',
                name: 'finance-charge-sign-up',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Charge__ChargeIndex" */ '../Finance/Charge/SignUp'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Charge/SignUp').default,
                privs: ['apply_pay'],
                exact: true,
              },
              {
                path: '/finance/charge/make-up-tuition',
                name: 'finance-charge-make-up-tuition',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Charge__ChargeIndex" */ '../Finance/Charge/MakeUpTuition'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Charge/MakeUpTuition').default,
                privs: ['after_pay_tuition_manage'],
                exact: true,
              },
              {
                path: '/finance/charge/change-class',
                name: 'finance-charge-change-class',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Charge__ChargeIndex" */ '../Finance/Charge/ChangeClass'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Charge/ChangeClass').default,
                privs: ['pay_change_classpattern'],
                exact: true,
              },
              {
                path: '/finance/charge/supplementary-fee',
                name: 'finance-charge-supplementary-fee',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Charge__ChargeIndex" */ '../Finance/Charge/SupplementaryFee'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Charge/SupplementaryFee').default,
                privs: ['wait_after_pay_exam'],
                exact: true,
              },
              {
                path: '/finance/charge/class-fee',
                name: 'finance-charge-class-fee',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Charge__ChargeIndex" */ '../Finance/Charge/ClassFee'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Charge/ClassFee').default,
                privs: ['buy_lesson'],
                exact: true,
              },
              {
                path: '/finance/charge/add-proxy-fee',
                name: 'finance-charge-add-proxy-fee',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Charge__ChargeIndex" */ '../Finance/Charge/AddProxyFee'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Charge/AddProxyFee').default,
                privs: ['pay_proxy_lesson'],
                exact: true,
              },
              {
                path: '/finance/charge/other-cost',
                name: 'finance-charge-other-cost',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Charge__ChargeIndex" */ '../Finance/Charge/OtherCost'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Charge/OtherCost').default,
                privs: ['other_bus_fee_wait_pay_manage'],
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/finance/income',
            name: 'income',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                      m => {
                        return { namespace: 'charge', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeAddProxyFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeChangeClassTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeClassFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeMakeUpTuitionTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                      m => {
                        return { namespace: 'chargeSignUpTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeSupplementaryFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureIncomeTaxTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureMainBusinessTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureManagementFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureOtherBusinessTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureOtherCapitalTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                      m => {
                        return { namespace: 'income', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeAddProxyFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeChangeClassTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeClassFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeMakeUpTuitionTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeMoneyFundsTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeOtherRevenueTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                      m => {
                        return { namespace: 'incomeSignUp', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                      m => {
                        return { namespace: 'incomeSignUpTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeSupplementaryFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                      m => {
                        return { namespace: 'makeUpTuition', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                      m => {
                        return { namespace: 'refundAwaitTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                      m => {
                        return { namespace: 'refundDoneTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                      m => {
                        return { namespace: 'selectStudentList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                      m => {
                        return { namespace: 'signUp', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                      m => {
                        return { namespace: 'supplementaryFee', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                      m => {
                        return {
                          namespace: 'wagePerformanceDataReportTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                      m => {
                        return {
                          namespace: 'wageRegistrationMonthTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                      m => {
                        return {
                          namespace: 'wageRegistrationTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                      m => {
                        return {
                          namespace: 'wageRegistrationYearTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                      m => {
                        return { namespace: 'wageUpload', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Finance__Income__IncomeIndex" */ '../Finance/Income/IncomeIndex'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../Finance/Income/IncomeIndex').default,
            hideChildrenInMenu: true,
            privs: ['charge_manage'],
            routes: [
              {
                path: '/finance/income',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Income__IncomeIndex" */ '../Common/RouterRedirect'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Common/RouterRedirect').default,
                exact: true,
              },
              {
                path: '/finance/income/sign-up',
                name: 'finance-income-sign-up',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Income__IncomeIndex" */ '../Finance/Income/SignUp'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Income/SignUp').default,
                privs: ['apply_charge'],
                exact: true,
              },
              {
                path: '/finance/income/make-up-tuition',
                name: 'finance-income-make-up-tuition',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Income__IncomeIndex" */ '../Finance/Income/MakeUpTuition'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Income/MakeUpTuition').default,
                privs: ['after_apply_charge'],
                exact: true,
              },
              {
                path: '/finance/income/change-class',
                name: 'finance-income-change-class',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Income__IncomeIndex" */ '../Finance/Income/ChangeClass'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Income/ChangeClass').default,
                privs: ['apply_charge_change_classpattern'],
                exact: true,
              },
              {
                path: '/finance/income/supplementary-fee',
                name: 'finance-income-supplementary-fee',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Income__IncomeIndex" */ '../Finance/Income/SupplementaryFee'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Income/SupplementaryFee').default,
                privs: ['charge_after_pay_exam'],
                exact: true,
              },
              {
                path: '/finance/income/class-fee',
                name: 'finance-income-class-fee',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Income__IncomeIndex" */ '../Finance/Income/ClassFee'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Income/ClassFee').default,
                privs: ['charge_lesson'],
                exact: true,
              },
              {
                path: '/finance/income/add-proxy-fee',
                name: 'finance-income-add-proxy-fee',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Income__IncomeIndex" */ '../Finance/Income/AddProxyFee'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Income/AddProxyFee').default,
                privs: ['add_proxy_km_fee'],
                exact: true,
              },
              {
                path: '/finance/income/other-revenue',
                name: 'finance-income-other-revenue',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Income__IncomeIndex" */ '../Finance/Income/OtherRevenue'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Income/OtherRevenue').default,
                privs: ['other_charge'],
                exact: true,
              },
              {
                path: '/finance/income/other-cost',
                name: 'finance-income-other-cost',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Income__IncomeIndex" */ '../Finance/Income/OtherCost'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Income/OtherCost').default,
                privs: ['other_bus_fee_charge_manage'],
                exact: true,
              },
              {
                path: '/finance/income/money-funds',
                name: 'finance-income-money-funds',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Income__IncomeIndex" */ '../Finance/Income/MoneyFunds'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Income/MoneyFunds').default,
                privs: ['currency_fund'],
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/finance/expenditure',
            name: 'expenditure',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                      m => {
                        return { namespace: 'charge', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeAddProxyFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeChangeClassTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeClassFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeMakeUpTuitionTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                      m => {
                        return { namespace: 'chargeSignUpTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeSupplementaryFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureIncomeTaxTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureMainBusinessTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureManagementFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureOtherBusinessTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureOtherCapitalTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                      m => {
                        return { namespace: 'income', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeAddProxyFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeChangeClassTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeClassFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeMakeUpTuitionTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeMoneyFundsTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeOtherRevenueTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                      m => {
                        return { namespace: 'incomeSignUp', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                      m => {
                        return { namespace: 'incomeSignUpTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeSupplementaryFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                      m => {
                        return { namespace: 'makeUpTuition', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                      m => {
                        return { namespace: 'refundAwaitTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                      m => {
                        return { namespace: 'refundDoneTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                      m => {
                        return { namespace: 'selectStudentList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                      m => {
                        return { namespace: 'signUp', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                      m => {
                        return { namespace: 'supplementaryFee', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                      m => {
                        return {
                          namespace: 'wagePerformanceDataReportTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                      m => {
                        return {
                          namespace: 'wageRegistrationMonthTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                      m => {
                        return {
                          namespace: 'wageRegistrationTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                      m => {
                        return {
                          namespace: 'wageRegistrationYearTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                      m => {
                        return { namespace: 'wageUpload', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Finance__Expenditure__ExpenditureIndex" */ '../Finance/Expenditure/ExpenditureIndex'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../Finance/Expenditure/ExpenditureIndex').default,
            hideChildrenInMenu: true,
            privs: ['expend_manage'],
            routes: [
              {
                path: '/finance/expenditure',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Expenditure__ExpenditureIndex" */ '../Common/RouterRedirect'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Common/RouterRedirect').default,
                exact: true,
              },
              {
                path: '/finance/expenditure/main-business',
                name: 'finance-expenditure-main-business',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Expenditure__ExpenditureIndex" */ '../Finance/Expenditure/MainBusiness'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Expenditure/MainBusiness').default,
                privs: ['bussiness_expend'],
                exact: true,
              },
              {
                path: '/finance/expenditure/management-fee',
                name: 'finance-expenditure-management-fee',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Expenditure__ExpenditureIndex" */ '../Finance/Expenditure/ManagementFee'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Expenditure/ManagementFee').default,
                privs: ['management_fee'],
                exact: true,
              },
              {
                path: '/finance/expenditure/other-business',
                name: 'finance-expenditure-other-business',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Expenditure__ExpenditureIndex" */ '../Finance/Expenditure/OtherBusiness'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Expenditure/OtherBusiness').default,
                privs: ['other_bussiness_expend'],
                exact: true,
              },
              {
                path: '/finance/expenditure/capital',
                name: 'finance-expenditure-capital',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Expenditure__ExpenditureIndex" */ '../Finance/Expenditure/Capital'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Expenditure/Capital').default,
                privs: ['fund_expend'],
                exact: true,
              },
              {
                path: '/finance/expenditure/income-tax',
                name: 'finance-expenditure-income-tax',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Expenditure__ExpenditureIndex" */ '../Finance/Expenditure/IncomeTax'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Expenditure/IncomeTax').default,
                privs: ['tax_manage'],
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/finance/refund',
            name: 'refund',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                      m => {
                        return { namespace: 'charge', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeAddProxyFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeChangeClassTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeClassFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeMakeUpTuitionTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                      m => {
                        return { namespace: 'chargeSignUpTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeSupplementaryFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureIncomeTaxTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureMainBusinessTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureManagementFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureOtherBusinessTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureOtherCapitalTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                      m => {
                        return { namespace: 'income', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeAddProxyFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeChangeClassTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeClassFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeMakeUpTuitionTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeMoneyFundsTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeOtherRevenueTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                      m => {
                        return { namespace: 'incomeSignUp', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                      m => {
                        return { namespace: 'incomeSignUpTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeSupplementaryFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                      m => {
                        return { namespace: 'makeUpTuition', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                      m => {
                        return { namespace: 'refundAwaitTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                      m => {
                        return { namespace: 'refundDoneTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                      m => {
                        return { namespace: 'selectStudentList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                      m => {
                        return { namespace: 'signUp', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                      m => {
                        return { namespace: 'supplementaryFee', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                      m => {
                        return {
                          namespace: 'wagePerformanceDataReportTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                      m => {
                        return {
                          namespace: 'wageRegistrationMonthTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                      m => {
                        return {
                          namespace: 'wageRegistrationTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                      m => {
                        return {
                          namespace: 'wageRegistrationYearTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                      m => {
                        return { namespace: 'wageUpload', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Finance__Refund__RefundIndex" */ '../Finance/Refund/RefundIndex'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../Finance/Refund/RefundIndex').default,
            hideChildrenInMenu: true,
            privs: ['return_fee_manage'],
            routes: [
              {
                path: '/finance/refund',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Refund__RefundIndex" */ '../Common/RouterRedirect'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Common/RouterRedirect').default,
                exact: true,
              },
              {
                path: '/finance/refund/await',
                name: 'finance-refund-await',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Refund__RefundIndex" */ '../Finance/Refund/Await'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Refund/Await').default,
                privs: ['wait_return_fee'],
                exact: true,
              },
              {
                path: '/finance/refund/done',
                name: 'finance-refund-done',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Refund__RefundIndex" */ '../Finance/Refund/Done'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Refund/Done').default,
                privs: ['wait_return_fee_complete'],
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/finance/wage',
            name: 'wage',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                      m => {
                        return { namespace: 'charge', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeAddProxyFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeChangeClassTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeClassFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeMakeUpTuitionTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                      m => {
                        return { namespace: 'chargeSignUpTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'chargeSupplementaryFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureIncomeTaxTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureMainBusinessTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureManagementFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureOtherBusinessTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                      m => {
                        return {
                          namespace: 'expenditureOtherCapitalTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                      m => {
                        return { namespace: 'income', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeAddProxyFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeChangeClassTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeClassFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeMakeUpTuitionTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeMoneyFundsTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeOtherRevenueTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                      m => {
                        return { namespace: 'incomeSignUp', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                      m => {
                        return { namespace: 'incomeSignUpTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                      m => {
                        return {
                          namespace: 'incomeSupplementaryFeeTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                      m => {
                        return { namespace: 'makeUpTuition', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                      m => {
                        return { namespace: 'refundAwaitTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                      m => {
                        return { namespace: 'refundDoneTable', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                      m => {
                        return { namespace: 'selectStudentList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                      m => {
                        return { namespace: 'signUp', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                      m => {
                        return { namespace: 'supplementaryFee', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                      m => {
                        return {
                          namespace: 'wagePerformanceDataReportTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                      m => {
                        return {
                          namespace: 'wageRegistrationMonthTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                      m => {
                        return {
                          namespace: 'wageRegistrationTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                      m => {
                        return {
                          namespace: 'wageRegistrationYearTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                      m => {
                        return { namespace: 'wageUpload', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Finance__Wage__WageIndex" */ '../Finance/Wage/WageIndex'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../Finance/Wage/WageIndex').default,
            hideChildrenInMenu: true,
            privs: ['salary_manage'],
            routes: [
              {
                path: '/finance/wage',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Wage__WageIndex" */ '../Common/RouterRedirect'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Common/RouterRedirect').default,
                exact: true,
              },
              {
                path: '/finance/wage/performance-data-report',
                name: 'finance-wage-performance-data-report',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Wage__WageIndex" */ '../Finance/Wage/PerformanceDataReport'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Wage/PerformanceDataReport').default,
                privs: ['performance_data_report'],
                exact: true,
              },
              {
                path: '/finance/wage/wage-registration',
                name: 'finance-wage-wage-registration',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Finance__models__charge.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/charge.js').then(
                          m => {
                            return { namespace: 'charge', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__chargeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/chargeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'chargeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureIncomeTaxTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureIncomeTaxTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureIncomeTaxTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureMainBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureMainBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureMainBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureManagementFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureManagementFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureManagementFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherBusinessTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherBusinessTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherBusinessTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__expenditureOtherCapitalTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/expenditureOtherCapitalTable.js').then(
                          m => {
                            return {
                              namespace: 'expenditureOtherCapitalTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__income.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/income.js').then(
                          m => {
                            return { namespace: 'income', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeAddProxyFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeAddProxyFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeAddProxyFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeChangeClassTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeChangeClassTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeChangeClassTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeClassFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeClassFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeClassFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMakeUpTuitionTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMakeUpTuitionTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMakeUpTuitionTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeMoneyFundsTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeMoneyFundsTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeMoneyFundsTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeOtherRevenueTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeOtherRevenueTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeOtherRevenueTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUp.js').then(
                          m => {
                            return { namespace: 'incomeSignUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSignUpTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSignUpTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSignUpTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__incomeSupplementaryFeeTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/incomeSupplementaryFeeTable.js').then(
                          m => {
                            return {
                              namespace: 'incomeSupplementaryFeeTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__makeUpTuition.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/makeUpTuition.js').then(
                          m => {
                            return { namespace: 'makeUpTuition', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'refundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__refundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/refundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'refundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__selectStudentList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/selectStudentList.js').then(
                          m => {
                            return {
                              namespace: 'selectStudentList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__signUp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/signUp.js').then(
                          m => {
                            return { namespace: 'signUp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__supplementaryFee.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/supplementaryFee.js').then(
                          m => {
                            return {
                              namespace: 'supplementaryFee',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wagePerformanceDataReportTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wagePerformanceDataReportTable.js').then(
                          m => {
                            return {
                              namespace: 'wagePerformanceDataReportTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationMonthTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationMonthTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationMonthTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageRegistrationYearTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageRegistrationYearTable.js').then(
                          m => {
                            return {
                              namespace: 'wageRegistrationYearTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Finance__models__wageUpload.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Finance/models/wageUpload.js').then(
                          m => {
                            return { namespace: 'wageUpload', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Finance__Wage__WageIndex" */ '../Finance/Wage/WageRegistration'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Finance/Wage/WageRegistration').default,
                privs: ['salary_check'],
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            component: () =>
              React.createElement(
                require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/review',
        name: 'review',
        icon: 'carry-out',
        privs: ['examine_manage'],
        routes: [
          {
            path: '/review/refund',
            name: 'refund',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__Review__models__reviewRefundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Review/models/reviewRefundAwaitTable.js').then(
                      m => {
                        return {
                          namespace: 'reviewRefundAwaitTable',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__Review__models__reviewRefundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Review/models/reviewRefundDoneTable.js').then(
                      m => {
                        return {
                          namespace: 'reviewRefundDoneTable',
                          ...m.default,
                        };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__Review__Refund__ReviewIndex" */ '../Review/Refund/ReviewIndex'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../Review/Refund/ReviewIndex').default,
            hideChildrenInMenu: true,
            privs: ['return_fee_examine'],
            routes: [
              {
                path: '/review/refund',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__Review__Refund__ReviewIndex" */ '../Common/RouterRedirect'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Common/RouterRedirect').default,
                exact: true,
              },
              {
                path: '/review/refund/await',
                name: 'review-refund-await',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Review__models__reviewRefundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Review/models/reviewRefundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'reviewRefundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Review__models__reviewRefundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Review/models/reviewRefundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'reviewRefundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Review__Refund__ReviewIndex" */ '../Review/Refund/Await'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Review/Refund/Await').default,
                privs: ['wait_examine'],
                exact: true,
              },
              {
                path: '/review/refund/done',
                name: 'review-refund-done',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__Review__models__reviewRefundAwaitTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Review/models/reviewRefundAwaitTable.js').then(
                          m => {
                            return {
                              namespace: 'reviewRefundAwaitTable',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__Review__models__reviewRefundDoneTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/Review/models/reviewRefundDoneTable.js').then(
                          m => {
                            return {
                              namespace: 'reviewRefundDoneTable',
                              ...m.default,
                            };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__Review__Refund__ReviewIndex" */ '../Review/Refund/Done'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Review/Refund/Done').default,
                privs: ['return_fee_complete'],
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            component: () =>
              React.createElement(
                require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/data-statistics',
        name: 'data-statistics',
        icon: 'bar-chart',
        privs: ['data_report'],
        routes: [
          {
            path: '/data-statistics/sign-up',
            name: 'sign-up',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__DataStatistics__models__dataStatistics.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/dataStatistics.js').then(
                      m => {
                        return { namespace: 'dataStatistics', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__financeList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/financeList.js').then(
                      m => {
                        return { namespace: 'financeList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassClass.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassClass.js').then(
                      m => {
                        return { namespace: 'reserveClassClass', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassCoach.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassCoach.js').then(
                      m => {
                        return { namespace: 'reserveClassCoach', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassDepartment.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassDepartment.js').then(
                      m => {
                        return {
                          namespace: 'reserveClassDepartment',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassLicenseType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassLicenseType.js').then(
                      m => {
                        return {
                          namespace: 'reserveClassLicenseType',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassSite.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassSite.js').then(
                      m => {
                        return { namespace: 'reserveClassSite', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassStudentType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassStudentType.js').then(
                      m => {
                        return {
                          namespace: 'reserveClassStudentType',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassTime.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassTime.js').then(
                      m => {
                        return { namespace: 'reserveClassTime', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreClass.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreClass.js').then(
                      m => {
                        return { namespace: 'scoreClass', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreCoach.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreCoach.js').then(
                      m => {
                        return { namespace: 'scoreCoach', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreDepartment.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreDepartment.js').then(
                      m => {
                        return { namespace: 'scoreDepartment', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreLicenseType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreLicenseType.js').then(
                      m => {
                        return { namespace: 'scoreLicenseType', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreSection.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreSection.js').then(
                      m => {
                        return { namespace: 'scoreSection', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreSite.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreSite.js').then(
                      m => {
                        return { namespace: 'scoreSite', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreStudentType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreStudentType.js').then(
                      m => {
                        return { namespace: 'scoreStudentType', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__signUpClass.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/signUpClass.js').then(
                      m => {
                        return { namespace: 'signUpClass', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__signUpDepartment.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/signUpDepartment.js').then(
                      m => {
                        return { namespace: 'signUpDepartment', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__signUpIntroducer.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/signUpIntroducer.js').then(
                      m => {
                        return { namespace: 'signUpIntroducer', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__signUpLicenseType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/signUpLicenseType.js').then(
                      m => {
                        return { namespace: 'signUpLicenseType', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__signUpStudentType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/signUpStudentType.js').then(
                      m => {
                        return { namespace: 'signUpStudentType', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__DataStatistics__Signup__Signup" */ '../DataStatistics/Signup/Signup'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../DataStatistics/Signup/Signup').default,
            privs: ['apply_report'],
            exact: true,
          },
          {
            path: '/data-statistics/reserve-class',
            name: 'reserve-class',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__DataStatistics__models__dataStatistics.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/dataStatistics.js').then(
                      m => {
                        return { namespace: 'dataStatistics', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__financeList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/financeList.js').then(
                      m => {
                        return { namespace: 'financeList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassClass.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassClass.js').then(
                      m => {
                        return { namespace: 'reserveClassClass', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassCoach.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassCoach.js').then(
                      m => {
                        return { namespace: 'reserveClassCoach', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassDepartment.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassDepartment.js').then(
                      m => {
                        return {
                          namespace: 'reserveClassDepartment',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassLicenseType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassLicenseType.js').then(
                      m => {
                        return {
                          namespace: 'reserveClassLicenseType',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassSite.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassSite.js').then(
                      m => {
                        return { namespace: 'reserveClassSite', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassStudentType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassStudentType.js').then(
                      m => {
                        return {
                          namespace: 'reserveClassStudentType',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassTime.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassTime.js').then(
                      m => {
                        return { namespace: 'reserveClassTime', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreClass.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreClass.js').then(
                      m => {
                        return { namespace: 'scoreClass', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreCoach.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreCoach.js').then(
                      m => {
                        return { namespace: 'scoreCoach', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreDepartment.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreDepartment.js').then(
                      m => {
                        return { namespace: 'scoreDepartment', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreLicenseType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreLicenseType.js').then(
                      m => {
                        return { namespace: 'scoreLicenseType', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreSection.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreSection.js').then(
                      m => {
                        return { namespace: 'scoreSection', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreSite.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreSite.js').then(
                      m => {
                        return { namespace: 'scoreSite', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreStudentType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreStudentType.js').then(
                      m => {
                        return { namespace: 'scoreStudentType', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__signUpClass.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/signUpClass.js').then(
                      m => {
                        return { namespace: 'signUpClass', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__signUpDepartment.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/signUpDepartment.js').then(
                      m => {
                        return { namespace: 'signUpDepartment', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__signUpIntroducer.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/signUpIntroducer.js').then(
                      m => {
                        return { namespace: 'signUpIntroducer', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__signUpLicenseType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/signUpLicenseType.js').then(
                      m => {
                        return { namespace: 'signUpLicenseType', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__signUpStudentType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/signUpStudentType.js').then(
                      m => {
                        return { namespace: 'signUpStudentType', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__DataStatistics__ReserveClass__ReserveClass" */ '../DataStatistics/ReserveClass/ReserveClass'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../DataStatistics/ReserveClass/ReserveClass').default,
            privs: ['course_record_report'],
            exact: true,
          },
          {
            path: '/data-statistics/score',
            name: 'score',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__DataStatistics__models__dataStatistics.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/dataStatistics.js').then(
                      m => {
                        return { namespace: 'dataStatistics', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__financeList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/financeList.js').then(
                      m => {
                        return { namespace: 'financeList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassClass.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassClass.js').then(
                      m => {
                        return { namespace: 'reserveClassClass', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassCoach.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassCoach.js').then(
                      m => {
                        return { namespace: 'reserveClassCoach', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassDepartment.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassDepartment.js').then(
                      m => {
                        return {
                          namespace: 'reserveClassDepartment',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassLicenseType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassLicenseType.js').then(
                      m => {
                        return {
                          namespace: 'reserveClassLicenseType',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassSite.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassSite.js').then(
                      m => {
                        return { namespace: 'reserveClassSite', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassStudentType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassStudentType.js').then(
                      m => {
                        return {
                          namespace: 'reserveClassStudentType',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassTime.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassTime.js').then(
                      m => {
                        return { namespace: 'reserveClassTime', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreClass.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreClass.js').then(
                      m => {
                        return { namespace: 'scoreClass', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreCoach.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreCoach.js').then(
                      m => {
                        return { namespace: 'scoreCoach', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreDepartment.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreDepartment.js').then(
                      m => {
                        return { namespace: 'scoreDepartment', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreLicenseType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreLicenseType.js').then(
                      m => {
                        return { namespace: 'scoreLicenseType', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreSection.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreSection.js').then(
                      m => {
                        return { namespace: 'scoreSection', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreSite.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreSite.js').then(
                      m => {
                        return { namespace: 'scoreSite', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreStudentType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreStudentType.js').then(
                      m => {
                        return { namespace: 'scoreStudentType', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__signUpClass.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/signUpClass.js').then(
                      m => {
                        return { namespace: 'signUpClass', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__signUpDepartment.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/signUpDepartment.js').then(
                      m => {
                        return { namespace: 'signUpDepartment', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__signUpIntroducer.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/signUpIntroducer.js').then(
                      m => {
                        return { namespace: 'signUpIntroducer', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__signUpLicenseType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/signUpLicenseType.js').then(
                      m => {
                        return { namespace: 'signUpLicenseType', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__signUpStudentType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/signUpStudentType.js').then(
                      m => {
                        return { namespace: 'signUpStudentType', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__DataStatistics__Score__Score" */ '../DataStatistics/Score/Score'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../DataStatistics/Score/Score').default,
            privs: ['score_report'],
            exact: true,
          },
          {
            path: '/data-statistics/finance',
            name: 'finance',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__DataStatistics__models__dataStatistics.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/dataStatistics.js').then(
                      m => {
                        return { namespace: 'dataStatistics', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__financeList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/financeList.js').then(
                      m => {
                        return { namespace: 'financeList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassClass.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassClass.js').then(
                      m => {
                        return { namespace: 'reserveClassClass', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassCoach.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassCoach.js').then(
                      m => {
                        return { namespace: 'reserveClassCoach', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassDepartment.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassDepartment.js').then(
                      m => {
                        return {
                          namespace: 'reserveClassDepartment',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassLicenseType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassLicenseType.js').then(
                      m => {
                        return {
                          namespace: 'reserveClassLicenseType',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassSite.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassSite.js').then(
                      m => {
                        return { namespace: 'reserveClassSite', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassStudentType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassStudentType.js').then(
                      m => {
                        return {
                          namespace: 'reserveClassStudentType',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__reserveClassTime.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/reserveClassTime.js').then(
                      m => {
                        return { namespace: 'reserveClassTime', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreClass.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreClass.js').then(
                      m => {
                        return { namespace: 'scoreClass', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreCoach.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreCoach.js').then(
                      m => {
                        return { namespace: 'scoreCoach', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreDepartment.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreDepartment.js').then(
                      m => {
                        return { namespace: 'scoreDepartment', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreLicenseType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreLicenseType.js').then(
                      m => {
                        return { namespace: 'scoreLicenseType', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreSection.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreSection.js').then(
                      m => {
                        return { namespace: 'scoreSection', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreSite.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreSite.js').then(
                      m => {
                        return { namespace: 'scoreSite', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__scoreStudentType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/scoreStudentType.js').then(
                      m => {
                        return { namespace: 'scoreStudentType', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__signUpClass.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/signUpClass.js').then(
                      m => {
                        return { namespace: 'signUpClass', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__signUpDepartment.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/signUpDepartment.js').then(
                      m => {
                        return { namespace: 'signUpDepartment', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__signUpIntroducer.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/signUpIntroducer.js').then(
                      m => {
                        return { namespace: 'signUpIntroducer', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__signUpLicenseType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/signUpLicenseType.js').then(
                      m => {
                        return { namespace: 'signUpLicenseType', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__DataStatistics__models__signUpStudentType.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/DataStatistics/models/signUpStudentType.js').then(
                      m => {
                        return { namespace: 'signUpStudentType', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__DataStatistics__Finance__Finance" */ '../DataStatistics/Finance/Finance'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../DataStatistics/Finance/Finance').default,
            privs: ['finance_report'],
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/marketing-center',
        name: 'marketing-center',
        icon: 'share-alt',
        privs: ['business_center'],
        routes: [
          {
            path: '/marketing-center/activity',
            name: 'activity',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__MarketingCenter__models__assemble.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/assemble.js').then(
                      m => {
                        return { namespace: 'assemble', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__MarketingCenter__models__assembleGroup.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/assembleGroup.js').then(
                      m => {
                        return { namespace: 'assembleGroup', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__MarketingCenter__models__assembleStatistics.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/assembleStatistics.js').then(
                      m => {
                        return {
                          namespace: 'assembleStatistics',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__MarketingCenter__models__assembleView.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/assembleView.js').then(
                      m => {
                        return { namespace: 'assembleView', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__MarketingCenter__models__bargain.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/bargain.js').then(
                      m => {
                        return { namespace: 'bargain', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__MarketingCenter__models__bargainGroup.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/bargainGroup.js').then(
                      m => {
                        return { namespace: 'bargainGroup', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__MarketingCenter__models__bargainHelp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/bargainHelp.js').then(
                      m => {
                        return { namespace: 'bargainHelp', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__MarketingCenter__models__bargainStatistics.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/bargainStatistics.js').then(
                      m => {
                        return { namespace: 'bargainStatistics', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__MarketingCenter__models__bargainView.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/bargainView.js').then(
                      m => {
                        return { namespace: 'bargainView', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__MarketingCenter__models__luckDraw.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/luckDraw.js').then(
                      m => {
                        return { namespace: 'luckDraw', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__MarketingCenter__models__luckDrawGroup.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/luckDrawGroup.js').then(
                      m => {
                        return { namespace: 'luckDrawGroup', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__MarketingCenter__models__luckDrawStatistics.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/luckDrawStatistics.js').then(
                      m => {
                        return {
                          namespace: 'luckDrawStatistics',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__MarketingCenter__models__luckDrawView.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/luckDrawView.js').then(
                      m => {
                        return { namespace: 'luckDrawView', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__MarketingCenter__models__openLuckDetailList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/openLuckDetailList.js').then(
                      m => {
                        return {
                          namespace: 'openLuckDetailList',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__MarketingCenter__models__openLuckList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/openLuckList.js').then(
                      m => {
                        return { namespace: 'openLuckList', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__MarketingCenter__Activity__Index" */ '../MarketingCenter/Activity/Index'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../MarketingCenter/Activity/Index').default,
            privs: ['promotion_check'],
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/marketing-center/activity',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__MarketingCenter__Activity__Index" */ '../Common/RouterRedirect'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Common/RouterRedirect').default,
                exact: true,
              },
              {
                path: '/marketing-center/activity/assemble',
                name: 'assemble',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__MarketingCenter__models__assemble.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/assemble.js').then(
                          m => {
                            return { namespace: 'assemble', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__assembleGroup.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/assembleGroup.js').then(
                          m => {
                            return { namespace: 'assembleGroup', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__assembleStatistics.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/assembleStatistics.js').then(
                          m => {
                            return {
                              namespace: 'assembleStatistics',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__assembleView.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/assembleView.js').then(
                          m => {
                            return { namespace: 'assembleView', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__bargain.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/bargain.js').then(
                          m => {
                            return { namespace: 'bargain', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__bargainGroup.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/bargainGroup.js').then(
                          m => {
                            return { namespace: 'bargainGroup', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__bargainHelp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/bargainHelp.js').then(
                          m => {
                            return { namespace: 'bargainHelp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__bargainStatistics.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/bargainStatistics.js').then(
                          m => {
                            return {
                              namespace: 'bargainStatistics',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__bargainView.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/bargainView.js').then(
                          m => {
                            return { namespace: 'bargainView', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__luckDraw.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/luckDraw.js').then(
                          m => {
                            return { namespace: 'luckDraw', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__luckDrawGroup.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/luckDrawGroup.js').then(
                          m => {
                            return { namespace: 'luckDrawGroup', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__luckDrawStatistics.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/luckDrawStatistics.js').then(
                          m => {
                            return {
                              namespace: 'luckDrawStatistics',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__luckDrawView.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/luckDrawView.js').then(
                          m => {
                            return { namespace: 'luckDrawView', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__openLuckDetailList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/openLuckDetailList.js').then(
                          m => {
                            return {
                              namespace: 'openLuckDetailList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__openLuckList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/openLuckList.js').then(
                          m => {
                            return { namespace: 'openLuckList', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__MarketingCenter__Activity__Index" */ '../MarketingCenter/Activity/Assemble/Index'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../MarketingCenter/Activity/Assemble/Index')
                      .default,
                privs: ['group_buy'],
                exact: true,
              },
              {
                path: '/marketing-center/activity/bargain',
                name: 'bargain',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__MarketingCenter__models__assemble.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/assemble.js').then(
                          m => {
                            return { namespace: 'assemble', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__assembleGroup.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/assembleGroup.js').then(
                          m => {
                            return { namespace: 'assembleGroup', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__assembleStatistics.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/assembleStatistics.js').then(
                          m => {
                            return {
                              namespace: 'assembleStatistics',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__assembleView.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/assembleView.js').then(
                          m => {
                            return { namespace: 'assembleView', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__bargain.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/bargain.js').then(
                          m => {
                            return { namespace: 'bargain', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__bargainGroup.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/bargainGroup.js').then(
                          m => {
                            return { namespace: 'bargainGroup', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__bargainHelp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/bargainHelp.js').then(
                          m => {
                            return { namespace: 'bargainHelp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__bargainStatistics.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/bargainStatistics.js').then(
                          m => {
                            return {
                              namespace: 'bargainStatistics',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__bargainView.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/bargainView.js').then(
                          m => {
                            return { namespace: 'bargainView', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__luckDraw.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/luckDraw.js').then(
                          m => {
                            return { namespace: 'luckDraw', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__luckDrawGroup.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/luckDrawGroup.js').then(
                          m => {
                            return { namespace: 'luckDrawGroup', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__luckDrawStatistics.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/luckDrawStatistics.js').then(
                          m => {
                            return {
                              namespace: 'luckDrawStatistics',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__luckDrawView.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/luckDrawView.js').then(
                          m => {
                            return { namespace: 'luckDrawView', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__openLuckDetailList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/openLuckDetailList.js').then(
                          m => {
                            return {
                              namespace: 'openLuckDetailList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__openLuckList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/openLuckList.js').then(
                          m => {
                            return { namespace: 'openLuckList', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__MarketingCenter__Activity__Index" */ '../MarketingCenter/Activity/Bargain/Index'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../MarketingCenter/Activity/Bargain/Index')
                      .default,
                privs: ['bargain'],
                exact: true,
              },
              {
                path: '/marketing-center/activity/luckDraw',
                name: 'luckDraw',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__MarketingCenter__models__assemble.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/assemble.js').then(
                          m => {
                            return { namespace: 'assemble', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__assembleGroup.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/assembleGroup.js').then(
                          m => {
                            return { namespace: 'assembleGroup', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__assembleStatistics.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/assembleStatistics.js').then(
                          m => {
                            return {
                              namespace: 'assembleStatistics',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__assembleView.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/assembleView.js').then(
                          m => {
                            return { namespace: 'assembleView', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__bargain.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/bargain.js').then(
                          m => {
                            return { namespace: 'bargain', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__bargainGroup.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/bargainGroup.js').then(
                          m => {
                            return { namespace: 'bargainGroup', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__bargainHelp.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/bargainHelp.js').then(
                          m => {
                            return { namespace: 'bargainHelp', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__bargainStatistics.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/bargainStatistics.js').then(
                          m => {
                            return {
                              namespace: 'bargainStatistics',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__bargainView.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/bargainView.js').then(
                          m => {
                            return { namespace: 'bargainView', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__luckDraw.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/luckDraw.js').then(
                          m => {
                            return { namespace: 'luckDraw', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__luckDrawGroup.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/luckDrawGroup.js').then(
                          m => {
                            return { namespace: 'luckDrawGroup', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__luckDrawStatistics.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/luckDrawStatistics.js').then(
                          m => {
                            return {
                              namespace: 'luckDrawStatistics',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__luckDrawView.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/luckDrawView.js').then(
                          m => {
                            return { namespace: 'luckDrawView', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__openLuckDetailList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/openLuckDetailList.js').then(
                          m => {
                            return {
                              namespace: 'openLuckDetailList',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__MarketingCenter__models__openLuckList.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/MarketingCenter/models/openLuckList.js').then(
                          m => {
                            return { namespace: 'openLuckList', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__MarketingCenter__Activity__Index" */ '../MarketingCenter/Activity/LuckDraw/Index'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../MarketingCenter/Activity/LuckDraw/Index')
                      .default,
                privs: ['activity_prize'],
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            component: () =>
              React.createElement(
                require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/value-added-services',
        name: 'value-added-services',
        icon: 'rise',
        privs: ['valueadded_service_manage'],
        routes: [
          {
            path: '/value-added-services/value-added',
            name: 'value-added',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__ValueAddedService__models__valueAddedTable.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/ValueAddedService/models/valueAddedTable.js').then(
                      m => {
                        return { namespace: 'valueAddedTable', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__ValueAddedService__ValueAdded__Index" */ '../ValueAddedService/ValueAdded/Index'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../ValueAddedService/ValueAdded/Index').default,
            privs: ['valueadded_service'],
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/system',
        name: 'system',
        icon: 'setting',
        privs: ['system_setting'],
        routes: [
          {
            path: '/system/privilege',
            name: 'privilege',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__System__models__bookCourse_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_1.js').then(
                      m => {
                        return { namespace: 'bookCourse_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__bookCourse_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_2.js').then(
                      m => {
                        return { namespace: 'bookCourse_2', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__bookCourse_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_3.js').then(
                      m => {
                        return { namespace: 'bookCourse_3', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__cost_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/cost_1.js').then(
                      m => {
                        return { namespace: 'cost_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__cost_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/cost_2.js').then(
                      m => {
                        return { namespace: 'cost_2', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__funtionSettings.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/funtionSettings.js').then(
                      m => {
                        return { namespace: 'funtionSettings', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__initStudent.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/initStudent.js').then(
                      m => {
                        return { namespace: 'initStudent', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__license.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/license.js').then(
                      m => {
                        return { namespace: 'license', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__operationLog.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/operationLog.js').then(
                      m => {
                        return { namespace: 'operationLog', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__reason_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_1.js').then(
                      m => {
                        return { namespace: 'reason_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__reason_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_2.js').then(
                      m => {
                        return { namespace: 'reason_2', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__reason_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_3.js').then(
                      m => {
                        return { namespace: 'reason_3', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__role.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/role.js').then(
                      m => {
                        return { namespace: 'role', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__System__Privilege__Role" */ '../System/Privilege/Role'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../System/Privilege/Role').default,
            privs: ['privs_setting'],
            exact: true,
          },
          {
            path: '/system/operation-log',
            name: 'operation-log',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__System__models__bookCourse_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_1.js').then(
                      m => {
                        return { namespace: 'bookCourse_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__bookCourse_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_2.js').then(
                      m => {
                        return { namespace: 'bookCourse_2', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__bookCourse_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_3.js').then(
                      m => {
                        return { namespace: 'bookCourse_3', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__cost_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/cost_1.js').then(
                      m => {
                        return { namespace: 'cost_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__cost_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/cost_2.js').then(
                      m => {
                        return { namespace: 'cost_2', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__funtionSettings.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/funtionSettings.js').then(
                      m => {
                        return { namespace: 'funtionSettings', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__initStudent.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/initStudent.js').then(
                      m => {
                        return { namespace: 'initStudent', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__license.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/license.js').then(
                      m => {
                        return { namespace: 'license', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__operationLog.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/operationLog.js').then(
                      m => {
                        return { namespace: 'operationLog', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__reason_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_1.js').then(
                      m => {
                        return { namespace: 'reason_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__reason_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_2.js').then(
                      m => {
                        return { namespace: 'reason_2', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__reason_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_3.js').then(
                      m => {
                        return { namespace: 'reason_3', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__role.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/role.js').then(
                      m => {
                        return { namespace: 'role', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__System__OperationLog" */ '../System/OperationLog'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../System/OperationLog').default,
            privs: ['operation_log'],
            exact: true,
          },
          {
            path: '/system/config',
            name: 'config',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__System__models__bookCourse_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_1.js').then(
                      m => {
                        return { namespace: 'bookCourse_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__bookCourse_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_2.js').then(
                      m => {
                        return { namespace: 'bookCourse_2', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__bookCourse_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_3.js').then(
                      m => {
                        return { namespace: 'bookCourse_3', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__cost_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/cost_1.js').then(
                      m => {
                        return { namespace: 'cost_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__cost_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/cost_2.js').then(
                      m => {
                        return { namespace: 'cost_2', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__funtionSettings.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/funtionSettings.js').then(
                      m => {
                        return { namespace: 'funtionSettings', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__initStudent.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/initStudent.js').then(
                      m => {
                        return { namespace: 'initStudent', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__license.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/license.js').then(
                      m => {
                        return { namespace: 'license', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__operationLog.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/operationLog.js').then(
                      m => {
                        return { namespace: 'operationLog', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__reason_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_1.js').then(
                      m => {
                        return { namespace: 'reason_1', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__reason_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_2.js').then(
                      m => {
                        return { namespace: 'reason_2', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__reason_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_3.js').then(
                      m => {
                        return { namespace: 'reason_3', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__System__models__role.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/role.js').then(
                      m => {
                        return { namespace: 'role', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__System__Config__Index" */ '../System/Config/Index'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../System/Config/Index').default,
            hideChildrenInMenu: true,
            privs: ['base_config'],
            routes: [
              {
                path: '/system/config',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import(/* webpackChunkName: "p__System__Config__Index" */ '../Common/RouterRedirect'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Common/RouterRedirect').default,
                exact: true,
              },
              {
                path: '/system/config/license',
                name: 'license',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__System__models__bookCourse_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_1.js').then(
                          m => {
                            return { namespace: 'bookCourse_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__bookCourse_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_2.js').then(
                          m => {
                            return { namespace: 'bookCourse_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__bookCourse_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_3.js').then(
                          m => {
                            return { namespace: 'bookCourse_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__cost_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/cost_1.js').then(
                          m => {
                            return { namespace: 'cost_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__cost_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/cost_2.js').then(
                          m => {
                            return { namespace: 'cost_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__funtionSettings.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/funtionSettings.js').then(
                          m => {
                            return {
                              namespace: 'funtionSettings',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__initStudent.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/initStudent.js').then(
                          m => {
                            return { namespace: 'initStudent', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__license.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/license.js').then(
                          m => {
                            return { namespace: 'license', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__operationLog.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/operationLog.js').then(
                          m => {
                            return { namespace: 'operationLog', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__reason_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_1.js').then(
                          m => {
                            return { namespace: 'reason_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__reason_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_2.js').then(
                          m => {
                            return { namespace: 'reason_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__reason_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_3.js').then(
                          m => {
                            return { namespace: 'reason_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__role.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/role.js').then(
                          m => {
                            return { namespace: 'role', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__System__Config__Index" */ '../System/Config/License'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../System/Config/License').default,
                privs: ['licence_type'],
                exact: true,
              },
              {
                path: '/system/config/status',
                name: 'status',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__System__models__bookCourse_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_1.js').then(
                          m => {
                            return { namespace: 'bookCourse_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__bookCourse_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_2.js').then(
                          m => {
                            return { namespace: 'bookCourse_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__bookCourse_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_3.js').then(
                          m => {
                            return { namespace: 'bookCourse_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__cost_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/cost_1.js').then(
                          m => {
                            return { namespace: 'cost_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__cost_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/cost_2.js').then(
                          m => {
                            return { namespace: 'cost_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__funtionSettings.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/funtionSettings.js').then(
                          m => {
                            return {
                              namespace: 'funtionSettings',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__initStudent.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/initStudent.js').then(
                          m => {
                            return { namespace: 'initStudent', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__license.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/license.js').then(
                          m => {
                            return { namespace: 'license', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__operationLog.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/operationLog.js').then(
                          m => {
                            return { namespace: 'operationLog', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__reason_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_1.js').then(
                          m => {
                            return { namespace: 'reason_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__reason_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_2.js').then(
                          m => {
                            return { namespace: 'reason_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__reason_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_3.js').then(
                          m => {
                            return { namespace: 'reason_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__role.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/role.js').then(
                          m => {
                            return { namespace: 'role', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__System__Config__Index" */ '../System/Config/Status'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../System/Config/Status').default,
                privs: ['status_setting'],
                exact: true,
              },
              {
                path: '/system/config/bookCourse',
                name: 'bookCourse',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__System__models__bookCourse_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_1.js').then(
                          m => {
                            return { namespace: 'bookCourse_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__bookCourse_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_2.js').then(
                          m => {
                            return { namespace: 'bookCourse_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__bookCourse_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_3.js').then(
                          m => {
                            return { namespace: 'bookCourse_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__cost_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/cost_1.js').then(
                          m => {
                            return { namespace: 'cost_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__cost_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/cost_2.js').then(
                          m => {
                            return { namespace: 'cost_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__funtionSettings.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/funtionSettings.js').then(
                          m => {
                            return {
                              namespace: 'funtionSettings',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__initStudent.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/initStudent.js').then(
                          m => {
                            return { namespace: 'initStudent', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__license.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/license.js').then(
                          m => {
                            return { namespace: 'license', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__operationLog.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/operationLog.js').then(
                          m => {
                            return { namespace: 'operationLog', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__reason_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_1.js').then(
                          m => {
                            return { namespace: 'reason_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__reason_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_2.js').then(
                          m => {
                            return { namespace: 'reason_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__reason_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_3.js').then(
                          m => {
                            return { namespace: 'reason_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__role.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/role.js').then(
                          m => {
                            return { namespace: 'role', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__System__Config__Index" */ '../System/Config/BookCourse'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../System/Config/BookCourse').default,
                privs: ['order_class_rule'],
                exact: true,
              },
              {
                path: '/system/config/cost',
                name: 'cost',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__System__models__bookCourse_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_1.js').then(
                          m => {
                            return { namespace: 'bookCourse_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__bookCourse_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_2.js').then(
                          m => {
                            return { namespace: 'bookCourse_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__bookCourse_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_3.js').then(
                          m => {
                            return { namespace: 'bookCourse_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__cost_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/cost_1.js').then(
                          m => {
                            return { namespace: 'cost_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__cost_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/cost_2.js').then(
                          m => {
                            return { namespace: 'cost_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__funtionSettings.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/funtionSettings.js').then(
                          m => {
                            return {
                              namespace: 'funtionSettings',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__initStudent.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/initStudent.js').then(
                          m => {
                            return { namespace: 'initStudent', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__license.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/license.js').then(
                          m => {
                            return { namespace: 'license', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__operationLog.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/operationLog.js').then(
                          m => {
                            return { namespace: 'operationLog', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__reason_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_1.js').then(
                          m => {
                            return { namespace: 'reason_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__reason_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_2.js').then(
                          m => {
                            return { namespace: 'reason_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__reason_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_3.js').then(
                          m => {
                            return { namespace: 'reason_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__role.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/role.js').then(
                          m => {
                            return { namespace: 'role', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__System__Config__Index" */ '../System/Config/Cost'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../System/Config/Cost').default,
                privs: ['fee_setting'],
                exact: true,
              },
              {
                path: '/system/config/reason',
                name: 'reason',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__System__models__bookCourse_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_1.js').then(
                          m => {
                            return { namespace: 'bookCourse_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__bookCourse_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_2.js').then(
                          m => {
                            return { namespace: 'bookCourse_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__bookCourse_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_3.js').then(
                          m => {
                            return { namespace: 'bookCourse_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__cost_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/cost_1.js').then(
                          m => {
                            return { namespace: 'cost_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__cost_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/cost_2.js').then(
                          m => {
                            return { namespace: 'cost_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__funtionSettings.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/funtionSettings.js').then(
                          m => {
                            return {
                              namespace: 'funtionSettings',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__initStudent.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/initStudent.js').then(
                          m => {
                            return { namespace: 'initStudent', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__license.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/license.js').then(
                          m => {
                            return { namespace: 'license', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__operationLog.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/operationLog.js').then(
                          m => {
                            return { namespace: 'operationLog', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__reason_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_1.js').then(
                          m => {
                            return { namespace: 'reason_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__reason_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_2.js').then(
                          m => {
                            return { namespace: 'reason_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__reason_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_3.js').then(
                          m => {
                            return { namespace: 'reason_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__role.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/role.js').then(
                          m => {
                            return { namespace: 'role', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__System__Config__Index" */ '../System/Config/Reason'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../System/Config/Reason').default,
                privs: ['reason_setting'],
                exact: true,
              },
              {
                path: '/system/config/other',
                name: 'other',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__System__models__bookCourse_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_1.js').then(
                          m => {
                            return { namespace: 'bookCourse_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__bookCourse_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_2.js').then(
                          m => {
                            return { namespace: 'bookCourse_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__bookCourse_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_3.js').then(
                          m => {
                            return { namespace: 'bookCourse_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__cost_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/cost_1.js').then(
                          m => {
                            return { namespace: 'cost_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__cost_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/cost_2.js').then(
                          m => {
                            return { namespace: 'cost_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__funtionSettings.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/funtionSettings.js').then(
                          m => {
                            return {
                              namespace: 'funtionSettings',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__initStudent.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/initStudent.js').then(
                          m => {
                            return { namespace: 'initStudent', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__license.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/license.js').then(
                          m => {
                            return { namespace: 'license', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__operationLog.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/operationLog.js').then(
                          m => {
                            return { namespace: 'operationLog', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__reason_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_1.js').then(
                          m => {
                            return { namespace: 'reason_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__reason_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_2.js').then(
                          m => {
                            return { namespace: 'reason_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__reason_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_3.js').then(
                          m => {
                            return { namespace: 'reason_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__role.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/role.js').then(
                          m => {
                            return { namespace: 'role', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__System__Config__Index" */ '../System/Config/Other'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../System/Config/Other').default,
                privs: ['other_setting'],
                exact: true,
              },
              {
                path: '/system/config/init-student',
                name: 'init-student',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__System__models__bookCourse_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_1.js').then(
                          m => {
                            return { namespace: 'bookCourse_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__bookCourse_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_2.js').then(
                          m => {
                            return { namespace: 'bookCourse_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__bookCourse_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/bookCourse_3.js').then(
                          m => {
                            return { namespace: 'bookCourse_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__cost_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/cost_1.js').then(
                          m => {
                            return { namespace: 'cost_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__cost_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/cost_2.js').then(
                          m => {
                            return { namespace: 'cost_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__funtionSettings.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/funtionSettings.js').then(
                          m => {
                            return {
                              namespace: 'funtionSettings',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__initStudent.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/initStudent.js').then(
                          m => {
                            return { namespace: 'initStudent', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__license.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/license.js').then(
                          m => {
                            return { namespace: 'license', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__operationLog.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/operationLog.js').then(
                          m => {
                            return { namespace: 'operationLog', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__reason_1.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_1.js').then(
                          m => {
                            return { namespace: 'reason_1', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__reason_2.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_2.js').then(
                          m => {
                            return { namespace: 'reason_2', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__reason_3.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/reason_3.js').then(
                          m => {
                            return { namespace: 'reason_3', ...m.default };
                          },
                        ),
                        import(/* webpackChunkName: 'p__System__models__role.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/System/models/role.js').then(
                          m => {
                            return { namespace: 'role', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "p__System__Config__Index" */ '../System/Config/InitStudent'),
                      LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../System/Config/InitStudent').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            component: () =>
              React.createElement(
                require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
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
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__UserCenter__models__userCenter.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/UserCenter/models/userCenter.js').then(
                      m => {
                        return { namespace: 'userCenter', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__UserCenter__TemplateDownload" */ '../UserCenter/TemplateDownload'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../UserCenter/TemplateDownload').default,
            exact: true,
          },
          {
            path: '/user-center/reset-password',
            name: 'reset-password',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__UserCenter__models__userCenter.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/UserCenter/models/userCenter.js').then(
                      m => {
                        return { namespace: 'userCenter', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__UserCenter__ResetPassword" */ '../UserCenter/ResetPassword'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../UserCenter/ResetPassword').default,
            exact: true,
          },
          {
            path: '/user-center/feedback',
            name: 'feedback',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__UserCenter__models__userCenter.js' */ '/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/pages/UserCenter/models/userCenter.js').then(
                      m => {
                        return { namespace: 'userCenter', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__UserCenter__Feedback" */ '../UserCenter/Feedback'),
                  LoadingComponent: require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/components/PageLoading/index')
                    .default,
                })
              : require('../UserCenter/Feedback').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: () =>
          React.createElement(
            require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
