'use strict';

function notificationMessage(type, description, topPosition) {
  const message = document.createElement(`div`);

  message.dataset.qa = `notification`;
  message.textContent = description;
  message.classList.add(type);
  message.style.top = topPosition;
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
    notificationMessage(`success`, `First promise was resolved`, `50px`);
  })
  .catch(() => {
    notificationMessage(`warning`, `First promise was rejected`);
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
    notificationMessage(`success`, `Second promise was resolved`, `150px`);
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
    notificationMessage(`success`, `Third promise was resolved`, `250px`);
  });
