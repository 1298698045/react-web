(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[166],{"5WY0":function(e,t,r){e.exports={main:"antd-pro-pages-user-register-main",getCaptcha:"antd-pro-pages-user-register-getCaptcha",submit:"antd-pro-pages-user-register-submit",login:"antd-pro-pages-user-register-login",error:"antd-pro-pages-user-register-error",success:"antd-pro-pages-user-register-success",warning:"antd-pro-pages-user-register-warning","progress-pass":"antd-pro-pages-user-register-progress-pass",progress:"antd-pro-pages-user-register-progress"}},cq3J:function(e,t,r){"use strict";r.r(t);r("14J3");var a=r("BMrR"),n=(r("+L6B"),r("2/Rp")),o=(r("jCWc"),r("kPKH")),s=(r("Q9mQ"),r("q1tI")),i=r.n(s),l=r("3S7+"),c=r("wEI+"),p=r("6CfX");function u(e){return u="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function m(){return m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},m.apply(this,arguments)}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function f(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function g(e,t,r){return t&&f(e.prototype,t),r&&f(e,r),e}function v(e,t){return!t||"object"!==u(t)&&"function"!==typeof t?h(e):t}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e){return y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},y(e)}function b(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&w(e,t)}function w(e,t){return w=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},w(e,t)}var E=function(e,t){var r={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(r[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(a=Object.getOwnPropertySymbols(e);n<a.length;n++)t.indexOf(a[n])<0&&Object.prototype.propertyIsEnumerable.call(e,a[n])&&(r[a[n]]=e[a[n]])}return r},O=function(e){function t(){var e;return d(this,t),e=v(this,y(t).apply(this,arguments)),e.saveTooltip=function(t){e.tooltip=t},e.renderPopover=function(t){var r=t.getPrefixCls,a=e.props,n=a.prefixCls,o=E(a,["prefixCls"]);delete o.title;var i=r("popover",n);return s["createElement"](l["a"],m({},o,{prefixCls:i,ref:e.saveTooltip,overlay:e.getOverlay(i)}))},e}return b(t,e),g(t,[{key:"getPopupDomNode",value:function(){return this.tooltip.getPopupDomNode()}},{key:"getOverlay",value:function(e){var t=this.props,r=t.title,a=t.content;return Object(p["a"])(!("overlay"in this.props),"Popover","`overlay` is removed, please use `content` instead, see: https://u.ant.design/popover-content"),s["createElement"]("div",null,r&&s["createElement"]("div",{className:"".concat(e,"-title")},r),s["createElement"]("div",{className:"".concat(e,"-inner-content")},a))}},{key:"render",value:function(){return s["createElement"](c["a"],null,this.renderPopover)}}]),t}(s["Component"]);O.defaultProps={placement:"top",transitionName:"zoom-big",trigger:"hover",mouseEnterDelay:.1,mouseLeaveDelay:.1,overlayStyle:{}};r("MXD1");var j,P,M,S,C=r("CFYs"),k=r("p0pE"),x=r.n(k),N=(r("miYZ"),r("tsqr")),F=r("2Taf"),D=r.n(F),q=r("vZ4D"),z=r.n(q),I=r("l4Ni"),_=r.n(I),T=r("ujKo"),Y=r.n(T),V=r("MhPg"),W=r.n(V),J=(r("5NDa"),r("5rEg")),Q=(r("OaEy"),r("2fM7")),B=(r("y8nQ"),r("Vl3Y")),G=r("MuoO"),K=r("Y2fQ"),L=r("mOP9"),R=r("usdK"),U=r("5WY0"),X=r.n(U),Z=B["a"].Item,A=Q["a"].Option,H=J["a"].Group,$={ok:i.a.createElement("div",{className:X.a.success},i.a.createElement(K["FormattedMessage"],{id:"validation.password.strength.strong"})),pass:i.a.createElement("div",{className:X.a.warning},i.a.createElement(K["FormattedMessage"],{id:"validation.password.strength.medium"})),poor:i.a.createElement("div",{className:X.a.error},i.a.createElement(K["FormattedMessage"],{id:"validation.password.strength.short"}))},ee={ok:"success",pass:"normal",poor:"exception"},te=(j=Object(G["connect"])(function(e){var t=e.register,r=e.loading;return{register:t,submitting:r.effects["register/submit"]}}),P=B["a"].create(),j(M=P((S=function(e){function t(){var e,r;D()(this,t);for(var a=arguments.length,n=new Array(a),o=0;o<a;o++)n[o]=arguments[o];return r=_()(this,(e=Y()(t)).call.apply(e,[this].concat(n))),r.state={count:0,confirmDirty:!1,visible:!1,help:"",prefix:"86"},r.onGetCaptcha=function(){var e=59;r.setState({count:e}),r.interval=setInterval(function(){e-=1,r.setState({count:e}),0===e&&clearInterval(r.interval)},1e3),N["a"].warning(Object(K["formatMessage"])({id:"app.login.verification-code-warning"}))},r.getPasswordStatus=function(){var e=r.props.form,t=e.getFieldValue("password");return t&&t.length>9?"ok":t&&t.length>5?"pass":"poor"},r.handleSubmit=function(e){e.preventDefault();var t=r.props,a=t.form,n=t.dispatch;a.validateFields({force:!0},function(e,t){if(!e){var a=r.state.prefix;n({type:"register/submit",payload:x()({},t,{prefix:a})})}})},r.handleConfirmBlur=function(e){var t=e.target.value,a=r.state.confirmDirty;r.setState({confirmDirty:a||!!t})},r.checkConfirm=function(e,t,a){var n=r.props.form;t&&t!==n.getFieldValue("password")?a(Object(K["formatMessage"])({id:"validation.password.twice"})):a()},r.checkPassword=function(e,t,a){var n=r.state,o=n.visible,s=n.confirmDirty;if(t)if(r.setState({help:""}),o||r.setState({visible:!!t}),t.length<6)a("error");else{var i=r.props.form;t&&s&&i.validateFields(["confirm"],{force:!0}),a()}else r.setState({help:Object(K["formatMessage"])({id:"validation.password.required"}),visible:!!t}),a("error")},r.changePrefix=function(e){r.setState({prefix:e})},r.renderPasswordProgress=function(){var e=r.props.form,t=e.getFieldValue("password"),a=r.getPasswordStatus();return t&&t.length?i.a.createElement("div",{className:X.a["progress-".concat(a)]},i.a.createElement(C["a"],{status:ee[a],className:X.a.progress,strokeWidth:6,percent:10*t.length>100?100:10*t.length,showInfo:!1})):null},r}return W()(t,e),z()(t,[{key:"componentDidUpdate",value:function(){var e=this.props,t=e.form,r=e.register,a=t.getFieldValue("mail");"ok"===r.status&&R["a"].push({pathname:"/user/register-result",state:{account:a}})}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){var e=this.props,t=e.form,r=e.submitting,s=t.getFieldDecorator,l=this.state,c=l.count,p=l.prefix,u=l.help,m=l.visible;return i.a.createElement("div",{className:X.a.main},i.a.createElement("h3",null,i.a.createElement(K["FormattedMessage"],{id:"app.register.register"})),i.a.createElement(B["a"],{onSubmit:this.handleSubmit},i.a.createElement(Z,null,s("mail",{rules:[{required:!0,message:Object(K["formatMessage"])({id:"validation.email.required"})},{type:"email",message:Object(K["formatMessage"])({id:"validation.email.wrong-format"})}]})(i.a.createElement(J["a"],{size:"large",placeholder:Object(K["formatMessage"])({id:"form.email.placeholder"})}))),i.a.createElement(Z,{help:u},i.a.createElement(O,{getPopupContainer:function(e){return e.parentNode},content:i.a.createElement("div",{style:{padding:"4px 0"}},$[this.getPasswordStatus()],this.renderPasswordProgress(),i.a.createElement("div",{style:{marginTop:10}},i.a.createElement(K["FormattedMessage"],{id:"validation.password.strength.msg"}))),overlayStyle:{width:240},placement:"right",visible:m},s("password",{rules:[{validator:this.checkPassword}]})(i.a.createElement(J["a"],{size:"large",type:"password",placeholder:Object(K["formatMessage"])({id:"form.password.placeholder"})})))),i.a.createElement(Z,null,s("confirm",{rules:[{required:!0,message:Object(K["formatMessage"])({id:"validation.confirm-password.required"})},{validator:this.checkConfirm}]})(i.a.createElement(J["a"],{size:"large",type:"password",placeholder:Object(K["formatMessage"])({id:"form.confirm-password.placeholder"})}))),i.a.createElement(Z,null,i.a.createElement(H,{compact:!0},i.a.createElement(Q["a"],{size:"large",value:p,onChange:this.changePrefix,style:{width:"20%"}},i.a.createElement(A,{value:"86"},"+86"),i.a.createElement(A,{value:"87"},"+87")),s("mobile",{rules:[{required:!0,message:Object(K["formatMessage"])({id:"validation.phone-number.required"})},{pattern:/^\d{11}$/,message:Object(K["formatMessage"])({id:"validation.phone-number.wrong-format"})}]})(i.a.createElement(J["a"],{size:"large",style:{width:"80%"},placeholder:Object(K["formatMessage"])({id:"form.phone-number.placeholder"})})))),i.a.createElement(Z,null,i.a.createElement(a["a"],{gutter:8},i.a.createElement(o["a"],{span:16},s("captcha",{rules:[{required:!0,message:Object(K["formatMessage"])({id:"validation.verification-code.required"})}]})(i.a.createElement(J["a"],{size:"large",placeholder:Object(K["formatMessage"])({id:"form.verification-code.placeholder"})}))),i.a.createElement(o["a"],{span:8},i.a.createElement(n["a"],{size:"large",disabled:c,className:X.a.getCaptcha,onClick:this.onGetCaptcha},c?"".concat(c," s"):Object(K["formatMessage"])({id:"app.register.get-verification-code"}))))),i.a.createElement(Z,null,i.a.createElement(n["a"],{size:"large",loading:r,className:X.a.submit,type:"primary",htmlType:"submit"},i.a.createElement(K["FormattedMessage"],{id:"app.register.register"})),i.a.createElement(L["a"],{className:X.a.login,to:"/User/Login"},i.a.createElement(K["FormattedMessage"],{id:"app.register.sign-in"})))))}}]),t}(s["Component"]),M=S))||M)||M);t["default"]=te}}]);