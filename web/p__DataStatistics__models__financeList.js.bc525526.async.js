(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[14],{MoJh:function(t,e,a){"use strict";a.r(e);var n=a("d6i3"),o=a.n(n),i=a("eHn4"),r=a.n(i),c=a("p0pE"),d=a.n(c),s=a("ii38"),p=a("Z2nI"),u=a("n7id"),l="financeList",I=Object(u["a"])(l);e["default"]={namespace:l,state:d()({},I),effects:{fetch:o.a.mark(function t(e,a){var n,i,c,u,I;return o.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.payload,i=a.call,c=a.put,t.t0=p["a"],t.next=5,i(s["h"],n);case 5:return t.t1=t.sent,t.t2=(0,t.t0)(t.t1),u=(0,t.t2)("",""),I=[{siteId:1,departId:1,incomeTotal:5e4,outTotal:2e4},{siteId:2,departId:33,incomeTotal:1e5,outTotal:5e4},{siteId:9,departId:7,incomeTotal:12e4,outTotal:5e4},{siteId:10,departId:28,incomeTotal:15e4,outTotal:5e4},{siteId:13,departId:27,incomeTotal:8e4,outTotal:2e4},{siteId:19,departId:29,incomeTotal:7e4,outTotal:3e4}],t.next=11,c({type:"save",payload:r()({},"".concat(l,"TableData"),{params:n.params,list:I.map(function(t,e){return d()({key:e+1},t)}),pagination:u.pagination})});case 11:case"end":return t.stop()}},t)})},reducers:{save:function(t,e){return d()({},t,e.payload)}}}}}]);