'use strict';

let leftClick = false;
let rightClick = false;

const body = document.getElementsByTagName('body')[0];
const div = document.createElement('div');
const divSecond = document.createElement('div');
const divThird = document.createElement('div');

const firstPromise = async () => {
  try {
    if (!leftClick) {
      throw new Error();
    }

    div.classList.remove('error');
    div.classList.add('success');
    div.textContent = 'First promise was resolved';
  } catch {
    div.classList.add('error');
    div.textContent = 'First promise was rejected';
  } finally {
    div.setAttribute('data-qa', 'notification');
    body.appendChild(div);
  }
};

const secondPromise = async () => {
  try {
    divSecond.classList.add('success');
    divSecond.textContent = 'Second promise was resolved';
  } finally {
    divSecond.setAttribute('data-qa', 'notification');
    body.appendChild(divSecond);
  }
};

const thirdPromise = async () => {
  try {
    if (leftClick && rightClick) {
      divThird.classList.add('success');
      divThird.textContent = 'Third promise was resolved';

      return;
    }

    throw new Error();
  } catch {
    divThird.classList.add('error');
    divThird.textContent = 'Third promise was rejected';
  } finally {
    divThird.setAttribute('data-qa', 'notification');
    body.appendChild(divThird);
  }
};

setTimeout(() => {
  firstPromise();
}, 3000);

document.addEventListener('click', () => {
  leftClick = true;
  firstPromise();
  secondPromise();
});

document.addEventListener('contextmenu', () => {
  rightClick = true;

  secondPromise();
  thirdPromise();
});
