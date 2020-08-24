import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'dictionary', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/dictionary.js').default) });
app.model({ namespace: 'employee', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/employee.js').default) });
app.model({ namespace: 'finance', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/finance.js').default) });
app.model({ namespace: 'global', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/login.js').default) });
app.model({ namespace: 'menu', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/menu.js').default) });
app.model({ namespace: 'organization', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/organization.js').default) });
app.model({ namespace: 'project', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/project.js').default) });
app.model({ namespace: 'quickEntryParams', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/quickEntryParams.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/setting.js').default) });
app.model({ namespace: 'student', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/student.js').default) });
app.model({ namespace: 'studentInfoChangeClassTable', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/studentInfoChangeClassTable.js').default) });
app.model({ namespace: 'studentInfoChangeLogTable', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/studentInfoChangeLogTable.js').default) });
app.model({ namespace: 'studentInfoClassFeeTable', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/studentInfoClassFeeTable.js').default) });
app.model({ namespace: 'studentInfoCourseRecordTable', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/studentInfoCourseRecordTable.js').default) });
app.model({ namespace: 'studentInfoExamRecordTable', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/studentInfoExamRecordTable.js').default) });
app.model({ namespace: 'studentInfoExpenditureList', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/studentInfoExpenditureList.js').default) });
app.model({ namespace: 'studentInfoMakeUpTuitionTable', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/studentInfoMakeUpTuitionTable.js').default) });
app.model({ namespace: 'studentInfoOtherCostTable', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/studentInfoOtherCostTable.js').default) });
app.model({ namespace: 'studentInfoPaymentFeeTable', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/studentInfoPaymentFeeTable.js').default) });
app.model({ namespace: 'studentInfoRefundFeeTable', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/studentInfoRefundFeeTable.js').default) });
app.model({ namespace: 'studentInfoSignUpFeeTable', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/studentInfoSignUpFeeTable.js').default) });
app.model({ namespace: 'systemConfig', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/systemConfig.js').default) });
app.model({ namespace: 'table', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/table.js').default) });
app.model({ namespace: 'user', ...(require('/Users/zhaodong/Desktop/myDemo/reactProject/aplus_bss_dev/src/models/user.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
