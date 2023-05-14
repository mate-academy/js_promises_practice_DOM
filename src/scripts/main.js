"use strict";

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
})

function firstPromiseResolver(resolve, reject) {
  document.addEventListener("click", () => {
    resolve();
  });

  setTimeout(() => {
    reject();
  }, 3000);
}

function secondPromiseResolver(resolve, reject) {
  document.addEventListener("click", () => {
    resolve();
  });

  document.addEventListener("contextmenu", () => {
    resolve();
  });
}

function thirdPromiseResolver(resolve, reject) {
  let leftClick = false;
  let rightClick = false;

  function checkClicks() {
    if (leftClick && rightClick) {
      resolve();
    }
  }

  document.addEventListener("click", () => {
    leftClick = true;
    checkClicks();
  });

  document.addEventListener("contextmenu", () => {
    rightClick = true;
    checkClicks();
  });
};

const createNotification = (success, promiseNumber) => {
  const notification = document.createElement("div");
  notification.setAttribute("data-qa", "notification");

  if (success) {
    notification.className = "success";
    notification.innerText = `${promiseNumber} promise was resolved`;
  } else {
    notification.className = "warning";
    notification.innerText = `${promiseNumber} promise was rejected`;
  }

  document.body.append(notification);
};

const firstPromise = new Promise(firstPromiseResolver);
const secondPromise = new Promise(secondPromiseResolver);
const thirdPromise = new Promise(thirdPromiseResolver);

firstPromise
  .then(() => createNotification(true, "First"))
  .catch(() => createNotification(false, "First"));

secondPromise
  .then(() => createNotification(true, "Second"))
  .catch(() => createNotification(false, "Second"));

thirdPromise
  .then(() => createNotification(true, "Third"))
  .catch(() => createNotification(false, "Third"));
