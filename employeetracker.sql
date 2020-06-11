CREATE DATABASE company;

CREATE TABLE department IN company (
    id int,
    name varchar(30), 
);

CREATE TABLE role IN company (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary  DECIMAL,
    department_id INT
);

CREATE TABLE employee IN company (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT 
    -- manager_id is to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager --
)