(function($) {
  $.fn.oGallery = function(options) {
    var defaults = {
      duration: 400
    };

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

    function slide(direction) {
      var operator, itemToSwap, actionToCall;

      if (direction === 'left') {
        operator = '+='; itemToSwap = 'last-child'; actionToCall = 'prepend';
      } else {
        operator = '-='; itemToSwap = 'first-child'; actionToCall = 'append';
      }

      $list.animate({
        'left': operator+itemOuterWidth
      }, options.duration, 'linear', function() {
        $(this)
          [actionToCall]($('.ogallery-item:'+itemToSwap).detach())
          .css('left', -itemOuterWidth);
      });
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
      slide('left');
    });

    $('.ogallery-arrow--next').on('click', function() {
      slide('right');
    });

    $window.on('resize', function() {
      setWidths();
    });
  };
})(jQuery);