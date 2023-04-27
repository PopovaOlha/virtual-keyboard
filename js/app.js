import keyLayout from './keys.js';

const Keyboard = {
  elements: {
    container: null,
    title: null,
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
      container, title, textArea, main, keysContainer,
    } = elements;

    // create elements
    container = document.createElement('div');
    title = document.createElement('h1');
    textArea = document.createElement('textarea');
    main = document.createElement('div');
    keysContainer = document.createElement('div');

    // setup elements
    container.classList.add('container');
    title.classList.add('keyboard-title');
    title.innerHTML = 'RSS Виртуальная клавиатура';
    textArea.classList.add('body--textarea');
    main.classList.add('keyboard');
    keysContainer.classList.add('keyboard__keys');
    keysContainer.appendChild(this._createKeys());

    // add to DOM
    container.append(title, textArea);
    main.append(keysContainer);
    document.body.append(container, main);
  },

  _createKeys({ properties } = this) {
    const fragment = document.createDocumentFragment();

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['Backspace', 'Del', 'Enter', 'ShiftR', 'CtrlR'].indexOf(key) !== -1;
      const addClass = ['Del', 'Win', 'Alt', '◄', '▼', '►'].indexOf(key) !== -1;

      // add attributes of a key
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      if (addClass) {
        keyElement.classList.add('specific-color');
      }

      switch (key) {
        case 'Backspace':
          keyElement.classList.add('specific-color', 'key--max-wide');
          keyElement.innerHTML = 'Backspace';

          keyElement.addEventListener('click', () => {
            properties.value = properties.value.substring(0, properties.value.length - 1);
            this._triggerEvent('oninput');
          });

          break;

        case 'CapsLock':
          keyElement.classList.add('specific-color', 'key--max-wide');
          keyElement.innerHTML = 'CapsLock';

          keyElement.addEventListener('click', () => {
            this._toggleCapsLock();
          });

          break;

        case 'Enter':
          keyElement.classList.add('specific-color', 'key--wide');
          keyElement.innerHTML = 'Enter';

          keyElement.addEventListener('click', () => {
            properties.value += '\n';
            this._triggerEvent('oninput');
          });

          break;

        case 'Space':
          keyElement.classList.add('key--extra-wide');
          keyElement.innerHtml = ' ';

          keyElement.addEventListener('click', () => {
            properties.value += ' ';
            this._triggerEvent('oninput');
          });

          break;

        case 'ShiftL':
          keyElement.classList.add('specific-color', 'key--max-wide');
          keyElement.innerHTML = 'Shift';

          keyElement.addEventListener('click', () => {
            alert('поменять символы');
          });

          break;

        case 'Tab':
          keyElement.classList.add('specific-color', 'key--min-wide');
          keyElement.innerHTML = 'Tab';

          keyElement.addEventListener('click', () => {
            alert('поменять символы');
          });

          break;

        case 'ShiftR':
          keyElement.classList.add('specific-color', 'key--wide');
          keyElement.innerHTML = 'Shift';

          keyElement.addEventListener('click', () => {
            alert('поменять символы');
          });

          break;

        case 'CtrlL':
          keyElement.classList.add('specific-color');
          keyElement.innerHTML = 'Ctrl';

          keyElement.addEventListener('click', () => {
            alert('поменять символы');
          });

          break;

        case 'CtrlR':
          keyElement.classList.add('specific-color');
          keyElement.innerHTML = 'Ctrl';

          keyElement.addEventListener('click', () => {
            alert('поменять символы');
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            properties.value = properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            this._triggerEvent('oninput');
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });
    return fragment;
  },

  _triggerEvent(handlerName) {
    console.log(`Event Triggered! Event name${handlerName}`);
  },

  _toggleCapsLock() {
    console.log('capslock Toggled!');
  },

  changeLanguage() {},

  keyboardSynchronization() {

  },
};

function keyboardKey(event) {
  event.preventDefault();
  const getKey = keyLayout.map((key) => {
    if (event.key === key) {
      console.log(event.target);
    }
  });
}
window.addEventListener('keydown', keyboardKey);
function startInit() {
  Keyboard.init();
}

window.addEventListener('DOMContentLoaded', startInit);
