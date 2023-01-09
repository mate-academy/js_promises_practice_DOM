'use strict';

const addText = (promiseName, isError = false) => `
  ${promiseName} promise was ${isError ? 'rejected' : 'resolved'}
`;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    e.button === 0 && resolve(addText('First'));
  });
  setTimeout(() => reject(addText('First', true)), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    e.button !== 1 && resolve(addText('Second'));
  });
});

const isClicked = {};
const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    e.button === 0 && (isClicked[1] = true);
    e.button === 2 && (isClicked[2] = true);
    isClicked[1] && isClicked[2] && resolve(addText('Third'));
  });
});

firstPromise.then(addMessage, addMessage);
secondPromise.then(addMessage);
thirdPromise.then(addMessage);

function addMessage(result) {
  const type = result.split(' ').pop() === 'resolved' ? 'success' : 'error';
  const div = document.createElement('div');

  div.classList.add(type);
  div.setAttribute('data-qa', 'notification');
  div.innerHTML = result;
  document.body.append(div);
};
