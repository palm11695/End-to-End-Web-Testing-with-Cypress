describe('Todo Application tests', () => {
    it('Visits the Todo application', () => {
        cy.visit('http://todomvc.com/examples/react/#/')
    });
    it('Contains todo input element', () => {
        cy.visit('http://todomvc.com/examples/react/#/')
        cy.get('.new-todo')
    });
    it('Adds a new todo', () => {
        cy.visit('http://todomvc.com/examples/react/#/')
        cy.get('.new-todo').type('New Todo {enter}')
    });
    it('asserts change in application state', () => {
        cy.visit('http://todomvc.com/examples/react/#/')
       
        cy.get('.new-todo').type('New Todo {enter}')
        cy.get('.new-todo').type('Another Todo {enter}')
        cy.get(".todo-list").find('li').should('have.length', 2)
    });
    it('asserts inserted todo items are present', () => {
        cy.visit('http://todomvc.com/examples/react/#/')
       
        cy.get('.new-todo').type('New Todo {enter}')
        cy.get('.new-todo').type('Another Todo {enter}')
        cy.get(".todo-list").find('li').should('have.length', 2)
        cy.get('li:nth-child(1)>div>label').should('have.text', 'New Todo')
        cy.get('li:nth-child(2)>div>label').should('have.text', 'Another Todo')
    });
});

// exercise
describe('Exercise on practical testing', () => {
    it('Visits the Todo application', () => {
        cy.visit('http://todomvc.com/examples/react/#/')

        cy.get('.new-todo').type('First {enter}')
        cy.get('.new-todo').type('Second {enter}')
        cy.get('.new-todo').type('Third {enter}')
        cy.get('.todo-list').find('li').should('have.length', 3)
        cy.get('li:nth-child(1)>div>label').should('have.text', 'First')
        cy.get('li:nth-child(2)>div>label').should('have.text', 'Second')
        cy.get('li:nth-child(3)>div>label').should('have.text', 'Third')
    });
});