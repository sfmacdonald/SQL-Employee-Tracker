CREATE DATABASE IF NOT EXISTS EmployeeManagementDB;
USE EmployeeManagementDB;

CREATE TABLE IF NOT EXISTS Departments (
    DepartmentID INT AUTO_INCREMENT,
    DepartmentName VARCHAR(100) NOT NULL,
    PRIMARY KEY (DepartmentID)
);

CREATE TABLE IF NOT EXISTS Roles (
    RoleID INT AUTO_INCREMENT,
    Title VARCHAR(100) NOT NULL,
    Salary DECIMAL(10, 2) NOT NULL,
    DepartmentID INT,
    PRIMARY KEY (RoleID),
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);

CREATE TABLE IF NOT EXISTS Employees (
    EmployeeID INT AUTO_INCREMENT,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    RoleID INT,
    ManagerID INT,
    PRIMARY KEY (EmployeeID),
    FOREIGN KEY (RoleID) REFERENCES Roles(RoleID),
    FOREIGN KEY (ManagerID) REFERENCES Employees(EmployeeID)
);