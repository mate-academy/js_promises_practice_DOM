'use strict';

const logo = document.querySelector('.logo');

class FormatError extends SyntaxError {
  constructor(message) {
    super(message);
    this.name = 'FormatError';
  }
}

const promise1Err = new FormatError('First promise was rejected');

const promise1 = new Promise((resolve, reject) => {
  logo.addEventListener('click', () => {
    resolve(`First promise was resolved`);
  });

  setTimeout(() => {
    reject(promise1Err.message);
  }, 3000);
});

promise1.then(
  (result) => {
    logo.insertAdjacentHTML('afterend', `
      <div class="success" data-qa="notification">
        <span>
          ${result}
        </span>
      </div>
    `);
  },
  (err) => {
    logo.insertAdjacentHTML('afterend', `
      <div class="warning" data-qa="notification">
        <span>
          ${err}
        </span>
      </div>
    `);
  }
);

const promise2 = new Promise((resolve) => {
  logo.addEventListener('mousedown', e => {
    if (e.which === 1 || e.which === 3) {
      resolve(`Second promise was resolved`);
    }
  });
});

promise2.then((result) => {
  logo.insertAdjacentHTML('afterend', `
    <div class="success" data-qa="notification">
      <span>
        ${result}
      </span>
    </div>
  `);
});

const promise3 = new Promise((resolve) => {
  let countClick = 0;
  let sumWhich = 0;

  logo.addEventListener('mousedown', e => {
    if (countClick > 2) {
      countClick = 0;
      sumWhich = 0;
    }

    countClick++;
    sumWhich += e.which;

    if (sumWhich === 4) {
      resolve(`Third promise was resolved`);
    }
  });
});

promise3.then((result) => {
  logo.insertAdjacentHTML('afterend', `
    <div class="success" data-qa="notification">
      <span>
        ${result}
      </span>
    </div>
  `);
});
