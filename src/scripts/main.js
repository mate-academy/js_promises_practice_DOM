'use strict';

const body = document.querySelector('body');

const logo = body.querySelector('.logo');

function createPromise(masegeClass, numberPromise, mouseEvent) {
  const resolver = (complite, cancel) => {
    logo.addEventListener(`${mouseEvent}`, (e) => {
      e.preventDefault();

      complite(
        `<div class=${masegeClass}
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

const promis1 = createPromise('success', 'First', 'click');

promis1.then(suc => {
  body.insertAdjacentHTML('beforeend', suc);

  const promis2 = createPromise('success', 'Second', 'click');

  return promis2;
}).catch(err => {
  body.insertAdjacentHTML('beforeend', err);

  const promis2 = createPromise('success', 'Second', 'click');

  return promis2;
}).then(suc => {
  body.insertAdjacentHTML('beforeend', suc);

  const promis3 = createPromise('success', 'Third', 'contextmenu');

  return promis3;
}).then(suc => {
  body.insertAdjacentHTML('beforeend', suc);
});
