'use strict';

const page = document.body;
let clickLeftMouse = false;
let clickRightMouse = false;

const createNotification = (type, info) => {
  page.insertAdjacentHTML('beforeend', `
  <div data-qa="notification"
  class="${type}">
    ${info}
  </div>
  `);
};

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => reject(Error), 3000);

  page.addEventListener('click', () => {
    resolve('succes');
  });
});

firstPromise.then(
  (resolve) => createNotification(resolve, 'First promise was resolved'),
  (reject) => createNotification(reject, 'First promise was rejected')
);

const promiseSecondLeftClick = new Promise((resolve, reject) => {
  page.addEventListener('click', () => {
    clickLeftMouse = true;

    if (!clickRightMouse) {
      resolve('succes');
    }
  }
  );
});

promiseSecondLeftClick.then(
  (resolve) => createNotification(resolve, 'Second promise was resolved')
);

const promiseSecondRightClick = new Promise((resolve, reject) => {
  page.addEventListener('contextmenu', () => {
    clickRightMouse = true;

    if (!clickLeftMouse) {
      resolve('succes');
    }
  });
});

promiseSecondRightClick.then(
  (resolve) => createNotification(resolve, 'Second promise was resolved')
);

const thirdPromise = new Promise((resolve, reject) => {
  page.addEventListener('click', () => {
    if (clickRightMouse && clickLeftMouse) {
      resolve('succes');
    }
  });

  page.addEventListener('contextmenu', () => {
    if (clickRightMouse && clickLeftMouse) {
      resolve('succes');
    }
  });
});

thirdPromise.then(
  (resolve) => createNotification(resolve, 'Third promise was resolved')
);
