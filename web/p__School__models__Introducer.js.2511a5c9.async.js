(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[90],{dUxb:function(t,e,a){"use strict";a.r(e);var n=a("d6i3"),r=a.n(n),c=a("eHn4"),s=a.n(c),u=a("p0pE"),p=a.n(u),i=a("Jjpu"),o=a("Plse"),l=a("n7id"),d=a("Z2nI"),f="introducer",w=Object(l["a"])(f);e["default"]={namespace:f,state:p()({},w),effects:{fetch:r.a.mark(function t(e,a){var n,c,u,o;return r.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.payload,c=a.call,u=a.put,t.t0=d["a"],t.next=5,c(i["u"],n);case 5:if(t.t1=t.sent,t.t2=(0,t.t0)(t.t1),o=(0,t.t2)(),!o){t.next=11;break}return t.next=11,u({type:"save",payload:s()({},"".concat(f,"TableData"),{list:o.list.map(function(t,e){return p()({key:e+1},t)}),pagination:o.pagination})});case 11:case"end":return t.stop()}},t)}),saveIntroducer:r.a.mark(function t(e,a){var n,c;return r.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.params,c=a.call,a.put,t.t0=d["a"],t.next=5,c(i["C"],{params:n});case 5:return t.t1=t.sent,t.t2=(0,t.t0)(t.t1),t.t3=o["a"].SAVE,t.abrupt("return",(0,t.t2)(t.t3));case 9:case"end":return t.stop()}},t)}),delIntroducer:r.a.mark(function t(e,a){var n,c;return r.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.params,c=a.call,a.put,t.t0=d["a"],t.next=5,c(i["f"],{params:n});case 5:return t.t1=t.sent,t.t2=(0,t.t0)(t.t1),t.t3=o["a"].DELETE,t.abrupt("return",(0,t.t2)(t.t3));case 9:case"end":return t.stop()}},t)})},reducers:{save:function(t,e){return p()({},t,e.payload)}}}}}]);