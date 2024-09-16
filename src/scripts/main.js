'use strict';

// #region  Promise 1
const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click' || 'contextmenu', (e) => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

promise1.then((result) => {
  succesMessage(result);
})
  .catch((result) => {
    failMessage(result);
  });
// #endregion

// #region  Promise 2
const promise2 = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

promise2.then((result) => {
  succesMessage(result);
})
  .catch((result) => {
    failMessage(result);
  });
// #endregion

// #region  Promise 3
const promise3 = new Promise((resolve) => {
  const arr = {
    right: false,
    left: false,
  };

  document.addEventListener('mousedown', e => {
    if (e.button === 0) {
      arr.left = true;
    }

    if (e.button === 2) {
      arr.right = true;
    }

    if (arr.left && arr.right) {
      resolve('Third promise was resolved');
    }
  });
});

promise3.then((result) => {
  succesMessage(result);
})
  .catch((result) => {
    failMessage(result);
  });
// #endregion

function succesMessage(message) {
  document.body.insertAdjacentHTML('afterbegin', `
    <div class="success" data-qa="notification">
      ${message}
    </div>
  `);
}

function failMessage(message) {
  document.body.insertAdjacentHTML('afterbegin', `
    <div class="warning" data-qa="notification">
      ${message}
    </div>
  `);
}
