'use strict';

const body = document.querySelector('body');
const message = document.createElement('div');

function createPromise() {
  const resolver = (resolve, reject) => {
    body.addEventListener('click', () => {
      resolve('First promise was resolved');
    });

    setTimeout(() => {
      reject('First promise was rejected');
    }, 3000);
  };

  return new Promise(resolver);
}

function createPromise2() {
  const resolver = (resolve, reject) => {
    body.addEventListener('click', () => {
      resolve('Second promise was resolved');
    });

    body.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      resolve('Second promise was resolved');
    });
  };

  return new Promise(resolver);
}

function createPromise3(button) {
  return new Promise(resolve => {
    body.addEventListener(button, (evt) => {
      evt.preventDefault();
      resolve();
    });
  });
}

const promise1 = createPromise();

promise1.then(result => {
  message.innerHTML = result;
  message.classList = 'success';
  body.append(message);

  const promise2 = createPromise2();

  return promise2;
})
  .then(result => {
    message.innerHTML = result;
    message.classList = 'success';
    body.append(message);

    const promise31 = createPromise3('click');

    return promise31;
  })
  .then(() => {
    const promise32 = createPromise3('contextmenu');

    return promise32;
  })
  .then(() => {
    message.innerHTML = 'Third promise was resolved';
    message.classList = 'warning';
    body.append(message);
  })
  .catch(result => {
    message.innerHTML = result;
    message.classList = 'warning';
    body.append(message);
  });
