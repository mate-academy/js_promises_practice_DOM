'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const addResult = (text, type) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(type);

  div.innerHTML = text;

  document.body.appendChild(div);
};

firstPromise.then(
  (text) => addResult(text, 'success'),
  (text) => addResult(text, 'error'),
);

const secondPromise = new Promise((resolve) => {
  const spHandler = () => {
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', spHandler);
  document.addEventListener('contextmenu', spHandler);
});

secondPromise.then((text) => addResult(text, 'success'));

const thirdPromise = new Promise((resolve) => {
  const spHandler = () => {
    resolve('Third promise was resolved');
  };

  document.addEventListener('mousedown', (e) => {
    console.log(e.buttons);

    if (e.buttons === 3) {
      spHandler();
    }
  });
});

thirdPromise.then((text) => addResult(text, 'success'));
