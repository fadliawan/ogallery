(function($) {
  $.fn.oGallery = function(options) {
    var defaults = {};
    var options = $.extend(defaults, options);
    var itemWidth, itemOuterWidth;

    var $baseHTML = $([
      '<div class="ogallery">',
        '<div class="ogallery-arrow ogallery-arrow--prev"></div>',
        '<div class="ogallery-arrow ogallery-arrow--next"></div>',
        '<div class="ogallery__slider"></div>',
    '</div>'].join(''));

    function setWidths() {
      var ww = $(window).width();
      var widthFactor = ww > 1020 ? 0.3 : ww > 480 ? 0.5 : 1;
      var outerWidthFactor = ww > 1020 ? 0.35 : ww > 480 ? 0.5 : 1;

      itemWidth = widthFactor * $('.ogallery').innerWidth();
      itemOuterWidth = outerWidthFactor * $('.ogallery').innerWidth();
    }

    this.each(function() {
      var $this = $(this);
      var originalClasses = $this.attr('class');

      $baseHTML.insertAfter($this).addClass(originalClasses);
      $this.removeClass(originalClasses).addClass('ogallery__items')
        .find('li').addClass('ogallery-item')
        .find('img').addClass('ogallery-item__image')
        .end().end()
        .detach()
        .appendTo($baseHTML.find('.ogallery__slider'));
    });

    setWidths();

    $('.ogallery-item').css({
      width: itemWidth,
      marginRight: itemOuterWidth - itemWidth
    });

    $('.ogallery__items')
      .css('left', -itemOuterWidth)
      .prepend($('.ogallery-item:last-child').detach());

    $('.ogallery-arrow--prev').on('click', function() {
      $('.ogallery__items').animate({
        'left': '+='+itemOuterWidth
      }, 'normal', 'linear', function() {
        $(this)
          .prepend($('.ogallery-item:last-child').detach())
          .css('left', -itemOuterWidth);
      });
    });

    $('.ogallery-arrow--next').on('click', function() {
      $('.ogallery__items').animate({
        'left': '-='+itemOuterWidth
      }, 'normal', 'linear', function() {
        $(this)
          .append($('.ogallery-item:first-child').detach())
          .css('left', -itemOuterWidth);
      });
    });

    $(window).on('resize', function() {
      setWidths();

      $('.ogallery-item').css({
        width: itemWidth,
        marginRight: itemOuterWidth - itemWidth
      });

      $('.ogallery__items')
        .css('left', -itemOuterWidth);
    });
  };
})(jQuery);