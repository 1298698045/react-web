(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[74],{fAUi:function(t,a,e){"use strict";e.r(a);var n=e("d6i3"),s=e.n(n),c=e("eHn4"),r=e.n(c),i=e("p0pE"),p=e.n(i),o=e("qEDA"),u=e("n7id"),f=e("Z2nI"),l=(e("b0hJ"),"assembleStatistics"),d=Object(u["a"])(l);a["default"]={namespace:l,state:p()({},d),effects:{fetch:s.a.mark(function t(a,e){var n,c,i,u;return s.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=a.payload,c=e.call,i=e.put,t.t0=f["c"],t.next=5,c(o["o"],Object(f["b"])(p()({},n)));case 5:if(t.t1=t.sent,t.t2=(0,t.t0)(t.t1),t.t3=(0,t.t2)("item"),u=(0,t.t3)(),!u){t.next=12;break}return t.next=12,i({type:"save",payload:r()({},"".concat(l,"TableData"),{params:n.params,list:u.list.map(function(t,a){return p()({key:a+1},t)}),pagination:u.pagination})});case 12:case"end":return t.stop()}},t)})},reducers:{save:function(t,a){return p()({},t,a.payload)}}}}}]);