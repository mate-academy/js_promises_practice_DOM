'use strict';

function notification(type, message) {
  const element = document.createElement('div');

  element.setAttribute('data-qa', 'notification');
  element.classList.add(type);
  element.textContent = message;
  document.body.appendChild(element);
}

const promise1 = new Promise((resolve, reject) => {
  const successMessage = 'First promise was resolved';
  const errorMessage = 'First promise was rejected';
  const body = document.querySelector('body');

  const timer = setTimeout(() => {
    reject(new Error(errorMessage));
  }, 3000);

  body.addEventListener(
    'click',
    () => {
      clearTimeout(timer);
      resolve(successMessage);
    },
    { once: true },
  );
});

promise1
  .then((message) => {
    notification('success', message);
  })
  .catch((err) => {
    notification('error', err.message);
  });

const promise2 = new Promise((resolve) => {
  const successMessage = 'Second promise was resolved';
  const body = document.querySelector('body');

  body.addEventListener('click', () => {
    resolve(successMessage);
  });

  body.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve(successMessage);
    },
    { once: true },
  );
});

promise2.then((message) => {
  notification('success', message);
});

const promise3 = new Promise((resolve) => {
  const successMessage = 'Third promise was resolved';
  let leftClicked = false;
  let rightClicked = false;

  const body = document.querySelector('body');

  body.addEventListener('click', () => {
    leftClicked = true;

    if (leftClicked === true && rightClicked === true) {
      resolve(successMessage);
    }
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    rightClicked = true;

    if (leftClicked === true && rightClicked === true) {
      resolve(successMessage);
    }
  });
});

promise3.then((message) => {
  const prev = document.querySelector('[data-qa="notification"]');

  if (prev) {
    prev.remove();
  }

  notification('success', message);
});
