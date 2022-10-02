'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved!');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected!'));
  }, 3000);
});

promise1
  .then(res => {
    appendDiv('success', res);
  })
  .catch(err => {
    appendDiv('warning', err);
  });

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved!');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved!');
  });
});

promise2.then(res => {
  appendDiv('success', res);
});

const promise3 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('left click');
  });

  document.addEventListener('contextmenu', () => {
    resolve('right click');
  });
});

promise3.then(res => {
  const listener = res === 'left click' ? 'contextmenu' : 'click';

  return new Promise(resolve => {
    document.addEventListener(listener, (e) => {
      e.preventDefault();
      resolve('Third promise was resolved!');
    });
  });
})
  .then(res => {
    appendDiv('success', res);
  });

function appendDiv(type, message) {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="notification ${type}" data-qa="notification">${message}</div>`
  );
}
