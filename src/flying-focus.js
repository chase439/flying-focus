(function() {
  if (!window.addEventListener) {
    return;
  }

  'use strict';

  var TRANSITION_DURATION = 150;

  var ringElem = null;
  var movingId = 0;
  var prevFocused = null;
  var keyDownTime = 0;

  var win = window;
  var doc = document;
  var docElem = doc.documentElement;
  var body = doc.body;

  docElem.addEventListener('keydown', function(event) {
    var code = event.which;
    // Show animation only upon Tab or Arrow keys press.
    if (code === 9 || (code > 36 && code < 41)) {
      keyDownTime = Date.now();
    }
  }, false);

  docElem.addEventListener('mousedown', function(event) {
    if(ringElem) {
      onEnd();
    }
  }, false);

  docElem.addEventListener('focus', function(event) {
    var target = event.target;
    if (target.id === 'flying-focus') {
      return;
    }

    var isFirstFocus = false;
    if (!ringElem) {
      isFirstFocus = true;
      initialize();
    }

    var offset = offsetOf(target);
    ringElem.style.left = offset.left + 'px';
    ringElem.style.top = offset.top + 'px';
    ringElem.style.width = target.offsetWidth + 'px';
    ringElem.style.height = target.offsetHeight + 'px';

    if(isFirstFocus){
      return;
    }

    if (!isJustPressed()) {
      onEnd();
      return;
    }

    onEnd(true);
    target.classList.add('flying-focus_target');
    ringElem.classList.add('flying-focus_visible');
    prevFocused = target;
  }, true);


  docElem.addEventListener('blur', function() {
    onEnd(true);
  }, true);


  function initialize() {
    ringElem = doc.createElement('flying-focus'); // use uniq element name to decrease the chances of a conflict with website styles
    ringElem.id = 'flying-focus';
    ringElem.style.transitionDuration = ringElem.style.WebkitTransitionDuration = TRANSITION_DURATION / 1000 + 's';
    body.appendChild(ringElem);
  }

  function onEnd(onlyIf) {
    if (onlyIf && !movingId) {
      return;
    }
    if(movingId){
      clearTimeout(movingId);
      movingId = 0;
    }
    ringElem.classList.remove('flying-focus_visible');
    if(prevFocused){
      prevFocused.classList.remove('flying-focus_target');
      prevFocused = null;
    }
  }

  function isJustPressed() {
    return Date.now() - keyDownTime < 42
  }

  function offsetOf(elem) {
    var rect = elem.getBoundingClientRect();
    var clientLeft = docElem.clientLeft || body.clientLeft;
    var clientTop = docElem.clientTop || body.clientTop;
    var scrollLeft = win.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    var scrollTop = win.pageYOffset || docElem.scrollTop || body.scrollTop;
    var left = rect.left + scrollLeft - clientLeft;
    var top = rect.top + scrollTop - clientTop;
    return {
      top: top || 0,
      left: left || 0
    };
  }
})();
