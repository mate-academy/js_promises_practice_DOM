'use strict';

const firstPromiseResolver = (resolve, reject) => {
  let clickedLeftButton = false;

  document.body.addEventListener('mouseup', e => {
    if (e.button === 0) {
      clickedLeftButton = true;
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    if (!clickedLeftButton) {
      reject('First promise was rejected');
    }
  }, 3000);
};

const secondPromiseResolver = (resolve) => {
  document.body.addEventListener('mouseup', e => {
    const mouseButton = e.button;

    if (mouseButton === 0 || mouseButton === 2) {
      resolve('Second promise was resolved');
    }
  });
};

const thirdPromiseResolver = (resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.body.addEventListener('mouseup', e => {
    const promiseResolveMessage = 'Third promise was resolved';
    const mouseButton = e.button;

    if (mouseButton === 0) {
      leftClicked = true;

      if (rightClicked) {
        resolve(promiseResolveMessage);
      }
    } else if (mouseButton === 2) {
      rightClicked = true;

      if (leftClicked) {
        resolve(promiseResolveMessage);
      }
    }
  });
};

const firstPromise = new Promise(firstPromiseResolver);
const secondPromise = new Promise(secondPromiseResolver);
const thirdPromise = new Promise(thirdPromiseResolver);

function addHandler(promise) {
  function addDiv(isSuccess, message) {
    const state = isSuccess ? 'success' : 'warning';

    // eslint-disable-next-line max-len
    document.body.innerHTML += `<div class="promiseMessage ${state}" data-qa="notification">${message}</div>`;
  }

  promise.then(result => {
    addDiv(true, result);
  }).catch(result => {
    addDiv(false, result);
  });
}

addHandler(firstPromise);
addHandler(secondPromise);
addHandler(thirdPromise);

const divSpaces = `.promiseMessage {
  margin-left: 10px;
}`;

const style = document.createElement('style');

style.textContent = divSpaces;
document.head.appendChild(style);
