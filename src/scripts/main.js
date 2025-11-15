'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let settled = false;

  const timer = setTimeout(() => {
    if (!settled) {
      settled = true;
      reject(new Error('First promise was rejected'));
    }
  }, 3000);

  const onClick = (myEvent) => {
    if (!settled && myEvent.button === 0) {
      settled = true;
      clearTimeout(timer);
      resolve('First promise was resolved');
      document.removeEventListener('click', onClick);
    }
  };

  document.addEventListener('click', onClick);
});

firstPromise
  .then((message) => {
    showNotification('success', message);
  })
  .catch((error) => {
    showNotification('error', error);
  });

const secondPromise = new Promise((resolve, reject) => {
  const onMouseDown = (myEvent) => {
    if (myEvent.button === 0 || myEvent.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', onMouseDown);
    }
  };

  document.addEventListener('mousedown', onMouseDown);
});

secondPromise
  .then((message) => {
    showNotification('success', message);
  })
  .catch((error) => {
    showNotification('error', error);
  });

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rigthClick = false;

  const onMouseDown = (myEvent) => {
    if (myEvent.button === 0) {
      leftClick = true;
    }

    if (myEvent.button === 2) {
      rigthClick = true;
    }

    if (leftClick && rigthClick) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', onMouseDown);
    }
  };

  document.addEventListener('mousedown', onMouseDown);
});

thirdPromise
  .then((message) => {
    showNotification('success', message);
  })
  .catch((error) => {
    showNotification('error', error);
  });

function showNotification(type, message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(type);
  div.textContent = message instanceof Error ? message.message : message;
  div.style.display = 'block';

  document.body.appendChild(div);
}
