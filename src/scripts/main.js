'use strict';

const firstResolvedMsg = 'First promise was resolved';
const firstRejectedMsg = 'First promise was rejected';
const secondResolvedMsg = 'Second promise was resolved';
const thirdResolvedMsg = 'Third promise was resolved';

function showNotification(msg, type) {
  let notification = document.querySelector('[data-qa=notification]');

  if (!notification) {
    notification = document.createElement('div');
    notification.setAttribute('data-qa', 'notification');
    document.body.appendChild(notification);
  }

  // Очищаємо класи перед застосуванням нового
  notification.className = '';

  if (type === 'success') {
    notification.classList.add('success');
  } else if (type === 'error') {
    notification.classList.add('error');
  }

  notification.textContent = msg;
}

// eslint-disable-next-line no-unused-vars
function clearNotification() {
  const notification = document.querySelector('[data-qa=notification]');

  if (notification) {
    notification.remove();
  }
}

// Перший проміс:
function firstPromise() {
  return new Promise((resolve, reject) => {
    let firstResolved = false;
    let firstRejected = false;

    function onClick(e) {
      if (e.button === 0 && !firstResolved && !firstRejected) {
        firstResolved = true;
        resolve(firstResolvedMsg);
        clearTimeout(timeoutId);
        document.removeEventListener('click', onClick);
      }
    }

    document.addEventListener('click', onClick);

    const timeoutId = setTimeout(() => {
      if (!firstResolved) {
        firstRejected = true;
        reject(firstRejectedMsg); // reject строкою, а не new Error
        document.removeEventListener('click', onClick);
      }
    }, 3000);
  });
}

// Другий проміс: резолвиться по лівому або правому кліку (контекстне меню)
function secondPromise() {
  return new Promise((resolve) => {
    let secondResolved = false;

    function onClick(e) {
      if (!secondResolved && e.button === 0) {
        secondResolved = true;
        resolve(secondResolvedMsg);
        removeListeners();
      }
    }

    function onContextMenu(e) {
      e.preventDefault(); // кращий UX — блокувати стандартне меню

      if (!secondResolved) {
        secondResolved = true;
        resolve(secondResolvedMsg);
        removeListeners();
      }
    }

    function removeListeners() {
      document.removeEventListener('click', onClick);
      document.removeEventListener('contextmenu', onContextMenu);
    }

    document.addEventListener('click', onClick);
    document.addEventListener('contextmenu', onContextMenu);
  });
}

// Третій проміс:
function thirdPromise() {
  return new Promise((resolve) => {
    let thirdResolved = false;
    const clicks = {
      left: false,
      right: false,
    };

    function onLeftClick(e) {
      if (e.button === 0) {
        clicks.left = true;
        checkResolve();
      }
    }

    function onRightClick(e) {
      e.preventDefault(); // блокувати контекстне меню
      clicks.right = true;
      checkResolve();
    }

    function checkResolve() {
      if (!thirdResolved && clicks.left && clicks.right) {
        thirdResolved = true;
        resolve(thirdResolvedMsg);
        removeListeners();
      }
    }

    function removeListeners() {
      document.removeEventListener('click', onLeftClick);
      document.removeEventListener('contextmenu', onRightClick);
    }

    document.addEventListener('click', onLeftClick);
    document.addEventListener('contextmenu', onRightClick);
  });
}

// Запускаємо проміси та показуємо повідомлення з типом success/error

firstPromise()
  .then((msg) => {
    showNotification(msg, 'success');
  })
  .catch((msg) => {
    showNotification(msg, 'error');
  });

secondPromise().then((msg) => {
  showNotification(msg, 'success');
});

thirdPromise().then((msg) => {
  showNotification(msg, 'success');
});
