'use strict';

const body = document.body;
let n = 0;

const success = (data) => {
  n += 1;

  return body.insertAdjacentHTML('beforeend', `
  <div
    class="success message message--${n}"
    data-qa="notification"
  >
    ${data}
  </div>
`);
};

const errorMessage = (data) => body.insertAdjacentHTML('beforeend', `
    <div
      class="
        message
        message--err
        warning
      "
      data-qa="notification"
    >
      ${data}
    </div>
  `);

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => resolve(`First promise was resolved`));

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const promise2 = new Promise((resolve) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 2 || e.button === 0) {
      resolve('Second promise was resolved');
    }
  });
});

const promise3 = new Promise((resolve) => {
  const pushedButtons = {
    left: false,
    right: false,
  };

  const handlerChecked = ({ left, right }) => {
    return left && right && resolve(`Third promise was resolved`);
  };

  body.addEventListener('mousedown', (e) => {
    if (e.button === 2) {
      pushedButtons.right = true;
      handlerChecked(pushedButtons);
    }

    if (e.button === 0) {
      pushedButtons.left = true;
      handlerChecked(pushedButtons);
    }
  });
});

promise1
  .then(success)
  .catch(({ message }) => errorMessage(message));

promise2.then(success);

promise3.then(success);
