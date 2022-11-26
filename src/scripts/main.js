'use strict';

const root = document.body;

// firstPromise
new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
}).then(() => {
  root.insertAdjacentHTML('beforeend', `
    <div data-qa="success">First promise was resolved</div>
  `);
}).catch(() => {
  root.insertAdjacentHTML('beforeend', `
    <div data-qa="error">First promise was rejected</div>
  `);
});

// secondPromise
new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', e => {
    e.preventDefault();
    resolve();
  });
}).then(() => {
  root.insertAdjacentHTML('beforeend', `
    <div data-qa="success">Second promise was resolved</div>
  `);
});

// thirdPromise
new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', () => {
      resolve();
    });
  });

  document.addEventListener('contextmenu', () => {
    document.addEventListener('click', () => {
      resolve();
    });
  });
}).then(() => {
  root.insertAdjacentHTML('beforeend', `
    <div data-qa="success">Third promise was resolved</div>
  `);
});
