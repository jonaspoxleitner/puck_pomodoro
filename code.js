const states = {
  NONE: 0,
  //FOCUS: 3000, // 3 seconds for debug
  //PAUSE: 1000 // 1 second for debug
  FOCUS: 5400000, // 90 minutes
  PAUSE: 600000, // 10 minutes
};

let state = states.NONE;
let timer;

setWatch(
  function () {
    if (state === states.NONE) {
      loop(state);
    } else {
      end();
    }
  },
  BTN,
  { edge: "rising", debounce: 50, repeat: true }
);

function loop(timeout) {
  var isFocus = state === states.FOCUS;
  var led = isFocus ? LED3 : LED2;
  led.set();
  timer = setTimeout(function () {
    led.reset();
    state = isFocus ? states.PAUSE : states.FOCUS;
    loop(state);
  }, timeout);
}

function end() {
  state = states.NONE;
  clearTimeout(timer);
  LED2.reset();
  LED3.reset();
}
