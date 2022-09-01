'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button !== 0) {
      return;
    }
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });

  document.addEventListener('click', (e) => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    document.addEventListener('contextmenu', (eventt) => {
      eventt.preventDefault();

      rightClick = true;

      if (leftClick && rightClick) {
        resolve();
      }
    });
  });
});

const successMessage1 = () => {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="success">
      First promise was resolved
    </div>
  `);
};

const errorMessage1 = () => {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="warning">
      First promise was rejected
    </div>
  `);
};

const successMessage2 = () => {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="success">
      Second promise was resolved
    </div>
  `);
};
const successMessage3 = () => {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="success">
      Third promise was resolved
    </div>
  `);
};

firstPromise.then(successMessage1).catch(errorMessage1);
secondPromise.then(successMessage2).catch();
thirdPromise.then(successMessage3).catch();
