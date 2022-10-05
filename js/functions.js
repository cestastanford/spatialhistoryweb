// JavaScript Document



//// UTILITY FUNCTIONS /////

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  
  // remove accents, swap ñ for n, etc
  var from = "ÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛàáäâèéëêìíïîòóöôùúüûÑñÇç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuuaaaaeeeeiiiioooouuuunncc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from[i], "g"), to[i]);
  }

  str = str.replace(/[^a-zA-Z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '_') // collapse whitespace and replace by -
    .toLowerCase();
  return str;
}

function in_array (needle, haystack, argStrict) {
   
    var key = '', strict = !!argStrict;
 
    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    } else {
        for (key in haystack) {
            if (haystack[key] == needle) {
                return true;
            }
        }
    }
 
    return false;
}

function print_r(theObj){
	var out = '';
  if(theObj.constructor == Array ||
     theObj.constructor == Object){
   
   out += ("<ul class = 'debug'>")
    for(var p in theObj){
      if(theObj[p].constructor == Array||
         theObj[p].constructor == Object){
out += ("<li>["+p+"] => "+typeof(theObj)+"</li>");
        out += ("<ul>")
        print_r(theObj[p]);
        out += ("</ul>")
      } else {
out += ("<li>["+p+"] => "+theObj[p]+"</li>");
      }
    }
  	return out;
  }
  
}

function getIndex(obj, array){
	for(var i=0; i<array.length; i++){
		  if(array[i]==obj){
			  return i;
		  }
	  }
	  return -1;
}




//////////////