'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const thirdPromise = new Promise(resolve => {
  let lClick;
  let rClick;

  document.addEventListener('mousedown', (action) => {
    if (action.button === 0) {
      lClick = true;
    }

    if (action.button === 2) {
      rClick = true;
    }

    if (lClick && rClick) {
      resolve();
    }
  });
});

const notification = (type, text) => {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class=${type}>
      ${text}
    </div>
  `);
};

firstPromise.then(() => {
  notification('success', 'First promise was resolved');
});

firstPromise.catch(() => {
  notification('warning', 'First promise was rejected');
});

secondPromise.then(() => {
  notification('success', 'Second promise was resolved');
});

thirdPromise.then(() => {
  notification('success', 'Third promise was resolved');
});
