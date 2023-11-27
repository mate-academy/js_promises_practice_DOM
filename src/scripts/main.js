'use strict';

const body = document.querySelector('body');

function addDiv(message, className) {
  const notificationDiv = document.createElement('div');

  notificationDiv.setAttribute('data-qa', 'notification');
  notificationDiv.textContent = message;
  notificationDiv.classList.add(className);

  body.append(notificationDiv);
}

const logo = document.querySelector('.logo');

const clickedEvents = {
  left: 0,
  right: 0,
};

const promise1 = new Promise((resolve, reject) => {
  logo.addEventListener('click', function(evt) {
    clickedEvents.left = 1;
    resolve(`First promise was resolved`);
  });

  setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);
});

promise1.then((result) => {
  addDiv(result, 'success');
})
  .catch((error) => {
    addDiv(error.message, `warning`);
  });

const promise2 = new Promise((resolve) => {
  logo.addEventListener('click', function(evt) {
    clickedEvents.left = 1;
    resolve(`Second promise was resolved`);
  });

  logo.addEventListener('contextmenu', function(evt) {
    clickedEvents.right = 1;
    resolve(`Second promise was resolved`);
  });
});

promise2.then((result) => {
  addDiv(result, 'success');
});

const promise3 = new Promise((resolve) => {
  function clickCheck() {
    if (clickedEvents.left === 1 && clickedEvents.right === 1) {
      return true;
    }
  }

  logo.addEventListener('click', function(evt) {
    clickedEvents.left = 1;

    if (clickCheck()) {
      resolve(`Third promise was resolved`);
    }
  });

  logo.addEventListener('contextmenu', function(evt) {
    clickedEvents.right = 1;

    if (clickCheck()) {
      resolve(`Third promise was resolved`);
    }
  });
});

promise3.then((result) => {
  addDiv(result, 'success');
});
