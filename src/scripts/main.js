'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  const successMessage = 'First promise was resolved';
  const errorMessage = 'First promise was rejected';

  body.addEventListener('click', () => {
    resolve(successMessage);
  });

  setTimeout(() => reject(new Error(errorMessage)), 3000);
});

const secondPromise = new Promise(resolve => {
  const message = 'Second promise was resolved';
  const customStyle = 'top: 150px';

  body.addEventListener('mousedown', () => {
    resolve([message, customStyle]);
  });
});

const thirdPromise = action => {
  const messages = 'Third promise was resolved';
  const customStyle = 'top: 250px';

  return new Promise(resolve => {
    body.addEventListener(action, () => {
      resolve([messages, customStyle]);
    });
  });
};

const successHandler = (message, style = '') => {
  const el = `
    <div 
        data-qa="notification" 
        class="success" 
        style="${style}"
    >
    ${message}
    </div>
  `;

  body.insertAdjacentHTML('beforeend', el);
};

const errorHandler = message => {
  const el = `
    <div data-qa="notification" class="warning">${message}</div>
  `;

  body.insertAdjacentHTML('beforeend', el);
};

firstPromise
  .then(data => successHandler(data))
  .catch(data => errorHandler(data));

secondPromise
  .then(([data, style]) => successHandler(data, style));

Promise.all(
  [thirdPromise('click'), thirdPromise('contextmenu')]
).then(([firstRes, secondRes]) => successHandler(firstRes[0], firstRes[1]));
