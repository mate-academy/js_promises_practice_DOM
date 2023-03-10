'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let LeftKey = false;
  let RightKey = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      LeftKey = true;
    }

    if (e.button === 2) {
      RightKey = true;
    }

    if (LeftKey && RightKey) {
      resolve('Third promise was resolved');
    }
  });
});

function addContent(className, text) {
  document.body.insertAdjacentHTML('beforeend', `
    <div
      class="${className}"
      data-qa="notification"
    >
      ${text}
    </div>
  `);
}

firstPromise
  .then(result => {
    addContent('succes', result);
  })
  .catch(result => {
    addContent('warning', result);
  });

secondPromise
  .then(result => {
    addContent('succes', result);
  })
  .catch(result => {
    addContent('warning', result);
  });

thirdPromise
  .then(result => {
    addContent('succes', result);
  })
  .catch(result => {
    addContent('warning', result);
  });
