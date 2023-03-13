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
  .then(() => {
    createElem('success', 'First promise was resolved');
  })
  .catch((result) => {
    if (result === false) {
      createElem('error', 'First promise was rejected');
    }
  });

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
  createElem('success', 'Second promise was resolved');
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

promise3
  .then(() => thirdPromise('contextmenu'))
  .then(() => {
    createElem('success', 'Third promise was resolved');
  });

function createElem(res, text) {
  const newElement = document.createElement('div');

  selectDocument.append(newElement);
  newElement.classList.add(res);
  newElement.setAttribute('data-qa', 'notification');
  newElement.innerHTML += text;
}
