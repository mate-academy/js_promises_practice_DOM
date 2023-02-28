'use strict';

const htmlBody = document.body;

const firstPromise = new Promise((resolve, reject) => {
  htmlBody.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);
});

firstPromise
  .then(data => {
    htmlBody.insertAdjacentHTML('beforeend',
      `
        <div
          class='success'
          data-qa="notification"
        >
          ${data}
        </div>
      `
    );
  })
  .catch(data => {
    htmlBody.insertAdjacentHTML('beforeend',
      `
      <div
        class='warning'
        data-qa="notification"
      >
        ${data}
      </div>
      `
    );
  });

const secondPromise = new Promise(resolve => {
  htmlBody.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise
  .then(data => {
    htmlBody.insertAdjacentHTML('beforeend',
      `
      <div
        class='success'
        data-qa="notification"
      >
        ${data}
      </div>
    `
    );
  })
  .catch(() => {
    htmlBody.insertAdjacentHTML('beforeend',
      `
      <div
        class='warning'
        data-qa="notification"
      >
        Second promise was rejected
      </div>
    `
    );
  });

const thirdPromise = new Promise(resolve => {
  let isLeftClicked = false;
  let isRightClicked = false;

  htmlBody.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      isLeftClicked = true;
    }

    if (e.button === 2) {
      isRightClicked = true;
    }

    if (isLeftClicked && isRightClicked) {
      resolve(`Third promise was resolved`);
    }
  });
});

thirdPromise
  .then(data => {
    htmlBody.insertAdjacentHTML('beforeend',
      `
        <div
          class='success'
          data-qa="notification"
        >
          ${data}
        </div>
      `
    );
  })
  .catch(() => {
    htmlBody.insertAdjacentHTML('beforeend',
      `
        <div
          class='warning'
          data-qa="notification"
        >
          Third promise was rejected
        </div>
      `
    );
  });
