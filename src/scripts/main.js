'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve) => {
  Promise.all([promise1, promise2])
    .then(() => {
      resolve('Third promise was resolved');
    });
});

function appendDiv(res, type) {
  document.body.insertAdjacentHTML('beforeend', ` 
    <div data-qa="notification" class="${type}"> ${res}  </div>`
  );
}

promise1
  .then((res) => {
    appendDiv(res, 'success success__1');
  })
  .catch((res) => {
    appendDiv(res, 'warning');
  });

promise2
  .then((res) => {
    appendDiv(res, 'success success__2');
  });

promise3
  .then((res) => {
    appendDiv(res, 'success success__3');
  });
