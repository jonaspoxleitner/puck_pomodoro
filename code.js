// helpers

function fromSecondsToMillis(seconds) {
  return seconds * 1000;
}

function fromMinutesToMillis(minutes) {
  return fromSecondsToMillis(minutes * 60);
}

// states

const states = {
  NONE: 0,
  // FOCUS: fromSecondsToMillis(3),
  // PAUSE: fromSecondsToMillis(1)
  FOCUS: fromMinutesToMillis(90),
  PAUSE: fromMinutesToMillis(10),
};

// logic

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
