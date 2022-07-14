'use strict';

function createDiv(classname, text) {
  document.body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class="${classname}">${text}</div>`
  );
}

const firstPromise = new Promise((resolve, reject) => {
  let check = false;

  document.addEventListener('click', () => {
    check = true;
    resolve('First promise was resolved');
  });

  if (!check) {
    setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);
  }
});

firstPromise.then(resolve => {
  createDiv('success', resolve);
}).catch(error => {
  createDiv('warning', error);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise.then(resolve => {
  createDiv('success', resolve);
}).catch(error => {
  createDiv('warning', error);
});

const thirdPromise = new Promise((resolve) => {
  let check = null;

  document.addEventListener('mousedown', (e) => {
    if ((e.button !== check) && (e.button === 0 || e.button === 2)
    && (check !== null)) {
      resolve('Third promise was resolved');
    }
    check = e.button;
  });
});

thirdPromise.then(resolve => {
  createDiv('success', resolve);
}).catch(error => {
  createDiv('warning', error);
});
