!function(n){var t={};function e(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return n[i].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=n,e.c=t,e.i=function(n){return n},e.d=function(n,t,i){e.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:i})},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=3)}([function(n,t){n.exports=Backbone},function(n,t){n.exports=_},function(n,t){n.exports=jQuery},function(n,t,e){"use strict";var i=e(0),o=e(1),r=e(2),c=window.HangarAlpha.Components,u=i.View.extend({el:"body",events:{"click .js-ContactLink":"_onClickContactLink"},initialize:function(){this._initViews()},_initViews:function(){this.navbar=new c.Navbar,this.navbarFixed=new c.NavbarFixed({el:this.$(".js-Navbar--fixed"),$header:document.querySelector("#triggerFixed"),after:!0}),this._initDropdowns()},_initDropdowns:function(){o.each(this.$(".js-Dropdown"),function(n){new c.Dropdown({el:r(n)})})}});r(function(){new u})}]);