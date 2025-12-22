'use strict';

const TYPE_SUCCESS = 'success';
const TYPE_ERROR = 'error';

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  const timeOutId = setTimeout(checkClicked, 3000);
  const clickEvent = (ev) => {
    clicked = true;
    resolve(data);
  };

  const data = {
    message: 'First promise was resolved',
    timeOutId,
    click: clickEvent,
  };

  document.addEventListener('click', clickEvent);

  function checkClicked() {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
    }
  }
});

const secondPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', (ev) => {
    if (ev.button === 0) {
      leftClicked = true;
    }

    checkClicked();
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    rightClicked = true;
    checkClicked();
  });

  function checkClicked() {
    if (leftClicked || rightClicked) {
      resolve('Second promise was resolved');
    }
  }
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', (ev) => {
    if (ev.button === 0) {
      leftClicked = true;
    }

    checkBothClicked();
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    rightClicked = true;
    checkBothClicked();
  });

  function checkBothClicked() {
    if (rightClicked && leftClicked) {
      resolve('Third promise was resolved');
    }
  }
});

function cleanUp(timeOutId, ...handlers) {
  document.removeEventListener('click', handlers[0]);
  clearTimeout(timeOutId);
}

firstPromise
  .then((data) => {
    createNotification(data.message, TYPE_SUCCESS);
    cleanUp(data.timeOutId, data.click);
  })
  .catch((error) => {
    createNotification(error.message, TYPE_ERROR);
  });

secondPromise
  .then((message) => {
    createNotification(message, TYPE_SUCCESS);
  })
  .catch((message) => {
    createNotification(message, TYPE_ERROR);
  });

thirdPromise
  .then((message) => {
    createNotification(message, TYPE_SUCCESS);
  })
  .catch((message) => {
    createNotification(message, TYPE_ERROR);
  });

function createNotification(text, type) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = type;
  notification.textContent = text;
  document.body.insertAdjacentElement('afterbegin', notification);
}
