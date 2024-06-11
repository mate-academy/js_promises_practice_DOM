'use strict';

const page = document.querySelector('body');

const createMessage = (text, state) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(state);
  div.textContent = text;
  page.appendChild(div);
};

const firstPromise = new Promise((resolve, reject) => {
  let isClick = true;

  page.addEventListener('click', () => {
    resolve('First promise was resolved');
    isClick = false;
  });

  setTimeout(() => {
    if (isClick) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

firstPromise
  .then((data) => {
    createMessage(data, 'success');
  })
  .catch((error) => {
    createMessage(error, 'error');
  });

const secondPromise = new Promise((resolve) => {
  page.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  page.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise.then((data) => {
  createMessage(data, 'success');
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let RightClick = false;

  page.addEventListener('click', () => {
    leftClick = true;
    bothClick();
  });

  page.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    RightClick = true;
    bothClick();
  });

  const bothClick = () => {
    if (leftClick && RightClick) {
      resolve('Third promise was resolved');
    }
  };
});

thirdPromise.then((data) => {
  createMessage(data, 'success');
});
