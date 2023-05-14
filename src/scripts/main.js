'use strict';

function createPromise1() {
  const resolver = (resolve, reject) => {
    const click = document.addEventListener('mouseup', (e) => {
      if (e.button === 0) {
        resolve();
      }
    });

    setTimeout(() => {
      if (!click) {
        reject();
      }
    }, 3000);
  };

  return new Promise(resolver);
}

function createPromise2() {
  const resolver = (resolve) => {
    try {
      document.addEventListener('contextmenu', (ev) => {
        ev.preventDefault();

        if (ev.button === 2) {
          resolve();
        }
      });

      document.addEventListener('mouseup', (e) => {
        if (e.button === 0) {
          resolve();
        }
      });
    } catch (error) {
      document.addEventListener('contextmenu', (ev) => {
        ev.preventDefault();

        if (ev.button === 2) {
          resolve();
        }
      });

      document.addEventListener('mouseup', (e) => {
        if (e.button === 0) {
          resolve();
        }
      });
    }
  };

  return new Promise(resolver);
}

function createPromise3() {
  const resolver = (resolve, reject) => {
    let right = 0;
    let left = 0;

    document.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();

      if (ev.button === 2) {
        if (left > 0) {
          resolve();
        } else {
          right += 1;
        }
      }
    });

    document.addEventListener('mouseup', (e) => {
      if (e.button === 0) {
        if (right > 0) {
          resolve();
        } else {
          left += 1;
        }
      }
    });
  };

  return new Promise(resolver);
}

const promise1 = createPromise1();

promise1
  .then(() => {
    document.body.innerHTML += `
    <div data-qa="notification" class="success">
        First promise was resolved
      </div>
    `;
  })
  .catch(() => {
    document.body.innerHTML += `
      <div data-qa="notification" class="warning">
        First promise was rejected
      </div>
    `;
  });

const promise2 = createPromise2();

promise2.then(() => {
  document.body.innerHTML += `
    <div data-qa="notification" class="success">
      Second promise was resolved
    </div>
  `;
});

const promise3 = createPromise3();

promise3.then(() => {
  document.body.innerHTML += `
    <div data-qa="notification" class="success">
      Third promise was resolved
    </div>
  `;
});
