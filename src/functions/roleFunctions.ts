import inquirer from "inquirer";
import db from "../db/database.js";

/*

This file contains alphabetized "role"-related functions; 
Quick reference as follows:

1. addRole
2. removeRole
3. viewRoles

*/

// 1. Add a role to the database
export function addRole(): Promise<void> {
  return db.findAllDepartments().then(({ rows }) => {
    const departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    return inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the title of the new role:",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary for the new role:",
      },
      {
        type: "list",
        name: "department_id",
        message: "Select a department for the new role:",
        choices: departmentChoices,
      },
    ]).then((role) => {
        return db.createRole(role)
          .then(() => console.log(`Successfully added ${role.title} role to database.`))
    });
  });
}

// 2. Remove a role from the database
export function removeRole(): Promise<void> {
  return db.findAllRoles().then(({ rows }) => {
    const roles = rows;
    const roleChoices = roles.map(({ id, title }) => ({
      name: title, 
      value: id,
    }));

    return inquirer.prompt([
      {
        type: "list",
        name: "roleId",
        message: "Select a role to remove:",
        choices: roleChoices,
      },
    ])
      .then((res) => db.removeRole(res.roleId))
      .then(() => console.log("Role successfully removed from database."))
  });
}

// 3. View all roles in the database
export function viewRoles(): Promise<void> {
  return db.findAllRoles()
    .then(({ rows }) => {
      const roles = rows;
      console.log("\n");
      console.table(roles);
    })
}