'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

promise1.then(data => {
  document.body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="success">
    ${data}
  </div>
  `);
})
  .catch(err => {
    document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="warning">
      ${err}
    </div>
    `);
  });

const promise2 = new Promise((resolve) => {
  ['click', 'contextmenu'].forEach(handler => {
    document.addEventListener(handler, () => {
      resolve('Second promise was resolved');
    });
  });
});

promise2.then(data => {
  document.body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="success">
    ${data}
  </div>
  `);
});

const promise3 = Promise.all([
  new Promise((resolve) => {
    document.addEventListener('click', () => {
      resolve('Third promise was resolved');
    });
  }),
  new Promise((resolve) => {
    document.addEventListener('contextmenu', () => {
      resolve();
    });
  })]);

promise3.then(data => {
  document.body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="success">
    ${data}
  </div>
  `);
});
