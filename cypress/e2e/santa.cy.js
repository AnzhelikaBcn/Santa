import { faker } from "@faker-js/faker";
import { LoginPage } from "../pages/loginPage";
const loginPageElements = require("../fixtures/pages/loginPageSelectors.json");

describe("santa login - UI", () => {
    let oldPassword = "test1111";
    let loginPage = new LoginPage();

    it("user cannot login with old password - UI", () => {

        // Объект класса
        
        let newPassword = "test5555";//faker.internet.password(8); // 8 characters
        cy.log(newPassword);

        cy.visit("https://santa-secret.ru");
        cy.contains("Вход и регистрация").click({ force: true }); //нажать не смотря ни на что
        loginPage.login("angela.pikulina+1@gmail.com", oldPassword);
        cy.contains("Коробки").should("exist");
        cy.changePassword("angela", newPassword);

        cy.contains("Выйти с сайта").click();
        cy.visit("https://santa-secret.ru");
        cy.contains("Вход и регистрация").click({ force: true }); //нажать не смотря ни на что
        cy.get(loginPageElements.loginField).type("angela.pikulina+1@gmail.com");
        cy.get(loginPageElements.passwordField).type(oldPassword);
        cy.get(loginPageElements.loginButton).click();
        cy.contains("Неверное имя пользователя или пароль").should("exist");


        cy.get(":nth-child(4) > .frm").clear().type(newPassword);
        cy.get(".btn-main").click();
        cy.changePassword("angela", oldPassword);

    });

    it.only("user cannot login with old password - API", () => {

        let newPassword = faker.internet.password(8); // 8 characters
        cy.log(newPassword);

        cy.request({
            method: "PUT",
            headers: {
                Cookie: 
                "_ym_uid=1704382346907928078; _ym_d=1704382346; adrcid=A0ph72UbSweLvtiuf-7YZxA; lang=ru; uuid=5b7ed7e696e6dde2%3A3; __upin=AXoxfh1Dtv3gpSykWFjdrQ; _ym_isad=2; _buzz_fpc=JTdCJTIycGF0aCUyMiUzQSUyMiUyRiUyMiUyQyUyMmRvbWFpbiUyMiUzQSUyMi5zYW50YS1zZWNyZXQucnUlMjIlMkMlMjJleHBpcmVzJTIyJTNBJTIyV2VkJTJDJTIwMDglMjBKYW4lMjAyMDI1JTIwMjElM0EyNSUzQTAyJTIwR01UJTIyJTJDJTIyU2FtZVNpdGUlMjIlM0ElMjJMYXglMjIlMkMlMjJ2YWx1ZSUyMiUzQSUyMiU3QiU1QyUyMnVmcCU1QyUyMiUzQSU1QyUyMjRjNDA4ZGIxMDA2ZTljYjU0MWEyNGU2Y2Q1Zjg4OTc3JTVDJTIyJTJDJTVDJTIyYnJvd3NlclZlcnNpb24lNUMlMjIlM0ElNUMlMjIxMjAuMCU1QyUyMiU3RCUyMiU3RA==; _buzz_aidata=JTdCJTIycGF0aCUyMiUzQSUyMiUyRiUyMiUyQyUyMmRvbWFpbiUyMiUzQSUyMi5zYW50YS1zZWNyZXQucnUlMjIlMkMlMjJleHBpcmVzJTIyJTNBJTIyV2VkJTJDJTIwMDglMjBKYW4lMjAyMDI1JTIwMjElM0EyNSUzQTAyJTIwR01UJTIyJTJDJTIyU2FtZVNpdGUlMjIlM0ElMjJMYXglMjIlMkMlMjJ2YWx1ZSUyMiUzQSUyMiU3QiU1QyUyMnVmcCU1QyUyMiUzQSU1QyUyMkFYb3hmaDFEdHYzZ3BTeWtXRmpkclElNUMlMjIlMkMlNUMlMjJicm93c2VyVmVyc2lvbiU1QyUyMiUzQSU1QyUyMjEyMC4wJTVDJTIyJTdEJTIyJTdE; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjY1MjA2NzMsImlhdCI6MTcwNDc0OTQ3NCwiZXhwIjoxNzA3MzQxNDc0fQ.Vgc5nxoqX8AYildNJnm5fbhM5iWUWaVTsi7NeQBRsLE"
            },
            url: "https://santa-secret.ru/api/account/password",
            body: { password: newPassword }
        }).then((response) => {
            expect(response.status).to.eq(200)
        });
        cy.visit("https://santa-secret.ru");
        cy.contains("Вход и регистрация").click({ force: true }); //нажать не смотря ни на что
        loginPage.login("angela.pikulina+1@gmail.com", newPassword);
        cy.contains("Коробки").should("exist");
        cy.contains("angela").click({ force: true });
        //cy.contains("Выйти с сайта", { timeout: 20000 }).click({ force: true });

        cy.request({
            method: "PUT",
            headers: {
                Cookie: 
                "_ym_uid=1704382346907928078; _ym_d=1704382346; adrcid=A0ph72UbSweLvtiuf-7YZxA; lang=ru; uuid=5b7ed7e696e6dde2%3A3; __upin=AXoxfh1Dtv3gpSykWFjdrQ; _ym_isad=2; _buzz_fpc=JTdCJTIycGF0aCUyMiUzQSUyMiUyRiUyMiUyQyUyMmRvbWFpbiUyMiUzQSUyMi5zYW50YS1zZWNyZXQucnUlMjIlMkMlMjJleHBpcmVzJTIyJTNBJTIyV2VkJTJDJTIwMDglMjBKYW4lMjAyMDI1JTIwMjElM0EyNSUzQTAyJTIwR01UJTIyJTJDJTIyU2FtZVNpdGUlMjIlM0ElMjJMYXglMjIlMkMlMjJ2YWx1ZSUyMiUzQSUyMiU3QiU1QyUyMnVmcCU1QyUyMiUzQSU1QyUyMjRjNDA4ZGIxMDA2ZTljYjU0MWEyNGU2Y2Q1Zjg4OTc3JTVDJTIyJTJDJTVDJTIyYnJvd3NlclZlcnNpb24lNUMlMjIlM0ElNUMlMjIxMjAuMCU1QyUyMiU3RCUyMiU3RA==; _buzz_aidata=JTdCJTIycGF0aCUyMiUzQSUyMiUyRiUyMiUyQyUyMmRvbWFpbiUyMiUzQSUyMi5zYW50YS1zZWNyZXQucnUlMjIlMkMlMjJleHBpcmVzJTIyJTNBJTIyV2VkJTJDJTIwMDglMjBKYW4lMjAyMDI1JTIwMjElM0EyNSUzQTAyJTIwR01UJTIyJTJDJTIyU2FtZVNpdGUlMjIlM0ElMjJMYXglMjIlMkMlMjJ2YWx1ZSUyMiUzQSUyMiU3QiU1QyUyMnVmcCU1QyUyMiUzQSU1QyUyMkFYb3hmaDFEdHYzZ3BTeWtXRmpkclElNUMlMjIlMkMlNUMlMjJicm93c2VyVmVyc2lvbiU1QyUyMiUzQSU1QyUyMjEyMC4wJTVDJTIyJTdEJTIyJTdE; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjY1MjA2NzMsImlhdCI6MTcwNDc0OTQ3NCwiZXhwIjoxNzA3MzQxNDc0fQ.Vgc5nxoqX8AYildNJnm5fbhM5iWUWaVTsi7NeQBRsLE"
            },
            url: "https://santa-secret.ru/api/account/password",
            body: { password: oldPassword }
        }).then((response) => {
            expect(response.status).to.eq(200)
        });
        // cy.visit("https://santa-secret.ru");
        // cy.contains("Вход и регистрация").click({ force: true }); //нажать не смотря ни на что
        // loginPage.login("angela.pikulina+test@gmail.com", oldPassword);
        // cy.contains("Коробки").should("exist");
        // cy.contains("angela").click({ force: true });
        

    });

});