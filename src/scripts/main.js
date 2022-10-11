'use strict';

function appendDiv(res, type) {
  document.body.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="${type}">
    ${res}
  </div>
    `);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(`First promise was resolved`);
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
})
  .then((res) => {
    appendDiv(res, 'success');
  })
  .catch(res => {
    appendDiv(res, 'warning');
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
})
  .then(res => {
    appendDiv(res, 'success');
  })
  .catch(res => {
    appendDiv(res, 'warning');
  });

const thirdPromise = Promise.all([firstPromise, secondPromise]);

thirdPromise
  .then(res => {
    appendDiv('Third promise was resolved', 'success');
  });
