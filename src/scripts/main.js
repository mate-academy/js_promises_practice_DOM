'use strict';

const notification = (type) => (msg) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = type;
  div.textContent = msg;
  document.body.appendChild(div);
};

const success = notification('success');
const error = notification('error');

let firstResolve;
let firstReject;
let secondResolve;
let thirdResolve;

const firstPromise = new Promise((resolve, reject) => {
  firstResolve = resolve;
  firstReject = reject;
});

const secondPromise = new Promise((resolve) => {
  secondResolve = resolve;
});

const thirdPromise = new Promise((resolve) => {
  thirdResolve = resolve;
});

const state = {
  left: false,
  right: false,
  timedOut: false,
  first: false,
  second: false,
  third: false,

  validate() {
    if (!this.first && !this.timedOut && this.left) {
      firstResolve('First promise was resolved');
      this.first = true;
    }

    if (!this.first && this.timedOut && !this.left) {
      firstReject(new Error('First promise was rejected'));
      this.first = true;
    }

    if (!this.second && (this.left || this.right)) {
      secondResolve('Second promise was resolved');
      this.second = true;
    }

    if (!this.third && this.left && this.right) {
      thirdResolve('Third promise was resolved');
      this.third = true;
    }

    if (this.first && this.second && this.third) {
      document.removeEventListener('click', onLeft);
      document.removeEventListener('contextmenu', onRight);
    }
  },
};

const onLeft = () => {
  state.left = true;
  state.validate();
};

const onRight = (e) => {
  e.preventDefault();
  state.right = true;
  state.validate();
};

document.addEventListener('click', onLeft);
document.addEventListener('contextmenu', onRight);

setTimeout(() => {
  state.timedOut = true;
  state.validate();
}, 3000);

firstPromise.then(success).catch(error);
secondPromise.then(success).catch(error);
thirdPromise.then(success).catch(error);
