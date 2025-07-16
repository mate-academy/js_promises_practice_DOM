'use strict';

const rightAndLeftClick = {
  leftCLick: false,
  rightClick: false,
};
let thirdResolved = false;

function checkBothClick() {
  const { leftCLick, rightClick } = rightAndLeftClick;

  if (leftCLick && rightClick && !thirdResolved) {
    thirdResolved = true;
    thirdResolve();
  }
}

const firstPromise = new Promise((resolve, reject) => {
  const onReject = setTimeout(() => {
    // eslint-disable-next-line
    reject();
  }, 3000);

  document.addEventListener(
    'click',
    () => {
      rightAndLeftClick.leftCLick = true;
      resolve();
      checkBothClick();
      clearTimeout(onReject);
    },
    { once: true },
  );
});

firstPromise
  .then(() => {
    const div = document.createElement('div');

    div.textContent = 'First promise was resolved';
    div.classList.add('success');
    div.setAttribute('data-qa', 'notification');

    document.body.append(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.textContent = 'First promise was rejected';
    div.classList.add('error');
    div.setAttribute('data-qa', 'notification');

    document.body.append(div);
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'click',
    () => {
      rightAndLeftClick.leftCLick = true;
      resolve();
      checkBothClick();
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    () => {
      rightAndLeftClick.rightClick = true;
      resolve();
      checkBothClick();
    },
    { once: true },
  );
});

secondPromise.then(() => {
  const div = document.createElement('div');

  div.textContent = 'Second promise was resolved';
  div.classList.add('success');
  div.setAttribute('data-qa', 'notification');

  document.body.append(div);
});

let thirdResolve;

const thirdPromise = new Promise((resolve) => {
  thirdResolve = resolve;
});

thirdPromise.then(() => {
  const div = document.createElement('div');

  div.textContent = 'Third promise was resolved';
  div.classList.add('success');
  div.setAttribute('data-qa', 'notification');

  document.body.append(div);
});
