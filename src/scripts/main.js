'use strict';

function showNotification(posTop, posRight, description, type) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';

  notification.style.position = 'fixed';

  notification.style.margin = '0';
  notification.style.width = '300px';
  notification.style.padding = '10px';
  notification.style.borderRadius = '10px';

  notification.classList.add(type);
  notification.textContent = description;

  notification.style.top = `${posTop}px`;
  notification.style.right = `${posRight}px`;

  document.body.append(notification);

  setTimeout(() => (notification.style.display = 'none'), 2000);
}

const firstPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(reject, 3_000, 'First promise was rejected');

  document.addEventListener(
    'click',
    (e) => {
      e.preventDefault();

      clearTimeout(timeout);
      resolve('First promise was resolved');
    },
    { once: true },
  );
});

firstPromise
  .then((message) => {
    showNotification(10, 10, message, 'success');
  })
  .catch((message) => {
    showNotification(10, 10, message, 'error');
  });

const secondPromise = new Promise((resolve) => {
  const callback = (e) => {
    e.preventDefault();

    document.removeEventListener('click', callback);
    document.removeEventListener('contextmenu', callback);

    resolve('Second promise was resolved');
  };

  document.addEventListener('click', callback);
  document.addEventListener('contextmenu', callback);
});

secondPromise
  .then((message) => {
    showNotification(60, 10, message, 'success');
  })
  .catch((message) => {
    showNotification(60, 10, message, 'error');
  });

const thirdPromise = new Promise((resolve) => {
  let clicks = 0;

  const callback = (e) => {
    e.preventDefault();

    if (clicks) {
      resolve('Third promise was resolved');
    }

    clicks++;
  };

  document.addEventListener('click', callback, { once: true });
  document.addEventListener('contextmenu', callback, { once: true });
});

thirdPromise.then((message) => {
  showNotification(110, 10, message, 'success');
});
