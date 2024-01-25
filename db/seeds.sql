INSERT INTO Departments (DepartmentID, DepartmentName)
VALUES (001, "1", "Bridge"),
       (002, "2", "Detention Center"),
       (003, "3", "Security"),
       (004, "4", "Medical"),
       (005, "5", "Technical"),
       (006, "6", "Other");
       
INSERT INTO Roles (RoleID, Title, Salary, DepartmentID)
VALUES (001, "1", "Grand Moff", "1000000000", "1"),
       (002, "2", "Guard", "30000", "2"),
       (003, "3", "Gunner", "46000", "3"),
       (004, "4", "Medic", "77000", "4"),
       (005, "5", "Radar Technician", "22000", "5"),
       (006, "6" "Intern", "0", "6"),
       (007, "7", "Pilot", "57000", "1");
       
INSERT INTO Employees (EmployeeID, FirstName, LastName, RoleID, ManagerID)
VALUES (001, "DS-1000", "Wilhuff", "Tarkin", "1", "DS-1000"),
       (002, "SN-2016", "Matt", "Driver", "2", "DS-1000"),
       (003, "LB-1523", "Lon", "Terrand", "4", "DS-1000"),
       (004, "MG-1513", "Vinon", "Brimen", "2", "DS-1000"),
       (005, "SN-2020", "Randy", "Driver", "6", "DS-1000"),
       (006, "LV-2613", "Garm", "Horne", "5", "SN-2016"),
       (007, "SB-6722", "Rik", "Tharand", "7", "DS-1000"),
       (008, "MF-1011", "Nej", "Horne", "3", "DS-1000"),
       (009, "MC-2323", "Kenth", "Tilles", "3", "MF-1011")
       (010, "KR-5357", "Arsus", "Donnall", "4", "LB-1523");
       