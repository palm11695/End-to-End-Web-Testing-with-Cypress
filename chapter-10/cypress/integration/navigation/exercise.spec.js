describe('exercise', () => {
    
    beforeEach(() => {
        cy.loginUser();

        cy.intercept('bankAccounts').as('bankAccounts');
        cy.intercept('transactions/public').as('transactions');
        cy.intercept('notifications').as('notifications');

        cy.wait('@bankAccounts');
        cy.wait('@transactions');
        cy.wait('@notifications');
    });

    afterEach(() => {
        // cy.logoutUser();
    });

    describe.skip('exercise-1', () => {
        it('create a new bank account', () => {
            cy.visit('bankAccounts');
            cy.url().should('contains','bankAccounts');

            cy.get('[data-test=bankaccount-new]').click();
            cy.url().should('contains','bankaccounts/new');
            cy.get('#bankaccount-bankName-input').type('test bank account');
            cy.get('#bankaccount-routingNumber-input').type('123456789');
            cy.get('#bankaccount-accountNumber-input').type('12345678910');
            cy.get('[data-test=bankaccount-submit]').click();
            
            cy.url().should('eq','http://localhost:3000/bankaccounts')
        });

        it('try to navigate to signin', () => {
            cy.visit('signin');
            cy.url().should('eq','http://localhost:3000/')
        });
    });

    describe.skip('exercise-2', () => {
        it('click Friends tab and Mine tab', () => {
            cy.get('[data-test=nav-contacts-tab]').click();
            cy.url().should('contains','contacts');
            cy.get('[data-test=nav-personal-tab]').click();
            cy.url().should('contains','personal');
            cy.go('back');
            cy.url().should('contains','contacts');
        });

        it('create new transaction', () => {
            cy.get('[data-test="nav-top-new-transaction"]').click();
            cy.url().should('contains','transaction/new');
            cy.get('[data-test="user-list-item-qywYp6hS0U"]').click();
            cy.get('[data-test="transaction-create-amount-input"]').type(100);
            cy.get('[data-test="transaction-create-description-input"').type('test');
            cy.get('[data-test="transaction-create-submit-request"]').click();
            cy.get('[data-test="new-transaction-return-to-transactions"]').click();
            cy.go('back');
            cy.url().should('contains','transaction/new');
        });
    });

    describe('exercise-3', () => {
        it('go to account menu and change name', () => {
            cy.get('[data-test="sidenav-user-settings"]').click();
            cy.get('[data-test="user-settings-firstName-input"]').clear().type('CherCheep');
            cy.get('[data-test="user-settings-lastName-input"]').clear().type('RT');
            cy.get('[data-test="user-settings-submit"]').click();
            cy.reload();
            cy.get('[data-test="user-settings-firstName-input"]').invoke('val').should('eq','Edgar')
            cy.get('[data-test="user-settings-lastName-input"]').invoke('val').should('eq', 'Johns')
        });
    });
    
});