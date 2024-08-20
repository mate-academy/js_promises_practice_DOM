'use strict';

const body = document.querySelector('body');

function firstPromise() {
  try {
    let a = 0;
    const timeOut = setTimeout(() => {
      const errorMessage =
        '<div data-qa="notification" class="error">' +
        'First promise was rejected</div>';

      body.insertAdjacentHTML('afterbegin', errorMessage);
      a = 2;
    }, 3000);

    document.addEventListener('click', (e) => {
      if (e.button === 0) {
        a += 1;

        if (a === 1) {
          const successMessage =
            '<div data-qa="notification" class="success">' +
            'First promise was resolved</div>';

          body.insertAdjacentHTML('afterbegin', successMessage);
          clearTimeout(timeOut);
        }
        a = 2;
      }
    });
  } catch (error) {}
}

function secondPromise() {
  try {
    let a = 0;

    document.addEventListener('mousedown', (e) => {
      if (e.button === 0 || e.button === 2) {
        a = 1;

        if (a === 1) {
          const successMessage =
            '<div data-qa="notification" class="success">' +
            'Second promise was resolved</div>';

          body.insertAdjacentHTML('afterbegin', successMessage);

          a = 2;
        }
      }
    });
  } catch (error) {}
}

function thirdPromise() {
  try {
    let a = 0;
    let b = 0;

    document.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        a = 1;
      }

      if (e.button === 2) {
        b = 1;
      }

      if (a === 1 && b === 1) {
        const successMessage =
          '<div data-qa="notification" class="success">' +
          'Third promise was resolved</div>';

        body.insertAdjacentHTML('afterbegin', successMessage);

        a = 2;
      }
    });
  } catch (error) {}
}

firstPromise();
secondPromise();
thirdPromise();
