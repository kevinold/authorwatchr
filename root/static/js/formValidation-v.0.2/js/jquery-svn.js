/*
 * jQuery - New Wave Javascript
 *
 * Copyright (c) 2006 John Resig (jquery.com)
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * $Date: 2006-07-31 01:07:00 +0200 (Mo, 31 Jul 2006) $
 * $Rev: 168 $
 */

// Global undefined variable
window.undefined = window.undefined;

/**
 * Create a new jQuery Object
 * @constructor
 */
function jQuery(a,c) {

	// Initalize the extra macro functions
	if ( !jQuery.initDone ) jQuery.init();

	// Shortcut for document ready (because $(document).each() is silly)
	if ( a && a.constructor == Function && jQuery.fn.ready )
		return jQuery(document).ready(a);

	// Make sure t hat a selection was provided
	a = a || jQuery.context || document;

	/*
 	 * Handle support for overriding other $() functions. Way too many libraries
 	 * provide this function to simply ignore it and overwrite it.
 	 */
	/*
	// Check to see if this is a possible collision case
	if ( jQuery._$ && !c && a.constructor == String && 
      
		// Make sure that the expression is a colliding one
		!/[^a-zA-Z0-9_-]/.test(a) &&
        
		// and that there are no elements that match it
		// (this is the one truly ambiguous case)
		!document.getElementsByTagName(a).length )

			// Use the default method, in case it works some voodoo
			return jQuery._$( a );
	*/

	// Watch for when a jQuery object is passed as the selector
	if ( a.jquery )
		return a;

	// Watch for when a jQuery object is passed at the context
	if ( c && c.jquery )
		return jQuery(c.get()).find(a);
	
	// If the context is global, return a new object
	if ( window == this )
		return new jQuery(a,c);

	// Handle HTML strings
	var m = /^[^<]*(<.+>)[^>]*$/.exec(a);
	if ( m ) a = jQuery.clean( [ m[1] ] );

	// Watch for when an array is passed in
	this.get( a.constructor == Array || a.length && !a.nodeType && a[0] != undefined && a[0].nodeType ?
		// Assume that it is an array of DOM Elements
		jQuery.merge( a, [] ) :

		// Find the matching elements and save them for later
		jQuery.find( a, c ) );

	var fn = arguments[ arguments.length - 1 ];
	if ( fn && fn.constructor == Function )
		this.each(fn);
}

// Map over the $ in case of overwrite
if ( $ )
	jQuery._$ = $;

// Map the jQuery namespace to the '$' one
var $ = jQuery;

jQuery.fn = jQuery.prototype = {
	/**
	 * The current SVN version of jQuery.
	 *
	 * @private
	 * @property
	 * @name jquery
	 * @type String
	 */
	jquery: "$Rev: 168 $",
	
	/**
	 * The number of elements currently matched.
	 *
	 * @example $("img").length;
	 * @before <img src="test1.jpg"/> <img src="test2.jpg"/>
	 * @result 2
	 *
	 * @property
	 * @name length
	 * @type Number
	 */
	
	/**
	 * The number of elements currently matched.
	 *
	 * @example $("img").size();
	 * @before <img src="test1.jpg"/> <img src="test2.jpg"/>
	 * @result 2
	 *
	 * @name size
	 * @type Number
	 */
	size: function() {
		return this.length;
	},
	
	/**
	 * Access all matched elements. This serves as a backwards-compatible
	 * way of accessing all matched elements (other than the jQuery object
	 * itself, which is, in fact, an array of elements).
	 *
	 * @example $("img").get();
	 * @before <img src="test1.jpg"/> <img src="test2.jpg"/>
	 * @result [ <img src="test1.jpg"/> <img src="test2.jpg"/> ]
	 *
	 * @name get
	 * @type Array<Element>
	 */
	 
	/**
	 * Access a single matched element. <tt>num</tt> is used to access the 
	 * <tt>num</tt>th element matched.
	 *
	 * @example $("img").get(1);
	 * @before <img src="test1.jpg"/> <img src="test2.jpg"/>
	 * @result [ <img src="test1.jpg"/> ]
	 *
	 * @name get
	 * @type Element
	 * @param Number num Access the element in the <tt>num</tt>th position.
	 */
	 
	/**
	 * Set the jQuery object to an array of elements.
	 *
	 * @example $("img").get([ document.body ]);
	 * @result $("img").get() == [ document.body ]
	 *
	 * @private
	 * @name get
	 * @type jQuery
	 * @param Elements elems An array of elements
	 */
	get: function( num ) {
		// Watch for when an array (of elements) is passed in
		if ( num && num.constructor == Array ) {

			// Use a tricky hack to make the jQuery object
			// look and feel like an array
			this.length = 0;
			[].push.apply( this, num );
			
			return this;
		} else
			return num == undefined ?

				// Return a 'clean' array
				jQuery.map( this, function(a){ return a } ) :

				// Return just the object
				this[num];
	},

	/**
	 * Execute a function within the context of every matched element.
	 * This means that every time the passed-in function is executed
	 * (which is once for every element matched) the 'this' keyword
	 * points to the specific element.
	 *
	 * Additionally, the function, when executed, is passed a single
	 * argument representing the position of the element in the matched
	 * set.
	 *
	 * @example $("img").each(function(){ this.src = "test.jpg"; });
	 * @before <img/> <img/>
	 * @result <img src="test.jpg"/> <img src="test.jpg"/>
	 *
	 * @name each
	 * @type jQuery
	 * @param Function fn A function to execute
	 */
	each: function( fn, args ) {
		return jQuery.each( this, fn, args );
	},
	
	/**
	 * Access a property on the first matched element.
	 * This method makes it easy to retreive a property value
	 * from the first matched element.
	 *
	 * @example $("img").attr("src");
	 * @before <img src="test.jpg"/>
	 * @result test.jpg
	 *
	 * @name attr
	 * @type Object
	 * @param String name The name of the property to access.
	 */
	 
	/**
	 * Set a hash of key/value object properties to all matched elements.
	 * This serves as the best way to set a large number of properties
	 * on all matched elements.
	 *
	 * @example $("img").attr({ src: "test.jpg", alt: "Test Image" });
	 * @before <img/>
	 * @result <img src="test.jpg" alt="Test Image"/>
	 *
	 * @name attr
	 * @type jQuery
	 * @param Hash prop A set of key/value pairs to set as object properties.
	 */
	 
	/**
	 * Set a single property to a value, on all matched elements.
	 *
	 * @example $("img").attr("src","test.jpg");
	 * @before <img/>
	 * @result <img src="test.jpg"/>
	 *
	 * @name attr
	 * @type jQuery
	 * @param String key The name of the property to set.
	 * @param Object value The value to set the property to.
	 */
	attr: function( key, value, type ) {
		// Check to see if we're setting style values
		return key.constructor != String || value ?
			this.each(function(){
				// See if we're setting a hash of styles
				if ( value == undefined )
					// Set all the styles
					for ( var prop in key )
						jQuery.attr(
							type ? this.style : this,
							prop, key[prop]
						);
				
				// See if we're setting a single key/value style
				else
					jQuery.attr(
						type ? this.style : this,
						key, value
					);
			}) :
			
			// Look for the case where we're accessing a style value
			jQuery[ type || "attr" ]( this[0], key );
	},
	
	/**
	 * Access a style property on the first matched element.
	 * This method makes it easy to retreive a style property value
	 * from the first matched element.
	 *
	 * @example $("p").css("red");
	 * @before <p style="color:red;">Test Paragraph.</p>
	 * @result red
	 *
	 * @name css
	 * @type Object
	 * @param String name The name of the property to access.
	 */
	 
	/**
	 * Set a hash of key/value style properties to all matched elements.
	 * This serves as the best way to set a large number of style properties
	 * on all matched elements.
	 *
	 * @example $("p").css({ color: "red", background: "blue" });
	 * @before <p>Test Paragraph.</p>
	 * @result <p style="color:red; background:blue;">Test Paragraph.</p>
	 *
	 * @name css
	 * @type jQuery
	 * @param Hash prop A set of key/value pairs to set as style properties.
	 */
	 
	/**
	 * Set a single style property to a value, on all matched elements.
	 *
	 * @example $("p").css("color","red");
	 * @before <p>Test Paragraph.</p>
	 * @result <p style="color:red;">Test Paragraph.</p>
	 *
	 * @name css
	 * @type jQuery
	 * @param String key The name of the property to set.
	 * @param Object value The value to set the property to.
	 */
	css: function( key, value ) {
		return this.attr( key, value, "curCSS" );
	},
	
	/**
	 * Retreive the text contents of all matched elements. The result is
	 * a string that contains the combined text contents of all matched
	 * elements. This method works on both HTML and XML documents.
	 *
	 * @example $("p").text();
	 * @before <p>Test Paragraph.</p>
	 * @result Test Paragraph.
	 *
	 * @name text
	 * @type String
	 */
	text: function(e) {
		e = e || this;
		var t = "";
		for ( var j = 0; j < e.length; j++ ) {
			var r = e[j].childNodes;
			for ( var i = 0; i < r.length; i++ )
				t += r[i].nodeType != 1 ?
					r[i].nodeValue : jQuery.fn.text([ r[i] ]);
		}
		return t;
	},
	
	/**
	 * Wrap all matched elements with a structure of other elements.
	 * This wrapping process is most useful for injecting additional
	 * stucture into a document, without ruining the original semantic
	 * qualities of a document.
	 *
	 * The way that is works is that it goes through the first element argument
	 * provided and finds the deepest element within the structure - it is that
	 * element that will en-wrap everything else.
	 *
	 * @example $("p").wrap("<div class='wrap'></div>");
	 * @before <p>Test Paragraph.</p>
	 * @result <div class='wrap'><p>Test Paragraph.</p></div>
	 *
	 * @name wrap
	 * @type jQuery
	 * @any String html A string of HTML, that will be created on the fly and wrapped around the target.
	 * @any Element elem A DOM element that will be wrapped.
	 * @any Array<Element> elems An array of elements, the first of which will be wrapped.
	 * @any Object obj Any object, converted to a string, then a text node.
	 */
	wrap: function() {
		// The elements to wrap the target around
		var a = jQuery.clean(arguments);
		
		// Wrap each of the matched elements individually
		return this.each(function(){
			// Clone the structure that we're using to wrap
			var b = a[0].cloneNode(true);
			
			// Insert it before the element to be wrapped
			this.parentNode.insertBefore( b, this );
			
			// Find he deepest point in the wrap structure
			while ( b.firstChild )
				b = b.firstChild;
			
			// Move the matched element to within the wrap structure
			b.appendChild( this );
		});
	},
	
	/**
	 * Append any number of elements to the inside of all matched elements.
	 * This operation is similar to doing an <tt>appendChild</tt> to all the 
	 * specified elements, adding them into the document.
	 * 
	 * @example $("p").append("<b>Hello</b>");
	 * @before <p>I would like to say: </p>
	 * @result <p>I would like to say: <b>Hello</b></p>
	 *
	 * @name append
	 * @type jQuery
	 * @any String html A string of HTML, that will be created on the fly and appended to the target.
	 * @any Element elem A DOM element that will be appended.
	 * @any Array<Element> elems An array of elements, all of which will be appended.
	 * @any Object obj Any object, converted to a string, then a text node.
	 */
	append: function() {
		return this.domManip(arguments, true, 1, function(a){
			this.appendChild( a );
		});
	},
	
	/**
	 * Prepend any number of elements to the inside of all matched elements.
	 * This operation is the best way to insert a set of elements inside, at the 
	 * beginning, of all the matched element.
	 * 
	 * @example $("p").prepend("<b>Hello</b>");
	 * @before <p>, how are you?</p>
	 * @result <p><b>Hello</b>, how are you?</p>
	 *
	 * @name prepend
	 * @type jQuery
	 * @any String html A string of HTML, that will be created on the fly and prepended to the target.
	 * @any Element elem A DOM element that will be prepended.
	 * @any Array<Element> elems An array of elements, all of which will be prepended.
	 * @any Object obj Any object, converted to a string, then a text node.
	 */
	prepend: function() {
		return this.domManip(arguments, true, -1, function(a){
			this.insertBefore( a, this.firstChild );
		});
	},
	
	/**
	 * Insert any number of elements before each of the matched elements.
	 * 
	 * @example $("p").before("<b>Hello</b>");
	 * @before <p>how are you?</p>
	 * @result <b>Hello</b><p>how are you?</p>
	 *
	 * @name before
	 * @type jQuery
	 * @any String html A string of HTML, that will be created on the fly and inserted.
	 * @any Element elem A DOM element that will beinserted.
	 * @any Array<Element> elems An array of elements, all of which will be inserted.
	 * @any Object obj Any object, converted to a string, then a text node.
	 */
	before: function() {
		return this.domManip(arguments, false, 1, function(a){
			this.parentNode.insertBefore( a, this );
		});
	},
	
	/**
	 * Insert any number of elements after each of the matched elements.
	 * 
	 * @example $("p").after("<p>I'm doing fine.</p>");
	 * @before <p>How are you?</p>
	 * @result <p>How are you?</p><p>I'm doing fine.</p>
	 *
	 * @name after
	 * @type jQuery
	 * @any String html A string of HTML, that will be created on the fly and inserted.
	 * @any Element elem A DOM element that will beinserted.
	 * @any Array<Element> elems An array of elements, all of which will be inserted.
	 * @any Object obj Any object, converted to a string, then a text node.
	 */
	after: function() {
		return this.domManip(arguments, false, -1, function(a){
			this.parentNode.insertBefore( a, this.nextSibling );
		});
	},
	
	/**
	 * End the most recent 'destructive' operation, reverting the list of matched elements
	 * back to its previous state. After an end operation, the list of matched elements will 
	 * revert to the last state of matched elements.
	 *
	 * @example $("p").find("span").end();
	 * @before <p><span>Hello</span>, how are you?</p>
	 * @result $("p").find("span").end() == [ <p>...</p> ]
	 *
	 * @name end
	 * @type jQuery
	 */
	end: function() {
		return this.get( this.stack.pop() );
	},
	
	/**
	 * Searches for all elements that match the specified expression.
	 * This method is the optimal way of finding additional descendant
	 * elements with which to process.
	 *
	 * All searching is done using a jQuery expression. The expression can be 
	 * written using CSS 1-3 Selector syntax, or basic XPath.
	 *
	 * @example $("p").find("span");
	 * @before <p><span>Hello</span>, how are you?</p>
	 * @result $("p").find("span") == [ <span>Hello</span> ]
	 *
	 * @name find
	 * @type jQuery
	 * @param String expr An expression to search with.
	 */
	find: function(t) {
		return this.pushStack( jQuery.map( this, function(a){
			return jQuery.find(t,a);
		}), arguments );
	},
	
	/**
	 * Removes all elements from the set of matched elements that do not 
	 * match the specified expression. This method is used to narrow down
	 * the results of a search.
	 *
	 * All searching is done using a jQuery expression. The expression
	 * can be written using CSS 1-3 Selector syntax, or basic XPath.
	 * 
	 * @example $("p").filter(".selected")
	 * @before <p class="selected">Hello</p><p>How are you?</p>
	 * @result $("p").filter(".selected") == [ <p class="selected">Hello</p> ]
	 *
	 * @name filter
	 * @type jQuery
	 * @param String expr An expression to search with.
	 */

	/**
	 * Removes all elements from the set of matched elements that do not
	 * match at least one of the expressions passed to the function. This 
	 * method is used when you want to filter the set of matched elements 
	 * through more than one expression.
	 *
	 * Elements will be retained in the jQuery object if they match at
	 * least one of the expressions passed.
	 *
	 * @example $("p").filter([".selected", ":first"])
	 * @before <p>Hello</p><p>Hello Again</p><p class="selected">And Again</p>
	 * @result $("p").filter([".selected", ":first"]) == [ <p>Hello</p>, <p class="selected">And Again</p> ]
	 *
	 * @name filter
	 * @type jQuery
	 * @param Array<String> exprs A set of expressions to evaluate against
	 */
	filter: function(t) {
		return this.pushStack(
			t.constructor == Array &&
			jQuery.map(this,function(a){
				for ( var i = 0; i < t.length; i++ )
					if ( jQuery.filter(t[i],[a]).r.length )
						return a;
			}) ||

			t.constructor == Boolean &&
			( t ? this.get() : [] ) ||

			t.constructor == Function &&
			jQuery.grep( this, t ) ||

			jQuery.filter(t,this).r, arguments );
	},
	
	/**
	 * Removes the specified Element from the set of matched elements. This
	 * method is used to remove a single Element from a jQuery object.
	 *
	 * @example $("p").not( document.getElementById("selected") )
	 * @before <p>Hello</p><p id="selected">Hello Again</p>
	 * @result [ <p>Hello</p> ]
	 *
	 * @name not
	 * @type jQuery
	 * @param Element el An element to remove from the set
	 */

	/**
	 * Removes elements matching the specified expression from the set
	 * of matched elements. This method is used to remove one or more
	 * elements from a jQuery object.
	 * 
	 * @example $("p").not("#selected")
	 * @before <p>Hello</p><p id="selected">Hello Again</p>
	 * @result [ <p>Hello</p> ]
	 *
	 * @name not
	 * @type jQuery
	 * @param String expr An expression with which to remove matching elements
	 */
	not: function(t) {
		return this.pushStack( t.constructor == String ?
			jQuery.filter(t,this,false).r :
			jQuery.grep(this,function(a){ return a != t; }), arguments );
	},

	/**
	 * Adds the elements matched by the expression to the jQuery object. This
	 * can be used to concatenate the result sets of two expressions.
	 *
	 * @example $("p").add("span")
	 * @before <p>Hello</p><p><span>Hello Again</span></p>
	 * @result [ <p>Hello</p>, <span>Hello Again</span> ]
	 *
	 * @name add
	 * @type jQuery
	 * @param String expr An expression whose matched elements are added
	 */

	/**
	 * Adds each of the Elements in the array to the set of matched elements.
	 * This is used to add a set of Elements to a jQuery object.
	 *
	 * @example $("p").add([document.getElementById("a"), document.getElementById("b")])
	 * @before <p>Hello</p><p><span id="a">Hello Again</span><span id="b">And Again</span></p>
	 * @result [ <p>Hello</p>, <span id="a">Hello Again</span>, <span id="b">And Again</span> ]
	 *
	 * @name add
	 * @type jQuery
	 * @param Array<Element> els An array of Elements to add
	 */

	/**
	 * Adds a single Element to the set of matched elements. This is used to
	 * add a single Element to a jQuery object.
	 *
	 * @example $("p").add( document.getElementById("a") )
	 * @before <p>Hello</p><p><span id="a">Hello Again</span></p>
	 * @result [ <p>Hello</p>, <span id="a">Hello Again</span> ]
	 *
	 * @name add
	 * @type jQuery
	 * @param Element el An Element to add
	 */
	add: function(t) {
		return this.pushStack( jQuery.merge( this, t.constructor == String ?
			jQuery.find(t) : t.constructor == Array ? t : [t] ), arguments );
	},
	
	/**
	 * A wrapper function for each() to be used by append and prepend.
	 * Handles cases where you're trying to modify the inner contents of
	 * a table, when you actually need to work with the tbody.
	 *
	 * @member jQuery
	 * @param {String} expr The expression with which to filter
	 * @type Boolean
	 */
	is: function(expr) {
		return expr ? jQuery.filter(expr,this).r.length > 0 : this.length > 0;
	},
	
	/**
	 * 
	 *
	 * @private
	 * @name domManip
	 * @param Array args
	 * @param Boolean table
	 * @param Number int
	 * @param Function fn The function doing the DOM manipulation.
	 * @type jQuery
	 */
	domManip: function(args, table, dir, fn){
		var clone = this.size() > 1;
		var a = jQuery.clean(args);
		
		return this.each(function(){
			var obj = this;
			
			if ( table && this.nodeName == "TABLE" ) {
				var tbody = this.getElementsByTagName("tbody");

				if ( !tbody.length ) {
					obj = document.createElement("tbody");
					this.appendChild( obj );
				} else
					obj = tbody[0];
			}

			for ( var i = ( dir < 0 ? a.length - 1 : 0 );
				i != ( dir < 0 ? dir : a.length ); i += dir ) {
					fn.apply( obj, [ clone ? a[i].cloneNode(true) : a[i] ] );
			}
		});
	},
	
	/**
	 * 
	 *
	 * @private
	 * @name pushStack
	 * @param Array a
	 * @param Array args
	 * @type jQuery
	 */
	pushStack: function(a,args) {
		var fn = args && args[args.length-1];

		if ( !fn || fn.constructor != Function ) {
			if ( !this.stack ) this.stack = [];
			this.stack.push( this.get() );
			this.get( a );
		} else {
			var old = this.get();
			this.get( a );
			if ( fn.constructor == Function )
				return this.each( fn );
			this.get( old );
		}

		return this;
	}
};

