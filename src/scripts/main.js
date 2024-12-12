'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const handleClick = () => {
    resolve('First promise was resolved');
    clearTimeout(timeout);
    document.removeEventListener('click', handleClick);
  };

  document.addEventListener('click', handleClick);

  const timeout = setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', handleClick);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const handleClick = () => {
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

const thirdPromise = new Promise((resolve) => {
  const handleMouseDown = (even) => {
    if (even.buttons === 3) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', handleMouseDown);
    }
  };

  document.addEventListener('mousedown', handleMouseDown);
});

firstPromise
  .then((message) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.className = 'success';
    div.textContent = message;
    document.body.appendChild(div);
  })
  .catch((message) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.className = 'error';
    div.textContent = message;
    document.body.appendChild(div);
  });

secondPromise.then((message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'success';
  div.textContent = message;
  document.body.appendChild(div);
});

thirdPromise.then((message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'success';
  div.textContent = message;
  document.body.appendChild(div);
});
