'use strict';

// #1
new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
}).then(text => addNotification(text, 'success'))
  .catch(text => addNotification(text, 'warning'));

// #2
new Promise((resolve) => {
  document.addEventListener('mouseup', () => {
    if (event.button === 0 || event.button === 2) {
      resolve('Second promise was resolved');
    }
  });
}).then(text => addNotification(text, 'success'));

// #3
new Promise(resolve => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mouseup', () => {
    if (event.button === 0) {
      leftClick = true;
    }

    if (event.button === 2) {
      rightClick = true;
    }

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
