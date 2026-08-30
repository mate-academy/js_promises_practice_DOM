'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'click',
    () => {
      resolve('First promise was resolved');
    },
    { once: true },
  );

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'click',
    () => {
      resolve('Second promise was resolved');
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    (clickEvent) => {
      clickEvent.preventDefault();
      resolve('Second promise was resolved');
    },
    { once: true },
  );
});

const leftClickPromise = new Promise((resolve) => {
  document.addEventListener(
    'click',
    () => {
      resolve();
    },
    { once: true },
  );
});

const rightClickPromise = new Promise((resolve) => {
  document.addEventListener(
    'contextmenu',
    (clickEvent) => {
      clickEvent.preventDefault();
      resolve();
    },
    { once: true },
  );
});

const thirdPromise = Promise.all([leftClickPromise, rightClickPromise]).then(
  () => 'Third promise was resolved',
);

firstPromise
  .then((message) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="success">${message}</div>`,
    );
  })
  .catch((error) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="error">${error.message}</div>`,
    );
  });

secondPromise
  .then((message) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="success">${message}</div>`,
    );
  })
  .catch((error) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="error">${error.message}</div>`,
    );
  });

thirdPromise
  .then((message) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="success">${message}</div>`,
    );
  })
  .catch((error) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="error">${error.message}</div>`,
    );
  });
