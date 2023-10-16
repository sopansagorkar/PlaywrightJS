Feature: login screen

As a user 
I want to test
All basic scenarios for login Page

Scenario: Login with valid credentials
  Given I am on login page
   When I enter "username"
    And I enter "password"
    And click on "login" button
   Then verify user landed on "welcome" screen



