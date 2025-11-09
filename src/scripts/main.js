'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const onDown = (e) => {
    if (e.button === 0) {
      clearTimeout(timer);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('mousedown', onDown, { once: true });

  const timer = setTimeout(() => {
    document.removeEventListener('mousedown', onDown);
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const cleanup = (onLeftClick, onRightClick) => {
  document.removeEventListener('mousedown', onLeftClick);
  document.removeEventListener('contextmenu', onRightClick);
};

const secondPromise = new Promise((resolve) => {
  const finish = () => {
    cleanup(onLeftClick, onRightClick);
    resolve('Second promise was resolved');
  };

  const onLeftClick = (e) => {
    if (e.button === 0) {
      finish();
    }
  };

  const onRightClick = (e) => {
    e.preventDefault();
    finish();
  };

  document.addEventListener('mousedown', onLeftClick);
  document.addEventListener('contextmenu', onRightClick);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const maybeResolve = () => {
    if (leftClicked && rightClicked) {
      cleanup(onLeftClick, onRightClick);
      resolve('Third promise was resolved');
    }
  };

  const onLeftClick = (e) => {
    if (e.button !== 0) {
      return;
    }

    leftClicked = true;
    maybeResolve();
  };

  const onRightClick = (e) => {
    e.preventDefault();
    rightClicked = true;
    maybeResolve();
  };

  document.addEventListener('mousedown', onLeftClick);
  document.addEventListener('contextmenu', onRightClick);
});

firstPromise.then(
  (message) => {
    const div = document.createElement('div');

    div.className = 'notification success';
    div.dataset.qa = 'notification';
    div.textContent = message;
    document.body.append(div);
  },
  (error) => {
    const div = document.createElement('div');

    div.className = 'notification error';
    div.dataset.qa = 'notification';
    div.textContent = error.message;
    document.body.append(div);
  },
);

secondPromise.then(
  (message) => {
    const div = document.createElement('div');

    div.className = 'notification success';
    div.dataset.qa = 'notification';
    div.textContent = message;
    document.body.append(div);
  },
  (error) => {
    const div = document.createElement('div');

    div.className = 'notification error';
    div.dataset.qa = 'notification';
    div.textContent = error.message;
    document.body.append(div);
  },
);

thirdPromise.then(
  (message) => {
    const div = document.createElement('div');

    div.className = 'notification success';
    div.dataset.qa = 'notification';
    div.textContent = message;
    document.body.append(div);
  },
  (error) => {
    const div = document.createElement('div');

    div.className = 'notification error';
    div.dataset.qa = 'notification';
    div.textContent = error.message;
    document.body.append(div);
  },
);
