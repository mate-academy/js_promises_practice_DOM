'use strict';

const body = document.querySelector('body');
const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    const text = `First promise was resolved`;

    clearTimeout(timer);

    resolve(text);
  });

});
const secondPromise = new Promise((resolve) => {
  let countClick = 0;

  if (countClick === 0) {
    document.addEventListener('click', () => {
      const text = `Second promise was resolved`;

      countClick++;
      resolve(text);
    });

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      const text = `Second promise was resolved`;

      countClick++;
      resolve(text);
    });
  }
});
const thirdPromise = new Promise((resolve, reject) => {
  let countClick = 0;

  if (countClick < 2) {
    document.addEventListener('click', () => {
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();

        const text = `Third promise was resolved`;

        countClick++;
        resolve(text);
      });
    });

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      document.addEventListener('click', () => {
        const text = `Third promise was resolved`;

        countClick++;
        resolve(text);
      });
    });
  }
});

function messageSuccess(text) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = text;
  body.append(div);
}

function messageError(text) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.textContent = text;
  body.append(div);
}

firstPromise.then(messageSuccess).catch(messageError);
secondPromise.then(messageSuccess);
thirdPromise.then(messageSuccess);
