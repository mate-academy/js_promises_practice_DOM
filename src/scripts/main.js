'use strict';

const body = document.querySelector('body');
const message = document.createElement('div');

message.classList = 'warning';
body.append(message);

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
  const resolver = (resolve) => {
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

function createPromise3() {
  return new Promise(resolve => {
    body.addEventListener('click', () => {
      body.addEventListener('contextmenu', (evt) => {
        evt.preventDefault();
        resolve();
      });
    });
  });
}

const promise1 = createPromise();
const promise2 = createPromise2();
const promise3 = createPromise3();

promise1.then(result => {
  message.innerHTML += result;
})
  .catch(result => {
    message.innerHTML += result;
  });

promise2.then(result => {
  message.innerHTML += result;
})
  .catch(() => {
  });

promise3.then(() => {
  message.innerHTML += 'Third promise was resolved';
})
  .catch(() => {
  });
