-- Connect to the database 
\c employees

INSERT INTO department
  (name)
VALUES 
  ('Sales'),
  ('Finance'),
  ('Marketing'),
  ('Legal'),
  ('Human Resources');

INSERT INTO role 
  (title, salary, department_id)
VALUES 
  ('Sales Lead', 100000, 1),
  ('Sales Associate', 50000, 1),
  ('Finance Manager', 120000, 2),
  ('Finance Associate', 60000, 2),
  ('Marketing Manager', 110000, 3),
  ('Marketing Associate', 55000, 3),
  ('Legal Manager', 130000, 4),
  ('Legal Associate', 65000, 4),
  ('HR Manager', 115000, 5),
  ('HR Associate', 58000, 5);

INSERT INTO employee 
  (first_name, last_name, role_id, manager_id)
VALUES 
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Jim', 'Brown', 3, NULL),
  ('Jake', 'White', 4, 3),
  ('Jill', 'Green', 5, NULL),
  ('Jack', 'Black', 6, 5),
  ('Jerry', 'Blue', 7, NULL),
  ('Jessica', 'Red', 8, 7),
  ('Jordan', 'Yellow', 9, NULL),
  ('Jasmine', 'Purple', 10, 9);