'use strict';

const firstPromise = new Promise((resolve, reject) => {

  const timer = setTimeout(() => {
  reject('First promise was rejected');
}, 3000);

document.addEventListener('click', (event) => {
if (event.button === 0) {
  clearTimeout(timer);
  resolve ('First promise was resolved');
}

})
});

firstPromise
  .then((message) => {
    const div = document.createElement('div');
    div.dataset.qa = 'notification';
    div.classList.add('success');
    div.textContent = message;
    document.body.appendChild(div);
  })
  .catch((message) => {
    const div = document.createElement('div');
    div.dataset.qa = 'notification';
    div.classList.add('error');
    div.textContent = message;
    document.body.appendChild(div);
  });


const secondPromise = new Promise((resolve, reject) => {
document.addEventListener ('click', (event) => {
if (event.button === 0 || event.button === 2) {
  resolve ('Second promise was resolved');
}
}, {once: true});
});

secondPromise
  .then((message) => {
    const div = document.createElement('div');
    div.dataset.qa = 'notification';
    div.classList.add('success');
    div.textContent = message;
    document.body.appendChild(div);
  })
  .catch();

let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (event) => {
    if (event.button === 0) leftClicked = true;
    if (event.button === 2) rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});


thirdPromise
  .then((message) => {
    const div = document.createElement('div');
    div.dataset.qa = 'notification';
    div.classList.add('success');
    div.textContent = message;
    document.body.appendChild(div);
  })
  .catch();
