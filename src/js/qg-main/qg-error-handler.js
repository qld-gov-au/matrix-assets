/*
 * This plugin
 * 	-checks for error messages on page
 * 	-generates a hidden form with error information
 * 	-submits to form submission handler which formats and sends error information to support team
 * */

(function ($, swe) {
  "use strict";
  swe.handleErrors = function (selector) {
    var errorInfoContainer = $(selector),
      errorInfo = [],
      generateForm = function (errorInfo) {
        var form = $("<form/>", {
          method: "POST",
          action:
            "https://www.smartservice.qld.gov.au/services/submissions/email/qld/qld-error-notifications",
        }).append(
          $("<input/>", {
            type: "hidden",
            name: "referrer",
            value: document.referrer,
          }),
          $("<input/>", {
            type: "hidden",
            name: "agent",
            value: navigator.userAgent,
          }),
          $("<input/>", {
            type: "hidden",
            name: "page-url",
            value: window.location.href,
          }),
          $("<input/>", {
            type: "hidden",
            name: "error-info",
            value: errorInfo,
          }),
          $("<p/>", { class: "actions" }).append(
            $("<strong/>").append(
              $(
                '<button type="submit" value="Submit" class="btn btn-primary">Submit</button>'
              )
            )
          )
        );
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
