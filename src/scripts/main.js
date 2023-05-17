'use strict';

const promise1 = new Promise(function(resolve, reject) {
  document.addEventListener('click', () => {
    resolve(`First promise was resolved!`);
  });

  setTimeout(() => reject(new Error(`First promise was rejected`)), 3000);
});

promise1.then(resolution => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.textContent = resolution;
  div.setAttribute(`data-cy`, 'notification');

  document.body.append(div);
}).catch(rejection => {
  const div = document.createElement('div');

  div.classList.add('warning');
  div.setAttribute(`data-cy`, 'notification');
  div.textContent = rejection;
  document.body.append(div);
});

const promise2 = new Promise(function(resolve) {
  document.addEventListener('click', () => {
    resolve(`Second promise was resolved`);
  });

  document.addEventListener('contextmenu', () => {
    resolve(`Second promise was resolved`);
  });
});

promise2.then(resolution => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.setAttribute(`data-cy`, 'notification');
  div.textContent = resolution;
  document.body.append(div);
});

const promise3 = new Promise(function(resolve) {
  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', () => {
      resolve(`Third promise was resolved`);
    });
  });

  document.addEventListener('contextmenu', () => {
    document.addEventListener('click', () => {
      resolve(`Third promise was resolved`);
    });
  });
});

promise3.then(resolution => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.setAttribute(`data-cy`, 'notification');
  div.textContent = resolution;
  document.body.append(div);
});
