(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[32],{nRej:function(e,a,n){"use strict";n.r(a);var t=n("d6i3"),r=n.n(t),s=n("eHn4"),i=n.n(s),p=n("p0pE"),c=n.n(p),o=n("ii38"),u=n("Z2nI"),d=n("n7id"),f="signUpLicenseType",l=Object(d["a"])(f);a["default"]={namespace:f,state:c()({},l),effects:{fetch:r.a.mark(function e(a,n){var t,s,p,d;return r.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=a.payload,s=n.call,p=n.put,e.t0=u["a"],e.next=5,s(o["k"],t);case 5:if(e.t1=e.sent,e.t2=(0,e.t0)(e.t1),d=(0,e.t2)("",""),!d){e.next=11;break}return e.next=11,p({type:"save",payload:i()({},"".concat(f,"TableData"),{params:t.params,list:d.list.map(function(e,a){return c()({key:a+1},e)}),pagination:d.pagination})});case 11:case"end":return e.stop()}},e)})},reducers:{save:function(e,a){return c()({},e,a.payload)}}}}}]);