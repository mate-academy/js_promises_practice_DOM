'use strict';

const body = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('mouseup', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

promise1
  .then(() => {
    body.insertAdjacentHTML('afterbegin', `
      <div class="messages">
        <p data-qa="notification" class="success">
          First promise was resolved
        </p>
      </div>
    `);
  })
  .catch(() => {
    body.insertAdjacentHTML('afterbegin', `
      <div class="messages">
        <p data-qa="notification" class="warning">
          First promise was rejected
        </p>
      </div>
    `);
  })
  .then(() => {
    const promise2 = new Promise(resolve => {
      body.addEventListener('mouseup', (e) => {
        if (e.button !== 1) {
          resolve();
        };
      });
    });

    promise2
      .then(() => {
        const block = document.querySelector('.messages');

        block.insertAdjacentHTML('beforeend', `
          <p data-qa="notification" class="success">
            Second promise was resolved
          </p>
      `);
      })
      .then(() => {
        const promise3 = new Promise(resolve => {
          body.addEventListener('mouseup', (e) => {
            if (e.button === 0) {
              resolve();
            };
          });
        });

        const promise4 = new Promise(resolve => {
          body.addEventListener('mouseup', (e) => {
            if (e.button === 2) {
              resolve();
            };
          });
        });

        Promise.all([promise3, promise4]).then(() => {
          const block = document.querySelector('.messages');

          block.insertAdjacentHTML('beforeend', `
            <p data-qa="notification" class="success">
              Third promise was resolved
            </p>
          `);
        });
      });
  });
