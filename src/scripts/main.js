'use strict';

let bodyDoc;
let rightClick;
let leftClick;

if (document.querySelector('body') !== null) {
  bodyDoc = document.querySelector('body');
}

function makeDiv(className) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.setAttribute('class', className);
  bodyDoc.appendChild(div);

  return div;
}

const firstPromise = () => {
  return new Promise((resolve, reject) => {
    document.addEventListener('click', () => {
      leftClick = true;

      resolve('First promise was resolved');
    });

    // eslint-disable-next-line prefer-promise-reject-errors
    setTimeout(() => reject('First promise was rejected!'), 3000);
  });
};

const secondPromise = () => {
  return new Promise((resolve) => {
    document.addEventListener('click', () => {
      leftClick = true;

      resolve('Second promise was resolved');
    });

    document.addEventListener('contextmenu', () => {
      rightClick = true;

      resolve('Second promise was resolved');
    });
  });
};

const thirdPromise = () => {
  return new Promise((resolve) => {
    document.addEventListener('click', () => {
      if (rightClick === true) {
        resolve('Third promise was resolved');
      }
    });

    document.addEventListener('contextmenu', () => {
      if (leftClick === true) {
        resolve('Third promise was resolved');
      }
    });
  });
};

firstPromise()
  .then((val) => {
    const div = makeDiv('success');

    div.textContent = val;
  })
  .catch((val) => {
    const div = makeDiv('error');

    div.textContent = val;
  });

secondPromise().then((val) => {
  const div = makeDiv('success');

  div.textContent = val;
});

thirdPromise().then((val) => {
  const div = makeDiv('success');

  div.textContent = val;
});
