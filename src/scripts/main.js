'use strict';

const selectDocument = document.body;

function firstPromise() {
  const resolver = (resolve, reject) => {
    selectDocument.addEventListener('click', () => {
      resolve();
    });

    setTimeout(() => {
      if (selectDocument.getElementsByClassName('success')) {
        reject(false);
      }
    }, 3000);
  };

  return new Promise(resolver);
}

const promise1 = firstPromise();

promise1
  .then(clicked)
  .catch(notClicked);

function clicked() {
  const newElement = document.createElement('div');

  selectDocument.append(newElement);
  newElement.classList.add('success');
  newElement.setAttribute('data-qa', 'notification');
  newElement.innerHTML += 'First promise was resolved';
}

function notClicked(result) {
  if (result === false) {
    const newElement = document.createElement('div');

    selectDocument.append(newElement);
    newElement.classList.add('error');
    newElement.setAttribute('data-qa', 'notification');
    newElement.innerHTML += 'First promise was rejected';
  }
}

function secondPromise() {
  const resolver = (resolve) => {
    selectDocument.addEventListener('click', () => {
      resolve();
    });

    selectDocument.addEventListener('contextmenu', () => {
      resolve();
    });
  };

  return new Promise(resolver);
}

const promise2 = secondPromise();

promise2.then(() => {
  const newElement = document.createElement('div');

  selectDocument.append(newElement);
  newElement.classList.add('success');
  newElement.setAttribute('data-qa', 'notification');
  newElement.innerHTML += 'Second promise was resolved';
});

function thirdPromise(clickEvent) {
  const resolver = (resolve) => {
    selectDocument.addEventListener(clickEvent, () => {
      resolve();
    });
  };

  return new Promise(resolver);
}

const promise3 = thirdPromise('click');
const promise4 = thirdPromise('contextmenu');

promise3
  .then(() => promise4)
  .then(display);

function display() {
  const newElement = document.createElement('div');

  selectDocument.append(newElement);
  newElement.classList.add('success');
  newElement.setAttribute('data-qa', 'notification');
  newElement.innerHTML += 'Third promise was resolved';
}
