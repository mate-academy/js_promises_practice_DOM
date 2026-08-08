'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    return resolve();
  });

  setTimeout(() => {
    return reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    return resolve();
  });

  document.addEventListener('contextmenu', () => {
    return resolve();
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let hasClick = false;
  let hasContext = false;

  document.addEventListener('click', () => {
    hasClick = true;

    if (hasClick === true && hasContext === true) {
      return resolve();
    }
  });

  document.addEventListener('contextmenu', () => {
    hasContext = true;

    if (hasClick === true && hasContext === true) {
      return resolve();
    }
  });
});

firstPromise
  .then(() => {
    addMessage('First promise was resolved', 'success');
  })
  .catch(() => {
    addMessage('First promise was rejected', 'error');
  });

secondPromise
  .then(() => {
    addMessage('Second promise was resolved', 'success');
  })
  .catch(() => {});

thirdPromise
  .then(() => {
    addMessage('Third promise was resolved', 'success');
  })
  .catch(() => {});

function addMessage(message, type) {
  const body = document.querySelector('body');
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = type;
  div.textContent = message;

  body.appendChild(div);

  // setTimeout(() => {
  //   div.remove();
  // }, 600);
}
