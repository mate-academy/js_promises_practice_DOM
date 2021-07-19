'use strict';

let leftClick = false;
let rightClick = false;

document.addEventListener('click', () => {
  leftClick = true;
});

document.addEventListener('contextmenu', () => {
  rightClick = true;
});

new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
}).then(text => addNotification(text, 'success'))
  .catch(text => addNotification(text, 'warning'));

new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
}).then(text => addNotification(text, 'success'));

new Promise(resolve => {
  document.addEventListener('click', () => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
}).then(text => addNotification(text, 'success'));

function addNotification(text, notificationClass) {
  document.body.insertAdjacentHTML('beforeend', `
    <div 
      class='notification ${notificationClass}'
      data-qa="notification"
    >${text}</div>
  `);
}
