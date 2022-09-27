'use strict';

let leftClick = '';
let rightClick = '';

const resolveMessage = (text) => {
  document.body.insertAdjacentHTML('afterbegin', `
    <div class="success" data-qa="notification">
      ${text}
    </div>
  `);
};
const rejectedMessage = (text) => {
  document.body.insertAdjacentHTML('afterbegin', `
  <div class="warning" data-qa="notification">
    ${text}
  </div>
`);
};

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', (evt) => {
    if (evt.hasClickedLeft) {
      return;
    }
    leftClick = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if (leftClick !== true) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.body.addEventListener('click', (evt) => {
    leftClick = true;
    resolve('Second promise was resolved');
  });

  document.body.addEventListener('contextmenu', (evt) => {
    evt.preventDefault();
    rightClick = true;
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', (evt) => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.body.addEventListener('contextmenu', (evt) => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then(
  () => resolveMessage('First promise was resolved')
)
  .catch(
    () => rejectedMessage('First promise was rejected')
  );

secondPromise.then(
  () => resolveMessage('Second promise was resolved')
);

thirdPromise.then(
  () => resolveMessage('Third promise was resolved')
);
