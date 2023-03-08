'use strict';

let leftClick = false;
let rightClick = false;

const promise1 = new Promise((resolve, reject) => {
  const leftClickF = (e) => {
    leftClick = e;
    resolve('First promise was resolved');
  };

  document.body.addEventListener('click', leftClickF);

  setTimeout(() => {
    if (leftClick === false) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');

      document.body.removeEventListener('click', leftClickF);
    }
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  const rightClickF = (e) => {
    rightClick = e;
    e.preventDefault();

    if (leftClick !== false || rightClick !== false) {
      resolve('Second promise was resolved');
    }
  };

  document.body.addEventListener('contextmenu', rightClickF);
});

const promise3 = new Promise((resolve) => {
  document.body.addEventListener('click', (e) => {
    leftClick = e;

    if (leftClick !== false && rightClick !== false) {
      resolve('Third promise was resolved');
    };
  });

  document.body.addEventListener('contextmenu', (e) => {
    rightClick = e;

    if (leftClick !== false && rightClick !== false) {
      resolve('Third promise was resolved');
    };
  });
});

promise1
  .then((value) => {
    document.body.insertAdjacentHTML('afterbegin', `
    <div data-qa="notification" class="warning">${value}</div>`
    );
  })
  .catch((value) => {
    document.body.insertAdjacentHTML('afterbegin', `
    <div data-qa="notification" class="succes">${value}</div>`
    );
  });

promise2.then((value) => {
  document.body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="warning">${value}</div>`
  );
});

promise3.then((value) => {
  document.body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="warning">${value}</div>`
  );
});
