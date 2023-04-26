const Keyboard = {
  elements: {
    container: null,
    textArea: null,
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventsHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: '',
    capsLock: false,
  },

  init({ elements } = this) {
    let {
      container, textArea, main, keysContainer,
    } = elements;

    // create elements
    container = document.createElement('div');
    textArea = document.createElement('textarea');
    main = document.createElement('div');
    keysContainer = document.createElement('div');

    // setup elements
    container.classList.add('container');
    textArea.classList.add('body--textarea');
    main.classList.add('keyboard');
    keysContainer.classList.add('keyboard__keys');

    // add to DOM
    container.append(textArea);
    main.append(keysContainer);
    document.body.append(container, main);
  },

  createKeys() {},

  triggerEvent(handlerName) {
    console.log(`Event Triggered! Event name${handlerName}`);
  },

  toggleCapsLock() {
    console.log('capslock Toggled!');
  },

  changeLanguage() {},

  keyboardSynchronization() {

  },
};

document.addEventListener('keydown', (event) => {
  if (event.key) {
    console.log(event.key);
  }
});

function startInit() {
  Keyboard.init();
}

window.addEventListener('DOMContentLoaded', startInit);
