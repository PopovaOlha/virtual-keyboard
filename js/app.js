import keyLayout from './keys.js';
import langKeys from './ru-keys.js';

const Keyboard = {
  elements: {
    container: null,
    title: null,
    textArea: null,
    main: null,
    keysContainer: null,
    engContainer: null,
    textContent: null,
    keys: [],
    changeKeys: [],
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
      container, title, textArea, main, keysContainer, engContainer, textContent,
    } = elements;

    // create elements
    container = document.createElement('div');
    title = document.createElement('h1');
    textArea = document.createElement('textarea');
    main = document.createElement('div');
    keysContainer = document.createElement('div');
    engContainer = document.createElement('div');
    textContent = document.createElement('p');

    // setup elements
    container.classList.add('container');
    title.classList.add('keyboard-title');
    title.innerHTML = 'RSS Виртуальная клавиатура';
    textContent.innerHTML = 'Клавиатура создана в операционной системе Windows. Для переключения языка комбинация: левыe shift + alt';
    textArea.classList.add('body--textarea');
    main.classList.add('keyboard');
    keysContainer.classList.add('keyboard__keys');
    engContainer.classList.add('change__keys', 'hidden');
    textContent.classList.add('text');
    keysContainer.appendChild(this._createKeys(keyLayout));
    engContainer.appendChild(this._createKeys(langKeys));
    this.elements.keys = keysContainer.childNodes;
    this.elements.changeKeys = engContainer.childNodes;

    window.addEventListener('keydown', (e) => {
      if (e.shiftKey && e.altKey) {
        engContainer.classList.toggle('hidden');
        keysContainer.classList.toggle('hidden');
      }
    });

    // add to DOM
    container.append(title, textArea);
    main.append(keysContainer, engContainer);
    document.body.append(container, main, textContent);

    // automatically use keyboard for elements with .body--textarea
    document.querySelectorAll('.body--textarea').forEach((element) => {
      element.addEventListener('focus', () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });
  },

  _createKeys(currentArray) {
    const fragment = document.createDocumentFragment();

    currentArray.forEach((key) => {
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
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
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
            this.properties.value += '\n';
            this._triggerEvent('oninput');
          });

          break;

        case 'Space':
          keyElement.classList.add('key--extra-wide');
          keyElement.innerHtml = ' ';

          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this._triggerEvent('oninput');
          });

          break;

        case 'ShiftL':
          keyElement.classList.add('specific-color', 'key--max-wide');
          keyElement.innerHTML = 'Shift';

          keyElement.addEventListener('click', () => {
          });

          break;

        case 'ShiftR':
          keyElement.classList.add('specific-color', 'key--wide');
          keyElement.innerHTML = 'Shift';

          break;

        case 'Tab':
          keyElement.classList.add('specific-color', 'key--min-wide');
          keyElement.innerHTML = 'Tab';

          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this._triggerEvent('oninput');
          });

          break;

        case 'ControlL':
          keyElement.classList.add('specific-color');
          keyElement.innerHTML = 'Ctrl';

          keyElement.addEventListener('click', () => {
            this.properties.value += '';
          });

          break;

        case 'ControlR':
          keyElement.classList.add('specific-color');
          keyElement.innerHTML = 'Ctrl';

          keyElement.addEventListener('click', () => {
            this.properties.value += '';
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
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
    if (typeof this.eventsHandlers[handlerName] === 'function') {
      this.eventsHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock({ properties } = this) {
    properties.capsLock = !properties.capsLock;
    const currentKey = [...this.elements.keys];
    currentKey.map((key) => {
      if (key.classList[1] !== 'specific-color') {
        key.textContent = properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    });
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || '';
    this.eventsHandlers.oninput = oninput;
    this.eventsHandlers.onclose = onclose;
  },
  close() {
    this.properties.value = '';
    this.eventsHandlers.oninput = oninput;
    this.eventsHandlers.onclose = onclose;
  },
};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});

window.addEventListener('keydown', (e) => {
  const currentKey = [...Keyboard.elements.keys];
  currentKey.forEach((key) => {
    if (e.key === 'CapsLock' && key.textContent === 'CapsLock') {
      Keyboard._toggleCapsLock();
    }

    if (key.textContent.toUpperCase() === e.key.toUpperCase() || key.textContent.toLowerCase() === e.key.toLowerCase()) {
      key.classList.add('active');
      Keyboard.open(key.value, (currentValue) => {
        key.value = currentValue;
      });
    } else {
      key.classList.remove('active');
    }
  });
});
