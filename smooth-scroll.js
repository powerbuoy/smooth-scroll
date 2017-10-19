(function (factory) {
	'use strict';

	if (typeof module === 'object' && typeof module.exports === 'object') {
		module.exports = factory(require('jquery'));
	}
	else {
		factory(jQuery);
	}
})(function ($) {
	'use strict';

	$.fn.smoothScroll = function (conf) {
		var config = $.extend({
			duration: 600,
			offset: 0
		}, conf);

		return this.each(function () {
			var trigger = $(this);
			var href = trigger.attr('href');
			var targetId = href.substr(href.indexOf('#')).substr(1);
			var target = document.getElementById(targetId);

			if (target) {
				trigger.click(function (e) {
					e.stopPropagation();
					e.preventDefault();

					var targetBCT = target.getBoundingClientRect();
					var st = $(document).scrollTop();

					window.location.hash = '#' + targetId; // Bump :target

					$(document).scrollTop(st);

					$('html, body').animate({scrollTop: targetBCT.top + st + config.offset}, config.duration);
				});
			}
			else if (targetId == 'top') {
				trigger.click(function (e) {
					e.stopPropagation();
					e.preventDefault();

					$('html, body').animate({scrollTop: 0}, config.duration);
				});
			}
		});
	};
});
