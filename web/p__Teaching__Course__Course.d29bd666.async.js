(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[149],{ZETi:function(e,t){function n(){throw new Error("tty.ReadStream is not implemented")}function a(){throw new Error("tty.ReadStream is not implemented")}t.isatty=function(){return!1},t.ReadStream=n,t.WriteStream=a},aQ7P:function(e,t,n){"use strict";n.r(t);n("y8nQ");var a=n("Vl3Y"),o=n("jehZ"),c=n.n(o),r=(n("+L6B"),n("2/Rp")),i=(n("BoS7"),n("Sdc0")),l=n("eHn4"),s=n.n(l),u=(n("+BJd"),n("mr32")),m=n("p0pE"),f=n.n(m),d=n("qIgq"),E=n.n(d),C=n("q1tI"),k=n.n(C),b=n("MuoO"),y=n("zHco"),p=n("Y2fQ"),S=n("v99g"),I=n("myFP"),O=n("mGJS"),g=n("9vKQ"),h=(n("2qtc"),n("kLXV")),v=(n("14J3"),n("BMrR")),T=(n("jCWc"),n("kPKH")),N=function(e){var t=e.selectedRows,n=e.onSubmit,o=e.visible,r=e.setVisible,i=e.form,l=e.loading,s=Object(C["useState"])([]),u=E()(s,2),m=u[0],d=u[1],b=function(e){e.preventDefault(),i.validateFields(function(e,a){if(e)return!1;n(f()({},a,{intensiveStatus:1,courseIds:t.map(function(e){return e[g["a"].TEACHING.COURSE.ID.key]})}))})},y=function(e){e.preventDefault(),r(!1)};return Object(C["useEffect"])(function(){if(o){var e=[];t.find(function(e){return e.teachKm.indexOf("km2")<0})||e.push({dKey:"km2",dValue:"\u79d1\u76ee\u4e8c\u96c6\u8bad"}),t.find(function(e){return e.teachKm.indexOf("km3")<0})||e.push({dKey:"km3",dValue:"\u79d1\u76ee\u4e09\u96c6\u8bad"}),d(e)}},[o]),k.a.createElement(h["a"],{destroyOnClose:!0,title:"\u8bbe\u7f6e\u96c6\u8bad\u8bfe\u7a0b",width:350,visible:o,onOk:b,onCancel:y,closable:!0,maskClosable:!1,keyboard:!1,confirmLoading:l,okText:"\u63d0\u4ea4",cancelText:"\u53d6\u6d88"},k.a.createElement(a["a"],{onSubmit:b},k.a.createElement(v["a"],{gutter:24},k.a.createElement(T["a"],null,k.a.createElement(O["a"],c()({},e,{config:{key:"kmCode",title:"\u96c6\u8bad\u79d1\u76ee",type:"radio"},values:m,form:i,rules:[{required:!0,message:"\u8be5\u9879\u4e3a\u5fc5\u586b"}],style:{marginBottom:0}}))),k.a.createElement(T["a"],null,k.a.createElement(O["a"],c()({},e,{config:{key:"bookNum",title:"\u96c6\u8bad\u8bfe\u7a0b\u4eba\u8f66\u4e0a\u9650",type:"inputNumber"},form:i,rules:[{required:!0,message:"\u8be5\u9879\u4e3a\u5fc5\u586b"}],style:{marginBottom:0}}))))))},R=a["a"].create()(N),A=function(e){var t=e.selectedRows,n=e.onSubmit,o=e.visible,r=e.setVisible,i=e.form,l=e.loading,s=Object(C["useState"])([]),u=E()(s,2),m=u[0],d=u[1],b=function(e){e.preventDefault(),i.validateFields(function(e,a){if(e)return!1;n(f()({},a,{kmCode:a.kmCode.join(","),intensiveStatus:2,courseIds:t.map(function(e){return e[g["a"].TEACHING.COURSE.ID.key]})}))})},y=function(e){e.preventDefault(),r(!1)};return Object(C["useEffect"])(function(){if(o){var e=[];t.find(function(e){return e.teachKm.indexOf("km2")<0})||e.push({dKey:"km2",dValue:"\u79d1\u76ee\u4e8c\u6392\u8bfe"}),t.find(function(e){return e.teachKm.indexOf("km3")<0})||e.push({dKey:"km3",dValue:"\u79d1\u76ee\u4e09\u6392\u8bfe"}),d(e)}},[o]),k.a.createElement(h["a"],{destroyOnClose:!0,title:"\u8bbe\u7f6e\u6392\u8bfe\u8bfe\u7a0b",width:350,visible:o,onOk:b,onCancel:y,closable:!0,maskClosable:!1,keyboard:!1,confirmLoading:l,okText:"\u63d0\u4ea4",cancelText:"\u53d6\u6d88"},k.a.createElement(a["a"],{onSubmit:b},k.a.createElement(v["a"],{gutter:24},k.a.createElement(T["a"],null,k.a.createElement(O["a"],c()({},e,{config:{key:"kmCode",title:"\u6392\u8bfe\u79d1\u76ee",type:"checkbox"},values:m,form:i,rules:[{required:!0,message:"\u8be5\u9879\u4e3a\u5fc5\u586b"}],style:{marginBottom:0}}))),k.a.createElement(T["a"],null,k.a.createElement(O["a"],c()({},e,{config:{key:"bookNum",title:"\u6392\u8bfe\u8bfe\u7a0b\u4eba\u8f66\u4e0a\u9650",type:"inputNumber"},form:i,rules:[{required:!0,message:"\u8be5\u9879\u4e3a\u5fc5\u586b"}],style:{marginBottom:0}}))))))},U=a["a"].create()(A),_=function(e){var t=e.currCoachInfo,n=e.selectedRows,o=e.onSubmit,r=e.visible,i=e.setVisible,l=e.form,s=e.loading,u=Object(C["useState"])([]),m=E()(u,2),d=m[0],b=m[1];Object(C["useEffect"])(function(){if(r){var e=[];n.find(function(e){return e.teachKm.indexOf("km2")<0})||e.push({dKey:"km2",dValue:"\u79d1\u76ee\u4e8c"}),n.find(function(e){return e.teachKm.indexOf("km3")<0})||e.push({dKey:"km3",dValue:"\u79d1\u76ee\u4e09"}),b(e)}},[r]);var y=function(e){e.preventDefault(),l.validateFields(function(e,t){if(e)return!1;o(f()({},t,{courseIds:n.map(function(e){return e[g["a"].TEACHING.COURSE.ID.key]}),kmCode:t.kmCode.join(",")}))})},p=function(e){e.preventDefault(),i(!1)};return k.a.createElement(h["a"],{destroyOnClose:!0,title:"\u8bbe\u7f6e\u666e\u901a\u8bfe\u7a0b",width:350,visible:r,onOk:y,onCancel:p,closable:!0,maskClosable:!1,keyboard:!1,confirmLoading:s,okText:"\u63d0\u4ea4",cancelText:"\u53d6\u6d88"},k.a.createElement(a["a"],{onSubmit:y},k.a.createElement(v["a"],{gutter:24},k.a.createElement(T["a"],null,k.a.createElement(a["a"].Item,{label:"\u6559\u7ec3\u59d3\u540d\uff1a",style:{display:"flex"}},k.a.createElement("span",{className:"ant-form-text"},t?t.name:"\u6682\u65e0"))),k.a.createElement(T["a"],null,k.a.createElement(O["a"],c()({},e,{config:{key:"kmCode",title:"\u8c03\u6574\u79d1\u76ee\u4e3a",type:"checkbox"},values:d,form:l,rules:[{required:!0,message:"\u8be5\u9879\u4e3a\u5fc5\u586b"}],style:{marginBottom:0}}))))))},H=a["a"].create()(_),K=function(e){var t=e.currCoachInfo,n=e.selectedRows,o=e.onSubmit,r=e.visible,i=e.setVisible,l=e.form,u=e.loading,m=[];if(t&&t.bookNum){var d=t.bookNum.split(",")||[];m=d.map(function(e){return{dKey:e,dValue:e}})}var E=function(e){e.preventDefault(),l.validateFields(function(e,t){if(e)return!1;o(f()({},t,s()({courseIds:n.map(function(e){return e[g["a"].TEACHING.COURSE.ID.key]})},g["a"].TEACHING.COURSE.BOOK_NUM.key,t[g["a"].TEACHING.COURSE.BOOK_NUM.key].join(","))))})},C=function(e){e.preventDefault(),i(!1)};return k.a.createElement(h["a"],{destroyOnClose:!0,title:"\u8c03\u6574\u4eba\u8f66\u4e0a\u9650",width:350,visible:r,onOk:E,onCancel:C,closable:!0,maskClosable:!1,keyboard:!1,confirmLoading:u,okText:"\u63d0\u4ea4",cancelText:"\u53d6\u6d88"},k.a.createElement(a["a"],{onSubmit:E},k.a.createElement(v["a"],{gutter:24},k.a.createElement(T["a"],null,k.a.createElement(a["a"].Item,{label:"\u6559\u7ec3\u59d3\u540d\uff1a",style:{display:"flex"}},k.a.createElement("span",{className:"ant-form-text"},t?t.name:"\u6682\u65e0"))),k.a.createElement(T["a"],null,k.a.createElement(O["a"],c()({className:"customer-checkbox"},e,{config:{key:"bookNum",type:"checkbox",title:"\u8c03\u6574\u4eba\u8f66\u4e0a\u9650\u4e3a\uff1a"},values:m,form:l,rules:[{required:!0,message:"\u8be5\u9879\u4e3a\u5fc5\u586b"}],style:{marginBottom:0}}))))))},G=a["a"].create()(K),j=(n("bP8k"),n("gFTJ")),w="studentNumList",D=j["a"].Item,x=function(e){var t=e.currCoachInfo,n=e.selectItem,a=e.visible,o=(e.form,e.setVisible),r=(e.data,e.loading,e.afterClose),i=(e.user,Object(C["useState"])(!1)),l=E()(i,2),s=l[0],u=l[1],m=[{title:"\u5e8f\u53f7",key:"key"},g["a"].STUDENT.NAME,g["a"].STUDENT.MOBILE,{key:"bookTime",title:"\u9884\u7ea6\u65f6\u95f4",customRender:function(e,t){return t.createTime}},f()({},g["a"].STUDENT.CLASS_ID_ACTIVE,{title:"\u5f53\u524d\u73ed\u578b"}),g["a"].TEACHING.COURSE.LOGIC_STATUS];return a&&k.a.createElement(h["a"],{width:"80%",title:t.name,visible:a,afterClose:r,destroyOnClose:!0,onCancel:function(){return o(!1)},footer:null},k.a.createElement(j["a"],{column:3,bordered:!0},k.a.createElement(D,{label:"\u8bfe\u7a0b\u65e5\u671f"},n.courseDate),k.a.createElement(D,{label:"\u57f9\u8bad\u65f6\u6bb5"},n.startTime+"~"+n.endTime),k.a.createElement(D,{label:"\u9884\u7ea6\u4eba\u6570"},n.studentNum)),k.a.createElement(I["a"],c()({},e,{scroll:{x:"max-content"},bodyStyle:{padding:0},tableName:w,originColumns:m,columnSortable:!1,needUpdate:s,setNeedUpdate:u,tableSearchParams:{courseId:n.id}})))},V=Object(b["connect"])(function(e){var t,n=e[w],a=e.loading,o=e.global,c=e.user;return t={},s()(t,w,n),s()(t,"loading",a),s()(t,"global",o),s()(t,"user",c),t})(a["a"].create()(x)),M=(n("ZETi"),n("uY7g")),B="teachingCourse",q=function(e){var t=e.dispatch,n=e.form,a=e.loading,o=Object(C["useState"])([]),l=E()(o,2),m=l[0],d=l[1],b=Object(C["useState"])(!1),h=E()(b,2),v=h[0],T=h[1],N=Object(C["useState"])(!1),A=E()(N,2),_=A[0],K=A[1],j=Object(C["useState"])(!1),w=E()(j,2),D=w[0],x=w[1],q=Object(C["useState"])(!1),L=E()(q,2),F=L[0],P=L[1],J=Object(C["useState"])(!1),Y=E()(J,2),Q=Y[0],Z=Y[1],W=Object(C["useState"])(!0),z=E()(W,2),X=z[0],$=z[1],ee=Object(C["useState"])(!0),te=E()(ee,2),ne=(te[0],te[1]),ae=Object(C["useState"])(!1),oe=E()(ae,2),ce=oe[0],re=oe[1],ie=Object(C["useState"])(!1),le=E()(ie,2),se=le[0],ue=le[1],me=Object(C["useState"])([]),fe=E()(me,2),de=fe[0],Ee=fe[1],Ce=Object(C["useState"])(!1),ke=E()(Ce,2),be=ke[0],ye=ke[1],pe=function(e){return t({type:"".concat(B,"/saveCourseIntensive"),params:e}).then(function(){Z(!0)})},Se=function(e){return t({type:"".concat(B,"/saveCourseKM"),params:e}).then(function(){Z(!0)})},Ie=function(e){return t({type:"".concat(B,"/saveCourseBookNum"),params:e}).then(function(){Z(!0)})},Oe=function(e,n){return t({type:"".concat(B,"/").concat(n?"open":"close","Course"),params:{courseIds:[e]}}).then(function(){Z(!0)})},ge=function(e){return t({type:"".concat(B,"/").concat(e?"open":"close","Course"),params:{courseIds:m.map(function(e){return e[g["a"].TEACHING.COURSE.ID.key]})}}).then(function(){Z(!0)})},he=[g["a"].TEACHING.COURSE.DATE,g["a"].TEACHING.COURSE.COACH_ID,f()({},g["a"].TEACHING.COURSE.RANGE_TIME,{customRender:function(e,t){return[1*t.intensiveStatus===2?k.a.createElement(u["a"],s()({color:"#f50",key:"f50"},"key","f50"),"\u6392"):"","".concat(t[g["a"].TEACHING.COURSE.START_TIME.key],"~").concat(t[g["a"].TEACHING.COURSE.END_TIME.key])]}}),g["a"].TEACHING.COURSE.LICENSE_TYPE,f()({},g["a"].TEACHING.COURSE.KM,{customRender:function(e,t,n,a){return a+(1==t.intensiveStatus?"\u96c6\u8bad":"")}}),g["a"].TEACHING.COURSE.BOOK_NUM,f()({},g["a"].TEACHING.COURSE.STUDENT_NUM,{customRender:function(e,n){return 1*e===0?e:k.a.createElement("a",{onClick:function(){t({type:"orgEmployee/queryEmployeeInfo",params:{employeeId:n.coachId}}).then(function(e){!1!==e&&(Ee(e),d([n]),ye(!0))})}},e)}}),f()({},g["a"].TEACHING.COURSE.STATUS,{customRender:function(e,t){return 0==t[g["a"].TEACHING.COURSE.STUDENT_NUM.key]?k.a.createElement(M["a"],{privs:["course_status_swtich"],noMatch:1===e?"\u6253\u5f00":"\u5173\u95ed"},k.a.createElement(i["a"],{checkedChildren:"\u6253\u5f00",unCheckedChildren:"\u5173\u95ed",checked:1==e,onChange:function(e){return Oe(t[g["a"].TEACHING.COURSE.ID.key],e)}})):"\u5df2\u9501\u5b9a"}})],ve=[{config:g["a"].TEACHING.COURSE.QUICK_SEARCH},{config:g["a"].TEACHING.COURSE.RANGE_DATE,col:9},{config:g["a"].TEACHING.COURSE.START_TIME},{config:g["a"].TEACHING.COURSE.END_TIME},{config:g["a"].TEACHING.COURSE.LICENSE_TYPE_ACTIVE},{config:g["a"].TEACHING.COURSE.KM,values:[{dKey:"km2",dValue:"\u79d1\u76ee\u4e8c"},{dKey:"km3",dValue:"\u79d1\u76ee\u4e09"}]},{config:{key:"intensiveStatus",title:"\u662f\u5426\u96c6\u8bad",type:"select"},values:[{dKey:"0",dValue:"\u975e\u96c6\u8bad"},{dKey:"1",dValue:"\u96c6\u8bad"}]},{config:g["a"].TEACHING.COURSE.BOOK_NUM},{config:f()({},g["a"].TEACHING.COURSE.STATUS,{type:"select"})},{config:g["a"].TEACHING.COURSE.SITE_ID},{config:g["a"].TEACHING.COURSE.DEPART_ID},{config:g["a"].EMPLOYEE.COACH_INFO.COURSE_ARRANGE}];Object(C["useEffect"])(function(){if(m.length)if(1===m.length)$(!1),ne(!("km3"===m[0].teachKm&&1*m[0].intensiveStatus===1||"km2"===m[0].teachKm&&1*m[0].intensiveStatus===1||"km2,km3"===m[0].teachKm)),re(!0);else{var e=m[0].coachId,t=!1;m.map(function(n){e!==n.coachId&&(t=!0)}),t||ne(!("km3"===m[0].teachKm&&1*m[0].intensiveStatus===1||"km2"===m[0].teachKm&&1*m[0].intensiveStatus===1||"km2,km3"===m[0].teachKm)),$(t);var n={km2:!0,km3:!0};m.forEach(function(e){e.teachKm.indexOf("km2")<0&&(n.km2=!1),e.teachKm.indexOf("km3")<0&&(n.km3=!1)}),re(n.km2||n.km3)}else $(!0),re(!1)},[m]),Object(C["useEffect"])(function(){t({type:"systemConfig/intensiveCourseSwitch"}).then(function(e){ue("on"===e)})},[]);var Te=[se&&k.a.createElement(M["a"],{privs:["intensive_set"],key:"intensive_set"},k.a.createElement(r["a"],{key:"1",type:"primary",disabled:!ce,onClick:function(){T(!0)}},"\u8bbe\u7f6e\u96c6\u8bad\u8bfe\u7a0b")),k.a.createElement(M["a"],{privs:["course_arrange_set"],key:"course_arrange_set"},k.a.createElement(r["a"],{key:"6",type:"primary",disabled:!ce,onClick:function(){K(!0)}},"\u8bbe\u7f6e\u6392\u8bfe\u8bfe\u7a0b")),k.a.createElement(M["a"],{privs:["adjust_train_course"],key:"adjust_train_course"},k.a.createElement(r["a"],{key:"2",type:"primary",disabled:!ce,onClick:function(){t({type:"orgEmployee/queryEmployeeInfo",params:{employeeId:m[0].coachId}}).then(function(e){console.log(e),!1!==e&&(Ee(e),x(!0))})}},"\u8bbe\u7f6e\u666e\u901a\u8bfe\u7a0b")),k.a.createElement(M["a"],{privs:["adjust_book_num"],key:"adjust_book_num"},k.a.createElement(r["a"],{key:"3",type:"primary",disabled:X,onClick:function(){t({type:"orgEmployee/queryEmployeeInfo",params:{employeeId:m[0].coachId}}).then(function(e){console.log(e),!1!==e&&(e.bookNum=e.coachInfo&&e.coachInfo.bookNum?e.coachInfo.bookNum:"",Ee(e),P(!0))})}},"\u8c03\u6574\u4eba\u8f66\u4e0a\u9650")),k.a.createElement(M["a"],{privs:["course_status_swtich"],key:"course_status_swtich_open"},k.a.createElement(r["a"],{key:"4",type:"primary",disabled:!m.length,onClick:function(){ge(!0)}},"\u6253\u5f00")),k.a.createElement(M["a"],{privs:["course_status_swtich"],key:"course_status_swtich_close"},k.a.createElement(r["a"],{key:"5",type:"primary",disabled:!m.length,onClick:function(){ge(!1)}},"\u5173\u95ed"))],Ne=Object(C["useMemo"])(function(){return ve.map(function(e){return k.a.createElement(O["a"],c()({},e,{form:n}))})},[n]);return k.a.createElement(y["a"],{title:k.a.createElement(p["FormattedMessage"],{id:"menu.teaching.course"})},k.a.createElement(S["a"],null,k.a.createElement(I["a"],c()({},e,{tableName:B,originColumns:he,formFields:Ne,tableActions:Te,selectedRows:m,setSelectedRows:d,columnSortable:!1,scroll:{x:"max-content"},needUpdate:Q,setNeedUpdate:Z}))),k.a.createElement(R,{selectedRows:m,visible:v,setVisible:T,loading:a.effects["".concat(B,"/saveCourseIntensive")],onSubmit:function(e){console.log(e),pe(e).then(function(e){!1!==e&&T(!1)})}}),k.a.createElement(U,{selectedRows:m,visible:_,setVisible:K,loading:a.effects["".concat(B,"/saveCourseIntensive")],onSubmit:function(e){pe(e).then(function(e){!1!==e&&K(!1)})}}),k.a.createElement(H,{currCoachInfo:de,selectedRows:m,visible:D,setVisible:x,loading:a.effects["".concat(B,"/saveCourseKM")],onSubmit:function(e){console.log(e),Se(e).then(function(e){!1!==e&&x(!1)})}}),k.a.createElement(G,{selectedRows:m,visible:F,setVisible:P,loading:a.effects["".concat(B,"/saveCourseBookNum")],currCoachInfo:de,onSubmit:function(e){console.log(e),Ie(e).then(function(e){!1!==e&&P(!1)})}}),k.a.createElement(V,{selectItem:m[0],visible:be,setVisible:ye,currCoachInfo:de}))};t["default"]=Object(b["connect"])(function(e){var t,n=e[B],a=e.loading,o=e.global;return t={},s()(t,B,n),s()(t,"loading",a),s()(t,"global",o),t})(a["a"].create()(q))}}]);