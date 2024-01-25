INSERT INTO Departments (DepartmentID, DepartmentName)
VALUES (001, 'Bridge'),
       (002, 'Detention Center'),
       (003, 'Security'),
       (004, 'Medical'),
       (005, 'Technical'),
       (006, 'Other');
       
INSERT INTO Roles (RoleID, Title, Salary, DepartmentID)
VALUES (001, 'Grand Moff', '1000000000', '001'),
       (002, 'Guard', '30000', '002'),
       (003, 'Gunner', '46000', '003'),
       (004, 'Medic', '77000', '004'),
       (005, 'Radar Technician', '22000', '005'),
       (006, 'Intern', '0', '006'),
       (007, 'Pilot', '57000', '001');
       
INSERT INTO Employees (EmployeeID, UniqueID, FirstName, LastName, RoleID, ManagerID)
VALUES (001, 'DS-1000', 'Wilhuff', 'Tarkin', '1', 'DS-1000'),
       (002, 'SN-2016', 'Matt', 'Driver', '2', 'DS-1000'),
       (003, 'LB-1523', 'Lon', 'Terrand', '4', 'DS-1000'),
       (004, 'MG-1513', 'Vinon', 'Brimen', '2', 'DS-1000'),
       (005, 'SN-2020', 'Randy', 'Driver', '6', 'DS-1000'),
       (006, 'LV-2613', 'Garm', 'Horne', '5', 'SN-2016'),
       (007, 'SB-6722', 'Rik', 'Tharand', '7', 'DS-1000'),
       (008, 'MF-1011', 'Nej', 'Horne', '3', 'DS-1000'),
       (009, 'MC-2323', 'Kenth', 'Tilles', '3', 'MF-1011'),
       (010, 'KR-5357', 'Arsus', 'Donnall', '4', 'LB-1523');
       