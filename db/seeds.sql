INSERT INTO Departments (DepartmentID, DepartmentName)
VALUES (1, 'Bridge'),
       (2, 'Detention Center'),
       (3, 'Security'),
       (4, 'Medical'),
       (5, 'Technical'),
       (6, 'Other');
       
INSERT INTO Roles (RoleID, Title, Salary, DepartmentID)
VALUES (1, 'Grand Moff', '99999', '1'),
       (2, 'Guard', '30000', '002'),
       (3, 'Gunner', '46000', '003'),
       (4, 'Medic', '77000', '004'),
       (5, 'Radar Technician', '22000', '005'),
       (6, 'Intern', '0', '006'),
       (7, 'Pilot', '57000', '001');
       
INSERT INTO Employees (EmployeeID, OperatingNumber, FirstName, LastName, RoleID, ManagerID)
VALUES (1, 'DS-1000', 'Wilhuff', 'Tarkin', '1', '1'),
       (2, 'SN-2016', 'Matt', 'Driver', '2', '1'),
       (3, 'LB-1523', 'Lon', 'Terrand', '4', '1'),
       (4, 'MG-1513', 'Vinon', 'Brimen', '2', '1'),
       (5, 'SN-2020', 'Randy', 'Driver', '6', '1'),
       (6, 'LV-2613', 'Garm', 'Horne', '5', '2'),
       (7, 'SB-6722', 'Rik', 'Tharand', '7', '1'),
       (8, 'MF-1011', 'Nej', 'Horne', '3', '1'),
       (9, 'MC-2323', 'Kenth', 'Tilles', '3', '8'),
       (10, 'KR-5357', 'Arsus', 'Donnall', '4', '3');
       