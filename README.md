# Promises practice
Create 3 promises:
- The `firstPromise` should be
  - **resolved** with a message `First promise was resolved` on a left `click` in the `document`
  - **rejected** with a message `First promise was rejected` in 3 seconds if not clicked
- The `secondPromise` should be:
  - **resolved** only on `left` or `right` click in the `document` with a message `Second promise was resolved`
  - never **rejected**
- The `thirdPromise` should be **resolved** with a message `Third promise was resolved` only after both `left` and `right` clicks happened

Add `success` and `error` handlers to each promise to show `<div data-qa="notification">` with `success` or `warning` class and a promise message.

## Instructions
1. Replace `<your_account>` with your Github username in the link
    - [DEMO LINK](https://Pavlo-Khashchevskyi.github.io/js_promises_practice_DOM/)
2. Follow [this instructions](https://mate-academy.github.io/layout_task-guideline/)
    - Run `npm run test` command to test your code;
    - Run `npm run test:only -- -n` to run fast test ignoring linter;
    - Run `npm run test:only -- -l` to run fast test with additional info in console ignoring linter.
