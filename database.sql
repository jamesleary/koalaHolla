
CREATE TABLE koalas(
	id SERIAL PRIMARY KEY,
	koala_name VARCHAR (100) NOT NULL,
	gender VARCHAR (100) NOT NULL,
	age VARCHAR (100) NOT NULL,
	ready_for_transfer VARCHAR (100) NOT NULL,
	notes VARCHAR (100) NOT NULL
);

INSERT INTO koalas (koala_name, gender, age, ready_for_transfer, notes) VALUES ('Scotty','M','4','Y','Born in Guatemala');
INSERT INTO koalas (koala_name, gender, age, ready_for_transfer, notes) VALUES ('Jean','F','5','Y','Allergic to lots of lava');
INSERT INTO koalas (koala_name, gender, age, ready_for_transfer, notes) VALUES ('Ororo','F','7','N','loves listening to Paula (Abdul)');
INSERT INTO koalas (koala_name, gender, age, ready_for_transfer, notes) VALUES ('Logan','M','15','N','Love the sauna');
INSERT INTO koalas (koala_name, gender, age, ready_for_transfer, notes) VALUES ('Charlie','M','9','Y','Favorite band is Nirvana');
INSERT INTO koalas (koala_name, gender, age, ready_for_transfer, notes) VALUES ('Betsy','F','4','Y','Has a pet iguana');

SELECT * FROM koalas;
