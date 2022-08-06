INSERT INTO departments (name)
VALUES ("Marketing"),
("Engineering"),
("HR");

INSERT INTO roles (title, salary, department_id)
VALUES ("Researcher",60000.00,1),
("Software Developer", 90000.00,2),
("Recruiter", 80000.00,3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Liliana", "Reyes", 2, null),
("Misael", "Silva", 1, 1 ),
("Gaby", "Pizano", 3,1);
