'use strict';

function promisesPractice() {
  const allowedTypes = ['success', 'error'];

  const showNotification = (message, type) => {
    const safeMessage = String(message ?? '');

    if (!safeMessage.trim()) {
      return;
    }

    const safeType = allowedTypes.includes(type) ? type : 'success';

    const div = document.createElement('div');

    div.dataset.qa = 'notification';

    div.classList.add(safeType);
    div.textContent = safeMessage;

    document.body.append(div);
  };

  let leftClicked = false;
  let rightClicked = false;

  const bothClickedDone = () => leftClicked && rightClicked;

  const firstPromise = new Promise((resolve, reject) => {
    let settled = false;

    const timerId = setTimeout(() => {
      if (settled) {
        return;
      }

      settled = true;

      document.removeEventListener('click', onLeftClick);

      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
    }, 3000);

    function onLeftClick(e) {
      if (settled) {
        return;
      }

      if (e.button !== 0) {
        return;
      }

      settled = true;
      clearTimeout(timerId);
      document.removeEventListener('click', onLeftClick);

      resolve('First promise was resolved');
    }

    document.addEventListener('click', onLeftClick);
  });

  const secondPromise = new Promise((resolve) => {
    let settled = false;

    function cleanup() {
      document.removeEventListener('click', onLeft);
      document.removeEventListener('contextmenu', onRight);
    }

    function finish() {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      resolve('Second promise was resolved');
    }

    function onLeft(e) {
      if (e.button !== 0) {
        return;
      }

      finish();
    }

    function onRight(e) {
      e.preventDefault();
      finish();
    }

    document.addEventListener('click', onLeft);
    document.addEventListener('contextmenu', onRight);
  });

  const thirdPromise = new Promise((resolve) => {
    let settled = false;

    function cleanup() {
      document.removeEventListener('click', onLeft);
      document.removeEventListener('contextmenu', onRight);
    }

    function tryResolve() {
      if (settled) {
        return;
      }

      if (!bothClickedDone()) {
        return;
      }

      settled = true;
      cleanup();

      resolve('Third promise was resolved');
    }

    function onLeft(e) {
      if (settled) {
        return;
      }

      if (e.button !== 0) {
        return;
      }

      leftClicked = true;
      tryResolve();
    }

    function onRight(e) {
      if (settled) {
        return;
      }

      e.preventDefault();
      rightClicked = true;
      tryResolve();
    }

    document.addEventListener('click', onLeft);
    document.addEventListener('contextmenu', onRight);
  });

  const getErrorMessage = (err) =>
    err instanceof Error ? err.message : String(err);

  firstPromise
    .then((msg) => showNotification(msg, 'success'))
    .catch((err) => showNotification(getErrorMessage(err), 'error'));

  secondPromise
    .then((msg) => showNotification(msg, 'success'))
    .catch((err) => showNotification(getErrorMessage(err), 'error'));

  thirdPromise
    .then((msg) => showNotification(msg, 'success'))
    .catch((err) => showNotification(getErrorMessage(err), 'error'));
}

promisesPractice();
