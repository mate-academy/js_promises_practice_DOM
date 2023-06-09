'use strict';

const body = document.querySelector('body');

const logo = body.querySelector('.logo');

function createPromise(messageClass, numberPromise, mouseEvent = 'click') {
  const resolver = (complete, cancel) => {
    logo.addEventListener(`${mouseEvent}`, (e) => {
      e.preventDefault();

      complete(
        `<div class='${messageClass}'
          data-qa="notification"
          >
            ${numberPromise} promise was resolved
          </div>`
      );
    });

    setTimeout(() => {
      cancel(`<div class="error"
    data-qa="notification"
    >
    First promise was rejected
    </div>`);
    }, 3000);
  };

  return new Promise(resolver);
}

const promis1 = createPromise('success', 'First');

promis1.then(suc => {
  body.insertAdjacentHTML('beforeend', suc);

  const promis2 = createPromise('success', 'Second');

  return promis2;
}).catch(err => {
  body.insertAdjacentHTML('beforeend', err);

  const promis2 = createPromise('success', 'Second');

  return promis2;
}).then(suc => {
  body.insertAdjacentHTML('beforeend', suc);

  const promis3 = createPromise('success', 'Third', 'contextmenu');

  return promis3;
}).then(suc => {
  body.insertAdjacentHTML('beforeend', suc);
});
