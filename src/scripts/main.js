'use strict';

function createElement(text, state) {
  const message = document.createElement('div');

  message.textContent = text;
  message.setAttribute('data-qa', 'notification');
  message.className = state;

  document.body.append(message);
}

function fisrtPromise() {
  const resolver = (resolve, reject) => {
    document.body.addEventListener('click', () => {
      resolve();
    });

    setTimeout(() => {
      reject();
    }, 3000);
  };

  return new Promise(resolver);
}

fisrtPromise()
  .then(() => {
    createElement('First promise was resolved', 'success');
  })
  .catch(() => {
    createElement('First promise was rejected', 'warning');
  });

function secondPromise() {
  const resolver = (resolve) => {
    document.body.addEventListener('mousedown', (clickEvent) => {
      if (clickEvent.button === 0 || clickEvent.button === 2) {
        resolve();
      }
    });
  };

  return new Promise(resolver);
}

secondPromise()
  .then(() => {
    createElement('Second promise was resolved', 'success');
  });

function thirdPromise() {
  let wasLeftClick = false;
  let wasRightClick = false;

  const resolver = (resolve) => {
    document.body.addEventListener('mousedown', (clickEvent) => {
      if (clickEvent.button === 0) {
        wasLeftClick = true;
      } else if (clickEvent.button === 2) {
        wasRightClick = true;
      };

      if (wasLeftClick && wasRightClick) {
        resolve();
      }
    });
  };

  return new Promise(resolver);
}

thirdPromise()
  .then(() => {
    createElement('Third promise was resolved', 'success');
  });
