import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'dictionary', ...(require('F:/workspace/aplus_bss_dev/src/models/dictionary.js').default) });
app.model({ namespace: 'employee', ...(require('F:/workspace/aplus_bss_dev/src/models/employee.js').default) });
app.model({ namespace: 'finance', ...(require('F:/workspace/aplus_bss_dev/src/models/finance.js').default) });
app.model({ namespace: 'global', ...(require('F:/workspace/aplus_bss_dev/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('F:/workspace/aplus_bss_dev/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('F:/workspace/aplus_bss_dev/src/models/login.js').default) });
app.model({ namespace: 'menu', ...(require('F:/workspace/aplus_bss_dev/src/models/menu.js').default) });
app.model({ namespace: 'organization', ...(require('F:/workspace/aplus_bss_dev/src/models/organization.js').default) });
app.model({ namespace: 'project', ...(require('F:/workspace/aplus_bss_dev/src/models/project.js').default) });
app.model({ namespace: 'quickEntryParams', ...(require('F:/workspace/aplus_bss_dev/src/models/quickEntryParams.js').default) });
app.model({ namespace: 'setting', ...(require('F:/workspace/aplus_bss_dev/src/models/setting.js').default) });
app.model({ namespace: 'student', ...(require('F:/workspace/aplus_bss_dev/src/models/student.js').default) });
app.model({ namespace: 'studentInfoChangeClassTable', ...(require('F:/workspace/aplus_bss_dev/src/models/studentInfoChangeClassTable.js').default) });
app.model({ namespace: 'studentInfoChangeLogTable', ...(require('F:/workspace/aplus_bss_dev/src/models/studentInfoChangeLogTable.js').default) });
app.model({ namespace: 'studentInfoClassFeeTable', ...(require('F:/workspace/aplus_bss_dev/src/models/studentInfoClassFeeTable.js').default) });
app.model({ namespace: 'studentInfoCourseRecordTable', ...(require('F:/workspace/aplus_bss_dev/src/models/studentInfoCourseRecordTable.js').default) });
app.model({ namespace: 'studentInfoExamRecordTable', ...(require('F:/workspace/aplus_bss_dev/src/models/studentInfoExamRecordTable.js').default) });
app.model({ namespace: 'studentInfoExpenditureList', ...(require('F:/workspace/aplus_bss_dev/src/models/studentInfoExpenditureList.js').default) });
app.model({ namespace: 'studentInfoMakeUpTuitionTable', ...(require('F:/workspace/aplus_bss_dev/src/models/studentInfoMakeUpTuitionTable.js').default) });
app.model({ namespace: 'studentInfoOtherCostTable', ...(require('F:/workspace/aplus_bss_dev/src/models/studentInfoOtherCostTable.js').default) });
app.model({ namespace: 'studentInfoPaymentFeeTable', ...(require('F:/workspace/aplus_bss_dev/src/models/studentInfoPaymentFeeTable.js').default) });
app.model({ namespace: 'studentInfoRefundFeeTable', ...(require('F:/workspace/aplus_bss_dev/src/models/studentInfoRefundFeeTable.js').default) });
app.model({ namespace: 'studentInfoSignUpFeeTable', ...(require('F:/workspace/aplus_bss_dev/src/models/studentInfoSignUpFeeTable.js').default) });
app.model({ namespace: 'systemConfig', ...(require('F:/workspace/aplus_bss_dev/src/models/systemConfig.js').default) });
app.model({ namespace: 'table', ...(require('F:/workspace/aplus_bss_dev/src/models/table.js').default) });
app.model({ namespace: 'user', ...(require('F:/workspace/aplus_bss_dev/src/models/user.js').default) });
