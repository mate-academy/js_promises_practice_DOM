/* eslint-disable no-console */
'use strict';

function createEventPromise(event, timer) {
  const resolver = (resolve, reject) => {
    document.addEventListener(event, () => {
      resolve();
    });

    if (timer !== undefined) {
      setTimeout(() => {
        reject();
      }, timer);
    }
  };

  return new Promise(resolver);
}

const firstPromise = createEventPromise('click', 5000);

firstPromise
  .then(() => {
    console.log('First promise resolved');
  })
  .catch(() => {
    console.log('First promise rejected');
  });

const secondResolver = (resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise resolved on left click');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise resolved on right click');
  });
};

const secondPromise = new Promise(secondResolver);

secondPromise
  .then((res) => console.log(res));

const thirdPromise1 = createEventPromise('click');
const thirdPromise2 = createEventPromise('contextmenu');

thirdPromise1
  .then(() => thirdPromise2)
  .then(() => {
    console.log('Third promise resolved');
  });
