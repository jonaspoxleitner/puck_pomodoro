// constants

const BUTTON_WATCH_OPTIONS = { edge: "rising", debounce: 50, repeat: true };

// helpers

function fromSecondsToMillis(seconds) {
  return seconds * 1000;
}

function fromMinutesToMillis(minutes) {
  return fromSecondsToMillis(minutes * 60);
}

// states

const states = {
  NONE: {
    duration: 0,
    led: null,
    nextState: "NONE",
  },
  // FOCUS: {
  //   duration: fromSecondsToMillis(3),
  //   led: LED3,
  //   nextState: "PAUSE",
  // },
  // PAUSE: {
  //   duration: fromSecondsToMillis(1),
  //   led: LED2,
  //   nextState: "FOCUS",
  // },
  FOCUS: {
    duration: fromMinutesToMillis(25),
    led: LED3,
    nextState: "PAUSE",
  },
  PAUSE: {
    duration: fromMinutesToMillis(5),
    led: LED2,
    nextState: "FOCUS",
  },
};

// logic

let state = states.NONE;
let timer;

setWatch(
  function () {
    if (state != states.NONE) return end();
    state = states.FOCUS;
    loop();
  },
  BTN,
  BUTTON_WATCH_OPTIONS
);

function loop() {
  state.led.set();
  timer = setTimeout(function () {
    state.led.reset();
    state = states[state.nextState];
    loop();
  }, state.duration);
}

function end() {
  clearTimeout(timer);
  state.led.reset();
  state = states.NONE;
}
