

INSERT INTO department (name)
VALUES ("Sales"),
       ("History"),
       ("Marketing"),
       ("Home"),
       ("Mens"),
       ("Shoes"),
       ("Kids");



INSERT INTO roles (title, salary)
VALUES ("Manager", 100000),
       ("AsstManager", 90000),
       ("Third", 60000),
       ("floormanager", 60000),
       ("emplevel3", 50000),
       ("emplevel2", 40000),
       ("emplevel1", 30000);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Charles", "Lenton", 1, NULL ),
       ("Valerie", "Fargus", 2, NULL),
       ("Quenton", "Farchild", 3, NULL),
       ("Greenie", "Fallons", 4, NULL),
       ("Jeff", "Ferguson" ,5, NULL),
       ("Bob", "Macadue", 6, NULL),
       ("Henry", "Winks",7, NULL);