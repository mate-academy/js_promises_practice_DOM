# Promises practice
Create 3 promises:
- The `firstPromise` should be
  - **resolved** with a message `First promise was resolved` on a left `click` in the `document`
  - **rejected** with a message `First promise was rejected` in 3 seconds if not clicked
- The `secondPromise` should be:
  - **resolved** only on `left` or `right` click in the `document` with a message `Second promise was resolved`
  - never **rejected**
- The `thirdPromise` should be **resolved** with a message `Third promise was resolved` only after both `left` and `right` clicks happened

Add `success` and `error` handlers to each promise to show `<div data-qa="notification">` with `success` or `error` class and a promise message.
# DEMO
[DEMO LINK](https://kaminazer.github.io/js_promises_practice_DOM/)

