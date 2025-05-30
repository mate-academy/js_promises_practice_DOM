'use strict';

const body = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  let wasClicked = false;
  const onTimeout = () => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add('error');
    div.textContent = 'First promise was rejected';
    document.removeEventListener('click', onClick);
    reject(body.append(div));
  };

  const timeout = setTimeout(onTimeout, 3000);

  const onClick = (e) => {
    if (e.target) {
      wasClicked = true;
      clearTimeout(timeout);

      const div = document.createElement('div');

      div.setAttribute('data-qa', 'notification');
      div.classList.add('success');
      div.textContent = 'First promise was resolved';
      resolve(body.append(div));
      document.removeEventListener('click', onClick);
    }
  };

  document.addEventListener('click', onClick);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      e.preventDefault();

      const div = document.createElement('div');

      div.setAttribute('data-qa', 'notification');
      div.classList.add('success');
      div.textContent = 'Second promise was resolved';
      resolve(body.append(div));
    }
  });
});

let leftClick = false;
let rightClick = false;

const promise3 = new Promise((resolve, reject) => {
  function handleClick(e) {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      e.preventDefault();
      rightClick = true;
    }

    if (leftClick && rightClick) {
      const div = document.createElement('div');

      div.setAttribute('data-qa', 'notification');
      div.classList.add('success');
      div.textContent = 'Third promise was resolved';
      document.body.appendChild(div);

      resolve();
      document.removeEventListener('mousedown', handleClick);
    }
  }

  document.addEventListener('mousedown', handleClick);
});

promise1.then(
  (success) => success,
  (error) => error,
);

promise2.then(
  (success) => success,
  (error) => error,
);

promise3.then(
  (success) => success,
  (error) => error,
);
