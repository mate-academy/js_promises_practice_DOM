'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', () => {
      resolve('Third promise was resolved');
    });
  });
});

firstPromise
  .then(success => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.textContent = success;
    div.className = 'success';
    document.body.append(div);
  })
  .catch(error => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.textContent = error;
    div.className = 'error';
    document.body.append(div);
  });

secondPromise
  .then(success => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.textContent = success;
    div.className = 'success';
    document.body.append(div);
  })
  .catch(error => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.textContent = error;
    div.className = 'error';
    document.body.append(div);
  });

thirdPromise
  .then(success => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.textContent = success;
    div.className = 'success';
    document.body.append(div);
  })
  .catch(error => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.textContent = error;
    div.className = 'error';
    document.body.append(div);
  });

// firstPromise
//   .then(() => secondPromise)
//   .then(() => thirdPromise)
//   .then(success => {
//     const div = document.createElement('div');

//     div.dataset.qa = 'notification';
//     div.textContent = success;
//     div.className = 'success';
//     document.body.append(div);
//   });
