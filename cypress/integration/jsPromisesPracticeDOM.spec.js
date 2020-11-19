'use strict';

  describe('promises in DOM', () => {
    beforeEach('open site',() => {
      cy.visit('/')
    });


    it('resolve first promise left click', function () {
      cy.get('body').trigger('mousedown', { button: 0 })
      cy.get('.message').contains('First promise was resolved').should('exist');
      cy.wait(3000);
      cy.get('.message').contains('First promise was rejected').should('not.exist');
    });

    it('resolve first promise right click', function () {
      cy.get('body').trigger('mousedown', { button: 2 })
      cy.get('.message').contains('First promise was resolved').should('exist');
    });

    it('resolve first promise middle button click', function () {
      cy.get('.logo').trigger('mousedown', { button: 1 })
      cy.get('.message').contains('First promise was resolved').should('exist');
    });

    it('ignore middle button click for the second promise', function () {
      cy.get('.logo').trigger('mousedown', { button: 1 })
        .trigger('mouseup');
      cy.get('.logo').trigger('mousedown', { button: 1 })
        .trigger('mouseup');
      // cy.get('.message').contains('First promise was resolved').should('exist');
      cy.get('.message').contains('Second promise was resolved').should('not.exist');
    });

    it('reject first promise ', function () {
      cy.wait(3000);
      cy.get('.message').contains('rejected').should('exist');
    });

    it('resolve second promise right click', function () {
      cy.get('body').rightclick({force:true});
      cy.get('.message').contains('Second promise was resolved').should('exist');
   });

    it('resolve second promise left click', function () {
      cy.get('body').click({force:true});
      cy.get('.message').contains('Second promise was resolved').should('exist');
   });

    it('resolve third promise', function () {
      cy.get('body').rightclick({force:true});
      cy.get('body').click({force:true});
      cy.get('.message').contains('Third promise was resolved').should('exist');
   });

    it('resolve all promises', function () {
      cy.get('body').click({force:true});
      cy.get('body').rightclick({force:true});
      cy.get('.message').contains('First promise was resolved');
      cy.get('.message').contains('Second promise was resolved');
      cy.get('.message').contains('Third promise was resolved');
   });

    it('reject 1st promise, resolve 2nd and 3rd promises', function () {
      cy.wait(3000);
      cy.get('body').click({force:true});
      cy.get('body').rightclick({force:true});
      cy.get('.message').contains('First promise was rejected');
      cy.get('.message').contains('Second promise was resolved');
      cy.get('.message').contains('Third promise was resolved');
   });
  });
