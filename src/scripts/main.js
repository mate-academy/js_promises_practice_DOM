'use strict';

const body = document.querySelector('body');
let firstPromiceResult = false;
let secondPromiseResult = '';

function showMessage(type, text, topIndent) {
  const message = document.createElement('div');

  message.className = type;
  message.textContent = text;
  message.dataset.qa = 'notification';

  message.style.cssText = `
    position: absolute;
    top: ${topIndent}px;
    right: 50px;
    padding: 25px;

    width: 200px;

    font-family: Verdana, sans-serif;
    font-size: 18px;
    font-weight: 500;
    text-align: center;

    border-radius: 15px;

    background-color: rgba(230, 230, 0, 0.5);
  `;
  body.append(message);
};

function firstPromise() {
  const resolver = (resolved, canceled) => {
    body.addEventListener('click', () => {
      resolved(true);
    });

    setTimeout(() => {
      canceled(false);
    }, 3000);
  };

  return new Promise(resolver);
}

function secondPromise() {
  const resolver = (resolved) => {
    body.addEventListener('contextmenu', action => {
      action.preventDefault();
      resolved('right');
    });

    body.addEventListener('click', () => {
      resolved('left');
    });
  };

  return new Promise(resolver);
}

function thirdPromise() {
  const resolver = (resolved) => {
    resolved();
  };

  return new Promise(resolver);
}

const promise1 = firstPromise();

promise1
  .then(() => {
    showMessage('success', 'First promise was resolved (left click)', 10);
    firstPromiceResult = true;

    const promise2 = secondPromise();

    return promise2;
  },
  () => {
    showMessage('warning', 'First promise was rejected!', 10);

    const promise2 = secondPromise();

    return promise2;
  }
  )
  .then((result) => {
    showMessage('success'
      , `Second promise was resolved (${result} click)`, 115);
    secondPromiseResult = result;

    const promise3 = thirdPromise();

    return promise3;
  })
  .then(() => {
    if (secondPromiseResult === 'right' && firstPromiceResult === true) {
      showMessage('success', 'Third promise was resolved', 220);
    }
  });
