'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    const messageResolvePromise1 = `First promise was resolved`;

    resolve(messageResolvePromise1);
  });

  setTimeout(() => {
    const messageRejectPromise1 = `First promise was rejected`;

    reject(messageRejectPromise1);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (ev) => {
    ev.preventDefault();

    if (ev.button === 0) {
      leftClick = true;
    }

    if (ev.button === 2) {
      rightClick = true;
    }

    const messageResolvePromise2 = `Second promise was resolved`;

    if (leftClick || rightClick) {
      resolve(messageResolvePromise2);
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (ev) => {
    ev.preventDefault();

    if (ev.button === 0) {
      leftClick = true;
    }

    if (ev.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      const messageResolvePromise3 = `Third promise was resolved`;

      resolve(messageResolvePromise3);
    }
  });
});

firstPromise
  .then((text) => {
    const notification = document.createElement('div');

    notification.setAttribute('class', 'success');
    notification.setAttribute('data-qa', 'notification');
    notification.textContent = text;

    document.body.append(notification);
  })
  .catch((text) => {
    const notification = document.createElement('div');

    notification.setAttribute('class', 'error');
    notification.setAttribute('data-qa', 'notification');
    notification.textContent = text;

    document.body.append(notification);
  });

secondPromise.then((text) => {
  const notification = document.createElement('div');

  notification.setAttribute('class', 'success');
  notification.setAttribute('data-qa', 'notification');
  notification.textContent = text;

  document.body.append(notification);
});

thirdPromise.then((text) => {
  const notification = document.createElement('div');

  notification.setAttribute('class', 'success');
  notification.setAttribute('data-qa', 'notification');
  notification.textContent = text;

  document.body.append(notification);
});
