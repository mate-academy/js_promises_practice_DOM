'use strict';

const notificationDivs = [
  document.createElement('div'),
  document.createElement('div'),
  document.createElement('div'),
];

notificationDivs.forEach((div) => {
  div.setAttribute('data-qa', 'notification');
});

const firstPromise = new Promise((resolve, reject) => {
  const timeOut = setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timeOut);
    resolve('First promise was resolved');
  });
});

firstPromise
  .then((success) => {
    notificationDivs[0].classList.add('success');
    notificationDivs[0].textContent = success;
  })
  .catch((error) => {
    notificationDivs[0].classList.add('error');
    notificationDivs[0].textContent = error;
  })
  .finally(() => {
    document.body.appendChild(notificationDivs[0]);
  });

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise.then((success) => {
  notificationDivs[1].classList.add('success');
  notificationDivs[1].textContent = success;
  document.body.appendChild(notificationDivs[1]);
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClickCount = 0;
  let rightClickCount = 0;

  document.addEventListener('click', () => {
    leftClickCount++;
    checkCondition();
  });

  document.addEventListener('contextmenu', () => {
    rightClickCount++;
    checkCondition();
  });

  function checkCondition() {
    if (leftClickCount > 0 && rightClickCount > 0) {
      resolve('Third promise was resolved');
    }
  }
});

thirdPromise.then((success) => {
  notificationDivs[2].classList.add('success');
  notificationDivs[2].textContent = success;
  document.body.appendChild(notificationDivs[2]);
});
