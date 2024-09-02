const body = document.querySelector('body');

function firstPromise() {
  return new Promise((resolve, reject) => {
    let a = 0;

    const timeOut = setTimeout(() => {
      const errorMessage =
        '<div data-qa="notification" class="error">' +
        'First promise was rejected</div>';

      body.insertAdjacentHTML('afterbegin', errorMessage);
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
      a = 2;
    }, 3000);

    document.addEventListener('click', (e) => {
      if (e.button === 0 && a === 0) {
        a = 1;

        const successMessage =
          '<div data-qa="notification" class="success">' +
          'First promise was resolved</div>';

        body.insertAdjacentHTML('afterbegin', successMessage);
        clearTimeout(timeOut);
        resolve('First promise was resolved');
        a = 2;
      }
    });
  });
}

function secondPromise() {
  return new Promise((resolve) => {
    let a = 0;

    document.addEventListener('mousedown', (e) => {
      if ((e.button === 0 || e.button === 2) && a === 0) {
        a = 1;

        const successMessage =
          '<div data-qa="notification" class="success">' +
          'Second promise was resolved</div>';

        body.insertAdjacentHTML('afterbegin', successMessage);
        resolve('Second promise was resolved');
        a = 2;
      }
    });
  });
}

function thirdPromise() {
  return new Promise((resolve) => {
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
        resolve('Third promise was resolved');
        a = b = 2;
      }
    });
  });
}

// eslint-disable-next-line no-console
firstPromise().catch((error) => console.error(error));
// eslint-disable-next-line no-console
secondPromise().then((message) => console.log(message));
// eslint-disable-next-line no-console
thirdPromise().then((message) => console.log(message));
