function showNotification(message) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.textContent = message;
  document.body.appendChild(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  let resolved = false;
  const clickHandler = (mouseEvent) => {
    if (mouseEvent.button === 0) {
      resolved = true;
      resolve('First promise was resolved');
      document.removeEventListener('click', clickHandler);
    }
  };

  document.addEventListener('click', clickHandler);

  setTimeout(() => {
    if (!resolved) {
      reject(new Error('First promise was rejected'));
      document.removeEventListener('click', clickHandler);
    }
  }, 3000);
});

firstPromise
  .then((message) => showNotification('success', message))
  .catch((error) => showNotification('error', error));

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (mouseEvent) => {
    if (mouseEvent.button === 0) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (mouseEvent) => {
    mouseEvent.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise.then((message) => showNotification('success', message));

const thirdPromise = new Promise((resolve) => {
  let leftClickHappened = false;
  let rightClickHappened = false;

  const clickHandler = () => {
    if (leftClickHappened && rightClickHappened) {
      resolve('Third promise was resolved');
      leftClickHappened = false;
      rightClickHappened = false;
    }
  };

  document.addEventListener('click', () => {
    leftClickHappened = true;
    clickHandler();
  });

  document.addEventListener('contextmenu', (mouseEvent) => {
    mouseEvent.preventDefault();
    rightClickHappened = true;
    clickHandler();
  });
});

thirdPromise.then((message) => showNotification('success', message));

document.addEventListener(
  'contextmenu',
  (mouseEvent) => mouseEvent.preventDefault(),
  // eslint-disable-next-line function-paren-newline
);
