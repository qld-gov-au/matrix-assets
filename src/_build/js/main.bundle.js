/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/qg-main/_entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/qg-main/_entry.js":
/*!******************************!*\
  !*** ./js/qg-main/_entry.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _qg_env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./qg-env */ "./js/qg-main/qg-env.js");
/* harmony import */ var _qg_env__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_qg_env__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _qg_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./qg-utils */ "./js/qg-main/qg-utils.js");
/* harmony import */ var _qg_utils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_qg_utils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _qg_print__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./qg-print */ "./js/qg-main/qg-print.js");
/* harmony import */ var _qg_print__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_qg_print__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _qg_document_links__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./qg-document-links */ "./js/qg-main/qg-document-links.js");
/* harmony import */ var _qg_document_links__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_qg_document_links__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _qg_error_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./qg-error-handler */ "./js/qg-main/qg-error-handler.js");
/* harmony import */ var _qg_error_handler__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_qg_error_handler__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _qg_image_gallery__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./qg-image-gallery */ "./js/qg-main/qg-image-gallery.js");
/* harmony import */ var _qg_image_gallery__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_qg_image_gallery__WEBPACK_IMPORTED_MODULE_5__);







/***/ }),

/***/ "./js/qg-main/qg-document-links.js":
/*!*****************************************!*\
  !*** ./js/qg-main/qg-document-links.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function ($) {
    'use strict';

    // Use uppercase here, as not all uses are case sensitive

    var documentTypes = 'PDF|DOC|DOCX|XLS|XLSX|RTF';

    // onready
    $(document).ready(function () {
        // find links in content and asides that are missing metadata markup
        $('a', '#qg-primary-content, #qg-secondary-content').filter(function () {

            var documentLink = new RegExp('\\.(' + documentTypes + ')$', 'i').test(this.href);

            if (documentLink) {
                // add document link class
                // has meta markup?
                return $(this).addClass('download').find('.meta').length === 0;
            }

            return false;
        }).each(function () {
            var $this = $(this),
                linkText = $this.text(),
                title,
                meta;

            // has metadata without markup?
            if (new RegExp('\\((?:' + documentTypes + '),?\\s+[0-9\\.]+\\s*[KM]B\\)$', 'i').test(linkText)) {
                meta = $('<span class="meta">' + linkText.replace(new RegExp('^.*\\((' + documentTypes + '),?\\s+([0-9\\.]+)\\s*([KM]B)\\)$'), '($1, $2$3)') + '</span>');
                title = $this.contents().eq(-1);
                title[0].data = title[0].data.replace(new RegExp('\\s+\\((?:' + documentTypes + '),?\\s+[0-9\\.]+\\s*[KM]B\\)$'), '');
                $this.wrapInner('<span class="title"/>');
                $this.append(' ');
                $this.append(meta);
            } else {
                // get file type from extension
                linkText = $this.attr('href').replace(/^.*\.(.+)$/, '$1').toUpperCase();
                $this.wrapInner('<span class="title"/>').append(' <span class="meta">(' + linkText + ')</span>');
            }
        });
    });
})(jQuery);

/***/ }),

/***/ "./js/qg-main/qg-env.js":
/*!******************************!*\
  !*** ./js/qg-main/qg-env.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// All the environment related SWE3 code

window.qg = window.qg || {};
window.qg.swe = window.qg.swe || {};
window.qg.cdn = 'https://static.qgov.net.au';

window.qg.swe.paths = {
  images: '/assets/v3/latest/images'
};

/***/ }),

/***/ "./js/qg-main/qg-error-handler.js":
/*!****************************************!*\
  !*** ./js/qg-main/qg-error-handler.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * This plugin
 * 	-checks for error messages on page
 * 	-generates a hidden form with error information
 * 	-submits to form submission handler which formats and sends error information to support team
 * */

(function ($, swe) {
    'use strict';

    swe.handleErrors = function (selector) {
        var errorInfoContainer = $(selector),
            errorInfo = [],
            generateForm = function (errorInfo) {
            var form = $('<form/>', {
                method: 'POST',
                action: 'https://www.smartservice.qld.gov.au/services/submissions/email/qld/qld-error-notifications'
            }).append($('<input/>', { type: 'hidden', name: 'referrer', value: document.referrer }), $('<input/>', { type: 'hidden', name: 'agent', value: navigator.userAgent }), $('<input/>', { type: 'hidden', name: 'page-url', value: window.location.href }), $('<input/>', { type: 'hidden', name: 'error-info', value: errorInfo }), $('<p/>', { 'class': 'actions' }).append($('<strong/>').append($('<button type="submit" value="Submit" class="btn btn-primary">Submit</button>'))));
            errorInfoContainer.last().after(form);
        };
        errorInfoContainer.each(function () {
            var info = $(this).text().trim();
            if (info.length > 0) {
                errorInfo.push(info);
            }
        });
        generateForm(errorInfo);
    };
})(jQuery, qg.swe);

/***/ }),

/***/ "./js/qg-main/qg-image-gallery.js":
/*!****************************************!*\
  !*** ./js/qg-main/qg-image-gallery.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
    if ($(".image-gallery").length > 0 || $(".cut-in").length > 0) {
        var gallery = $(".image-gallery a");
        $(gallery).attr('data-fancybox', 'images');
        $(gallery).each(function () {
            $(this).attr('data-caption', $(this).attr("title"));
        });

        var cutInLink = $(".cut-in .caption a");
        $(cutInLink).attr("data-fancybox", 'images');

        $("head").append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.3.5/jquery.fancybox.css" integrity="sha384-/smJmPQWlo7vGG6keMQ+H73fKIHPe9MMeBrJhm2g2Xv6+GzR7YrDL0Z84IHaf4Sr" crossorigin="anonymous">');
        $("body").append('<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.3.5/jquery.fancybox.min.js" integrity="sha384-9P6MXH8lfxrzYEF6RdCaepmJsgsERWZGoUT0A7GtFJnA3drRC/UFhapoG1ETT/G/" crossorigin="anonymous"><\/script>');
    }
});

/***/ }),

/***/ "./js/qg-main/qg-print.js":
/*!********************************!*\
  !*** ./js/qg-main/qg-print.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function ($) {
    var printContentLinks = function () {
        var $elPrintLink = $('.print-content-link');
        if ($elPrintLink.length > 0) {
            $elPrintLink.on('click', function (e) {
                e.preventDefault();
                window.print();
            });
        }
    };

    printContentLinks();
})(jQuery);

/***/ }),

/***/ "./js/qg-main/qg-utils.js":
/*!********************************!*\
  !*** ./js/qg-main/qg-utils.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function ($) {
    // SWE2 transformed table code fix
    function tablesFix() {
        var $contentTable = $("#qg-primary-content table");
        if ($contentTable.width() > $("#qg-primary-content").width()) {
            $contentTable.wrap('<div class="scrollable"><div class="inner"></div></div>');
        }
    }
    tablesFix();
})(jQuery);

/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map