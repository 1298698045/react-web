(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[116],{lTrz:function(t,e,n){"use strict";n.r(e);var a=n("d6i3"),c=n.n(a),i=n("eHn4"),o=n.n(i),r=n("p0pE"),s=n.n(r),p=n("dCQc"),u=n("n7id"),f=n("Z2nI"),l=n("LvDl"),d=n.n(l),b="studentSignUp",w=Object(u["a"])(b),y=function t(e){Object.keys(e).forEach(function(n){void 0!==e[n]&&null!==e[n]?"object"===typeof e[n]&&t(e[n]):delete e[n]})},k=function(t){Object.keys(t).forEach(function(e){d.a.isEqual(t[e],{})?delete t[e]:"object"===typeof t[e]&&y(t[e])})};e["default"]={namespace:b,state:s()({},w),effects:{fetch:c.a.mark(function t(e,n){var a,i,r,u,l,d;return c.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return a=e.payload,i=n.call,r=n.put,u=a.params,u&&(y(u),k(u)),t.t0=f["a"],t.next=7,i(p["t"],a);case 7:if(t.t1=t.sent,t.t2=(0,t.t0)(t.t1),l=(0,t.t2)("",""),!l){t.next=14;break}return d=l.list.map(function(t,e){return s()({key:e+1},t,t.finance)}),t.next=14,r({type:"save",payload:o()({},"".concat(b,"TableData"),{list:d,pagination:l.pagination})});case 14:case"end":return t.stop()}},t)})},reducers:{save:function(t,e){return s()({},t,e.payload)}}}}}]);