'use strict';

const notify = (message, isError = false) => {
  const div = document.createElement('div');

  div.className = isError ? 'error' : 'success';
  div.dataset.qa = 'notification';
  div.textContent = `${message}`;

  document.body.appendChild(div);
};

const firstPromise = new Promise((resolve, reject) => {
  let handled = false;

  const onClick = (e) => {
    if (e.button === 0 && !handled) {
      handled = true;
      document.removeEventListener('click', onClick);
      resolve('First promise was resolved on a left click in the document');
    }
  };

  document.addEventListener('mousedown', onClick);

  setTimeout(() => {
    if (!handled) {
      handled = true;
      document.removeEventListener('mousedown', onClick);

      reject(
        new Error('First promise was rejected in 3 seconds if not clicked'),
      );
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const onClick2 = (e) => {
    const leftClick = 0;
    const rightClick = 2;

    if (e.button === leftClick || e.button === rightClick) {
      document.removeEventListener('mousedown', onClick2);

      const resolveMsg = 'Second promise was resolved';

      resolve(resolveMsg);
    }
  };

  document.addEventListener('mousedown', onClick2);
});

const thirdPromise = new Promise((resolve) => {
  let rightClick = false;
  let leftClick = false;

  const onClick3 = (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      document.removeEventListener('mousedown', onClick3);

      const resolveMsg = 'Third promise was resolved';

      resolve(resolveMsg);
    }
  };

  document.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('mousedown', onClick3);
});

firstPromise.then(notify).catch((err) => notify(err, true));
secondPromise.then(notify).catch((err) => notify(err, true));
thirdPromise.then(notify).catch((err) => notify(err));
