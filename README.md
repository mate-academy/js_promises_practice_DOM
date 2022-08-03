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

Создайте 3 promise:
- `firstPromise` должен быть
  - **resolved** с сообщением `First promise was resolved` при щелчке левой кнопкой мыши в `document`
  - **rejected** с сообщением `First promise was rejected` через 3 секунды, если не было нажато
- `SecondPromise` должен быть:
  - **resolved** только при щелчке левой или правой кнопкой мыши в `document` с сообщением `Second promise was resolved`
  - никогда не **rejected**
- `thirdPromise` должно быть **resolved** с сообщением `Third promise was resolved` только после того, как были выполнены левый и правый клики.

Добавьте обработчики `success` и `error` к каждому промису, чтобы показать `<div data-qa="notification">` с классом `success` или `warning` и сообщением промиса.

## Instructions
1. Replace `<your_account>` with your Github username in the link
    - [DEMO LINK](https://<your_account>.github.io/js_promises_practice_DOM/)
2. Follow [this instructions](https://mate-academy.github.io/layout_task-guideline/)
    - Run `npm run test` command to test your code;
    - Run `npm run test:only -- -n` to run fast test ignoring linter;
    - Run `npm run test:only -- -l` to run fast test with additional info in console ignoring linter.
