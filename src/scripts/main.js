'use strict';

function showSuccess(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = message;
  document.body.appendChild(div);
}

function showError(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.textContent = message.message;
  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    document.removeEventListener('click', onClick);
    reject(new Error('First promise was rejected'));
  }, 3000);

  function onClick(evt) {
    if (evt.button !== 0) {
      return;
    }

    clearTimeout(timerId);
    document.removeEventListener('click', onClick);
    resolve('First promise was resolved');
  }

  document.addEventListener('click', onClick);
});

const secondPromise = new Promise((resolve) => {
  function onAnyClick(evt) {
    if (evt.type === 'contextmenu') {
      evt.preventDefault();
    }

    document.removeEventListener('click', onAnyClick);
    document.removeEventListener('contextmenu', onAnyClick);
    resolve('Second promise was resolved');
  }

  document.addEventListener('click', onAnyClick);
  document.addEventListener('contextmenu', onAnyClick);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function check() {
    if (leftClicked && rightClicked) {
      document.removeEventListener('click', onLeftClick);
      document.removeEventListener('contextmenu', onRightClick);

      resolve('Third promise was resolved');
    }
  }

  function onLeftClick(evt) {
    if (evt.button !== 0) {
      return;
    }

    leftClicked = true;
    check();
  }

  function onRightClick(evt) {
    evt.preventDefault();
    rightClicked = true;
    check();
  }

  document.addEventListener('click', onLeftClick);
  document.addEventListener('contextmenu', onRightClick);
});

firstPromise.then(showSuccess).catch(showError);
secondPromise.then(showSuccess).catch(showError);
thirdPromise.then(showSuccess).catch(showError);
