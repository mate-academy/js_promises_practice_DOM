'use strict';

const body = document.querySelector('body');
const div = document.createElement('div');

div.dataset.qa = 'notification';

function firstPromise() {
  const resolver1 = (complete, error) => {
    setTimeout(() => {
      error();
    }, 3000);

    body.addEventListener('mousedown', (e) => {
      if (e.which === 1) {
        complete();
      }
    });
  };

  return new Promise(resolver1);
}

const first = firstPromise();

first
  .then(() => {
    body.append(div);
    div.classList.add('success');
    div.textContent = 'First promise was resolved';

    function secondPromise() {
      const resolver1 = (complete) => {
        body.addEventListener('mousedown', (e) => {
          if (e.which === 1 || e.which === 3) {
            complete();
          }
        });
      };

      return new Promise(resolver1);
    }

    const second = secondPromise();

    second
      .then(() => {
        body.append(div);
        div.textContent = 'Second promise was resolved';

        function thirdPromiseLeft() {
          return new Promise(resolve => {
            body.addEventListener('mousedown', (e) => {
              if (e.which === 1) {
                resolve();
              }
            });
          });
        }

        function thirdPromiseRight() {
          return new Promise(resolve => {
            body.addEventListener('mousedown', (e) => {
              if (e.which === 3) {
                resolve();
              }
            });
          });
        }

        const thirdLeft = thirdPromiseLeft();
        const thirdRight = thirdPromiseRight();

        thirdLeft
          .then(() => {
            return thirdRight;
          })
          .then(() => {
            body.append(div);
            div.textContent = 'Third promise was resolved';
          });
      });
  })
  .catch(() => {
    body.append(div);
    div.classList.add('warning');
    div.textContent = 'First promise was rejected';
  });
