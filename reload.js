//     Reload.js 0.1b
//     (c) 2011 Christopher Woodall, Happy Robot Labs.
//     Reload is freely distributable under the MIT license.
//     For all details and documentation:
//     http://github.com/cwoodall/reload-js

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
(function () {
	// # Baseline Setup

	// Define the head to speed up future queries for the head object.
	var head = document.getElementsByTagName('head')[0];
  
	// # Reload it!
	
	// Define base Reload object, everything will be added to this.
	Reload = new function () {
		this.VERSION = "0.1b";
		
		// OPTIONAL: Defines where your library folder is. Leave blank if none is desired.
		// If a library starts with http:// the lib_location will NOT be applied.
		this.lib_location = "";
	
		// OPTIONAL: Defines an array of lib strings. Load these libraries using Reload.load()
		this.libs = [];
	
		// Reload.require(lib, callback) is the base function for loading libraries.
		// This function checks for lib_location, and analyzes the lib string then loads 
		// the libstring and runs the callback function.
		// 
		// TODO: Support for IE6-8
		this.require = function(lib, callback) {
			// Check that lib_location is not a null string and check that the lib string is
			// not an http:// call using a reg exp test.
			if (this.lib_location !== "" && !((/http:\/\/.*/i).test(lib))) {
				// If there is no .js we will add it for you... Because we are nice.
				// 
				// Allows function calls that look like this:
                //  
				//      Reload.require('jquery.min', function () {
				//          $('body').append('Test Success');
				//      });
				//
				// Or with intelligent folder and file naming:  
                //
				//      Reload.requires(['jquery', 'jquery/some_plugin'], function () {
				//          $('body').append('Test Success');
				//      });
				//
				if (!((/.+\.js$/i).test(lib))) {
					lib += ".js";
				}
				lib = this.lib_location + "/" + lib;
			} 

			var script = document.createElement('script');
			script.type = "text/javascript";
			script.src = lib;

			// If the callback function exists define it as the onload function
			if (typeof callback === 'function'){
				script.onload = callback;
			}

			// Append the script into the header
			head.appendChild(script);
		};

		// Require multiple libraries using and array
		this.requires = function(lib_array, callback) {
			// Why would there be 0 or fewer libraries? You are crazy
			if (lib_array.length <= 0) {
				throw "Insufficient Arguments, No Libraries Required";
			} else if (lib_array.length === 1) {
				// When there is one library left we just call require and call the callback
				this.require(lib_array[0], callback);
			} else {
				// get rid of the first element of lib_array and store it in current_lib
				current_lib = lib_array.splice(0,1);
				// Recursively add the libraries starting with the first one (most important)
				// and then moving down to the last one.
				Reload.require(current_lib, function () {
					// Pass along the callback function for future use.
					Reload.requires(lib_array, callback);
				});
			}
		};
	
		// Load up all of the libraries stored in Reload.libs
		// and then callback.
		this.load = function(callback) {
			this.requires(this.libs, callback);
		};
	};
})();
