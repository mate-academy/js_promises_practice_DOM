'use strict';

const createElementDiv1 = document.createElement('div');
const createElementDiv2 = document.createElement('div');
const createElementDiv3 = document.createElement('div');
const createElementDiv4 = document.createElement('div');

createElementDiv1.setAttribute('data-qa', 'notification');
createElementDiv2.setAttribute('data-qa', 'notification');
createElementDiv3.setAttribute('data-qa', 'notification');
createElementDiv4.setAttribute('data-qa', 'notification');

// First Promise
const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

// Second Promise
const secondPromise = new Promise((resolve) => {
  // eslint-disable-next-line no-shadow
  document.addEventListener('click', function (event) {
    if (event.button === 0 || event.button === 2) {
      resolve('Second promise resolved after either left or right click');
    }
  });

  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    resolve('Second promise resolved after either left or right click');
  });
});

// Third Promise
const thirdPromise = new Promise((resolve) => {
  let leftClick = false; // Variable for left click
  let rightClick = false; // Variable for right click

  // Left click event listener
  // eslint-disable-next-line no-shadow
  function handleLeftClick(event) {
    if (event.button === 0) {
      leftClick = true;

      if (leftClick && rightClick) {
        resolve('Third promise resolved after both left and right clicks');
        removeEventListeners();
      }
    }
  }

  // Right click event listener
  // eslint-disable-next-line no-shadow
  function handleRightClick(event) {
    event.preventDefault();

    if (event.button === 2) {
      rightClick = true;

      if (leftClick && rightClick) {
        resolve('Third promise resolved after both left and right clicks');
        removeEventListeners();
      }
    }
  }

  // Remove event listeners once the promise resolves
  function removeEventListeners() {
    document.removeEventListener('click', handleLeftClick);
    document.removeEventListener('contextmenu', handleRightClick);
  }

  // Add event listeners
  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

// Handling the promises and displaying results
firstPromise
  .then((data) => {
    createElementDiv1.textContent = data;
    createElementDiv1.classList.add('success');
    document.body.append(createElementDiv1);
  })
  .catch((error) => {
    createElementDiv2.textContent = error.message; // Accessing error message
    createElementDiv2.classList.add('error');
    document.body.append(createElementDiv2);
  });

secondPromise.then((data) => {
  createElementDiv3.textContent = data;
  createElementDiv3.classList.add('success');
  document.body.append(createElementDiv3);
});

thirdPromise.then((data) => {
  createElementDiv4.textContent = data;
  createElementDiv4.classList.add('success');
  document.body.append(createElementDiv4);
});
