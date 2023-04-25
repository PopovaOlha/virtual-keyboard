"use strict"

const Keyboard = {
    elements: {
        container: null,
        textArea: null,
        main: null,
        keysContainer: null,
        keys: []
    },

    eventsHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init({elements} = this) {
       let {container, textArea, main, keysContainer} = elements;

        // create elements
       container = document.createElement("div");
       textArea = document.createElement("textarea");
       main = document.createElement("div");
       keysContainer = document.createElement("div");

       //setup elements
       container.classList.add("container");
       textArea.classList.add("body--textarea");
       main.classList.add("keyboard");
       keysContainer.classList.add("keyboard__keys");

       //add to DOM
       container.append(textArea);
       main.append(keysContainer);
       document.body.append(container, main);

    },

    _createKeys() {

    },

    _triggerEvent(handlerName) {
      console.log("Event Triggered! Event name" + handlerName);
    },

    _toggleCapsLock() {
        console.log("capslock Toggled!")
    },

    _changeLanguage() {

    },

    keyboardSynchronization() {

    }
};

document.addEventListener('keydown', function(event) {
    if (event.key) {
    }
});

  window.addEventListener("DOMContentLoaded", startInit);
  function startInit() {
    Keyboard.init();
  }