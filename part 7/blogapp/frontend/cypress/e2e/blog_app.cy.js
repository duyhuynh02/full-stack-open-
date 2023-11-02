describe("Blog App", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Duy Huynh",
      username: "duyhuynh",
      password: "dhsecret",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:5173/");
  });

  it("Login form is shown", function () {
    cy.contains("login to the app");
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("duyhuynh");
      cy.get("#password").type("dhsecret");
      cy.get("#login-button").click();
      cy.contains("Duy Huynh logged in");
    });

    it("fails with wrong crendentials", function () {
      cy.get("#username").type("duyhuynh");
      cy.get("#password").type("ozarks");
      cy.get("#login-button").click();
      cy.contains("Wrong username or password");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("login to the app");
      cy.get("#username").type("duyhuynh");
      cy.get("#password").type("dhsecret");
      cy.get("#login-button").click();
      cy.contains("Duy Huynh logged in");
    });

    it("A blog can be created", function () {
      cy.contains("create new note").click();
      cy.get('[placeholder="write title of blog here"]').type(
        "How to launder your money?",
      );
      cy.get('[placeholder="write author of blog here"]').type("Jonah Byrde");
      cy.get('[placeholder="write url of blog here"]').type(
        "http://fullstackopen.com",
      );
      cy.get("#create-button").click();
    });
  });

  describe("user can do anything", function () {
    beforeEach(function () {
      cy.contains("login to the app");
      cy.get("#username").type("duyhuynh");
      cy.get("#password").type("dhsecret");
      cy.get("#login-button").click();
      cy.contains("Duy Huynh logged in");

      cy.contains("create new note").click();
      cy.get('[placeholder="write title of blog here"]').type(
        "How to launder your money?",
      );
      cy.get('[placeholder="write author of blog here"]').type("Jonah Byrde");
      cy.get('[placeholder="write url of blog here"]').type(
        "http://fullstackopen.com",
      );
      cy.get("#create-button").click();
    });

    it("user can like blog", function () {
      cy.get("#show-detail").click();
      cy.get(".likes").click();
      cy.contains("2");
    });

    it("user can see and delete blog", function () {
      cy.get("#show-detail").click();
      cy.contains("remove");
      cy.get("#remove").click();
    });
  });

  describe("blogs are ordered according to likes", function () {
    beforeEach(function () {
      cy.contains("login to the app");
      cy.get("#username").type("duyhuynh");
      cy.get("#password").type("dhsecret");
      cy.get("#login-button").click();
      cy.contains("Duy Huynh logged in");

      //first blog, 3 likes
      cy.contains("create new note").click();
      cy.get('[placeholder="write title of blog here"]').type(
        "How to launder money?",
      );
      cy.get('[placeholder="write author of blog here"]').type("Jonah Byrde");
      cy.get('[placeholder="write url of blog here"]').type(
        "http://fullstackopen.com",
      );
      cy.get("#create-button").click();
      cy.get(".showDetail").eq(0).click();
      Cypress._.times(2, () => {
        cy.get(".likes").eq(0).click();
      });

      //2nd blog, 7 likes.
      cy.contains("create new note").click();
      cy.get('[placeholder="write title of blog here"]').type(
        "Ozark is a good show, no?",
      );
      cy.get('[placeholder="write author of blog here"]').type("Marty Byrde");
      cy.get('[placeholder="write url of blog here"]').type(
        "http://ozarks.com",
      );
      cy.get("#create-button").click();
      cy.get(".showDetail").eq(1).click();

      Cypress._.times(6, () => {
        cy.get(".likes").eq(1).click();
      });

      //3rd blog, 4 likes
      cy.contains("create new note").click();
      cy.get('[placeholder="write title of blog here"]').type(
        "Wendy is such a hypocrite",
      );
      cy.get('[placeholder="write author of blog here"]').type("Wendy Byrde");
      cy.get('[placeholder="write url of blog here"]').type(
        "http://ozarks.com",
      );
      cy.get("#create-button").click();
      cy.get(".showDetail").eq(2).click();

      Cypress._.times(3, () => {
        cy.get(".likes").eq(2).click();
      });

      cy.reload();
    });

    it("Blog should be in order", function () {
      cy.get(".blog").eq(0).should("contain", "Ozark is a good show, no?");
      cy.get(".blog").eq(1).should("contain", "Wendy is such a hypocrite");
      cy.get(".blog").eq(2).should("contain", "How to launder money?");
    });
  });
});
