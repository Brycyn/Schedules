describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('/')
    cy.contains('Welcome')
    cy.get('.menu').click()
    cy.contains('Home').click()

    cy.contains('Login With Google')
  })
})