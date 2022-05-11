(function($) {
  var formMarkup = `
  <form id="ethical-supplier-lookup" novalidate="true">
    <label for="acn-lookup">ACN or ABN</label> <input id="acn-lookup" type="text">
    <button class="qg-btn btn-primary" type="submit">Search</button>
  </form>
  <div id="alert-container"></div>
  `;
  $('#check-register-form').append(formMarkup);

  $('form#ethical-supplier-lookup').submit(function(event) {
    event.preventDefault();
    var acn = $('#acn-lookup').val().replace(/\ /g, '');
    var alertContainer = $('#alert-container');
    var alertTemplates = {
      loading: `
      <div class="esr-message alert alert-info" id="esr-loading">
        <h3>Searching the register...</h3>

        <div class="spinner">&nbsp;</div>
      </div>
      `,
      error: `
      <div class="esr-message alert alert-warning" id="esr-error">
        <p>You must use a computer or device connected to the government network to check the register.</p>
      </div>
      `,
      invalid: `
      <div class="esr-message alert alert-warning" id="not-valid">
        <p>Please enter a valid 9-digit ACN or 11-digit ABN.</p>
      </div>
      `,
      noFlag: `
      <div class="esr-message alert alert-info" id="no-flag">
        <p>There are no Mandate related restrictions on doing business with <span class="company-name">[company name]</span>.</p>
      </div>
      `,
      flag: `
      <div class="esr-message alert alert-warning" id="flag">
        <p>Please contact the Queensland Procurement Policy Compliance Unit at <a href="mailto:ethicalsupply@hpw.qld.gov.au">ethicalsupply@hpw.qld.gov.au</a> or on phone 1300 10 50 30 before doing business with <span class="company-name">[company name]</span>.</p>
      </div>
      `,
    };

    alertContainer.empty();

    if (acn.length != 9 && acn.length != 11) {
      alertContainer.append(alertTemplates.invalid);
      return;
    }

    alertContainer.append(alertTemplates.loading);

    $.ajax({
      url: 'https://ethicalsupplierregister.hpw.qld.gov.au/api/supplier/validate',
      data: {
        'acn': acn,
      },
      dataType: 'json',
      success: function(data) {
        alertContainer.empty();
        
        if (data.isValid) {
          if (data.isFlagged) {
            alertContainer.append(alertTemplates.flag);
            $('#flag .company-name').text(data.name);
          } else {
            alertContainer.append(alertTemplates.noFlag);
            $('#no-flag .company-name').text(data.name);
          }
        } else {
          alertContainer.append(alertTemplates.invalid);
          $('#not-valid').addClass('show');
        }
      },
      error: function(data) {
        alertContainer.empty();
        alertContainer.append(alertTemplates.error);
      }
    })
  });
})(jQuery);
