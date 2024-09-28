'use strict';

function showNotification(message, type) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(type);
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = 'translateY(-100px)';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (evt) => {
    if (evt.button === 0) {
      clearTimeout(timer);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    resolve('Second promise was resolved');
  });
});

let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    const checkClickedButtons = () => {
      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
      }
    };

    document.addEventListener('click', () => {
      leftClicked = true;

      checkClickedButtons();
    });

    document.addEventListener('contextmenu', (evt) => {
      evt.preventDefault();
      rightClicked = true;
      checkClickedButtons();
    });
  });
});

firstPromise
  .then((message) => {
    showNotification(message, 'success');
  })
  .catch((message) => {
    showNotification(message, 'error');
  });

secondPromise.then((message) => {
  showNotification(message, 'success');
});

thirdPromise.then((message) => {
  showNotification(message, 'success');
});
