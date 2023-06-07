

INSERT INTO department (name)
VALUES ("Sales"),
       ("History"),
       ("Marketing"),
       ("Home"),
       ("Mens"),
       ("Shoes"),
       ("Kids");



INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 100000, 1 ),
       ("AsstManager", 90000, 2),
       ("Third", 60000, 3),
       ("floormanager", 60000, 3),
       ("emplevel3",  50000, 4),
       ("emplevel2", 40000, 6),
       ("emplevel1", 30000, 7);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Charles", "Lenton", 1, NULL ),
       ("Valerie", "Fargus", 2, NULL),
       ("Quenton", "Farchild", 3, NULL),
       ("Greenie", "Fallons", 4, NULL),
       ("Jeff", "Ferguson" ,5, NULL),
       ("Bob", "Macadue", 6, NULL),
       ("Henry", "Winks",7, NULL);