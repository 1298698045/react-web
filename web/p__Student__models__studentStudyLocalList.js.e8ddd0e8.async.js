(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[127],{bfQW:function(t,a,e){"use strict";e.r(a);var n=e("d6i3"),s=e.n(n),r=e("eHn4"),u=e.n(r),c=e("p0pE"),i=e.n(c),p=e("P0WS"),o=e("n7id"),l=e("Z2nI"),d="studentStudyingLocalList",k=Object(o["a"])(d);a["default"]={namespace:d,state:i()({},k),effects:{fetch:s.a.mark(function t(a,e){var n,r,c,o,k;return s.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=a.payload,r=e.call,c=e.put,o=n.params,o.kmStatus&&o.kmStatus.length>0?(o["".concat(o.kmStatus[0],"Status")]=o.kmStatus[1],delete o.kmStatus):o.kmStatus&&0===o.kmStatus.length&&delete o.kmStatus,t.t0=l["a"],t.next=7,r(p["y"],{params:i()({},o,{studentStatus:4,studentType:1}),pagination:n.pagination});case 7:if(t.t1=t.sent,t.t2=(0,t.t0)(t.t1),k=(0,t.t2)("",""),!k){t.next=13;break}return t.next=13,c({type:"save",payload:u()({},"".concat(d,"TableData"),{list:k.list.map(function(t,a){return i()({key:a+1},t)}),pagination:k.pagination})});case 13:case"end":return t.stop()}},t)}),getFee:s.a.mark(function t(a,e){var n,r;return s.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=a.payload,r=e.call,t.t0=l["a"],t.next=5,r(p["w"],n);case 5:return t.t1=t.sent,t.t2=(0,t.t0)(t.t1),t.abrupt("return",(0,t.t2)("",""));case 8:case"end":return t.stop()}},t)})},reducers:{save:function(t,a){return i()({},t,a.payload)}}}}}]);