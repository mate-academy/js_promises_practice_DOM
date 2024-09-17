'use strict';

const doc = document.querySelector('html');
const body = document.querySelector('body');

// .......... creativeMessage = <div data-qa = 'notification' class  >

const creativeMessage = function (message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';

  const className = message.includes('resolved') ? 'success' : 'error';

  div.classList.add(className);
  div.textContent = message;

  body.append(div);
};

// //////////////// firstPromise //////////////////////////////////////////////

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const error = 'First promise was rejected';

    reject(error);
  }, 3000);

  doc.addEventListener('click', (e) => {
    resolve('First promise was resolved');
  });
});

// /////////////////////////////////////////////////

firstPromise
  .then((data) => {
    creativeMessage(data);
  })
  .catch((error) => {
    creativeMessage(error);
  });
// //////////////////////////////////////////////////////////

let action; // for checikng condition click || contextmenu ????

// ///////////////////////////////////////////////

const secondPromise = new Promise((resolve, reject) => {
  doc.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
    action = e.type;
  });

  doc.addEventListener('contextmenu', (e) => {
    resolve('Second promise was resolved');
    action = e.type;
  });
});

secondPromise.then((data) => {
  creativeMessage(data);

  // ?????????????????????????????

  if (action === 'contextmenu') {
    thirdPromise.then((data3) => {
      creativeMessage(data3);
    });
  }
});

// //////////////////////////////////////////////////

const thirdPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Third promise was resolved');
  }, 3000);
});

// //////////////////////////////////////////////
