const body = document.querySelector('body');

function createNotification(message, type) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = type;
  notification.innerText = message;
  body.insertAdjacentElement('afterbegin', notification);
}

function firstPromise() {
  return new Promise((resolve, reject) => {
    let isClicked = false;

    const timeOut = setTimeout(() => {
      createNotification('First promise was rejected', 'error');
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
      isClicked = true;
    }, 3000);

    document.addEventListener('click', (e) => {
      if (e.button === 0 && !isClicked) {
        isClicked = true;
        createNotification('First promise was resolved', 'success');
        clearTimeout(timeOut);
        resolve('First promise was resolved');
      }
    });
  });
}

function secondPromise() {
  return new Promise((resolve) => {
    let isClicked = false;

    document.addEventListener('mousedown', (e) => {
      if ((e.button === 0 || e.button === 2) && !isClicked) {
        isClicked = true;
        createNotification('Second promise was resolved', 'success');
        resolve('Second promise was resolved');
      }
    });
  });
}

function thirdPromise() {
  return new Promise((resolve) => {
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
        createNotification('Third promise was resolved', 'success');
        resolve('Third promise was resolved');
        leftClick = rightClick = false;
      }
    });
  });
}

firstPromise()
  // eslint-disable-next-line no-console
  .then((message) => console.log(message))
  // eslint-disable-next-line no-console
  .catch((error) => console.error(error));

secondPromise()
  // eslint-disable-next-line no-console
  .then((message) => console.log(message))
  // eslint-disable-next-line no-console
  .catch((error) => console.error(error));

thirdPromise()
  // eslint-disable-next-line no-console
  .then((message) => console.log(message))
  // eslint-disable-next-line no-console
  .catch((error) => console.error(error));
