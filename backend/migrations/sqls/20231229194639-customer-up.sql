CREATE TABLE customer(
 id INT NOT NULL AUTO_INCREMENT,
 driver_license_no VARCHAR(200) NOT NULL,
 first_name VARCHAR(200) NOT NULL,
 last_name VARCHAR(200) NOT NULL,
 email VARCHAR(200) NOT NULL,
 password VARCHAR(200) NOT NULL,
 mobile_no VARCHAR(100) NOT NULL,
 PRIMARY KEY(id),
 CONSTRAINT customer_unique_driver_license_no UNIQUE(driver_license_no),
 CONSTRAINT customer_unique_email UNIQUE(email)
);