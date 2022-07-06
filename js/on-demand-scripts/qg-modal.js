 (function () {
    'use strict';
  
    $(document).ready(function () {
      // Set up modal trigger
      function lightboxToModal(link) {
        link.attr('data-toggle', 'modal');
        link.attr('data-target', '#gov-modal');
        link.attr('data-href', link.attr('href'));
  
        if (!link.attr('id')) {
          $(link).attr('id', Math.random(100000, 999999).toString(36).substr(2));
        } // Prevent butterfly and toc-filter processing.
  
  
        link.removeClass('lightbox');
      } // Detect in-page content modals
  
      $('a.lightbox[href^="#"]').not('.help').each(function (e) {
          $(this).addClass('content-modal');
        }); // Detect images modals
  
      $('a.lightbox[href$=".png"],a.lightbox[href$=".jpg"],a.lightbox[href$=".gif"]').not('.help').each(function (e) {
          $(this).addClass('image-modal');
        }); // Use bootstrap modals for anything with the 'lightbox' class

      $('a.lightbox').not('.help').each(function (e) {
          // Handle ajax modals
          if (!$(this).hasClass('image-modal') && !$(this).hasClass('content-modal')) {
            $(this).addClass('ajax-modal');
            var ajaxUrl = $(this).attr('href');
    
            if (ajaxUrl.indexOf('?') !== -1) {
              ajaxUrl += '&SQ_ASSET_CONTENTS&SQ_PAINT_LAYOUT_NAME=modal';
            } else {
              ajaxUrl += '?SQ_ASSET_CONTENTS&SQ_PAINT_LAYOUT_NAME=modal';
            }
    
            $(this).attr('href', ajaxUrl);
          }
    
          this.addEventListener('click', function (e) {
            e.preventDefault();
          }); // Initiate modal
    
          lightboxToModal($(this));
        }); // On modal open
    
      $('#gov-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var modal = $(this);
        var url = button.data('href');
        var title;
        var close = '<button type="button" class="button close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'; // Get modal title for in-page modal
  
        function modalTitle(content) {
          modal.find('.modal-content').html('<div class="modal-body">' + content + '</div>');
  
          if (title = modal.find('.modal-body > h2:first-child').eq(0)) {
            title.remove();
            var titleText = title.text();
  
            if (title.hasClass('toc-header-number')) {
              titleText = titleText.replace(/\d+\.\s+/, '').trim();
            }
  
            modal.find('.modal-body').before('<div class="modal-header"><h2 class="modal-title mt-0" id="gov-modal--title">' + titleText + '</h2>' + close + '</div>');
          }
        }
  
        if (!button.hasClass('image-modal')) {
          modal.removeClass('modal-img').remove('.close');
        } // Load content from another element on the same page.
  
  
        if (url.substring(0, 1) === '#') {
          if ($(url).length) {
            modalTitle($(url).html());
          }
  
          return;
        } // Load target image.
  
  
        if (button.hasClass('image-modal')) {
          modal.addClass('modal-img');
          modal.find('.modal-content').html('<div class="modal-body">').prepend('<div class="modal-header">' + close + '</div>');
          modal.find('.modal-body').html('<img src="' + url + '">');
          return;
        } // Load via ajax (from another page).
  
  
        $.ajax({
          url: button.data('href'),
          // Load the content in to the modal.
          success: function success(data) {
            modal.find('.modal-content').html('<div class="modal-body">' + data + '</div>'); // If the url targets a specific element, replace modal content with only that element
  
            if (url.search('#') > 0) {
              modalTitle($(url.slice(url.search('#')), modal).html());
              return;
            }
  
            if ($(data).text().length > 1000) {
              modal.find('.modal-dialog').addClass('modal-lg');
            }
  
            if (button.data('modalHeader').length) {
              if (modal.find('.modal-title').length) {
                modal.find('.modal-title').html(button.data('modalHeader'));
              } else {
                modal.find('.modal-body').before('<div class="modal-header"><h2 class="modal-title mt-0" id="gov-modal--title">' + button.data('modalHeader') + '</h2><button type="button" class="button close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
              }
            }
          },
          // If the ajax request fails just redirect to the original href.
          error: function error(request, text, _error) {
            modal.find('.modal-content').html('<div class="modal-header"><h2 class="mt-0">Content not available</h2><button type="button" class="button close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div>');
          },
          // Prevent previous modal content appearing.
          async: false
        });
      }) // On modal hide
      .on('hidden.bs.modal', function (event) {
        var modal = $(this);
        modal.find('.modal-dialog').removeClass('modal-lg');
      });
    });
  })();
  