/**
 * 
 *
 * @private
 * @name extend
 * @param Object obj
 * @param Object prop
 * @type Object
 */
 
/**
 * Extend one object with another, returning the original,
 * modified, object. This is a great utility for simple inheritance.
 *
 * @name $.extend
 * @param Object obj The object to extend
 * @param Object prop The object that will be merged into the first.
 * @type Object
 */
jQuery.extend = jQuery.fn.extend = function(obj,prop) {
	if ( !prop ) { prop = obj; obj = this; }
	for ( var i in prop ) obj[i] = prop[i];
	return obj;
};

jQuery.extend({
	/**
	 * 
	 *
	 * @private
	 * @name init
	 * @type undefined
	 */
	init: function(){
		jQuery.initDone = true;
		
		jQuery.each( jQuery.macros.axis, function(i,n){
			jQuery.fn[ i ] = function(a) {
				var ret = jQuery.map(this,n);
				if ( a && a.constructor == String )
					ret = jQuery.filter(a,ret).r;
				return this.pushStack( ret, arguments );
			};
		});
		
		jQuery.each( jQuery.macros.to, function(i,n){
			jQuery.fn[ i ] = function(){
				var a = arguments;
				return this.each(function(){
					for ( var j = 0; j < a.length; j++ )
						$(a[j])[n]( this );
				});
			};
		});
		
		jQuery.each( jQuery.macros.each, function(i,n){
			jQuery.fn[ i ] = function() {
				return this.each( n, arguments );
			};
		});
		
		jQuery.each( jQuery.macros.attr, function(i,n){
			n = n || i;
			jQuery.fn[ i ] = function(h) {
				return h == undefined ?
					this.length ? this[0][n] : null :
					this.attr( n, h );
			};
		});
	
		jQuery.each( jQuery.macros.css, function(i,n){
			jQuery.fn[ i ] = function(h) {
				return h == undefined ?
					( this.length ? jQuery.css( this[0], n ) : null ) :
					this.css( n, h );
			};
		});
	
	},
	
	/**
	 * A generic iterator function, which can be used to seemlessly
	 * iterate over both objects and arrays.
	 *
	 * @name $.each
	 * @param Object obj The object, or array, to iterate over.
	 * @param Object fn The function that will be executed on every object.
	 * @type Object
	 */
	each: function( obj, fn, args ) {
		if ( obj.length == undefined )
			for ( var i in obj )
				fn.apply( obj[i], args || [i, obj[i]] );
		else
			for ( var i = 0; i < obj.length; i++ )
				fn.apply( obj[i], args || [i, obj[i]] );
		return obj;
	},
	
	className: {
		add: function(o,c){
			if (jQuery.className.has(o,c)) return;
			o.className += ( o.className ? " " : "" ) + c;
		},
		remove: function(o,c){
			o.className = !c ? "" :
				o.className.replace(
					new RegExp("(^|\\s*\\b[^-])"+c+"($|\\b(?=[^-]))", "g"), "");
		},
		has: function(e,a) {
			if ( e.className )
				e = e.className;
			return new RegExp("(^|\\s)" + a + "(\\s|$)").test(e);
		}
	},
	
	/**
	 * Swap in/out style options.
	 * @private
	 */
	swap: function(e,o,f) {
		for ( var i in o ) {
			e.style["old"+i] = e.style[i];
			e.style[i] = o[i];
		}
		f.apply( e, [] );
		for ( var i in o )
			e.style[i] = e.style["old"+i];
	},
	
	css: function(e,p) {
		if ( p == "height" || p == "width" ) {
			var old = {}, oHeight, oWidth, d = ["Top","Bottom","Right","Left"];
	
			for ( var i in d ) {
				old["padding" + d[i]] = 0;
				old["border" + d[i] + "Width"] = 0;
			}
	
			jQuery.swap( e, old, function() {
				if (jQuery.css(e,"display") != "none") {
					oHeight = e.offsetHeight;
					oWidth = e.offsetWidth;
				} else
					jQuery.swap( e, { visibility: "hidden", position: "absolute", display: "" },
						function(){
							oHeight = e.clientHeight;
							oWidth = e.clientWidth;
						});
			});
	
			return p == "height" ? oHeight : oWidth;
		} else if ( p == "opacity" && jQuery.browser.msie )
			return parseFloat(  jQuery.curCSS(e,"filter").replace(/[^0-9.]/,"") ) || 1;

		return jQuery.curCSS( e, p );
	},

	curCSS: function(e,p,force) {
		var r;
	
		if (!force && e.style[p])
			r = e.style[p];
		else if (e.currentStyle) {
			p = p.replace(/\-(\w)/g,function(m,c){return c.toUpperCase()}); 
			r = e.currentStyle[p];
		} else if (document.defaultView && document.defaultView.getComputedStyle) {
			p = p.replace(/([A-Z])/g,"-$1").toLowerCase();
			var s = document.defaultView.getComputedStyle(e,"");
			r = s ? s.getPropertyValue(p) : null;
		}
		
		return r;
	},
	
	clean: function(a) {
		var r = [];
		for ( var i = 0; i < a.length; i++ ) {
			if ( a[i].constructor == String ) {
	
				if ( !a[i].indexOf("<tr") ) {
					var tr = true;
					a[i] = "<table>" + a[i] + "</table>";
				} else if ( !a[i].indexOf("<td") || !a[i].indexOf("<th") ) {
					var td = true;
					a[i] = "<table><tbody><tr>" + a[i] + "</tr></tbody></table>";
				}
	
				var div = document.createElement("div");
				div.innerHTML = a[i];
	
				if ( tr || td ) {
					div = div.firstChild.firstChild;
					if ( td ) div = div.firstChild;
				}
	
				for ( var j = 0; j < div.childNodes.length; j++ )
					r.push( div.childNodes[j] );
			} else if ( a[i].jquery || a[i].length && !a[i].nodeType )
				for ( var k = 0; k < a[i].length; k++ )
					r.push( a[i][k] );
			else if ( a[i] !== null )
				r.push(	a[i].nodeType ? a[i] : document.createTextNode(a[i].toString()) );
		}
		return r;
	},
	
	expr: {
		"": "m[2]== '*'||a.nodeName.toUpperCase()==m[2].toUpperCase()",
		"#": "a.getAttribute('id')&&a.getAttribute('id')==m[2]",
		":": {
			// Position Checks
			lt: "i<m[3]-0",
			gt: "i>m[3]-0",
			nth: "m[3]-0==i",
			eq: "m[3]-0==i",
			first: "i==0",
			last: "i==r.length-1",
			even: "i%2==0",
			odd: "i%2",
			
			// Child Checks
			"first-child": "jQuery.sibling(a,0).cur",
			"last-child": "jQuery.sibling(a,0).last",
			"only-child": "jQuery.sibling(a).length==1",
			
			// Parent Checks
			parent: "a.childNodes.length",
			empty: "!a.childNodes.length",
			
			// Text Check
			contains: "(a.innerText||a.innerHTML).indexOf(m[3])>=0",
			
			// Visibility
			visible: "a.type!='hidden'&&jQuery.css(a,'display')!='none'&&jQuery.css(a,'visibility')!='hidden'",
			hidden: "a.type=='hidden'||jQuery.css(a,'display')=='none'||jQuery.css(a,'visibility')=='hidden'",
			
			// Form elements
			enabled: "!a.disabled",
			disabled: "a.disabled",
			checked: "a.checked",
			selected: "a.selected"
		},
		".": "jQuery.className.has(a,m[2])",
		"@": {
			"=": "z==m[4]",
			"!=": "z!=m[4]",
			"^=": "!z.indexOf(m[4])",
			"$=": "z.substr(z.length - m[4].length,m[4].length)==m[4]",
			"*=": "z.indexOf(m[4])>=0",
			"": "z"
		},
		"[": "jQuery.find(m[2],a).length"
	},
	
	token: [
		"\\.\\.|/\\.\\.", "a.parentNode",
		">|/", "jQuery.sibling(a.firstChild)",
		"\\+", "jQuery.sibling(a).next",
		"~", function(a){
			var r = [];
			var s = jQuery.sibling(a);
			if ( s.n > 0 )
				for ( var i = s.n; i < s.length; i++ )
					r.push( s[i] );
			return r;
		}
	],
	
	find: function( t, context ) {
		// Make sure that the context is a DOM Element
		if ( context && context.nodeType == undefined )
			context = null;
	
		// Set the correct context (if none is provided)
		context = context || jQuery.context || document;
	
		if ( t.constructor != String ) return [t];
	
		if ( !t.indexOf("//") ) {
			context = context.documentElement;
			t = t.substr(2,t.length);
		} else if ( !t.indexOf("/") ) {
			context = context.documentElement;
			t = t.substr(1,t.length);
			// FIX Assume the root element is right :(
			if ( t.indexOf("/") >= 1 )
				t = t.substr(t.indexOf("/"),t.length);
		}
	
		var ret = [context];
		var done = [];
		var last = null;
	
		while ( t.length > 0 && last != t ) {
			var r = [];
			last = t;
	
			t = jQuery.trim(t).replace( /^\/\//i, "" );
			
			var foundToken = false;
			
			for ( var i = 0; i < jQuery.token.length; i += 2 ) {
				var re = new RegExp("^(" + jQuery.token[i] + ")");
				var m = re.exec(t);
				
				if ( m ) {
					r = ret = jQuery.map( ret, jQuery.token[i+1] );
					t = jQuery.trim( t.replace( re, "" ) );
					foundToken = true;
				}
			}
			
			if ( !foundToken ) {
				if ( !t.indexOf(",") || !t.indexOf("|") ) {
					if ( ret[0] == context ) ret.shift();
					done = jQuery.merge( done, ret );
					r = ret = [context];
					t = " " + t.substr(1,t.length);
				} else {
					var re2 = /^([#.]?)([a-z0-9\\*_-]*)/i;
					var m = re2.exec(t);
		
					if ( m[1] == "#" ) {
						// Ummm, should make this work in all XML docs
						var oid = document.getElementById(m[2]);
						r = ret = oid ? [oid] : [];
						t = t.replace( re2, "" );
					} else {
						if ( !m[2] || m[1] == "." ) m[2] = "*";
		
						for ( var i = 0; i < ret.length; i++ )
							r = jQuery.merge( r,
								m[2] == "*" ?
									jQuery.getAll(ret[i]) :
									ret[i].getElementsByTagName(m[2])
							);
					}
				}
			}
	
			if ( t ) {
				var val = jQuery.filter(t,r);
				ret = r = val.r;
				t = jQuery.trim(val.t);
			}
		}
	
		if ( ret && ret[0] == context ) ret.shift();
		done = jQuery.merge( done, ret );
	
		return done;
	},
	
	getAll: function(o,r) {
		r = r || [];
		var s = o.childNodes;
		for ( var i = 0; i < s.length; i++ )
			if ( s[i].nodeType == 1 ) {
				r.push( s[i] );
				jQuery.getAll( s[i], r );
			}
		return r;
	},
	
	attr: function(o,a,v){
		if ( a && a.constructor == String ) {
			var fix = {
				"for": "htmlFor",
				"class": "className",
				"float": "cssFloat"
			};
			
			a = (fix[a] && fix[a].replace && fix[a] || a)
				.replace(/-([a-z])/ig,function(z,b){
					return b.toUpperCase();
				});
			
			if ( v != undefined ) {
				o[a] = v;
				if ( o.setAttribute && a != "disabled" )
					o.setAttribute(a,v);
			}
			
			return o[a] || o.getAttribute && o.getAttribute(a) || "";
		} else
			return "";
	},

	// The regular expressions that power the parsing engine
	parse: [
		// Match: [@value='test'], [@foo]
		[ "\\[ *(@)S *([!*$^=]*) *Q\\]", 1 ],

		// Match: [div], [div p]
		[ "(\\[)Q\\]", 0 ],

		// Match: :contains('foo')
		[ "(:)S\\(Q\\)", 0 ],

		// Match: :even, :last-chlid
		[ "([:.#]*)S", 0 ]
	],
	
	filter: function(t,r,not) {
		// Figure out if we're doing regular, or inverse, filtering
		var g = not !== false ? jQuery.grep :
			function(a,f) {return jQuery.grep(a,f,true);};
		
		while ( t && /^[a-z[({<*:.#]/i.test(t) ) {

			var p = jQuery.parse;

			for ( var i = 0; i < p.length; i++ ) {
				var re = new RegExp( "^" + p[i][0]

					// Look for a string-like sequence
					.replace( 'S', "([a-z*_-][a-z0-9_-]*)" )

					// Look for something (optionally) enclosed with quotes
					.replace( 'Q', " *'?\"?([^'\"]*)'?\"? *" ), "i" );

				var m = re.exec( t );

				if ( m ) {
					// Re-organize the match
					if ( p[i][1] )
						m = ["", m[1], m[3], m[2], m[4]];

					// Remove what we just matched
					t = t.replace( re, "" );

					break;
				}
			}
	
			// :not() is a special case that can be optomized by
			// keeping it out of the expression list
			if ( m[1] == ":" && m[2] == "not" )
				r = jQuery.filter(m[3],r,false).r;
			
			// Otherwise, find the expression to execute
			else {
				var f = jQuery.expr[m[1]];
				if ( f.constructor != String )
					f = jQuery.expr[m[1]][m[2]];
					
				// Build a custom macro to enclose it
				eval("f = function(a,i){" + 
					( m[1] == "@" ? "z=jQuery.attr(a,m[3]);" : "" ) + 
					"return " + f + "}");
				
				// Execute it against the current filter
				r = g( r, f );
			}
		}
	
		// Return an array of filtered elements (r)
		// and the modified expression string (t)
		return { r: r, t: t };
	},
	
	/**
	 * Remove the whitespace from the beginning and end of a string.
	 *
	 * @private
	 * @name $.trim
	 * @type String
	 * @param String str The string to trim.
	 */
	trim: function(t){
		return t.replace(/^\s+|\s+$/g, "");
	},
	
	/**
	 * All ancestors of a given element.
	 *
	 * @private
	 * @name $.parents
	 * @type Array<Element>
	 * @param Element elem The element to find the ancestors of.
	 */
	parents: function(a){
		var b = [];
		var c = a.parentNode;
		while ( c && c != document ) {
			b.push( c );
			c = c.parentNode;
		}
		return b;
	},
	
	/**
	 * All elements on a specified axis.
	 *
	 * @private
	 * @name $.sibling
	 * @type Array
	 * @param Element elem The element to find all the siblings of (including itself).
	 */
	sibling: function(a,n) {
		var type = [];
		var tmp = a.parentNode.childNodes;
		for ( var i = 0; i < tmp.length; i++ ) {
			if ( tmp[i].nodeType == 1 )
				type.push( tmp[i] );
			if ( tmp[i] == a )
				type.n = type.length - 1;
		}
		type.last = type.n == type.length - 1;
		type.cur =
			n == "even" && type.n % 2 == 0 ||
			n == "odd" && type.n % 2 ||
			type[n] == a;
		type.prev = type[type.n - 1];
		type.next = type[type.n + 1];
		return type;
	},
	
	/**
	 * Merge two arrays together, removing all duplicates.
	 *
	 * @private
	 * @name $.merge
	 * @type Array
	 * @param Array a The first array to merge.
	 * @param Array b The second array to merge.
	 */
	merge: function(a,b) {
		var d = [];
		
		// Move b over to the new array (this helps to avoid
		// StaticNodeList instances)
		for ( var k = 0; k < b.length; k++ )
			d[k] = b[k];
	
		// Now check for duplicates between a and b and only
		// add the unique items
		for ( var i = 0; i < a.length; i++ ) {
			var c = true;
			
			// The collision-checking process
			for ( var j = 0; j < b.length; j++ )
				if ( a[i] == b[j] )
					c = false;
				
			// If the item is unique, add it
			if ( c )
				d.push( a[i] );
		}
	
		return d;
	},
	
	/**
	 * Remove items that aren't matched in an array. The function passed
	 * in to this method will be passed two arguments: 'a' (which is the
	 * array item) and 'i' (which is the index of the item in the array).
	 *
	 * @private
	 * @name $.grep
	 * @type Array
	 * @param Array array The Array to find items in.
	 * @param Function fn The function to process each item against.
	 * @param Boolean inv Invert the selection - select the opposite of the function.
	 */
	grep: function(a,f,s) {
		// If a string is passed in for the function, make a function
		// for it (a handy shortcut)
		if ( f.constructor == String )
			f = new Function("a","i","return " + f);
			
		var r = [];
		
		// Go through the array, only saving the items
		// that pass the validator function
		for ( var i = 0; i < a.length; i++ )
			if ( !s && f(a[i],i) || s && !f(a[i],i) )
				r.push( a[i] );
		
		return r;
	},
	
	/**
	 * Translate all items in array to another array of items. The translation function
	 * that is provided to this method is passed one argument: 'a' (the item to be 
	 * translated). If an array is returned, that array is mapped out and merged into
	 * the full array. Additionally, returning 'null' or 'undefined' will delete the item
	 * from the array. Both of these changes imply that the size of the array may not
	 * be the same size upon completion, as it was when it started.
	 *
	 * @private
	 * @name $.map
	 * @type Array
	 * @param Array array The Array to translate.
	 * @param Function fn The function to process each item against.
	 */
	map: function(a,f) {
		// If a string is passed in for the function, make a function
		// for it (a handy shortcut)
		if ( f.constructor == String )
			f = new Function("a","return " + f);
		
		var r = [];
		
		// Go through the array, translating each of the items to their
		// new value (or values).
		for ( var i = 0; i < a.length; i++ ) {
			var t = f(a[i],i);
			if ( t !== null && t != undefined ) {
				if ( t.constructor != Array ) t = [t];
				r = jQuery.merge( t, r );
			}
		}
		return r;
	},
	
	/*
	 * A number of helper functions used for managing events.
	 * Many of the ideas behind this code orignated from Dean Edwards' addEvent library.
	 */
	event: {
	
		// Bind an event to an element
		// Original by Dean Edwards
		add: function(element, type, handler) {
			// For whatever reason, IE has trouble passing the window object
			// around, causing it to be cloned in the process
			if ( jQuery.browser.msie && element.setInterval != undefined )
				element = window;
		
			// Make sure that the function being executed has a unique ID
			if ( !handler.guid )
				handler.guid = this.guid++;
				
			// Init the element's event structure
			if (!element.events)
				element.events = {};
			
			// Get the current list of functions bound to this event
			var handlers = element.events[type];
			
			// If it hasn't been initialized yet
			if (!handlers) {
				// Init the event handler queue
				handlers = element.events[type] = {};
				
				// Remember an existing handler, if it's already there
				if (element["on" + type])
					handlers[0] = element["on" + type];
			}

			// Add the function to the element's handler list
			handlers[handler.guid] = handler;
			
			// And bind the global event handler to the element
			element["on" + type] = this.handle;
	
			// Remember the function in a global list (for triggering)
			if (!this.global[type])
				this.global[type] = [];
			this.global[type].push( element );
		},
		
		guid: 1,
		global: {},
		
		// Detach an event or set of events from an element
		remove: function(element, type, handler) {
			if (element.events)
				if (type && element.events[type])
					if ( handler )
						delete element.events[type][handler.guid];
					else
						for ( var i in element.events[type] )
							delete element.events[type][i];
				else
					for ( var j in element.events )
						this.remove( element, j );
		},
		
		trigger: function(type,data,element) {
			// Touch up the incoming data
			data = data || [];
	
			// Handle a global trigger
			if ( !element ) {
				var g = this.global[type];
				if ( g )
					for ( var i = 0; i < g.length; i++ )
						this.trigger( type, data, g[i] );
	
			// Handle triggering a single element
			} else if ( element["on" + type] ) {
				// Pass along a fake event
				data.unshift( this.fix({ type: type, target: element }) );
	
				// Trigger the event
				element["on" + type].apply( element, data );
			}
		},
		
		handle: function(event) {
			if ( typeof jQuery == "undefined" ) return;

			event = event || jQuery.event.fix( window.event );
	
			// If no correct event was found, fail
			if ( !event ) return;
		
			var returnValue = true;

			var c = this.events[event.type];
		
			for ( var j in c ) {
				if ( c[j].apply( this, [event] ) === false ) {
					event.preventDefault();
					event.stopPropagation();
					returnValue = false;
				}
			}
			
			return returnValue;
		},
		
		fix: function(event) {
			if ( event ) {
				event.preventDefault = function() {
					this.returnValue = false;
				};
			
				event.stopPropagation = function() {
					this.cancelBubble = true;
				};
			}
			
			return event;
		}
	
	}
});

new function() {
	var b = navigator.userAgent.toLowerCase();

	// Figure out what browser is being used
	jQuery.browser = {
		safari: /webkit/.test(b),
		opera: /opera/.test(b),
		msie: /msie/.test(b) && !/opera/.test(b),
		mozilla: /mozilla/.test(b) && !/compatible/.test(b)
	};

	// Check to see if the W3C box model is being used
	jQuery.boxModel = !jQuery.browser.msie || document.compatMode == "CSS1Compat";
};

jQuery.macros = {
	to: {
		/**
		 * Append all of the matched elements to another, specified, set of elements.
		 * This operation is, essentially, the reverse of doing a regular
		 * $(A).append(B), in that instead of appending B to A, you're appending
		 * A to B.
		 * 
		 * @example $("p").appendTo("#foo");
		 * @before <p>I would like to say: </p><div id="foo"></div>
		 * @result <div id="foo"><p>I would like to say: </p></div>
		 *
		 * @name appendTo
		 * @type jQuery
		 * @param String expr A jQuery expression of elements to match.
		 */
		append: "appendTo",
		
		/**
		 * Prepend all of the matched elements to another, specified, set of elements.
		 * This operation is, essentially, the reverse of doing a regular
		 * $(A).prepend(B), in that instead of prepending B to A, you're prepending
		 * A to B.
		 * 
		 * @example $("p").prependTo("#foo");
		 * @before <p>I would like to say: </p><div id="foo"><b>Hello</b></div>
		 * @result <div id="foo"><p>I would like to say: </p><b>Hello</b></div>
		 *
		 * @name prependTo
		 * @type jQuery
		 * @param String expr A jQuery expression of elements to match.
		 */
		prepend: "prependTo",
		
		/**
		 * Insert all of the matched elements before another, specified, set of elements.
		 * This operation is, essentially, the reverse of doing a regular
		 * $(A).before(B), in that instead of inserting B before A, you're inserting
		 * A before B.
		 * 
		 * @example $("p").insertBefore("#foo");
		 * @before <div id="foo">Hello</div><p>I would like to say: </p>
		 * @result <p>I would like to say: </p><div id="foo">Hello</div>
		 *
		 * @name insertBefore
		 * @type jQuery
		 * @param String expr A jQuery expression of elements to match.
		 */
		before: "insertBefore",
		
		/**
		 * Insert all of the matched elements after another, specified, set of elements.
		 * This operation is, essentially, the reverse of doing a regular
		 * $(A).after(B), in that instead of inserting B after A, you're inserting
		 * A after B.
		 * 
		 * @example $("p").insertAfter("#foo");
		 * @before <p>I would like to say: </p><div id="foo">Hello</div>
		 * @result <div id="foo">Hello</div><p>I would like to say: </p>
		 *
		 * @name insertAfter
		 * @type jQuery
		 * @param String expr A jQuery expression of elements to match.
		 */
		after: "insertAfter"
	},
	
	/**
	 * Get the current CSS width of the first matched element.
	 * 
	 * @example $("p").width();
	 * @before <p>This is just a test.</p>
	 * @result "300px"
	 *
	 * @name width
	 * @type String
	 */
	 
	/**
	 * Set the CSS width of every matched element. Be sure to include
	 * the "px" (or other unit of measurement) after the number that you 
	 * specify, otherwise you might get strange results.
	 * 
	 * @example $("p").width("20px");
	 * @before <p>This is just a test.</p>
	 * @result <p style="width:20px;">This is just a test.</p>
	 *
	 * @name width
	 * @type jQuery
	 * @param String val Set the CSS property to the specified value.
	 */
	
	/**
	 * Get the current CSS height of the first matched element.
	 * 
	 * @example $("p").height();
	 * @before <p>This is just a test.</p>
	 * @result "14px"
	 *
	 * @name height
	 * @type String
	 */
	 
	/**
	 * Set the CSS height of every matched element. Be sure to include
	 * the "px" (or other unit of measurement) after the number that you 
	 * specify, otherwise you might get strange results.
	 * 
	 * @example $("p").height("20px");
	 * @before <p>This is just a test.</p>
	 * @result <p style="height:20px;">This is just a test.</p>
	 *
	 * @name height
	 * @type jQuery
	 * @param String val Set the CSS property to the specified value.
	 */
	 
	/**
	 * Get the current CSS top of the first matched element.
	 * 
	 * @example $("p").top();
	 * @before <p>This is just a test.</p>
	 * @result "0px"
	 *
	 * @name top
	 * @type String
	 */
	 
	/**
	 * Set the CSS top of every matched element. Be sure to include
	 * the "px" (or other unit of measurement) after the number that you 
	 * specify, otherwise you might get strange results.
	 * 
	 * @example $("p").top("20px");
	 * @before <p>This is just a test.</p>
	 * @result <p style="top:20px;">This is just a test.</p>
	 *
	 * @name top
	 * @type jQuery
	 * @param String val Set the CSS property to the specified value.
	 */
	 
	/**
	 * Get the current CSS left of the first matched element.
	 * 
	 * @example $("p").left();
	 * @before <p>This is just a test.</p>
	 * @result "0px"
	 *
	 * @name left
	 * @type String
	 */
	 
	/**
	 * Set the CSS left of every matched element. Be sure to include
	 * the "px" (or other unit of measurement) after the number that you 
	 * specify, otherwise you might get strange results.
	 * 
	 * @example $("p").left("20px");
	 * @before <p>This is just a test.</p>
	 * @result <p style="left:20px;">This is just a test.</p>
	 *
	 * @name left
	 * @type jQuery
	 * @param String val Set the CSS property to the specified value.
	 */
	 
	/**
	 * Get the current CSS position of the first matched element.
	 * 
	 * @example $("p").position();
	 * @before <p>This is just a test.</p>
	 * @result "static"
	 *
	 * @name position
	 * @type String
	 */
	 
	/**
	 * Set the CSS position of every matched element.
	 * 
	 * @example $("p").position("relative");
	 * @before <p>This is just a test.</p>
	 * @result <p style="position:relative;">This is just a test.</p>
	 *
	 * @name position
	 * @type jQuery
	 * @param String val Set the CSS property to the specified value.
	 */
	 
	/**
	 * Get the current CSS float of the first matched element.
	 * 
	 * @example $("p").float();
	 * @before <p>This is just a test.</p>
	 * @result "none"
	 *
	 * @name float
	 * @type String
	 */
	 
	/**
	 * Set the CSS float of every matched element.
	 * 
	 * @example $("p").float("left");
	 * @before <p>This is just a test.</p>
	 * @result <p style="float:left;">This is just a test.</p>
	 *
	 * @name float
	 * @type jQuery
	 * @param String val Set the CSS property to the specified value.
	 */
	 
	/**
	 * Get the current CSS overflow of the first matched element.
	 * 
	 * @example $("p").overflow();
	 * @before <p>This is just a test.</p>
	 * @result "none"
	 *
	 * @name overflow
	 * @type String
	 */
	 
	/**
	 * Set the CSS overflow of every matched element.
	 * 
	 * @example $("p").overflow("auto");
	 * @before <p>This is just a test.</p>
	 * @result <p style="overflow:auto;">This is just a test.</p>
	 *
	 * @name overflow
	 * @type jQuery
	 * @param String val Set the CSS property to the specified value.
	 */
	 
	/**
	 * Get the current CSS color of the first matched element.
	 * 
	 * @example $("p").color();
	 * @before <p>This is just a test.</p>
	 * @result "black"
	 *
	 * @name color
	 * @type String
	 */
	 
	/**
	 * Set the CSS color of every matched element.
	 * 
	 * @example $("p").color("blue");
	 * @before <p>This is just a test.</p>
	 * @result <p style="color:blue;">This is just a test.</p>
	 *
	 * @name color
	 * @type jQuery
	 * @param String val Set the CSS property to the specified value.
	 */
	 
	/**
	 * Get the current CSS background of the first matched element.
	 * 
	 * @example $("p").background();
	 * @before <p>This is just a test.</p>
	 * @result ""
	 *
	 * @name background
	 * @type String
	 */
	 
	/**
	 * Set the CSS background of every matched element.
	 * 
	 * @example $("p").background("blue");
	 * @before <p>This is just a test.</p>
	 * @result <p style="background:blue;">This is just a test.</p>
	 *
	 * @name background
	 * @type jQuery
	 * @param String val Set the CSS property to the specified value.
	 */
	
	css: "width,height,top,left,position,float,overflow,color,background".split(","),

	attr: {
		/**
		 * Get the current value of the first matched element.
		 * 
		 * @example $("input").val();
		 * @before <input type="text" value="some text"/>
		 * @result "some text"
		 *
		 * @name val
		 * @type String
		 */
		 
		/**
		 * Set the value of every matched element.
		 * 
		 * @example $("input").value("test");
		 * @before <input type="text" value="some text"/>
		 * @result <input type="text" value="test"/>
		 *
		 * @name val
		 * @type jQuery
		 * @param String val Set the property to the specified value.
		 */
		val: "value",
		
		/**
		 * Get the html contents of the first matched element.
		 * 
		 * @example $("div").html();
		 * @before <div><input/></div>
		 * @result <input/>
		 *
		 * @name html
		 * @type String
		 */
		 
		/**
		 * Set the html contents of every matched element.
		 * 
		 * @example $("div").html("<b>new stuff</b>");
		 * @before <div><input/></div>
		 * @result <div><b>new stuff</b</div>
		 *
		 * @name html
		 * @type jQuery
		 * @param String val Set the html contents to the specified value.
		 */
		html: "innerHTML",
		
		/**
		 * Get the current id of the first matched element.
		 * 
		 * @example $("input").id();
		 * @before <input type="text" id="test" value="some text"/>
		 * @result "test"
		 *
		 * @name id
		 * @type String
		 */
		 
		/**
		 * Set the id of every matched element.
		 * 
		 * @example $("input").id("newid");
		 * @before <input type="text" id="test" value="some text"/>
		 * @result <input type="text" id="newid" value="some text"/>
		 *
		 * @name id
		 * @type jQuery
		 * @param String val Set the property to the specified value.
		 */
		id: null,
		
		/**
		 * Get the current title of the first matched element.
		 * 
		 * @example $("img").title();
		 * @before <img src="test.jpg" title="my image"/>
		 * @result "my image"
		 *
		 * @name title
		 * @type String
		 */
		 
		/**
		 * Set the title of every matched element.
		 * 
		 * @example $("img").title("new title");
		 * @before <img src="test.jpg" title="my image"/>
		 * @result <img src="test.jpg" title="new image"/>
		 *
		 * @name title
		 * @type jQuery
		 * @param String val Set the property to the specified value.
		 */
		title: null,
		
		/**
		 * Get the current name of the first matched element.
		 * 
		 * @example $("input").name();
		 * @before <input type="text" name="username"/>
		 * @result "username"
		 *
		 * @name name
		 * @type String
		 */
		 
		/**
		 * Set the name of every matched element.
		 * 
		 * @example $("input").name("user");
		 * @before <input type="text" name="username"/>
		 * @result <input type="text" name="user"/>
		 *
		 * @name name
		 * @type jQuery
		 * @param String val Set the property to the specified value.
		 */
		name: null,
		
		/**
		 * Get the current href of the first matched element.
		 * 
		 * @example $("a").href();
		 * @before <a href="test.html">my link</a>
		 * @result "test.html"
		 *
		 * @name href
		 * @type String
		 */
		 
		/**
		 * Set the href of every matched element.
		 * 
		 * @example $("a").href("test2.html");
		 * @before <a href="test.html">my link</a>
		 * @result <a href="test2.html">my link</a>
		 *
		 * @name href
		 * @type jQuery
		 * @param String val Set the property to the specified value.
		 */
		href: null,
		
		/**
		 * Get the current src of the first matched element.
		 * 
		 * @example $("img").src();
		 * @before <img src="test.jpg" title="my image"/>
		 * @result "test.jpg"
		 *
		 * @name src
		 * @type String
		 */
		 
		/**
		 * Set the src of every matched element.
		 * 
		 * @example $("img").src("test2.jpg");
		 * @before <img src="test.jpg" title="my image"/>
		 * @result <img src="test2.jpg" title="my image"/>
		 *
		 * @name src
		 * @type jQuery
		 * @param String val Set the property to the specified value.
		 */
		src: null,
		
		/**
		 * Get the current rel of the first matched element.
		 * 
		 * @example $("a").rel();
		 * @before <a href="test.html" rel="nofollow">my link</a>
		 * @result "nofollow"
		 *
		 * @name rel
		 * @type String
		 */
		 
		/**
		 * Set the rel of every matched element.
		 * 
		 * @example $("a").rel("nofollow");
		 * @before <a href="test.html">my link</a>
		 * @result <a href="test.html" rel="nofollow">my link</a>
		 *
		 * @name rel
		 * @type jQuery
		 * @param String val Set the property to the specified value.
		 */
		rel: null
	},
	
	axis: {
		/**
		 * Get a set of elements containing the unique parents of the matched
		 * set of elements.
		 *
		 * @example $("p").parent()
		 * @before <div><p>Hello</p><p>Hello</p></div>
		 * @result [ <div><p>Hello</p><p>Hello</p></div> ]
		 *
		 * @name parent
		 * @type jQuery
		 */

		/**
		 * Get a set of elements containing the unique parents of the matched
		 * set of elements, and filtered by an expression.
		 *
		 * @example $("p").parent(".selected")
		 * @before <div><p>Hello</p></div><div class="selected"><p>Hello Again</p></div>
		 * @result [ <div class="selected"><p>Hello Again</p></div> ]
		 *
		 * @name parent
		 * @type jQuery
		 * @param String expr An expression to filter the parents with
		 */
		parent: "a.parentNode",

		/**
		 * Get a set of elements containing the unique ancestors of the matched
		 * set of elements.
		 *
		 * @example $("span").ancestors()
		 * @before <html><body><div><p><span>Hello</span></p><span>Hello Again</span></div></body></html>
		 * @result [ <body>...</body>, <div>...</div>, <p><span>Hello</span></p> ] 
		 *
		 * @name ancestors
		 * @type jQuery
		 */

		/**
		 * Get a set of elements containing the unique ancestors of the matched
		 * set of elements, and filtered by an expression.
		 *
		 * @example $("span").ancestors("p")
		 * @before <html><body><div><p><span>Hello</span></p><span>Hello Again</span></div></body></html>
		 * @result [ <p><span>Hello</span></p> ] 
		 *
		 * @name ancestors
		 * @type jQuery
		 * @param String expr An expression to filter the ancestors with
		 */
		ancestors: jQuery.parents,
		
		/**
		 * Get a set of elements containing the unique ancestors of the matched
		 * set of elements.
		 *
		 * @example $("span").ancestors()
		 * @before <html><body><div><p><span>Hello</span></p><span>Hello Again</span></div></body></html>
		 * @result [ <body>...</body>, <div>...</div>, <p><span>Hello</span></p> ] 
		 *
		 * @name parents
		 * @type jQuery
		 */

		/**
		 * Get a set of elements containing the unique ancestors of the matched
		 * set of elements, and filtered by an expression.
		 *
		 * @example $("span").ancestors("p")
		 * @before <html><body><div><p><span>Hello</span></p><span>Hello Again</span></div></body></html>
		 * @result [ <p><span>Hello</span></p> ] 
		 *
		 * @name parents
		 * @type jQuery
		 * @param String expr An expression to filter the ancestors with
		 */
		parents: jQuery.parents,

		/**
		 * Get a set of elements containing the unique next siblings of each of the 
		 * matched set of elements.
		 * 
		 * It only returns the very next sibling, not all next siblings.
		 *
		 * @example $("p").next()
		 * @before <p>Hello</p><p>Hello Again</p><div><span>And Again</span></div>
		 * @result [ <p>Hello Again</p>, <div><span>And Again</span></div> ]
		 *
		 * @name next
		 * @type jQuery
		 */

		/**
		 * Get a set of elements containing the unique next siblings of each of the 
		 * matched set of elements, and filtered by an expression.
		 * 
		 * It only returns the very next sibling, not all next siblings.
		 *
		 * @example $("p").next(".selected")
		 * @before <p>Hello</p><p class="selected">Hello Again</p><div><span>And Again</span></div>
		 * @result [ <p class="selected">Hello Again</p> ]
		 *
		 * @name next
		 * @type jQuery
		 * @param String expr An expression to filter the next Elements with
		 */
		next: "jQuery.sibling(a).next",

		/**
		 * Get a set of elements containing the unique previous siblings of each of the 
		 * matched set of elements.
		 * 
		 * It only returns the immediately previous sibling, not all previous siblings.
		 *
		 * @example $("p").previous()
		 * @before <p>Hello</p><div><span>Hello Again</span></div><p>And Again</p>
		 * @result [ <div><span>Hello Again</span></div> ]
		 *
		 * @name prev
		 * @type jQuery
		 */

		/**
		 * Get a set of elements containing the unique previous siblings of each of the 
		 * matched set of elements, and filtered by an expression.
		 * 
		 * It only returns the immediately previous sibling, not all previous siblings.
		 *
		 * @example $("p").previous(".selected")
		 * @before <div><span>Hello</span></div><p class="selected">Hello Again</p><p>And Again</p>
		 * @result [ <div><span>Hello</span></div> ]
		 *
		 * @name prev
		 * @type jQuery
		 * @param String expr An expression to filter the previous Elements with
		 */
		prev: "jQuery.sibling(a).prev",

		/**
		 * Get a set of elements containing all of the unique siblings of each of the 
		 * matched set of elements.
		 * 
		 * @example $("div").siblings()
		 * @before <p>Hello</p><div><span>Hello Again</span></div><p>And Again</p>
		 * @result [ <p>Hello</p>, <p>And Again</p> ]
		 *
		 * @name siblings
		 * @type jQuery
		 */

		/**
		 * Get a set of elements containing all of the unique siblings of each of the 
		 * matched set of elements, and filtered by an expression.
		 *
		 * @example $("div").siblings(".selected")
		 * @before <div><span>Hello</span></div><p class="selected">Hello Again</p><p>And Again</p>
		 * @result [ <p class="selected">Hello Again</p> ]
		 *
		 * @name siblings
		 * @type jQuery
		 * @param String expr An expression to filter the sibling Elements with
		 */
		siblings: jQuery.sibling,
		
		
		/**
		 * Get a set of elements containing all of the unique children of each of the 
		 * matched set of elements.
		 * 
		 * @example $("div").children()
		 * @before <p>Hello</p><div><span>Hello Again</span></div><p>And Again</p>
		 * @result [ <span>Hello Again</span> ]
		 *
		 * @name children
		 * @type jQuery
		 */

		/**
		 * Get a set of elements containing all of the unique siblings of each of the 
		 * matched set of elements, and filtered by an expression.
		 *
		 * @example $("div").children(".selected")
		 * @before <div><span>Hello</span><p class="selected">Hello Again</p><p>And Again</p></div>
		 * @result [ <p class="selected">Hello Again</p> ]
		 *
		 * @name children
		 * @type jQuery
		 * @param String expr An expression to filter the child Elements with
		 */
		children: "a.childNodes"
	},

	each: {
		/**
		 * Displays each of the set of matched elements if they are hidden.
		 * 
		 * @example $("p").show()
		 * @before <p style="display: none">Hello</p>
		 * @result [ <p style="display: block">Hello</p> ]
		 *
		 * @name show
		 * @type jQuery
		 */
		_show: function(){
			this.style.display = this.oldblock ? this.oldblock : "";
			if ( jQuery.css(this,"display") == "none" )
				this.style.display = "block";
		},

		/**
		 * Hides each of the set of matched elements if they are shown.
		 *
		 * @example $("p").hide()
		 * @before <p>Hello</p>
		 * @result [ <p style="display: none">Hello</p> ]
		 *
		 * @name hide
		 * @type jQuery
		 */
		_hide: function(){
			this.oldblock = this.oldblock || jQuery.css(this,"display");
			if ( this.oldblock == "none" )
				this.oldblock = "block";
			this.style.display = "none";
		},
		
		/**
		 * Toggles each of the set of matched elements. If they are shown,
		 * toggle makes them hidden. If they are hidden, toggle
		 * makes them shown.
		 *
		 * @example $("p").toggle()
		 * @before <p>Hello</p><p style="display: none">Hello Again</p>
		 * @result [ <p style="display: none">Hello</p>, <p style="display: block">Hello Again</p> ]
		 *
		 * @name toggle
		 * @type jQuery
		 */
		_toggle: function(){
			var d = jQuery.css(this,"display");
			$(this)[ !d || d == "none" ? "show" : "hide" ]();
		},
		
		/**
		 * Adds the specified class to each of the set of matched elements.
		 *
		 * @example ("p").addClass("selected")
		 * @before <p>Hello</p>
		 * @result [ <p class="selected">Hello</p> ]
		 * 
		 * @name addClass
		 * @type jQuery
		 * @param String class A CSS class to add to the elements
		 */
		addClass: function(c){
			jQuery.className.add(this,c);
		},
		
		/**
		 * The opposite of addClass. Removes the specified class from the
		 * set of matched elements.
		 *
		 * @example ("p").removeClass("selected")
		 * @before <p class="selected">Hello</p>
		 * @result [ <p>Hello</p> ]
		 *
		 * @name removeClass
		 * @type jQuery
		 * @param String class A CSS class to remove from the elements
		 */
		removeClass: function(c){
			jQuery.className.remove(this,c);
		},
	
		/**
		 * Adds the specified class if it is present. Remove it if it is
		 * not present.
		 *
		 * @example ("p").toggleClass("selected")
		 * @before <p>Hello</p><p class="selected">Hello Again</p>
		 * @result [ <p class="selected">Hello</p>, <p>Hello Again</p> ]
		 *
		 * @name toggleClass
		 * @type jQuery
		 * @param String class A CSS class with which to toggle the elements
		 */
		toggleClass: function( c ){
			jQuery.className[ jQuery.className.has(this,c) ? "remove" : "add" ](this,c);
		},
		
		/**
		 * TODO: Document
		 */
		remove: function(a){
			if ( !a || jQuery.filter( [this], a ).r )
				this.parentNode.removeChild( this );
		},
	
		/**
		 * Removes all child nodes from the set of matched elements.
		 *
		 * @example ("p").empty()
		 * @before <p>Hello, <span>Person</span> <a href="#">and person</a></p>
		 * @result [ <p></p> ]
		 *
		 * @name empty
		 * @type jQuery
		 */
		empty: function(){
			while ( this.firstChild )
				this.removeChild( this.firstChild );
		},
		
		/**
		 * Binds a particular event (like click) to a each of a set of match elements.
		 *
		 * @example $("p").bind( "click", function() { alert("Hello"); } )
		 * @before <p>Hello</p>
		 * @result [ <p>Hello</p> ]
		 *
		 * Cancel a default action and prevent it from bubbling by returning false
		 * from your function.
		 *
		 * @example $("form").bind( "submit", function() { return false; } )
		 *
		 * Cancel a default action by using the preventDefault method.
		 *
		 * @example $("form").bind( "submit", function() { e.preventDefault(); } )
		 *
		 * Stop an event from bubbling by using the stopPropogation method.
		 *
		 * @example $("form").bind( "submit", function() { e.stopPropogation(); } )
		 *
		 * @name bind
		 * @type jQuery
		 * @param String type An event type
		 * @param Function fn A function to bind to the event on each of the set of matched elements
		 */
		bind: function( type, fn ) {
			if ( fn.constructor == String )
				fn = new Function("e", ( !fn.indexOf(".") ? "$(this)" : "return " ) + fn);
			jQuery.event.add( this, type, fn );
		},
		
		/**
		 * The opposite of bind, removes a bound event from each of the matched
		 * elements. You must pass the identical function that was used in the original 
		 * bind method.
		 *
		 * @example $("p").unbind( "click", function() { alert("Hello"); } )
		 * @before <p onclick="alert('Hello');">Hello</p>
		 * @result [ <p>Hello</p> ]
		 *
		 * @name unbind
		 * @type jQuery
		 * @param String type An event type
		 * @param Function fn A function to unbind from the event on each of the set of matched elements
		 */
		 
		/**
		 * Removes all bound events of a particular type from each of the matched
		 * elements.
		 *
		 * @example $("p").unbind( "click" )
		 * @before <p onclick="alert('Hello');">Hello</p>
		 * @result [ <p>Hello</p> ]
		 *
		 * @name unbind
		 * @type jQuery
		 * @param String type An event type
		 */
		 
		/**
		 * Removes all bound events from each of the matched elements.
		 *
		 * @example $("p").unbind()
		 * @before <p onclick="alert('Hello');">Hello</p>
		 * @result [ <p>Hello</p> ]
		 *
		 * @name unbind
		 * @type jQuery
		 */
		unbind: function( type, fn ) {
			jQuery.event.remove( this, type, fn );
		},
		
		/**
		 * Trigger a type of event on every matched element.
		 *
		 * @example $("p").trigger("click")
		 * @before <p click="alert('hello')">Hello</p>
		 * @result alert('hello')
		 *
		 * @name trigger
		 * @type jQuery
		 * @param String type An event type to trigger.
		 */
		trigger: function( type, data ) {
			jQuery.event.trigger( type, data, this );
		}
	}
};
jQuery.fn.extend({

	// overwrite the old show method
	//_show: jQuery.fn.show,
	
	/**
	 * Show all matched elements using a graceful animation.
	 * The height, width, and opacity of each of the matched elements 
	 * are changed dynamically according to the specified speed.
	 *
	 * @example $("p").show("slow");
	 *
	 * @name show
	 * @type jQuery
	 * @param Object speed A string representing one of the three predefined speeds ("slow", "normal", or "fast") or the number of milliseconds to run the animation (e.g. 1000).
	 */
	 
	/**
	 * Show all matched elements using a graceful animation and firing a callback
	 * function after completion.
	 * The height, width, and opacity of each of the matched elements 
	 * are changed dynamically according to the specified speed.
	 *
	 * @example $("p").show("slow",function(){
	 *   alert("Animation Done.");
	 * });
	 *
	 * @name show
	 * @type jQuery
	 * @param Object speed A string representing one of the three predefined speeds ("slow", "normal", or "fast") or the number of milliseconds to run the animation (e.g. 1000).
	 * @param Function callback A function to be executed whenever the animation completes.
	 */
	show: function(speed,callback){
		return speed ? this.animate({
			height: "show", width: "show", opacity: "show"
		}, speed, callback) : this._show();
	},
	
	// Overwrite the old hide method
	//_hide: jQuery.fn.hide,
	
	/**
	 * Hide all matched elements using a graceful animation.
	 * The height, width, and opacity of each of the matched elements 
	 * are changed dynamically according to the specified speed.
	 *
	 * @example $("p").hide("slow");
	 *
	 * @name hide
	 * @type jQuery
	 * @param Object speed A string representing one of the three predefined speeds ("slow", "normal", or "fast") or the number of milliseconds to run the animation (e.g. 1000).
	 */
	 
	/**
	 * Hide all matched elements using a graceful animation and firing a callback
	 * function after completion.
	 * The height, width, and opacity of each of the matched elements 
	 * are changed dynamically according to the specified speed.
	 *
	 * @example $("p").hide("slow",function(){
	 *   alert("Animation Done.");
	 * });
	 *
	 * @name hide
	 * @type jQuery
	 * @param Object speed A string representing one of the three predefined speeds ("slow", "normal", or "fast") or the number of milliseconds to run the animation (e.g. 1000).
	 * @param Function callback A function to be executed whenever the animation completes.
	 */
	hide: function(speed,callback){
		return speed ? this.animate({
			height: "hide", width: "hide", opacity: "hide"
		}, speed, callback) : this._hide();
	},
	
	/**
	 * Reveal all matched elements by adjusting their height.
	 * Only the height is adjusted for this animation, causing all matched
	 * elements to be revealed in a "sliding" manner.
	 *
	 * @example $("p").slideDown("slow");
	 *
	 * @name slideDown
	 * @type jQuery
	 * @param Object speed A string representing one of the three predefined speeds ("slow", "normal", or "fast") or the number of milliseconds to run the animation (e.g. 1000).
	 */
	 
	/**
	 * Reveal all matched elements by adjusting their height and firing a callback
	 * function after completion.
	 * Only the height is adjusted for this animation, causing all matched
	 * elements to be revealed in a "sliding" manner.
	 *
	 * @example $("p").slideDown("slow",function(){
	 *   alert("Animation Done.");
	 * });
	 *
	 * @name slideDown
	 * @type jQuery
	 * @param Object speed A string representing one of the three predefined speeds ("slow", "normal", or "fast") or the number of milliseconds to run the animation (e.g. 1000).
	 * @param Function callback A function to be executed whenever the animation completes.
	 */
	slideDown: function(speed,callback){
		return this.animate({height: "show"}, speed, callback);
	},
	
	/**
	 * Hide all matched elements by adjusting their height.
	 * Only the height is adjusted for this animation, causing all matched
	 * elements to be hidden in a "sliding" manner.
	 *
	 * @example $("p").slideUp("slow");
	 *
	 * @name slideUp
	 * @type jQuery
	 * @param Object speed A string representing one of the three predefined speeds ("slow", "normal", or "fast") or the number of milliseconds to run the animation (e.g. 1000).
	 */
	 
	/**
	 * Hide all matched elements by adjusting their height and firing a callback
	 * function after completion.
	 * Only the height is adjusted for this animation, causing all matched
	 * elements to be hidden in a "sliding" manner.
	 *
	 * @example $("p").slideUp("slow",function(){
	 *   alert("Animation Done.");
	 * });
	 *
	 * @name slideUp
	 * @type jQuery
	 * @param Object speed A string representing one of the three predefined speeds ("slow", "normal", or "fast") or the number of milliseconds to run the animation (e.g. 1000).
	 * @param Function callback A function to be executed whenever the animation completes.
	 */
	slideUp: function(speed,callback){
		return this.animate({height: "hide"}, speed, callback);
	},
	
	/**
	 * Fade in all matched elements by adjusting their opacity.
	 * Only the opacity is adjusted for this animation, meaning that
	 * all of the matched elements should already have some form of height
	 * and width associated with them.
	 *
	 * @example $("p").fadeIn("slow");
	 *
	 * @name fadeIn
	 * @type jQuery
	 * @param Object speed A string representing one of the three predefined speeds ("slow", "normal", or "fast") or the number of milliseconds to run the animation (e.g. 1000).
	 */
	 
	/**
	 * Fade in all matched elements by adjusting their opacity and firing a 
	 * callback function after completion.
	 * Only the opacity is adjusted for this animation, meaning that
	 * all of the matched elements should already have some form of height
	 * and width associated with them.
	 *
	 * @example $("p").fadeIn("slow",function(){
	 *   alert("Animation Done.");
	 * });
	 *
	 * @name fadeIn
	 * @type jQuery
	 * @param Object speed A string representing one of the three predefined speeds ("slow", "normal", or "fast") or the number of milliseconds to run the animation (e.g. 1000).
	 * @param Function callback A function to be executed whenever the animation completes.
	 */
	fadeIn: function(speed,callback){
		return this.animate({opacity: "show"}, speed, callback);
	},
	
	/**
	 * Fade out all matched elements by adjusting their opacity.
	 * Only the opacity is adjusted for this animation, meaning that
	 * all of the matched elements should already have some form of height
	 * and width associated with them.
	 *
	 * @example $("p").fadeOut("slow");
	 *
	 * @name fadeOut
	 * @type jQuery
	 * @param Object speed A string representing one of the three predefined speeds ("slow", "normal", or "fast") or the number of milliseconds to run the animation (e.g. 1000).
	 */
	 
	/**
	 * Fade out all matched elements by adjusting their opacity and firing a 
	 * callback function after completion.
	 * Only the opacity is adjusted for this animation, meaning that
	 * all of the matched elements should already have some form of height
	 * and width associated with them.
	 *
	 * @example $("p").fadeOut("slow",function(){
	 *   alert("Animation Done.");
	 * });
	 *
	 * @name fadeOut
	 * @type jQuery
	 * @param Object speed A string representing one of the three predefined speeds ("slow", "normal", or "fast") or the number of milliseconds to run the animation (e.g. 1000).
	 * @param Function callback A function to be executed whenever the animation completes.
	 */
	fadeOut: function(speed,callback){
		return this.animate({opacity: "hide"}, speed, callback);
	},
	
	/**
	 * Fade the opacity of all matched elements to a specified opacity.
	 * Only the opacity is adjusted for this animation, meaning that
	 * all of the matched elements should already have some form of height
	 * and width associated with them.
	 *
	 * @example $("p").fadeTo("slow", 0.5);
	 *
	 * @name fadeTo
	 * @type jQuery
	 * @param Object speed A string representing one of the three predefined speeds ("slow", "normal", or "fast") or the number of milliseconds to run the animation (e.g. 1000).
	 * @param Number opacity The opacity to fade to (a number from 0 to 1).
	 */
	 
	/**
	 * Fade the opacity of all matched elements to a specified opacity and 
	 * firing a callback function after completion.
	 * Only the opacity is adjusted for this animation, meaning that
	 * all of the matched elements should already have some form of height
	 * and width associated with them.
	 *
	 * @example $("p").fadeTo("slow", 0.5, function(){
	 *   alert("Animation Done.");
	 * });
	 *
	 * @name fadeTo
	 * @type jQuery
	 * @param Object speed A string representing one of the three predefined speeds ("slow", "normal", or "fast") or the number of milliseconds to run the animation (e.g. 1000).
	 * @param Number opacity The opacity to fade to (a number from 0 to 1).
	 * @param Function callback A function to be executed whenever the animation completes.
	 */
	fadeTo: function(speed,to,callback){
		return this.animate({opacity: to}, speed, callback);
	},
	
	/**
	 * @private
	 */
	animate: function(prop,speed,callback) {
		return this.queue(function(){
			var i = 0;
			for ( var p in prop ) {
				var e = new jQuery.fx( this, jQuery.speed(speed,callback,i++), p );
				if ( prop[p].constructor == Number )
					e.custom( e.cur(), prop[p] );
				else
					e[ prop[p] ]( prop );
			}
		});
	},
	
	/**
	 *
	 * @private
	 */
	queue: function(type,fn){
		if ( !fn ) {
			fn = type;
			type = "fx";
		}
	
		return this.each(function(){
			if ( !this.queue )
				this.queue = {};
	
			if ( !this.queue[type] )
				this.queue[type] = [];
	
			this.queue[type].push( fn );
		
			if ( this.queue[type].length == 1 )
				fn.apply(this);
		});
	}

});

jQuery.extend({

	setAuto: function(e,p) {
		if ( e.notAuto ) return;

		if ( p == "height" && e.scrollHeight != parseInt(jQuery.curCSS(e,p)) ) return;
		if ( p == "width" && e.scrollWidth != parseInt(jQuery.curCSS(e,p)) ) return;

		// Remember the original height
		var a = e.style[p];

		// Figure out the size of the height right now
		var o = jQuery.curCSS(e,p,1);

		if ( p == "height" && e.scrollHeight != o ||
			p == "width" && e.scrollWidth != o ) return;

		// Set the height to auto
		e.style[p] = e.currentStyle ? "" : "auto";

		// See what the size of "auto" is
		var n = jQuery.curCSS(e,p,1);

		// Revert back to the original size
		if ( o != n && n != "auto" ) {
			e.style[p] = a;
			e.notAuto = true;
		}
	},
	
	speed: function(s,o,i) {
		o = o || {};
		
		if ( o.constructor == Function )
			o = { complete: o };
		
		var ss = { slow: 600, fast: 200 };
		o.duration = (s && s.constructor == Number ? s : ss[s]) || 400;
	
		// Queueing
		o.oldComplete = o.complete;
		o.complete = function(){
			jQuery.dequeue(this, "fx");
			if ( o.oldComplete && o.oldComplete.constructor == Function )
				o.oldComplete.apply( this );
		};
		
		if ( i > 0 )
			o.complete = null;
	
		return o;
	},
	
	queue: {},
	
	dequeue: function(elem,type){
		type = type || "fx";
	
		if ( elem.queue && elem.queue[type] ) {
			// Remove self
			elem.queue[type].shift();
	
			// Get next function
			var f = elem.queue[type][0];
		
			if ( f ) f.apply( elem );
		}
	},

	/*
	 * I originally wrote fx() as a clone of moo.fx and in the process
	 * of making it small in size the code became illegible to sane
	 * people. You've been warned.
	 */
	
	fx: function( elem, options, prop ){
	
		var z = this;
	
		// The users options
		z.o = {
			duration: options.duration || 400,
			complete: options.complete
		};
	
		// The element
		z.el = elem;
	
		// The styles
		var y = z.el.style;
	
		// Simple function for setting a style value
		z.a = function(){
			if ( prop == "opacity" ) {
				if (z.now == 1) z.now = 0.9999;
				if (window.ActiveXObject)
					y.filter = "alpha(opacity=" + z.now*100 + ")";
				else
					y.opacity = z.now;

			// My hate for IE will never die
			} else if ( parseInt(z.now) )
				y[prop] = parseInt(z.now) + "px";
			y.display = "block";
		};
	
		// Figure out the maximum number to run to
		z.max = function(){
			return parseFloat( jQuery.css(z.el,prop) );
		};
	
		// Get the current size
		z.cur = function(){
			return parseFloat( jQuery.curCSS(z.el, prop) ) || z.max();
		};
	
		// Start an animation from one number to another
		z.custom = function(from,to){
			z.startTime = (new Date()).getTime();
			z.now = from;
			z.a();
	
			z.timer = setInterval(function(){
				z.step(from, to);
			}, 13);
		};
	
		// Simple 'show' function
		z.show = function( p ){
			if ( !z.el.orig ) z.el.orig = {};

			// Remember where we started, so that we can go back to it later
			z.el.orig[prop] = this.cur();

			z.custom( 0, z.el.orig[prop] );

			// Stupid IE, look what you made me do
			if ( prop != "opacity" )
				y[prop] = "1px";
		};
	
		// Simple 'hide' function
		z.hide = function(){
			if ( !z.el.orig ) z.el.orig = {};

			// Remember where we started, so that we can go back to it later
			z.el.orig[prop] = this.cur();

			z.o.hide = true;

			// Begin the animation
			z.custom(z.cur(),0);
		};
	
		// IE has trouble with opacity if it does not have layout
		if ( jQuery.browser.msie && !z.el.currentStyle.hasLayout )
			y.zoom = "1";
	
		// Remember  the overflow of the element
		if ( !z.el.oldOverlay )
			z.el.oldOverflow = jQuery.css( z.el, "overflow" );
	
		// Make sure that nothing sneaks out
		//if ( z.el.oldOverlay == "visible" )
		y.overflow = "hidden";
	
		// Each step of an animation
		z.step = function(firstNum, lastNum){
			var t = (new Date()).getTime();
	
			if (t > z.o.duration + z.startTime) {
				// Stop the timer
				clearInterval(z.timer);
				z.timer = null;

				z.now = lastNum;
				z.a();

				// Hide the element if the "hide" operation was done
				if ( z.o.hide ) y.display = 'none';
	
				// Reset the overflow
				y.overflow = z.el.oldOverflow;

				// If a callback was provided, execute it
				if( z.o.complete && z.o.complete.constructor == Function )
					// Execute the complete function
					z.o.complete.apply( z.el );

				// Reset the property, if the item has been hidden
				if ( z.o.hide )
					y[ prop ] = z.el.orig[ prop ].constructor == Number && prop != "opacity" ?
						z.el.orig[prop] + "px" : z.el.orig[prop];

				// set its height and/or width to auto
				jQuery.setAuto( z.el, prop );
			} else {
				// Figure out where in the animation we are and set the number
				var p = (t - this.startTime) / z.o.duration;
				z.now = ((-Math.cos(p*Math.PI)/2) + 0.5) * (lastNum-firstNum) + firstNum;
	
				// Perform the next step of the animation
				z.a();
			}
		};
	
	}

});
jQuery.fn.extend({

	// We're overriding the old toggle function, so
	// remember it for later
	//_toggle: jQuery.fn.toggle,
	
	/**
	 * Toggle between two function calls every other click.
	 * Whenever a matched element is clicked, the first specified function 
	 * is fired, when clicked again, the second is fired. All subsequent 
	 * clicks continue to rotate through the two functions.
	 *
	 * @example $("p").toggle(function(){
	 *   $(this).addClass("selected");
	 * },function(){
	 *   $(this).removeClass("selected");
	 * });
	 *
	 * @name toggle
	 * @type jQuery
	 * @param Function even The function to execute on every even click.
	 * @param Function odd The function to execute on every odd click.
	 */
	toggle: function(a,b) {
		// If two functions are passed in, we're
		// toggling on a click
		return a && b ? this.click(function(e){
			// Figure out which function to execute
			this.last = this.last == a ? b : a;
			
			// Make sure that clicks stop
			e.preventDefault();
			
			// and execute the function
			return this.last.apply( this, [e] ) || false;
		}) :
		
		// Otherwise, execute the old toggle function
		this._toggle();
	},
	
	/**
	 * A method for simulating hovering (moving the mouse on, and off,
	 * an object). This is a custom method which provides an 'in' to a 
	 * frequent task.
	 *
	 * Whenever the mouse cursor is moved over a matched 
	 * element, the first specified function is fired. Whenever the mouse 
	 * moves off of the element, the second specified function fires. 
	 * Additionally, checks are in place to see if the mouse is still within 
	 * the specified element itself (for example, an image inside of a div), 
	 * and if it is, it will continue to 'hover', and not move out 
	 * (a common error in using a mouseout event handler).
	 *
	 * @example $("p").hover(function(){
	 *   $(this).addClass("over");
	 * },function(){
	 *   $(this).addClass("out");
	 * });
	 *
	 * @name hover
	 * @type jQuery
	 * @param Function over The function to fire whenever the mouse is moved over a matched element.
	 * @param Function out The function to fire whenever the mouse is moved off of a matched element.
	 */
	hover: function(f,g) {
		
		// A private function for haandling mouse 'hovering'
		function handleHover(e) {
			// Check if mouse(over|out) are still within the same parent element
			var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;
	
			// Traverse up the tree
			while ( p && p != this ) p = p.parentNode;
			
			// If we actually just moused on to a sub-element, ignore it
			if ( p == this ) return false;
			
			// Execute the right function
			return (e.type == "mouseover" ? f : g).apply(this, [e]);
		}
		
		// Bind the function to the two event listeners
		return this.mouseover(handleHover).mouseout(handleHover);
	},
	
	/**
	 * Bind a function to be executed whenever the DOM is ready to be
	 * traversed and manipulated. This is probably the most important 
	 * function included in the event module, as it can greatly improve
	 * the response times of your web applications.
	 *
	 * In a nutshell, this is a solid replacement for using window.onload, 
	 * and attaching a function to that. By using this method, your bound Function 
	 * will be called the instant the DOM is ready to be read and manipulated, 
	 * which is exactly what 99.99% of all Javascript code needs to run.
	 * 
	 * Please ensure you have no code in your <body> onload event handler, 
	 * otherwise $(document).ready() may not fire.
	 *
	 * @example $(document).ready(function(){ Your code here... });
	 *
	 * @name ready
	 * @type jQuery
	 * @param Function fn The function to be executed when the DOM is ready.
	 */
	ready: function(f) {
		// If the DOM is already ready
		if ( jQuery.isReady )
			// Execute the function immediately
			f.apply( document );
			
		// Otherwise, remember the function for later
		else {
			// Add the function to the wait list
			jQuery.readyList.push( f );
		}
	
		return this;
	}
});

jQuery.extend({
	/*
	 * All the code that makes DOM Ready work nicely.
	 */
	isReady: false,
	readyList: [],
	
	// Handle when the DOM is ready
	ready: function() {
		// Make sure that the DOM is not already loaded
		if ( !jQuery.isReady ) {
			// Remember that the DOM is ready
			jQuery.isReady = true;
			
			// If there are functions bound, to execute
			if ( jQuery.readyList ) {
				// Execute all of them
				for ( var i = 0; i < jQuery.readyList.length; i++ )
					jQuery.readyList[i].apply( document );
				
				// Reset the list of functions
				jQuery.readyList = null;
			}
		}
	}
});

new function(){

		/**
		 * Bind a function to the blur event of each matched element.
		 *
		 * @example $("p").blur( function() { alert("Hello"); } );
		 * @before <p>Hello</p>
		 * @result <p onblur="alert('Hello');">Hello</p>
		 *
		 * @name blur
		 * @type jQuery
		 * @param Function fn A function to bind to the blur event on each of the matched elements.
		 */

		/**
		 * Trigger the blur event of each matched element. This causes all of the functions
		 * that have been bound to thet blur event to be executed.
		 *
		 * @example $("p").blur();
		 * @before <p onblur="alert('Hello');">Hello</p>
		 * @result alert('Hello');
		 *
		 * @name blur
		 * @type jQuery
		 */

		/**
		 * Bind a function to the blur event of each matched element, which will only be executed once.
		 * Unlike a call to the normal .blur() method, calling .oneblur() causes the bound function to be
		 * only executed the first time it is triggered, and never again (unless it is re-bound).
		 *
		 * @example $("p").oneblur( function() { alert("Hello"); } );
		 * @before <p onblur="alert('Hello');">Hello</p>
		 * @result alert('Hello'); // Only executed for the first blur
		 *
		 * @name oneblur
		 * @type jQuery
		 * @param Function fn A function to bind to the blur event on each of the matched elements.
		 */

		/**
		 * Removes a bound blur event from each of the matched
		 * elements. You must pass the identical function that was used in the original 
		 * bind method.
		 *
		 * @example $("p").unblur( myFunction );
		 * @before <p onblur="myFunction">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unblur
		 * @type jQuery
		 * @param Function fn A function to unbind from the blur event on each of the matched elements.
		 */

		/**
		 * Removes all bound blur events from each of the matched elements.
		 *
		 * @example $("p").unblur();
		 * @before <p onblur="alert('Hello');">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unblur
		 * @type jQuery
		 */

		/**
		 * Bind a function to the focus event of each matched element.
		 *
		 * @example $("p").focus( function() { alert("Hello"); } );
		 * @before <p>Hello</p>
		 * @result <p onfocus="alert('Hello');">Hello</p>
		 *
		 * @name focus
		 * @type jQuery
		 * @param Function fn A function to bind to the focus event on each of the matched elements.
		 */

		/**
		 * Trigger the focus event of each matched element. This causes all of the functions
		 * that have been bound to thet focus event to be executed.
		 *
		 * @example $("p").focus();
		 * @before <p onfocus="alert('Hello');">Hello</p>
		 * @result alert('Hello');
		 *
		 * @name focus
		 * @type jQuery
		 */

		/**
		 * Bind a function to the focus event of each matched element, which will only be executed once.
		 * Unlike a call to the normal .focus() method, calling .onefocus() causes the bound function to be
		 * only executed the first time it is triggered, and never again (unless it is re-bound).
		 *
		 * @example $("p").onefocus( function() { alert("Hello"); } );
		 * @before <p onfocus="alert('Hello');">Hello</p>
		 * @result alert('Hello'); // Only executed for the first focus
		 *
		 * @name onefocus
		 * @type jQuery
		 * @param Function fn A function to bind to the focus event on each of the matched elements.
		 */

		/**
		 * Removes a bound focus event from each of the matched
		 * elements. You must pass the identical function that was used in the original 
		 * bind method.
		 *
		 * @example $("p").unfocus( myFunction );
		 * @before <p onfocus="myFunction">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unfocus
		 * @type jQuery
		 * @param Function fn A function to unbind from the focus event on each of the matched elements.
		 */

		/**
		 * Removes all bound focus events from each of the matched elements.
		 *
		 * @example $("p").unfocus();
		 * @before <p onfocus="alert('Hello');">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unfocus
		 * @type jQuery
		 */

		/**
		 * Bind a function to the load event of each matched element.
		 *
		 * @example $("p").load( function() { alert("Hello"); } );
		 * @before <p>Hello</p>
		 * @result <p onload="alert('Hello');">Hello</p>
		 *
		 * @name load
		 * @type jQuery
		 * @param Function fn A function to bind to the load event on each of the matched elements.
		 */

		/**
		 * Trigger the load event of each matched element. This causes all of the functions
		 * that have been bound to thet load event to be executed.
		 *
		 * @example $("p").load();
		 * @before <p onload="alert('Hello');">Hello</p>
		 * @result alert('Hello');
		 *
		 * @name load
		 * @type jQuery
		 */

		/**
		 * Bind a function to the load event of each matched element, which will only be executed once.
		 * Unlike a call to the normal .load() method, calling .oneload() causes the bound function to be
		 * only executed the first time it is triggered, and never again (unless it is re-bound).
		 *
		 * @example $("p").oneload( function() { alert("Hello"); } );
		 * @before <p onload="alert('Hello');">Hello</p>
		 * @result alert('Hello'); // Only executed for the first load
		 *
		 * @name oneload
		 * @type jQuery
		 * @param Function fn A function to bind to the load event on each of the matched elements.
		 */

		/**
		 * Removes a bound load event from each of the matched
		 * elements. You must pass the identical function that was used in the original 
		 * bind method.
		 *
		 * @example $("p").unload( myFunction );
		 * @before <p onload="myFunction">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unload
		 * @type jQuery
		 * @param Function fn A function to unbind from the load event on each of the matched elements.
		 */

		/**
		 * Removes all bound load events from each of the matched elements.
		 *
		 * @example $("p").unload();
		 * @before <p onload="alert('Hello');">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unload
		 * @type jQuery
		 */

		/**
		 * Bind a function to the resize event of each matched element.
		 *
		 * @example $("p").resize( function() { alert("Hello"); } );
		 * @before <p>Hello</p>
		 * @result <p onresize="alert('Hello');">Hello</p>
		 *
		 * @name resize
		 * @type jQuery
		 * @param Function fn A function to bind to the resize event on each of the matched elements.
		 */

		/**
		 * Trigger the resize event of each matched element. This causes all of the functions
		 * that have been bound to thet resize event to be executed.
		 *
		 * @example $("p").resize();
		 * @before <p onresize="alert('Hello');">Hello</p>
		 * @result alert('Hello');
		 *
		 * @name resize
		 * @type jQuery
		 */

		/**
		 * Bind a function to the resize event of each matched element, which will only be executed once.
		 * Unlike a call to the normal .resize() method, calling .oneresize() causes the bound function to be
		 * only executed the first time it is triggered, and never again (unless it is re-bound).
		 *
		 * @example $("p").oneresize( function() { alert("Hello"); } );
		 * @before <p onresize="alert('Hello');">Hello</p>
		 * @result alert('Hello'); // Only executed for the first resize
		 *
		 * @name oneresize
		 * @type jQuery
		 * @param Function fn A function to bind to the resize event on each of the matched elements.
		 */

		/**
		 * Removes a bound resize event from each of the matched
		 * elements. You must pass the identical function that was used in the original 
		 * bind method.
		 *
		 * @example $("p").unresize( myFunction );
		 * @before <p onresize="myFunction">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unresize
		 * @type jQuery
		 * @param Function fn A function to unbind from the resize event on each of the matched elements.
		 */

		/**
		 * Removes all bound resize events from each of the matched elements.
		 *
		 * @example $("p").unresize();
		 * @before <p onresize="alert('Hello');">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unresize
		 * @type jQuery
		 */

		/**
		 * Bind a function to the scroll event of each matched element.
		 *
		 * @example $("p").scroll( function() { alert("Hello"); } );
		 * @before <p>Hello</p>
		 * @result <p onscroll="alert('Hello');">Hello</p>
		 *
		 * @name scroll
		 * @type jQuery
		 * @param Function fn A function to bind to the scroll event on each of the matched elements.
		 */

		/**
		 * Trigger the scroll event of each matched element. This causes all of the functions
		 * that have been bound to thet scroll event to be executed.
		 *
		 * @example $("p").scroll();
		 * @before <p onscroll="alert('Hello');">Hello</p>
		 * @result alert('Hello');
		 *
		 * @name scroll
		 * @type jQuery
		 */

		/**
		 * Bind a function to the scroll event of each matched element, which will only be executed once.
		 * Unlike a call to the normal .scroll() method, calling .onescroll() causes the bound function to be
		 * only executed the first time it is triggered, and never again (unless it is re-bound).
		 *
		 * @example $("p").onescroll( function() { alert("Hello"); } );
		 * @before <p onscroll="alert('Hello');">Hello</p>
		 * @result alert('Hello'); // Only executed for the first scroll
		 *
		 * @name onescroll
		 * @type jQuery
		 * @param Function fn A function to bind to the scroll event on each of the matched elements.
		 */

		/**
		 * Removes a bound scroll event from each of the matched
		 * elements. You must pass the identical function that was used in the original 
		 * bind method.
		 *
		 * @example $("p").unscroll( myFunction );
		 * @before <p onscroll="myFunction">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unscroll
		 * @type jQuery
		 * @param Function fn A function to unbind from the scroll event on each of the matched elements.
		 */

		/**
		 * Removes all bound scroll events from each of the matched elements.
		 *
		 * @example $("p").unscroll();
		 * @before <p onscroll="alert('Hello');">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unscroll
		 * @type jQuery
		 */

		/**
		 * Bind a function to the unload event of each matched element.
		 *
		 * @example $("p").unload( function() { alert("Hello"); } );
		 * @before <p>Hello</p>
		 * @result <p onunload="alert('Hello');">Hello</p>
		 *
		 * @name unload
		 * @type jQuery
		 * @param Function fn A function to bind to the unload event on each of the matched elements.
		 */

		/**
		 * Trigger the unload event of each matched element. This causes all of the functions
		 * that have been bound to thet unload event to be executed.
		 *
		 * @example $("p").unload();
		 * @before <p onunload="alert('Hello');">Hello</p>
		 * @result alert('Hello');
		 *
		 * @name unload
		 * @type jQuery
		 */

		/**
		 * Bind a function to the unload event of each matched element, which will only be executed once.
		 * Unlike a call to the normal .unload() method, calling .oneunload() causes the bound function to be
		 * only executed the first time it is triggered, and never again (unless it is re-bound).
		 *
		 * @example $("p").oneunload( function() { alert("Hello"); } );
		 * @before <p onunload="alert('Hello');">Hello</p>
		 * @result alert('Hello'); // Only executed for the first unload
		 *
		 * @name oneunload
		 * @type jQuery
		 * @param Function fn A function to bind to the unload event on each of the matched elements.
		 */

		/**
		 * Removes a bound unload event from each of the matched
		 * elements. You must pass the identical function that was used in the original 
		 * bind method.
		 *
		 * @example $("p").ununload( myFunction );
		 * @before <p onunload="myFunction">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name ununload
		 * @type jQuery
		 * @param Function fn A function to unbind from the unload event on each of the matched elements.
		 */

		/**
		 * Removes all bound unload events from each of the matched elements.
		 *
		 * @example $("p").ununload();
		 * @before <p onunload="alert('Hello');">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name ununload
		 * @type jQuery
		 */

		/**
		 * Bind a function to the click event of each matched element.
		 *
		 * @example $("p").click( function() { alert("Hello"); } );
		 * @before <p>Hello</p>
		 * @result <p onclick="alert('Hello');">Hello</p>
		 *
		 * @name click
		 * @type jQuery
		 * @param Function fn A function to bind to the click event on each of the matched elements.
		 */

		/**
		 * Trigger the click event of each matched element. This causes all of the functions
		 * that have been bound to thet click event to be executed.
		 *
		 * @example $("p").click();
		 * @before <p onclick="alert('Hello');">Hello</p>
		 * @result alert('Hello');
		 *
		 * @name click
		 * @type jQuery
		 */

		/**
		 * Bind a function to the click event of each matched element, which will only be executed once.
		 * Unlike a call to the normal .click() method, calling .oneclick() causes the bound function to be
		 * only executed the first time it is triggered, and never again (unless it is re-bound).
		 *
		 * @example $("p").oneclick( function() { alert("Hello"); } );
		 * @before <p onclick="alert('Hello');">Hello</p>
		 * @result alert('Hello'); // Only executed for the first click
		 *
		 * @name oneclick
		 * @type jQuery
		 * @param Function fn A function to bind to the click event on each of the matched elements.
		 */

		/**
		 * Removes a bound click event from each of the matched
		 * elements. You must pass the identical function that was used in the original 
		 * bind method.
		 *
		 * @example $("p").unclick( myFunction );
		 * @before <p onclick="myFunction">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unclick
		 * @type jQuery
		 * @param Function fn A function to unbind from the click event on each of the matched elements.
		 */

		/**
		 * Removes all bound click events from each of the matched elements.
		 *
		 * @example $("p").unclick();
		 * @before <p onclick="alert('Hello');">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unclick
		 * @type jQuery
		 */

		/**
		 * Bind a function to the dblclick event of each matched element.
		 *
		 * @example $("p").dblclick( function() { alert("Hello"); } );
		 * @before <p>Hello</p>
		 * @result <p ondblclick="alert('Hello');">Hello</p>
		 *
		 * @name dblclick
		 * @type jQuery
		 * @param Function fn A function to bind to the dblclick event on each of the matched elements.
		 */

		/**
		 * Trigger the dblclick event of each matched element. This causes all of the functions
		 * that have been bound to thet dblclick event to be executed.
		 *
		 * @example $("p").dblclick();
		 * @before <p ondblclick="alert('Hello');">Hello</p>
		 * @result alert('Hello');
		 *
		 * @name dblclick
		 * @type jQuery
		 */

		/**
		 * Bind a function to the dblclick event of each matched element, which will only be executed once.
		 * Unlike a call to the normal .dblclick() method, calling .onedblclick() causes the bound function to be
		 * only executed the first time it is triggered, and never again (unless it is re-bound).
		 *
		 * @example $("p").onedblclick( function() { alert("Hello"); } );
		 * @before <p ondblclick="alert('Hello');">Hello</p>
		 * @result alert('Hello'); // Only executed for the first dblclick
		 *
		 * @name onedblclick
		 * @type jQuery
		 * @param Function fn A function to bind to the dblclick event on each of the matched elements.
		 */

		/**
		 * Removes a bound dblclick event from each of the matched
		 * elements. You must pass the identical function that was used in the original 
		 * bind method.
		 *
		 * @example $("p").undblclick( myFunction );
		 * @before <p ondblclick="myFunction">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name undblclick
		 * @type jQuery
		 * @param Function fn A function to unbind from the dblclick event on each of the matched elements.
		 */

		/**
		 * Removes all bound dblclick events from each of the matched elements.
		 *
		 * @example $("p").undblclick();
		 * @before <p ondblclick="alert('Hello');">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name undblclick
		 * @type jQuery
		 */

		/**
		 * Bind a function to the mousedown event of each matched element.
		 *
		 * @example $("p").mousedown( function() { alert("Hello"); } );
		 * @before <p>Hello</p>
		 * @result <p onmousedown="alert('Hello');">Hello</p>
		 *
		 * @name mousedown
		 * @type jQuery
		 * @param Function fn A function to bind to the mousedown event on each of the matched elements.
		 */

		/**
		 * Trigger the mousedown event of each matched element. This causes all of the functions
		 * that have been bound to thet mousedown event to be executed.
		 *
		 * @example $("p").mousedown();
		 * @before <p onmousedown="alert('Hello');">Hello</p>
		 * @result alert('Hello');
		 *
		 * @name mousedown
		 * @type jQuery
		 */

		/**
		 * Bind a function to the mousedown event of each matched element, which will only be executed once.
		 * Unlike a call to the normal .mousedown() method, calling .onemousedown() causes the bound function to be
		 * only executed the first time it is triggered, and never again (unless it is re-bound).
		 *
		 * @example $("p").onemousedown( function() { alert("Hello"); } );
		 * @before <p onmousedown="alert('Hello');">Hello</p>
		 * @result alert('Hello'); // Only executed for the first mousedown
		 *
		 * @name onemousedown
		 * @type jQuery
		 * @param Function fn A function to bind to the mousedown event on each of the matched elements.
		 */

		/**
		 * Removes a bound mousedown event from each of the matched
		 * elements. You must pass the identical function that was used in the original 
		 * bind method.
		 *
		 * @example $("p").unmousedown( myFunction );
		 * @before <p onmousedown="myFunction">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unmousedown
		 * @type jQuery
		 * @param Function fn A function to unbind from the mousedown event on each of the matched elements.
		 */

		/**
		 * Removes all bound mousedown events from each of the matched elements.
		 *
		 * @example $("p").unmousedown();
		 * @before <p onmousedown="alert('Hello');">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unmousedown
		 * @type jQuery
		 */

		/**
		 * Bind a function to the mouseup event of each matched element.
		 *
		 * @example $("p").mouseup( function() { alert("Hello"); } );
		 * @before <p>Hello</p>
		 * @result <p onmouseup="alert('Hello');">Hello</p>
		 *
		 * @name mouseup
		 * @type jQuery
		 * @param Function fn A function to bind to the mouseup event on each of the matched elements.
		 */

		/**
		 * Trigger the mouseup event of each matched element. This causes all of the functions
		 * that have been bound to thet mouseup event to be executed.
		 *
		 * @example $("p").mouseup();
		 * @before <p onmouseup="alert('Hello');">Hello</p>
		 * @result alert('Hello');
		 *
		 * @name mouseup
		 * @type jQuery
		 */

		/**
		 * Bind a function to the mouseup event of each matched element, which will only be executed once.
		 * Unlike a call to the normal .mouseup() method, calling .onemouseup() causes the bound function to be
		 * only executed the first time it is triggered, and never again (unless it is re-bound).
		 *
		 * @example $("p").onemouseup( function() { alert("Hello"); } );
		 * @before <p onmouseup="alert('Hello');">Hello</p>
		 * @result alert('Hello'); // Only executed for the first mouseup
		 *
		 * @name onemouseup
		 * @type jQuery
		 * @param Function fn A function to bind to the mouseup event on each of the matched elements.
		 */

		/**
		 * Removes a bound mouseup event from each of the matched
		 * elements. You must pass the identical function that was used in the original 
		 * bind method.
		 *
		 * @example $("p").unmouseup( myFunction );
		 * @before <p onmouseup="myFunction">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unmouseup
		 * @type jQuery
		 * @param Function fn A function to unbind from the mouseup event on each of the matched elements.
		 */

		/**
		 * Removes all bound mouseup events from each of the matched elements.
		 *
		 * @example $("p").unmouseup();
		 * @before <p onmouseup="alert('Hello');">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unmouseup
		 * @type jQuery
		 */

		/**
		 * Bind a function to the mousemove event of each matched element.
		 *
		 * @example $("p").mousemove( function() { alert("Hello"); } );
		 * @before <p>Hello</p>
		 * @result <p onmousemove="alert('Hello');">Hello</p>
		 *
		 * @name mousemove
		 * @type jQuery
		 * @param Function fn A function to bind to the mousemove event on each of the matched elements.
		 */

		/**
		 * Trigger the mousemove event of each matched element. This causes all of the functions
		 * that have been bound to thet mousemove event to be executed.
		 *
		 * @example $("p").mousemove();
		 * @before <p onmousemove="alert('Hello');">Hello</p>
		 * @result alert('Hello');
		 *
		 * @name mousemove
		 * @type jQuery
		 */

		/**
		 * Bind a function to the mousemove event of each matched element, which will only be executed once.
		 * Unlike a call to the normal .mousemove() method, calling .onemousemove() causes the bound function to be
		 * only executed the first time it is triggered, and never again (unless it is re-bound).
		 *
		 * @example $("p").onemousemove( function() { alert("Hello"); } );
		 * @before <p onmousemove="alert('Hello');">Hello</p>
		 * @result alert('Hello'); // Only executed for the first mousemove
		 *
		 * @name onemousemove
		 * @type jQuery
		 * @param Function fn A function to bind to the mousemove event on each of the matched elements.
		 */

		/**
		 * Removes a bound mousemove event from each of the matched
		 * elements. You must pass the identical function that was used in the original 
		 * bind method.
		 *
		 * @example $("p").unmousemove( myFunction );
		 * @before <p onmousemove="myFunction">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unmousemove
		 * @type jQuery
		 * @param Function fn A function to unbind from the mousemove event on each of the matched elements.
		 */

		/**
		 * Removes all bound mousemove events from each of the matched elements.
		 *
		 * @example $("p").unmousemove();
		 * @before <p onmousemove="alert('Hello');">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unmousemove
		 * @type jQuery
		 */

		/**
		 * Bind a function to the mouseover event of each matched element.
		 *
		 * @example $("p").mouseover( function() { alert("Hello"); } );
		 * @before <p>Hello</p>
		 * @result <p onmouseover="alert('Hello');">Hello</p>
		 *
		 * @name mouseover
		 * @type jQuery
		 * @param Function fn A function to bind to the mouseover event on each of the matched elements.
		 */

		/**
		 * Trigger the mouseover event of each matched element. This causes all of the functions
		 * that have been bound to thet mouseover event to be executed.
		 *
		 * @example $("p").mouseover();
		 * @before <p onmouseover="alert('Hello');">Hello</p>
		 * @result alert('Hello');
		 *
		 * @name mouseover
		 * @type jQuery
		 */

		/**
		 * Bind a function to the mouseover event of each matched element, which will only be executed once.
		 * Unlike a call to the normal .mouseover() method, calling .onemouseover() causes the bound function to be
		 * only executed the first time it is triggered, and never again (unless it is re-bound).
		 *
		 * @example $("p").onemouseover( function() { alert("Hello"); } );
		 * @before <p onmouseover="alert('Hello');">Hello</p>
		 * @result alert('Hello'); // Only executed for the first mouseover
		 *
		 * @name onemouseover
		 * @type jQuery
		 * @param Function fn A function to bind to the mouseover event on each of the matched elements.
		 */

		/**
		 * Removes a bound mouseover event from each of the matched
		 * elements. You must pass the identical function that was used in the original 
		 * bind method.
		 *
		 * @example $("p").unmouseover( myFunction );
		 * @before <p onmouseover="myFunction">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unmouseover
		 * @type jQuery
		 * @param Function fn A function to unbind from the mouseover event on each of the matched elements.
		 */

		/**
		 * Removes all bound mouseover events from each of the matched elements.
		 *
		 * @example $("p").unmouseover();
		 * @before <p onmouseover="alert('Hello');">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unmouseover
		 * @type jQuery
		 */

		/**
		 * Bind a function to the mouseout event of each matched element.
		 *
		 * @example $("p").mouseout( function() { alert("Hello"); } );
		 * @before <p>Hello</p>
		 * @result <p onmouseout="alert('Hello');">Hello</p>
		 *
		 * @name mouseout
		 * @type jQuery
		 * @param Function fn A function to bind to the mouseout event on each of the matched elements.
		 */

		/**
		 * Trigger the mouseout event of each matched element. This causes all of the functions
		 * that have been bound to thet mouseout event to be executed.
		 *
		 * @example $("p").mouseout();
		 * @before <p onmouseout="alert('Hello');">Hello</p>
		 * @result alert('Hello');
		 *
		 * @name mouseout
		 * @type jQuery
		 */

		/**
		 * Bind a function to the mouseout event of each matched element, which will only be executed once.
		 * Unlike a call to the normal .mouseout() method, calling .onemouseout() causes the bound function to be
		 * only executed the first time it is triggered, and never again (unless it is re-bound).
		 *
		 * @example $("p").onemouseout( function() { alert("Hello"); } );
		 * @before <p onmouseout="alert('Hello');">Hello</p>
		 * @result alert('Hello'); // Only executed for the first mouseout
		 *
		 * @name onemouseout
		 * @type jQuery
		 * @param Function fn A function to bind to the mouseout event on each of the matched elements.
		 */

		/**
		 * Removes a bound mouseout event from each of the matched
		 * elements. You must pass the identical function that was used in the original 
		 * bind method.
		 *
		 * @example $("p").unmouseout( myFunction );
		 * @before <p onmouseout="myFunction">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unmouseout
		 * @type jQuery
		 * @param Function fn A function to unbind from the mouseout event on each of the matched elements.
		 */

		/**
		 * Removes all bound mouseout events from each of the matched elements.
		 *
		 * @example $("p").unmouseout();
		 * @before <p onmouseout="alert('Hello');">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unmouseout
		 * @type jQuery
		 */

		/**
		 * Bind a function to the change event of each matched element.
		 *
		 * @example $("p").change( function() { alert("Hello"); } );
		 * @before <p>Hello</p>
		 * @result <p onchange="alert('Hello');">Hello</p>
		 *
		 * @name change
		 * @type jQuery
		 * @param Function fn A function to bind to the change event on each of the matched elements.
		 */

		/**
		 * Trigger the change event of each matched element. This causes all of the functions
		 * that have been bound to thet change event to be executed.
		 *
		 * @example $("p").change();
		 * @before <p onchange="alert('Hello');">Hello</p>
		 * @result alert('Hello');
		 *
		 * @name change
		 * @type jQuery
		 */

		/**
		 * Bind a function to the change event of each matched element, which will only be executed once.
		 * Unlike a call to the normal .change() method, calling .onechange() causes the bound function to be
		 * only executed the first time it is triggered, and never again (unless it is re-bound).
		 *
		 * @example $("p").onechange( function() { alert("Hello"); } );
		 * @before <p onchange="alert('Hello');">Hello</p>
		 * @result alert('Hello'); // Only executed for the first change
		 *
		 * @name onechange
		 * @type jQuery
		 * @param Function fn A function to bind to the change event on each of the matched elements.
		 */

		/**
		 * Removes a bound change event from each of the matched
		 * elements. You must pass the identical function that was used in the original 
		 * bind method.
		 *
		 * @example $("p").unchange( myFunction );
		 * @before <p onchange="myFunction">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unchange
		 * @type jQuery
		 * @param Function fn A function to unbind from the change event on each of the matched elements.
		 */

		/**
		 * Removes all bound change events from each of the matched elements.
		 *
		 * @example $("p").unchange();
		 * @before <p onchange="alert('Hello');">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unchange
		 * @type jQuery
		 */

		/**
		 * Bind a function to the reset event of each matched element.
		 *
		 * @example $("p").reset( function() { alert("Hello"); } );
		 * @before <p>Hello</p>
		 * @result <p onreset="alert('Hello');">Hello</p>
		 *
		 * @name reset
		 * @type jQuery
		 * @param Function fn A function to bind to the reset event on each of the matched elements.
		 */

		/**
		 * Trigger the reset event of each matched element. This causes all of the functions
		 * that have been bound to thet reset event to be executed.
		 *
		 * @example $("p").reset();
		 * @before <p onreset="alert('Hello');">Hello</p>
		 * @result alert('Hello');
		 *
		 * @name reset
		 * @type jQuery
		 */

		/**
		 * Bind a function to the reset event of each matched element, which will only be executed once.
		 * Unlike a call to the normal .reset() method, calling .onereset() causes the bound function to be
		 * only executed the first time it is triggered, and never again (unless it is re-bound).
		 *
		 * @example $("p").onereset( function() { alert("Hello"); } );
		 * @before <p onreset="alert('Hello');">Hello</p>
		 * @result alert('Hello'); // Only executed for the first reset
		 *
		 * @name onereset
		 * @type jQuery
		 * @param Function fn A function to bind to the reset event on each of the matched elements.
		 */

		/**
		 * Removes a bound reset event from each of the matched
		 * elements. You must pass the identical function that was used in the original 
		 * bind method.
		 *
		 * @example $("p").unreset( myFunction );
		 * @before <p onreset="myFunction">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unreset
		 * @type jQuery
		 * @param Function fn A function to unbind from the reset event on each of the matched elements.
		 */

		/**
		 * Removes all bound reset events from each of the matched elements.
		 *
		 * @example $("p").unreset();
		 * @before <p onreset="alert('Hello');">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unreset
		 * @type jQuery
		 */

		/**
		 * Bind a function to the select event of each matched element.
		 *
		 * @example $("p").select( function() { alert("Hello"); } );
		 * @before <p>Hello</p>
		 * @result <p onselect="alert('Hello');">Hello</p>
		 *
		 * @name select
		 * @type jQuery
		 * @param Function fn A function to bind to the select event on each of the matched elements.
		 */

		/**
		 * Trigger the select event of each matched element. This causes all of the functions
		 * that have been bound to thet select event to be executed.
		 *
		 * @example $("p").select();
		 * @before <p onselect="alert('Hello');">Hello</p>
		 * @result alert('Hello');
		 *
		 * @name select
		 * @type jQuery
		 */

		/**
		 * Bind a function to the select event of each matched element, which will only be executed once.
		 * Unlike a call to the normal .select() method, calling .oneselect() causes the bound function to be
		 * only executed the first time it is triggered, and never again (unless it is re-bound).
		 *
		 * @example $("p").oneselect( function() { alert("Hello"); } );
		 * @before <p onselect="alert('Hello');">Hello</p>
		 * @result alert('Hello'); // Only executed for the first select
		 *
		 * @name oneselect
		 * @type jQuery
		 * @param Function fn A function to bind to the select event on each of the matched elements.
		 */

		/**
		 * Removes a bound select event from each of the matched
		 * elements. You must pass the identical function that was used in the original 
		 * bind method.
		 *
		 * @example $("p").unselect( myFunction );
		 * @before <p onselect="myFunction">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unselect
		 * @type jQuery
		 * @param Function fn A function to unbind from the select event on each of the matched elements.
		 */

		/**
		 * Removes all bound select events from each of the matched elements.
		 *
		 * @example $("p").unselect();
		 * @before <p onselect="alert('Hello');">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unselect
		 * @type jQuery
		 */

		/**
		 * Bind a function to the submit event of each matched element.
		 *
		 * @example $("p").submit( function() { alert("Hello"); } );
		 * @before <p>Hello</p>
		 * @result <p onsubmit="alert('Hello');">Hello</p>
		 *
		 * @name submit
		 * @type jQuery
		 * @param Function fn A function to bind to the submit event on each of the matched elements.
		 */

		/**
		 * Trigger the submit event of each matched element. This causes all of the functions
		 * that have been bound to thet submit event to be executed.
		 *
		 * @example $("p").submit();
		 * @before <p onsubmit="alert('Hello');">Hello</p>
		 * @result alert('Hello');
		 *
		 * @name submit
		 * @type jQuery
		 */

		/**
		 * Bind a function to the submit event of each matched element, which will only be executed once.
		 * Unlike a call to the normal .submit() method, calling .onesubmit() causes the bound function to be
		 * only executed the first time it is triggered, and never again (unless it is re-bound).
		 *
		 * @example $("p").onesubmit( function() { alert("Hello"); } );
		 * @before <p onsubmit="alert('Hello');">Hello</p>
		 * @result alert('Hello'); // Only executed for the first submit
		 *
		 * @name onesubmit
		 * @type jQuery
		 * @param Function fn A function to bind to the submit event on each of the matched elements.
		 */

		/**
		 * Removes a bound submit event from each of the matched
		 * elements. You must pass the identical function that was used in the original 
		 * bind method.
		 *
		 * @example $("p").unsubmit( myFunction );
		 * @before <p onsubmit="myFunction">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unsubmit
		 * @type jQuery
		 * @param Function fn A function to unbind from the submit event on each of the matched elements.
		 */

		/**
		 * Removes all bound submit events from each of the matched elements.
		 *
		 * @example $("p").unsubmit();
		 * @before <p onsubmit="alert('Hello');">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unsubmit
		 * @type jQuery
		 */

		/**
		 * Bind a function to the keydown event of each matched element.
		 *
		 * @example $("p").keydown( function() { alert("Hello"); } );
		 * @before <p>Hello</p>
		 * @result <p onkeydown="alert('Hello');">Hello</p>
		 *
		 * @name keydown
		 * @type jQuery
		 * @param Function fn A function to bind to the keydown event on each of the matched elements.
		 */

		/**
		 * Trigger the keydown event of each matched element. This causes all of the functions
		 * that have been bound to thet keydown event to be executed.
		 *
		 * @example $("p").keydown();
		 * @before <p onkeydown="alert('Hello');">Hello</p>
		 * @result alert('Hello');
		 *
		 * @name keydown
		 * @type jQuery
		 */

		/**
		 * Bind a function to the keydown event of each matched element, which will only be executed once.
		 * Unlike a call to the normal .keydown() method, calling .onekeydown() causes the bound function to be
		 * only executed the first time it is triggered, and never again (unless it is re-bound).
		 *
		 * @example $("p").onekeydown( function() { alert("Hello"); } );
		 * @before <p onkeydown="alert('Hello');">Hello</p>
		 * @result alert('Hello'); // Only executed for the first keydown
		 *
		 * @name onekeydown
		 * @type jQuery
		 * @param Function fn A function to bind to the keydown event on each of the matched elements.
		 */

		/**
		 * Removes a bound keydown event from each of the matched
		 * elements. You must pass the identical function that was used in the original 
		 * bind method.
		 *
		 * @example $("p").unkeydown( myFunction );
		 * @before <p onkeydown="myFunction">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unkeydown
		 * @type jQuery
		 * @param Function fn A function to unbind from the keydown event on each of the matched elements.
		 */

		/**
		 * Removes all bound keydown events from each of the matched elements.
		 *
		 * @example $("p").unkeydown();
		 * @before <p onkeydown="alert('Hello');">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unkeydown
		 * @type jQuery
		 */

		/**
		 * Bind a function to the keypress event of each matched element.
		 *
		 * @example $("p").keypress( function() { alert("Hello"); } );
		 * @before <p>Hello</p>
		 * @result <p onkeypress="alert('Hello');">Hello</p>
		 *
		 * @name keypress
		 * @type jQuery
		 * @param Function fn A function to bind to the keypress event on each of the matched elements.
		 */

		/**
		 * Trigger the keypress event of each matched element. This causes all of the functions
		 * that have been bound to thet keypress event to be executed.
		 *
		 * @example $("p").keypress();
		 * @before <p onkeypress="alert('Hello');">Hello</p>
		 * @result alert('Hello');
		 *
		 * @name keypress
		 * @type jQuery
		 */

		/**
		 * Bind a function to the keypress event of each matched element, which will only be executed once.
		 * Unlike a call to the normal .keypress() method, calling .onekeypress() causes the bound function to be
		 * only executed the first time it is triggered, and never again (unless it is re-bound).
		 *
		 * @example $("p").onekeypress( function() { alert("Hello"); } );
		 * @before <p onkeypress="alert('Hello');">Hello</p>
		 * @result alert('Hello'); // Only executed for the first keypress
		 *
		 * @name onekeypress
		 * @type jQuery
		 * @param Function fn A function to bind to the keypress event on each of the matched elements.
		 */

		/**
		 * Removes a bound keypress event from each of the matched
		 * elements. You must pass the identical function that was used in the original 
		 * bind method.
		 *
		 * @example $("p").unkeypress( myFunction );
		 * @before <p onkeypress="myFunction">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unkeypress
		 * @type jQuery
		 * @param Function fn A function to unbind from the keypress event on each of the matched elements.
		 */

		/**
		 * Removes all bound keypress events from each of the matched elements.
		 *
		 * @example $("p").unkeypress();
		 * @before <p onkeypress="alert('Hello');">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unkeypress
		 * @type jQuery
		 */

		/**
		 * Bind a function to the keyup event of each matched element.
		 *
		 * @example $("p").keyup( function() { alert("Hello"); } );
		 * @before <p>Hello</p>
		 * @result <p onkeyup="alert('Hello');">Hello</p>
		 *
		 * @name keyup
		 * @type jQuery
		 * @param Function fn A function to bind to the keyup event on each of the matched elements.
		 */

		/**
		 * Trigger the keyup event of each matched element. This causes all of the functions
		 * that have been bound to thet keyup event to be executed.
		 *
		 * @example $("p").keyup();
		 * @before <p onkeyup="alert('Hello');">Hello</p>
		 * @result alert('Hello');
		 *
		 * @name keyup
		 * @type jQuery
		 */

		/**
		 * Bind a function to the keyup event of each matched element, which will only be executed once.
		 * Unlike a call to the normal .keyup() method, calling .onekeyup() causes the bound function to be
		 * only executed the first time it is triggered, and never again (unless it is re-bound).
		 *
		 * @example $("p").onekeyup( function() { alert("Hello"); } );
		 * @before <p onkeyup="alert('Hello');">Hello</p>
		 * @result alert('Hello'); // Only executed for the first keyup
		 *
		 * @name onekeyup
		 * @type jQuery
		 * @param Function fn A function to bind to the keyup event on each of the matched elements.
		 */

		/**
		 * Removes a bound keyup event from each of the matched
		 * elements. You must pass the identical function that was used in the original 
		 * bind method.
		 *
		 * @example $("p").unkeyup( myFunction );
		 * @before <p onkeyup="myFunction">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unkeyup
		 * @type jQuery
		 * @param Function fn A function to unbind from the keyup event on each of the matched elements.
		 */

		/**
		 * Removes all bound keyup events from each of the matched elements.
		 *
		 * @example $("p").unkeyup();
		 * @before <p onkeyup="alert('Hello');">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unkeyup
		 * @type jQuery
		 */

		/**
		 * Bind a function to the error event of each matched element.
		 *
		 * @example $("p").error( function() { alert("Hello"); } );
		 * @before <p>Hello</p>
		 * @result <p onerror="alert('Hello');">Hello</p>
		 *
		 * @name error
		 * @type jQuery
		 * @param Function fn A function to bind to the error event on each of the matched elements.
		 */

		/**
		 * Trigger the error event of each matched element. This causes all of the functions
		 * that have been bound to thet error event to be executed.
		 *
		 * @example $("p").error();
		 * @before <p onerror="alert('Hello');">Hello</p>
		 * @result alert('Hello');
		 *
		 * @name error
		 * @type jQuery
		 */

		/**
		 * Bind a function to the error event of each matched element, which will only be executed once.
		 * Unlike a call to the normal .error() method, calling .oneerror() causes the bound function to be
		 * only executed the first time it is triggered, and never again (unless it is re-bound).
		 *
		 * @example $("p").oneerror( function() { alert("Hello"); } );
		 * @before <p onerror="alert('Hello');">Hello</p>
		 * @result alert('Hello'); // Only executed for the first error
		 *
		 * @name oneerror
		 * @type jQuery
		 * @param Function fn A function to bind to the error event on each of the matched elements.
		 */

		/**
		 * Removes a bound error event from each of the matched
		 * elements. You must pass the identical function that was used in the original 
		 * bind method.
		 *
		 * @example $("p").unerror( myFunction );
		 * @before <p onerror="myFunction">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unerror
		 * @type jQuery
		 * @param Function fn A function to unbind from the error event on each of the matched elements.
		 */

		/**
		 * Removes all bound error events from each of the matched elements.
		 *
		 * @example $("p").unerror();
		 * @before <p onerror="alert('Hello');">Hello</p>
		 * @result <p>Hello</p>
		 *
		 * @name unerror
		 * @type jQuery
		 */

	var e = ("blur,focus,load,resize,scroll,unload,click,dblclick," +
		"mousedown,mouseup,mousemove,mouseover,mouseout,change,reset,select," + 
		"submit,keydown,keypress,keyup,error").split(",");

	// Go through all the event names, but make sure that
	// it is enclosed properly
	for ( var i = 0; i < e.length; i++ ) new function(){
			
		var o = e[i];
		
		// Handle event binding
		jQuery.fn[o] = function(f){
			return f ? this.bind(o, f) : this.trigger(o);
		};
		
		// Handle event unbinding
		jQuery.fn["un"+o] = function(f){ return this.unbind(o, f); };
		
		// Finally, handle events that only fire once
		jQuery.fn["one"+o] = function(f){
			// Attach the event listener
			return this.each(function(){

				var count = 0;

				// Add the event
				jQuery.event.add( this, o, function(e){
					// If this function has already been executed, stop
					if ( count++ ) return;
				
					// And execute the bound function
					return f.apply(this, [e]);
				});
			});
		};
			
	}
	
	// If Mozilla is used
	if ( jQuery.browser.mozilla || jQuery.browser.opera ) {
		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", jQuery.ready, false );
	
	// If IE is used, use the excellent hack by Matthias Miller
	// http://www.outofhanwell.com/blog/index.php?title=the_window_onload_problem_revisited
	} else if ( jQuery.browser.msie ) {
	
		// Only works if you document.write() it
		document.write("<scr" + "ipt id=__ie_init defer=true " + 
			"src=//:><\/script>");
	
		// Use the defer script hack
		var script = document.getElementById("__ie_init");
		script.onreadystatechange = function() {
			if ( this.readyState == "complete" )
				jQuery.ready();
		};
	
		// Clear from memory
		script = null;
	
	// If Safari  is used
	} else if ( jQuery.browser.safari ) {
		// Continually check to see if the document.readyState is valid
		jQuery.safariTimer = setInterval(function(){
			// loaded and complete are both valid states
			if ( document.readyState == "loaded" || 
				document.readyState == "complete" ) {
	
				// If either one are found, remove the timer
				clearInterval( jQuery.safariTimer );
				jQuery.safariTimer = null;
	
				// and execute any waiting functions
				jQuery.ready();
			}
		}, 10);
	}
	
	// A fallback to window.onload, that will always work
	jQuery.event.add( window, "load", jQuery.ready );
	
}
// AJAX Plugin
// Docs Here:
// http://jquery.com/docs/ajax/

/**
 * Load HTML from a remote file and inject it into the DOM
 */
jQuery.fn.load = function( url, params, callback ) {
	// I overwrote the event plugin's .load
	// this won't happen again, I hope -John
	if ( url && url.constructor == Function )
		return this.bind("load", url);

	// Default to a GET request
	var type = "GET";

	// If the second parameter was provided
	if ( params ) {
		// If it's a function
		if ( params.constructor == Function ) {
			// We assume that it's the callback
			callback = params;
			params = null;
			
		// Otherwise, build a param string
		} else {
			params = jQuery.param( params );
			type = "POST";
		}
	}
	
	var self = this;
	
	// Request the remote document
	jQuery.ajax( type, url, params,function(res){
			
		// Inject the HTML into all the matched elements
		self.html(res.responseText).each(function(){
			// If a callback function was provided
			if ( callback && callback.constructor == Function )
				// Execute it within the context of the element
				callback.apply( self, [res.responseText] );
		});
		
		// Execute all the scripts inside of the newly-injected HTML
		$("script", self).each(function(){
			eval( this.text || this.textContent || this.innerHTML || "");
		});

	});
	
	return this;
};

// If IE is used, create a wrapper for the XMLHttpRequest object
if ( jQuery.browser.msie )
	XMLHttpRequest = function(){
		return new ActiveXObject(
			navigator.userAgent.indexOf("MSIE 5") >= 0 ?
			"Microsoft.XMLHTTP" : "Msxml2.XMLHTTP"
		);
	};

// Attach a bunch of functions for handling common AJAX events
new function(){
	var e = "ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess".split(',');
	
	for ( var i = 0; i < e.length; i++ ) new function(){
		var o = e[i];
		jQuery.fn[o] = function(f){
			return this.bind(o, f);
		};
	}
};

jQuery.extend({

	/**
	 * Load a remote page using a GET request
	 */
	get: function( url, data, callback, type ) {
		if ( data.constructor == Function ) {
			callback = data;
			data = null;
		}
		
		if ( data )
			url += "?" + jQuery.param(data);
		
		// Build and start the HTTP Request
		jQuery.ajax( "GET", url, null, function(r) {
			if ( callback ) callback( jQuery.httpData(r,type) );
		});
	},
	
	/**
	 * Load a remote page using a POST request.
	 */
	post: function( url, data, callback, type ) {
		// Build and start the HTTP Request
		jQuery.ajax( "POST", url, jQuery.param(data), function(r) {
			if ( callback ) callback( jQuery.httpData(r,type) );
		});
	},
	
	/**
	 * A common wrapper for making XMLHttpRequests
	 */
	ajax: function( type, url, data, ret ) {
		// If only a single argument was passed in,
		// assume that it is a object of key/value pairs
		if ( !url ) {
			ret = type.complete;
			var success = type.success;
			var error = type.error;
			data = type.data;
			url = type.url;
			type = type.type;
		}
		
		// Watch for a new set of requests
		if ( ! jQuery.active++ )
			jQuery.event.trigger( "ajaxStart" );
	
		// Create the request object
		var xml = new XMLHttpRequest();
	
		// Open the socket
		xml.open(type || "GET", url, true);
		
		// Set the correct header, if data is being sent
		if ( data )
			xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	
		// Set header so calling script knows that it's an XMLHttpRequest
		xml.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	
		// Make sure the browser sends the right content length
		if ( xml.overrideMimeType )
			xml.setRequestHeader("Connection", "close");
	
		// Wait for a response to come back
		xml.onreadystatechange = function(){
			// The transfer is complete and the data is available
			if ( xml.readyState == 4 ) {
				// Make sure that the request was successful
				if ( jQuery.httpSuccess( xml ) ) {
				
					// If a local callback was specified, fire it
					if ( success ) success( xml );
					
					// Fire the global callback
					jQuery.event.trigger( "ajaxSuccess" );
				
				// Otherwise, the request was not successful
				} else {
					// If a local callback was specified, fire it
					if ( error ) error( xml );
					
					// Fire the global callback
					jQuery.event.trigger( "ajaxError" );
				}
				
				// The request was completed
				jQuery.event.trigger( "ajaxComplete" );
				
				// Handle the global AJAX counter
				if ( ! --jQuery.active )
					jQuery.event.trigger( "ajaxStop" );
	
				// Process result
				if ( ret ) ret(xml);

				// Stop memory leaks
				xml.onreadystatechange = function(){};
				xml = null;
			}
		};
	
		// Send the data
		xml.send(data);
	},
	
	// Counter for holding the number of active queries
	active: 0,
	
	// Determines if an XMLHttpRequest was successful or not
	httpSuccess: function(r) {
		try {
			return r.status ?
				( r.status >= 200 && r.status < 300 ) || r.status == 304 :
				location.protocol == "file:";
		} catch(e){}
		return false;
	},
	
	// Get the data out of an XMLHttpRequest.
	// Return parsed XML if content-type header is "xml" and type is "xml" or omitted,
	// otherwise return plain text.
	httpData: function(r,type) {
		var ct = r.getResponseHeader("content-type");
		var xml = ( !type || type == "xml" ) && ct && ct.indexOf("xml") >= 0;
		return xml ? r.responseXML : r.responseText;
	},
	
	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function(a) {
		var s = [];
		
		// If an array was passed in, assume that it is an array
		// of form elements
		if ( a.constructor == Array )
			// Serialize the form elements
			for ( var i = 0; i < a.length; i++ )
				s.push( a[i].name + "=" + encodeURIComponent( a[i].value ) );
			
		// Otherwise, assume that it's an object of key/value pairs
		else
			// Serialize the key/values
			for ( var j in a )
				s.push( j + "=" + encodeURIComponent( a[j] ) );
		
		// Return the resulting serialization
		return s.join("&");
	}

});
