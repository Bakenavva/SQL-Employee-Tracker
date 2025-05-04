import inquirer from 'inquirer';
import * as functions from './functions/index.js';

// Main menu function
async function mainMenu() {
  let exit = false;

  while (!exit) {
    const { action } = await inquirer.prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View employees by department",
        "View employees by manager",
        "Add employee",
        "Remove employee",
        "Update employee role",
        "Update employee manager",
        "View all roles",
        "Add role",
        "Remove role",
        "View all departments",
        "Add department",
        "Remove department",
        "View total utilized budget by department",
        "Exit"
      ]
    });

    switch (action) {
      // Employee-related actions
      case "View all employees":
        await functions.viewEmployees();
        break;
      case "View employees by department":
        await functions.viewEmployeesByDepartment();
        break;
      case "View employees by manager":
        await functions.viewEmployeesByManager();
        break;
      case "Add employee":
        await functions.addEmployee();
        break;
      case "Remove employee":
        await functions.removeEmployee();
        break;
      case "Update employee role":
        await functions.updateEmployeeRole();
        break;
      case "Update employee manager":
        await functions.updateEmployeeManager();
        break;
      
      // Role-related actions
      case "View all roles":
        await functions.viewRoles();
        break;
      case "Add role":
        await functions.addRole();
        break;
      case "Remove role":
        await functions.removeRole();
        break;
      
      // Department-related actions
      case "View all departments":
        await functions.viewDepartments();
        break;
      case "Add department":
        await functions.addDepartment();
        break;
      case "Remove department":
        await functions.removeDepartment();
        break;
      case "View total utilized budget by department":
        await functions.viewUtilizedBudgetByDepartment();
        break;
      
      // Exit action
      case "Exit":
        quit();
        exit = true;
        break;

      default:
        console.log("Invalid action. Please try again.");
        break;
    }
  }
}

// Exit the application
function quit() {
  console.log("Sayonara!");
  process.exit();
}

// Initialize the application
function init() {
  console.log("Welcome to the Employee Tracker!");
  mainMenu();
}

init();