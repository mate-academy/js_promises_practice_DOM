'use strict';

const container = document.createElement('div');

document.body.prepend(container);
container.style.display = 'flex';
container.style.position = 'absolute';
container.style.top = '20px';
container.style.gap = '10px';

const successOne = ['success', 'First promise was resolved'];
const errorOne = ['warning', 'First promise was rejected'];
const successTwo = ['success', 'Second promise was resolved'];
const successThree = ['success', 'Third promise was resolved'];
let leftAlreadyClicked = false;
let rightAlreadyClicked = false;

function addAlert(set) {
  const div = `<div data-qa="notification" class="warning">\
    ${set[1]}\
  </div>`;

  container.insertAdjacentHTML('afterbegin', div);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button >= 0) {
      resolve(successOne);
    }
  });
  setTimeout(() => reject(errorOne), '3000');
});

const secondPromise = new Promise(resolve => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve(successTwo);
    }
  });
});

const thirdPromise = new Promise(resolve => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftAlreadyClicked = true;
    }

    if (e.button === 2) {
      rightAlreadyClicked = true;
    }

    if (leftAlreadyClicked && rightAlreadyClicked) {
      resolve(successThree);
    }
  });
});

firstPromise
  .then(addAlert)
  .catch(addAlert);
secondPromise.then(addAlert);
thirdPromise.then(addAlert);
