(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[27],{aBpQ:function(a,e,t){"use strict";t.r(e);var n=t("d6i3"),r=t.n(n),c=t("eHn4"),p=t.n(c),s=t("p0pE"),i=t.n(s),o=t("ii38"),u=t("Z2nI"),d=t("n7id"),f="scoreSite",l=Object(d["a"])(f);e["default"]={namespace:f,state:i()({},l),effects:{fetch:r.a.mark(function a(e,t){var n,c,s,d;return r.a.wrap(function(a){while(1)switch(a.prev=a.next){case 0:return n=e.payload,c=t.call,s=t.put,a.t0=u["a"],a.next=5,c(o["j"],n);case 5:if(a.t1=a.sent,a.t2=(0,a.t0)(a.t1),d=(0,a.t2)("",""),!d){a.next=11;break}return a.next=11,s({type:"save",payload:p()({},"".concat(f,"TableData"),{params:n.params,list:d.map(function(a,e){return i()({key:e+1},a)}),pagination:d.pagination})});case 11:case"end":return a.stop()}},a)})},reducers:{save:function(a,e){return i()({},a,e.payload)}}}}}]);