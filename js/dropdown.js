(function() {
	"use strict";
	var Dropdown = {};
	Dropdown.prototype = {
		btn: null	
		, prt: null
		, menu: null

		,
		init: function() {
			var toggle = document.getElementsByClassName('dropdown-toggle'),
				toggleBtn;
			for (var k = 0, l = toggle.length; k < l; k++) {
				toggleBtn = toggle[k];
				toggleBtn.setAttribute('role', 'button');
				toggleBtn.setAttribute('aria-haspopup', 'true');
				toggleBtn.setAttribute('aria-expanded', 'false');

				toggleBtn.addEventListener('click', this.toggleOptList.bind(this), false);

				var menu = document.getElementById(toggleBtn.dataset.target),
					items = menu.getElementsByTagName("a"),
					listItems = menu.getElementsByTagName("li");
				menu.setAttribute('role', 'menu')
				menu.setAttribute('aria-labelledby', toggleBtn.getAttribute('id'))
				for (var m = 0, n=listItems.length ; m < n; m++) {
					listItems[m].setAttribute('role', 'presentation')
				}
				for (var i = 0, j = items.length; i < j; i++) {
					var item = items[i];
					item.setAttribute('tabIndex', '-1')
					item.setAttribute('role', 'menuitem')
					item.addEventListener('keydown', this.navigateMenus.bind(this));
					item.addEventListener('blur', this.clearMenus.bind(this));
				}
			}
		}

		,
		clearMenus: function(e) {
			var self = this;
			setTimeout(function() {
				var isActive = self.prt.classList.contains('open');
				if ((!isActive) || (self.prt.contains(document.activeElement))) {
					return;
				}
				self.prt.classList.remove('open');
				self.btn.setAttribute('aria-expanded', 'false');
			}, 150);
		}

		,
		toggleOptList: function(e) {
			this.btn = e.target
			this.prt = this.btn.parentNode
			this.menu = document.getElementById(this.btn.dataset.target)
			this.prt.classList.toggle('open');
			(this.prt.classList.contains('open')) ? this.btn.setAttribute('aria-expanded', 'true') : this.btn.setAttribute('aria-expanded', 'false')
			this.menu.getElementsByTagName('a')[0].focus()
		},
		navigateMenus: function(e) {
			if (!/(32|38|40|27)/.test(e.keyCode)) return
			e.preventDefault();
			var isActive = this.prt.classList.contains('open'),
				items = this.menu.getElementsByTagName("a"),
				index = Array.prototype.indexOf.call(items, e.target)

				if (!isActive || (isActive && e.keyCode == 27)) {
					this.btn.click()
					this.btn.focus();
					return;
				}
			if (e.keyCode == 38) index-- // up
			if (e.keyCode == 40) index++ // down
			if (index < 0) index = items.length - 1;
			if (index == items.length) index = 0;
			items.item(index).focus();
		}
	}
		Dropdown.prototype.init();
}());