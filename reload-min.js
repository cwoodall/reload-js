// Reload.js 0.1b
// (c) 2011 Christopher Woodall, Happy Robot Labs.
// Reload is freely distributable under the MIT license.
// For all details and documentation:
// http://github.com/cwoodall/reload-js

// Reload tries to stay out of your way, besides adding a block. It is a loader, not a 
// versioning system or repository. You are the one responsible for versioning
// and setting up your file system. The more work that is already done the
// faster Reload can work, as such I only included a few features for efficiency.
//
// As a general rule of thumb you will want to structure your library directory in 
// a logical and well defined manner. Most plugins do not follow the same standards,
// as such I don't rely on them. It is up to the maintainer to setup standards.
//
// Support for versioning might be included in a future version of Reload.js
(function(e,d){var f=d.getElementsByTagName("head")[0];Reload=new function(){this.VERSION="0.1";this.lib_location="";this.libs=[];this.require=function(a,b){this.lib_location!==""&&!/http:\/\/.*/i.test(a)&&(/.+\.js$/i.test(a)||(a+=".js"),a=this.lib_location+"/"+a);var c=d.createElement("script");c.type="text/javascript";c.src=a;if(typeof b==="function")c.onload=b;f.appendChild(c)};this.requires=function(a,b){a.length<=0?e.onload=b:a.length===1?this.require(a[0],b):(current_lib=a.splice(0,1),Reload.require(current_lib,
function(){Reload.requires(a,b)}))};this.load=function(a){this.requires(this.libs,a)}}})(window,document);
