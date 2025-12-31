'use strict';

let leftClick = false;
let rightClick = false;

// eslint-disable-next-line no-unused-vars
const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'click',
    (e) => {
      if (e.button === 0 && !leftClick) {
        // LEFT CLICK ANYWHERE
        leftClick = true;
        resolve('First promise was resolved');
      }
    },
    { once: true },
  );

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
})
  .then((message) => {
    document.body.innerHTML += `<div class="message success" data-qa="notification">${message}</div>`;
  })
  .catch((error) => {
    document.body.innerHTML += `<div class="message error" data-qa="notification">${error.message}</div>`;
  }); // eslint-disable-line no-unused-vars

// 🎯 PROMISE 2: LEFT LUB RIGHT CLICK (mousedown + contextmenu)
const secondPromise = new Promise((resolve) => {
  // LEFT CLICK
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }
  });

  // RIGHT CLICK (contextmenu)
  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      rightClick = true;

      if (leftClick || rightClick) {
        resolve('Second promise was resolved');
      }
    },
    { once: true },
  );

  // LEFT CLICK TEŻ
  document.addEventListener(
    'click',
    (e) => {
      if (e.button === 0 && (leftClick || rightClick)) {
        resolve('Second promise was resolved');
      }
    },
    { once: true },
  );
});

secondPromise.then((message) => {
  document.body.innerHTML += `<div class="message success" data-qa="notification">${message}</div>`;
}); // eslint-disable-line no-unused-vars

// 🎯 PROMISE 3: OBA kliknięcia
// eslint-disable-next-line no-unused-vars
const thirdPromise = Promise.all([
  new Promise((resolve) => {
    if (leftClick) {
      resolve();
    } else {
      document.addEventListener(
        'click',
        (e) => {
          if (e.button === 0) {
            leftClick = true;
            resolve();
          }
        },
        { once: true },
      );
    }
  }),
  new Promise((resolve) => {
    if (rightClick) {
      resolve();
    } else {
      document.addEventListener(
        'contextmenu',
        (e) => {
          e.preventDefault();
          rightClick = true;
          resolve();
        },
        { once: true },
      );
    }
  }),
]).then(() => {
  document.body.innerHTML += `<div class="message success" data-qa="notification">Third promise was resolved</div>`;
}); // eslint-disable-line no-unused-vars
