(function($) {
  $.fn.oGallery = function(options) {
    var defaults = {};
    var options = $.extend(defaults, options);
    var itemWidth, itemOuterWidth;

    var $window = $(window);
    var $baseHTML = $([
      '<div class="ogallery">',
        '<div class="ogallery-arrow ogallery-arrow--prev"></div>',
        '<div class="ogallery-arrow ogallery-arrow--next"></div>',
        '<div class="ogallery-slider"></div>',
      '</div>'].join(''));

    function setWidths() {
      var ww = $window.width();
      var galleryWidth = $baseHTML.innerWidth();
      var widthFactor = ww > 1020 ? 0.3 : ww > 480 ? 0.475 : 1;
      var outerWidthFactor = ww > 1020 ? 0.35 : ww > 480 ? 0.525 : 1;

      itemWidth = widthFactor * galleryWidth;
      itemOuterWidth = outerWidthFactor * galleryWidth;

      $items.css({
        width: itemWidth,
        marginRight: itemOuterWidth - itemWidth
      });

      return $list.css('left', -itemOuterWidth);
    }

    this.each(function() {
      var $this = $(this);
      var originalClasses = $this.attr('class');

      $baseHTML.insertAfter($this).addClass(originalClasses);
      $this.detach()
        .removeClass(originalClasses).addClass('ogallery-list')
        .find('li').addClass('ogallery-item')
        .find('img').addClass('ogallery-item__image')
        .end().end()
        .appendTo($baseHTML.find('.ogallery-slider'));
    });

    var $list = $('.ogallery-list');
    var $items = $('.ogallery-item');

    setWidths()
      .prepend($('.ogallery-item:last-child').detach());

    $('.ogallery-arrow--prev').on('click', function() {
      $list.animate({
        'left': '+='+itemOuterWidth
      }, 'normal', 'linear', function() {
        $(this)
          .prepend($('.ogallery-item:last-child').detach())
          .css('left', -itemOuterWidth);
      });
    });

    $('.ogallery-arrow--next').on('click', function() {
      $list.animate({
        'left': '-='+itemOuterWidth
      }, 'normal', 'linear', function() {
        $(this)
          .append($('.ogallery-item:first-child').detach())
          .css('left', -itemOuterWidth);
      });
    });

    $window.on('resize', function() {
      setWidths();
    });
  };
})(jQuery);