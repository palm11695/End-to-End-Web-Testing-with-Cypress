describe('Stubbing', () => {

    afterEach(() => {
        cy.logoutUser();
    });
    describe('exercise-1', () => {
        it('Stub login to change the name', () => {
            cy.intercept(
                'POST',
                'login',
                // copy from normal login response
                {"user":{"id":"t45AiwidW","uuid":"6383f84e-b511-44c5-a835-3ece1d781fa8","firstName":"Natanon","lastName":"RT","username":"NRT_test","password":"$2a$10$5PXHGtcsckWtAprT5/JmluhR13f16BL8SIGhvAKNP.Dhxkt69FfzW","email":"Norene39@yahoo.com","phoneNumber":"625-316-9882","avatar":"https://avatars.dicebear.com/api/human/t45AiwidW.svg","defaultPrivacyLevel":"public","balance":168137,"createdAt":"2019-08-27T23:47:05.637Z","modifiedAt":"2020-05-21T11:02:22.857Z"}})
                .as('login');
            cy.intercept('notifications').as('notifications');

            cy.loginUser();
            cy.wait('@login').then((xhr) => {
                expect(xhr.response.body.user.firstName).to.eq('Natanon');
                expect(xhr.response.body.user.lastName).to.eq('RT');
                expect(xhr.response.body.user.username).to.eq('NRT_test');
            });
            cy.wait('@notifications');
        });
    });

    describe('exercise-1.2', () => {
        beforeEach(() => {
            cy.loginUser();

            cy.intercept('bankAccounts').as('bankAccounts');
            cy.intercept('transactions/public').as('transactions');
            cy.intercept('notifications').as('notifications');

            cy.wait('@bankAccounts');
            cy.wait('@transactions');
            cy.wait('@notifications');
        });

        it('Select a random transaction and modify amount to be $100', () => {
            cy.intercept(
                'GET', 
                'transactions/183VHWyuQMS', 
                {"transaction":{"receiverName":"Arely Kertzmann","senderName":"Kaylin Homenick","receiverAvatar":"https://avatars.dicebear.com/api/human/qywYp6hS0U.svg","senderAvatar":"https://avatars.dicebear.com/api/human/bDjUb4ir5O.svg","likes":[],"comments":[],"id":"183VHWyuQMS","uuid":"26360e56-0e4d-415c-9e62-8846b5bb0260","source":"lWfxENA5ZNy","amount":10000,"description":"Payment: bDjUb4ir5O to qywYp6hS0U","privacyLevel":"contacts","receiverId":"qywYp6hS0U","senderId":"bDjUb4ir5O","balanceAtCompletion":5456,"status":"pending","requestStatus":"","requestResolvedAt":"2020-06-11T05:39:01.608Z","createdAt":"2020-04-14T10:33:22.262Z","modifiedAt":"2020-05-21T23:55:16.804Z"}})
                .as('modifiedTransaction');

            cy.visit('transaction/183VHWyuQMS');

            cy.wait('@modifiedTransaction').then((xhr) => {
                expect(xhr.response.body.transaction.amount).to.eq(10000);
                expect(xhr.response.statusCode).to.eq(200)
            });
        });
    });
});