CREATE TABLE verification(
  token VARCHAR(255) NOT NULL,
  created_at BIGINT NOT NULL,
  expires_at BIGINT NOT NULL,
  customer_id INT NOT NULL,
  PRIMARY KEY(token),
  CONSTRAINT customer_id_unique UNIQUE(customer_id),
  CONSTRAINT verification_customer_id_fk FOREIGN KEY(customer_id) REFERENCES customer(id)
);