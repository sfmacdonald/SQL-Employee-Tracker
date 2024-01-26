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
DELETE e
FROM Employees e
WHERE e.RoleID = role_id;

--Delete roles associated with a department:
DELETE r
FROM Roles r
WHERE r.DepartmentID = department_id;

--Delete departments:
DELETE FROM Departments WHERE DepartmentID = department_id;

V--iew the total utilized budget of a department:
SELECT r.DepartmentID, SUM(e.Salary) AS TotalBudget
FROM Employees e
JOIN Roles r ON e.RoleID = r.RoleID
WHERE r.DepartmentID = department_id
GROUP BY r.DepartmentID;