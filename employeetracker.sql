DROP DATABASE IF EXISTS company;
CREATE DATABASE company;

CREATE TABLE department(
id INT AUTO_INCREMENT,
name varchar(30)
);

CREATE TABLE role(
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id)
);
 
CREATE TABLE employee(
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id))
    -- manager_id is to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager --