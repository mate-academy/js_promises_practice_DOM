'use strict';

const body = document.querySelector('body');

const promiseOne = new Promise((resolve, reject) => {
  let click = false;

  const clickHandler = (e) => {
    if (e.button === 0) {
      resolve();
      click = true;
      body.removeEventListener('click', clickHandler);
    }
  };

  body.addEventListener('click', clickHandler);

  if (!click) {
    setTimeout(() => {
      reject(Error);
    }, 3000);
  }
});

const promiseTwo = new Promise((resolve) => {
  const clickHandler = (e) => {
    if (e.button === 0 || e.button === 2) {
      e.preventDefault();
      resolve();
      body.removeEventListener('click', clickHandler);
      body.removeEventListener('contextmenu', clickHandler);
    }
  };

  body.addEventListener('click', clickHandler);
  body.addEventListener('contextmenu', clickHandler);
});

const promiseThree = new Promise((resolve) => {
  let rightClick = false;
  let leftClick = false;

  const clickHandler = (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve();
      body.removeEventListener('click', clickHandler);
      body.removeEventListener('contextmenu', clickHandler);
    }
  };

  body.addEventListener('click', clickHandler);
  body.addEventListener('contextmenu', clickHandler);
});

promiseOne
  .then(() => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.classList.add('success');
    div.innerHTML = 'First promise was resolved';
    document.body.appendChild(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.classList.add('error');
    div.innerHTML = 'First promise was rejected';
    document.body.appendChild(div);
  });

promiseTwo.then(() => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('success');
  div.innerHTML = 'Second promise was resolved';
  document.body.appendChild(div);
});

promiseThree.then(() => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('success');
  div.innerHTML = 'Third promise was resolved';
  document.body.appendChild(div);
});
