'use strict';

let rightClick = false;

let leftClick = false;

const promiseResolve1 = () => {
  document.body.insertAdjacentHTML(`beforeend`, `
    <div data-qa="notification" class = 'success'>
      First promise was resolved
    </div>
  `);
};

const promiseReject = () => {
  document.body.insertAdjacentHTML(`beforeend`, `
    <div data-qa="notification" class = 'warning'>
      First promise was rejected
    </div>
  `);
};

const promise1 = new Promise((resolve, reject) => {
  document.body.addEventListener('click', el => {
    rightClick = true;
    resolve();
  });

  setTimeout(reject, 3000);
});

promise1.then(promiseResolve1).catch(promiseReject);

const promiseResolve2 = () => {
  document.body.insertAdjacentHTML(`beforeend`, `
    <div data-qa="notification" class = 'success'>
      Second promise was resolved
    </div>
  `);
};

const promise2 = new Promise(resolve => {
  document.body.addEventListener('click', () => {
    rightClick = true;
    resolve();
  });

  document.body.addEventListener('contextmenu', (el) => {
    el.preventDefault();
    leftClick = true;
    resolve();
  });
});

promise2.then(promiseResolve2);

const promiseResolve3 = () => {
  document.body.insertAdjacentHTML(`beforeend`, `
    <div data-qa="notification" class = 'success'>
      Third promise was resolved
    </div>
  `);
};

const promise3 = new Promise(resolve => {
  document.body.addEventListener('click', () => {
    if (leftClick) {
      resolve();
    }
  });

  document.body.addEventListener('contextmenu', () => {
    if (rightClick) {
      resolve();
    }
  });
});

promise3.then(promiseResolve3);
