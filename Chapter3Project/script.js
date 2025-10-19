/*
 * JavaScript Variable Declaration Exercises
 * Author: Nichelle Barton
 * Date: October 13, 2025
 * Course: Web124-2025
 */

// ========================================
// Variable Declarations with Console Logs
// ========================================

// 1. A variable to store your full name
let fullName = "Nichelle Barton";
console.log("Full Name:", fullName);

// 2. A variable to store your desired annual salary
let desiredAnnualSalary = 85000;
console.log("Desired Annual Salary:", desiredAnnualSalary);

// 3. A variable to store your veteran status (boolean: true or false)
let isVeteran = false;
console.log("Veteran Status:", isVeteran);

// 4. An array to store the names of three of your friends
let friendsNames = ["Sarah Johnson", "Michael Chen", "Emma Rodriguez"];
console.log("Friends Names:", friendsNames);

// 5. An array to store the value of the desired annual salary for your three friends
let friendsSalaries = [75000, 92000, 68000];
console.log("Friends Desired Salaries:", friendsSalaries);

// 6. A literal object to store the first name, last name, and desired annual salary of yet another friend
let anotherFriend = {
    firstName: "David",
    lastName: "Thompson",
    desiredAnnualSalary: 78000
};
console.log("Another Friend:", anotherFriend);

// ========================================
// Additional Console Information
// ========================================

console.log("\n=== Exercise Summary ===");
console.log("Total variables declared: 6");
console.log("Data types used: string, number, boolean, array, object");
console.log("All variables successfully logged to console!");

// ========================================
// Data Type Demonstrations
// ========================================

console.log("\n=== Data Type Information ===");
console.log("typeof fullName:", typeof fullName);
console.log("typeof desiredAnnualSalary:", typeof desiredAnnualSalary);
console.log("typeof isVeteran:", typeof isVeteran);
console.log("typeof friendsNames:", typeof friendsNames);
console.log("Array.isArray(friendsNames):", Array.isArray(friendsNames));
console.log("typeof friendsSalaries:", typeof friendsSalaries);
console.log("Array.isArray(friendsSalaries):", Array.isArray(friendsSalaries));
console.log("typeof anotherFriend:", typeof anotherFriend);

// ========================================
// Array and Object Access Examples
// ========================================

console.log("\n=== Accessing Array Elements ===");
console.log("First friend's name:", friendsNames[0]);
console.log("Second friend's name:", friendsNames[1]);
console.log("Third friend's name:", friendsNames[2]);
console.log("Number of friends:", friendsNames.length);

console.log("\n=== Accessing Array of Salaries ===");
console.log("First friend's salary:", friendsSalaries[0]);
console.log("Second friend's salary:", friendsSalaries[1]);
console.log("Third friend's salary:", friendsSalaries[2]);
console.log("Average salary:", (friendsSalaries[0] + friendsSalaries[1] + friendsSalaries[2]) / 3);

console.log("\n=== Accessing Object Properties ===");
console.log("Another friend's first name:", anotherFriend.firstName);
console.log("Another friend's last name:", anotherFriend.lastName);
console.log("Another friend's full name:", anotherFriend.firstName + " " + anotherFriend.lastName);
console.log("Another friend's desired salary:", anotherFriend.desiredAnnualSalary);

// ========================================
// Exercise Completion Message
// ========================================

console.log("\n🎉 JavaScript Variable Declaration Exercise Complete! 🎉");
console.log("Check the HTML page to see the questions and answers formatted nicely.");