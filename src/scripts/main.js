'use strict';

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const styleNotification = (className, color) => {
  document.querySelectorAll(className).forEach(item => {
    item.style.background = color;
    item.style.padding = '10px';
    item.style.margin = '10px';
    item.style.borderRadius = '15px';
  });
};

const insertresult = (className, data) => {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class ='${className}' data-qa="notification">
      ${className === 'success' ? data : String(data).replace('Error: ', '')}
    </div>`);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 1 || e.button === 2) {
      resolve('First promise was resolved');
    }
  });
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(data => {
    insertresult('success', data);
    styleNotification('.success', '#90EE90');
  })
  .catch(data => {
    insertresult('warning', data);
    styleNotification('.warning', '#CCCC00');
  });

secondPromise.then(data => {
  insertresult('success', data);
  styleNotification('.success', '#90EE90');
});

thirdPromise.then(data => {
  insertresult('success', data);
  styleNotification('.success', '#90EE90');
});
