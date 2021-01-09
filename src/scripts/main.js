'use strict';

function notificationMessage(type, description, customType) {
  const message = document.createElement(`div`);

  message.dataset.qa = `notification`;
  message.textContent = description;
  message.classList.add(type, customType);
  document.body.append(message);
}

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener(`mousedown`, () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

promise1
  .then(() => {
    notificationMessage(`success`, `First promise was resolved`, `success1`);
  })
  .catch(() => {
    notificationMessage(`warning`, `First promise was rejected`, `reject1`);
  });

const promise2 = new Promise((resolve) => {
  document.addEventListener(`mousedown`, (e) => {
    if (e.button === 1) {
      return;
    }
    resolve();
  });
});

promise2
  .then(() => {
    notificationMessage(`success`, `Second promise was resolved`, `success2`);
  });

const promise3 = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener(`mousedown`, (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve();
    }
  });
});

promise3
  .then(() => {
    notificationMessage(`success`, `Third promise was resolved`, `success3`);
  });
