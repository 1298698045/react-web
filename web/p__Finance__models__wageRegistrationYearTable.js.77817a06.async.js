(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[69],{"2h2c":function(e,t,n){"use strict";n.r(t);var a=n("d6i3"),c=n.n(a),r=n("eHn4"),i=n.n(r),s=n("p0pE"),o=n.n(s),p=n("dCQc"),u=n("n7id"),l=n("Z2nI"),d="financeWageRegistrationYearList",f=Object(u["a"])(d);t["default"]={namespace:d,state:o()({},f),effects:{fetch:c.a.mark(function e(t,n){var a,r,s,u;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.payload,r=n.call,s=n.put,console.log(a),e.t0=l["a"],e.next=6,r(p["C"],o()({},a));case 6:if(e.t1=e.sent,e.t2=(0,e.t0)(e.t1),u=(0,e.t2)("",""),!u){e.next=12;break}return e.next=12,s({type:"save",payload:i()({},"".concat(d,"TableData"),{list:u.list.map(function(e,t){return o()({key:t+1},e)}),pagination:u.pagination})});case 12:case"end":return e.stop()}},e)})},reducers:{save:function(e,t){return o()({},e,t.payload)}}}}}]);