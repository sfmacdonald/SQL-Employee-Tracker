--Update employee managers
UPDATE Employees
SET ManagerID = new_manager_id
WHERE EmployeeID = employee_id;

--View employees by manager:
SELECT *
FROM Employees
WHERE ManagerID = manager_id;

--View employees by department:
SELECT e.*
FROM Employees e
JOIN Roles r ON e.RoleID = r.RoleID
WHERE r.DepartmentID = department_id;

--Delete departments, roles, and employees:
--Delete employees associated with a role:
DELETE FROM Employees
WHERE RoleID = role_id;

--Delete roles associated with a department:
DELETE FROM Roles
WHERE DepartmentID = department_id;

--Delete departments:
DELETE FROM Departments WHERE DepartmentID = department_id;

SELECT r.DepartmentID, d.DepartmentName, SUM(e.Salary) AS TotalBudget
FROM Employees e
JOIN Roles r ON e.RoleID = r.RoleID
JOIN Departments d ON r.DepartmentID = d.DepartmentID
WHERE r.DepartmentID = department_id
GROUP BY r.DepartmentID, d.DepartmentName;

--Remember to replace department_id, new_manager_id, employee_id, and role_id with actual
--values or parameters depending on how you execute these queries in your application.