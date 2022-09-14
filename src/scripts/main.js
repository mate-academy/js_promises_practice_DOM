'use strict';

function createPromise1(button) {
  return new Promise((resolve, reject) => {
    button.addEventListener('click', () => {
      resolve();
    });

    setTimeout(() => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject();
    }, 3000);
  });
}

function createPromise2(button) {
  return new Promise((resolve, reject) => {
    button.addEventListener('click', () => {
      resolve();
    });

    button.addEventListener('contextmenu', (evt) => {
      evt.preventDefault();
      resolve();
    });
  });
}

function createPromise3(button) {
  return new Promise((resolve, reject) => {
    button.addEventListener('click', first);

    function first(e) {
      e.stopImmediatePropagation();
      this.removeEventListener('click', first);
      button.oncontextmenu = second;
    }

    function second() {
      resolve();
    }
  });
}

const doc = document.querySelector('body');

/*    First Promise    */

const firstPromise = createPromise1(doc);

firstPromise.then(() => {
  const element = document.createElement('div');

  element.setAttribute('data-qa', 'notification');
  element.className = 'success';
  element.innerHTML = 'First promise was resolved';
  document.body.append(element);
}).catch(() => {
  const element = document.createElement('div');

  element.setAttribute('data-qa', 'notification');
  element.className = 'warning';
  element.innerHTML = 'First promise was rejected';
  document.body.append(element);
});

/*    Second Promise    */

const secondPromise = createPromise2(doc);

secondPromise.then(() => {
  const element = document.createElement('div');

  element.setAttribute('data-qa', 'notification');
  element.className = 'success';
  element.innerHTML = 'Second promise was resolved';
  document.body.append(element);
}).catch(() => {
  const element = document.createElement('div');

  element.setAttribute('data-qa', 'notification');
  element.className = 'warning';
  element.innerHTML = 'Second promise was rejected';
  document.body.append(element);
});

/*    Third Promise    */

const thirdPromise = createPromise3(doc);

thirdPromise.then(() => {
  const element = document.createElement('div');

  element.setAttribute('data-qa', 'notification');
  element.className = 'success';
  element.innerHTML = 'Third promise was resolved';
  document.body.append(element);
}).catch(() => {
  const element = document.createElement('div');

  element.setAttribute('data-qa', 'notification');
  element.className = 'warning';
  element.innerHTML = 'Third promise was rejected';
  document.body.append(element);
});
