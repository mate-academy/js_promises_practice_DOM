'use strict';

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  let settled = false;

  const handler = (e) => {
    if (e.button === 0 && !settled) {
      settled = true;
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handler);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('mousedown', handler);

  const timeoutId = setTimeout(() => {
    if (!settled) {
      settled = true;
      document.removeEventListener('mousedown', handler);
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  let settled = false;
  const handler = (e) => {
    if (!settled && (e.button === 0 || e.button === 2)) {
      settled = true;
      document.removeEventListener('mousedown', handler);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mousedown', handler);
});

const thirdPromise = new Promise((resolve) => {
  let settled = false;
  let leftClicked = false;
  let rightClicked = false;

  const handler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (!settled && leftClicked && rightClicked) {
      settled = true;
      document.removeEventListener('mousedown', handler);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', handler);
});

function funcSuccess(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = message;

  document.body.appendChild(div);
}

function funcError(error) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');

  const text =
    typeof error === 'string'
      ? error
      : (error && error.message) || String(error);

  div.textContent = text;
  document.body.appendChild(div);
}

firstPromise.then(funcSuccess).catch(funcError);
secondPromise.then(funcSuccess).catch(funcError);
thirdPromise.then(funcSuccess).catch(funcError);
