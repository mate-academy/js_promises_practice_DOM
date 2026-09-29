'use strict';

const LEFT_CLICK_EVENT = 'click';
const RIGHT_CLICK_EVENT = 'contextmenu';
const REJECTION_DELAY = 3000;

const FIRST_RESOLVED_MESSAGE = 'First promise was resolved';
const FIRST_REJECTED_MESSAGE = 'First promise was rejected';
const SECOND_RESOLVED_MESSAGE = 'Second promise was resolved';
const THIRD_RESOLVED_MESSAGE = 'Third promise was resolved';

const NOTIFICATION_NAME = 'notification';
const SUCCESS_CLASS = 'success';
const ERROR_CLASS = 'error';

function showNotification(message, statusClass) {
  const notification = document.createElement('div');

  notification.dataset.qa = NOTIFICATION_NAME;
  notification.classList.add(statusClass);
  notification.textContent = message;

  document.body.append(notification);
}

function handleSuccess(message) {
  showNotification(message, SUCCESS_CLASS);
}

function handleError(message) {
  showNotification(message, ERROR_CLASS);
}

const firstPromise = new Promise((resolve, reject) => {
  const rejectionTimer = setTimeout(() => {
    reject(FIRST_REJECTED_MESSAGE);
  }, REJECTION_DELAY);

  document.addEventListener(
    LEFT_CLICK_EVENT,
    () => {
      clearTimeout(rejectionTimer);
      resolve(FIRST_RESOLVED_MESSAGE);
    },
    { once: true },
  );
});

const secondPromise = new Promise((resolve) => {
  const resolvePromise = () => {
    resolve(SECOND_RESOLVED_MESSAGE);
  };

  document.addEventListener(LEFT_CLICK_EVENT, resolvePromise, { once: true });
  document.addEventListener(RIGHT_CLICK_EVENT, resolvePromise, { once: true });
});

const thirdPromise = new Promise((resolve) => {
  let leftClickOccurred = false;
  let rightClickOccurred = false;

  const resolveAfterBothClicks = () => {
    if (leftClickOccurred && rightClickOccurred) {
      resolve(THIRD_RESOLVED_MESSAGE);
    }
  };

  document.addEventListener(
    LEFT_CLICK_EVENT,
    () => {
      leftClickOccurred = true;
      resolveAfterBothClicks();
    },
    { once: true },
  );

  document.addEventListener(
    RIGHT_CLICK_EVENT,
    () => {
      rightClickOccurred = true;
      resolveAfterBothClicks();
    },
    { once: true },
  );
});

firstPromise.then(handleSuccess, handleError);
secondPromise.then(handleSuccess, handleError);
thirdPromise.then(handleSuccess, handleError);
