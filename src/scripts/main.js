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
  let click = false;
  let contex = false;

  document.addEventListener('click', () => {
    click = true;

    if (contex || click) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    contex = true;

    if (contex || click) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let click = false;
  let contex = false;

  document.addEventListener('click', () => {
    click = true;

    if (contex && click) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    contex = true;

    if (contex && click) {
      resolve('Third promise was resolved');
    }
  });
});

async function success1(data) {
  try {
    const result = await data;
    const body = document.querySelector('body');
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.classList.add('success');
    div.textContent = result;
    body.append(div);
  } catch (errorMessage) {
    const result = errorMessage;
    const body = document.querySelector('body');
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.classList.add('error');
    div.textContent = result;
    body.append(div);
  }
}

success1(firstPromise);
success1(secondPromise);
success1(thirdPromise);
