'use strict';

function createMessage(message, className) {
  const div = document.createElement('div');

  div.className = className;
  div.textContent = message;
  div.dataset.qa = 'notification';
  document.body.appendChild(div);
}

const logo = document.getElementsByClassName('logo')[0];

const promise1 = new Promise((resolve, reject) => {
  logo.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const handleSuccess1Promise = (message) => {
  createMessage(message, 'success');
};

const handleError1Promise = (message) => {
  createMessage(message, 'succerroress');
};

const promise2 = new Promise((resolve) => {
  logo.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  logo.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve) => {
  const requiredEvents = new Set(['click', 'contextmenu']);

  const checkEvents = () => {
    if (requiredEvents.size === 0) {
      resolve('Third promise was resolved');
    }
  };

  logo.addEventListener('click', (e) => {
    if (requiredEvents.has('click')) {
      requiredEvents.delete('click');
      checkEvents();
    }
  });

  logo.addEventListener('contextmenu', (e) => {
    if (requiredEvents.has('contextmenu')) {
      requiredEvents.delete('contextmenu');
      checkEvents();
    }
  });
});

promise1.then(handleSuccess1Promise).catch(handleError1Promise);

promise2.then(handleSuccess1Promise);
promise3.then(handleSuccess1Promise);
