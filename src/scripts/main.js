'use strict';

const leftClickB4TimeoutPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', e => {
    resolve('!');
  }, { once: true });

  setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);
});

const leftClickPromise = new Promise(resolve => {
  document.body.addEventListener('click', e => {
    resolve('!');
  }, { once: true });
});

const rightClickPromise = new Promise(resolve => {
  document.body.addEventListener('contextmenu', (e) => {
    resolve('!');
  }, { once: true });
});

leftClickB4TimeoutPromise
  .then(() => {
    renderResult('First promise was resolved', true);
  })
  .catch(err => {
    renderResult(err.message, false);
  });

Promise.any([leftClickPromise, rightClickPromise])
  .then(() => {
    renderResult('Second promise was resolved', true);
  });

Promise.all([leftClickPromise, rightClickPromise])
  .then(() => {
    renderResult('Third promise was resolved', true);
  });

const renderResult = (result, success) => {
  const message = document.createElement('div');

  message.classList.add(
    success
      ? 'success'
      : 'warning'
  );
  message.setAttribute('data-qa', 'notification');
  message.innerHTML = result;
  document.body.appendChild(message);
};
