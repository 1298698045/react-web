(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[68],{"iq+q":function(t,a,e){"use strict";e.r(a);var n=e("d6i3"),r=e.n(n),c=e("eHn4"),s=e.n(c),i=e("p0pE"),u=e.n(i),o=e("dCQc"),p=e("n7id"),l=e("Z2nI"),d="financeWageRegistrationList",f=Object(p["a"])(d);a["default"]={namespace:d,state:u()({},f,{total:0}),effects:{fetch:r.a.mark(function t(a,e){var n,c,i,p,f,w,h,m,v;return r.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=a.payload,c=e.call,i=e.put,p=n.params,f=p.month,w=p.year,h={},"-1"!==w&&(h.year=w),"-1"!==f&&(h.month=f),t.t0=l["a"],t.next=9,c(o["A"],{params:u()({},h)});case 9:if(t.t1=t.sent,t.t2=(0,t.t0)(t.t1),m=(0,t.t2)("",""),!m){t.next=15;break}return t.next=15,i({type:"save",payload:(v={},s()(v,"".concat(d,"TableData"),{list:m.list.map(function(t,a){return u()({key:a+1},t)}),pagination:m.pagination}),s()(v,"total",m.total),v)});case 15:case"end":return t.stop()}},t)}),del:r.a.mark(function t(a,e){var n,c;return r.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=a.payload,c=e.call,t.t0=l["a"],t.next=5,c(o["d"],u()({},n));case 5:return t.t1=t.sent,t.t2=(0,t.t0)(t.t1),t.abrupt("return",(0,t.t2)("\u5220\u9664\u6210\u529f\uff01",""));case 8:case"end":return t.stop()}},t)}),getInfo:r.a.mark(function t(a,e){var n,c;return r.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=a.payload,c=e.call,t.t0=l["a"],t.next=5,c(o["B"],u()({},n));case 5:return t.t1=t.sent,t.t2=(0,t.t0)(t.t1),t.abrupt("return",(0,t.t2)("",""));case 8:case"end":return t.stop()}},t)})},reducers:{save:function(t,a){return u()({},t,a.payload)}}}}}]);