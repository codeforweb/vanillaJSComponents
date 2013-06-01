(function() {
	"use strict";
	var Tooltip = {};
	Tooltip.prototype = {
		ele: null,
		tip: null,
		defaults: {
			template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner">testsss</div></div>',
			placement: 'top'

		},
		init: function() {
			var tooltips = document.querySelectorAll('[rel="tooltip"]'),
				tooltip;
			for (var i = 0, j = tooltips.length; i < j; i++) {
				tooltip = tooltips[i];
				tooltip.addEventListener('focus', this.showtip.bind(this));
				tooltip.addEventListener('blur', this.hidetip.bind(this));
				tooltip.addEventListener('mouseover', this.showtip.bind(this));
				tooltip.addEventListener('mouseout', this.hidetip.bind(this));				
				this.fixTitle(tooltip)
			}
		},
		showtip: function(e) {
			var content, actualWidth, actualHeight, tp, pos, placement, template

			this.ele = e.target;
			template = this.ele.dataset.template || this.defaults.template;
			this.tip = this.tip || this.createTip(this.defaults.template);
			this.ele.parentNode.insertBefore(this.tip, this.ele.nextSibling);
			this.addDescribedBy();

			content = this.ele.dataset.originalTitle;

			placement = this.ele.dataset.placement || this.defaults.placement;

			if (content) {
				document.querySelector('.tooltip-inner').innerHTML = content;
			}
			actualWidth = this.tip.offsetWidth
			actualHeight = this.tip.offsetHeight

			pos = {
				width: this.ele.offsetWidth,
				height: this.ele.offsetHeight,
				top: this.ele.offsetTop,
				left: this.ele.offsetLeft
			}
			switch (placement) {
				case 'bottom':
					this.tip.style.top = pos.top + pos.height + 'px'
					this.tip.style.left = pos.left + pos.width / 2 - actualWidth / 2 + 'px';
					break
				case 'top':
					this.tip.style.top = pos.top - actualHeight + 'px'
					this.tip.style.left = pos.left + pos.width / 2 - actualWidth / 2 + 'px';
					break
				case 'left':
					this.tip.style.top = pos.top + pos.height / 2 - actualHeight / 2 + 'px'
					this.tip.style.left = pos.left - actualWidth + 'px';
					break
				case 'right':
					this.tip.style.top = pos.top + pos.height / 2 - actualHeight / 2 + 'px'
					this.tip.style.left = pos.left + pos.width + 'px';
					break
			}
			this.tip.classList.add(placement);
			this.tip.classList.add('in');
			this.tip.classList.add('fade');
		},
		createTip: function(template) {
			var docfrag = document.createDocumentFragment();
			var div = document.createElement("div")
			div.innerHTML = template;
			docfrag.appendChild(div);
			this.tip = docfrag.childNodes[0].childNodes[0];
			return this.tip;
		},
		hidetip: function(e) {
			//this.tip = null;
			this.tip.classList.remove('bottom');
			this.tip.classList.remove('top');
			this.tip.classList.remove('left');
			this.tip.classList.remove('right');
			this.tip.classList.remove('in');
			this.tip.classList.remove('fade');
			this.removeDescribedBy();
			try{ 
				this.tip.parentNode.removeChild(this.tip);	
			}catch(e) {}			
		},
		fixTitle: function(element) {
			var title = element.getAttribute('title')
			element.setAttribute('data-original-title', title || '')
			element.setAttribute('title', '')
		}
		, addDescribedBy: 	function () {
			var describedby = (this.ele.getAttribute( "aria-describedby" ) || "").split( /\s+/ ),
			tooltipID =this.tip.getAttribute('id') || 'ui-tooltip-'+ Math.floor((Math.random()*100)+1);
        	this.tip.setAttribute('id', tooltipID);
        	describedby.push(tooltipID );
 			this.ele.setAttribute( "aria-describedby", describedby.join( " " ));
		}

		, removeDescribedBy: 	function(  ) {
			var id = this.tip.getAttribute('id'),
			describedby = (this.ele.getAttribute( "aria-describedby" ) || "").split( /\s+/ ),
			index = describedby.indexOf( id );
			if ( index !== -1 ) {
				describedby.splice( index, 1 );
			}
			describedby =  describedby.join( " " ) ;
			if ( describedby ) {
				this.ele.setAttribute( "aria-describedby", describedby );
			} else {
				this.ele.removeAttribute( "aria-describedby" );
			}
		}
				
	}
	Tooltip.prototype.init();
}());