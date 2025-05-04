import inquirer from "inquirer";
import db from "../db/database.js";

/*

This file contains alphabetized "department"-related functions; 
Quick reference as follows:

1. addDepartment
2. removeDepartment
3. viewDepartments
4. viewUtilizedBudgetByDepartment

*/

// 1. Add a department to the database
export function addDepartment(): Promise<void> {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the name of the new department:",
    },
  ]).then((department) => {
    return db.createDepartment(department)
      .then(() => console.log(`Successfully added ${department.name} department to database.`))
  });
}

// 2. Remove a department from the database
export function removeDepartment(): Promise<void> {
  return db.findAllDepartments().then(({ rows }) => {
    const departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    return inquirer.prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Select a department to remove:",
        choices: departmentChoices,
      },
    ])
      .then((res) => db.removeDepartment(res.departmentId))
      .then(() => console.log("Department successfully removed from database."))
  });
}

// 3. View all departments in the database
export function viewDepartments(): Promise<void> {
  return db.findAllDepartments()
    .then(({ rows }) => {
      const departments = rows;
      console.log("\n");
      console.table(departments);
    });
}

// 4. View the utilized budget for a specific department
export function viewUtilizedBudgetByDepartment(): Promise<void> {
  return db.viewDepartmentBudget()
    .then(({ rows }) => {
      const departments = rows;
      console.log("\n");
      console.table(departments);
    })
}
