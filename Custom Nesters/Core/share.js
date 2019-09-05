// REQUIRES:
// - Mustache.js
// - JQuery

(function ($, Mustache) {
	// Variables
	var links = {
		// dailyme:    { title: 'DailyMe',   url: 'http://dailyme.com/bookmarklet?u={{url}}' },
		// delicious:  { title: 'Delicious', url: 'http://del.icio.us/post?url={{url}}&title={{title}}' },
		digg:       { title: 'Digg',      url: 'http://digg.com/submit?phase=2&url={{url}}&title={{title}}' },
		// evernote:   { title: 'Evernote',  url: 'http://www.evernote.com/clip.action?url={{url}}&title={{title}}' },
		facebook:   { title: 'Facebook',  url: 'http://www.facebook.com/share.php?u={{url}}&title={{title}}' },
		linkedin:   { title: 'LinkedIn',  url: 'http://www.linkedin.com/shareArticle?url={{url}}&title={{title}}'},
		// http://www.linkedin.com/shareArticle?url={{url}}&title={{title}}' },
		// myspace:    { title: 'MySpace',   url: 'http://www.myspace.com/index.cfm?fuseaction=postto&t={{title}}&u={{url}}&l=' },
		// reddit:     { title: 'Reddit',    url: 'http://reddit.com/submit?url={{url}}&title={{title}}' },
		// stumbleupon:{ title: 'StumbleUpon',url: 'http://www.stumbleupon.com/submit?url={{url}}&title={{title}}' },
		twitter:    { title: 'Twitter',   url: 'http://twitter.com/home?status={{title}}+{{url}}' },
		// yahoo:      { title: 'Yahoo',     url: 'http://bookmarks.yahoo.com/toolbar/savebm?u={{url}}&t={{title}}' },
		googleplus: { title: 'Google+',   url: 'https://plus.google.com/share?url={{url}}' },
	};

	// Templates
	var shareItemHeading = 'Share';
	var shareItemTemplate = '<p>You have chosen to share <strong>{{url}}</strong></p>\n';
	shareItemTemplate += '<p>Select a service:</p>\n';
	shareItemTemplate += '<ul>\n{{#shareLinks}}';
	shareItemTemplate += '<li><a href="{{url}}">{{title}}</a></li>\n';
	shareItemTemplate += '{{/shareLinks}}</ul>\n';

	var error = {
		notQLD: {
			heading: 'Unable to share this URL',
			body: 'Only Queensland Government URLs can be shared using this service.',
		},
		noShareURL: {
			heading: 'Unable to share this URL',
			body: 'We\'re really sorry. It seems our website is having a technical problem. Please click the submit button below to notify our web team of this issue.',
			errorInfo: 'Failed to receive referrer document information and hence unable to share URL'
		},
		unsuppportedShare: {
			heading: 'Unable to share this URL',
			body: 'Unfortunately we no longer support shares to {{via}}. Please try one of our other sharing options. We apologise for any inconvenience.<br>Please click the submit button below to notify our web team of this issue.',
			errorInfo: 'User tried sharing content to unsupported social media - {{via}}. Referrer website owner needs to be contacted about this issue.'
		}
	};

	var redirectTemplate = {
		heading: 'Redirecting you',
		body: '<p>We are now redirecting you to {{title}}.</p><p>If you are not automatically re-directed, please click on this link <a href="{{url}}">{{url}}</a>',
	};

	// Functions
	function getParameterByName(name, url) {
		if (!url) {
			url = window.location.href;
		}
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';

		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	function renderURL (URLTemplate, title, url) {
		var titleEnc = encodeURIComponent(title);
		var urlEnc = encodeURIComponent(url);
		return Mustache.render(URLTemplate, {title: titleEnc, url: urlEnc})
	}

	function outputShare (title, url, links) {
		var shareLinks = new Array();
		for(var prop in links) {
			shareLinks.push({
				title: links[prop].title,
				url: renderURL(links[prop].url, title, url),
			});
		}
		return Mustache.render(shareItemTemplate, {shareLinks: shareLinks, url: url});
	}

	function isQLDGovURL (url) {
		if(typeof url !== 'string' || url.trim().length <= 0) return false;
		var urlFormatted = url.replace(/(http:\/\/)|(https:\/\/)/, '');
		var pattern = /(.*?)\//;
		var host = pattern.exec(urlFormatted);
		if(host === null || host === undefined) return false;
		host = host[1]; // De-array

		pattern = /qld\.gov\.au$/;
		if(pattern.exec(host)) {
			return true;
		}
		return false;
	}

	function init(links) {
		// var share = {
		var title = getParameterByName('title');
		var url = getParameterByName('url') || document.referrer || '';
		var via = getParameterByName('via');

		$headingTarget = $('#shareHead');
		$target = $('#shareContent');
		$errorInfoClass = 'qg-error-info';

		function errorHandler(heading, body, errorInfo) {
			$headingTarget.html(heading);
			$target.html(body);
			$target.append($('<p/>', {class: $errorInfoClass, style: 'display: none'}).html(errorInfo));
			if(qg && qg.swe && qg.swe.handleErrors && typeof qg.swe.handleErrors === 'function') qg.swe.handleErrors('.' + $errorInfoClass);
		}
		if(url.length <= 0) {
			errorHandler(error.noShareURL.heading, error.noShareURL.body, error.noShareURL.errorInfo);
		}
		else if(isQLDGovURL(url)) {
			if(via !== null) {
				if(links[via] !== undefined ) {
					var destination = renderURL(links[via].url, title, url);
					$headingTarget.html(redirectTemplate.heading);
					$target.html(Mustache.render(redirectTemplate.body, {title: links[via].title, url: destination}));
					top.location.replace(destination);
				}
				else {
					errorHandler(error.unsuppportedShare.heading, error.unsuppportedShare.body.replace('{{via}}', '<strong>' + via + '</strong>'), error.unsuppportedShare.errorInfo.replace('{{via}}', via));
				}
			}
			else {
				$target.html(outputShare(title, url, links));
			}
		}
		else {
			$headingTarget.html(error.notQLD.heading);
			$target.html(error.notQLD.body);
		}
	}

	init(links);
})(jQuery, Mustache);

