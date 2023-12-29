CREATE TABLE pickup_location(
 id INT NOT NULL AUTO_INCREMENT,
 country VARCHAR(200) NOT NULL,  
 city VARCHAR(200) NOT NULL,
 address VARCHAR(250) NOT NULL,
 CONSTRAINT pickup_location_pk PRIMARY KEY(id),
 CONSTRAINT pickup_location_unique UNIQUE(country, city, address)
);