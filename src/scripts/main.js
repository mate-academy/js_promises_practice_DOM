'use strict';
'use strict';

const logo = document.querySelector('.logo');

const firstPromise = new Promise((resolve, reject) => {
  logo?.addEventListener('click', (e) => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(Error('First promise was rejected!')), 3000);
});

const leftClickProm = new Promise((resolve, reject) => {
  logo?.addEventListener('click', (e) => {
    resolve('promise was resolved');
  });
});
const rightClickProm = new Promise((resolve, reject) => {
  logo?.addEventListener('contextmenu', (e) => {
    resolve('promise was resolved');
  });
});

const secondPromise = Promise.any([leftClickProm, rightClickProm]);

const thirdPromise = Promise.all([leftClickProm, rightClickProm]);

firstPromise
  .then((result) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="success">
      First promise was resolved
      </div>`,
    );
  })
  .catch((err) => {
    if (err) {
    }

    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="error">
      First promise was rejected
      </div>`,
    );
  });

secondPromise
  .then((result) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="success">
      Second promise was resolved
      </div>`,
    );
  })
  .catch((err) => {
    if (err) {
    }

    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="error">
      Second promise was rejected
      </div>`,
    );
  });

thirdPromise
  .then((result) => {
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="success">
      Third promise was resolved
      </div>`,
    );
  })
  .catch((err) => {
    if (err) {
    }

    document.body.insertAdjacentHTML(
      'beforeend',
      `<div data-qa="notification" class="error">
      Third promise was rejected
      </div>`,
    );
  });
