'use strict';

// Заборона стандартного контекстного меню
document.addEventListener('contextmenu', (eve) => {
  eve.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  const rejectTimeOut = setTimeout(() => {
    const div = document.createElement('div');
    div.setAttribute('data-qa', 'notification');
    div.classList.add('error');
    div.textContent = 'First promise was rejected';
    reject(div);
  }, 3000);

  document.addEventListener('click', (eve) => {
    if (eve.button !== 0) {
      return;
    }

    clearTimeout(rejectTimeOut);
    const div = document.createElement('div');
    div.setAttribute('data-qa', 'notification');
    div.classList.add('success');
    div.textContent = 'First promise was resolved';
    resolve(div);
  });
});

firstPromise
  .then(div => {
    document.body.append(div);
  })
  .catch(div => {
    document.body.append(div);
  });

const secondPromise = new Promise((resolve) => {
  const div = document.createElement('div');
  div.setAttribute('data-qa', 'notification');

  const handleEvent = () => {
    div.classList.add('success');
    div.textContent = 'Second promise was resolved';
    resolve(div);
  };

  document.addEventListener('contextmenu', handleEvent);
  document.addEventListener('click', handleEvent);
});

secondPromise.then(div => {
  document.body.append(div);
});

const thirdPromise = new Promise((resolve) => {
  let rightCheck = false;
  let leftCheck = false;
  const div = document.createElement('div');
  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');

  document.addEventListener('contextmenu', (eve) => {
    rightCheck = true;
    if (leftCheck) {
      div.textContent = 'Third promise was resolved';
      resolve(div);
    }
  });

  document.addEventListener('click', (eve) => {
    if (eve.button === 0) { // Лівий клік
      leftCheck = true;
      if (rightCheck) {
        div.textContent = 'Third promise was resolved';
        resolve(div);
      }
    }
  });
});

thirdPromise.then(div => {
  document.body.append(div);
});
