'use strict';

let rightClick;
let leftClick;

function makeDiv(className) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.setAttribute('class', className);
  document.body.appendChild(div);

  return div;
}

const firstPromise = () => {
  return new Promise((resolve, reject) => {
    document.addEventListener(
      'click',
      () => {
        leftClick = true;

        resolve('First promise was resolved');
      },
      { once: true },
    );

    // eslint-disable-next-line prefer-promise-reject-errors
    setTimeout(() => reject('First promise was rejected!'), 3000);
  });
};

const secondPromise = () => {
  return new Promise((resolve) => {
    document.addEventListener(
      'click',
      () => {
        leftClick = true;

        resolve('Second promise was resolved');
      },
      { once: true },
    );

    document.addEventListener(
      'contextmenu',
      () => {
        rightClick = true;

        resolve('Second promise was resolved');
      },
      { once: true },
    );
  });
};

const thirdPromise = () => {
  return new Promise((resolve) => {
    document.addEventListener(
      'click',
      () => {
        if (rightClick === true) {
          rightClick = false;
          resolve('Third promise was resolved');
        }
      },
      { once: true },
    );

    document.addEventListener(
      'contextmenu',
      () => {
        if (leftClick === true) {
          leftClick = false;
          resolve('Third promise was resolved');
        }
      },
      { once: true },
    );
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

secondPromise()
  .then((val) => {
    const div = makeDiv('success');

    div.textContent = val;
  })
  .catch();

thirdPromise()
  .then((val) => {
    const div = makeDiv('success');

    div.textContent = val;
  })
  .catch();
