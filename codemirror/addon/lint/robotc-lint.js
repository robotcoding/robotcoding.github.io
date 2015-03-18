//Code Mirror Extention made by Ariel Rotter-Aboyoun
//Free to use

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
	"use strict";
	
	var warnings = [ "Missing semicolon", " is not defined" ];


});