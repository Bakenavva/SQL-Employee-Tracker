import inquirer from "inquirer";
import db from "../db/database.js";

/*

This file contains alphabetized "employee"-related functions; 
Quick reference as follows:

1. addEmployee
2. removeEmployee
3. updateEmployeeManager
4. updateEmployeeRole
5. viewEmployees
6. viewEmployeesByDepartment
7. viewEmployeesByManager

*/

// 1. Add an employee to the database
export function addEmployee(): Promise<void> {
  return inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Enter the first name of the new employee:",
    },
    {
      type: "input",
      name: "last_name",
      message: "Enter the last name of the new employee:",
    },
  ]).then((employee) => {
    const firstName = employee.first_name;
    const lastName = employee.last_name;

    return db.findAllRoles().then(({ rows }) => {
      const roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

      return inquirer.prompt({
        type: "list",
        name: "roleId",
        message: "Select a role for the new employee:",
        choices: roleChoices,
      }).then((res) => {
        const roleId = res.roleId;

        return db.findAllEmployees().then(({ rows }) => {
          const employees = rows;
          const managerChoices = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
          }));

          managerChoices.unshift({ name: "None", value: null });

          return inquirer.prompt({
            type: "list",
            name: "managerId",
            message: "Select a manager for the new employee:",
            choices: managerChoices,
          })
            .then((res) => {
              const employee = {
                manager_id: res.managerId,
                role_id: roleId,
                first_name: firstName,
                last_name: lastName,
              };

              return db.createEmployee(employee);
            })
            .then(() => console.log(`Successfully added ${firstName} ${lastName} to database.`))
        });
      });
    });
  });
}

// 2. Remove an employee from the database
export function removeEmployee(): Promise<void> {
  return db.findAllEmployees().then(({ rows }) => {
    const employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    return inquirer.prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Select an employee to remove:",
        choices: employeeChoices,
      },
    ])
      .then((res) => db.removeEmployee(res.employeeId))
      .then(() => console.log("Employee removed successfully."))
  });
}

// 3. Update an employee's manager
export function updateEmployeeManager(): Promise<void> {
  return db.findAllEmployees().then(({ rows }) => {
    const employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
  }));

  return inquirer.prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Select an employee to update their manager:",
      choices: employeeChoices,  
    }
  ])
    .then((res) => {
      const employeeId = res.employeeId;
      return db.findAllPossibleManagers(employeeId).then(({ rows }) => {
        const managers = rows;
        const managerChoices = managers.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id,
        }));

        return inquirer.prompt([
          {
            type: "list",
            name: "managerId",
            message: "Select a new manager for the selected employee:",
            choices: managerChoices,
          },
        ])
          .then((res) => db.updateEmployeeManager(employeeId, res.managerId))
          .then(() => console.log("Employee manager updated successfully."))
      });
    });
  });
}

// 4. Update an employee's role
export function updateEmployeeRole(): Promise<void> {
  return db.findAllEmployees().then(({ rows }) => {
    const employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    return inquirer.prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Select an employee to update their role:",
        choices: employeeChoices,
      },
    ])
      .then((res) => {
        const employeeId = res.employeeId;
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
              message: "Select a new role for the selected employee:",
              choices: roleChoices,
            },
          ])
            .then((res) => db.updateEmployeeRole(employeeId, res.roleId))
            .then(() => console.log("Employee role updated successfully."))

        });
      });
    });                  
}

// 5. View all employees in the database
export function viewEmployees(): Promise<void> {
  return db.findAllEmployees()
    .then(({ rows }) => {
      const employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .catch((err) => {
      console.log("Error retrieving employees:", err);
    });
}

// 6. View all employees in a specific department
export function viewEmployeesByDepartment(): Promise<void> {
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
        message: "Select a department:",
        choices: departmentChoices,
      },
    ])
      .then((res) => db.findAllEmployeesByDepartment(res.departmentId))
      .then(({ rows }) => {
        const employees = rows;
        console.log("\n");
        console.table(employees);
    })
    .catch((err) => {
      console.log("Error viewing employees by department:", err);
    })
  });
}

// 7. View all employees under a specific manager
export function viewEmployeesByManager(): Promise<void> {
  return db.findAllEmployees().then(({ rows }) => {
    const managers = rows;
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    return inquirer.prompt([
      {
        type: "list",
        name: "managerId",
        message: "Select a manager:",
        choices: managerChoices,
      },
    ])
      .then((res) => db.findAllEmployeesByManager(res.managerId))
      .then(({ rows }) => {
        const employees = rows;
        console.log("\n");
        if (employees.length === 0) {
          console.log("No employees found for this manager.");
        } else {
          console.table(employees);
        }
      })
      .catch((err) => {
        console.log("Error viewing employees by manager:", err);
      });
  });
}
