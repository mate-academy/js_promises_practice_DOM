'use strict';

const firstRejectionMessage = `First promise was rejected`;
const firstResolvedMessage = `First promise was resolved`;
const secondResolvedMessage = `Second promise was resolved`;
const thirdResolvedMessage = `Third promise was resolved`;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (i) => {
    if (i.button === 0) {
      resolve(firstResolvedMessage);
    }
  });

  setTimeout(() => {
    reject(firstRejectionMessage);
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (i) => {
    if (i.button === 0 || i.button === 2) {
      resolve(secondResolvedMessage);
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('mousedown', (i) => {
    if (i.button === 0) {
      leftClicked = true;
    }

    if (i.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve(thirdResolvedMessage);
    }
  });
});

const promiseResolve = (message) => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.setAttribute('data-qa', 'notification');
  document.body.appendChild(div);
  div.textContent = message;
};

const promiseReject = (message) => {
  const div = document.createElement('div');

  div.classList.add('error');
  div.setAttribute('data-qa', 'notification');

  document.body.appendChild(div);
  div.textContent = message;
};

firstPromise.then(promiseResolve).catch(promiseReject);
secondPromise.then(promiseResolve).catch(promiseReject);
thirdPromise.then(promiseResolve).catch(promiseReject);
