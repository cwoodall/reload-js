// Reload.js 0.1b
// (c) 2011 Christopher Woodall, Happy Robot Labs.
// Reload is freely distributable under the MIT license.
// For all details and documentation:
// http://github.com/cwoodall/reload-js
(function(){var d=document.getElementsByTagName("head")[0];Reload=new function(){this.VERSION="0.1b";this.lib_location="";this.libs=[];this.require=function(a,b){this.lib_location!==""&&!/http:\/\/.*/i.test(a)&&(/.+\.js$/i.test(a)||(a+=".js"),a=this.lib_location+"/"+a);var c=document.createElement("script");c.type="text/javascript";c.src=a;if(typeof b==="function")c.onload=b;d.appendChild(c)};this.requires=function(a,b){if(a.length<=0)throw"Insufficient Arguments, No Libraries Required";else a.length===
1?this.require(a[0],b):(current_lib=a.splice(0,1),Reload.require(current_lib,function(){Reload.requires(a,b)}))};this.load=function(a){this.requires(this.libs,a)}}})();
