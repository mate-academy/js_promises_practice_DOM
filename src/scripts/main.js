'use strict';

/* -------------------- First Promise -------------------- /
/  Resolve: лівий клік у документі
    Reject: через 3 секунди без кліку */
const firstPromise = new Promise((resolve, reject) => {
  const onLeftClick = (e) => {
    if (e.button === 0) {
      cleanup();
      resolve('First promise was resolved');
    }
  };

  const cleanup = () => {
    document.removeEventListener('click', onLeftClick);
    clearTimeout(timerId);
  };

  document.addEventListener('click', onLeftClick);

  const timerId = setTimeout(() => {
    cleanup();
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

/* -------------------- Second Promise ------------------- /
/  Resolve: будь-який клік (лівий або правий). Ніколи не reject */
const secondPromise = new Promise((resolve) => {
  const onAnyClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      cleanup();
      resolve('Second promise was resolved');
    }
  };

  const cleanup = () => {
    document.removeEventListener('click', onAnyClick);
    document.removeEventListener('contextmenu', onAnyClick);
  };

  document.addEventListener('click', onAnyClick);
  document.addEventListener('contextmenu', onAnyClick); // правий клік
});

/* -------------------- Third Promise -------------------- /
/  Resolve: коли відбулися і лівий, і правий кліки (у будь-якому порядку) */
const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const onLeft = (e) => {
    if (e.button === 0) {
      leftClicked = true;
      tryResolve();
    }
  };

  const onRight = (e) => {
    if (e.button === 2) {
      rightClicked = true;
      tryResolve();
    }
  };

  const tryResolve = () => {
    if (leftClicked && rightClicked) {
      cleanup();
      resolve('Third promise was resolved');
    }
  };

  const cleanup = () => {
    document.removeEventListener('click', onLeft);
    document.removeEventListener('contextmenu', onRight);
  };

  document.addEventListener('click', onLeft);
  document.addEventListener('contextmenu', onRight);
});

/* ---------------------- Handlers ----------------------- */
function handleSuccess(message) {
  const el = document.createElement('div');

  el.setAttribute('data-qa', 'notification');
  el.className = 'notification success';
  el.textContent = message;
  document.body.appendChild(el);
}

function handleError(errorMessage) {
  const el = document.createElement('div');

  el.setAttribute('data-qa', 'notification');
  el.className = 'notification error';
  el.textContent = errorMessage;
  document.body.appendChild(el);
}

/* ----------------- Attach handlers -------------------- */
firstPromise.then(handleSuccess, handleError);
secondPromise.then(handleSuccess);
thirdPromise.then(handleSuccess, handleError);
