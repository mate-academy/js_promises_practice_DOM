'use strict';

function createPromise1(button, message) {
  return new Promise((resolve, reject) => {
    button.addEventListener('click', () => {
      resolve();

      button.removeEventListener('click', () => {
        resolve();
      });
    });

    setTimeout(() => {
      reject(message);
    }, 3000);
  });
}

function createPromise2(button) {
  return new Promise((resolve, reject) => {
    button.addEventListener('click', () => {
      resolve();
    });

    button.addEventListener('contextmenu', (evt) => {
      evt.preventDefault();
      resolve();
    });
  });
}

function createPromise3(button) {
  return new Promise((resolve, reject) => {
    button.addEventListener('click', first);

    function first(e) {
      button.removeEventListener('click', first);

      button.addEventListener('contextmenu', () => {
        resolve();
      });
    }
  });
}

const doc = document.querySelector('body');

function createMessage(className, text) {
  const element = document.createElement('div');

  element.setAttribute('data-qa', 'notification');
  element.className = className;
  element.innerHTML = text;
  document.body.append(element);
}

const firstPromise = createPromise1(doc, 'Hello');

firstPromise.then(() => {
  createMessage('success', 'First promise was resolved');
}).catch(() => {
  createMessage('warning', 'First promise was rejected');
});

const secondPromise = createPromise2(doc);

secondPromise.then(() => {
  createMessage('success', 'Second promise was resolved');
}).catch(() => {
  createMessage('warning', 'Second promise was rejected');
});

const thirdPromise = createPromise3(doc);

thirdPromise.then(() => {
  createMessage('success', 'Third promise was resolved');
}).catch(() => {
  createMessage('warning', 'Third promise was rejected');
});
