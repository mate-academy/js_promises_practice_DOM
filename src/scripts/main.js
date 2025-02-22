'use strict';

const doc = document.documentElement;
let leftClick = false;
let rightClick = false;

function showMessage(text, isError = false) {
  const message = document.createElement('div');

  message.dataset.qa = 'notification';
  message.innerText = text;
  message.classList.add(isError ? `error` : `success`);

  document.body.append(message);
}

const p1 = new Promise((resolve, reject) => {
  doc.addEventListener(
    'click',
    () => {
      leftClick = true;
      resolve(`First promise was resolved`);
    },
    { once: true },
  );

  setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);
});
const p2 = new Promise((resolve) => {
  const callResolve = () => {
    resolve(`Second promise was resolved`);
  };

  doc.addEventListener(
    'click',
    () => {
      leftClick = true;
      callResolve();
    },
    { once: true },
  );

  doc.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      rightClick = true;
      callResolve();
    },
    { once: true },
  );
});

const p3 = new Promise((resolve) => {
  const checkClicks = () => {
    if (leftClick && rightClick) {
      resolve(`Third promise was resolved`);
    }
  };

  doc.addEventListener('click', checkClicks);

  doc.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    checkClicks();
  });
});

p1.then((value) => {
  showMessage(value);
}).catch((error) => {
  showMessage(error, true);
});

p2.then((value) => {
  showMessage(value);
});

p3.then((value) => {
  showMessage(value);
});
