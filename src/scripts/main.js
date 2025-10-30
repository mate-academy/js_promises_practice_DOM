'use strict';

const body = document.body;

const handleError = (error) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = 'error';
  div.textContent = error.message || String(error);
  body.append(div);
};

const handleSuccess = (message) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = 'success';
  div.textContent = message;
  body.append(div);
};

const firstPromise = new Promise((resolve, reject) => {
  const onClick = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      cleanup();
    }
  };

  document.addEventListener('click', onClick);

  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
    cleanup();
  }, 3000);

  const cleanup = () => {
    clearTimeout(timer);
    document.removeEventListener('click', onClick);
  };
});

const secondPromise = new Promise((resolve, reject) => {
  const onClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      cleanup();
    }
  };

  document.addEventListener('click', onClick);
  document.addEventListener('contextmenu', onClick);

  const cleanup = () => {
    document.removeEventListener('click', onClick);
    document.removeEventListener('contextmenu', onClick);
  };
});

const thirdPromise = new Promise((resolve, reject) => {
  let isRightClickHappened = false;
  let isLeftClickHappened = false;
  let resolved = false;

  const checkResolve = () => {
    if (isRightClickHappened && isLeftClickHappened && !resolved) {
      resolved = true;
      resolve('Third promise was resolved');
      cleanup();
    }
  };

  const onLeftClick = (e) => {
    if (e.button === 0) {
      isLeftClickHappened = true;
      checkResolve();
    }
  };

  const onRightClick = (e) => {
    if (e.button === 2) {
      isRightClickHappened = true;
      checkResolve();
    }
  };

  document.addEventListener('contextmenu', onRightClick);
  document.addEventListener('click', onLeftClick);

  const cleanup = () => {
    document.removeEventListener('contextmenu', onRightClick);
    document.removeEventListener('click', onLeftClick);
  };
});

firstPromise.then(handleSuccess).catch(handleError);
secondPromise.then(handleSuccess).catch(handleError);
thirdPromise.then(handleSuccess).catch(handleError);
