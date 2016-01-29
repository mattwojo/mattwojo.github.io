//Reference: http://www.learningjquery.com/2007/10/improved-animated-scrolling-script-for-same-page-links

$(document).ready(function() {
  function filterPath(string) {
  return string
    .replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'');
  }
  var locationPath = filterPath(location.pathname);
  var scrollElem = scrollableElement('html', 'body');

  $('a[href*=#]').each(function() {
    var thisPath = filterPath(this.pathname) || locationPath;
    if (  locationPath == thisPath
    && (location.hostname == this.hostname || !this.hostname)
    && this.hash.replace(/#/,'') ) {
      var $target = $(this.hash), target = this.hash;
      if (target) {
        var targetOffset = $target.offset().top;
        $(this).click(function(event) {
          event.preventDefault();
          $(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
            location.hash = target;
          });
        });
      }
    }
  });

  // use the first element that is "scrollable"
  function scrollableElement(els) {
    for (var i = 0, argLength = arguments.length; i <argLength; i++) {
      var el = arguments[i],
        $scrollElement = $(el);
      if ($scrollElement.scrollTop()> 0) {
        return el;
      } else {
        $scrollElement.scrollTop(1);
        var isScrollable = $scrollElement.scrollTop()> 0;
        $scrollElement.scrollTop(0);
        if (isScrollable) {
          return el;
        }
      }
    }
    return [];
  }

});

// Thank you to David A (@meodai) for this very effiecient "Easy Parallax, 10 lines of vanilla JS" http://codepen.io/meodai/pen/ZGYgNV

if(window.innerWidth > 999){
      var x = xGoal = y = yGoal = 0, easingRatio = 0.01, raf, wrap = document.querySelector('.js-parallax');
      raf = function (){
        x += (xGoal - x) * easingRatio; y += (yGoal - y) * easingRatio;
        var ax = Math.max(-y, -200);
        wrap.style.transform = 'translate3d(' + -x + 'px, ' + ax + 'px, 0)';
        requestAnimationFrame(raf);
      };
      raf();
      document.addEventListener('mousemove', function(e){
        xGoal = e.pageX, yGoal = e.pageY;
      });
}
