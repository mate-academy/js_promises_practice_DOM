'use strict';

let leftClick = false;
let rightClick = false;

const firstPromise = new Promise((resolve, reject) => {
  const onClick = (e) => {
    if (e.button === 0) {
      leftClick = true;
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', onClick);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const checkBothClicks = () => {
    if (leftClick || rightClick) {
      resolve('Second promise was resolved');
    }
  };

  const onClick = (e) => {
    if (e.button === 0) {
      leftClick = true;
      checkBothClicks();
    }
  };

  const onContextMenu = (e) => {
    e.preventDefault();
    rightClick = true;
    checkBothClicks();
  };

  checkBothClicks();

  document.addEventListener('click', onClick);
  document.addEventListener('contextmenu', onContextMenu);
});

const thirdPromise = new Promise((resolve) => {
  const checkBothClicks = () => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  };

  const onClick = (e) => {
    if (e.button === 0) {
      leftClick = true;
      checkBothClicks();
    }
  };

  const onContextMenu = (e) => {
    e.preventDefault();
    rightClick = true;
    checkBothClicks();
  };

  checkBothClicks();

  document.addEventListener('click', onClick);
  document.addEventListener('contextmenu', onContextMenu);
});

firstPromise
  .then((text) => {
    const div = document.createElement('div');

    div.classList.add('success');
    div.setAttribute('data-qa', 'notification');
    div.textContent = text;
    document.body.appendChild(div);
  })
  .catch((err) => {
    const div = document.createElement('div');

    div.classList.add('error');
    div.setAttribute('data-qa', 'notification');
    div.textContent = err.message;
    document.body.appendChild(div);
  });

secondPromise.then((text) => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.setAttribute('data-qa', 'notification');
  div.textContent = text;
  document.body.appendChild(div);
});

thirdPromise.then((text) => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.setAttribute('data-qa', 'notification');
  div.textContent = text;
  document.body.appendChild(div);
});
