DROP DATABASE IF EXISTS company;
CREATE DATABASE company;
USE company;

CREATE TABLE department(
id INT AUTO_INCREMENT,
name varchar(30),
PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);
 
CREATE TABLE employee(
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT =null,
    PRIMARY KEY(id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
    )
    -- manager_id is to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager --