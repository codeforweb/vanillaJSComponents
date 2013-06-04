(function() {
	"use strict";
	var Tab = {};
	Tab.prototype = {
		ele: null	
		,
		init: function() {
			var tabs = document.querySelectorAll('[data-toggle="tab"]'), tab ;
           	for (var i = 0, j = tabs.length; i < j; i++) {
                tab = tabs[i];
                tab.addEventListener('click', this.showTab.bind(this));
                tab.addEventListener('keydown', this.keydown.bind(this)); 
                this.setAriaAttributes(tab);  
            }    

		}
		,
		setAriaAttributes: function(tab){
			var target = this.getTarget(tab);
			tab.setAttribute('role','tab');
			tab.setAttribute('aria-controls', target.getAttribute('id'));
			if(!target.classList.contains('active'))	{
				tab.setAttribute('tabIndex','-1');
				target.setAttribute('tabIndex','-1');
				tab.setAttribute('aria-expanded','false');
				tab.setAttribute('aria-selected','false');
				target.setAttribute('aria-hidden','true');				
			}else{
				tab.setAttribute('tabIndex','0');
				target.setAttribute('tabIndex','0');
				tab.setAttribute('aria-expanded','true');
				tab.setAttribute('aria-selected','true');
				target.setAttribute('aria-hidden','false');								
			}
			tab.parentNode.setAttribute('role','presentation');
			tab.parentNode.parentNode.setAttribute('role','tablist');
		}
		,getTarget: function(tab){
			var target = tab.dataset.target;
			if(typeof target==='undefined'){
				target = tab.getAttribute('href');
				target = target && target.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7		
				target = target.substring(1);		
			}
			return document.getElementById(target);
		}
		,
		showTab: function(e){
	    	this.ele =  e.target;
	       	var ul = this.ele.parentNode.parentNode
	        , prevItem = ul.getElementsByClassName('active')[0]
	        , nextItem = this.ele.parentNode 
	        , target 
	        , prevTarget
	        , prevAnchor;

			e.preventDefault();	

			target = this.getTarget(this.ele);
			prevTarget = target.parentNode.getElementsByClassName('active')[0];  
			//console.log(this.ele, nextItem, target);
			//console.log(prevItem , prevTarget);

			prevItem.classList.remove('active');
			prevAnchor = prevItem.getElementsByTagName('a')[0];

			//Aria attribs
			prevAnchor.setAttribute('tabIndex','-1');
			prevTarget.setAttribute('tabIndex','-1');
			prevAnchor.setAttribute('aria-expanded','false');
			prevAnchor.setAttribute('aria-selected','false');
			prevTarget.setAttribute('aria-hidden','true');

			this.ele.setAttribute('tabIndex','0');
			target.setAttribute('tabIndex','0');
			this.ele.setAttribute('aria-expanded','true');
			this.ele.setAttribute('aria-selected','true');
			target.setAttribute('aria-hidden','false');		
			//End Aria attribs

			prevTarget.classList.remove('active');			
			prevTarget.classList.remove('fade');
			prevTarget.classList.remove('in');

			nextItem.classList.add('active');
			target.classList.add('active');
		}
		, keydown: function(e){
			var curEl = e.target
			, ul = curEl.parentNode.parentNode
			, items = ul.querySelectorAll('[data-toggle=tab]')
			, index
			, k =  e.keyCode || e.which;

			if (!/(37|38|39|40)/.test(k)) return
			e.preventDefault();	

			index = Array.prototype.indexOf.call(items, curEl);
			//console.log('cur:', index)
	        if (k == 38 || k == 37) index--                                        // up & left
	        if (k == 39 || k == 40) index++                        // down & right
	        if(index < 0) index = items.length -1;
	        if(index == items.length) index = 0;

	        Array.prototype.slice.call(items)[index].click();
	        this.ele.focus();
	        //this.showTab(e);
		}  

	}
		Tab.prototype.init();
}());