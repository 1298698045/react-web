(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[99],{"1iPs":function(e,t,a){"use strict";a.r(t);a("y8nQ");var n=a("Vl3Y"),r=a("eHn4"),i=a.n(r),c=a("jehZ"),o=a.n(c),l=(a("+L6B"),a("2/Rp")),E=a("gWZ8"),d=a.n(E),T=(a("P2fV"),a("NJEC")),u=(a("5Dmo"),a("3S7+")),s=(a("T2oS"),a("W9HT")),S=a("qIgq"),m=a.n(S),D=a("p0pE"),p=a.n(D),N=(a("tU7J"),a("wFql")),y=a("q1tI"),f=a.n(y),U=a("6y2Z"),O=a("Zcyb"),b=a("MuoO"),_=a("Zz84"),I=a("zHco"),g=a("myFP"),A=a("9vKQ"),C=a("mGJS"),R=a("Y2fQ"),P=(a("2qtc"),a("kLXV")),k=(a("bP8k"),a("gFTJ")),v=(a("Znn+"),a("ZTPi")),L=a("Ta1x"),M=a("QL5A"),j=a("03Mi"),Y=a("Ss8Q"),h=(a("R9oj"),a("ECub")),F=(a("/zsF"),a("PArb")),K=(a("5NDa"),a("5rEg")),V=(a("RC8p"),a("rgW5")),H=a("wpzQ"),B=a("MbOj"),x=V["a"].Item,q=K["a"].TextArea,w=function(e){var t=e.dispatch,a=e.studentId,r=e.loading,i=Object(y["useState"])([]),c=m()(i,2),o=c[0],E=c[1],d=Object(B["a"])(""),T=m()(d,2),u=T[0],s=T[1],S=r.effects["student/saveMemo"]||!1,D=Object(y["useCallback"])(function(e){t({type:"student/getMemoList",payload:a}).then(function(t){var a=t.list;return e(a)})},[a,t]);Object(y["useEffect"])(function(){D(function(e){return E(e)})},[]);var p=Object(y["useCallback"])(function(){t({type:"student/saveMemo",payload:{params:{studentId:a,memo:u()}}}).then(function(){s(""),D(function(e){return E(e)})})},[a,t,u,D,E,s,a]);return f.a.createElement("div",null,f.a.createElement(n["a"].Item,{label:"\u6dfb\u52a0\u5907\u6ce8",required:!0},f.a.createElement(q,{onChange:function(e){return s(e.target.value)},value:u()})),f.a.createElement("div",{style:{marginBottom:24}},f.a.createElement(l["a"],{type:"primary",style:{marginRight:8},onClick:p,icon:"plus-circle",disabled:!u(),loading:S},"\u6dfb\u52a0"),f.a.createElement(l["a"],{onClick:function(){return s("")},icon:"reload"},"\u6e05\u7a7a")),f.a.createElement(F["a"],{dashed:!0},"\u5386\u53f2\u5907\u6ce8\u4fe1\u606f"),0===o.length?f.a.createElement(h["a"],null):f.a.createElement(V["a"],null,o.map(function(e){return f.a.createElement(x,{key:e.id},f.a.createElement(H["a"],{dispatch:t,data:e,getList:D,setList:E}))})))},J=w,Z=a("ZhIB"),z=a.n(Z),Q=v["a"].TabPane,X=k["a"].Item,W=[A["a"].STUDENT.NAME,A["a"].STUDENT.GENDER,A["a"].STUDENT.NATIONALITY,A["a"].STUDENT.MAJOR_CARD_TYPE,A["a"].STUDENT.MAJOR_CARD_CODE,A["a"].STUDENT.BIRTHDAY,p()({},A["a"].STUDENT.REG_ADDRESS,{span:3}),p()({},A["a"].STUDENT.CON_ADDRESS,{span:3}),A["a"].STUDENT.MOBILE,A["a"].STUDENT.EMAIL,A["a"].STUDENT.ZIP,A["a"].STUDENT.KM2_COACH_ID,A["a"].STUDENT.KM3_COACH_ID],G="studentInfoSignUpFeeList",$="studentInfoRefundFeeList",ee="studentInfoChangeLogList",te=function(e){var t=e.visible,a=e.setVisible,n=e.dictionary,r=e.dispatch,i=e.loading,c=Object(y["useState"])({}),E=m()(c,2),d=E[0],T=E[1],u=Object(y["useState"])(!Object(Y["a"])("show_finance_data")),s=m()(u,2),S=s[0],D=(s[1],Object(L["b"])()(e.data));Object(y["useEffect"])(function(){t&&T("undefined"!==typeof D.apply.introducerType&&1*D.apply.introducerType===2?"introducer_id":"employee_id")},[t]);var N=[{title:"\u5e8f\u53f7",key:"key"},p()({},A["a"].STUDENT.RECEIPTS,{title:"\u672c\u6b21\u4ea4\u8d39",customRender:function(e,t){return S?z()(t.total||0).format("0,0").replace(/[0-9]/gi,"*"):z()(t.total||0).format("0,0")}}),A["a"].STUDENT.CLASS_ID,p()({},A["a"].STUDENT.PAY_STATUS,{customRender:function(e){return 0===e?"\u5f85\u4ea4\u8d39":"\u5df2\u4ea4\u8d39"}}),{title:"\u6536\u636e\u7f16\u53f7",key:"journalId"},{title:"\u64cd\u4f5c\u4eba",key:"payee",customRender:function(e,t){var a=t.payee;if(a){var r=n[A["a"].EMPLOYEE.ID.dictionary].find(function(e){var t=e.uid;return String(t)===String(a)});if(r)return r.name}return"\u6682\u65e0"}},p()({},A["a"].FINANCE.CREATE_TIME,{title:"\u64cd\u4f5c\u65f6\u95f4"})],U=[{title:"\u5e8f\u53f7",key:"key"},A["a"].FINANCE.REFUND_TYPE,p()({},A["a"].FINANCE.REFUND_REASON,{dictionary:"quit_reason"}),p()({},A["a"].FINANCE.AMOUNT,{title:"\u9000\u8d39\u91d1\u989d",customRender:function(e,t){return S?z()(e||0).format("0,0").replace(/[0-9]/gi,"*"):z()(e||0).format("0,0")}}),A["a"].STUDENT.MEMO,p()({},A["a"].FINANCE.OP_STATUS),{title:"\u64cd\u4f5c\u4eba",key:"payee",customRender:function(e,t){var a=t.payee;if(a){var r=n[A["a"].EMPLOYEE.ID.dictionary].find(function(e){var t=e.uid;return String(t)===String(a)});if(r)return r.name}return"\u6682\u65e0"}},p()({},A["a"].FINANCE.CREATE_TIME,{title:"\u64cd\u4f5c\u65f6\u95f4"})],O=[{title:"\u5e8f\u53f7",key:"key"},{title:"\u64cd\u4f5c\u7c7b\u578b",key:"action",dictionary:"change_log_type"},p()({},A["a"].STUDENT.MEMO,{title:"\u64cd\u4f5c\u5185\u5bb9"}),p()({},A["a"].STUDENT.OPERATOR_ID,{title:"\u64cd\u4f5c\u4eba",customRender:function(e,t){if(t.operator){if(t.operator[A["a"].STUDENT.OPERATOR_ID.key]){var a=n[A["a"].EMPLOYEE.ID.dictionary].find(function(e){var a=e.uid;return String(a)===String(t.operator[A["a"].STUDENT.OPERATOR_ID.key])});if(a)return a.name}return"\u6682\u65e0"}return"\u6682\u65e0"}}),p()({},A["a"].FINANCE.CREATE_TIME,{title:"\u64cd\u4f5c\u65f6\u95f4"})],b=[A["a"].STUDENT.SOURCE_TYPE,A["a"].STUDENT.TEMP_RESIDENCE_PERMIT,A["a"].STUDENT.BACKUP_TEL_PHONE,A["a"].STUDENT.CAREER,A["a"].STUDENT.LICENSE_TYPE,A["a"].STUDENT.CLASS_ID,A["a"].STUDENT.DEPART_ID,A["a"].STUDENT.FEE_TYPE,p()({},A["a"].STUDENT.REDUCE_AMOUNT,{isHideData:S,formatter:function(e){return"".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")}}),A["a"].STUDENT.REDUCE_REASON,p()({},A["a"].STUDENT.DISCOUNT,{isHideData:S,formatter:function(e){return"".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")}}),p()({},A["a"].STUDENT.DEPOSIT,{isHideData:S,formatter:function(e){return"".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")}}),p()({},A["a"].STUDENT.RECEIVABLE,{isHideData:S,title:"\u62a5\u540d\u4ea4\u8d39",formatter:function(e){return"".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")}}),p()({},A["a"].STUDENT.OWED,{isHideData:S}),A["a"].STUDENT.CHANNEL,p()({},A["a"].STUDENT.OPERATOR_ID,{dictionary:d}),A["a"].STUDENT.CONTRACT_NO,A["a"].STUDENT.REPORT_TIME,A["a"].STUDENT.VALUE_ADDED,A["a"].STUDENT.APPLY_TYPE,p()({},A["a"].STUDENT.APPLY_SUB_TYPE,{dictionary:"".concat(A["a"].STUDENT.APPLY_TYPE.dictionary,"_").concat(D[A["a"].STUDENT.APPLY_TYPE.key])}),A["a"].STUDENT.OLD_LICENCE_TYPE,A["a"].STUDENT.CHANGE_LICENCE_TIME,A["a"].STUDENT.APPLY_WAY,A["a"].STUDENT.PROXY_NAME,A["a"].STUDENT.PROXY_CARD_TYPE,A["a"].STUDENT.PROXY_CARD_NO,A["a"].STUDENT.PROXY_TEL_PHONE,p()({},A["a"].STUDENT.PROXY_LOCATION,{span:2}),p()({},A["a"].STUDENT.PROXY_ADDRESS,{span:3}),p()({},A["a"].STUDENT.MATERIAL,{span:3})],_=Object(M["a"])(n)(D),I="\u6682\u65e0",C=D.creator;if(C){var R=C.operatorId;if(n[A["a"].EMPLOYEE.ID.dictionary]){var h=n[A["a"].EMPLOYEE.ID.dictionary].find(function(e){var t=e.uid;return String(t)===String(R)});h&&(I=h.name)}}var F="";return D.apply&&(1===D.apply.insteadKm2&&1===D.apply.insteadKm3?F="\u79d1\u76ee\u4e8c\u3001\u79d1\u76ee\u4e09":0===D.apply.insteadKm2&&1===D.apply.insteadKm3?F="\u79d1\u76ee\u4e09":1===D.apply.insteadKm2&&0===D.apply.insteadKm3&&(F="\u79d1\u76ee\u4e8c")),f.a.createElement(P["a"],{title:"\u5b66\u5458\u62a5\u540d\u4fe1\u606f - ".concat(D[A["a"].STUDENT.NAME.key]),width:"90%",visible:t,destroyOnClose:!0,onCancel:function(){return a(!1)},bodyStyle:{paddingTop:0},closable:!0,maskClosable:!1,keyboard:!1,footer:f.a.createElement(l["a"],{icon:"close-circle",htmlType:"button",onClick:function(){a(!1)}},"\u5173\u95ed")},f.a.createElement(v["a"],{defaultActiveKey:"1"},f.a.createElement(Q,{tab:"\u62a5\u540d\u4fe1\u606f",key:"1"},f.a.createElement(k["a"],{column:3,bordered:!0},W.concat(b).map(function(e){return f.a.createElement(X,{span:e.span||1,key:e.key,label:e.title},e.isHideData?_(e)?_(e).replace(/[0-9]/gi,"*"):"*":_(e)||"\u6682\u65e0")}),f.a.createElement(X,{label:"\u62a5\u540d\u65b9\u5f0f"},Object(j["c"])(n,A["a"].STUDENT.STUDENT_TYPE.dictionary,String(D[A["a"].STUDENT.STUDENT_TYPE.key]))||"\u6682\u65e0"),F?f.a.createElement(X,{label:"\u4ee3\u57f9\u79d1\u76ee"},F||"\u6682\u65e0"):null,D.apply&&D.apply.cooperationUnit?f.a.createElement(X,{label:"\u5916\u534f\u673a\u6784"},_(A["a"].STUDENT.COOPERATION_UNIT)||"\u6682\u65e0"):null,f.a.createElement(X,{label:"\u64cd\u4f5c\u5458"},I||"\u8d85\u7ea7\u7ba1\u7406\u5458"))),f.a.createElement(Q,{tab:"\u8d39\u7528\u4fe1\u606f",key:"2"},f.a.createElement(v["a"],{defaultActiveKey:"a",tabPosition:"left"},f.a.createElement(Q,{tab:"\u62a5\u540d\u8d39",key:"a"},f.a.createElement(g["a"],o()({},e,{pagination:null,bodyStyle:{padding:0},tableSearchParams:{studentId:D.id},tableName:G,columnSortable:!1,originColumns:N,scroll:{x:"max-content"}}))),f.a.createElement(Q,{tab:"\u9000\u8d39",key:"b"},f.a.createElement(g["a"],o()({},e,{pagination:null,bodyStyle:{padding:0},tableSearchParams:{studentId:D.id},tableName:$,columnSortable:!1,originColumns:U,scroll:{x:"max-content"}}))))),f.a.createElement(Q,{tab:"\u53d8\u66f4\u8bb0\u5f55",key:"3"},f.a.createElement(g["a"],o()({},e,{pagination:null,bodyStyle:{padding:0},tableSearchParams:{studentId:D.id},tableName:ee,columnSortable:!1,originColumns:O,scroll:{x:"max-content"}}))),f.a.createElement(Q,{tab:"\u5907\u6ce8",key:"4"},f.a.createElement(J,{dispatch:r,studentId:D.studentId,loading:i}))))},ae=Object(b["connect"])(function(e){var t,a=e[G],n=e[$],r=e[ee],c=e.loading,o=e.global,l=e.student;return t={},i()(t,G,a),i()(t,$,n),i()(t,ee,r),i()(t,"loading",c),i()(t,"global",o),i()(t,"student",l),t})(n["a"].create()(te)),ne=a("yyEK"),re=a("uY7g"),ie=a("3wSE"),ce=N["a"].Text,oe="studentSignUp",le=[A["a"].STUDENT.QUICK_SEARCH,A["a"].STUDENT.DEPART_ID_SCHOOL,A["a"].STUDENT.STUDENT_TYPE,A["a"].STUDENT.LICENSE_TYPE_ACTIVE,p()({},A["a"].STUDENT.STUDENT_STATUS,{values:[{dKey:"0",dValue:"\u5f85\u4ea4\u8d39"},{dKey:"6",dValue:"\u88ab\u9a73\u56de"},{dKey:"1",dValue:"\u5f85\u5efa\u6863"},{dKey:"2",dValue:"\u6682\u7f13\u5efa\u6863"}],title:"\u72b6\u6001"}),p()({},A["a"].STUDENT.CLASS_ID_ACTIVE,{title:"\u62a5\u540d\u73ed\u578b"}),p()({},A["a"].STUDENT.FEE_TYPE,{parent:"finance"}),A["a"].STUDENT.CHANNEL],Ee=[{dKey:"1",dValue:"\u672c\u6821\u62a5\u540d",privName:"register_local"},{dKey:"3",dValue:"\u4ee3\u57f9\u62a5\u540d",privName:"register_agent"},{dKey:"4",dValue:"\u6302\u9760\u62a5\u540d",privName:"register_contact"}],de=function(e){var t=e.form,a=e.user,n=e.dispatch,r=e.submitLoading,i=e.readBaseInfoFromIDLoading,c=e.dictionary,E=e.quickEntryParams,S=e.memoLoading,D=e.getStudentInfoLoading,N=e.deleteLoading,b=Object(U["a"])(!1),P=m()(b,2),k=P[0],v=P[1],L=Object(U["a"])(!1),M=m()(L,2),Y=M[0],h=M[1],F=Object(U["a"])(!1),K=m()(F,2),V=K[0],H=K[1],B=Object(y["useState"])({}),x=m()(B,2),q=x[0],w=x[1],J=Object(y["useState"])("1"),Z=m()(J,2),z=Z[0],Q=Z[1],X=Object(y["useState"])({}),W=m()(X,2),G=W[0],$=W[1],ee=Object(y["useState"])(!1),te=m()(ee,2),de=te[0],Te=te[1],ue=Object(y["useState"])([]),se=m()(ue,2),Se=se[0],me=se[1];Object(O["a"])(function(){"local"===E?fe("1")():"proxy"===E&&fe("3")(),n({type:"quickEntryParams/clearParams"}),Object(j["d"])(n,"introducer_id"),Object(j["d"])(n,"colla_id"),Object(j["d"])(n,"employee_id"),Object(j["d"])(n,A["a"].STUDENT.VALUE_ADDED.dictionary),Object(j["d"])(n,A["a"].STUDENT.CLASS_ID.dictionary),n({type:"student/getDependCost",payload:{params:{feeType:"guakao"}}}).then(function(e){me(e),"depend"===E&&fe("4")()})});var De=c[A["a"].STUDENT.COOPERATION_UNIT.dictionary],pe=Object(y["useCallback"])(function(e){var t=e.studentId,a=e.memo;n({type:"student/saveMemo",payload:{params:{studentId:t,memo:a}}}).then(function(e){!1!==e&&H(!1)})},[n]),Ne=function(e){n({type:"student/deleteStudent",payload:e}).then(function(){Te(!0)})},ye=[{title:"\u5e8f\u53f7",key:"key"},p()({},A["a"].STUDENT.NAME,{customRender:function(e,t){return f.a.createElement(re["a"],{privs:["student_detail"],noMatch:e},f.a.createElement("a",{onClick:function(e){e.stopPropagation(),D||Ue(t)}},D&&f.a.createElement(s["a"],{size:"small"})," ",e))}}),A["a"].STUDENT.MOBILE,p()({},A["a"].STUDENT.MAJOR_CARD_CODE,{customRender:function(e,t){return t.baseInfo[A["a"].STUDENT.MAJOR_CARD_CODE.key]||"\u6682\u65e0"}}),A["a"].STUDENT.DEPART_ID,A["a"].STUDENT.LICENSE_TYPE,p()({},A["a"].STUDENT.CLASS_ID,{title:"\u62a5\u540d\u73ed\u578b"}),A["a"].STUDENT.FEE_TYPE,p()({},A["a"].STUDENT.OPERATOR_ID,{customRender:function(e,t){if(t.apply){if(t.apply.introducer&&t.apply.introducerType)if(1*t.apply.introducerType===1){if(t.apply.introducer[A["a"].STUDENT.OPERATOR_ID.key])return Object(j["c"])(c,A["a"].STUDENT.OPERATOR_ID.dictionary,t.apply.introducer[A["a"].STUDENT.OPERATOR_ID.key])}else if(1*t.apply.introducerType===2&&t.apply.introducer[A["a"].STUDENT.OPERATOR_ID.key])return Object(j["c"])(c,"introducer_id",t.apply.introducer[A["a"].STUDENT.OPERATOR_ID.key]);return"\u6682\u65e0"}return"\u6682\u65e0"}}),p()({},A["a"].STUDENT.STUDENT_STATUS,{title:"\u5b66\u5458\u72b6\u6001",customRender:function(e,t){return"6"!==String(e)?Object(j["c"])(c,A["a"].STUDENT.STUDENT_STATUS.dictionary,String(e)):t.finance.rejectionReason?f.a.createElement(u["a"],{title:t.finance.rejectionReason},f.a.createElement("a",null,"\u62a5\u540d\u9a73\u56de")):"\u6682\u65e0"}}),{title:"\u64cd\u4f5c",key:"actions",customRender:function(e,t){var a=t.studentStatus;return f.a.createElement(ie["a"],null,f.a.createElement(re["a"],{key:"edit",privs:["student_edit"]},"0"!==String(a)?f.a.createElement("a",{onClick:function(){return fe()(t)}},D&&f.a.createElement(s["a"],{size:"small"})," \u7f16\u8f91"):f.a.createElement(ce,{disabled:!0},"\u7f16\u8f91")),f.a.createElement(re["a"],{key:"memo",privs:["student_memo"]},f.a.createElement("a",{onClick:function(){w(t),H(!0)}},"\u5907\u6ce8")),f.a.createElement(re["a"],{key:"delete",privs:["student_delete"]},"6"===String(a)?f.a.createElement(T["a"],{title:"\u786e\u5b9a\u5220\u9664\u6b64\u6761\u8bb0\u5f55\u4e48\uff1f",onConfirm:function(){var e=t.id;Ne(e)}},f.a.createElement("a",null,N&&f.a.createElement(s["a"],{size:"small"})," \u5220\u9664")):f.a.createElement(ce,{disabled:!0},"\u5220\u9664")))}}],fe=Object(y["useCallback"])(function(e){return function(t){if(t){var a=t.id;n({type:"student/getStudentInfo",payload:a}).then(function(e){$(e),v(!0)})}else Q(e),$({}),v(!0)}},[]),Ue=Object(y["useCallback"])(function(e){var t=e.id;n({type:"student/getStudentInfo",payload:t}).then(function(e){$(e),h(!0)})},[]),Oe=Object(y["useMemo"])(function(){return d()(Ee.map(function(e){return f.a.createElement(re["a"],{key:e.dKey,privs:[e.privName]},f.a.createElement(l["a"],{type:"primary",icon:"plus",onClick:function(){return fe(e.dKey)()}},e.dValue))}))},[fe]),be=Object(y["useCallback"])(function(e){n({type:e.params.id?"student/updateInfo":"student/saveInfo",payload:e}).then(function(e){!1!==e&&v(!1)})},[]),_e=Object(y["useMemo"])(function(){return le.map(function(e){return f.a.createElement(C["a"],{config:e,parent:e.parent,form:t,values:e.values})})},[t]);return f.a.createElement(I["a"],{title:f.a.createElement(R["FormattedMessage"],{id:"menu.student.sign-up"})},f.a.createElement(g["a"],o()({},e,{tableName:oe,tableActions:Oe,originColumns:ye,scroll:{x:"max-content"},formFields:_e,needUpdate:de,setNeedUpdate:Te})),f.a.createElement(_["a"],{dependCostConfig:Se,setNeedUpdate:Te,handleSubmit:be,data:G,studentType:z,dispatch:n,dictionary:c,loading:r,readBaseInfoFromIDLoading:i,visible:k,setVisible:v,cooperationUnits:De,user:a}),f.a.createElement(ne["a"],{handleSubmit:pe,data:q,loading:S,visible:V,setVisible:H,setNeedUpdate:Te}),f.a.createElement(ae,{dictionary:c,data:G,visible:Y,setVisible:h}))};t["default"]=Object(b["connect"])(function(e){var t,a=e[oe],n=e.loading,r=e.global,c=e.student,o=e.dictionary,l=e.quickEntryParams,E=e.user;return t={},i()(t,oe,a),i()(t,"loading",n),i()(t,"global",r),i()(t,"student",c),i()(t,"dictionary",o),i()(t,"quickEntryParams",l),i()(t,"user",E),i()(t,"memoLoading",n.effects["student/saveMemo"]||!1),i()(t,"getStudentInfoLoading",n.effects["student/getStudentInfo"]||!1),i()(t,"deleteLoading",n.effects["student/deleteStudent"]||!1),i()(t,"readBaseInfoFromIDLoading",n.effects["student/IdentityInfo"]||!1),i()(t,"submitLoading",n.effects["student/saveInfo"]||n.effects["student/updateInfo"]||!1),t})(n["a"].create()(de))}}]);