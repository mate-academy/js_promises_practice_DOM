'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  const onClick = () => {
    resolve('First promise was resolved');
    clearTimeout(timer);
    document.removeEventListener('click', onClick);
  };

  document.addEventListener('click', onClick);
});

firstPromise.then((message) => {
  const div = document.createElement('div');

  div.textContent = message;
  div.dataset.qa = 'notification';
  div.classList.add('success');
  document.body.appendChild(div);
});

firstPromise.catch((error) => {
  const div = document.createElement('div');

  div.textContent = error.message;
  div.dataset.qa = 'notification';
  div.classList.add('error');
  document.body.appendChild(div);
});

const secondPromise = new Promise((resolve, reject) => {
  const onClick = () => {
    resolve('Second promise was resolved');
    document.removeEventListener('click', onClick);
  };

  document.addEventListener('click', onClick);

  const onContext = (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
    document.removeEventListener('contextmenu', onContext);
  };

  document.addEventListener('contextmenu', onContext);
});

secondPromise.then((message) => {
  const div = document.createElement('div');

  div.textContent = message;
  div.dataset.qa = 'notification';
  div.classList.add('success');
  document.body.appendChild(div);
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = 0;
  let rightClick = 0;

  const onClick = () => {
    leftClick++;

    if (leftClick >= 1 && rightClick >= 1) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', onClick);
      document.removeEventListener('contextmenu', onContext);
    }
  };

  const onContext = (e) => {
    e.preventDefault();
    rightClick++;

    if (leftClick >= 1 && rightClick >= 1) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', onClick);
      document.removeEventListener('contextmenu', onContext);
    }
  };

  document.addEventListener('click', onClick);
  document.addEventListener('contextmenu', onContext);
});

thirdPromise.then((message) => {
  const div = document.createElement('div');

  div.textContent = message;
  div.dataset.qa = 'notification';
  div.classList.add('success');
  document.body.appendChild(div);
});
