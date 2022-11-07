'use strict';

const errorDiv = document.createElement('div');

errorDiv.classList.add('errors');
document.body.appendChild(errorDiv);
errorDiv.style.flexDirection = 'row';

const appendDivToPage = (type, message) => {
  const div = document.createElement('div');

  div.classList.add(`${type}`);
  div.setAttribute('data-qa', 'notification');
  div.innerText = message;
  div.style.width = '100%';
  errorDiv.appendChild(div);
};

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('left click');
  });

  document.addEventListener('contextmenu', () => {
    resolve('right click');
  });
});

promise1
  .then((result) => {
    appendDivToPage('success', result);
  })
  .catch((result) => {
    appendDivToPage('warning', result);
  });

promise2
  .then((result) => {
    appendDivToPage('success', result);
  });

promise3
  .then((result) => {
    let listener;

    if (result === 'left click') {
      listener = 'contextmenu';
    } else {
      listener = 'click';
    }

    return new Promise(resolve => {
      document.addEventListener(listener, (e) => {
        e.preventDefault();
        resolve('Third promise was resolved');
      });
    });
  })
  .then((result) => {
    appendDivToPage('success', result);
  });
