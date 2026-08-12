'use strict';

// ця функція додає атрибув яккщо проміс виконався і невиконався
function showNotification(message, isSuccess) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = isSuccess ? 'success' : 'error';
  notification.textContent = message;
  document.body.appendChild(notification);
}

// це перший проміс
// eslint-disable-next-line no-unused-vars
const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  document.addEventListener('click', () => {
    clicked = true;
    resolve();
  });

  setTimeout(() => {
    if (clicked === false) {
      reject(new Error('First promise was not clicked in time'));
    }
  }, 3000);
})
  .then(() => {
    showNotification('First promise was resolved', true);
  })
  .catch(() => {
    showNotification('First promise was rejected', false);
  });

// eslint-disable-next-line no-unused-vars
const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', () => {
    resolve();
  });
})
  .then(() => {
    showNotification('Second promise was resolved', true);
  })
  .catch(() => {
    showNotification('Second promise was rejected', false);
  });
// eslint-disable-next-line no-unused-vars
const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const checkBothClicked = () => {
    if (leftClicked && rightClicked) {
      resolve();
    }
  };

  document.addEventListener('click', () => {
    leftClicked = true;
    checkBothClicked();
  });

  document.addEventListener('contextmenu', () => {
    rightClicked = true;
    checkBothClicked();
  });
})
  .then(() => {
    showNotification('Third promise was resolved', true);
  })
  .catch(() => {
    showNotification('Third promise was rejected', false);
  });
