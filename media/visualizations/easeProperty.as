//easeProperty is a generic function for easing any property over time
//utilizing Robert Penner's Math easing equations
//p: which property to ease
//f: final value for property
//d: duration of the transition
//e: which easing function to use (optional, default is easeOutQuad)

class easeProperty {
	public function easeProperty(scope, p, f, d, e, oc, cs) {
		if (scope["propInt_"+p]) {
			clearInterval(scope["propInt_"+p]);
			//clear the interval
			delete scope["propInt_"+p];
		}
		//if no callback scope, set it to the same as the caller                                                 
		if (cs == undefined) {
			cs = scope;
		}
		//set a default easing equation                                                   
		if (e == undefined) {
			e = "easeInOutCubic";
		}
		scope["f"+p] = f;
		scope["s"+p] = scope["t"+p]=getTimer();
		//set our start time and our current time
		scope["b"+p] = Math.floor(Number(scope[p].toString(10)));
		scope["c"+p] = scope["f"+p]-scope["b"+p];
		scope["d"+p] = d;
		//implementing easeProperty with multiple setIntervals enables any number of
		//properties to be simultaneously manipulated
		scope["propInt_"+p] = setInterval(_root.easer, 20, scope, p, e, oc, cs, f);
	}
}