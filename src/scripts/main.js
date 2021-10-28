'use strict';

const body = document.body;
const message = {
  first: {
    resolved: 'First promise was resolved',
    rejected: 'First promise was rejected',
  },
  second: 'Second promise was resolved',
  third: 'Third promise was resolved',
};

const printNotification = (text, classStatus) => {
  const maskMessage = `
    <div 
      style="padding: 20px;" 
      class="${classStatus}" 
      data-qa="notification"
    >
      ${text}
    </div>
  `;

  body.insertAdjacentHTML('beforeend', maskMessage);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve([message.first.resolved, 'success']);
  });

  setTimeout(() => reject(message.first.rejected), 3000);
});

firstPromise
  .then(
    resolve => printNotification(...resolve),
    reject => printNotification(reject, 'warning')
  );

const secondPromise = new Promise(resolve => {
  document.addEventListener('mousedown', (e) => {
    if (e.target.tagName !== 'H1') {
      resolve(message.second);
    }
  });
});

secondPromise.then(resolve => printNotification(resolve, 'success'));

let left = false;
let right = false;

const thirdPromise = new Promise(resolve => {
  document.addEventListener('mousedown', (e) => {
    switch (e.button) {
      case 0:
        left = true;
        break;

      case 2:
        right = true;
    }

    if (left && right) {
      resolve(message.third);
    }
  });
});

thirdPromise.then(resolve => printNotification(resolve, 'success'));
