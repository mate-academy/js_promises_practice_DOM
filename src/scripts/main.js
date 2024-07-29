'use strict';

new Promise((resolve, reject) => {
  let isClicked = false;

  document.addEventListener('click', () => {
    isClicked = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if (!isClicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
})
  .then((message) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="success">${message}</div>`,
    );
  })
  .catch((message) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="error">${message}</div>`,
    );
  });

new Promise((resolve) => {
  const message = 'Second promise was resolved';

  document.addEventListener('click', () => {
    resolve(message);
  });

  document.addEventListener('contextmenu', () => {
    resolve(message);
  });
}).then((message) => {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div data-qa="notification" class="success">${message}</div>`,
  );
});

new Promise((resolve) => {
  const message = 'Third promise was resolved';

  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', () => {
      resolve(message);
    });
  });

  document.addEventListener('contextmenu', () => {
    document.addEventListener('click', () => {
      resolve(message);
    });
  });
}).then((message) => {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div data-qa="notification" class="success">${message}</div>`,
  );
});
