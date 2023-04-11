'use strict';

const body = document.body;
const promise1 = new Promise((resolve, reject) => {
  listener(resolve, 'First');
  setTimeout(reject, 3000);
});
const promise2 = new Promise((resolve) => {
  listener(resolve, 'Second');
  listener(resolve, 'Second', 'contextmenu');
});
const promise3 = new Promise((resolve) => {
  listener(resolve, 'Second');
})
  .then(() => {
    return new Promise((resolve) => {
      listener(resolve, 'Third', 'contextmenu');
    });
  });

promise1.then(html => body.insertAdjacentHTML('beforeend', html));

promise1.catch(() => body.insertAdjacentHTML('beforeend',
  `<html class="sucsses" data-qa="notification">
    First promise was rejected
  </html>`));
promise2.then(html => body.insertAdjacentHTML('beforeend', html));
promise3.then(html => body.insertAdjacentHTML('beforeend', html));

function listener(resolve, text, actions = 'click') {
  document.addEventListener(actions, () => {
    resolve(`<html class="sucsses" data-qa="notification">
    ${text} promise was resolved</html>`);
  });
};
