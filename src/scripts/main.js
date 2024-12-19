'use strict';

const resolved = document.createElement('div');

resolved.classList.add('success');
resolved.textContent = 'First promise was resolved';
resolved.dataset.qa = 'notification';

const rejected = document.createElement('div');

rejected.classList.add('error');
rejected.textContent = 'First promise was rejected';
rejected.dataset.qa = 'notification';

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected in 3 seconds if not clicked'));

    if (!document.body.contains(resolved)) {
      document.body.appendChild(rejected);
    }
  }, 3000);

  document.body.addEventListener(
    'click',
    (e) => {
      if (e.button === 0) {
        clearTimeout(timer);
        resolve('First promise was resolved');

        if (!document.body.contains(rejected)) {
          document.body.appendChild(resolved);
        }
      }
    },
    { once: true },
  );
});

const secondPromise = new Promise((resolve) => {
  document.body.addEventListener(
    'mousedown',
    (e) => {
      e.preventDefault();

      if (e.button === 0 || e.button === 2) {
        const resolvedd = document.createElement('div');

        resolvedd.classList.add('success');
        resolvedd.textContent = 'Second promise was resolved';
        resolvedd.dataset.qa = 'notification';

        if (!document.body.contains(resolvedd)) {
          document.body.appendChild(resolvedd);
        }
        resolve('Second promise was resolved');
      }
    },
    { once: true },
  );
});

const thirdPromise = new Promise((resolve, reject) => {
  const pressedButtons = {
    left: false,
    right: false,
  };

  const onMouseDown = (e) => {
    if (e.button === 0) {
      pressedButtons.left = true;
    }

    if (e.button === 2) {
      pressedButtons.right = true;
    }

    if (pressedButtons.left && pressedButtons.right) {
      const resolveddd = document.createElement('div');

      resolveddd.classList.add('success');
      resolveddd.textContent = 'Third promise was resolved';
      resolveddd.dataset.qa = 'notification';

      resolve('Third promise was resolved');

      if (!document.body.contains(resolveddd)) {
        document.body.appendChild(resolveddd);
      }

      cleanup();
    }
  };

  const cleanup = () => {
    document.body.removeEventListener('mousedown', onMouseDown);
  };

  document.body.addEventListener('mousedown', onMouseDown);
});

alert(secondPromise);
alert(thirdPromise);
alert(firstPromise);
