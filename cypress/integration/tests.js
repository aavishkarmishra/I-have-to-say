/// <reference types="cypress" />

describe('I Have To Say Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/');
  });

  it('Checking required components', () => {
    cy.get('.comments');
    cy.get('.textarea textarea');
    cy.get('.textarea button');
  });
  it('Add comment and upvote', () => {
    cy.get('.textarea textarea').type('Comment 1');
    cy.get('.textarea button').click();
    cy.get('.comment').should('have.length', 1);
    cy.get('.like').click();
    cy.get('.like').should('have.text', 'Upvote1');
  });
  it('Add reply to a comment', () => {
    cy.get('.textarea textarea').type('Comment 1');
    cy.get('.textarea button').click();
    cy.get('.textarea textarea').type('Comment 2');
    cy.get('.textarea button').click();
    cy.get('.comment').should('have.length', 2);
    cy.get('.addReply').last().click();
    cy.get('.reply .textarea').should('be.visible');
    cy.get('.reply textarea').type('reply 1');
    cy.get('.reply button').first().click();
    cy.get('.addReply').last().click();
    cy.get('.reply button').last().click();
    cy.get('.reply .textarea').should('not.exist');
    cy.get('.reply').last().children().should('have.length', 1);
  });
  it('Delete comment with replies', () => {
    cy.get('.textarea textarea').type('Comment 1');
    cy.get('.textarea button').click();
    cy.get('.textarea textarea').type('Comment 2');
    cy.get('.textarea button').click();
    cy.get('.comment').should('have.length', 2);
    cy.get('.addReply').last().click();
    cy.get('.reply .textarea').should('be.visible');
    cy.get('.reply textarea').type('reply 1');
    cy.get('.reply button').first().click();
    cy.get('.delete').last().click();
    cy.get('.comment').should('have.length', 1);
    cy.get('.reply').should('have.length', 1);
  });
});
