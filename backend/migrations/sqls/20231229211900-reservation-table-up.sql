CREATE TABLE reservation(
id INT NOT NULL AUTO_INCREMENT,
customer_id INT NOT NULL,
car_id INT NOT NULL,
pickup_location_id INT NOT NULL,
return_location_id INT NOT NULL,
reservation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
pickup_date DATETIME NOT NULL,
return_date DATETIME NOT NULL,
total_amount DECIMAL(14,2) NOT NULL,
confirmed TINYINT(1) NOT NULL DEFAULT 0,
PRIMARY KEY(id),
CONSTRAINT customer_id_fk FOREIGN KEY(customer_id) REFERENCES customer(id),
CONSTRAINT car_id_fk FOREIGN KEY(car_id) REFERENCES car(id),
CONSTRAINT pickup_location_id_fk FOREIGN KEY(pickup_location_id) REFERENCES pickup_location(id),
CONSTRAINT return_location_id_fk FOREIGN KEY(return_location_id) REFERENCES return_location(id),
CONSTRAINT reservation_unique UNIQUE(car_id, reservation_date)
);