(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[33],{"5I0+":function(t,a,e){"use strict";e.r(a);var n=e("d6i3"),r=e.n(n),p=e("eHn4"),s=e.n(p),i=e("p0pE"),c=e.n(i),u=e("ii38"),o=e("Z2nI"),d=e("n7id"),f="signUpStudentType",l=Object(d["a"])(f);a["default"]={namespace:f,state:c()({},l),effects:{fetch:r.a.mark(function t(a,e){var n,p,i,d;return r.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=a.payload,p=e.call,i=e.put,t.t0=o["a"],t.next=5,p(u["k"],n);case 5:if(t.t1=t.sent,t.t2=(0,t.t0)(t.t1),d=(0,t.t2)("",""),!d){t.next=11;break}return t.next=11,i({type:"save",payload:s()({},"".concat(f,"TableData"),{params:n.params,list:d.list.map(function(t,a){return c()({key:a+1},t)}),pagination:d.pagination})});case 11:case"end":return t.stop()}},t)})},reducers:{save:function(t,a){return c()({},t,a.payload)}}}}}]);