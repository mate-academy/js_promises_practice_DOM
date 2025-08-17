'use strict';
let leftClicked = false;
let rightClicked = false;
const firstPromise = new Promise((resolve, reject) => {
  const clickHandler = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      document.removeEventListener('click', clickHandler);
    }
  };
  document.addEventListener('click', clickHandler);
  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
    document.removeEventListener('click', clickHandler);
  }, 3000);
});
const secondPromise = new Promise((resolve) => {
  const clickHandler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', clickHandler);
      document.removeEventListener('contextmenu', ctxHandler);
    }
  };
  const ctxHandler = (e) => { e.preventDefault(); clickHandler(e); };
  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', ctxHandler);
});
const thirdPromise = new Promise((resolve) => {
  const checkBoth = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', leftHandler);
      document.removeEventListener('contextmenu', rightHandler);
    }
  };
  const leftHandler = (e) => { if (e.button === 0) { leftClicked = true; checkBoth(); } };
  const rightHandler = (e) => { if (e.button === 2) { e.preventDefault(); rightClicked = true; checkBoth(); } };
  document.addEventListener('click', leftHandler);
  document.addEventListener('contextmenu', rightHandler);
});
const handleSuccess = (message) => {
  const div = document.createElement('div');
  div.dataset.qa = 'notification';
  div.className = 'success';
  div.textContent = message;
  document.body.appendChild(div);
};
const handleError = (reason) => {
  const div = document.createElement('div');
  div.dataset.qa = 'notification';
  div.className = 'error';
  div.textContent = String(reason);
  document.body.appendChild(div);
};
firstPromise.then(handleSuccess).catch(handleError);
secondPromise.then(handleSuccess);
thirdPromise.then(handleSuccess);
