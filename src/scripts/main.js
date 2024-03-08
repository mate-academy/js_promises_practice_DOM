'use strict';

function addMessageBox(nr, hasSucceeded) {
  const newEl = document.createElement('div');

  newEl.classList.add(hasSucceeded ? 'success' : 'error');
  newEl.setAttribute('data-qa', 'notification');

  newEl.appendChild(
    document.createTextNode(
      ` ${nr} promise was ${hasSucceeded ? 'resolved' : 'rejected'}`,
    ),
  );
  document.querySelector('body').appendChild(newEl);
}

const documentEl = document.body;

const promise1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Time is up'));
    }, 3000);

    documentEl.addEventListener(
      'click',
      () => {
        resolve();
      },
      { once: true },
    );
  });
};

const promise2 = () => {
  return new Promise((resolve) => {
    documentEl.addEventListener(
      'click',
      () => {
        resolve();
      },
      { once: true },
    );

    documentEl.addEventListener(
      'contextmenu',
      () => {
        resolve();
      },
      { once: true },
    );
  });
};

const promise3 = () => {
  return new Promise(async (resolve) => {
    let clickCount = 0;

    documentEl.addEventListener(
      'click',
      () => {
        clickCount++;

        if (clickCount === 2) {
          resolve();
        }
      },
      { once: true },
    );

    documentEl.addEventListener(
      'contextmenu',
      () => {
        clickCount++;

        if (clickCount === 2) {
          resolve();
        }
      },
      { once: true },
    );
  });
};

function successFailHandler(num) {
  return [
    () => {
      addMessageBox(num, true);
    },
    () => {
      addMessageBox(num, false);
    },
  ];
}

promise1().then(...successFailHandler('First'));
promise2().then(...successFailHandler('Second'));
promise3().then(...successFailHandler('Third'));
