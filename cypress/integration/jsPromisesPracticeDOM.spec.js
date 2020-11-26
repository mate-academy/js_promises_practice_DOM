'use strict';

Cypress.Commands.add('clickButton',
  (mouseButton) => {
    cy.get('body').trigger('mousedown', mouseButton)
      .trigger('mouseup');
  });

Cypress.Commands.add('checkPromise',
  (promise) => {
    cy.get('[data-qa="notification"]').contains(promise);
  });

const fPromRes = 'First promise was resolved';
const fPromRej = 'First promise was rejected';
const sPromRes = 'Second promise was resolved';
const thPromRes = 'Third promise was resolved';

describe('Promises in DOM', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should resolve first promise left click', function() {
    cy.clickButton({ button: 0 });
    cy.checkPromise(fPromRes);
    // NOTE: waiting for reject
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.checkPromise(fPromRej).should('not.exist');
  });

  it('should resolve first promise right click', function() {
    cy.clickButton({ button: 2 });
    cy.checkPromise(fPromRes);
  });

  it('should resolve first promise middle button click', function() {
    cy.clickButton({ button: 1 });
    cy.checkPromise(fPromRes);
  });

  it('should ignore middle button click for the second promise', function() {
    cy.clickButton({ button: 1 });
    cy.clickButton({ button: 1 });
    cy.checkPromise(sPromRes).should('not.exist');
  });

  it('should reject first promise after 3 seconds of inactivity', function() {
    // NOTE: waiting for reject
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.checkPromise(fPromRej);
  });

  it('should resolve second promise on right click', function() {
    cy.clickButton({ button: 2 });
    cy.checkPromise(sPromRes);
  });

  it('should resolve second promise on left click', function() {
    cy.clickButton({ button: 0 });
    cy.checkPromise(sPromRes);
  });

  it('should resolve third promise', function() {
    cy.clickButton({ button: 2 });
    cy.clickButton({ button: 0 });
    cy.checkPromise(thPromRes);
  });

  it('should resolve all promises', function() {
    cy.clickButton({ button: 2 });
    cy.clickButton({ button: 0 });
    cy.checkPromise(fPromRes);
    cy.checkPromise(sPromRes);
    cy.checkPromise(thPromRes);
  });

  it('should reject 1st promise, resolve 2nd and 3rd promises', function() {
    // NOTE: waiting for reject
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.clickButton({ button: 0 });
    cy.clickButton({ button: 2 });
    cy.checkPromise(fPromRej);
    cy.checkPromise(sPromRes);
    cy.checkPromise(thPromRes);
  });
});
